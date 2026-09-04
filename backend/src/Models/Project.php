<?php

namespace App\Models;

use App\Config\Database;

class Project
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM projects ORDER BY created_at DESC');

        return $stmt->fetchAll();
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM projects WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $project = $stmt->fetch();

        return $project ?: null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO projects (title, slug, description, image_url, link) VALUES (:title, :slug, :description, :image_url, :link)'
        );
        $stmt->execute([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'description' => $data['description'],
            'image_url' => $data['image_url'] ?? null,
            'link' => $data['link'] ?? null,
        ]);

        return (int) $pdo->lastInsertId();
    }

    public static function update(int $id, array $data): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'UPDATE projects SET title = :title, slug = :slug, description = :description, image_url = :image_url, link = :link WHERE id = :id'
        );
        $stmt->execute([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'description' => $data['description'],
            'image_url' => $data['image_url'] ?? null,
            'link' => $data['link'] ?? null,
            'id' => $id,
        ]);
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM projects WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
