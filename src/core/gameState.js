// Game State Manager untuk Monopoly

import { BOARD_SPACES } from '../data/boardData.js';
import { CHANCE_CARDS, COMMUNITY_CHEST_CARDS } from '../data/cardsData.js';
import { GameRules } from './gameRules.js';
import { sound } from './sound.js';

export class GameState {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.properties = {}; // spaceId -> { ownerId, houses, isHotel, isMortgaged }
    this.dice = [1, 1];
    this.consecutiveDoubles = 0;
    this.phase = 'SETUP'; // SETUP, READY_TO_ROLL, ROLLING, ACTION_REQUIRED, TURN_ENDED, GAME_OVER
    this.currentAction = null; // { type, space, amount, owner, card, etc. }
    this.logs = [];
    this.listeners = [];

    // Tumpukan kartu (deck) berimbang ritmis
    this.chanceDeck = this.createBalancedDeck([...CHANCE_CARDS]);
    this.communityChestDeck = this.createBalancedDeck([...COMMUNITY_CHEST_CARDS]);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(eventType, data = null) {
    for (const listener of this.listeners) {
      listener(eventType, data, this);
    }
  }

  addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.logs.unshift({ message, type, time: timestamp });
    if (this.logs.length > 80) this.logs.pop();
    this.notify('log_added', { message, type });
  }

  createBalancedDeck(cards) {
    const gains = [];
    const choices = [];
    const penalties = [];

    cards.forEach(card => {
      const type = card.type || '';
      if (type === 'choice') {
        choices.push(card);
      } else if (['receive_money', 'collect_all_players', 'jail_card'].includes(type) || type === 'move_to' || (type === 'move_steps' && (card.steps || 0) > 0)) {
        gains.push(card);
      } else {
        penalties.push(card);
      }
    });

    this.shuffle(gains);
    this.shuffle(choices);
    this.shuffle(penalties);

    const balanced = [];
    while (gains.length > 0 || choices.length > 0 || penalties.length > 0) {
      if (gains.length > 0) balanced.push(gains.shift());
      if (choices.length > 0 && (balanced.length % 4 === 1 || penalties.length === 0)) {
        balanced.push(choices.shift());
      }
      if (gains.length > 0) balanced.push(gains.shift());
      if (penalties.length > 0) balanced.push(penalties.shift());
      if (choices.length > 0 && balanced.length % 3 === 0) {
        balanced.push(choices.shift());
      }
    }

    return balanced;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  initGame(playersConfig) {
    // playersConfig: [{ name, isAI, token, color }]
    this.players = playersConfig.map((p, idx) => ({
      id: idx,
      name: p.name,
      isAI: p.isAI,
      token: p.token || '🚗',
      color: p.color || '#3b82f6',
      money: 15000000,
      position: 0,
      inJail: false,
      jailTurns: 0,
      getOutOfJailFreeCards: 0,
      isBankrupt: false
    }));

    this.properties = {};
    for (const space of BOARD_SPACES) {
      if (['property', 'railroad', 'utility'].includes(space.type)) {
        this.properties[space.id] = {
          ownerId: null,
          houses: 0,
          isHotel: false,
          isMortgaged: false
        };
      }
    }

    this.currentPlayerIndex = 0;
    this.consecutiveDoubles = 0;
    this.phase = 'READY_TO_ROLL';
    this.currentAction = null;
    this.logs = [];

    this.addLog("Permainan Monopoli dimulai! Semoga beruntung.", 'system');
    this.notify('game_started');
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getActivePlayers() {
    return this.players.filter(p => !p.isBankrupt);
  }

  // Lempar dadu
  async rollDice() {
    if (this.phase !== 'READY_TO_ROLL') return null;

    const player = this.getCurrentPlayer();
    this.phase = 'ROLLING';
    this.notify('phase_changed', this.phase);

    sound.playDiceRoll();

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    this.dice = [d1, d2];
    const isDouble = d1 === d2;
    const totalSteps = d1 + d2;

    this.notify('dice_rolled', { dice: this.dice, totalSteps, isDouble });

    // Tunggu sedikit agar animasi dadu terlihat
    await new Promise(r => setTimeout(r, 900));

    // Jika sedang dalam penjara
    if (player.inJail) {
      if (isDouble) {
        this.addLog(`${player.name} melempar dadu kembar (${d1}-${d2}) dan bebas dari penjara!`, 'success');
        player.inJail = false;
        player.jailTurns = 0;
        this.consecutiveDoubles = 0;
        await this.stepPlayer(player, totalSteps);
      } else {
        player.jailTurns += 1;
        if (player.jailTurns >= 3) {
          this.addLog(`${player.name} sudah 3 putaran di penjara. Wajib bayar denda Rp 1.500.000.`, 'warning');
          this.deductMoney(player, 1500000);
          player.inJail = false;
          player.jailTurns = 0;
          await this.stepPlayer(player, totalSteps);
        } else {
          this.addLog(`${player.name} gagal melempar dadu kembar (${d1}-${d2}). Masih ditahan (putaran ke-${player.jailTurns}).`, 'info');
          this.phase = 'TURN_ENDED';
          this.notify('phase_changed', this.phase);
          return;
        }
      }
      return;
    }

    // Cek aturan dadu kembar 3x beruntun
    if (isDouble) {
      this.consecutiveDoubles += 1;
      if (this.consecutiveDoubles === 3) {
        this.addLog(`${player.name} melempar angka kembar 3x berturut-turut! Langsung masuk penjara!`, 'danger');
        this.sendToJail(player);
        this.phase = 'TURN_ENDED';
        this.notify('phase_changed', this.phase);
        return;
      }
      this.addLog(`${player.name} melempar angka kembar (${d1}-${d2})! Dapat kesempatan jalan lagi setelah ini.`, 'highlight');
    } else {
      this.consecutiveDoubles = 0;
    }

    await this.stepPlayer(player, totalSteps);
  }

  // Gerakkan pion langkah demi langkah
  async stepPlayer(player, steps) {
    for (let i = 0; i < steps; i++) {
      player.position = (player.position + 1) % 40;
      sound.playStep();
      this.notify('player_moved', { player, currentPosition: player.position });

      // Jika benar-benar melewati petak Mulai (GO) dan bukan berhenti di Mulai
      if (player.position === 0 && i < steps - 1) {
        player.money += 2000000;
        sound.playCash();
        this.addLog(`${player.name} melewati Mulai (GO) dan menerima Rp 2.000.000!`, 'success');
      }

      await new Promise(r => setTimeout(r, 160));
    }

    // Mendarat di petak tujuan
    await this.handleLandedSpace(player);
  }

  // Pindahkan langsung ke posisi tertentu
  async movePlayerTo(player, targetIndex, canCollectGo = true) {
    const oldPos = player.position;
    if (canCollectGo && targetIndex < oldPos && targetIndex > 0 && targetIndex !== 10) {
      player.money += 2000000;
      sound.playCash();
      this.addLog(`${player.name} melewati Mulai (GO) dan mendapat Rp 2.000.000!`, 'success');
    }

    player.position = targetIndex;
    sound.playStep();
    this.notify('player_moved', { player, currentPosition: player.position });

    await new Promise(r => setTimeout(r, 300));
    await this.handleLandedSpace(player);
  }

  // Eksekusi logika petak tempat pemain mendarat
  async handleLandedSpace(player) {
    const space = BOARD_SPACES[player.position];

    // Jika mendarat tepat di Mulai (GO)
    if (space.id === 0) {
      this.addLog(`${player.name} mendarat tepat di Mulai (GO). Tidak mendapat Rp 2.000.000 karena berhenti di Mulai.`, 'info');
      this.finishAction();
      return;
    }

    this.addLog(`${player.name} mendarat di ${space.name}.`, 'info');

    // 1. Petak Properti / Stasiun / Utilitas
    if (['property', 'railroad', 'utility'].includes(space.type)) {
      const prop = this.properties[space.id];

      // Belum ada pemilik
      if (prop.ownerId === null) {
        this.phase = 'ACTION_REQUIRED';
        this.currentAction = {
          type: 'BUY_PROPOSAL',
          space,
          price: space.price
        };
        this.notify('action_required', this.currentAction);
        return;
      }

      // Milik lawan
      if (prop.ownerId !== player.id) {
        const owner = this.players[prop.ownerId];

        if (prop.isMortgaged) {
          this.addLog(`${space.name} sedang digadaikan oleh ${owner.name}. Bebas biaya sewa!`, 'info');
          this.finishAction();
          return;
        }

        const rent = GameRules.calculateRent(space, owner, this.dice[0] + this.dice[1], this.properties, this.players);
        this.addLog(`${player.name} harus membayar sewa Rp ${rent.toLocaleString('id-ID')} kepada ${owner.name}.`, 'warning');

        sound.playCash();
        this.transferMoney(player, owner, rent);
        this.finishAction();
        return;
      }

      // Milik sendiri
      this.addLog(`${space.name} adalah milik ${player.name} sendiri.`, 'info');
      this.finishAction();
      return;
    }

    // 2. Petak Pajak
    if (space.type === 'tax') {
      this.addLog(`${player.name} terkena ${space.name} sebesar Rp ${space.amount.toLocaleString('id-ID')}.`, 'warning');
      this.deductMoney(player, space.amount);
      sound.playCash();
      this.finishAction();
      return;
    }

    // 3. Masuk Penjara
    if (space.type === 'corner' && space.subType === 'go-to-jail') {
      this.addLog(`${player.name} masuk ke petak Masuk Penjara!`, 'danger');
      this.sendToJail(player);
      this.finishAction();
      return;
    }

    // 4. Kartu Kesempatan / Dana Umum
    if (space.type === 'special') {
      sound.playCard();
      const isChance = space.subType === 'chance';
      const deck = isChance ? this.chanceDeck : this.communityChestDeck;
      const card = deck.shift();
      deck.push(card); // masukkan ke dasar tumpukan lagi

      this.phase = 'ACTION_REQUIRED';
      this.currentAction = {
        type: 'CARD_DRAWN',
        cardType: isChance ? 'Kesempatan' : 'Dana Umum',
        card
      };
      this.notify('action_required', this.currentAction);
      return;
    }

    // Petak Bebas Parkir / Lewat Penjara / Mulai
    this.finishAction();
  }

  // Kirim ke Penjara
  sendToJail(player) {
    sound.playJail();
    player.position = 10;
    player.inJail = true;
    player.jailTurns = 0;
    this.consecutiveDoubles = 0;
    this.notify('player_moved', { player, currentPosition: 10 });
    this.addLog(`${player.name} dijebloskan ke Penjara!`, 'danger');
  }

  // Beli Properti
  buyProperty(playerId, spaceId) {
    const player = this.players[playerId];
    const space = BOARD_SPACES[spaceId];
    const prop = this.properties[spaceId];

    if (!prop || prop.ownerId !== null) return false;
    if (player.money < space.price) {
      this.addLog(`${player.name} tidak memiliki cukup uang untuk membeli ${space.name}.`, 'warning');
      return false;
    }

    player.money -= space.price;
    prop.ownerId = player.id;
    sound.playBuy();
    this.addLog(`${player.name} membeli ${space.name} seharga Rp ${space.price.toLocaleString('id-ID')}!`, 'success');

    this.notify('property_bought', { player, space });
    this.finishAction();
    return true;
  }

  // Lewati Pembelian
  passBuyProperty() {
    const player = this.getCurrentPlayer();
    this.addLog(`${player.name} memutuskan untuk tidak membeli properti ini.`, 'info');
    this.finishAction();
  }

  // Bangun Rumah / Hotel
  buildHouse(playerId, spaceId) {
    const player = this.players[playerId];
    const space = BOARD_SPACES[spaceId];
    const can = GameRules.canBuildHouse(space, player, this.properties);

    if (!can.canBuild) {
      this.addLog(`Gagal membangun: ${can.reason}`, 'warning');
      return false;
    }

    const prop = this.properties[spaceId];
    player.money -= space.housePrice;

    if (prop.houses < 4) {
      prop.houses += 1;
      sound.playBuy();
      this.addLog(`${player.name} membangun Rumah ke-${prop.houses} di ${space.name} seharga Rp ${space.housePrice.toLocaleString('id-ID')}.`, 'success');
    } else if (prop.houses === 4) {
      prop.houses = 0;
      prop.isHotel = true;
      sound.playBuy();
      this.addLog(`${player.name} meng-upgrade ke HOTEL megah di ${space.name}!`, 'highlight');
    }

    this.notify('building_updated', { space, prop });
    return true;
  }

  // Gadai Properti
  mortgageProperty(playerId, spaceId) {
    const prop = this.properties[spaceId];
    const space = BOARD_SPACES[spaceId];
    if (!prop || prop.ownerId !== playerId || prop.isMortgaged) return false;
    if (prop.houses > 0 || prop.isHotel) {
      this.addLog("Harus menjual seluruh rumah/hotel sebelum menggadaikan tanah!", 'warning');
      return false;
    }

    prop.isMortgaged = true;
    this.players[playerId].money += space.mortgage;
    sound.playCash();
    this.addLog(`${this.players[playerId].name} menggadaikan ${space.name} dan menerima Rp ${space.mortgage.toLocaleString('id-ID')}.`, 'warning');
    this.notify('mortgage_updated', { space, prop });
    return true;
  }

  // Tebus Gadai Properti
  unmortgageProperty(playerId, spaceId) {
    const prop = this.properties[spaceId];
    const space = BOARD_SPACES[spaceId];
    if (!prop || prop.ownerId !== playerId || !prop.isMortgaged) return false;

    // Biaya tebus = nilai gadai + 10% bunga
    const cost = Math.round(space.mortgage * 1.1);
    if (this.players[playerId].money < cost) {
      this.addLog(`Uang tidak cukup untuk menebus gadai (butuh Rp ${cost.toLocaleString('id-ID')})`, 'warning');
      return false;
    }

    this.players[playerId].money -= cost;
    prop.isMortgaged = false;
    sound.playCash();
    this.addLog(`${this.players[playerId].name} menebus gadai ${space.name} sebesar Rp ${cost.toLocaleString('id-ID')}.`, 'success');
    this.notify('mortgage_updated', { space, prop });
    return true;
  }

  // Bayar denda keluar penjara (Rp 1.500.000)
  payJailFine(player) {
    if (!player.inJail || player.money < 1500000) return false;
    this.deductMoney(player, 1500000);
    player.inJail = false;
    player.jailTurns = 0;
    sound.playCash();
    this.addLog(`${player.name} membayar denda Rp 1.500.000 dan bebas dari penjara.`, 'success');
    this.notify('jail_status_changed', player);
    return true;
  }

  // Gunakan Kartu Bebas Penjara
  useJailCard(player) {
    if (!player.inJail || player.getOutOfJailFreeCards <= 0) return false;
    player.getOutOfJailFreeCards -= 1;
    player.inJail = false;
    player.jailTurns = 0;
    this.addLog(`${player.name} menggunakan Kartu Bebas Penjara!`, 'success');
    this.notify('jail_status_changed', player);
    return true;
  }

  // Jalankan efek kartu (termasuk kartu pilihan)
  resolveCardAction(choiceId = null) {
    if (!this.currentAction || this.currentAction.type !== 'CARD_DRAWN') return;
    const player = this.getCurrentPlayer();
    const card = this.currentAction.card;

    if (card.choices && Array.isArray(card.choices)) {
      let selectedChoice = null;
      if (choiceId) {
        selectedChoice = card.choices.find(c => c.id === choiceId);
      }
      if (!selectedChoice) {
        if (player.isAI) {
          selectedChoice = card.choices.find(c => c.action === 'pay_money' && player.money >= ((c.amount || 0) + 300000));
        }
        if (!selectedChoice) selectedChoice = card.choices[0];
      }
      this.executeCardEffect(player, selectedChoice, card.title);
    } else {
      this.executeCardEffect(player, card, card.title);
    }
  }

  executeCardEffect(player, effect, cardTitle) {
    const act = effect.action || effect.type || 'none';
    switch (act) {
      case 'move_to':
        this.movePlayerTo(player, effect.target, !!effect.collectGo);
        break;
      case 'move_steps':
        const newPos = (player.position + effect.steps + 40) % 40;
        this.movePlayerTo(player, newPos, false);
        this.addLog(`${player.name} ${effect.steps > 0 ? `maju ${effect.steps}` : `mundur ${Math.abs(effect.steps)}`} langkah.`, 'info');
        break;
      case 'receive_money':
        player.money += effect.amount;
        this.addLog(`${player.name} mendapat Rp ${Number(effect.amount).toLocaleString('id-ID')} (${effect.title || cardTitle}).`, 'success');
        this.finishAction();
        break;
      case 'pay_money':
        this.deductMoney(player, effect.amount);
        this.addLog(`${player.name} membayar Rp ${Number(effect.amount).toLocaleString('id-ID')} (${effect.title || cardTitle}).`, 'warning');
        this.finishAction();
        break;
      case 'pay_and_move':
        const cost = effect.cost || effect.amount || 0;
        const steps = effect.steps || 0;
        this.deductMoney(player, cost);
        const targetPos = (player.position + steps + 40) % 40;
        this.addLog(`${player.name} membayar Rp ${Number(cost).toLocaleString('id-ID')} dan melaju ${steps} petak!`, 'success');
        this.movePlayerTo(player, targetPos, false);
        break;
      case 'gamble':
        const gCost = effect.cost || 0;
        const gReward = effect.reward || 0;
        const isWin = Math.random() < 0.5;
        if (isWin) {
          player.money += (gReward - gCost);
          this.addLog(`🎉 CUAN! ${player.name} memenangkan Rp ${Number(gReward).toLocaleString('id-ID')}!`, 'success');
        } else {
          this.deductMoney(player, gCost);
          this.addLog(`💥 RUG PULL! ${player.name} kehilangan Rp ${Number(gCost).toLocaleString('id-ID')}!`, 'danger');
        }
        this.finishAction();
        break;
      case 'jail_card':
        player.getOutOfJailFreeCards = (player.getOutOfJailFreeCards || 0) + 1;
        this.addLog(`${player.name} menyimpan Kartu Bebas Penjara.`, 'success');
        this.finishAction();
        break;
      case 'go_to_jail':
        this.addLog(`${player.name} dijebloskan ke sel penjara!`, 'danger');
        this.sendToJail(player);
        this.finishAction();
        break;
      case 'repairs':
        const rCost = this.calculateRepairs(player, effect.perHouse || 250000, effect.perHotel || 1000000);
        this.deductMoney(player, rCost);
        this.addLog(`${player.name} membayar biaya renovasi total Rp ${Number(rCost).toLocaleString('id-ID')}.`, 'warning');
        this.finishAction();
        break;
      case 'pay_all_players':
        this.payEachPlayer(player, effect.amount);
        this.addLog(`${player.name} membagikan Rp ${Number(effect.amount).toLocaleString('id-ID')} ke setiap pemain.`, 'info');
        this.finishAction();
        break;
      case 'collect_all_players':
        this.collectFromEachPlayer(player, effect.amount);
        this.addLog(`${player.name} mengumpulkan Rp ${Number(effect.amount).toLocaleString('id-ID')} dari setiap pemain.`, 'success');
        this.finishAction();
        break;
      case 'none':
      default:
        this.addLog(`${player.name} memilih jalur aman (${effect.title || cardTitle}).`, 'info');
        this.finishAction();
        break;
    }
  }

  // Transfer Uang antar pemain
  transferMoney(fromPlayer, toPlayer, amount) {
    if (fromPlayer.money < amount) {
      this.checkBankruptcy(fromPlayer, amount, toPlayer);
    }
    const payAmount = Math.min(fromPlayer.money, amount);
    fromPlayer.money -= payAmount;
    toPlayer.money += payAmount;
  }

  // Kurangi Uang pemain (pajak/denda)
  deductMoney(player, amount) {
    if (player.money < amount) {
      this.checkBankruptcy(player, amount, null);
    }
    player.money = Math.max(0, player.money - amount);
  }

  // Bayar ke setiap pemain lain
  payEachPlayer(fromPlayer, amount) {
    for (const p of this.getActivePlayers()) {
      if (p.id !== fromPlayer.id) {
        this.transferMoney(fromPlayer, p, amount);
      }
    }
  }

  // Ambil uang dari setiap pemain lain
  collectFromEachPlayer(toPlayer, amount) {
    for (const p of this.getActivePlayers()) {
      if (p.id !== toPlayer.id) {
        this.transferMoney(p, toPlayer, amount);
      }
    }
  }

  // Hitung biaya renovasi seluruh rumah & hotel
  calculateRepairs(player, perHouse, perHotel) {
    let total = 0;
    for (const space of BOARD_SPACES) {
      const prop = this.properties[space.id];
      if (prop && prop.ownerId === player.id) {
        if (prop.isHotel) total += perHotel;
        else if (prop.houses) total += prop.houses * perHouse;
      }
    }
    return total;
  }

  // Periksa kebangkrutan
  checkBankruptcy(player, debtAmount, creditor = null) {
    const netWorth = GameRules.calculateNetWorth(player, this.properties);
    if (netWorth < debtAmount) {
      this.declareBankruptcy(player, creditor);
    }
  }

  // Nyatakan Bangkrut
  declareBankruptcy(player, creditor) {
    player.isBankrupt = true;
    sound.playBankrupt();
    this.addLog(`🚨 ${player.name} BANGKRUT dan tersingkir dari permainan!`, 'danger');

    // Sita seluruh aset atau transfer ke kreditur
    for (const space of BOARD_SPACES) {
      const prop = this.properties[space.id];
      if (prop && prop.ownerId === player.id) {
        if (creditor) {
          prop.ownerId = creditor.id;
        } else {
          prop.ownerId = null;
          prop.houses = 0;
          prop.isHotel = false;
          prop.isMortgaged = false;
        }
      }
    }

    this.notify('player_bankrupt', { player, creditor });

    // Cek apakah sisa 1 pemain aktif (pemenang)
    const active = this.getActivePlayers();
    if (active.length === 1) {
      this.declareWinner(active[0]);
    }
  }

  // Nyatakan Pemenang
  declareWinner(winner) {
    this.phase = 'GAME_OVER';
    sound.playWin();
    this.addLog(`🏆 SELAMAT! ${winner.name} memenangkan permainan Monopoli! 🏆`, 'highlight');
    this.notify('game_over', winner);
  }

  // Selesaikan aksi aktif dan tentukan langkah berikutnya
  finishAction() {
    this.currentAction = null;
    const player = this.getCurrentPlayer();

    // Jika dadu kembar dan tidak di penjara, boleh melempar dadu lagi
    if (this.dice[0] === this.dice[1] && !player.inJail && !player.isBankrupt) {
      this.phase = 'READY_TO_ROLL';
      this.notify('phase_changed', this.phase);
    } else {
      this.phase = 'TURN_ENDED';
      this.notify('phase_changed', this.phase);
    }
  }

  // Akhiri giliran dan ganti ke pemain berikutnya
  endTurn() {
    if (this.phase === 'GAME_OVER') return;

    this.consecutiveDoubles = 0;
    const active = this.getActivePlayers();
    if (active.length <= 1) {
      if (active.length === 1) this.declareWinner(active[0]);
      return;
    }

    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    } while (this.players[this.currentPlayerIndex].isBankrupt);

    this.phase = 'READY_TO_ROLL';
    this.currentAction = null;

    const nextPlayer = this.getCurrentPlayer();
    this.addLog(`Giliran ${nextPlayer.name}.`, 'info');
    this.notify('turn_changed', nextPlayer);
  }
}
