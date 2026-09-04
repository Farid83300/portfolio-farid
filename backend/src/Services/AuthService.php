<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService
{
    private string $secret;
    private int $expire;

    public function __construct()
    {
        $config = require __DIR__ . '/../Config/config.php';
        $this->secret = $config['jwt']['secret'];
        $this->expire = $config['jwt']['expire'];
    }

    public function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public function verifyPassword(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    public function generateToken(int $userId, string $email, string $scope = 'full'): string
    {
        $payload = [
            'sub' => $userId,
            'email' => $email,
            'scope' => $scope,
            'iat' => time(),
            'exp' => time() + $this->expire,
        ];

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function verifyToken(string $token): ?array
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            return (array) $decoded;
        } catch (\Exception $e) {
            return null;
        }
    }
}
