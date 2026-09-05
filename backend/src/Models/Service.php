<?php

namespace App\Models;

use App\Config\Database;

class Service
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM services ORDER BY sort_order ASC, created_at DESC');

        return array_map([self::class, 'decode'], $stmt->fetchAll());
    }

    public static function published(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query(
            "SELECT * FROM services WHERE status = 'published' ORDER BY sort_order ASC, created_at DESC"
        );

        return array_map([self::class, 'decode'], $stmt->fetchAll());
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM services WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $service = $stmt->fetch();

        return $service ? self::decode($service) : null;
    }

    public static function findBySlug(string $slug): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM services WHERE slug = :slug LIMIT 1');
        $stmt->execute(['slug' => $slug]);
        $service = $stmt->fetch();

        return $service ? self::decode($service) : null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO services (title, slug, status, icon, description, sections, image, image_alt, meta_title, meta_description, sort_order)
             VALUES (:title, :slug, :status, :icon, :description, :sections, :image, :image_alt, :meta_title, :meta_description, :sort_order)'
        );
        $stmt->execute(self::params($data));

        return (int) $pdo->lastInsertId();
    }

    public static function update(int $id, array $data): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'UPDATE services SET title = :title, slug = :slug, status = :status, icon = :icon, description = :description,
             sections = :sections, image = :image, image_alt = :image_alt, meta_title = :meta_title,
             meta_description = :meta_description, sort_order = :sort_order
             WHERE id = :id'
        );
        $stmt->execute(self::params($data) + ['id' => $id]);
    }

    private static function params(array $data): array
    {
        return [
            'title' => $data['title'],
            'slug' => $data['slug'],
            'status' => $data['status'] ?? 'draft',
            'icon' => $data['icon'] ?? null,
            'description' => $data['description'] ?? null,
            'sections' => isset($data['sections']) ? json_encode($data['sections']) : null,
            'image' => $data['image'] ?? null,
            'image_alt' => $data['image_alt'] ?? null,
            'meta_title' => $data['meta_title'] ?? null,
            'meta_description' => $data['meta_description'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
        ];
    }

    private static function decode(array $service): array
    {
        $service['sections'] = $service['sections'] ? json_decode($service['sections'], true) : [];

        return $service;
    }

    public static function incrementViews(int $id): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('UPDATE services SET views_count = views_count + 1 WHERE id = :id')->execute(['id' => $id]);
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM services WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
