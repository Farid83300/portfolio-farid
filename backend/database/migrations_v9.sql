-- Passkeys (WebAuthn) : méthode principale de seconde authentification,
-- le TOTP (users.totp_*) reste disponible en secours.
CREATE TABLE webauthn_credentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  credential_id VARCHAR(512) NOT NULL,
  name VARCHAR(100) NOT NULL,
  public_key TEXT NOT NULL,
  sign_count INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_webauthn_credential_id (credential_id),
  INDEX idx_webauthn_credentials_user (user_id)
);

-- Challenges à usage unique (5 min) pour l'enregistrement et la connexion.
CREATE TABLE webauthn_challenges (
  id CHAR(32) PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('register','login') NOT NULL,
  challenge VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_webauthn_challenges_expires (expires_at)
);
