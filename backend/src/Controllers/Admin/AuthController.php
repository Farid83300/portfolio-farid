<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
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

        $rateLimiter = new RateLimiter();
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $loginKey = 'login:' . $ip . ':' . strtolower($data['email']);

        if ($rateLimiter->tooManyAttempts($loginKey)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez dans quelques minutes.'], 429);
            return;
        }

        $user = User::findByEmail($data['email']);

        $authService = new AuthService();

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

        Response::json([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
            ],
        ], 200);
    }
}
