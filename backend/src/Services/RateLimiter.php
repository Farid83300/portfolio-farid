<?php

namespace App\Services;

use App\Config\Database;

/**
 * Compteur de tentatives échouées (login, 2FA) persisté en base, avec verrouillage
 * temporaire au-delà d'un seuil. Protège contre le brute-force sur un compte unique.
 */
class RateLimiter
{
    public function tooManyAttempts(string $key): bool
    {
        $row = $this->find($key);

        if (!$row || !$row['locked_until']) {
            return false;
        }

        return strtotime($row['locked_until']) > time();
    }

    public function retryAfterSeconds(string $key): int
    {
        $row = $this->find($key);

        if (!$row || !$row['locked_until']) {
            return 0;
        }

        return max(0, strtotime($row['locked_until']) - time());
    }

    public function hit(string $key, int $maxAttempts = 5, int $lockoutSeconds = 900): void
    {
        $pdo = Database::getInstance();
        $row = $this->find($key);

        $attempts = ($row['attempts'] ?? 0) + 1;
        $lockedUntil = $attempts >= $maxAttempts
            ? date('Y-m-d H:i:s', time() + $lockoutSeconds)
            : null;

        $stmt = $pdo->prepare(
            'INSERT INTO rate_limits (`key`, attempts, locked_until)
             VALUES (:key, :attempts, :locked_until)
             ON DUPLICATE KEY UPDATE attempts = :attempts2, locked_until = :locked_until2'
        );
        $stmt->execute([
            'key' => $key,
            'attempts' => $attempts,
            'locked_until' => $lockedUntil,
            'attempts2' => $attempts,
            'locked_until2' => $lockedUntil,
        ]);
    }

    public function clear(string $key): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('DELETE FROM rate_limits WHERE `key` = :key')->execute(['key' => $key]);
    }

    private function find(string $key): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT attempts, locked_until FROM rate_limits WHERE `key` = :key LIMIT 1');
        $stmt->execute(['key' => $key]);
        $row = $stmt->fetch();

        return $row ?: null;
    }
}
