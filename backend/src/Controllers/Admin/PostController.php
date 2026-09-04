<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Post;

class PostController
{
    public function index(Request $request): void
    {
        Response::json(Post::all(), 200);
    }

    public function show(Request $request, string $id): void
    {
        $post = Post::find((int) $id);

        if (!$post) {
            Response::json(['error' => 'Article introuvable'], 404);
            return;
        }

        Response::json($post, 200);
    }

    public function store(Request $request): void
    {
        $data = $request->getBody();

        if (empty($data['title']) || empty($data['slug']) || empty($data['content'])) {
            Response::json(['error' => 'Titre, slug et contenu requis'], 400);
            return;
        }

        $id = Post::create($data);
        Response::json(Post::find($id), 201);
    }

    public function update(Request $request, string $id): void
    {
        if (!Post::find((int) $id)) {
            Response::json(['error' => 'Article introuvable'], 404);
            return;
        }

        $data = $request->getBody();

        if (empty($data['title']) || empty($data['slug']) || empty($data['content'])) {
            Response::json(['error' => 'Titre, slug et contenu requis'], 400);
            return;
        }

        Post::update((int) $id, $data);
        Response::json(Post::find((int) $id), 200);
    }

    public function destroy(Request $request, string $id): void
    {
        Post::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
