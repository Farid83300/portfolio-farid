<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use RuntimeException;

class AuthService
{
    private string $secret;
    private int $expire;
    private int $refreshExpire;

    public function __construct()
    {
        $config = require __DIR__ . '/../Config/config.php';
        $this->secret = $config['jwt']['secret'];
        $this->expire = $config['jwt']['expire'];
        $this->refreshExpire = $config['jwt']['refresh_expire'];

        // SÉCURITÉ: refuse de démarrer avec un secret JWT faible ou resté à sa valeur
        // d'exemple — un secret court/prévisible permettrait de forger des tokens admin
        // (attaque par force brute ou dictionnaire sur la signature HS256).
        if (
            strlen($this->secret) < 32
            || str_starts_with($this->secret, 'change_moi')
        ) {
            throw new RuntimeException(
                'JWT_SECRET est absent, trop court ou laissé à sa valeur d\'exemple. '
                . 'Génère un secret fort (ex: `php -r "echo bin2hex(random_bytes(32));"`) dans .env.'
            );
        }
    }

    public function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public function verifyPassword(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    // SÉCURITÉ: access token — courte durée de vie (30 min par défaut, voir .env
    // JWT_EXPIRE) car un JWT est stateless et non révocable avant son expiration
    // naturelle. La session longue durée est portée par le refresh token (voir
    // generateRefreshToken), qui lui est stocké en base et révocable à tout moment.
    public function generateToken(int $userId, string $email, string $scope = 'full'): string
    {
        $payload = [
            'sub' => $userId,
            'email' => $email,
            'scope' => $scope,
            'iat' => time(),
            'exp' => time() + $this->expire,
        ];

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    // SÉCURITÉ: JWT::decode() vérifie À LA FOIS la signature HMAC (intégrité/authenticité
    // — impossible à forger sans connaître $this->secret) ET la claim `exp` (rejette un
    // token expiré via ExpiredException) avant de renvoyer le payload. Toute erreur —
    // signature invalide, token expiré, malformé — est traitée comme "non authentifié".
    public function verifyToken(string $token): ?array
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            return (array) $decoded;
        } catch (\Throwable $e) {
            return null;
        }
    }

    // SÉCURITÉ: le refresh token est une valeur opaque aléatoire (256 bits, CSPRNG),
    // pas un JWT — il n'est jamais vérifiable/décodable côté client, seulement comparé
    // (par son hash) à ce qui est stocké en base. C'est ce qui permet sa révocation.
    public function generateRefreshTokenPlain(): string
    {
        return bin2hex(random_bytes(32));
    }

    public function hashRefreshToken(string $token): string
    {
        return hash('sha256', $token);
    }

    public function refreshExpiresAt(): string
    {
        return date('Y-m-d H:i:s', time() + $this->refreshExpire);
    }
}
