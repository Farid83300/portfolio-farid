-- SÉCURITÉ: refresh tokens à rotation + révocation, pour permettre un logout
-- réel côté serveur et raccourcir la durée de vie de l'access token JWT
-- (celui-ci reste stateless/non révocable, donc on le garde court : 30 min).
CREATE TABLE refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_refresh_tokens_hash (token_hash),
  INDEX idx_refresh_tokens_user (user_id)
);
