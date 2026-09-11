<?php

namespace App\Core;

use App\Data\BoardData;

class AIPlayer {
    /**
     * Jalankan 1 langkah atau seluruh siklus giliran bot AI
     */
    public static function processTurn(): array {
        $state = GameState::load();
        $player = GameState::getCurrentPlayer($state);

        if (!$player || empty($player['isAI']) || !empty($player['isBankrupt']) || $state['phase'] === 'GAME_OVER') {
            return $state;
        }

        // 1. Jika dalam penjara
        if (!empty($player['inJail']) && $state['phase'] === 'READY_TO_ROLL') {
            if ($player['getOutOfJailFreeCards'] > 0) {
                $state = GameState::useJailCard();
            } else if ($player['money'] > 6000000) {
                $state = GameState::payJailFine();
            }
        }

        // 2. Siap lempar dadu
        if ($state['phase'] === 'READY_TO_ROLL') {
            $state = GameState::rollDice();
        }

        // 3. Tangani aksi keputusan jika ada
        if ($state['phase'] === 'ACTION_REQUIRED' && !empty($state['currentAction'])) {
            $action = $state['currentAction'];

            if ($action['type'] === 'BUY_PROPOSAL') {
                $space = $action['space'];
                $price = (int)$action['price'];

                // Evaluasi apakah menyelesaikan komplek warna
                $tempProps = $state['properties'];
                $tempProps[$space['id']] = ['ownerId' => $player['id']];
                $willComplete = GameRules::hasMonopoly($player['id'], $space['group'], $tempProps);
                $buffer = $willComplete ? 500000 : 1500000;

                if ($player['money'] - $price >= $buffer) {
                    $state = GameState::buyProperty($player['id'], $space['id']);
                } else {
                    $state = GameState::passBuyProperty();
                }
            } else if ($action['type'] === 'BUILD_PROPOSAL') {
                $space = $action['space'];
                $housePrice = (int)$space['housePrice'];
                if ($player['money'] - $housePrice >= 800000) {
                    $state = GameState::buildHouse($player['id'], $space['id']);
                } else {
                    $state = GameState::passBuyProperty();
                }
            } else if ($action['type'] === 'CARD_DRAWN') {
                $state = GameState::resolveCardAction();
            }
        }

        return $state;
    }

    /**
     * Evaluasi cerdas bot AI terhadap proposal barter / trading dari pemain lain
     */
    public static function evaluateTradeOffer(
        array $state,
        int $fromPlayerId,
        int $toPlayerId,
        array $offerPropertyIds,
        int $offerMoney,
        array $requestPropertyIds,
        int $requestMoney
    ): bool {
        $ai = $state['players'][$toPlayerId] ?? null;
        $human = $state['players'][$fromPlayerId] ?? null;
        if (!$ai || !$human) return false;

        // 1. Cek likuiditas kas: Jika AI diminta membayar uang dan menyisakan kas < Rp 500.000, tolak
        if ($requestMoney > 0 && ($ai['money'] - $requestMoney < 500000)) {
            return false;
        }

        $spacesMap = [];
        foreach (BoardData::BOARD_SPACES as $s) {
            $spacesMap[$s['id']] = $s;
        }

        // 2. Hitung nilai aset yang AI DAPATKAN (Value Received)
        $valueReceived = $offerMoney;
        $tempPropsAI = $state['properties'];
        foreach ($offerPropertyIds as $pid) {
            $s = $spacesMap[$pid] ?? null;
            if (!$s) continue;
            $basePrice = (int)($s['price'] ?? 1000000);
            $tempPropsAI[$pid] = ['ownerId' => $toPlayerId];

            // Bonus besar jika melengkapi set monopoli warna AI
            if (!empty($s['group']) && GameRules::hasMonopoly($toPlayerId, $s['group'], $tempPropsAI)) {
                $basePrice *= 2.2;
            }
            $valueReceived += $basePrice;
        }

        // 3. Hitung nilai aset yang AI BERIKAN (Value Given)
        $valueGiven = $requestMoney;
        $tempPropsHuman = $state['properties'];
        foreach ($requestPropertyIds as $pid) {
            $s = $spacesMap[$pid] ?? null;
            if (!$s) continue;
            $basePrice = (int)($s['price'] ?? 1000000);
            $tempPropsHuman[$pid] = ['ownerId' => $fromPlayerId];

            // Penalti tinggi jika memberikan set monopoli warna kepada lawan
            if (!empty($s['group']) && GameRules::hasMonopoly($fromPlayerId, $s['group'], $tempPropsHuman)) {
                $basePrice *= 2.0;
            }
            $valueGiven += $basePrice;
        }

        // AI menerima jika tawaran yang didapat bernilai setidaknya 90% dari yang diminta
        return $valueReceived >= ($valueGiven * 0.9);
    }
}
