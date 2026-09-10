<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Message;
use App\Services\MailService;
use App\Services\RateLimiter;

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

        // SÉCURITÉ: validation stricte des longueurs côté serveur (jamais se fier
        // uniquement à la validation React) — évite l'envoi de payloads démesurés
        // (abus de stockage, spam mail).
        if (mb_strlen($data['name']) > 150 || mb_strlen($data['email']) > 190
            || mb_strlen($data['subject'] ?? '') > 200 || mb_strlen($data['message']) > 5000) {
            Response::json(['error' => 'Un des champs dépasse la longueur autorisée'], 400);
            return;
        }

        // SÉCURITÉ: throttle anti-spam/anti-flood par IP sur ce formulaire public
        // (pas d'authentification possible ici, donc pas d'autre identifiant fiable).
        $rateLimiter = new RateLimiter();
        $key = 'contact:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        if ($rateLimiter->tooManyAttempts($key)) {
            Response::json(['error' => 'Trop de messages envoyés. Réessayez plus tard.'], 429);
            return;
        }
        $rateLimiter->hit($key, 8, 600);

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
