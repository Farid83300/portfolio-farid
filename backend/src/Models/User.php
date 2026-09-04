<?php

namespace App\Models;

use App\Config\Database;
use PDO;

class User
{
    public static function findByEmail(string $email): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        return $user ?: null;
    }

    public static function findById(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT id, email, totp_enabled, created_at FROM users WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch();

        return $user ?: null;
    }

    public static function updateTotpSecret(int $id, string $secret): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('UPDATE users SET totp_secret = :secret WHERE id = :id');
        $stmt->execute(['secret' => $secret, 'id' => $id]);
    }

    public static function enableTotp(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('UPDATE users SET totp_enabled = 1 WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

    public static function disableTotp(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('UPDATE users SET totp_enabled = 0, totp_secret = NULL WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
