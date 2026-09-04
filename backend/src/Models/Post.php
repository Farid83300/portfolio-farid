<?php

namespace App\Models;

use App\Config\Database;

class Post
{
    private static function baseQuery(): string
    {
        return 'SELECT posts.*, categories.name AS category_name, categories.slug AS category_slug
                FROM posts
                LEFT JOIN categories ON categories.id = posts.category_id';
    }

    public static function all(): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->query(self::baseQuery() . ' ORDER BY posts.created_at DESC');
        $posts = $stmt->fetchAll();

        foreach ($posts as &$post) {
            $post['tags'] = self::tagsFor((int) $post['id']);
        }

        return $posts;
    }

    public static function find(int $id): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(self::baseQuery() . ' WHERE posts.id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $post = $stmt->fetch();

        if (!$post) {
            return null;
        }

        $post['tags'] = self::tagsFor($id);

        return $post;
    }

    public static function findBySlug(string $slug): ?array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(self::baseQuery() . ' WHERE posts.slug = :slug LIMIT 1');
        $stmt->execute(['slug' => $slug]);
        $post = $stmt->fetch();

        if (!$post) {
            return null;
        }

        $post['tags'] = self::tagsFor((int) $post['id']);

        return $post;
    }

    public static function published(?string $categorySlug = null, ?string $tagSlug = null): array
    {
        $pdo = Database::getInstance();
        $sql = self::baseQuery() . " WHERE posts.status = 'published'";
        $params = [];

        if ($categorySlug) {
            $sql .= ' AND categories.slug = :category_slug';
            $params['category_slug'] = $categorySlug;
        }

        if ($tagSlug) {
            $sql .= ' AND posts.id IN (SELECT post_id FROM post_tags JOIN tags ON tags.id = post_tags.tag_id WHERE tags.slug = :tag_slug)';
            $params['tag_slug'] = $tagSlug;
        }

        $sql .= ' ORDER BY posts.published_at DESC';

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $posts = $stmt->fetchAll();

        foreach ($posts as &$post) {
            $post['tags'] = self::tagsFor((int) $post['id']);
        }

        return $posts;
    }

    public static function tagsFor(int $postId): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'SELECT tags.* FROM tags
             JOIN post_tags ON post_tags.tag_id = tags.id
             WHERE post_tags.post_id = :post_id
             ORDER BY tags.name ASC'
        );
        $stmt->execute(['post_id' => $postId]);

        return $stmt->fetchAll();
    }

    public static function create(array $data): int
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'INSERT INTO posts (title, slug, status, content, excerpt, category_id, featured_image, featured_image_alt, meta_title, meta_description, published_at)
             VALUES (:title, :slug, :status, :content, :excerpt, :category_id, :featured_image, :featured_image_alt, :meta_title, :meta_description, :published_at)'
        );
        $stmt->execute(self::params($data));

        $id = (int) $pdo->lastInsertId();
        self::syncTags($id, $data['tag_ids'] ?? []);

        return $id;
    }

    public static function update(int $id, array $data): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare(
            'UPDATE posts SET title = :title, slug = :slug, status = :status, content = :content, excerpt = :excerpt,
             category_id = :category_id, featured_image = :featured_image, featured_image_alt = :featured_image_alt,
             meta_title = :meta_title, meta_description = :meta_description, published_at = :published_at
             WHERE id = :id'
        );
        $stmt->execute(self::params($data) + ['id' => $id]);

        self::syncTags($id, $data['tag_ids'] ?? []);
    }

    private static function params(array $data): array
    {
        return [
            'title' => $data['title'],
            'slug' => $data['slug'],
            'status' => $data['status'] ?? 'draft',
            'content' => $data['content'],
            'excerpt' => $data['excerpt'] ?? null,
            'category_id' => $data['category_id'] ?? null,
            'featured_image' => $data['featured_image'] ?? null,
            'featured_image_alt' => $data['featured_image_alt'] ?? null,
            'meta_title' => $data['meta_title'] ?? null,
            'meta_description' => $data['meta_description'] ?? null,
            'published_at' => $data['published_at'] ?? null,
        ];
    }

    private static function syncTags(int $postId, array $tagIds): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('DELETE FROM post_tags WHERE post_id = :post_id')->execute(['post_id' => $postId]);

        if (empty($tagIds)) {
            return;
        }

        $stmt = $pdo->prepare('INSERT INTO post_tags (post_id, tag_id) VALUES (:post_id, :tag_id)');
        foreach ($tagIds as $tagId) {
            $stmt->execute(['post_id' => $postId, 'tag_id' => (int) $tagId]);
        }
    }

    public static function incrementViews(int $id): void
    {
        $pdo = Database::getInstance();
        $pdo->prepare('UPDATE posts SET views_count = views_count + 1 WHERE id = :id')->execute(['id' => $id]);
    }

    public static function delete(int $id): void
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('DELETE FROM posts WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
