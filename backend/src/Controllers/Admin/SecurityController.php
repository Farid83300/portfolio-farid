<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\RefreshToken;
use App\Models\User;
use App\Services\AuthService;
use App\Services\RateLimiter;
use App\Services\TotpService;

class SecurityController
{
    public function status(Request $request, array $payload): void
    {
        $user = User::findById((int) $payload['sub']);

        Response::json(['enabled' => (bool) $user['totp_enabled']], 200);
    }

    public function setup(Request $request, array $payload): void
    {
        $user = User::findByEmail($payload['email']);

        $totpService = new TotpService();
        $totp = $totpService->generateSecret($user['email']);

        User::updateTotpSecret((int) $user['id'], $totp->getSecret());

        Response::json([
            'secret' => $totp->getSecret(),
            'otpauth_url' => $totp->getProvisioningUri(),
        ], 200);
    }

    public function enable(Request $request, array $payload): void
    {
        $data = $request->getBody();

        if (empty($data['code']) || empty($data['password'])) {
            Response::json(['error' => 'Mot de passe et code requis'], 400);
            return;
        }

        $user = User::findByEmail($payload['email']);

        if (empty($user['totp_secret'])) {
            Response::json(['error' => 'Aucune configuration 2FA en attente'], 400);
            return;
        }

        $rateLimiter = new RateLimiter();
        $key = '2fa-enable:' . $user['id'];
        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        $authService = new AuthService();
        if (!$authService->verifyPassword($data['password'], $user['password'])) {
            $rateLimiter->hit($key);
            Response::json(['error' => 'Mot de passe invalide'], 401);
            return;
        }

        $totpService = new TotpService();
        if (!$totpService->verify($user['totp_secret'], $user['email'], (string) $data['code'])) {
            $rateLimiter->hit($key);
            Response::json(['error' => 'Code 2FA invalide'], 401);
            return;
        }

        $rateLimiter->clear($key);
        User::enableTotp((int) $user['id']);

        $token = $authService->generateToken((int) $user['id'], $user['email'], 'full');
        $refreshPlain = $authService->generateRefreshTokenPlain();
        RefreshToken::create(
            (int) $user['id'],
            $authService->hashRefreshToken($refreshPlain),
            $authService->refreshExpiresAt()
        );

        Response::json(['token' => $token, 'refresh_token' => $refreshPlain], 200);
    }

    public function disable(Request $request, array $payload): void
    {
        $data = $request->getBody();

        if (empty($data['code']) || empty($data['password'])) {
            Response::json(['error' => 'Mot de passe et code requis'], 400);
            return;
        }

        $user = User::findByEmail($payload['email']);
        $authService = new AuthService();

        $rateLimiter = new RateLimiter();
        $key = '2fa-disable:' . $user['id'];
        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        if (!$authService->verifyPassword($data['password'], $user['password'])) {
            $rateLimiter->hit($key);
            Response::json(['error' => 'Mot de passe invalide'], 401);
            return;
        }

        $totpService = new TotpService();
        if (!$totpService->verify($user['totp_secret'], $user['email'], (string) $data['code'])) {
            $rateLimiter->hit($key);
            Response::json(['error' => 'Code 2FA invalide'], 401);
            return;
        }

        $rateLimiter->clear($key);
        User::disableTotp((int) $user['id']);

        Response::json(['success' => true], 200);
    }

    // SÉCURITÉ: seul moyen de faire tourner le mot de passe admin (jusqu'ici il n'y en
    // avait aucun — un point mort pour la réponse à incident). Exige le mot de passe
    // actuel + un code 2FA valide (même schéma que disable()), impose une longueur
    // minimale, et révoque toutes les sessions existantes pour forcer une
    // réauthentification partout une fois le mot de passe changé.
    public function changePassword(Request $request, array $payload): void
    {
        $data = $request->getBody();

        if (empty($data['current_password']) || empty($data['new_password']) || empty($data['code'])) {
            Response::json(['error' => 'Mot de passe actuel, nouveau mot de passe et code requis'], 400);
            return;
        }

        if (strlen($data['new_password']) < 12) {
            Response::json(['error' => 'Le nouveau mot de passe doit faire au moins 12 caractères'], 400);
            return;
        }

        $user = User::findByEmail($payload['email']);
        $authService = new AuthService();

        $rateLimiter = new RateLimiter();
        $key = 'change-password:' . $user['id'];
        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        if (!$authService->verifyPassword($data['current_password'], $user['password'])) {
            $rateLimiter->hit($key);
            Response::json(['error' => 'Mot de passe actuel invalide'], 401);
            return;
        }

        $totpService = new TotpService();
        if (!$totpService->verify($user['totp_secret'], $user['email'], (string) $data['code'])) {
            $rateLimiter->hit($key);
            Response::json(['error' => 'Code 2FA invalide'], 401);
            return;
        }

        $rateLimiter->clear($key);
        User::updatePassword((int) $user['id'], $authService->hashPassword($data['new_password']));
        RefreshToken::revokeAllForUser((int) $user['id']);

        Response::json(['success' => true], 200);
    }
}
