<?php

namespace App\Controllers;

use Flight;
use App\Core\GameState;
use App\Core\AIPlayer;
use App\Core\RoomManager;
use App\Data\BoardData;

class GameController {
    private static function initRequestContext(): ?string {
        $queryCode = Flight::request()->query['roomCode'] ?? Flight::request()->query['code'] ?? null;
        $bodyData = Flight::request()->data->getData();
        $dataCode = $bodyData['roomCode'] ?? $bodyData['code'] ?? null;
        
        if (!$dataCode) {
            $rawBody = Flight::request()->getBody();
            if ($rawBody) {
                $parsed = json_decode($rawBody, true);
                if (is_array($parsed)) {
                    $dataCode = $parsed['roomCode'] ?? $parsed['code'] ?? null;
                }
            }
        }
        
        $roomCode = $dataCode ?: $queryCode;
        
        GameState::setContextRoomCode($roomCode);
        return $roomCode;
    }

    public static function index(): void {
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');
        $state = GameState::load();
        Flight::render('board', [
            'initialState' => $state,
            'boardSpaces' => BoardData::BOARD_SPACES,
            'propertyGroups' => BoardData::PROPERTY_GROUPS
        ]);
    }

    public static function getState(): void {
        self::initRequestContext();
        Flight::json(GameState::load());
    }

    public static function newGame(): void {
        $roomCode = self::initRequestContext();
        $data = Flight::request()->data->getData();
        $players = $data['players'] ?? [
            ['name' => 'Pemain 1', 'isAI' => false, 'token' => 'Merah', 'color' => '#3b82f6'],
            ['name' => 'Bot Budi', 'isAI' => true, 'token' => 'Biru', 'color' => '#ef4444']
        ];

        $options = $data['options'] ?? [];
        $state = GameState::initGame($players, $options);
        if ($roomCode) {
            GameState::save($state, $roomCode);
        }
        Flight::json($state);
    }

    public static function roll(): void {
        self::initRequestContext();
        $state = GameState::rollDice();
        Flight::json($state);
    }

    public static function buy(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $spaceId = (int)($data['spaceId'] ?? 0);
        $playerId = (int)($data['playerId'] ?? 0);

        $state = GameState::buyProperty($playerId, $spaceId);
        Flight::json($state);
    }

    public static function pass(): void {
        self::initRequestContext();
        $state = GameState::passBuyProperty();
        Flight::json($state);
    }

    public static function build(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $spaceId = (int)($data['spaceId'] ?? 0);
        $playerId = (int)($data['playerId'] ?? 0);

        $state = GameState::buildHouse($playerId, $spaceId);
        Flight::json($state);
    }

    public static function mortgage(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $spaceId = (int)($data['spaceId'] ?? 0);
        $playerId = (int)($data['playerId'] ?? 0);

        $state = GameState::mortgageProperty($playerId, $spaceId);
        Flight::json($state);
    }

    public static function unmortgage(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $spaceId = (int)($data['spaceId'] ?? 0);
        $playerId = (int)($data['playerId'] ?? 0);

        $state = GameState::unmortgageProperty($playerId, $spaceId);
        Flight::json($state);
    }

    public static function payJailFine(): void {
        self::initRequestContext();
        $state = GameState::payJailFine();
        Flight::json($state);
    }

    public static function useJailCard(): void {
        self::initRequestContext();
        $state = GameState::useJailCard();
        Flight::json($state);
    }

    public static function resolveCard(): void {
        self::initRequestContext();
        $rawBody = Flight::request()->getBody();
        $json = json_decode($rawBody, true);
        $choice = null;
        if (is_array($json) && isset($json['choice'])) {
            $choice = (string)$json['choice'];
        } elseif (isset(Flight::request()->data->choice)) {
            $choice = (string)Flight::request()->data->choice;
        } elseif (isset(Flight::request()->query->choice)) {
            $choice = (string)Flight::request()->query->choice;
        }
        $state = GameState::resolveCardAction($choice);
        Flight::json($state);
    }

    public static function endTurn(): void {
        self::initRequestContext();
        $state = GameState::endTurn();
        Flight::json($state);
    }

    public static function botStep(): void {
        self::initRequestContext();
        $state = AIPlayer::processTurn();
        Flight::json($state);
    }

