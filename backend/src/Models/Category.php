<?php

namespace App\Models;

use App\Config\Database;

class Category
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM categories ORDER BY name ASC');

        return $stmt->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM categories WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $category = $stmt->fetch();

        return $category ?: null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO categories (name, slug, description) VALUES (:name, :slug, :description)'
        );
        $stmt->execute([
            'name' => $data['name'],
            'slug' => $data['slug'],
            'description' => $data['description'] ?? null,
        ]);

        return (int) $pdo->lastInsertId();
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM categories WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
