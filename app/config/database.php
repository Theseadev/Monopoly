<?php

return [
    'driver' => 'mysql',
    'host' => getenv('DB_HOST') ?: 'sql107.infinityfree.com',
    'port' => getenv('DB_PORT') ?: 3306,
    'database' => getenv('DB_NAME') ?: 'if0_39237979_monopoli',
    'username' => getenv('DB_USER') ?: 'if0_39237979',
    'password' => getenv('DB_PASS') ?: 'Fahrul200505',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 3 // 3 detik timeout agar tidak hang jika offline
    ]
];
