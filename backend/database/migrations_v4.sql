-- Protection anti brute-force sur le login admin et le 2FA.
CREATE TABLE rate_limits (
  `key` VARCHAR(191) NOT NULL PRIMARY KEY,
  attempts INT NOT NULL DEFAULT 0,
  locked_until DATETIME DEFAULT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
