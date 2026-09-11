-- ==========================================================
-- Database Schema untuk Monopoly Nusantara
-- Database: if0_39237979_monopoli (InfinityFree MySQL)
-- ==========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+08:00";

-- --------------------------------------------------------
-- 1. TABEL ADMINS (Autentikasi Akun Panel Admin)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(30) DEFAULT 'SUPER_ADMIN',
  `last_login` DATETIME NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Akun Default Admin (Username: Fahrul | Password: Fahrul2005)
INSERT INTO `admins` (`id`, `username`, `password_hash`, `name`, `role`, `created_at`) 
VALUES (
  1, 
  'Fahrul', 
  '$2y$10$npQx9emll9.B9ihSD2bW5.YhQ4ZU41./Ps.mfanPpRRvB8oG6mJT6', 
  'Fahrul (Super Admin)', 
  'SUPER_ADMIN', 
  NOW()
)
ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`), `name` = VALUES(`name`);

-- --------------------------------------------------------
-- 2. TABEL ROOMS (Penyimpanan Ruangan Multiplayer Online)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL UNIQUE,
  `host_name` VARCHAR(100) NOT NULL,
  `status` VARCHAR(20) DEFAULT 'LOBBY', -- 'LOBBY', 'PLAYING', 'FINISHED'
  `max_players` INT(2) DEFAULT 4,
  `player_count` INT(2) DEFAULT 1,
  `human_count` INT(2) DEFAULT 1,
  `bot_count` INT(2) DEFAULT 0,
  `options_json` TEXT NULL,
  `game_state_json` LONGTEXT NULL,
  `last_activity` INT(11) NOT NULL,
  `created_at` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_room_code` (`code`),
  INDEX `idx_room_status` (`status`),
  INDEX `idx_last_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. TABEL GAME_HISTORY (Riwayat Permainan & Pemenang)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `game_history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `room_code` VARCHAR(30) NOT NULL,
  `winner_name` VARCHAR(100) NOT NULL,
  `winner_money` BIGINT(20) DEFAULT 0,
  `total_players` INT(2) DEFAULT 4,
  `total_rounds` INT(11) DEFAULT 0,
  `duration_seconds` INT(11) DEFAULT 0,
  `game_summary_json` LONGTEXT NULL,
  `finished_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_history_winner` (`winner_name`),
  INDEX `idx_finished_at` (`finished_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. TABEL CHAT_LOGS (Riwayat Pesan Chat Pemain)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat_logs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `room_code` VARCHAR(30) NOT NULL,
  `sender_id` INT(11) NOT NULL,
  `sender_name` VARCHAR(100) NOT NULL,
  `sender_color` VARCHAR(20) DEFAULT '#3b82f6',
  `message` TEXT NULL,
  `emote` VARCHAR(20) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_chat_room` (`room_code`),
  INDEX `idx_chat_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. TABEL SYSTEM_SETTINGS (Pengaturan Dinamis Sistem)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `system_settings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(50) NOT NULL UNIQUE,
  `setting_value` TEXT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `system_settings` (`setting_key`, `setting_value`) VALUES
('site_title', 'Monopoly Nusantara'),
('maintenance_mode', '0'),
('starting_money', '15000000'),
('allow_custom_rules', '1')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);
