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

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}
