<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Message;

class MessageController
{
    public function index(Request $request): void
    {
        Response::json(Message::all(), 200);
    }

    public function markRead(Request $request, string $id): void
    {
        if (!Message::find((int) $id)) {
            Response::json(['error' => 'Message introuvable'], 404);
            return;
        }

        Message::markRead((int) $id);
        Response::json(Message::find((int) $id), 200);
    }

    public function destroy(Request $request, string $id): void
    {
        Message::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
