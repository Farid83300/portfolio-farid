<?php

namespace App\Services;

use OTPHP\TOTP;

class TotpService
{
    public function generateSecret(string $email): TOTP
    {
        $totp = TOTP::generate();
        $totp->setLabel($email);
        $totp->setIssuer('Portfolio Farid Zaffalone');

        return $totp;
    }

    public function fromSecret(string $secret, string $email): TOTP
    {
        $totp = TOTP::createFromSecret($secret);
        $totp->setLabel($email);
        $totp->setIssuer('Portfolio Farid Zaffalone');

        return $totp;
    }

    public function verify(string $secret, string $email, string $code): bool
    {
        return $this->fromSecret($secret, $email)->verify($code);
    }
}
