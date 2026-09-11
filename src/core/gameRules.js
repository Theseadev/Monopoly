// Aturan Permainan Monopoly (Game Rules & Rent Calculations)

import { BOARD_SPACES, PROPERTY_GROUPS } from '../data/boardData.js';

export class GameRules {
  // Mengecek apakah seorang pemain memiliki seluruh properti dalam satu kelompok warna
  static hasMonopoly(player, groupKey, propertiesState) {
    const groupDef = PROPERTY_GROUPS[groupKey];
    if (!groupDef) return false;

    const groupSpaces = BOARD_SPACES.filter(s => s.group === groupKey);
    const ownedCount = groupSpaces.filter(s => {
      const propState = propertiesState[s.id];
      return propState && propState.ownerId === player.id;
    }).length;

    return ownedCount === groupDef.total;
  }

  // Menghitung biaya sewa yang harus dibayar ketika mendarat di petak tertentu
  static calculateRent(space, owner, diceSum, propertiesState, allPlayers) {
    const propState = propertiesState[space.id];
    if (!propState || propState.isMortgaged) {
      return 0; // Properti digadaikan atau belum dimiliki, sewa 0
    }

    if (space.type === 'property') {
      const houseCount = propState.houses || 0;
      const isHotel = propState.isHotel || false;

      if (isHotel) {
        return space.rent[5];
      }
      if (houseCount > 0) {
        return space.rent[houseCount];
      }
      // Jika belum ada rumah: cek apakah punya komplek warna utuh (sewa 2x lipat)
      const hasFullGroup = this.hasMonopoly(owner, space.group, propertiesState);
      return hasFullGroup ? space.rent[0] * 2 : space.rent[0];
    }

    if (space.type === 'railroad') {
      // Hitung berapa stasiun yang dimiliki pemain ini
      const ownedRailroads = BOARD_SPACES.filter(s => s.type === 'railroad').filter(s => {
        const p = propertiesState[s.id];
        return p && p.ownerId === owner.id && !p.isMortgaged;
      }).length;

      const idx = Math.max(0, Math.min(ownedRailroads - 1, 3));
      return space.rent[idx] || 250000;
    }

    if (space.type === 'utility') {
      // Hitung berapa utilitas yang dimiliki pemilik
      const ownedUtilities = BOARD_SPACES.filter(s => s.type === 'utility').filter(s => {
        const p = propertiesState[s.id];
        return p && p.ownerId === owner.id && !p.isMortgaged;
      }).length;

      // 1 utilitas: 40.000 x jumlah dadu, 2 utilitas: 100.000 x jumlah dadu
      const multiplier = ownedUtilities >= 2 ? 100000 : 40000;
      return (diceSum || 7) * multiplier;
    }

    return 0;
  }

  // Memeriksa apakah properti dapat dibangun rumah/hotel
  static canBuildHouse(space, player, propertiesState) {
    if (space.type !== 'property') return { canBuild: false, reason: "Bukan petak properti biasa" };

    const propState = propertiesState[space.id];
    if (!propState || propState.ownerId !== player.id) {
      return { canBuild: false, reason: "Bukan milik Anda" };
    }
    if (propState.isMortgaged) {
      return { canBuild: false, reason: "Tanah sedang digadaikan" };
    }
    if (propState.isHotel) {
      return { canBuild: false, reason: "Sudah maksimal (Hotel)" };
    }

    // Harus memiliki satu komplek warna
    const hasFullGroup = this.hasMonopoly(player, space.group, propertiesState);
    if (!hasFullGroup) {
      return { canBuild: false, reason: "Harus memiliki semua tanah dalam komplek warna ini" };
    }

    // Pastikan tidak ada tanah dalam grup yang digadaikan
    const groupSpaces = BOARD_SPACES.filter(s => s.group === space.group);
    const anyMortgaged = groupSpaces.some(s => propertiesState[s.id]?.isMortgaged);
    if (anyMortgaged) {
      return { canBuild: false, reason: "Ada tanah satu komplek yang sedang digadaikan" };
    }

    // Aturan pembangunan merata (even building rule)
    const currentHouses = propState.houses || 0;
    for (const otherSpace of groupSpaces) {
      const otherState = propertiesState[otherSpace.id];
      const otherHouses = (otherState?.isHotel ? 5 : (otherState?.houses || 0));
      if (currentHouses > otherHouses) {
        return { canBuild: false, reason: "Pembangunan harus merata di seluruh tanah satu komplek" };
      }
    }

    // Cek kecukupan uang
    if (player.money < space.housePrice) {
      return { canBuild: false, reason: `Uang tidak cukup (butuh Rp ${space.housePrice.toLocaleString('id-ID')})` };
    }

    return { canBuild: true };
  }

  // Menghitung kekayaan bersih total seorang pemain (uang tunai + nilai tanah + bangunan)
  static calculateNetWorth(player, propertiesState) {
    let total = player.money;
    for (const space of BOARD_SPACES) {
      const propState = propertiesState[space.id];
      if (propState && propState.ownerId === player.id) {
        if (propState.isMortgaged) {
          total += space.mortgage || 0;
        } else {
          total += space.price || 0;
          if (propState.houses) {
            total += propState.houses * (space.housePrice || 0);
          }
          if (propState.isHotel) {
            total += 5 * (space.housePrice || 0);
          }
        }
      }
    }
    return total;
  }
}
