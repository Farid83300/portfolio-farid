<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Post;
use App\Services\RateLimiter;

class PostController
{
    public function index(Request $request): void
    {
        $category = $_GET['category'] ?? null;
        $tag = $_GET['tag'] ?? null;
        $search = $_GET['search'] ?? null;

        Response::json(Post::published($category, $tag, $search), 200);
    }

    public function show(Request $request, string $slug): void
    {
        $post = Post::findBySlug($slug);

        if (!$post || $post['status'] !== 'published') {
            Response::json(['error' => 'Article introuvable'], 404);
            return;
        }

        Response::json($post, 200);
    }

    // SÉCURITÉ: séparé de show() car cette route GET est mise en cache
    // (ISR, next: { revalidate: 3600 }) côté frontend — incrémenter ici
    // ne comptait plus qu'une vue par heure et par article. Appelé côté
    // client (non caché) à chaque affichage réel de la page.
    public function trackView(Request $request, string $slug): void
    {
        $post = Post::findBySlug($slug);

        if (!$post || $post['status'] !== 'published') {
            Response::json(['error' => 'Article introuvable'], 404);
            return;
        }

        $rateLimiter = new RateLimiter();
        $key = 'view:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        if (!$rateLimiter->tooManyAttempts($key)) {
            $rateLimiter->hit($key, 60, 600);
            Post::incrementViews((int) $post['id']);
        }

        Response::json(['success' => true], 200);
    }
}
