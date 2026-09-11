<?php

namespace App\Core;

use App\Data\BoardData;

class GameRules {
    public static function hasMonopoly(int $playerId, string $groupKey, array $propertiesState): bool {
        $groupDef = BoardData::PROPERTY_GROUPS[$groupKey] ?? null;
        if (!$groupDef) return false;

        $ownedCount = 0;
        foreach (BoardData::BOARD_SPACES as $space) {
            if (($space['group'] ?? null) === $groupKey) {
                $prop = $propertiesState[$space['id']] ?? null;
                if ($prop && ($prop['ownerId'] ?? null) === $playerId) {
                    $ownedCount++;
                }
            }
        }

        return $ownedCount === $groupDef['total'];
    }

    public static function calculateRent(array $space, array $owner, int $diceSum, array $propertiesState): int {
        $prop = $propertiesState[$space['id']] ?? null;
        if (!$prop || !empty($prop['isMortgaged'])) {
            return 0;
        }

        if ($space['type'] === 'property') {
            $houses = (int)($prop['houses'] ?? 0);
            $isHotel = !empty($prop['isHotel']);

            if ($isHotel) {
                return (int)$space['rent'][5];
            }
            if ($houses > 0) {
                return (int)$space['rent'][$houses];
            }

            $hasMonopoly = self::hasMonopoly($owner['id'], $space['group'], $propertiesState);
            return $hasMonopoly ? ((int)$space['rent'][0] * 2) : (int)$space['rent'][0];
        }

        if ($space['type'] === 'railroad') {
            $count = 0;
            foreach (BoardData::BOARD_SPACES as $s) {
                if ($s['type'] === 'railroad') {
                    $p = $propertiesState[$s['id']] ?? null;
                    if ($p && ($p['ownerId'] ?? null) === $owner['id'] && empty($p['isMortgaged'])) {
                        $count++;
                    }
                }
            }
            $idx = max(0, min($count - 1, 3));
            return (int)($space['rent'][$idx] ?? 250000);
        }

        if ($space['type'] === 'utility') {
            $count = 0;
            foreach (BoardData::BOARD_SPACES as $s) {
                if ($s['type'] === 'utility') {
                    $p = $propertiesState[$s['id']] ?? null;
                    if ($p && ($p['ownerId'] ?? null) === $owner['id'] && empty($p['isMortgaged'])) {
                        $count++;
                    }
                }
            }
            $multiplier = $count >= 2 ? 100000 : 40000;
            return ($diceSum ?: 7) * $multiplier;
        }

        return 0;
    }

    public static function canBuildHouse(array $space, array $player, array $propertiesState): array {
        if ($space['type'] !== 'property') {
            return ['canBuild' => false, 'reason' => 'Bukan petak properti biasa'];
        }

        $prop = $propertiesState[$space['id']] ?? null;
        if (!$prop || ($prop['ownerId'] ?? null) !== $player['id']) {
            return ['canBuild' => false, 'reason' => 'Bukan milik Anda'];
        }
        if (!empty($prop['isMortgaged'])) {
            return ['canBuild' => false, 'reason' => 'Tanah sedang digadaikan'];
        }
        if (!empty($prop['isHotel'])) {
            return ['canBuild' => false, 'reason' => 'Sudah level maksimal (Hotel)'];
        }

        if ($player['money'] < $space['housePrice']) {
            return ['canBuild' => false, 'reason' => 'Saldo kas tidak mencukupi (Butuh ' . number_format($space['housePrice'], 0, ',', '.') . ')'];
        }

        // Syarat Wajib: Bidak pemain harus mendarat di petak ini untuk dapat membangun rumah (maksimal 1 per putaran)
        if ((int)$player['position'] !== (int)$space['id']) {
            return ['canBuild' => false, 'reason' => 'Anda hanya dapat membangun rumah saat bidak mendarat di petak ini!'];
        }

        return ['canBuild' => true];
    }

    public static function calculateNetWorth(array $player, array $propertiesState): int {
        $total = $player['money'];
        foreach (BoardData::BOARD_SPACES as $space) {
            $prop = $propertiesState[$space['id']] ?? null;
            if ($prop && ($prop['ownerId'] ?? null) === $player['id']) {
                if (!empty($prop['isMortgaged'])) {
                    $total += $space['mortgage'] ?? 0;
                } else {
                    $total += $space['price'] ?? 0;
                    if (!empty($prop['houses'])) {
                        $total += (int)$prop['houses'] * (int)($space['housePrice'] ?? 0);
                    }
                    if (!empty($prop['isHotel'])) {
                        $total += 5 * (int)($space['housePrice'] ?? 0);
                    }
                }
            }
        }
        return $total;
    }
}
