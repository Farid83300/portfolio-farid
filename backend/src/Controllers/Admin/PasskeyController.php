<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\RefreshToken;
use App\Models\User;
use App\Models\WebauthnCredential;
use App\Services\AuthService;
use App\Services\PasskeyService;
use App\Services\RateLimiter;
use lbuchs\WebAuthn\WebAuthnException;

class PasskeyController
{
    public function index(Request $request, array $payload): void
    {
        $list = array_map(fn ($c) => [
            'id' => (int) $c['id'],
            'name' => $c['name'],
            'created_at' => $c['created_at'],
            'last_used_at' => $c['last_used_at'],
        ], WebauthnCredential::forUser((int) $payload['sub']));

        Response::json(['passkeys' => $list], 200);
    }

    // Étape 1 de l'enregistrement. SÉCURITÉ: exige le mot de passe — un access token volé
    // seul ne suffit pas à rattacher la passkey d'un attaquant au compte.
    public function registrationOptions(Request $request, array $payload): void
    {
        $user = $this->authenticatedUser($payload, $request->getBody()['password'] ?? '', 'passkey-register');
        if (!$user) {
            return;
        }

        $result = (new PasskeyService())->registrationOptions((int) $user['id'], $user['email']);
        Response::json(['challenge_id' => $result['challenge_id'], 'options' => $result['options']], 200);
    }

    public function register(Request $request, array $payload): void
    {
        $data = $request->getBody();
        $name = trim((string) ($data['name'] ?? ''));
        if ($name === '') {
            $name = 'Ma passkey';
        }
        $name = mb_substr($name, 0, 100);

        if (empty($data['challenge_id']) || !is_array($data['credential'] ?? null)) {
            Response::json(['error' => 'Requête invalide'], 400);
            return;
        }

        try {
            (new PasskeyService())->finishRegistration(
                (string) $data['challenge_id'], (int) $payload['sub'], $data['credential'], $name
            );
        } catch (WebAuthnException $e) {
            error_log('[passkey] enregistrement refusé : ' . $e->getMessage());
            Response::json(['error' => 'Enregistrement de la passkey refusé'], 400);
            return;
        } catch (\PDOException $e) {
            // credential_id déjà enregistré (clé UNIQUE)
            Response::json(['error' => 'Cette passkey est déjà enregistrée'], 409);
            return;
        }

        Response::json(['success' => true], 201);
    }

    public function destroy(Request $request, array $payload, $id): void
    {
        $user = $this->authenticatedUser($payload, $request->getBody()['password'] ?? '', 'passkey-delete');
        if (!$user) {
            return;
        }

        if (!WebauthnCredential::delete((int) $user['id'], (int) $id)) {
            Response::json(['error' => 'Passkey introuvable'], 404);
            return;
        }

        Response::json(['success' => true], 200);
    }

    // Connexion par passkey (public : l'utilisateur n'a pas encore de token). Le
    // challenge_id n'a pu être obtenu qu'après un mot de passe valide (voir
    // AuthController::login) et ne sert qu'une fois.
    public function login(Request $request): void
    {
        $data = $request->getBody();
        if (empty($data['challenge_id']) || !is_array($data['credential'] ?? null)) {
            Response::json(['error' => 'Requête invalide'], 400);
            return;
        }

        $rateLimiter = new RateLimiter();
        $key = 'passkey-login:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        try {
            $userId = (new PasskeyService())->finishLogin((string) $data['challenge_id'], $data['credential']);
        } catch (WebAuthnException $e) {
            error_log('[passkey] connexion refusée : ' . $e->getMessage());
            $rateLimiter->hit($key);
            Response::json(['error' => 'Passkey invalide'], 401);
            return;
        }

        $user = User::findById($userId);
        if (!$user) {
            Response::json(['error' => 'Passkey invalide'], 401);
            return;
        }

        $rateLimiter->clear($key);
        $rateLimiter->clear('login:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . ':' . strtolower($user['email']));

        $authService = new AuthService();
        $plain = $authService->generateRefreshTokenPlain();
        RefreshToken::create($userId, $authService->hashRefreshToken($plain), $authService->refreshExpiresAt());

        Response::json([
            'token' => $authService->generateToken($userId, $user['email'], 'full'),
            'refresh_token' => $plain,
            'user' => ['id' => $user['id'], 'email' => $user['email']],
        ], 200);
    }

    private function authenticatedUser(array $payload, string $password, string $throttlePrefix): ?array
    {
        $user = User::findByEmail($payload['email']);
        $rateLimiter = new RateLimiter();
        $key = $throttlePrefix . ':' . $payload['sub'];

        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return null;
        }

        if (!$user || !(new AuthService())->verifyPassword((string) $password, $user['password'])) {
            $rateLimiter->hit($key);
            Response::json(['error' => 'Mot de passe invalide'], 401);
            return null;
        }

        $rateLimiter->clear($key);

        return $user;
    }
}
