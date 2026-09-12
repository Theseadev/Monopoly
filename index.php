<?php

// Layani berkas statis secara langsung jika menggunakan PHP built-in server
if (php_sapi_name() === 'cli-server') {
    $filePath = __DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (is_file($filePath)) {
        return false; // Serahkan langsung ke web server internal PHP
    }
}

// Tampilkan error jika ada masalah agar mudah terdeteksi
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

// Fallback Autoloader Case-Insensitive untuk Linux Shared Hosting
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/app/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    $relative_class = substr($class, $len);
    $parts = explode('\\', $relative_class);
    $fileName = array_pop($parts);
    
    // 1. Direct path
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    if (file_exists($file)) { require_once $file; return; }
    
    // 2. Lowercase folder path (e.g. app/controllers/GameController.php)
    $dir = strtolower(implode('/', $parts));
    $file = $base_dir . ($dir ? $dir . '/' : '') . $fileName . '.php';
    if (file_exists($file)) { require_once $file; return; }
    
    // 3. Scan case-insensitively
    $curr = rtrim($base_dir, '/');
    foreach ($parts as $part) {
        $found = false;
        if (is_dir($curr)) {
            foreach (scandir($curr) as $entry) {
                if ($entry === '.' || $entry === '..') continue;
                if (strcasecmp($entry, $part) === 0 && is_dir($curr . '/' . $entry)) {
                    $curr .= '/' . $entry;
                    $found = true;
                    break;
                }
            }
        }
        if (!$found) return;
    }
    if (is_dir($curr)) {
        foreach (scandir($curr) as $entry) {
            if (strcasecmp($entry, $fileName . '.php') === 0) {
                require_once $curr . '/' . $entry;
                return;
            }
        }
    }
}, true, true);

if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    die('<div style="font-family:sans-serif;padding:30px;text-align:center;"><h2>⚠️ Autoload Belum Lengkap</h2><p>Folder vendor sedang disiapkan. Mohon muat ulang dalam beberapa saat...</p></div>');
}

require_once __DIR__ . '/vendor/autoload.php';

// Custom Error Handler Flight
Flight::map('error', function(Throwable $ex) {
    echo '<div style="background:#0f172a;color:#f8fafc;padding:24px;border-radius:12px;font-family:monospace;max-width:800px;margin:40px auto;box-shadow:0 10px 25px rgba(0,0,0,0.5);border:1px solid #ef4444;">';
    echo '<h2 style="color:#ef4444;margin-top:0;">⚠️ Kesalahan Sistem (Server Error)</h2>';
    echo '<p style="color:#fbbf24;font-weight:bold;">' . htmlspecialchars($ex->getMessage()) . '</p>';
    echo '<p style="color:#94a3b8;font-size:12px;">File: ' . htmlspecialchars($ex->getFile()) . ' (Baris ' . $ex->getLine() . ')</p>';
    echo '<pre style="background:#020617;padding:12px;border-radius:8px;overflow:auto;font-size:11px;color:#cbd5e1;">' . htmlspecialchars($ex->getTraceAsString()) . '</pre>';
    echo '</div>';
});

// Set direktori views
Flight::set('flight.views.path', __DIR__ . '/app/views');

// Route Layanan Berkas Statis (Fallback)
Flight::route('GET /assets/*', function() {
    $uriPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $filePath = __DIR__ . $uriPath;
    if (is_file($filePath)) {
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $mimes = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'svg' => 'image/svg+xml',
            'json' => 'application/json'
        ];
        if (isset($mimes[$ext])) {
            header("Content-Type: {$mimes[$ext]}");
        }
        readfile($filePath);
        exit;
    }
    Flight::notFound();
});

// Route Halaman Utama
Flight::route('GET /', ['App\Controllers\GameController', 'index']);

