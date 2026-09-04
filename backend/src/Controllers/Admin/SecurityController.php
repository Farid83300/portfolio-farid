<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\User;
use App\Services\AuthService;
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

        if (empty($data['code'])) {
            Response::json(['error' => 'Code requis'], 400);
            return;
        }

        $user = User::findByEmail($payload['email']);

        if (empty($user['totp_secret'])) {
            Response::json(['error' => 'Aucune configuration 2FA en attente'], 400);
            return;
        }

        $totpService = new TotpService();
        if (!$totpService->verify($user['totp_secret'], $user['email'], (string) $data['code'])) {
            Response::json(['error' => 'Code 2FA invalide'], 401);
            return;
        }

        User::enableTotp((int) $user['id']);

        $authService = new AuthService();
        $token = $authService->generateToken((int) $user['id'], $user['email'], 'full');

        Response::json(['token' => $token], 200);
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

        if (!$authService->verifyPassword($data['password'], $user['password'])) {
            Response::json(['error' => 'Mot de passe invalide'], 401);
            return;
        }

        $totpService = new TotpService();
        if (!$totpService->verify($user['totp_secret'], $user['email'], (string) $data['code'])) {
            Response::json(['error' => 'Code 2FA invalide'], 401);
            return;
        }

        User::disableTotp((int) $user['id']);

        Response::json(['success' => true], 200);
    }
}
