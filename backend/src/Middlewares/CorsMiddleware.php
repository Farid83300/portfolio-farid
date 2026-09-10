<?php

namespace App\Middlewares;

class CorsMiddleware
{
    public static function handle(): void
    {
        $config = require __DIR__ . '/../Config/config.php';

        // SÉCURITÉ: whitelist stricte des origines (CORS_ORIGIN, une ou plusieurs séparées
        // par des virgules dans .env) — jamais de wildcard "*". On ne renvoie
        // Access-Control-Allow-Origin QUE si l'Origin de la requête est explicitement
        // dans la liste, sinon l'en-tête est omis et le navigateur bloque la réponse
        // côté client. Pas de crédentials (cookies) utilisés ici (auth par Bearer token),
        // donc pas besoin d'Access-Control-Allow-Credentials.
        $allowedOrigins = array_filter(array_map('trim', explode(',', $config['cors']['origin'])));
        $requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($requestOrigin, $allowedOrigins, true)) {
            header('Access-Control-Allow-Origin: ' . $requestOrigin);
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');

        // SÉCURITÉ: en-têtes de durcissement de base (n'affectent pas une API JSON).
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('Referrer-Policy: strict-origin-when-cross-origin');

        // SÉCURITÉ: masque la version de PHP exposée par le serveur (en plus
        // d'expose_php=Off côté php.ini, recommandé en prod — voir CLAUDE.md).
        header_remove('X-Powered-By');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}
