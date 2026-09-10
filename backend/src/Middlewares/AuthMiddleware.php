<?php

namespace App\Middlewares;

use App\Core\Response;
use App\Services\AuthService;

// SÉCURITÉ: garde d'accès posée en tête de chaque route /admin/* protégée. Rejette
// (401/403 + exit) toute requête sans Bearer token, ou dont le token est invalide/expiré/
// scope insuffisant — voir AuthService::verifyToken() pour la vérification signature+exp.
class AuthMiddleware
{
    public static function handle(string $requiredScope = 'full'): array
    {
        $authHeader = '';

        // Méthode principale
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        } 
        // Fallback si getallheaders() ne capte rien (fréquent avec MAMP/FastCGI)
        elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            Response::json(['error' => 'Non autorisé'], 401);
            exit;
        }

        $token = $matches[1];
        $authService = new AuthService();
        $payload = $authService->verifyToken($token);

        if (!$payload) {
            Response::json(['error' => 'Token invalide ou expiré'], 401);
            exit;
        }

        $scope = $payload['scope'] ?? 'full';
        if ($requiredScope !== 'any' && $scope !== $requiredScope && $scope !== 'full') {
            Response::json(['error' => 'Activation du 2FA requise'], 403);
            exit;
        }

        return $payload;
    }
}
