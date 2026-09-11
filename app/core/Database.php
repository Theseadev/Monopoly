<?php

namespace App\Core;

use PDO;
use PDOException;

class Database {
    private static ?PDO $pdo = null;
    private static bool $connectionAttempted = false;
    private static ?string $lastError = null;

    /**
     * Dapatkan koneksi PDO (Singleton)
     */
    public static function getConnection(): ?PDO {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        if (self::$connectionAttempted) {
            return null;
        }

        self::$connectionAttempted = true;
        $configPath = __DIR__ . '/../config/database.php';
        if (!is_file($configPath)) {
            self::$lastError = "Berkas konfigurasi database tidak ditemukan.";
            return null;
        }

        $config = require $configPath;

        try {
            $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}";
            self::$pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);
            return self::$pdo;
        } catch (PDOException $e) {
            self::$lastError = $e->getMessage();
            // Catat log jika diperlukan tanpa menghentikan aplikasi (graceful fallback)
            return null;
        }
    }

    /**
     * Cek apakah database terhubung
     */
    public static function isConnected(): bool {
        return self::getConnection() !== null;
    }

    /**
     * Dapatkan error koneksi terakhir
     */
    public static function getLastError(): ?string {
        return self::$lastError;
    }

    /**
     * Eksekusi Query dengan Parameter
     */
    public static function query(string $sql, array $params = []): ?\PDOStatement {
        $db = self::getConnection();
        if (!$db) return null;

        try {
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            self::$lastError = $e->getMessage();
            return null;
        }
    }

    /**
     * Ambil 1 Baris Data (Fetch)
     */
    public static function fetch(string $sql, array $params = []): ?array {
        $stmt = self::query($sql, $params);
        if (!$stmt) return null;
        $res = $stmt->fetch();
        return is_array($res) ? $res : null;
    }

    /**
     * Ambil Semua Baris Data (FetchAll)
     */
    public static function fetchAll(string $sql, array $params = []): array {
        $stmt = self::query($sql, $params);
        if (!$stmt) return [];
        $res = $stmt->fetchAll();
        return is_array($res) ? $res : [];
    }

    /**
     * Verifikasi Login Admin dari Database
     */
    public static function verifyAdminCredentials(string $username, string $password): ?array {
        $db = self::getConnection();
        if ($db) {
            $user = self::fetch("SELECT * FROM admins WHERE username = ? LIMIT 1", [$username]);
            if ($user && !empty($user['password_hash'])) {
                if (password_verify($password, $user['password_hash'])) {
                    // Update last login
                    self::query("UPDATE admins SET last_login = NOW() WHERE id = ?", [$user['id']]);
                    return $user;
                }
            }
        }

        // Fallback default superadmin (Fahrul / Fahrul2005) jika DB offline / initial
        if ($username === 'Fahrul' && $password === 'Fahrul2005') {
            return [
                'id' => 1,
                'username' => 'Fahrul',
                'name' => 'Fahrul (Super Admin)',
                'isFallback' => true
            ];
        }

        return null;
    }
}
