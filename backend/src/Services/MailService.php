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

        // Neutralise tout retour à la ligne dans les champs contrôlés par le visiteur
        // avant de les injecter dans les en-têtes / le sujet du mail (header injection).
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

        return @mail($to, $mailSubject, $body, $headers);
    }
}
