<?php

// One-off script: copies real content (categories, tags, articles, projects)
// from the old portfolio-reeni database into the new portfolio_farid schema,
// including the associated image files. Safe to re-run (idempotent per slug).

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

Dotenv::createImmutable(__DIR__ . '/../')->load();

$new = new PDO(
    "mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
    $_ENV['DB_USER'],
    $_ENV['DB_PASS'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$old = new PDO(
    "mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname=portfolio-reeni;charset=utf8mb4",
    $_ENV['DB_USER'],
    $_ENV['DB_PASS'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$oldRoot = '/Applications/MAMP/htdocs/portfolio-reeni';
$uploadsRoot = __DIR__ . '/../public/uploads';

// The old DB has a handful of fields saved as double-encoded UTF-8 (mojibake,
// e.g. "complÃ¨te" instead of "complète"). Detect and reverse it defensively.
function fixMojibake(?string $s): ?string
{
    if ($s === null || !preg_match('/Ã[\x{0080}-\x{00BF}]/u', $s)) {
        return $s;
    }

    $fixed = mb_convert_encoding($s, 'ISO-8859-1', 'UTF-8');

    return mb_check_encoding($fixed, 'UTF-8') ? $fixed : $s;
}

function copyImage(string $source, string $destSubdir, string $uploadsRoot): ?string
{
    if (!is_file($source)) {
        echo "  [!] fichier introuvable, ignoré: $source\n";
        return null;
    }

    $filename = basename($source);
    $destDir = "$uploadsRoot/$destSubdir";
    if (!is_dir($destDir)) {
        mkdir($destDir, 0755, true);
    }

    $dest = "$destDir/$filename";
    copy($source, $dest);

    return "$destSubdir/$filename";
}

// --- Catégories ---
echo "Import catégories...\n";
$categoryIdMap = [];
foreach ($old->query('SELECT * FROM categories') as $cat) {
    $stmt = $new->prepare('INSERT INTO categories (name, slug, description) VALUES (:name, :slug, :description)
        ON DUPLICATE KEY UPDATE name = VALUES(name)');
    $stmt->execute(['name' => $cat['name'], 'slug' => $cat['slug'], 'description' => $cat['description']]);

    $id = (int) $new->query("SELECT id FROM categories WHERE slug = " . $new->quote($cat['slug']))->fetchColumn();
    $categoryIdMap[$cat['id']] = $id;
}
echo '  ' . count($categoryIdMap) . " catégories.\n";

// --- Tags ---
echo "Import tags...\n";
$tagIdMap = [];
foreach ($old->query('SELECT * FROM tags') as $tag) {
    $stmt = $new->prepare('INSERT INTO tags (name, slug) VALUES (:name, :slug)
        ON DUPLICATE KEY UPDATE name = VALUES(name)');
    $stmt->execute(['name' => $tag['name'], 'slug' => $tag['slug']]);

    $id = (int) $new->query("SELECT id FROM tags WHERE slug = " . $new->quote($tag['slug']))->fetchColumn();
    $tagIdMap[$tag['id']] = $id;
}
echo '  ' . count($tagIdMap) . " tags.\n";

// --- Articles -> posts ---
echo "Import articles...\n";
$postIdMap = [];
foreach ($old->query('SELECT * FROM articles') as $article) {
    $featuredImage = null;
    if ($article['featured_image']) {
        $featuredImage = copyImage("$oldRoot/uploads/articles/{$article['featured_image']}", 'articles', $uploadsRoot);
    }

    $stmt = $new->prepare(
        'INSERT INTO posts (title, slug, status, content, excerpt, category_id, featured_image, featured_image_alt, meta_title, meta_description, views_count, published_at)
         VALUES (:title, :slug, :status, :content, :excerpt, :category_id, :featured_image, :featured_image_alt, :meta_title, :meta_description, :views_count, :published_at)
         ON DUPLICATE KEY UPDATE status = VALUES(status), content = VALUES(content), excerpt = VALUES(excerpt),
         category_id = VALUES(category_id), featured_image = VALUES(featured_image), featured_image_alt = VALUES(featured_image_alt),
         meta_title = VALUES(meta_title), meta_description = VALUES(meta_description), views_count = VALUES(views_count),
         published_at = VALUES(published_at)'
    );
    $stmt->execute([
        'title' => fixMojibake($article['title']),
        'slug' => $article['slug'],
        'status' => $article['status'],
        'content' => fixMojibake($article['content']),
        'excerpt' => fixMojibake($article['excerpt']),
        'category_id' => $categoryIdMap[$article['category_id']] ?? null,
        'featured_image' => $featuredImage,
        'featured_image_alt' => fixMojibake($article['featured_image_alt']),
        'meta_title' => fixMojibake($article['meta_title']),
        'meta_description' => fixMojibake($article['meta_description']),
        'views_count' => $article['views_count'],
        'published_at' => $article['published_at'],
    ]);

    $postId = (int) $new->query("SELECT id FROM posts WHERE slug = " . $new->quote($article['slug']))->fetchColumn();
    $postIdMap[$article['id']] = $postId;
    echo "  - {$article['title']}\n";
}

// --- article_tags -> post_tags ---
echo "Import liaisons articles/tags...\n";
$new->exec('DELETE FROM post_tags WHERE post_id IN (' . implode(',', $postIdMap ?: [0]) . ')');
foreach ($old->query('SELECT * FROM article_tags') as $link) {
    if (!isset($postIdMap[$link['article_id']], $tagIdMap[$link['tag_id']])) {
        continue;
    }
    $stmt = $new->prepare('INSERT IGNORE INTO post_tags (post_id, tag_id) VALUES (:post_id, :tag_id)');
    $stmt->execute(['post_id' => $postIdMap[$link['article_id']], 'tag_id' => $tagIdMap[$link['tag_id']]]);
}

// --- Projects ---
echo "Import projets...\n";
foreach ($old->query('SELECT * FROM projects') as $project) {
    $thumbnail = $project['thumbnail']
        ? copyImage("$oldRoot/assets/images/{$project['thumbnail']}", 'projects', $uploadsRoot)
        : null;
    $coverImage = $project['cover_image']
        ? copyImage("$oldRoot/assets/images/{$project['cover_image']}", 'projects', $uploadsRoot)
        : null;

    $gallery = null;
    if ($project['gallery']) {
        $items = json_decode($project['gallery'], true);
        $copied = [];
        foreach ($items as $item) {
            $path = copyImage("$oldRoot/assets/images/{$item['image']}", 'projects/gallery', $uploadsRoot);
            if ($path) {
                $copied[] = ['image' => $path, 'alt' => $item['alt'] ?? ''];
            }
        }
        $gallery = json_encode($copied);
    }

    $stmt = $new->prepare(
        'INSERT INTO projects (title, slug, subtitle, category, client, role, project_date, tags, description, features, thumbnail, cover_image, live_url, gallery, meta_title, meta_description, views_count, sort_order)
         VALUES (:title, :slug, :subtitle, :category, :client, :role, :project_date, :tags, :description, :features, :thumbnail, :cover_image, :live_url, :gallery, :meta_title, :meta_description, :views_count, :sort_order)
         ON DUPLICATE KEY UPDATE subtitle = VALUES(subtitle), category = VALUES(category), client = VALUES(client),
         role = VALUES(role), project_date = VALUES(project_date), tags = VALUES(tags), description = VALUES(description),
         features = VALUES(features), thumbnail = VALUES(thumbnail), cover_image = VALUES(cover_image), live_url = VALUES(live_url),
         gallery = VALUES(gallery), meta_title = VALUES(meta_title), meta_description = VALUES(meta_description),
         views_count = VALUES(views_count), sort_order = VALUES(sort_order)'
    );
    $stmt->execute([
        'title' => fixMojibake($project['title']),
        'slug' => $project['slug'],
        'subtitle' => fixMojibake($project['subtitle']),
        'category' => $project['category'],
        'client' => $project['client'],
        'role' => fixMojibake($project['role']),
        'project_date' => $project['project_date'],
        'tags' => $project['tags'],
        'description' => fixMojibake($project['description']),
        'features' => $project['features'],
        'thumbnail' => $thumbnail,
        'cover_image' => $coverImage,
        'live_url' => $project['live_url'],
        'gallery' => $gallery,
        'meta_title' => fixMojibake($project['meta_title']),
        'meta_description' => fixMojibake($project['meta_description']),
        'views_count' => $project['views_count'],
        'sort_order' => $project['sort_order'],
    ]);
    echo "  - {$project['title']}\n";
}

echo "Terminé.\n";
