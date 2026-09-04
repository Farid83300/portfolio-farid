<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Comment;

class CommentController
{
    public function index(Request $request): void
    {
        Response::json(Comment::all(), 200);
    }

    public function updateStatus(Request $request, string $id): void
    {
        $comment = Comment::find((int) $id);

        if (!$comment) {
            Response::json(['error' => 'Commentaire introuvable'], 404);
            return;
        }

        $data = $request->getBody();
        $status = $data['status'] ?? null;

        if (!in_array($status, ['pending', 'approved', 'rejected'], true)) {
            Response::json(['error' => 'Statut invalide'], 400);
            return;
        }

        Comment::updateStatus((int) $id, $status);
        Response::json(Comment::find((int) $id), 200);
    }

    public function destroy(Request $request, string $id): void
    {
        Comment::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
