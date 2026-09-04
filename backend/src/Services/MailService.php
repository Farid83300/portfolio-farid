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

        $mailSubject = '[Portfolio] Nouveau message de contact' . ($subject ? " - {$subject}" : '');
        $body = "Nom: {$name}\nEmail: {$email}\n\n{$content}";
        $headers = "From: no-reply@faridzaffalone.com\r\nReply-To: {$email}\r\n";

        return @mail($to, $mailSubject, $body, $headers);
    }
}
