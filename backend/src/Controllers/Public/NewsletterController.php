<?php

namespace App\Controllers\Public;

use App\Config\Database;
use App\Core\Request;
use App\Core\Response;
use App\Models\NewsletterSubscriber;
use App\Services\RateLimiter;
use PDOException;

class NewsletterController
{
    public function store(Request $request): void
    {
        $data = $request->getBody();
        $email = trim($data['email'] ?? '');

        // SÉCURITÉ: FILTER_VALIDATE_EMAIL ne borne pas la longueur — on le fait
        // explicitement pour éviter un abus de stockage via une valeur démesurée.
        if (mb_strlen($email) > 190 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::json(['error' => 'Email invalide'], 400);
            return;
        }

        // SÉCURITÉ: throttle anti-flood par IP.
        $rateLimiter = new RateLimiter();
        $key = 'newsletter:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de tentatives. Réessayez plus tard.'], 429);
            return;
        }
        $rateLimiter->hit($key, 10, 600);

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