// REST API Endpoints Permainan
Flight::route('GET|POST /api/game/state', ['App\Controllers\GameController', 'getState']);
Flight::route('POST|GET /api/game/new', ['App\Controllers\GameController', 'newGame']);
Flight::route('POST|GET /api/game/roll', ['App\Controllers\GameController', 'roll']);
Flight::route('POST|GET /api/game/buy', ['App\Controllers\GameController', 'buy']);
Flight::route('POST|GET /api/game/pass', ['App\Controllers\GameController', 'pass']);
Flight::route('POST|GET /api/game/build', ['App\Controllers\GameController', 'build']);
Flight::route('POST|GET /api/game/mortgage', ['App\Controllers\GameController', 'mortgage']);
Flight::route('POST|GET /api/game/unmortgage', ['App\Controllers\GameController', 'unmortgage']);
Flight::route('POST|GET /api/game/jail-fine', ['App\Controllers\GameController', 'payJailFine']);
Flight::route('POST|GET /api/game/use-jail-card', ['App\Controllers\GameController', 'useJailCard']);
Flight::route('POST|GET /api/game/resolve-card', ['App\Controllers\GameController', 'resolveCard']);
Flight::route('POST|GET /api/game/end-turn', ['App\Controllers\GameController', 'endTurn']);
Flight::route('POST|GET /api/game/bot-step', ['App\Controllers\GameController', 'botStep']);
Flight::route('POST|GET /api/game/trade', ['App\Controllers\GameController', 'trade']);
Flight::route('POST /api/game/trade/propose', ['App\Controllers\GameController', 'proposeTrade']);
Flight::route('POST /api/game/trade/respond', ['App\Controllers\GameController', 'respondTrade']);
Flight::route('POST /api/game/trade/cancel', ['App\Controllers\GameController', 'cancelTrade']);
Flight::route('POST /api/game/trade-invite', ['App\Controllers\GameController', 'sendTradeInvite']);
Flight::route('POST /api/game/trade-invite-respond', ['App\Controllers\GameController', 'respondTradeInvite']);
Flight::route('POST /api/game/trade-invite-cancel', ['App\Controllers\GameController', 'cancelTradeInvite']);
Flight::route('POST /api/game/chat', ['App\Controllers\GameController', 'sendChat']);

// REST API Endpoints Ruangan Multiplayer Online & Lobby
Flight::route('POST /api/room/create', ['App\Controllers\GameController', 'createRoom']);
Flight::route('POST /api/room/join', ['App\Controllers\GameController', 'joinRoom']);
Flight::route('GET|POST /api/room/status', ['App\Controllers\GameController', 'getRoomStatus']);
Flight::route('POST /api/room/add-bot', ['App\Controllers\GameController', 'addRoomBot']);
Flight::route('POST /api/room/leave', ['App\Controllers\GameController', 'leaveRoom']);
Flight::route('POST /api/room/start', ['App\Controllers\GameController', 'startRoomGame']);

// Route Panel Admin Banjar (/adminbanjar)
Flight::route('GET /adminbanjar', ['App\Controllers\AdminController', 'index']);
Flight::route('POST /api/admin/login', ['App\Controllers\AdminController', 'login']);
Flight::route('POST|GET /api/admin/logout', ['App\Controllers\AdminController', 'logout']);
Flight::route('GET /api/admin/rooms', ['App\Controllers\AdminController', 'getRooms']);
Flight::route('GET /api/admin/room/@code', ['App\Controllers\AdminController', 'getRoomDetail']);
Flight::route('POST /api/admin/room/@code/delete', ['App\Controllers\AdminController', 'deleteRoom']);
Flight::route('POST /api/admin/rooms/cleanup', ['App\Controllers\AdminController', 'cleanupRooms']);
Flight::route('GET /api/admin/git/status', ['App\Controllers\AdminController', 'getGitStatus']);
Flight::route('POST /api/admin/git/fetch', ['App\Controllers\AdminController', 'gitFetch']);
Flight::route('POST /api/admin/git/pull', ['App\Controllers\AdminController', 'gitPull']);
Flight::route('POST /api/admin/git/commit-push', ['App\Controllers\AdminController', 'gitCommitPush']);
Flight::route('POST /api/admin/git/token', ['App\Controllers\AdminController', 'saveGitHubToken']);
Flight::route('GET /api/admin/git/token', ['App\Controllers\AdminController', 'getGitHubTokenStatus']);

// Mulai Flight Framework
Flight::start();
