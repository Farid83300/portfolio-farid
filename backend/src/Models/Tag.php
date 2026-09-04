<?php

namespace App\Models;

use App\Config\Database;

class Tag
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM tags ORDER BY name ASC');

        return $stmt->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM tags WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $tag = $stmt->fetch();

        return $tag ?: null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('INSERT INTO tags (name, slug) VALUES (:name, :slug)');
        $stmt->execute([
            'name' => $data['name'],
            'slug' => $data['slug'],
        ]);

        return (int) $pdo->lastInsertId();
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM tags WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
