<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\ChatMessage;

class ChatMessageController
{
    public function index(Request $request): void
    {
        Response::json(ChatMessage::all(), 200);
    }

    public function markRead(Request $request, string $id): void
    {
        if (!ChatMessage::find((int) $id)) {
            Response::json(['error' => 'Message introuvable'], 404);
            return;
        }

        ChatMessage::markRead((int) $id);
        Response::json(ChatMessage::find((int) $id), 200);
    }

    public function destroy(Request $request, string $id): void
    {
        ChatMessage::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
