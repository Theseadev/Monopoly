// Renderer Papan Monopoli 11x11 Grid Interaktif

import { BOARD_SPACES } from '../data/boardData.js';

export class BoardRenderer {
  constructor(boardElement, onTileClick) {
    this.boardElement = boardElement;
    this.onTileClick = onTileClick;
    this.spaceElements = {};
  }

  // Menentukan posisi grid (row & col) berdasarkan index petak (0-39)
  getGridPosition(id) {
    if (id === 0) return { row: 11, col: 11, side: 'bottom-corner' };
    if (id >= 1 && id <= 9) return { row: 11, col: 11 - id, side: 'bottom' };
    if (id === 10) return { row: 11, col: 1, side: 'left-corner' };
    if (id >= 11 && id <= 19) return { row: 11 - (id - 10), col: 1, side: 'left' };
    if (id === 20) return { row: 1, col: 1, side: 'top-corner' };
    if (id >= 21 && id <= 29) return { row: 1, col: id - 19, side: 'top' };
    if (id === 30) return { row: 1, col: 11, side: 'right-corner' };
    if (id >= 31 && id <= 39) return { row: id - 29, col: 11, side: 'right' };
    return { row: 1, col: 1, side: 'unknown' };
  }

  formatShortPrice(num) {
    if (!num) return '';
    if (num >= 1000000) {
      const jt = num / 1000000;
      return `${jt % 1 === 0 ? jt : jt.toFixed(1)} jt`;
    }
    return `${Math.round(num / 1000)} rb`;
  }

  renderBoard(gameState) {
    this.boardElement.innerHTML = '';
    this.spaceElements = {};

    // 1. Render seluruh 40 petak
    for (const space of BOARD_SPACES) {
      const pos = this.getGridPosition(space.id);
      const cell = document.createElement('div');
      cell.className = `board-tile tile-${pos.side} group cursor-pointer relative flex flex-col justify-between p-1 select-none transition-all hover:brightness-110`;
      cell.style.gridRow = pos.row;
      cell.style.gridColumn = pos.col;
      cell.dataset.spaceId = space.id;

      // Header warna properti
      let colorBarHtml = '';
      if (space.type === 'property') {
        colorBarHtml = `<div class="color-bar color-bar-${pos.side}" style="background-color: ${space.color}"></div>`;
      }

      // Owner tag & House indicator container
      const indicatorsHtml = `<div class="indicators-container absolute flex gap-0.5 z-10"></div>`;

      // Icon & Info
      let iconHtml = '';
      if (space.icon) {
        iconHtml = `<i data-lucide="${space.icon}" class="tile-icon w-4 h-4 opacity-80"></i>`;
      }

      // Konten text
      const priceText = space.price ? `Rp ${this.formatShortPrice(space.price)}` : (space.amount ? `Rp ${this.formatShortPrice(space.amount)}` : '');
      const nameText = `<span class="tile-name font-bold leading-tight line-clamp-2">${space.name}</span>`;
      const priceHtml = priceText ? `<span class="tile-price text-[9px] font-semibold text-amber-300 opacity-90">${priceText}</span>` : '';

      cell.innerHTML = `
        ${colorBarHtml}
        ${indicatorsHtml}
        <div class="tile-content flex-1 flex flex-col items-center justify-center text-center p-0.5 z-0">
          ${iconHtml}
          ${nameText}
          ${priceHtml}
        </div>
        <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-1 z-20 flex-wrap p-1"></div>
      `;

      cell.addEventListener('click', () => {
        if (this.onTileClick) this.onTileClick(space, gameState);
      });

      this.boardElement.appendChild(cell);
      this.spaceElements[space.id] = cell;
    }

    // 2. Render Bagian Tengah Papan (Center Board Area)
    const centerArea = document.createElement('div');
    centerArea.className = 'board-center flex flex-col items-center justify-between p-4 relative z-0';
    centerArea.style.gridRow = '2 / 11';
    centerArea.style.gridColumn = '2 / 11';
    centerArea.id = 'boardCenterArea';

    centerArea.innerHTML = `
      <!-- Header / Logo Monopoli -->
      <div class="center-header flex flex-col items-center mt-2">
        <div class="flex items-center gap-2">
          <span class="text-3xl">🏛️</span>
          <h1 class="text-3xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 uppercase drop-shadow">
            MONOPOLI
          </h1>
          <span class="text-3xl">🇮🇩</span>
        </div>
        <div class="text-[11px] uppercase tracking-widest font-semibold text-emerald-400 mt-0.5">
          Edisi Eksklusif Nusantara
        </div>
      </div>

      <!-- Area Tumpukan Kartu & Dadu -->
      <div class="flex flex-col items-center gap-4 my-auto w-full max-w-md">
        <!-- Decks Deck visual -->
        <div class="flex justify-center gap-6 w-full px-4">
          <div class="deck-card flex flex-col items-center justify-center p-3 rounded-xl border-2 border-orange-500/40 bg-orange-950/30 text-orange-300 w-36 h-24 shadow-lg text-center backdrop-blur-sm">
            <span class="text-xl">❓</span>
            <span class="text-xs font-bold uppercase mt-1">Kesempatan</span>
          </div>
          <div class="deck-card flex flex-col items-center justify-center p-3 rounded-xl border-2 border-blue-500/40 bg-blue-950/30 text-blue-300 w-36 h-24 shadow-lg text-center backdrop-blur-sm">
            <span class="text-xl">📦</span>
            <span class="text-xs font-bold uppercase mt-1">Dana Umum</span>
          </div>
        </div>

        <!-- Dadu Container -->
        <div id="diceCenterContainer" class="flex items-center justify-center gap-4 py-2">
          <div id="die1" class="dice-box">⚀</div>
          <div id="die2" class="dice-box">⚀</div>
        </div>

        <!-- Dynamic Status Prompt -->
        <div id="centerPrompt" class="text-center px-4 py-2 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 text-sm font-medium w-full max-w-xs shadow">
          Giliran Pemain 1
        </div>
      </div>

      <!-- Footer Info -->
      <div class="text-center text-[10px] text-emerald-400/60 pb-1">
        Klik petak mana pun untuk melihat Sertifikat Kepemilikan & Biaya Sewa
      </div>
    `;

    this.boardElement.appendChild(centerArea);

    // Perbarui pion dan kepemilikan
    this.updateTokens(gameState);
    this.updateProperties(gameState);
  }

