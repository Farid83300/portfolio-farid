<?php

namespace App\Controllers\Public;

use App\Config\Database;
use App\Core\Request;
use App\Core\Response;
use App\Models\NewsletterSubscriber;
use PDOException;

class NewsletterController
{
    public function store(Request $request): void
    {
        $data = $request->getBody();
        $email = trim($data['email'] ?? '');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::json(['error' => 'Email invalide'], 400);
            return;
        }

        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT id, unsubscribed_at FROM newsletter_subscribers WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $existing = $stmt->fetch();

        if ($existing) {
            if ($existing['unsubscribed_at'] !== null) {
                $pdo->prepare('UPDATE newsletter_subscribers SET unsubscribed_at = NULL WHERE id = :id')
                    ->execute(['id' => $existing['id']]);
            }
            Response::json(['success' => true], 200);
            return;
        }

        try {
            NewsletterSubscriber::create(['email' => $email]);
        } catch (PDOException $e) {
            Response::json(['error' => 'Une erreur est survenue'], 500);
            return;
        }

        Response::json(['success' => true], 201);
    }
}
