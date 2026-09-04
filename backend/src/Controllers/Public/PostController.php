<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Post;

class PostController
{
    public function index(Request $request): void
    {
        $category = $_GET['category'] ?? null;
        $tag = $_GET['tag'] ?? null;

        Response::json(Post::published($category, $tag), 200);
    }

    public function show(Request $request, string $slug): void
    {
        $post = Post::findBySlug($slug);

        if (!$post || $post['status'] !== 'published') {
            Response::json(['error' => 'Article introuvable'], 404);
            return;
        }

        Post::incrementViews((int) $post['id']);
        $post['views_count']++;

        Response::json($post, 200);
    }
}