  // Perbarui posisi token pemain
  updateTokens(gameState) {
    // Kosongkan wadah token di setiap petak
    for (const spaceId in this.spaceElements) {
      const container = this.spaceElements[spaceId].querySelector('.tokens-container');
      if (container) container.innerHTML = '';
    }

    // Tempatkan token pemain yang aktif
    gameState.players.forEach(player => {
      if (player.isBankrupt) return;

      const spaceCell = this.spaceElements[player.position];
      if (!spaceCell) return;

      const container = spaceCell.querySelector('.tokens-container');
      if (!container) return;

      const tokenEl = document.createElement('div');
      tokenEl.className = 'player-token-badge animate-bounce-gentle';
      tokenEl.style.borderColor = player.color;
      tokenEl.style.backgroundColor = `${player.color}33`;
      tokenEl.title = `${player.name} (${player.token})`;
      tokenEl.innerHTML = `<span class="text-base md:text-lg">${player.token}</span>`;

      container.appendChild(tokenEl);
    });
  }

  // Perbarui indikator pemilik dan bangunan (rumah/hotel)
  updateProperties(gameState) {
    for (const space of BOARD_SPACES) {
      if (!['property', 'railroad', 'utility'].includes(space.type)) continue;

      const cell = this.spaceElements[space.id];
      if (!cell) continue;

      const indicators = cell.querySelector('.indicators-container');
      if (!indicators) continue;

      const prop = gameState.properties[space.id];
      indicators.innerHTML = '';

      if (prop && prop.ownerId !== null) {
        const owner = gameState.players[prop.ownerId];

        // Owner Chip
        const ownerDot = document.createElement('div');
        ownerDot.className = 'w-2.5 h-2.5 rounded-full border border-white shadow-sm';
        ownerDot.style.backgroundColor = owner.color;
        ownerDot.title = `Dimiliki oleh ${owner.name}`;
        indicators.appendChild(ownerDot);

        // Houses or Hotel
        if (prop.isHotel) {
          const hotelBadge = document.createElement('div');
          hotelBadge.className = 'bg-red-600 text-white text-[9px] font-extrabold px-1 rounded shadow flex items-center gap-0.5';
          hotelBadge.innerHTML = '🏨 H';
          hotelBadge.title = 'Hotel';
          indicators.appendChild(hotelBadge);
        } else if (prop.houses > 0) {
          const houseBadge = document.createElement('div');
          houseBadge.className = 'bg-emerald-600 text-white text-[9px] font-bold px-1 rounded shadow flex items-center';
          houseBadge.innerHTML = `🏠 ${prop.houses}`;
          houseBadge.title = `${prop.houses} Rumah`;
          indicators.appendChild(houseBadge);
        }

        if (prop.isMortgaged) {
          const mortBadge = document.createElement('div');
          mortBadge.className = 'bg-gray-800 text-amber-300 text-[8px] font-bold px-1 rounded';
          mortBadge.innerHTML = 'Gadai';
          indicators.appendChild(mortBadge);
        }
      }
    }
  }

  // Update prompt teks di tengah papan
  setCenterPrompt(text, type = 'info') {
    const prompt = document.getElementById('centerPrompt');
    if (prompt) {
      prompt.textContent = text;
      if (type === 'danger') {
        prompt.className = 'text-center px-4 py-2 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-sm font-semibold w-full max-w-xs shadow animate-pulse';
      } else if (type === 'highlight') {
        prompt.className = 'text-center px-4 py-2 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-200 text-sm font-semibold w-full max-w-xs shadow';
      } else {
        prompt.className = 'text-center px-4 py-2 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 text-sm font-medium w-full max-w-xs shadow';
      }
    }
  }

  // Update visual dadu
  updateDiceDisplay(d1, d2) {
    const die1 = document.getElementById('die1');
    const die2 = document.getElementById('die2');
    const unicodeDice = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    if (die1 && die2) {
      die1.classList.add('dice-rolling');
      die2.classList.add('dice-rolling');

      setTimeout(() => {
        die1.textContent = unicodeDice[d1] || '⚀';
        die2.textContent = unicodeDice[d2] || '⚀';
        die1.classList.remove('dice-rolling');
        die2.classList.remove('dice-rolling');
      }, 350);
    }
  }
}
