<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\User;
use App\Services\AuthService;

class AuthController
{
    public function login(Request $request): void
    {
        $data = $request->getBody(); // JSON décodé depuis php://input

        if (empty($data['email']) || empty($data['password'])) {
            Response::json(['error' => 'Email et mot de passe requis'], 400);
            return;
        }

        $user = User::findByEmail($data['email']);

        $authService = new AuthService();

        if (!$user || !$authService->verifyPassword($data['password'], $user['password'])) {
            Response::json(['error' => 'Identifiants invalides'], 401);
            return;
        }

        $token = $authService->generateToken($user['id'], $user['email']);

        Response::json([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
            ],
        ], 200);
    }
}