    public static function trade(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $playerAId = (int)($data['playerAId'] ?? 0);
        $playerBId = (int)($data['playerBId'] ?? 0);
        $offer = (array)($data['offer'] ?? []);
        $request = (array)($data['request'] ?? []);

        $state = GameState::tradeProperties($playerAId, $playerBId, $offer, $request);
        Flight::json($state);
    }

    public static function proposeTrade(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $fromPlayerId = (int)($data['fromPlayerId'] ?? 0);
        $toPlayerId = (int)($data['toPlayerId'] ?? 0);
        $offerPropertyIds = array_map('intval', (array)($data['offerPropertyIds'] ?? []));
        $offerMoney = max(0, (int)($data['offerMoney'] ?? 0));
        $requestPropertyIds = array_map('intval', (array)($data['requestPropertyIds'] ?? []));
        $requestMoney = max(0, (int)($data['requestMoney'] ?? 0));

        $state = GameState::proposeTrade($fromPlayerId, $toPlayerId, $offerPropertyIds, $offerMoney, $requestPropertyIds, $requestMoney);
        Flight::json($state);
    }

    public static function respondTrade(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $playerId = (int)($data['playerId'] ?? 0);
        $accept = !empty($data['accept']);

        $state = GameState::respondTrade($playerId, $accept);
        Flight::json($state);
    }

    public static function cancelTrade(): void {
        self::initRequestContext();
        $data = Flight::request()->data->getData();
        $playerId = (int)($data['playerId'] ?? 0);

        $state = GameState::cancelTrade($playerId);
        Flight::json($state);
    }

    public static function sendTradeInvite(): void {
        self::initRequestContext();
        $body = Flight::request()->getBody();
        $json = json_decode($body, true);
        $data = is_array($json) ? array_merge(Flight::request()->data->getData(), $json) : Flight::request()->data->getData();
        $fromPlayerId = (int)($data['fromPlayerId'] ?? 0);
        $toPlayerId = (int)($data['toPlayerId'] ?? 0);

        $state = GameState::inviteTrade($fromPlayerId, $toPlayerId);
        Flight::json($state);
    }

    public static function respondTradeInvite(): void {
        self::initRequestContext();
        $body = Flight::request()->getBody();
        $json = json_decode($body, true);
        $data = is_array($json) ? array_merge(Flight::request()->data->getData(), $json) : Flight::request()->data->getData();
        $playerId = (int)($data['playerId'] ?? 0);
        $accept = !empty($data['accept']);
        $inviteId = !empty($data['inviteId']) ? (string)$data['inviteId'] : null;

        $state = GameState::respondTradeInvite($playerId, $accept, $inviteId);
        Flight::json($state);
    }

    public static function cancelTradeInvite(): void {
        self::initRequestContext();
        $body = Flight::request()->getBody();
        $json = json_decode($body, true);
        $data = is_array($json) ? array_merge(Flight::request()->data->getData(), $json) : Flight::request()->data->getData();
        $playerId = (int)($data['playerId'] ?? 0);

        $state = GameState::cancelTradeInvite($playerId);
        Flight::json($state);
    }

