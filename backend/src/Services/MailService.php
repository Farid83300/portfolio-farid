<?php

namespace App\Services;

class MailService
{
    public function sendContactNotification(string $name, string $email, ?string $subject, string $content): bool
    {
        $config = require __DIR__ . '/../Config/config.php';
        $to = $config['mail']['to'] ?? null;

        if (!$to) {
            return false;
        }

        // SÉCURITÉ: neutralise tout retour à la ligne dans les champs contrôlés par le
        // visiteur avant de les injecter dans les en-têtes / le sujet du mail (header injection).
        $sanitize = static fn (string $value): string => trim(preg_replace('/[\r\n]+/', ' ', $value));

        $name = $sanitize($name);
        $email = $sanitize($email);
        $subject = $subject !== null ? $sanitize($subject) : null;

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        $mailSubject = '[Portfolio] Nouveau message de contact' . ($subject ? " - {$subject}" : '');
        $body = "Nom: {$name}\nEmail: {$email}\n\n{$content}";
        $headers = "From: no-reply@faridzaffalone.com\r\nReply-To: {$email}\r\n";

        // SÉCURITÉ/délivrabilité: fixe l'enveloppe d'expéditeur (Return-Path) sur le
        // domaine du site plutôt que de laisser PHP utiliser l'utilisateur système par
        // défaut — sur hébergement mutualisé, un Return-Path qui ne correspond pas au
        // domaine expéditeur est un signal fort de spam pour beaucoup de filtres.
        return @mail($to, $mailSubject, $body, $headers, '-f no-reply@faridzaffalone.com');
    }
}
