<?php

namespace App\Models;

use App\Config\Database;

// SÉCURITÉ: modèle du stockage des refresh tokens (rotation + révocation).
// Seul le hash SHA-256 du token est stocké — jamais le token en clair — pour
// qu'une fuite de la base ne permette pas de rejouer les tokens existants.
class RefreshToken
{
    public static function create(int $userId, string $tokenHash, string $expiresAt): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (:user_id, :token_hash, :expires_at)'
        );
        $stmt->execute(['user_id' => $userId, 'token_hash' => $tokenHash, 'expires_at' => $expiresAt]);

        return (int) $pdo->lastInsertId();
    }

    public static function findValid(string $tokenHash): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'SELECT * FROM refresh_tokens
             WHERE token_hash = :token_hash AND revoked_at IS NULL AND expires_at > NOW()
             LIMIT 1'
        );
        $stmt->execute(['token_hash' => $tokenHash]);
        $row = $stmt->fetch();

        return $row ?: null;
    }

    public static function revoke(int $id): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = :id')->execute(['id' => $id]);
    }

    // SÉCURITÉ: révoque toutes les sessions d'un utilisateur — utilisé au logout
    // et après un changement de mot de passe (kill-switch en cas de compromission).
    public static function revokeAllForUser(int $userId): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = :user_id AND revoked_at IS NULL')
            ->execute(['user_id' => $userId]);
    }
}
