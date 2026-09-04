<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\ChatMessage;
use App\Models\Comment;
use App\Models\Message;
use App\Models\NewsletterSubscriber;

class DashboardController
{
    public function index(Request $request): void
    {
        Response::json([
            'messages_count' => Message::countUnread(),
            'chat_messages_count' => ChatMessage::countUnread(),
            'newsletter_count' => NewsletterSubscriber::count(),
            'comments_pending_count' => Comment::countPending(),
        ], 200);
    }
}
