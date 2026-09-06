<?php

namespace App\Models;

use App\Config\Database;

class Comment
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM comments ORDER BY created_at DESC');

        return $stmt->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM comments WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $comment = $stmt->fetch();

        return $comment ?: null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO comments (post_id, author_name, author_email, content) VALUES (:post_id, :author_name, :author_email, :content)'
        );
        $stmt->execute([
            'post_id' => $data['post_id'],
            'author_name' => $data['author_name'],
            'author_email' => $data['author_email'],
            'content' => $data['content'],
        ]);

        return (int) $pdo->lastInsertId();
    }

    public static function updateStatus(int $id, string $status): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('UPDATE comments SET status = :status WHERE id = :id');
        $stmt->execute(['status' => $status, 'id' => $id]);
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM comments WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

    public static function countPending(): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query("SELECT COUNT(*) FROM comments WHERE status = 'pending'");

        return (int) $stmt->fetchColumn();
    }
}
