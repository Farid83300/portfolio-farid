<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Comment;
use App\Models\Post;
use App\Services\RateLimiter;

class CommentController
{
    public function store(Request $request): void
    {
        $data = $request->getBody();
        $postId = (int) ($data['post_id'] ?? 0);

        if (!$postId || empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            Response::json(['error' => 'Article, nom, email et message requis'], 400);
            return;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            Response::json(['error' => 'Email invalide'], 400);
            return;
        }

        // SÉCURITÉ: validation stricte des longueurs côté serveur.
        if (mb_strlen($data['name']) > 150 || mb_strlen($data['email']) > 190 || mb_strlen($data['message']) > 3000) {
            Response::json(['error' => 'Un des champs dépasse la longueur autorisée'], 400);
            return;
        }

        // SÉCURITÉ: throttle anti-spam/anti-flood par IP.
        $rateLimiter = new RateLimiter();
        $key = 'comment:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de commentaires envoyés. Réessayez plus tard.'], 429);
            return;
        }
        $rateLimiter->hit($key, 8, 600);

        if (!Post::find($postId)) {
            Response::json(['error' => 'Article introuvable'], 404);
            return;
        }

        Comment::create([
            'post_id' => $postId,
            'author_name' => $data['name'],
            'author_email' => $data['email'],
            'content' => $data['message'],
        ]);

        Response::json(['success' => true], 201);
    }
}
