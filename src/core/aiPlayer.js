// AI Bot Controller untuk Monopoly

import { BOARD_SPACES } from '../data/boardData.js';
import { GameRules } from './gameRules.js';

export class AIPlayer {
  constructor(gameState) {
    this.gameState = gameState;
    this.isProcessing = false;

    this.gameState.subscribe((eventType, data) => {
      this.handleGameEvent(eventType, data);
    });
  }

  async handleGameEvent(eventType, data) {
    const player = this.gameState.getCurrentPlayer();
    if (!player || !player.isAI || player.isBankrupt || this.gameState.phase === 'GAME_OVER') {
      return;
    }

    if (this.isProcessing) return;

    if (eventType === 'turn_changed' || eventType === 'game_started' || eventType === 'phase_changed' || eventType === 'action_required') {
      this.evaluateTurn(player);
    }
  }

  async evaluateTurn(player) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      // 1. Jika dalam penjara dan siap lempar
      if (player.inJail && this.gameState.phase === 'READY_TO_ROLL') {
        await this.delay(800);
        if (player.getOutOfJailFreeCards > 0) {
          this.gameState.useJailCard(player);
        } else if (player.money > 6000000) {
          // Jika uang banyak, tebus penjara langsung
          this.gameState.payJailFine(player);
        }
      }

      // 2. Siap lempar dadu
      if (this.gameState.phase === 'READY_TO_ROLL') {
        await this.delay(1000);
        if (this.gameState.phase === 'READY_TO_ROLL') {
          await this.gameState.rollDice();
        }
      }

      // 3. Menghadapi aksi yang butuh keputusan
      if (this.gameState.phase === 'ACTION_REQUIRED') {
        const action = this.gameState.currentAction;
        if (!action) return;

        if (action.type === 'BUY_PROPOSAL') {
          await this.delay(1200);
          const space = action.space;
          const cost = action.price;

          // Cek apakah properti ini melengkapi komplek warna
          const tempProps = { ...this.gameState.properties };
          tempProps[space.id] = { ownerId: player.id };
          const willCompleteMonopoly = GameRules.hasMonopoly(player, space.group, tempProps);

          // Batas aman uang kas
          const cashBuffer = willCompleteMonopoly ? 500000 : 1500000;

          if (player.money - cost >= cashBuffer) {
            this.gameState.buyProperty(player.id, space.id);
          } else {
            this.gameState.passBuyProperty();
          }
        } else if (action.type === 'CARD_DRAWN') {
          await this.delay(2000); // beri jeda agar pemain manusia sempat membaca kartu
          this.gameState.resolveCardAction();
        }
      }

      // 4. Giliran selesai: Pertimbangkan bangun rumah sebelum mengakhiri giliran
      if (this.gameState.phase === 'TURN_ENDED') {
        await this.delay(600);
        this.tryBuildHouses(player);

        await this.delay(800);
        if (this.gameState.phase === 'TURN_ENDED') {
          this.gameState.endTurn();
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  // Coba membangun rumah jika memiliki komplek utuh dan modal cukup
  tryBuildHouses(player) {
    if (player.money < 2500000) return;

    for (const space of BOARD_SPACES) {
      if (space.type === 'property') {
        const check = GameRules.canBuildHouse(space, player, this.gameState.properties);
        if (check.canBuild && player.money - space.housePrice >= 1000000) {
          this.gameState.buildHouse(player.id, space.id);
          break; // bangun 1 per putaran agar stabil
        }
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
