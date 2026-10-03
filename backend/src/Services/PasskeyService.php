<?php

namespace App\Services;

use App\Config\Database;
use App\Models\WebauthnCredential;
use lbuchs\WebAuthn\WebAuthn;
use lbuchs\WebAuthn\WebAuthnException;

// Enveloppe autour de lbuchs/webauthn : génère/valide les challenges (à usage unique,
// stockés en base, 5 min) et vérifie les réponses du navigateur.
class PasskeyService
{
    private const CHALLENGE_TTL = 300;

    private WebAuthn $webauthn;
    /** @var string[] */
    private array $allowedOrigins;

    public function __construct()
    {
        $config = require __DIR__ . '/../Config/config.php';
        // base64url partout dans le JSON échangé avec @simplewebauthn/browser.
        $this->webauthn = new WebAuthn($config['webauthn']['rp_name'], $config['webauthn']['rp_id'], null, true);
        $this->allowedOrigins = array_map('trim', explode(',', $config['cors']['origin']));
    }

    /** @return array{challenge_id: string, options: \stdClass} */
    public function registrationOptions(int $userId, string $email): array
    {
        $existing = array_map(
            fn ($c) => self::b64urlDecode($c['credential_id']),
            WebauthnCredential::forUser($userId)
        );

        // userVerification=required : la passkey doit être déverrouillée (biométrie/PIN),
        // c'est ce qui en fait un vrai second facteur.
        $options = $this->webauthn->getCreateArgs(
            (string) $userId, $email, $email, 60, 'preferred', true, null, $existing
        );

        return [
            'challenge_id' => $this->storeChallenge($userId, 'register', $this->webauthn->getChallenge()->getBinaryString()),
            'options' => $options,
        ];
    }

    /** @return array{challenge_id: string, options: \stdClass}|null null si aucune passkey enregistrée */
    public function loginOptions(int $userId): ?array
    {
        $credentials = WebauthnCredential::forUser($userId);
        if (!$credentials) {
            return null;
        }

        $ids = array_map(fn ($c) => self::b64urlDecode($c['credential_id']), $credentials);
        $options = $this->webauthn->getGetArgs($ids, 60, true, true, true, true, true, true);

        return [
            'challenge_id' => $this->storeChallenge($userId, 'login', $this->webauthn->getChallenge()->getBinaryString()),
            'options' => $options,
        ];
    }

    /**
     * Valide une réponse d'enregistrement et stocke la passkey.
     * @throws WebAuthnException
     */
    public function finishRegistration(string $challengeId, int $userId, array $credential, string $name): void
    {
        $challenge = $this->consumeChallenge($challengeId, $userId, 'register');
        $response = $credential['response'] ?? [];
        $clientDataJSON = self::b64urlDecode($response['clientDataJSON'] ?? '');
        $this->assertOrigin($clientDataJSON);

        $data = $this->webauthn->processCreate(
            $clientDataJSON,
            self::b64urlDecode($response['attestationObject'] ?? ''),
            $challenge,
            true,   // userVerification obligatoire
            true,
            false   // pas de vérification de chaîne de certificats (attestation "none")
        );

        WebauthnCredential::create(
            $userId,
            self::b64urlEncode($data->credentialId),
            $name,
            $data->credentialPublicKey,
            (int) ($data->signatureCounter ?? 0)
        );
    }

    /**
     * Valide une assertion de connexion. Retourne l'id utilisateur si OK.
     * @throws WebAuthnException
     */
    public function finishLogin(string $challengeId, array $credential): int
    {
        $row = $this->loadChallenge($challengeId, 'login');
        $userId = (int) $row['user_id'];
        $challenge = self::b64urlDecode($row['challenge']);

        $stored = WebauthnCredential::findByCredentialId($userId, (string) ($credential['id'] ?? ''));
        if (!$stored) {
            throw new WebAuthnException('unknown credential', WebAuthnException::INVALID_DATA);
        }

        $response = $credential['response'] ?? [];
        $clientDataJSON = self::b64urlDecode($response['clientDataJSON'] ?? '');
        $this->assertOrigin($clientDataJSON);

        $this->webauthn->processGet(
            $clientDataJSON,
            self::b64urlDecode($response['authenticatorData'] ?? ''),
            self::b64urlDecode($response['signature'] ?? ''),
            $stored['public_key'],
            $challenge,
            $stored['sign_count'] > 0 ? (int) $stored['sign_count'] : null,
            true,
            true
        );

        $newCount = $this->webauthn->getSignatureCounter();
        WebauthnCredential::touch((int) $stored['id'], $newCount !== null ? (int) $newCount : (int) $stored['sign_count']);

        return $userId;
    }

    // SÉCURITÉ: en plus du contrôle du RP ID fait par la lib, l'origine exacte de la page
    // qui a déclenché la cérémonie doit faire partie de la whitelist CORS du frontend.
    private function assertOrigin(string $clientDataJSON): void
    {
        $client = json_decode($clientDataJSON);
        $origin = is_object($client) ? ($client->origin ?? null) : null;
        if (!is_string($origin) || !in_array($origin, $this->allowedOrigins, true)) {
            throw new WebAuthnException('origin not allowed', WebAuthnException::INVALID_ORIGIN);
        }
    }

    // SÉCURITÉ/fiabilité: l'expiration est calculée par MySQL (NOW()) et non par PHP — les deux
    // peuvent avoir des fuseaux horaires différents (cas MAMP), ce qui rendrait le challenge
    // déjà expiré à la création.
    private function storeChallenge(int $userId, string $type, string $binary): string
    {
        $pdo = Database::getInstance();
        $pdo->exec('DELETE FROM webauthn_challenges WHERE expires_at < NOW()');

        $id = bin2hex(random_bytes(16));
        $pdo->prepare(
            'INSERT INTO webauthn_challenges (id, user_id, type, challenge, expires_at)
             VALUES (:id, :user_id, :type, :challenge, DATE_ADD(NOW(), INTERVAL ' . self::CHALLENGE_TTL . ' SECOND))'
        )->execute([
            'id' => $id,
            'user_id' => $userId,
            'type' => $type,
            'challenge' => self::b64urlEncode($binary),
        ]);

        return $id;
    }

    // Usage unique : le challenge est supprimé dès qu'on le lit, qu'il soit valide ou non.
    private function loadChallenge(string $id, string $type): array
    {
        $pdo = Database::getInstance();
        $stmt = $pdo->prepare('SELECT * FROM webauthn_challenges WHERE id = :id AND type = :type AND expires_at > NOW() LIMIT 1');
        $stmt->execute(['id' => $id, 'type' => $type]);
        $row = $stmt->fetch();
        $pdo->prepare('DELETE FROM webauthn_challenges WHERE id = :id')->execute(['id' => $id]);

        if (!$row) {
            throw new WebAuthnException('challenge expired or unknown', WebAuthnException::INVALID_CHALLENGE);
        }

        return $row;
    }

    private function consumeChallenge(string $id, int $userId, string $type): string
    {
        $row = $this->loadChallenge($id, $type);
        if ((int) $row['user_id'] !== $userId) {
            throw new WebAuthnException('challenge mismatch', WebAuthnException::INVALID_CHALLENGE);
        }

        return self::b64urlDecode($row['challenge']);
    }

    public static function b64urlEncode(string $bin): string
    {
        return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
    }

    public static function b64urlDecode(string $data): string
    {
        return (string) base64_decode(strtr($data, '-_', '+/'));
    }
}
