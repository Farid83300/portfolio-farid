<?php

namespace App\Models;

use App\Config\Database;

// Passkeys (WebAuthn) enregistrées pour un utilisateur. Seule la clé PUBLIQUE est
// stockée : une fuite de la base ne permet donc pas de se connecter.
class WebauthnCredential
{
    public static function create(int $userId, string $credentialId, string $name, string $publicKey, int $signCount): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO webauthn_credentials (user_id, credential_id, name, public_key, sign_count)
             VALUES (:user_id, :credential_id, :name, :public_key, :sign_count)'
        );
        $stmt->execute([
            'user_id' => $userId,
            'credential_id' => $credentialId,
            'name' => $name,
            'public_key' => $publicKey,
            'sign_count' => $signCount,
        ]);

        return (int) $pdo->lastInsertId();
    }

    public static function forUser(int $userId): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'SELECT id, credential_id, name, created_at, last_used_at
             FROM webauthn_credentials WHERE user_id = :user_id ORDER BY created_at ASC'
        );
        $stmt->execute(['user_id' => $userId]);

        return $stmt->fetchAll();
    }

    public static function findByCredentialId(int $userId, string $credentialId): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'SELECT * FROM webauthn_credentials WHERE user_id = :user_id AND credential_id = :credential_id LIMIT 1'
        );
        $stmt->execute(['user_id' => $userId, 'credential_id' => $credentialId]);
        $row = $stmt->fetch();

        return $row ?: null;
    }

    public static function touch(int $id, int $signCount): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('UPDATE webauthn_credentials SET sign_count = :sign_count, last_used_at = NOW() WHERE id = :id')
            ->execute(['sign_count' => $signCount, 'id' => $id]);
    }

    public static function delete(int $userId, int $id): bool
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM webauthn_credentials WHERE id = :id AND user_id = :user_id');
        $stmt->execute(['id' => $id, 'user_id' => $userId]);

        return $stmt->rowCount() > 0;
    }
}
