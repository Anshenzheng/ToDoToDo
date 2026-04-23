CREATE DATABASE IF NOT EXISTS todotodo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE todotodo;

CREATE TABLE IF NOT EXISTS todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    priority ENUM('HIGH', 'MEDIUM', 'LOW') DEFAULT 'MEDIUM',
    category ENUM('WORK', 'STUDY', 'LIFE'),
    due_date DATETIME,
    reminder_time DATETIME,
    reminder_enabled BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_due_date (due_date),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
