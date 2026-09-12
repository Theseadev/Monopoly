<?php

namespace App\Core;

use App\Data\BoardData;
use App\Data\CardsData;

class GameState {
    private const SESSION_KEY = 'monopoly_game_state';
    private static ?string $contextRoomCode = null;

    public static function setContextRoomCode(?string $code): void {
        self::$contextRoomCode = $code ? strtoupper(trim($code)) : null;
    }

    public static function getContextRoomCode(): ?string {
        return self::$contextRoomCode;
    }

    public static function load(?string $roomCode = null): array {
        $code = $roomCode ? strtoupper(trim($roomCode)) : self::$contextRoomCode;
        if ($code) {
            $room = RoomManager::getRoom($code);
            if ($room && isset($room['gameState']) && is_array($room['gameState'])) {
                return $room['gameState'];
            }
        }

        if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
            @session_start();
        }

        if (!isset($_SESSION[self::SESSION_KEY])) {
            self::initDefault();
        }

        return $_SESSION[self::SESSION_KEY];
    }

    public static function save(array $state, ?string $roomCode = null): void {
        $code = $roomCode ? strtoupper(trim($roomCode)) : self::$contextRoomCode;
        if ($code) {
            $room = RoomManager::getRoom($code);
            if ($room) {
                $room['gameState'] = $state;
                if (($state['phase'] ?? '') === 'GAME_OVER') {
                    $room['status'] = 'FINISHED';
                }
                RoomManager::saveRoom($code, $room);
                return;
            }
        }

        if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
            @session_start();
        }
        $_SESSION[self::SESSION_KEY] = $state;
    }

    public static function initDefault(): array {
        $defaultPlayers = [
            ['name' => 'Pemain 1', 'isAI' => false, 'token' => 'Merah', 'color' => '#3b82f6'],
            ['name' => 'Bot Budi', 'isAI' => true, 'token' => 'Biru', 'color' => '#ef4444']
        ];
        return self::initGame($defaultPlayers);
    }

    public static function initGame(array $playersConfig, array $options = []): array {
        $startingMoney = (int)($options['startingMoney'] ?? 15000000);
        $players = [];
        foreach ($playersConfig as $idx => $p) {
            $players[] = [
                'id' => $idx,
                'name' => $p['name'] ?? ('Pemain ' . ($idx + 1)),
                'isAI' => !empty($p['isAI']),
                'token' => $p['token'] ?? 'Merah',
                'color' => $p['color'] ?? '#3b82f6',
                'money' => $startingMoney,
                'position' => 0,
                'inJail' => false,
                'jailTurns' => 0,
                'getOutOfJailFreeCards' => 0,
                'isBankrupt' => false
            ];
        }

        $properties = [];
        foreach (BoardData::BOARD_SPACES as $space) {
            if (in_array($space['type'], ['property', 'railroad', 'utility'])) {
                $properties[$space['id']] = [
                    'ownerId' => null,
                    'houses' => 0,
                    'isHotel' => false,
                    'isMortgaged' => false
                ];
            }
        }

        $chanceDeck = CardsData::CHANCE_CARDS;
        shuffle($chanceDeck);

        $communityChestDeck = CardsData::COMMUNITY_CHEST_CARDS;
        shuffle($communityChestDeck);

        $state = [
            'players' => $players,
            'properties' => $properties,
            'currentPlayerIndex' => 0,
            'dice' => [1, 1],
            'consecutiveDoubles' => 0,
            'phase' => 'READY_TO_ROLL', // READY_TO_ROLL, ACTION_REQUIRED, TURN_ENDED, GAME_OVER
            'currentAction' => null,
            'logs' => [
                [
                    'message' => 'Permainan Monopoli Nusantara (Flight PHP) dimulai!',
                    'type' => 'system',
                    'time' => date('H:i:s')
                ]
            ],
            'options' => $options,
            'chanceDeck' => $chanceDeck,
            'communityChestDeck' => $communityChestDeck,
            'chats' => [],
            'tradeInvite' => null,
            'pendingTrade' => null
        ];

        self::save($state);
        return $state;
    }

    public static function addChat(array &$state, int $senderId, string $senderName, string $senderColor, string $message, string $emote = ''): array {
        if (!isset($state['chats']) || !is_array($state['chats'])) {
            $state['chats'] = [];
        }
        $entry = [
            'id' => uniqid('msg_'),
            'senderId' => $senderId,
            'senderName' => $senderName,
            'senderColor' => $senderColor,
            'message' => $message,
            'emote' => $emote,
            'time' => date('H:i:s'),
            'timestamp' => microtime(true)
        ];
        $state['chats'][] = $entry;
        if (count($state['chats']) > 50) {
            $state['chats'] = array_slice($state['chats'], -50);
        }
        return $entry;
    }

    public static function addLog(array &$state, string $message, string $type = 'info'): void {
        array_unshift($state['logs'], [
            'message' => $message,
            'type' => $type,
            'time' => date('H:i:s')
        ]);
        if (count($state['logs']) > 60) {
            array_pop($state['logs']);
        }
    }

    public static function getCurrentPlayer(array $state): ?array {
        return $state['players'][$state['currentPlayerIndex']] ?? null;
    }

    public static function rollDice(): array {
        $state = self::load();
        if ($state['phase'] !== 'READY_TO_ROLL') {
            return $state;
        }

        $player = &$state['players'][$state['currentPlayerIndex']];
        $d1 = random_int(1, 6);
        $d2 = random_int(1, 6);
        $state['dice'] = [$d1, $d2];
        $isDouble = ($d1 === $d2);
        $totalSteps = $d1 + $d2;

        if ($player['inJail']) {
            if ($isDouble) {
                self::addLog($state, "{$player['name']} melempar angka kembar ($d1-$d2) dan bebas dari penjara!", 'success');
                $player['inJail'] = false;
                $player['jailTurns'] = 0;
                $state['consecutiveDoubles'] = 0;
                self::stepPlayerInternal($state, $player, $totalSteps);
            } else {
                $player['jailTurns']++;
                if ($player['jailTurns'] >= 3) {
                    self::addLog($state, "{$player['name']} sudah 3 putaran di penjara. Wajib bayar denda Rp 500.000.", 'warning');
                    $player['money'] = max(0, $player['money'] - 500000);
                    $player['inJail'] = false;
                    $player['jailTurns'] = 0;
                    self::stepPlayerInternal($state, $player, $totalSteps);
                } else {
                    self::addLog($state, "{$player['name']} gagal melempar angka kembar ($d1-$d2). Masih ditahan di penjara.", 'info');
                    $state['phase'] = 'TURN_ENDED';
                }
            }
            self::save($state);
            return $state;
        }

        if ($isDouble) {
            $state['consecutiveDoubles']++;
            if ($state['consecutiveDoubles'] === 3) {
                self::addLog($state, "{$player['name']} melempar angka kembar 3x! Langsung masuk penjara!", 'danger');
                self::sendToJailInternal($state, $player);
                $state['phase'] = 'TURN_ENDED';
                self::save($state);
                return $state;
            }
            self::addLog($state, "{$player['name']} melempar dadu kembar ($d1-$d2)! Dapat kesempatan jalan lagi.", 'highlight');
        } else {
            $state['consecutiveDoubles'] = 0;
        }

        self::stepPlayerInternal($state, $player, $totalSteps);
        self::save($state);
        return $state;
    }

    private static function stepPlayerInternal(array &$state, array &$player, int $steps): void {
        $oldPos = $player['position'];
        $newPos = ($oldPos + $steps) % 40;

        // Melewati atau mendarat di Mulai (GO)
        if ($newPos < $oldPos && $newPos >= 0) {
            $player['money'] += 2000000;
            self::addLog($state, "{$player['name']} melewati Mulai (GO) dan menerima Rp 2.000.000!", 'success');
        }

        $player['position'] = $newPos;
        self::handleLandedSpace($state, $player);
    }

    private static function handleLandedSpace(array &$state, array &$player): void {
        $space = BoardData::getSpace($player['position']);
        if (!$space) return;

        self::addLog($state, "{$player['name']} mendarat di {$space['name']}.", 'info');

        // 1. Properti / Stasiun / Utilitas
        if (in_array($space['type'], ['property', 'railroad', 'utility'])) {
            $prop = &$state['properties'][$space['id']];

            // Belum ada pemilik
            if ($prop['ownerId'] === null) {
                $state['phase'] = 'ACTION_REQUIRED';
                $state['currentAction'] = [
                    'type' => 'BUY_PROPOSAL',
                    'space' => $space,
                    'price' => $space['price']
                ];
                return;
            }

            // Milik lawan
            if ($prop['ownerId'] !== $player['id']) {
                $owner = &$state['players'][$prop['ownerId']];

                if (!empty($prop['isMortgaged'])) {
                    self::addLog($state, "{$space['name']} sedang digadaikan oleh {$owner['name']}. Bebas sewa!", 'info');
                    self::finishAction($state);
                    return;
                }

                $diceSum = $state['dice'][0] + $state['dice'][1];
                $rent = GameRules::calculateRent($space, $owner, $diceSum, $state['properties']);

                self::addLog($state, "{$player['name']} membayar sewa Rp " . number_format($rent, 0, ',', '.') . " kepada {$owner['name']}.", 'warning');
                $pay = min($player['money'], $rent);
                $player['money'] -= $pay;
                $owner['money'] += $pay;

                if ($player['money'] <= 0) {
                    self::checkBankruptcy($state, $player, $owner);
                }

                self::finishAction($state);
                return;
            }

            // Milik sendiri: Tawarkan membangun rumah / upgrade jika mendarat lagi di properti sendiri
            if ($space['type'] === 'property' && empty($prop['isMortgaged']) && empty($prop['isHotel']) && $player['money'] >= $space['housePrice']) {
                $isHotelNext = ($prop['houses'] ?? 0) === 4;
                $nextLevelStr = empty($prop['houses']) ? 'Rumah ke-1' : ($prop['houses'] < 4 ? 'Rumah ke-' . ($prop['houses'] + 1) : 'Hotel Megah');
                $state['phase'] = 'ACTION_REQUIRED';
                $state['currentAction'] = [
                    'type' => 'BUILD_PROPOSAL',
                    'space' => $space,
                    'price' => $space['housePrice'],
                    'cost' => $space['housePrice'],
                    'currentHouses' => $prop['houses'] ?? 0,
                    'isHotel' => !empty($prop['isHotel']),
                    'nextLevel' => $isHotelNext ? 'hotel' : 'house',
                    'nextLevelText' => $nextLevelStr,
                    'nextHouseNum' => (($prop['houses'] ?? 0) + 1)
                ];
                self::addLog($state, "{$player['name']} mendarat di tanah miliknya sendiri ({$space['name']}) dan dapat membangun {$nextLevelStr}!", 'highlight');
                return;
            }

            self::addLog($state, "{$space['name']} adalah milik {$player['name']} sendiri.", 'info');
            self::finishAction($state);
            return;
        }

        // 2. Petak Pajak
        if ($space['type'] === 'tax') {
            $amount = (int)$space['amount'];
            self::addLog($state, "{$player['name']} membayar {$space['name']} sebesar Rp " . number_format($amount, 0, ',', '.') . " ke Bank.", 'warning');
            $player['money'] -= $amount;
            if ($player['money'] < 0) {
                self::checkBankruptcy($state, $player, null);
            }
            self::finishAction($state);
            return;
        }

        // 3. Masuk Penjara
        if ($space['type'] === 'corner' && ($space['subType'] ?? '') === 'go-to-jail') {
            self::addLog($state, "{$player['name']} dijebloskan ke Penjara!", 'danger');
            self::sendToJailInternal($state, $player);
            self::finishAction($state);
            return;
        }

        // 4. Kartu Kesempatan & Dana Umum
        if ($space['type'] === 'special') {
            $isChance = ($space['subType'] ?? '') === 'chance';
            $deckKey = $isChance ? 'chanceDeck' : 'communityChestDeck';
            $card = array_shift($state[$deckKey]);
            $state[$deckKey][] = $card; // kembalikan ke tumpukan bawah

            $state['phase'] = 'ACTION_REQUIRED';
            $state['currentAction'] = [
                'type' => 'CARD_DRAWN',
                'cardType' => $isChance ? 'Kesempatan' : 'Dana Umum',
                'card' => $card
            ];
            return;
        }

        // Parkir Bebas / Penjara Lewat
        self::finishAction($state);
    }

    private static function sendToJailInternal(array &$state, array &$player): void {
        $player['position'] = 10;
        $player['inJail'] = true;
        $player['jailTurns'] = 0;
        $state['consecutiveDoubles'] = 0;
    }

    public static function buyProperty(int $playerId, int $spaceId): array {
        $state = self::load();
        $player = &$state['players'][$playerId];
        $space = BoardData::getSpace($spaceId);
        $prop = &$state['properties'][$spaceId];

        if ($prop['ownerId'] === null && $player['money'] >= $space['price']) {
            $player['money'] -= $space['price'];
            $prop['ownerId'] = $player['id'];
            self::addLog($state, "{$player['name']} membeli {$space['name']} seharga Rp " . number_format($space['price'], 0, ',', '.') . "!", 'success');
        }

        self::finishAction($state);
        self::save($state);
        return $state;
    }

    public static function passBuyProperty(): array {
        $state = self::load();
        $player = $state['players'][$state['currentPlayerIndex']];
        self::addLog($state, "{$player['name']} memutuskan tidak membeli properti.", 'info');
        self::finishAction($state);
        self::save($state);
        return $state;
    }

    public static function buildHouse(int $playerId, int $spaceId): array {
        $state = self::load();
        $player = &$state['players'][$playerId];
        $space = BoardData::getSpace($spaceId);
        $prop = &$state['properties'][$spaceId];

        $check = GameRules::canBuildHouse($space, $player, $state['properties']);
        if (!$check['canBuild']) {
            self::addLog($state, "Gagal membangun: {$check['reason']}", 'warning');
            if ($state['phase'] === 'ACTION_REQUIRED') {
                self::finishAction($state);
            }
            self::save($state);
            return $state;
        }

        $player['money'] -= $space['housePrice'];
        if ($prop['houses'] < 4) {
            $prop['houses']++;
            self::addLog($state, "{$player['name']} membangun Rumah ke-{$prop['houses']} di {$space['name']} seharga Rp " . number_format($space['housePrice'], 0, ',', '.') . "!", 'success');
        } else if ($prop['houses'] === 4) {
            $prop['houses'] = 0;
            $prop['isHotel'] = true;
            self::addLog($state, "{$player['name']} meng-upgrade ke HOTEL MEGAH di {$space['name']} seharga Rp " . number_format($space['housePrice'], 0, ',', '.') . "!", 'highlight');
        }

        if ($state['phase'] === 'ACTION_REQUIRED') {
            self::finishAction($state);
        }

        self::save($state);
        return $state;
    }

    public static function mortgageProperty(int $playerId, int $spaceId): array {
        $state = self::load();
        $player = &$state['players'][$playerId];
        $space = BoardData::getSpace($spaceId);
        $prop = &$state['properties'][$spaceId];

        if ($prop['ownerId'] === $playerId && empty($prop['isMortgaged']) && empty($prop['houses']) && empty($prop['isHotel'])) {
            $prop['isMortgaged'] = true;
            $player['money'] += $space['mortgage'];
            self::addLog($state, "{$player['name']} menggadaikan {$space['name']} (+Rp " . number_format($space['mortgage'], 0, ',', '.') . ").", 'warning');
        }

        self::save($state);
        return $state;
    }

    public static function unmortgageProperty(int $playerId, int $spaceId): array {
        $state = self::load();
        $player = &$state['players'][$playerId];
        $space = BoardData::getSpace($spaceId);
        $prop = &$state['properties'][$spaceId];

        $cost = (int)round($space['mortgage'] * 1.1);
        if ($prop['ownerId'] === $playerId && !empty($prop['isMortgaged']) && $player['money'] >= $cost) {
            $prop['isMortgaged'] = false;
            $player['money'] -= $cost;
            self::addLog($state, "{$player['name']} menebus gadai {$space['name']} seharga Rp " . number_format($cost, 0, ',', '.') . ".", 'success');
        }

        self::save($state);
        return $state;
    }

    public static function payJailFine(): array {
        $state = self::load();
        $player = &$state['players'][$state['currentPlayerIndex']];
        if ($player['inJail'] && $player['money'] >= 500000) {
            $player['money'] -= 500000;
            $player['inJail'] = false;
            $player['jailTurns'] = 0;
            self::addLog($state, "{$player['name']} membayar denda Rp 500.000 dan bebas dari penjara.", 'success');
        }
        self::save($state);
        return $state;
    }

    public static function useJailCard(): array {
        $state = self::load();
        $player = &$state['players'][$state['currentPlayerIndex']];
        if ($player['inJail'] && $player['getOutOfJailFreeCards'] > 0) {
            $player['getOutOfJailFreeCards']--;
            $player['inJail'] = false;
            $player['jailTurns'] = 0;
            self::addLog($state, "{$player['name']} menggunakan Kartu Bebas Penjara!", 'success');
        }
        self::save($state);
        return $state;
    }

    public static function resolveCardAction(?string $choiceId = null): array {
        $state = self::load();
        if (empty($state['currentAction']) || $state['currentAction']['type'] !== 'CARD_DRAWN') {
            return $state;
        }

        $player = &$state['players'][$state['currentPlayerIndex']];
        $card = $state['currentAction']['card'];

        // Jika kartu memiliki opsi keputusan (Choices)
        if (!empty($card['choices']) && is_array($card['choices'])) {
            $selectedChoice = null;
            if (!empty($choiceId)) {
                foreach ($card['choices'] as $c) {
                    if (($c['id'] ?? '') === $choiceId) {
                        $selectedChoice = $c;
                        break;
                    }
                }
            }

            // Fallback untuk Bot AI atau jika pilihan tidak dikirim spesifik
            if (!$selectedChoice) {
                if (!empty($player['isAI'])) {
                    // AI pintar: jika ada pilihan bayar sogok vs penjara, pilih sogok jika uang aman
                    foreach ($card['choices'] as $c) {
                        $act = $c['action'] ?? ($c['type'] ?? '');
                        if ($act === 'pay_money' && $player['money'] >= (($c['amount'] ?? 0) + 300000)) {
                            $selectedChoice = $c;
                            break;
                        }
                    }
                }
                if (!$selectedChoice) {
                    $selectedChoice = $card['choices'][0];
                }
            }

            self::executeCardEffect($state, $player, $selectedChoice, $card['title']);
        } else {
            self::executeCardEffect($state, $player, $card, $card['title']);
        }

        self::save($state);
        return $state;
    }

    private static function executeCardEffect(array &$state, array &$player, array $effect, string $cardTitle): void {
        $actionType = $effect['action'] ?? ($effect['type'] ?? 'none');

        switch ($actionType) {
            case 'move_to':
                $oldPos = $player['position'];
                $target = (int)$effect['target'];
                if (!empty($effect['collectGo']) && $target < $oldPos) {
                    $player['money'] += 2000000;
                    self::addLog($state, "{$player['name']} melewati Mulai dan mengambil Rp 2.000.000!", 'success');
                }
                $player['position'] = $target;
                self::handleLandedSpace($state, $player);
                break;

            case 'move_steps':
                $steps = (int)$effect['steps'];
                $player['position'] = ($player['position'] + $steps + 40) % 40;
                self::addLog($state, "{$player['name']} " . ($steps > 0 ? "maju {$steps} petak" : "mundur " . abs($steps) . " petak") . " (" . ($effect['title'] ?? $cardTitle) . ").", 'info');
                self::handleLandedSpace($state, $player);
                break;

            case 'receive_money':
                $amt = (int)$effect['amount'];
                $player['money'] += $amt;
                self::addLog($state, "{$player['name']} memperoleh Rp " . number_format($amt, 0, ',', '.') . " (" . ($effect['title'] ?? $cardTitle) . ").", 'success');
                self::finishAction($state);
                break;

            case 'pay_money':
                $amt = (int)$effect['amount'];
                $player['money'] = max(0, $player['money'] - $amt);
                self::addLog($state, "{$player['name']} membayar Rp " . number_format($amt, 0, ',', '.') . " (" . ($effect['title'] ?? $cardTitle) . ").", 'warning');
                if ($player['money'] <= 0) {
                    self::checkBankruptcy($state, $player, null);
                }
                self::finishAction($state);
                break;

            case 'pay_and_move':
                $cost = (int)($effect['cost'] ?? ($effect['amount'] ?? 0));
                $steps = (int)($effect['steps'] ?? 0);
                $player['money'] = max(0, $player['money'] - $cost);
                $player['position'] = ($player['position'] + $steps + 40) % 40;
                self::addLog($state, "{$player['name']} membayar Rp " . number_format($cost, 0, ',', '.') . " dan melaju {$steps} langkah!", 'success');
                self::handleLandedSpace($state, $player);
                break;

            case 'gamble':
                $cost = (int)($effect['cost'] ?? 0);
                $reward = (int)($effect['reward'] ?? 0);
                $isWin = (mt_rand(0, 99) < 50); // 50% Win Chance

                if ($isWin) {
                    $netWin = $reward - $cost;
                    $player['money'] += $netWin;
                    self::addLog($state, "🎉 CUAN BESAR! {$player['name']} menang jackpot Rp " . number_format($reward, 0, ',', '.') . " dari robot trading!", 'success');
                } else {
                    $player['money'] = max(0, $player['money'] - $cost);
                    self::addLog($state, "💥 RUG PULL! {$player['name']} kena scam dan kehilangan modal Rp " . number_format($cost, 0, ',', '.') . "!", 'danger');
                    if ($player['money'] <= 0) {
                        self::checkBankruptcy($state, $player, null);
                    }
                }
                self::finishAction($state);
                break;

            case 'jail_card':
                $player['getOutOfJailFreeCards']++;
                self::addLog($state, "{$player['name']} menyimpan Kartu Bebas Penjara.", 'success');
                self::finishAction($state);
                break;

            case 'go_to_jail':
                self::addLog($state, "{$player['name']} dijebloskan ke sel penjara!", 'danger');
                self::sendToJailInternal($state, $player);
                self::finishAction($state);
                break;

            case 'repairs':
                $repairs = 0;
                foreach (BoardData::BOARD_SPACES as $s) {
                    $p = $state['properties'][$s['id']] ?? null;
                    if ($p && ($p['ownerId'] ?? null) === $player['id']) {
                        if (!empty($p['isHotel'])) $repairs += $effect['perHotel'];
                        else if (!empty($p['houses'])) $repairs += $p['houses'] * $effect['perHouse'];
                    }
                }
                $player['money'] = max(0, $player['money'] - $repairs);
                self::addLog($state, "{$player['name']} membayar biaya perbaikan/renovasi total Rp " . number_format($repairs, 0, ',', '.') . ".", 'warning');
                if ($player['money'] <= 0) {
                    self::checkBankruptcy($state, $player, null);
                }
                self::finishAction($state);
                break;

            case 'pay_all_players':
                $amt = (int)$effect['amount'];
                foreach ($state['players'] as &$other) {
                    if ($other['id'] !== $player['id'] && empty($other['isBankrupt'])) {
                        $pAmt = min($player['money'], $amt);
                        $player['money'] -= $pAmt;
                        $other['money'] += $pAmt;
                    }
                }
                self::addLog($state, "{$player['name']} membagikan Rp " . number_format($amt, 0, ',', '.') . " ke masing-masing pemain.", 'info');
                self::finishAction($state);
                break;

            case 'collect_all_players':
                $amt = (int)$effect['amount'];
                foreach ($state['players'] as &$other) {
                    if ($other['id'] !== $player['id'] && empty($other['isBankrupt'])) {
                        $pAmt = min($other['money'], $amt);
                        $other['money'] -= $pAmt;
                        $player['money'] += $pAmt;
                    }
                }
                self::addLog($state, "{$player['name']} mengumpulkan Rp " . number_format($amt, 0, ',', '.') . " dari setiap pemain.", 'success');
                self::finishAction($state);
                break;

            case 'none':
            default:
                self::addLog($state, "{$player['name']} memilih jalur aman (" . ($effect['title'] ?? $cardTitle) . ").", 'info');
                self::finishAction($state);
                break;
        }
    }

    private static function checkBankruptcy(array &$state, array &$player, ?array &$creditor): void {
        $netWorth = GameRules::calculateNetWorth($player, $state['properties']);
        if ($netWorth <= 0 || $player['money'] <= 0) {
            $player['isBankrupt'] = true;
            self::addLog($state, "{$player['name']} BANGKRUT dan tersingkir dari permainan!", 'danger');

            foreach (BoardData::BOARD_SPACES as $s) {
                if (isset($state['properties'][$s['id']]) && $state['properties'][$s['id']]['ownerId'] === $player['id']) {
                    if ($creditor) {
                        $state['properties'][$s['id']]['ownerId'] = $creditor['id'];
                    } else {
                        $state['properties'][$s['id']] = [
                            'ownerId' => null,
                            'houses' => 0,
                            'isHotel' => false,
                            'isMortgaged' => false
                        ];
                    }
                }
            }

            // Cek pemenang
            $active = array_filter($state['players'], fn($p) => empty($p['isBankrupt']));
            if (count($active) === 1) {
                $winner = reset($active);
                $state['phase'] = 'GAME_OVER';
                self::addLog($state, "SELAMAT! {$winner['name']} memenangkan permainan Monopoli!", 'highlight');
            }
        }
    }

    private static function finishAction(array &$state): void {
        $state['currentAction'] = null;
        $player = $state['players'][$state['currentPlayerIndex']];

        if ($state['dice'][0] === $state['dice'][1] && empty($player['inJail']) && empty($player['isBankrupt'])) {
            $state['phase'] = 'READY_TO_ROLL';
            self::addLog($state, "{$player['name']} melempar dadu kembar! Dapat kesempatan jalan lagi.", 'highlight');
        } else {
            $state['consecutiveDoubles'] = 0;
            $totalPlayers = count($state['players']);

            do {
                $state['currentPlayerIndex'] = ($state['currentPlayerIndex'] + 1) % $totalPlayers;
            } while (!empty($state['players'][$state['currentPlayerIndex']]['isBankrupt']));

            $state['phase'] = 'READY_TO_ROLL';
            $next = $state['players'][$state['currentPlayerIndex']];
            self::addLog($state, "Giliran {$next['name']}.", 'info');
        }
    }

    public static function endTurn(): array {
        $state = self::load();
        if ($state['phase'] === 'GAME_OVER') return $state;

        $state['consecutiveDoubles'] = 0;
        $totalPlayers = count($state['players']);

        do {
            $state['currentPlayerIndex'] = ($state['currentPlayerIndex'] + 1) % $totalPlayers;
        } while (!empty($state['players'][$state['currentPlayerIndex']]['isBankrupt']));

        $state['phase'] = 'READY_TO_ROLL';
        $state['currentAction'] = null;

        $next = $state['players'][$state['currentPlayerIndex']];
        self::addLog($state, "Giliran {$next['name']}.", 'info');

        self::save($state);
        return $state;
    }

    // ==========================================
    // SISTEM TRADING / BARTER PROPERTI ANTAR PEMAIN
    // ==========================================

    public static function proposeTrade(
        int $fromPlayerId,
        int $toPlayerId,
        array $offerPropertyIds,
        int $offerMoney,
        array $requestPropertyIds,
        int $requestMoney
    ): array {
        $state = self::load();
        if ($state['phase'] === 'GAME_OVER') return $state;

        $fromPlayer = $state['players'][$fromPlayerId] ?? null;
        $toPlayer = $state['players'][$toPlayerId] ?? null;

        if (!$fromPlayer || !$toPlayer || $fromPlayerId === $toPlayerId) {
            self::addLog($state, "Proposal trading tidak valid: Pemain target tidak ditemukan.", 'danger');
            return $state;
        }

        if (!empty($fromPlayer['isBankrupt']) || !empty($toPlayer['isBankrupt'])) {
            self::addLog($state, "Pemain yang sudah bangkrut tidak dapat melakukan trading.", 'warning');
            return $state;
        }

        // Cek saldo kas yang ditawarkan
        if ($offerMoney > $fromPlayer['money']) {
            self::addLog($state, "Gagal trading: Kas Anda tidak mencukupi untuk tawaran tersebut.", 'danger');
            return $state;
        }

        // Cek saldo kas lawan yang diminta
        if ($requestMoney > $toPlayer['money']) {
            self::addLog($state, "Gagal trading: Lawan tidak memiliki cukup uang kas yang Anda minta.", 'danger');
            return $state;
        }

        // Validasi kepemilikan dan status bangunan properti yang ditawarkan
        foreach ($offerPropertyIds as $pid) {
            $prop = $state['properties'][$pid] ?? null;
            if (!$prop || $prop['ownerId'] !== $fromPlayerId) {
                self::addLog($state, "Gagal trading: Anda tidak memiliki sertifikat properti tersebut.", 'danger');
                return $state;
            }
            if (($prop['houses'] ?? 0) > 0 || !empty($prop['isHotel'])) {
                self::addLog($state, "Properti yang memiliki bangunan tidak dapat dibarter. Harap jual rumah/hotel terlebih dahulu.", 'warning');
                return $state;
            }
        }

        // Validasi kepemilikan dan status bangunan properti yang diminta
        foreach ($requestPropertyIds as $pid) {
            $prop = $state['properties'][$pid] ?? null;
            if (!$prop || $prop['ownerId'] !== $toPlayerId) {
                self::addLog($state, "Gagal trading: Lawan tidak memiliki sertifikat properti yang diminta.", 'danger');
                return $state;
            }
            if (($prop['houses'] ?? 0) > 0 || !empty($prop['isHotel'])) {
                self::addLog($state, "Properti target memiliki bangunan dan tidak dapat dibarter.", 'warning');
                return $state;
            }
        }

        // Minimal harus ada yang ditawarkan atau diminta
        if (empty($offerPropertyIds) && $offerMoney <= 0 && empty($requestPropertyIds) && $requestMoney <= 0) {
            self::addLog($state, "Tawaran trading kosong.", 'warning');
            return $state;
        }

        $tradeData = [
            'id' => uniqid('tr_'),
            'fromPlayerId' => $fromPlayerId,
            'toPlayerId' => $toPlayerId,
            'offerPropertyIds' => $offerPropertyIds,
            'offerMoney' => $offerMoney,
            'requestPropertyIds' => $requestPropertyIds,
            'requestMoney' => $requestMoney,
            'createdAt' => time()
        ];

        // Jika pemain target adalah BOT AI:
        if (!empty($toPlayer['isAI'])) {
            $accepted = AIPlayer::evaluateTradeOffer(
                $state,
                $fromPlayerId,
                $toPlayerId,
                $offerPropertyIds,
                $offerMoney,
                $requestPropertyIds,
                $requestMoney
            );

            if ($accepted) {
                self::executeTrade($state, $tradeData);
                self::addLog($state, "[TRADING BERHASIL] {$toPlayer['name']} menerima barter aset dari {$fromPlayer['name']}!", 'success');
            } else {
                self::addLog($state, "[TRADING DITOLAK] {$toPlayer['name']} menolak tawaran barter dari {$fromPlayer['name']}.", 'warning');
            }
            self::save($state);
            return $state;
        }

        // Jika pemain target adalah Manusia (PvP / Multiplayer Online):
        $state['pendingTrade'] = $tradeData;
        self::addLog($state, "{$fromPlayer['name']} mengajukan tawaran barter kepada {$toPlayer['name']}.", 'info');
        self::save($state);
        return $state;
    }

    public static function respondTrade(int $playerId, bool $accept): array {
        $state = self::load();
        $trade = $state['pendingTrade'] ?? null;

        if (!$trade || $trade['toPlayerId'] !== $playerId) {
            return $state;
        }

        $fromPlayer = $state['players'][$trade['fromPlayerId']] ?? null;
        $toPlayer = $state['players'][$trade['toPlayerId']] ?? null;

        if ($accept) {
            // Re-validasi dana & properti
            $canExecute = true;
            if ($fromPlayer['money'] < $trade['offerMoney'] || $toPlayer['money'] < $trade['requestMoney']) {
                $canExecute = false;
            }
            foreach ($trade['offerPropertyIds'] as $pid) {
                if (($state['properties'][$pid]['ownerId'] ?? null) !== $trade['fromPlayerId']) {
                    $canExecute = false;
                }
            }
            foreach ($trade['requestPropertyIds'] as $pid) {
                if (($state['properties'][$pid]['ownerId'] ?? null) !== $trade['toPlayerId']) {
                    $canExecute = false;
                }
            }

            if ($canExecute) {
                self::executeTrade($state, $trade);
                self::addLog($state, "[TRADING BERHASIL] Barter aset antara {$fromPlayer['name']} dan {$toPlayer['name']} disepakati!", 'success');
            } else {
                self::addLog($state, "Barter gagal dieksekusi: Kondisi aset atau saldo pemain telah berubah.", 'danger');
            }
        } else {
            self::addLog($state, "{$toPlayer['name']} menolak tawaran barter dari {$fromPlayer['name']}.", 'warning');
        }

        $state['pendingTrade'] = null;
        self::save($state);
        return $state;
    }

    public static function cancelTrade(int $playerId): array {
        $state = self::load();
        if (isset($state['pendingTrade']) && ($state['pendingTrade']['fromPlayerId'] === $playerId || $state['pendingTrade']['toPlayerId'] === $playerId)) {
            $state['pendingTrade'] = null;
            self::addLog($state, "Tawaran barter dibatalkan.", 'info');
            self::save($state);
        }
        return $state;
    }

    private static function executeTrade(array &$state, array $trade): void {
        $fromId = $trade['fromPlayerId'];
        $toId = $trade['toPlayerId'];

        // 1. Transfer kepemilikan properti yang ditawarkan
        foreach ($trade['offerPropertyIds'] as $pid) {
            $state['properties'][$pid]['ownerId'] = $toId;
        }

        // 2. Transfer kepemilikan properti yang diminta
        foreach ($trade['requestPropertyIds'] as $pid) {
            $state['properties'][$pid]['ownerId'] = $fromId;
        }

        // 3. Transfer uang kas
        if ($trade['offerMoney'] > 0) {
            $state['players'][$fromId]['money'] -= $trade['offerMoney'];
            $state['players'][$toId]['money'] += $trade['offerMoney'];
        }
        if ($trade['requestMoney'] > 0) {
            $state['players'][$toId]['money'] -= $trade['requestMoney'];
            $state['players'][$fromId]['money'] += $trade['requestMoney'];
        }
    }

    public static function inviteTrade(int $fromPlayerId, int $toPlayerId): array {
        $state = self::load();
        if (($state['phase'] ?? '') === 'GAME_OVER') return $state;

        $fromPlayer = $state['players'][$fromPlayerId] ?? null;
        $toPlayer = $state['players'][$toPlayerId] ?? null;

        if (!$fromPlayer || !$toPlayer || $fromPlayerId === $toPlayerId) {
            self::addLog($state, "Ajakan trading tidak valid.", 'danger');
            return $state;
        }

        if (!empty($fromPlayer['isBankrupt']) || !empty($toPlayer['isBankrupt'])) {
            self::addLog($state, "Pemain bangkrut tidak dapat melakukan trading.", 'warning');
            return $state;
        }

        // Jika lawan adalah BOT AI, langsung setujui ajakan trading
        if (!empty($toPlayer['isAI'])) {
            $state['tradeInvite'] = [
                'id' => uniqid('tri_'),
                'fromPlayerId' => $fromPlayerId,
                'fromPlayerName' => $fromPlayer['name'],
                'fromPlayerColor' => $fromPlayer['color'] ?? '#3b82f6',
                'toPlayerId' => $toPlayerId,
                'toPlayerName' => $toPlayer['name'],
                'toPlayerColor' => $toPlayer['color'] ?? '#ef4444',
                'status' => 'ACCEPTED',
                'createdAt' => time()
            ];
            self::addLog($state, "{$fromPlayer['name']} membuka meja trading dengan {$toPlayer['name']}.", 'info');
            self::save($state);
            return $state;
        }

        // Jika lawan adalah Manusia (Online / PvP)
        $invite = [
            'id' => uniqid('tri_'),
            'fromPlayerId' => $fromPlayerId,
            'fromPlayerName' => $fromPlayer['name'],
            'fromPlayerColor' => $fromPlayer['color'] ?? '#3b82f6',
            'toPlayerId' => $toPlayerId,
            'toPlayerName' => $toPlayer['name'],
            'toPlayerColor' => $toPlayer['color'] ?? '#ef4444',
            'status' => 'PENDING',
            'createdAt' => time()
        ];

        $state['tradeInvite'] = $invite;
        self::addLog($state, "{$fromPlayer['name']} mengirim ajakan trading kepada {$toPlayer['name']}.", 'info');
        self::save($state);
        return $state;
    }

    public static function respondTradeInvite(int $playerId, bool $accept, ?string $inviteId = null): array {
        $state = self::load();
        $invite = $state['tradeInvite'] ?? null;

        if (!$invite || $invite['toPlayerId'] !== $playerId) {
            return $state;
        }

        if ($inviteId && $invite['id'] !== $inviteId) {
            return $state;
        }

        $fromPlayer = $state['players'][$invite['fromPlayerId']] ?? null;
        $toPlayer = $state['players'][$invite['toPlayerId']] ?? null;
        $fromName = $fromPlayer ? $fromPlayer['name'] : 'Pemain';
        $toName = $toPlayer ? $toPlayer['name'] : 'Pemain';

        if ($accept) {
            $state['tradeInvite']['status'] = 'ACCEPTED';
            self::addLog($state, "[TRADING DITERIMA] {$toName} menerima ajakan trading dari {$fromName}!", 'success');
        } else {
            $state['tradeInvite']['status'] = 'DECLINED';
            self::addLog($state, "[TRADING DITOLAK] {$toName} menolak ajakan trading dari {$fromName}.", 'warning');
        }

        self::save($state);
        return $state;
    }

    public static function cancelTradeInvite(int $playerId): array {
        $state = self::load();
        if (isset($state['tradeInvite']) && ($state['tradeInvite']['fromPlayerId'] === $playerId || $state['tradeInvite']['toPlayerId'] === $playerId)) {
            $state['tradeInvite'] = null;
            self::save($state);
        }
        return $state;
    }
}

