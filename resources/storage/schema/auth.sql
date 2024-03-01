/* Auth sys required fields */
CREATE TABLE auth_user (
    id VARCHAR(255) PRIMARY KEY
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/* Auth custom implementation (email/password) fields */
ALTER TABLE auth_user ADD COLUMN email VARCHAR(45) NOT NULL UNIQUE;
ALTER TABLE auth_user ADD COLUMN hashed_password VARCHAR(255) NOT NULL AFTER email;
/* Custom fields */
ALTER TABLE auth_user ADD COLUMN access_level TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 AFTER hashed_password;

/* Auth sys required fields */
CREATE TABLE auth_user_session (
    id VARCHAR(255) PRIMARY KEY,
    expires_at DATETIME NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES auth_user (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
