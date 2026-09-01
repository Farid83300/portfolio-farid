<?php

namespace App\Core;

class Request
{
    public string $method;
    public string $uri;
    private array $body;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];

        // On récupère l'URI sans les query params, et sans le préfixe du dossier public
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $scriptDir = dirname($_SERVER['SCRIPT_NAME']); // ex: /portfolio-farid-backend/public
        if ($scriptDir !== '/' && str_starts_with($uri, $scriptDir)) {
            $uri = substr($uri, strlen($scriptDir));
        }
        $this->uri = '/' . trim($uri, '/');

        $rawBody = file_get_contents('php://input');
        $decoded = json_decode($rawBody, true);
        $this->body = is_array($decoded) ? $decoded : [];
    }

    public function getBody(): array
    {
        return $this->body;
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getUri(): string
    {
        return $this->uri;
    }
}
