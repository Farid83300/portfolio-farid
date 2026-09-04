<?php

namespace App\Models;

use App\Config\Database;

class Message
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM messages ORDER BY created_at DESC');

        return $stmt->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM messages WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $message = $stmt->fetch();

        return $message ?: null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO messages (name, email, subject, content) VALUES (:name, :email, :subject, :content)'
        );
        $stmt->execute([
            'name' => $data['name'],
            'email' => $data['email'],
            'subject' => $data['subject'] ?? null,
            'content' => $data['content'],
        ]);

        return (int) $pdo->lastInsertId();
    }

    public static function markRead(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('UPDATE messages SET read_at = NOW() WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM messages WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

    public static function countUnread(): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT COUNT(*) FROM messages WHERE read_at IS NULL');

        return (int) $stmt->fetchColumn();
    }
}
