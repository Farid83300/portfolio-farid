<?php

namespace App\Middlewares;

class CorsMiddleware
{
    public static function handle(): void
    {
        $config = require __DIR__ . '/../Config/config.php';

        header('Access-Control-Allow-Origin: ' . $config['cors']['origin']);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');

        // En-têtes de durcissement de base (n'affectent pas une API JSON).
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('Referrer-Policy: strict-origin-when-cross-origin');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}
