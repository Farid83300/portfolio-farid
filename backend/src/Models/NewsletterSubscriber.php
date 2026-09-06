<?php

namespace App\Models;

use App\Config\Database;

class NewsletterSubscriber
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');

        return $stmt->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM newsletter_subscribers WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $subscriber = $stmt->fetch();

        return $subscriber ?: null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('INSERT INTO newsletter_subscribers (email) VALUES (:email)');
        $stmt->execute(['email' => $data['email']]);

        return (int) $pdo->lastInsertId();
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM newsletter_subscribers WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

    public static function count(): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT COUNT(*) FROM newsletter_subscribers WHERE unsubscribed_at IS NULL');

        return (int) $stmt->fetchColumn();
    }

    public static function countNew(): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query(
            'SELECT COUNT(*) FROM newsletter_subscribers WHERE unsubscribed_at IS NULL AND viewed_at IS NULL'
        );

        return (int) $stmt->fetchColumn();
    }

    public static function markAllViewed(): void
    {
        $pdo = Database::getInstance();
        $pdo->exec('UPDATE newsletter_subscribers SET viewed_at = NOW() WHERE viewed_at IS NULL');
    }
}
