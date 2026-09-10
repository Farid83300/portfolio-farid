<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\RefreshToken;
use App\Models\User;
use App\Services\AuthService;
use App\Services\RateLimiter;
use App\Services\TotpService;

class AuthController
{
    public function login(Request $request): void
    {
        $data = $request->getBody(); // JSON décodé depuis php://input

        if (empty($data['email']) || empty($data['password'])) {
            Response::json(['error' => 'Email et mot de passe requis'], 400);
            return;
        }

        // SÉCURITÉ: anti brute-force — bloque après 5 échecs / 15 min, par IP + email
        // (évite qu'un attaquant essaie des mots de passe en boucle sur le compte admin).
        $rateLimiter = new RateLimiter();
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $loginKey = 'login:' . $ip . ':' . strtolower($data['email']);

        if ($rateLimiter->tooManyAttempts($loginKey)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        $user = User::findByEmail($data['email']);

        $authService = new AuthService();

        // SÉCURITÉ: message d'erreur identique que l'email soit inconnu ou le mot de
        // passe faux — évite l'énumération de comptes valides.
        if (!$user || !$authService->verifyPassword($data['password'], $user['password'])) {
            $rateLimiter->hit($loginKey);
            Response::json(['error' => 'Identifiants invalides'], 401);
            return;
        }

        if (!$user['totp_enabled']) {
            $rateLimiter->clear($loginKey);
            $token = $authService->generateToken($user['id'], $user['email'], 'setup_2fa');
            Response::json([
                'token' => $token,
                'setup_2fa_required' => true,
                'user' => ['id' => $user['id'], 'email' => $user['email']],
            ], 200);
            return;
        }

        $code = $data['code'] ?? null;
        if (!$code) {
            Response::json(['require_2fa' => true], 401);
            return;
        }

        // SÉCURITÉ: throttle dédié au code 2FA (compteur séparé du mot de passe) —
        // empêche de bruteforcer les 10^6 codes TOTP possibles une fois le mot de
        // passe connu/deviné.
        $totpKey = 'login-2fa:' . $user['id'];
        if ($rateLimiter->tooManyAttempts($totpKey)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        $totpService = new TotpService();
        if (!$totpService->verify($user['totp_secret'], $user['email'], (string) $code)) {
            $rateLimiter->hit($totpKey);
            Response::json(['error' => 'Code 2FA invalide'], 401);
            return;
        }

        $rateLimiter->clear($loginKey);
        $rateLimiter->clear($totpKey);

        $token = $authService->generateToken($user['id'], $user['email'], 'full');
        $refreshToken = $this->issueRefreshToken($authService, (int) $user['id']);

        Response::json([
            'token' => $token,
            'refresh_token' => $refreshToken,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
            ],
        ], 200);
    }

    // SÉCURITÉ: échange un refresh token valide contre un nouvel access token — et
    // fait tourner (rotation) le refresh token lui-même : l'ancien est révoqué et un
    // nouveau émis à chaque appel. Si un refresh token volé est utilisé ici avant le
    // propriétaire légitime, la rotation ne le détecte pas automatiquement (pas de
    // détection de réutilisation), mais limite la fenêtre d'exploitation puisque le
    // token présenté cesse de fonctionner dès le premier usage — à défaut d'un vrai
    // logout, un accès admin (voir SecurityController::disable) peut aussi tout
    // révoquer via RefreshToken::revokeAllForUser().
    public function refresh(Request $request): void
    {
        $data = $request->getBody();
        $presented = $data['refresh_token'] ?? null;

        if (empty($presented) || !is_string($presented)) {
            Response::json(['error' => 'Refresh token requis'], 400);
            return;
        }

        $rateLimiter = new RateLimiter();
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $throttleKey = 'refresh:' . $ip;
        if ($rateLimiter->tooManyAttempts($throttleKey)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        $authService = new AuthService();
        $hash = $authService->hashRefreshToken($presented);
        $row = RefreshToken::findValid($hash);

        if (!$row) {
            $rateLimiter->hit($throttleKey, 20, 900);
            Response::json(['error' => 'Refresh token invalide ou expiré'], 401);
            return;
        }

        $user = User::findById((int) $row['user_id']);
        if (!$user) {
            Response::json(['error' => 'Refresh token invalide ou expiré'], 401);
            return;
        }

        RefreshToken::revoke((int) $row['id']);
        $newRefreshToken = $this->issueRefreshToken($authService, (int) $user['id']);
        $newAccessToken = $authService->generateToken((int) $user['id'], $user['email'], 'full');

        Response::json(['token' => $newAccessToken, 'refresh_token' => $newRefreshToken], 200);
    }

    // SÉCURITÉ: logout réel côté serveur — révoque toutes les sessions (refresh
    // tokens) de l'utilisateur, pas seulement celle en cours, ce qui sert aussi de
    // kill-switch simple en cas de suspicion de compromission (un seul utilisateur
    // admin sur ce site, donc "déconnecter partout" est toujours le comportement
    // voulu). L'access token déjà émis reste valide jusqu'à sa propre expiration
    // (max 30 min) — c'est le compromis inhérent à un JWT stateless.
    public function logout(Request $request, array $payload): void
    {
        RefreshToken::revokeAllForUser((int) $payload['sub']);
        Response::json(['success' => true], 200);
    }

    private function issueRefreshToken(AuthService $authService, int $userId): string
    {
        $plain = $authService->generateRefreshTokenPlain();
        RefreshToken::create($userId, $authService->hashRefreshToken($plain), $authService->refreshExpiresAt());

        return $plain;
    }
}
