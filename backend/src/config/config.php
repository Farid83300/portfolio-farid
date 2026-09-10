<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

return [
    'db' => [
        'host' => $_ENV['DB_HOST'],
        'port' => $_ENV['DB_PORT'] ?? '3306',
        'name' => $_ENV['DB_NAME'],
        'user' => $_ENV['DB_USER'],
        'pass' => $_ENV['DB_PASS'],
    ],
    'jwt' => [
        'secret' => $_ENV['JWT_SECRET'],
        'expire' => (int) ($_ENV['JWT_EXPIRE'] ?? 1800),
        'refresh_expire' => (int) ($_ENV['REFRESH_TOKEN_EXPIRE'] ?? 2592000),
    ],
    'cors' => [
        'origin' => $_ENV['CORS_ORIGIN'],
    ],
    'mail' => [
        'to' => $_ENV['MAIL_TO'] ?? null,
    ],
    'app' => [
        'url' => $_ENV['APP_URL'] ?? 'http://localhost:8000',
        // SÉCURITÉ: par défaut 'production' (fail-safe) si APP_ENV est absent du .env —
        // mieux vaut cacher des erreurs par erreur en dev que les afficher par erreur en prod.
        'env' => $_ENV['APP_ENV'] ?? 'production',
    ],
];
