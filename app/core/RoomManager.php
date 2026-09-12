<?php

namespace App\Core;

class RoomManager {
    private static function getStorageDir(): string {
        $dir = __DIR__ . '/../../storage/rooms';
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
        }
        return $dir;
    }

    private static function getRoomFile(string $code): string {
        $cleanCode = strtoupper(preg_replace('/[^A-Z0-9_-]/', '', $code));
        return self::getStorageDir() . '/' . $cleanCode . '.json';
    }

    public static function createRoom(string $hostName, int $maxPlayers = 4, array $options = []): array {
        $prefixes = ['NUSAN', 'GARUDA', 'MERDEKA', 'MONO', 'BORNEO', 'SUMATRA', 'BALI', 'PAPUA', 'JAWA'];
        $code = $prefixes[array_rand($prefixes)] . '-' . rand(10, 99);

        // Pastikan kode unik
        while (is_file(self::getRoomFile($code))) {
            $code = $prefixes[array_rand($prefixes)] . '-' . rand(100, 999);
        }

        $tokens = ['Merah', 'Biru', 'Hijau', 'Kuning'];
        $colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

        $roomData = [
            'code' => $code,
            'host' => $hostName,
            'maxPlayers' => max(2, min(4, $maxPlayers)),
            'options' => $options,
            'status' => 'LOBBY', // 'LOBBY', 'PLAYING', 'FINISHED'
            'createdAt' => time(),
            'lastActivity' => time(),
            'players' => [
                [
                    'id' => 0,
                    'name' => trim($hostName) ?: 'Host',
                    'token' => $tokens[0],
                    'color' => $colors[0],
                    'isHost' => true,
                    'isAI' => false,
                    'isReady' => true
                ]
            ],
            'gameState' => null
        ];

        self::saveRoom($code, $roomData);
        return $roomData;
    }

    public static function getRoom(string $code): ?array {
        $file = self::getRoomFile($code);
        if (!is_file($file)) return null;
        $content = @file_get_contents($file);
        if (!$content) return null;
        return json_decode($content, true);
    }

    public static function saveRoom(string $code, array $data): void {
        $data['lastActivity'] = time();
        @file_put_contents(self::getRoomFile($code), json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    public static function joinRoom(string $code, string $playerName): array {
        $room = self::getRoom($code);
        if (!$room) {
            return ['success' => false, 'message' => 'Ruangan tidak ditemukan! Periksa kembali kode ruangan.'];
        }

        if ($room['status'] !== 'LOBBY') {
            return ['success' => false, 'message' => 'Permainan di ruangan ini sudah dimulai!'];
        }

        if (count($room['players']) >= $room['maxPlayers']) {
            return ['success' => false, 'message' => "Ruangan sudah penuh! (Maksimal {$room['maxPlayers']} pemain)"];
        }

        $cleanName = trim($playerName) ?: ('Pemain ' . (count($room['players']) + 1));
        foreach ($room['players'] as $p) {
            if (strtolower($p['name']) === strtolower($cleanName)) {
                $cleanName .= ' ' . (count($room['players']) + 1);
            }
        }

        $tokens = ['Merah', 'Biru', 'Hijau', 'Kuning'];
        $colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
        $newIdx = count($room['players']);

        $newPlayer = [
            'id' => $newIdx,
            'name' => $cleanName,
            'token' => $tokens[$newIdx % count($tokens)],
            'color' => $colors[$newIdx % count($colors)],
            'isHost' => false,
            'isAI' => false,
            'isReady' => true
        ];

        $room['players'][] = $newPlayer;
        self::saveRoom($code, $room);

        return [
            'success' => true,
            'room' => $room,
            'player' => $newPlayer
        ];
    }

    public static function addBot(string $code): array {
        $room = self::getRoom($code);
        if (!$room) {
            return ['success' => false, 'message' => 'Ruangan tidak ditemukan.'];
        }
        if ($room['status'] !== 'LOBBY') {
            return ['success' => false, 'message' => 'Permainan sudah dimulai.'];
        }
        if (count($room['players']) >= $room['maxPlayers']) {
            return ['success' => false, 'message' => 'Ruangan sudah penuh.'];
        }

        $botNames = ['Bot Budi', 'Bot Joko', 'Bot Siti', 'Bot Agus'];
        $tokens = ['Merah', 'Biru', 'Hijau', 'Kuning'];
        $colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
        $newIdx = count($room['players']);
        $botName = $botNames[$newIdx % count($botNames)] ?? ('Bot ' . ($newIdx + 1));

        $newBot = [
            'id' => $newIdx,
            'name' => $botName,
            'token' => $tokens[$newIdx % count($tokens)],
            'color' => $colors[$newIdx % count($colors)],
            'isHost' => false,
            'isAI' => true,
            'isReady' => true
        ];

        $room['players'][] = $newBot;
        self::saveRoom($code, $room);

        return ['success' => true, 'room' => $room];
    }

    public static function removePlayer(string $code, int $playerId): array {
        $room = self::getRoom($code);
        if (!$room) {
            return ['success' => false, 'message' => 'Ruangan tidak ditemukan.'];
        }

        // 1. Jika masih di LOBBY
        if ($room['status'] === 'LOBBY') {
            $filtered = [];
            $idx = 0;
            $tokens = ['Merah', 'Biru', 'Hijau', 'Kuning'];
            $colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

            foreach ($room['players'] as $p) {
                if ((int)$p['id'] !== (int)$playerId) {
                    $p['id'] = $idx;
                    $p['token'] = $tokens[$idx % count($tokens)];
                    $p['color'] = $colors[$idx % count($colors)];
                    if ($idx === 0) $p['isHost'] = true;
                    $filtered[] = $p;
                    $idx++;
                }
            }

            $room['players'] = $filtered;
            if (empty($room['players'])) {
                @unlink(self::getRoomFile($code));
                return ['success' => true, 'deleted' => true];
            }

            $room['host'] = $room['players'][0]['name'];
            self::saveRoom($code, $room);
            return ['success' => true, 'room' => $room];
        }

        // 2. Jika SUDAH DALAM PERMAINAN (PLAYING)
        if ($room['status'] === 'PLAYING' && !empty($room['gameState'])) {
            $state = &$room['gameState'];
            $player = null;

            foreach ($state['players'] as &$p) {
                if ((int)$p['id'] === (int)$playerId) {
                    $player = &$p;
                    break;
                }
            }

            if ($player) {
                $playerName = $player['name'];
                $player['isBankrupt'] = true;
                $player['isLeft'] = true;

                GameState::addLog($state, "🚪 {$playerName} telah keluar dari permainan!", 'danger');

                // Lepas properti milik pemain yang keluar
                foreach (\App\Data\BoardData::BOARD_SPACES as $s) {
                    if (isset($state['properties'][$s['id']]) && (int)$state['properties'][$s['id']]['ownerId'] === (int)$playerId) {
                        $state['properties'][$s['id']] = [
                            'ownerId' => null,
                            'houses' => 0,
                            'isHotel' => false,
                            'isMortgaged' => false
                        ];
                    }
                }

                // Cek jika yang keluar adalah pemain yang sedang giliran berjalan
                if ((int)$state['currentPlayerIndex'] === (int)$playerId && ($state['phase'] ?? '') !== 'GAME_OVER') {
                    $totalPlayers = count($state['players']);
                    $activeCount = count(array_filter($state['players'], fn($p) => empty($p['isBankrupt'])));
                    if ($activeCount > 1) {
                        do {
                            $state['currentPlayerIndex'] = ($state['currentPlayerIndex'] + 1) % $totalPlayers;
                        } while (!empty($state['players'][$state['currentPlayerIndex']]['isBankrupt']));
                        $state['phase'] = 'READY_TO_ROLL';
                        $state['currentAction'] = null;
                        $next = $state['players'][$state['currentPlayerIndex']];
                        GameState::addLog($state, "Giliran dialihkan ke {$next['name']}.", 'info');
                    }
                }

                // Cek sisa pemain aktif
                $active = array_values(array_filter($state['players'], fn($p) => empty($p['isBankrupt'])));
                if (count($active) === 1) {
                    $winner = $active[0];
                    $state['phase'] = 'GAME_OVER';
                    $room['status'] = 'FINISHED';
                    GameState::addLog($state, "🏆 SELAMAT! {$winner['name']} dinobatkan sebagai JUARA karena pemain lain telah keluar/bangkrut!", 'highlight');
                } else if (empty($active)) {
                    $state['phase'] = 'GAME_OVER';
                    $room['status'] = 'FINISHED';
                }

                self::saveRoom($code, $room);
                return [
                    'success' => true,
                    'room' => $room,
                    'gameState' => $state
                ];
            }
        }

        return ['success' => false, 'message' => 'Gagal memproses pemain keluar.'];
    }

    public static function startGame(string $code): array {
        $room = self::getRoom($code);
        if (!$room) {
            return ['success' => false, 'message' => 'Ruangan tidak ditemukan.'];
        }

        if (count($room['players']) < $room['maxPlayers']) {
            return [
                'success' => false,
                'message' => "Wajib ada {$room['maxPlayers']} pemain untuk dapat memulai! Saat ini baru ada " . count($room['players']) . " pemain."
            ];
        }

        $startingMoney = (int)($room['options']['startingMoney'] ?? 15000000);
        $gameState = GameState::initGame($room['players'], [
            'startingMoney' => $startingMoney,
            'rentInJail' => !empty($room['options']['rentInJail']),
            'auctionMode' => !empty($room['options']['auctionMode'])
        ]);

        $room['status'] = 'PLAYING';
        $room['gameState'] = $gameState;
        self::saveRoom($code, $room);

        return [
            'success' => true,
            'room' => $room,
            'gameState' => $gameState
        ];
    }

    public static function deleteRoom(string $code): bool {
        $file = self::getRoomFile($code);
        if (is_file($file)) {
            return @unlink($file);
        }
        return false;
    }

    public static function getAllRoomsSummary(): array {
        $dir = self::getStorageDir();
        $files = glob($dir . '/*.json') ?: [];
        $rooms = [];
        $totalStorageBytes = 0;

        $stats = [
            'total' => 0,
            'lobby' => 0,
            'playing' => 0,
            'finished' => 0,
            'totalHumans' => 0,
            'totalBots' => 0,
            'totalStorageBytes' => 0
        ];

        foreach ($files as $file) {
            $size = @filesize($file) ?: 0;
            $totalStorageBytes += $size;
            $content = @file_get_contents($file);
            if (!$content) continue;
            $data = json_decode($content, true);
            if (!is_array($data) || empty($data['code'])) continue;

            $code = $data['code'];
            $status = strtoupper($data['status'] ?? 'LOBBY');
            $players = $data['players'] ?? [];
            $maxPlayers = (int)($data['maxPlayers'] ?? 4);
            $createdAt = (int)($data['createdAt'] ?? filectime($file));
            $lastActivity = (int)($data['lastActivity'] ?? filemtime($file));
            $now = time();

            $humanCount = 0;
            $botCount = 0;
            $playersSummary = [];

            // Extract players state if playing
            $gameState = $data['gameState'] ?? null;
            $gamePlayers = $gameState['players'] ?? null;

            foreach ($players as $idx => $p) {
                $isAI = !empty($p['isAI']);
                if ($isAI) $botCount++; else $humanCount++;

                $money = 15000000;
                $propsCount = 0;
                $isBankrupt = false;

                if (is_array($gamePlayers) && isset($gamePlayers[$idx])) {
                    $gp = $gamePlayers[$idx];
                    $money = $gp['money'] ?? $money;
                    $propsCount = count($gp['properties'] ?? []);
                    $isBankrupt = !empty($gp['isBankrupt']);
                }

                $playersSummary[] = [
                    'id' => $p['id'] ?? $idx,
                    'name' => $p['name'] ?? 'Pemain',
                    'token' => $p['token'] ?? '',
                    'color' => $p['color'] ?? '#3b82f6',
                    'isHost' => !empty($p['isHost']),
                    'isAI' => $isAI,
                    'isReady' => !empty($p['isReady']),
                    'money' => $money,
                    'propertiesCount' => $propsCount,
                    'isBankrupt' => $isBankrupt
                ];
            }

            // Current turn player & winner
            $currentTurnPlayer = null;
            $winner = null;
            if ($gameState) {
                $activeIdx = (int)($gameState['currentPlayerIndex'] ?? 0);
                if (isset($playersSummary[$activeIdx])) {
                    $currentTurnPlayer = $playersSummary[$activeIdx]['name'];
                }
                if (!empty($gameState['winner'])) {
                    $winner = $gameState['winner']['name'] ?? 'Pemenang';
                    $status = 'FINISHED';
                }
            }

            $stats['total']++;
            if ($status === 'PLAYING') $stats['playing']++;
            elseif ($status === 'FINISHED') $stats['finished']++;
            else $stats['lobby']++;

            $stats['totalHumans'] += $humanCount;
            $stats['totalBots'] += $botCount;

            $rooms[] = [
                'code' => $code,
                'host' => $data['host'] ?? ($players[0]['name'] ?? 'Host'),
                'status' => $status,
                'maxPlayers' => $maxPlayers,
                'playerCount' => count($players),
                'humanCount' => $humanCount,
                'botCount' => $botCount,
                'createdAt' => $createdAt,
                'lastActivity' => $lastActivity,
                'idleSeconds' => max(0, $now - $lastActivity),
                'ageSeconds' => max(0, $now - $createdAt),
                'players' => $playersSummary,
                'currentTurnPlayer' => $currentTurnPlayer,
                'winner' => $winner,
                'fileSize' => $size,
                'options' => $data['options'] ?? []
            ];
        }

        // Urutkan dari aktivitas paling baru
        usort($rooms, function($a, $b) {
            return $b['lastActivity'] <=> $a['lastActivity'];
        });

        $stats['totalStorageBytes'] = $totalStorageBytes;

        return [
            'stats' => $stats,
            'rooms' => $rooms
        ];
    }

    public static function cleanupStaleRooms(int $maxIdleSeconds = 86400): array {
        $dir = self::getStorageDir();
        $files = glob($dir . '/*.json') ?: [];
        $deleted = 0;
        $now = time();

        foreach ($files as $file) {
            $content = @file_get_contents($file);
            if (!$content) {
                @unlink($file);
                $deleted++;
                continue;
            }
            $data = json_decode($content, true);
            $lastAct = (int)($data['lastActivity'] ?? filemtime($file));
            if (($now - $lastAct) > $maxIdleSeconds) {
                @unlink($file);
                $deleted++;
            }
        }

        return ['success' => true, 'deletedCount' => $deleted];
    }
}
