<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Message;
use App\Services\MailService;

class ContactController
{
    public function store(Request $request): void
    {
        $data = $request->getBody();

        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            Response::json(['error' => 'Nom, email et message requis'], 400);
            return;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            Response::json(['error' => 'Email invalide'], 400);
            return;
        }

        Message::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'subject' => $data['subject'] ?? null,
            'content' => $data['message'],
        ]);

        (new MailService())->sendContactNotification(
            $data['name'],
            $data['email'],
            $data['subject'] ?? null,
            $data['message']
        );

        Response::json(['success' => true], 201);
    }
}