    public static function surrender(): void {
        $roomCode = self::initRequestContext();
        $body = Flight::request()->getBody();
        $json = json_decode($body, true);
        $data = is_array($json) ? array_merge(Flight::request()->data->getData(), $json) : Flight::request()->data->getData();
        $playerId = (int)($data['playerId'] ?? 0);

        if ($roomCode) {
            $result = RoomManager::removePlayer($roomCode, $playerId);
            Flight::json($result['gameState'] ?? GameState::load($roomCode));
            return;
        }

        $state = GameState::load();
        if (isset($state['players'][$playerId])) {
            $state['players'][$playerId]['isBankrupt'] = true;
            $state['players'][$playerId]['isLeft'] = true;
            $pName = $state['players'][$playerId]['name'];
            GameState::addLog($state, "🚪 {$pName} telah menyerah dari permainan!", 'danger');

            // Lepas properti milik pemain yang menyerah
            foreach (\App\Data\BoardData::BOARD_SPACES as $s) {
                if (isset($state['properties'][$s['id']]) && (int)$state['properties'][$s['id']]['ownerId'] === $playerId) {
                    $state['properties'][$s['id']] = [
                        'ownerId' => null,
                        'houses' => 0,
                        'isHotel' => false,
                        'isMortgaged' => false
                    ];
                }
            }

            // Ganti giliran jika pemain yang keluar sedang aktif
            if ((int)$state['currentPlayerIndex'] === $playerId && ($state['phase'] ?? '') !== 'GAME_OVER') {
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

            $active = array_values(array_filter($state['players'], fn($p) => empty($p['isBankrupt'])));
            if (count($active) === 1) {
                $winner = $active[0];
                $state['phase'] = 'GAME_OVER';
                GameState::addLog($state, "🏆 SELAMAT! {$winner['name']} dinobatkan sebagai JUARA karena pemain lain telah keluar/bangkrut!", 'highlight');
            } else if (empty($active)) {
                $state['phase'] = 'GAME_OVER';
            }
            GameState::save($state);
        }
        Flight::json($state);
    }

    // ==========================================
    // MULTIPLAYER ONLINE ROOM & LOBBY CONTROLLER
    // ==========================================

    public static function createRoom(): void {
        $data = Flight::request()->data->getData();
        $hostName = trim($data['hostName'] ?? 'Host');
        $maxPlayers = max(2, min(4, (int)($data['maxPlayers'] ?? 4)));
        $options = $data['options'] ?? [];

        $room = RoomManager::createRoom($hostName, $maxPlayers, $options);
        Flight::json([
            'success' => true,
            'room' => $room,
            'player' => $room['players'][0]
        ]);
    }

    public static function joinRoom(): void {
        $data = Flight::request()->data->getData();
        $code = trim($data['code'] ?? '');
        $playerName = trim($data['playerName'] ?? '');

        if (!$code) {
            Flight::json(['success' => false, 'message' => 'Kode ruangan wajib diisi!']);
            return;
        }

        $result = RoomManager::joinRoom($code, $playerName);
        Flight::json($result);
    }

    public static function getRoomStatus(): void {
        $code = Flight::request()->query['code'] ?? Flight::request()->data->code ?? '';
        if (!$code) {
            Flight::json(['success' => false, 'message' => 'Kode ruangan tidak valid']);
            return;
        }

        $room = RoomManager::getRoom($code);
        if (!$room) {
            Flight::json(['success' => false, 'message' => 'Ruangan tidak ditemukan']);
            return;
        }

        Flight::json(['success' => true, 'room' => $room]);
    }

    public static function addRoomBot(): void {
        $data = Flight::request()->data->getData();
        $code = trim($data['code'] ?? '');
        $result = RoomManager::addBot($code);
        Flight::json($result);
    }

    public static function leaveRoom(): void {
        $data = Flight::request()->data->getData();
        $code = trim($data['code'] ?? '');
        $playerId = (int)($data['playerId'] ?? -1);
        $result = RoomManager::removePlayer($code, $playerId);
        Flight::json($result);
    }

    public static function startRoomGame(): void {
        $data = Flight::request()->data->getData();
        $code = trim($data['code'] ?? '');
        $result = RoomManager::startGame($code);
        Flight::json($result);
    }

    public static function sendChat(): void {
        $roomCode = self::initRequestContext();
        $body = Flight::request()->getBody();
        $json = json_decode($body, true);
        $data = is_array($json) ? array_merge(Flight::request()->data->getData(), $json) : Flight::request()->data->getData();
        $senderId = (int)($data['senderId'] ?? 0);
        $senderName = trim($data['senderName'] ?? 'Pemain');
        $senderColor = trim($data['senderColor'] ?? '#3b82f6');
        $message = trim($data['message'] ?? '');
        $emote = trim($data['emote'] ?? '');

        if ($message === '' && $emote === '') {
            Flight::json(['success' => false, 'message' => 'Pesan atau emotikon kosong']);
            return;
        }

        $state = GameState::load($roomCode);
        $chatEntry = GameState::addChat($state, $senderId, $senderName, $senderColor, $message, $emote);
        GameState::save($state, $roomCode);

        Flight::json([
            'success' => true,
            'chat' => $chatEntry,
            'state' => $state
        ]);
    }
}
