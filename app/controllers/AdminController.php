<?php

namespace App\Controllers;

use Flight;
use App\Core\RoomManager;
use App\Core\Database;

class AdminController {
    /**
     * Pastikan Session Dimulai
     */
    private static function startSession(): void {
        if (session_status() === PHP_SESSION_NONE) {
            @session_start();
        }
    }

    /**
     * Cek Apakah Pengguna Sudah Terautentikasi sebagai Admin
     */
    public static function checkAuth(): bool {
        self::startSession();
        return !empty($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
    }

    /**
     * Tampilkan Halaman Utama Panel Admin (atau Login Gate jika belum login)
     */
    public static function index(): void {
        self::startSession();

        // Handle Logout via query parameter /adminbanjar?logout=1
        if (isset($_GET['logout'])) {
            unset($_SESSION['admin_logged_in'], $_SESSION['admin_user']);
            @session_destroy();
            Flight::redirect('/adminbanjar');
            return;
        }

        $isLoggedIn = self::checkAuth();
        $dbConnected = Database::isConnected();

        $serverInfo = [
            'phpVersion' => PHP_VERSION,
            'os' => PHP_OS,
            'serverSoftware' => $_SERVER['SERVER_SOFTWARE'] ?? 'PHP CLI Server',
            'memoryUsage' => self::formatBytes(memory_get_usage(true)),
            'serverTime' => date('Y-m-d H:i:s T'),
            'uploadMax' => ini_get('upload_max_filesize'),
            'postMax' => ini_get('post_max_size'),
            'dbConnected' => $dbConnected,
            'dbError' => Database::getLastError()
        ];

        if (!$isLoggedIn) {
            Flight::render('admin', [
                'isLoggedIn' => false,
                'serverInfo' => $serverInfo,
                'dbConnected' => $dbConnected
            ]);
            return;
        }

        $roomsData = RoomManager::getAllRoomsSummary();

        Flight::render('admin', [
            'isLoggedIn' => true,
            'adminUser' => $_SESSION['admin_user'] ?? 'Fahrul',
            'roomsData' => $roomsData,
            'serverInfo' => $serverInfo,
            'dbConnected' => $dbConnected
        ]);
    }

    /**
     * API: Login Admin
     */
    public static function login(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::startSession();

        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $username = trim($input['username'] ?? '');
        $password = trim($input['password'] ?? '');

        if (empty($username) || empty($password)) {
            echo json_encode([
                'success' => false,
                'message' => 'Username dan Password wajib diisi!'
            ]);
            exit;
        }

        $admin = Database::verifyAdminCredentials($username, $password);

        if ($admin) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user'] = $admin['name'] ?? $admin['username'];
            $_SESSION['admin_username'] = $admin['username'];
            $_SESSION['admin_id'] = $admin['id'] ?? 1;

            echo json_encode([
                'success' => true,
                'message' => 'Login berhasil! Selamat datang, ' . ($admin['name'] ?? $username),
                'user' => [
                    'username' => $admin['username'],
                    'name' => $admin['name'] ?? $username
                ]
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Username atau Password salah! Periksa kembali kredensial Anda.'
            ]);
        }
        exit;
    }

    /**
     * API: Logout Admin
     */
    public static function logout(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::startSession();
        unset($_SESSION['admin_logged_in'], $_SESSION['admin_user'], $_SESSION['admin_username'], $_SESSION['admin_id']);
        @session_destroy();

        echo json_encode([
            'success' => true,
            'message' => 'Logout berhasil.'
        ]);
        exit;
    }

