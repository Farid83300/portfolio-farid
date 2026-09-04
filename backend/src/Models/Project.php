<?php

namespace App\Models;

use App\Config\Database;

class Project
{
    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query('SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC');

        return array_map([self::class, 'decode'], $stmt->fetchAll());
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM projects WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $project = $stmt->fetch();

        return $project ? self::decode($project) : null;
    }

    public static function findBySlug(string $slug): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM projects WHERE slug = :slug LIMIT 1');
        $stmt->execute(['slug' => $slug]);
        $project = $stmt->fetch();

        return $project ? self::decode($project) : null;
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO projects (title, slug, subtitle, category, client, role, project_date, tags, description, features, thumbnail, cover_image, live_url, gallery, meta_title, meta_description, sort_order)
             VALUES (:title, :slug, :subtitle, :category, :client, :role, :project_date, :tags, :description, :features, :thumbnail, :cover_image, :live_url, :gallery, :meta_title, :meta_description, :sort_order)'
        );
        $stmt->execute(self::params($data));

        return (int) $pdo->lastInsertId();
    }

    public static function update(int $id, array $data): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'UPDATE projects SET title = :title, slug = :slug, subtitle = :subtitle, category = :category, client = :client,
             role = :role, project_date = :project_date, tags = :tags, description = :description, features = :features,
             thumbnail = :thumbnail, cover_image = :cover_image, live_url = :live_url, gallery = :gallery,
             meta_title = :meta_title, meta_description = :meta_description, sort_order = :sort_order
             WHERE id = :id'
        );
        $stmt->execute(self::params($data) + ['id' => $id]);
    }

    private static function params(array $data): array
    {
        return [
            'title' => $data['title'],
            'slug' => $data['slug'],
            'subtitle' => $data['subtitle'] ?? null,
            'category' => $data['category'] ?? null,
            'client' => $data['client'] ?? null,
            'role' => $data['role'] ?? null,
            'project_date' => $data['project_date'] ?? null,
            'tags' => $data['tags'] ?? null,
            'description' => $data['description'] ?? null,
            'features' => isset($data['features']) ? json_encode($data['features']) : null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'cover_image' => $data['cover_image'] ?? null,
            'live_url' => $data['live_url'] ?? null,
            'gallery' => isset($data['gallery']) ? json_encode($data['gallery']) : null,
            'meta_title' => $data['meta_title'] ?? null,
            'meta_description' => $data['meta_description'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
        ];
    }

    private static function decode(array $project): array
    {
        $project['features'] = $project['features'] ? json_decode($project['features'], true) : [];
        $project['gallery'] = $project['gallery'] ? json_decode($project['gallery'], true) : [];

        return $project;
    }

    public static function incrementViews(int $id): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('UPDATE projects SET views_count = views_count + 1 WHERE id = :id')->execute(['id' => $id]);
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM projects WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
