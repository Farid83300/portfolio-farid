<?php

namespace App\Services;

use App\Config\Database;

// SÉCURITÉ: compteur de tentatives (échecs de login/2FA, ou volume de requêtes sur un
// endpoint public) persisté en base, avec verrouillage temporaire au-delà d'un seuil sur
// une fenêtre glissante. Protège contre le brute-force ET contre le spam/flood applicatif.
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

        // SÉCURITÉ: fenêtre glissante — si la dernière tentative remonte à plus longtemps
        // que la fenêtre elle-même, on repart d'un compteur à zéro plutôt que de continuer
        // à accumuler indéfiniment (sinon un visiteur légitime qui revient des mois plus
        // tard finirait par se faire bloquer sans avoir rien fait d'abusif récemment).
        $isStale = $row && strtotime($row['updated_at']) < time() - $lockoutSeconds;
        $attempts = (!$row || $isStale) ? 1 : $row['attempts'] + 1;
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
        $stmt = $pdo->prepare('SELECT attempts, locked_until, updated_at FROM rate_limits WHERE `key` = :key LIMIT 1');
        $stmt->execute(['key' => $key]);
        $row = $stmt->fetch();

        return $row ?: null;
    }
}