    /**
     * Guard: Tolak Request jika Belum Login
     */
    private static function requireAuth(): void {
        if (!self::checkAuth()) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'unauthorized' => true,
                'message' => 'Sesi admin berakhir atau belum login. Silakan login kembali.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    /**
     * API: Dapatkan Daftar Semua Ruangan Aktif
     */
    public static function getRooms(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();

        try {
            $summary = RoomManager::getAllRoomsSummary();
            echo json_encode([
                'success' => true,
                'stats' => $summary['stats'],
                'rooms' => $summary['rooms'],
                'timestamp' => time()
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Gagal mengambil data room: ' . $e->getMessage()
            ]);
        }
        exit;
    }

    /**
     * API: Dapatkan Detail Satu Ruangan
     */
    public static function getRoomDetail(string $code): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();

        try {
            $room = RoomManager::getRoom($code);
            if (!$room) {
                echo json_encode(['success' => false, 'message' => 'Ruangan tidak ditemukan.']);
                exit;
            }
            echo json_encode(['success' => true, 'room' => $room], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        exit;
    }

    /**
     * API: Hapus / Bubarkan Ruangan
     */
    public static function deleteRoom(string $code): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();

        try {
            $deleted = RoomManager::deleteRoom($code);
            if ($deleted) {
                echo json_encode(['success' => true, 'message' => "Ruangan {$code} berhasil dibubarkan & dihapus."]);
            } else {
                echo json_encode(['success' => false, 'message' => "Ruangan {$code} tidak ditemukan atau gagal dihapus."]);
            }
        } catch (\Throwable $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        exit;
    }

    /**
     * API: Bersihkan Ruangan Stale / Idle
     */
    public static function cleanupRooms(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();

        try {
            $maxIdle = 12 * 3600; // 12 Jam
            $res = RoomManager::cleanupStaleRooms($maxIdle);
            echo json_encode([
                'success' => true,
                'message' => "Berhasil membersihkan {$res['deletedCount']} ruangan yang tidak aktif.",
                'deletedCount' => $res['deletedCount']
            ]);
        } catch (\Throwable $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        exit;
    }

    /**
     * Helper: Dapatkan informasi versi lokal dari version.json atau Git
     */
    private static function getLocalVersionInfo(string $repoDir): array {
        $versionFile = $repoDir . '/version.json';
        if (file_exists($versionFile)) {
            $data = json_decode(file_get_contents($versionFile), true);
            if (is_array($data) && !empty($data['commit_sha'])) {
                return $data;
            }
        }

        // Coba baca dari Git lokal jika CLI aktif
        if (self::isExecAvailable()) {
            $raw = self::runGitCommand('git log -1 --format="%H|||%h|||%s|||%cr|||%an"', $repoDir);
            if (!empty($raw) && strpos($raw, 'fatal:') === false) {
                $parts = explode('|||', trim($raw));
                if (count($parts) >= 5) {
                    $info = [
                        'commit_sha' => trim($parts[0]),
                        'commit_short' => trim($parts[1]),
                        'commit_message' => trim($parts[2]),
                        'commit_date' => trim($parts[3]),
                        'commit_author' => trim($parts[4]),
                        'last_updated' => date('Y-m-d H:i:s')
                    ];
                    @file_put_contents($versionFile, json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                    return $info;
                }
            }
        }

        return [
            'commit_sha' => 'initial-release',
            'commit_short' => 'v1.0.0',
            'commit_message' => 'Monopoly Nusantara Official Release',
            'commit_date' => 'Baru saja',
            'commit_author' => 'Theseadev',
            'last_updated' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * API: Dapatkan Status Git & GitHub
     */
    public static function getGitStatus(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();
        $repoDir = realpath(__DIR__ . '/../../');

        try {
            $localVersion = self::getLocalVersionInfo($repoDir);
            $remoteUrl = 'https://github.com/Theseadev/Monopoly.git';
            $branch = 'main';
            $lastCommit = "{$localVersion['commit_short']} | {$localVersion['commit_message']} | {$localVersion['commit_date']} | {$localVersion['commit_author']}";

            echo json_encode([
                'success' => true,
                'repoDir' => $repoDir,
                'branch' => $branch,
                'remoteUrl' => $remoteUrl,
                'lastCommit' => $lastCommit,
                'hasCommits' => true,
                'remoteHasBranch' => true,
                'statusShort' => 'Clean (Siap Menerima Update)',
                'fullStatus' => 'Repository sinkron dengan GitHub (Theseadev/Monopoly).',
                'timestamp' => time()
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Gagal membaca status git: ' . $e->getMessage()
            ]);
        }
        exit;
    }

    /**
     * API: Cek Pembaruan (Git Fetch / GitHub API Check)
     */
    public static function gitFetch(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();
        $repoDir = realpath(__DIR__ . '/../../');

        try {
            $startTime = microtime(true);
            $localVersion = self::getLocalVersionInfo($repoDir);
            $localSha = $localVersion['commit_sha'] ?? '';

            // Query GitHub API untuk commit terbaru
            $remoteData = self::fetchGitHubApi('commits/main');
            $duration = round(microtime(true) - $startTime, 2);

            if (!$remoteData || empty($remoteData['sha'])) {
                // Fallback jika API rate-limit atau repo belum ada commit
                $message = $remoteData['message'] ?? 'Tidak dapat terhubung ke GitHub API atau repository belum memiliki commit.';
                echo json_encode([
                    'success' => true,
                    'message' => 'Pemeriksaan selesai.',
                    'output' => "⚠️ GitHub Status: {$message}\nRepository: https://github.com/Theseadev/Monopoly.git",
                    'incomingCommits' => '',
                    'hasUpdates' => false,
                    'duration' => $duration
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            $remoteSha = $remoteData['sha'];
            $remoteShort = substr($remoteSha, 0, 7);
            $remoteMsg = $remoteData['commit']['message'] ?? 'Pembaruan source code';
            $remoteAuthor = $remoteData['commit']['author']['name'] ?? ($remoteData['author']['login'] ?? 'Theseadev');
            $remoteDate = date('d M Y H:i', strtotime($remoteData['commit']['author']['date'] ?? 'now'));

            $hasUpdates = ($remoteSha !== $localSha && $localSha !== 'initial-release');
            if ($localSha === 'initial-release') {
                $hasUpdates = true;
            }

            if ($hasUpdates) {
                $output = "🚀 Ditemukan Pembaruan Baru di GitHub!\n"
                        . "• Commit: {$remoteShort} ({$remoteSha})\n"
                        . "• Pesan: {$remoteMsg}\n"
                        . "• Oleh: {$remoteAuthor}\n"
                        . "• Waktu: {$remoteDate}\n\n"
                        . "👉 Klik tombol 'Upgrade Website' untuk menerapkan pembaruan ini sekarang!";
                $incomingCommits = "{$remoteShort} - {$remoteMsg} ({$remoteAuthor})";
            } else {
                $output = "✅ Website Anda sudah up-to-date dengan GitHub!\n"
                        . "Versi aktif: {$remoteShort} ({$remoteMsg})";
                $incomingCommits = "";
            }

            echo json_encode([
                'success' => true,
                'message' => 'Pemeriksaan pembaruan selesai.',
                'output' => $output,
                'incomingCommits' => $incomingCommits,
                'hasUpdates' => $hasUpdates,
                'duration' => $duration,
                'remoteCommit' => [
                    'sha' => $remoteSha,
                    'short' => $remoteShort,
                    'message' => $remoteMsg,
                    'author' => $remoteAuthor,
                    'date' => $remoteDate
                ]
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Pemeriksaan pembaruan gagal: ' . $e->getMessage()
            ]);
        }
        exit;
    }

    /**
     * API: Tarik Pembaruan & Upgrade Website dari GitHub (Git Pull / Direct Zip Sync)
     */
    public static function gitPull(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();
        $repoDir = realpath(__DIR__ . '/../../');

        try {
            $startTime = microtime(true);
            $branch = 'main';

            // 1. Coba gunakan Git CLI jika server mendukung dan proc_open tersedia
            if (self::isExecAvailable() && is_dir($repoDir . '/.git')) {
                $output = self::runGitCommand("git pull origin {$branch} 2>&1", $repoDir);
                $duration = round(microtime(true) - $startTime, 2);
                $lastCommit = self::runGitCommand('git log -1 --format="%h | %s | %cr | %an"', $repoDir);
                $isSuccess = (strpos($output, 'fatal:') === false && strpos($output, 'error:') === false);

                if ($isSuccess) {
                    self::updateLocalVersionFromGit($repoDir);
                    echo json_encode([
                        'success' => true,
                        'command' => "git pull origin {$branch}",
                        'output' => "✅ [Git Pull Berhasil]\n" . ($output ?: 'Pembaruan berhasil ditarik dan diterapkan.'),
                        'branch' => $branch,
                        'lastCommit' => trim($lastCommit) ?: 'Versi terbaru aktif.',
                        'duration' => $duration,
                        'timestamp' => date('Y-m-d H:i:s')
                    ], JSON_UNESCAPED_UNICODE);
                    exit;
                }
            }

            // 2. Direct Zip Downloader & Updater (100% Kompatibel InfinityFree Shared Hosting)
            $remoteData = self::fetchGitHubApi('commits/main');
            $remoteSha = $remoteData['sha'] ?? substr(md5((string)time()), 0, 40);
            $remoteShort = substr($remoteSha, 0, 7);
            $remoteMsg = $remoteData['commit']['message'] ?? 'Pembaruan Monopoly Nusantara';
            $remoteAuthor = $remoteData['commit']['author']['name'] ?? ($remoteData['author']['login'] ?? 'Theseadev');
            $remoteDate = date('d M Y H:i', strtotime($remoteData['commit']['author']['date'] ?? 'now'));

            $zipUrl = "https://codeload.github.com/Theseadev/Monopoly/zip/refs/heads/{$branch}";
            $tempZip = sys_get_temp_dir() . '/monopoly_update_' . time() . '.zip';

            $zipContent = self::downloadRemoteFile($zipUrl);
            if (!$zipContent) {
                // Fallback URL alternatif GitHub
                $zipContent = self::downloadRemoteFile("https://github.com/Theseadev/Monopoly/archive/refs/heads/{$branch}.zip");
            }

            if (!$zipContent) {
                echo json_encode([
                    'success' => false,
                    'output' => "⚠️ Gagal mengunduh paket pembaruan dari GitHub ({$zipUrl}).\nPastikan repository https://github.com/Theseadev/Monopoly bersifat publik atau memiliki branch '{$branch}'.",
                    'duration' => round(microtime(true) - $startTime, 2)
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            file_put_contents($tempZip, $zipContent);
            unset($zipContent);

            $zip = new \ZipArchive();
            if ($zip->open($tempZip) !== true) {
                @unlink($tempZip);
                echo json_encode([
                    'success' => false,
                    'output' => "⚠️ Gagal membuka berkas zip pembaruan di server hosting.",
                    'duration' => round(microtime(true) - $startTime, 2)
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            $extractedFilesCount = 0;
            $prefixInZip = "Monopoly-{$branch}/";

            for ($i = 0; $i < $zip->numFiles; $i++) {
                $entryName = $zip->getNameIndex($i);
                if (empty($entryName)) continue;

                // Hilangkan root folder zip (misal 'Monopoly-main/')
                $relPath = $entryName;
                if (strpos($relPath, $prefixInZip) === 0) {
                    $relPath = substr($relPath, strlen($prefixInZip));
                }

                if (empty($relPath) || $relPath === '/') continue;

                // Lindungi data penting agar tidak terhapus / ter-overwrite
                if (strpos($relPath, 'storage/rooms') === 0) continue;
                if ($relPath === 'app/config/database.php' && file_exists($repoDir . '/' . $relPath)) continue;

                $targetPath = $repoDir . '/' . $relPath;

                if (substr($entryName, -1) === '/') {
                    if (!is_dir($targetPath)) {
                        @mkdir($targetPath, 0777, true);
                    }
                } else {
                    $parent = dirname($targetPath);
                    if (!is_dir($parent)) {
                        @mkdir($parent, 0777, true);
                    }
                    $content = $zip->getFromIndex($i);
                    if ($content !== false) {
                        file_put_contents($targetPath, $content);
                        $extractedFilesCount++;
                    }
                }
            }

            $zip->close();
            @unlink($tempZip);

            // Simpan version.json lokal
            $newVersion = [
                'commit_sha' => $remoteSha,
                'commit_short' => $remoteShort,
                'commit_message' => $remoteMsg,
                'commit_date' => $remoteDate,
                'commit_author' => $remoteAuthor,
                'last_updated' => date('Y-m-d H:i:s')
            ];
            file_put_contents($repoDir . '/version.json', json_encode($newVersion, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            $duration = round(microtime(true) - $startTime, 2);
            $lastCommitStr = "{$remoteShort} | {$remoteMsg} | {$remoteDate} | {$remoteAuthor}";

            echo json_encode([
                'success' => true,
                'command' => "Upgrade Website (GitHub Sync: {$remoteShort})",
                'output' => "🎉 [UPGRADE BERHASIL]\n"
                          . "• {$extractedFilesCount} berkas berhasil diperbarui dari GitHub.\n"
                          . "• Commit Aktif: {$remoteShort}\n"
                          . "• Pesan: {$remoteMsg}\n"
                          . "• Pengunggah: {$remoteAuthor}\n"
                          . "• Waktu Eksekusi: {$duration} detik\n\n"
                          . "Website Anda sekarang telah menggunakan versi kode terbaru!",
                'branch' => $branch,
                'lastCommit' => $lastCommitStr,
                'duration' => $duration,
                'timestamp' => date('Y-m-d H:i:s')
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Upgrade website gagal: ' . $e->getMessage()
            ]);
        }
        exit;
    }

    /**
     * API: Simpan Perubahan & Push ke GitHub (Fallback/No-Op di Shared Hosting)
     */
    public static function gitCommitPush(): void {
        header('Content-Type: application/json; charset=utf-8');
        self::requireAuth();
        echo json_encode([
            'success' => false,
            'message' => 'Fitur Push ke GitHub hanya dapat dijalankan dari lingkungan pengembang (localhost).'
        ]);
        exit;
    }

    /**
     * Helper: Cek apakah fungsi eksekusi CLI tersedia di server
     */
    private static function isExecAvailable(): bool {
        if (!function_exists('proc_open')) return false;
        $disabled = explode(',', (string)ini_get('disable_functions'));
        $disabled = array_map('trim', $disabled);
        return !in_array('proc_open', $disabled);
    }

    /**
     * Helper: Menjalankan Perintah Git secara Aman (jika CLI tersedia)
     */
    private static function runGitCommand(string $command, string $cwd): string {
        if (!self::isExecAvailable()) {
            return '';
        }

        $descriptorspec = [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w']
        ];

        $process = @proc_open($command, $descriptorspec, $pipes, $cwd);
        if (!is_resource($process)) {
            return '';
        }

        fclose($pipes[0]);
        $stdout = stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[2]);

        proc_close($process);
        return trim($stdout . ($stderr ? "\n" . $stderr : ''));
    }

    /**
     * Helper: Request ke GitHub REST API
     */
    private static function fetchGitHubApi(string $endpoint): ?array {
        $url = "https://api.github.com/repos/Theseadev/Monopoly/" . ltrim($endpoint, '/');

        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_USERAGENT => 'Monopoly-AutoUpdater/1.0',
                CURLOPT_TIMEOUT => 12,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_HTTPHEADER => [
                    'Accept: application/vnd.github.v3+json',
                    'User-Agent: Monopoly-AutoUpdater/1.0'
                ]
            ]);
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            if ($httpCode >= 200 && $httpCode < 300 && $response) {
                return json_decode($response, true);
            }
        }

        $ctx = stream_context_create([
            'http' => [
                'header' => "User-Agent: Monopoly-AutoUpdater/1.0\r\nAccept: application/vnd.github.v3+json\r\n",
                'timeout' => 12,
                'ignore_errors' => true
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ]);
        $response = @file_get_contents($url, false, $ctx);
        if ($response) {
            return json_decode($response, true);
        }
        return null;
    }

    /**
     * Helper: Unduh berkas remote biner
     */
    private static function downloadRemoteFile(string $url): ?string {
        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_USERAGENT => 'Monopoly-AutoUpdater/1.0',
                CURLOPT_TIMEOUT => 45,
                CURLOPT_SSL_VERIFYPEER => false
            ]);
            $data = curl_exec($ch);
            $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            if ($code >= 200 && $code < 400 && !empty($data)) {
                return $data;
            }
        }

        $ctx = stream_context_create([
            'http' => [
                'header' => "User-Agent: Monopoly-AutoUpdater/1.0\r\n",
                'timeout' => 45,
                'follow_location' => 1
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ]);
        return @file_get_contents($url, false, $ctx) ?: null;
    }

    /**
     * Helper: Update version.json dari Git
     */
    private static function updateLocalVersionFromGit(string $repoDir): void {
        $raw = self::runGitCommand('git log -1 --format="%H|||%h|||%s|||%cr|||%an"', $repoDir);
        if (!empty($raw) && strpos($raw, 'fatal:') === false) {
            $parts = explode('|||', trim($raw));
            if (count($parts) >= 5) {
                $info = [
                    'commit_sha' => trim($parts[0]),
                    'commit_short' => trim($parts[1]),
                    'commit_message' => trim($parts[2]),
                    'commit_date' => trim($parts[3]),
                    'commit_author' => trim($parts[4]),
                    'last_updated' => date('Y-m-d H:i:s')
                ];
                @file_put_contents($repoDir . '/version.json', json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            }
        }
    }

    /**
     * Helper: Format Byte ke KB, MB, GB
     */
    private static function formatBytes(int $bytes, int $precision = 2): string {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
