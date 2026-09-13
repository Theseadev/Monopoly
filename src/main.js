// Entry Point Utama Game Monopoli Nusantara

import { GameState } from './core/gameState.js';
import { AIPlayer } from './core/aiPlayer.js';
import { sound } from './core/sound.js';
import { BoardRenderer } from './ui/boardRenderer.js';
import { ModalManager } from './ui/modalManager.js';
import { BOARD_SPACES, PROPERTY_GROUPS } from './data/boardData.js';
import { createIcons, Flag, Archive, Receipt, Train, HelpCircle, Lock, Zap, Droplet, Car, ShieldAlert, Gem } from 'lucide';

// Inisialisasi Objek Utama
const gameState = new GameState();
let aiController = null;

const boardElement = document.getElementById('monopolyBoard');
const modalContainer = document.getElementById('modalContainer');
const modalManager = new ModalManager(modalContainer);

const boardRenderer = new BoardRenderer(boardElement, (space, state) => {
  modalManager.showTitleDeed(space, state);
});

// Referensi DOM UI
const btnRollDice = document.getElementById('btnRollDice');
const btnEndTurn = document.getElementById('btnEndTurn');
const btnPayJailFine = document.getElementById('btnPayJailFine');
const btnUseJailCard = document.getElementById('btnUseJailCard');
const jailActions = document.getElementById('jailActions');

const hudPlayerToken = document.getElementById('hudPlayerToken');
const hudPlayerName = document.getElementById('hudPlayerName');
const hudPlayerBalance = document.getElementById('hudPlayerBalance');
const turnBadge = document.getElementById('turnBadge');

const playersListContainer = document.getElementById('playersListContainer');
const gameLogsList = document.getElementById('gameLogsList');
const portfolioList = document.getElementById('portfolioList');
const portfolioPlayerTabs = document.getElementById('portfolioPlayerTabs');
const portfolioStatsBadge = document.getElementById('portfolioStatsBadge');
const tradingPartnersStatus = document.getElementById('tradingPartnersStatus');
const btnOpenTradingDesk = document.getElementById('btnOpenTradingDesk');
let selectedPortfolioPlayerId = null;

const btnSoundToggle = document.getElementById('btnSoundToggle');
const soundIcon = document.getElementById('soundIcon');
const soundLabel = document.getElementById('soundLabel');
const btnGameRules = document.getElementById('btnGameRules');
const rulesModal = document.getElementById('rulesModal');
const btnCloseRules = document.getElementById('btnCloseRules');
const btnConfirmRules = document.getElementById('btnConfirmRules');
const btnNewGame = document.getElementById('btnNewGame');

// Helper Lucide icon refresh
function refreshIcons() {
  createIcons({
    icons: {
      Flag, Archive, Receipt, Train, HelpCircle, Lock, Zap, Droplet, Car, ShieldAlert, Gem
    }
  });
}

// Inisialisasi Permainan
function startNewGameSession(playersConfig) {
  gameState.initGame(playersConfig);
  aiController = new AIPlayer(gameState);

  boardRenderer.renderBoard(gameState);
  refreshIcons();

  updateHUD();
  updatePlayersList();
  updatePortfolio();
  renderLogs();
}

// Sinkronisasi HUD Pemain Aktif
function updateHUD() {
  const current = gameState.getCurrentPlayer();
  if (!current) return;

  hudPlayerToken.textContent = current.token;
  hudPlayerToken.style.borderColor = current.color;
  hudPlayerName.textContent = current.name;
  hudPlayerBalance.textContent = `Rp ${current.money.toLocaleString('id-ID')}`;

  const isHuman = !current.isAI;
  const isReady = gameState.phase === 'READY_TO_ROLL';
  const isEnded = gameState.phase === 'TURN_ENDED';

  if (current.isAI) {
    turnBadge.textContent = 'Giliran Bot (Otomatis)';
    turnBadge.className = 'text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40';
  } else {
    turnBadge.textContent = 'Giliran Anda';
    turnBadge.className = 'text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse';
  }

  // Tombol Lempar Dadu
  if (isHuman && isReady) {
    btnRollDice.disabled = false;
    btnRollDice.className = 'w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 font-black text-sm tracking-wider shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer';
  } else {
    btnRollDice.disabled = true;
    btnRollDice.className = 'w-full py-3 rounded-xl bg-zinc-800 text-zinc-500 font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-not-allowed';
  }

  // Tombol Akhiri Giliran
  if (isHuman && isEnded) {
    btnEndTurn.disabled = false;
    btnEndTurn.className = 'w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition border border-emerald-500/50 shadow-lg cursor-pointer animate-bounce-gentle';
  } else {
    btnEndTurn.disabled = true;
    btnEndTurn.className = 'w-full py-2.5 rounded-xl bg-zinc-800 text-gray-500 font-bold text-xs transition border border-zinc-700 flex items-center justify-center gap-1.5 opacity-50 cursor-not-allowed';
  }

  // Opsi Penjara
  if (isHuman && current.inJail && isReady) {
    jailActions.classList.remove('hidden');
    btnPayJailFine.disabled = current.money < 500000;
    if (current.getOutOfJailFreeCards > 0) {
      btnUseJailCard.classList.remove('hidden');
    } else {
      btnUseJailCard.classList.add('hidden');
    }
  } else {
    jailActions.classList.add('hidden');
  }

  // Prompt di tengah board
  if (gameState.phase === 'ROLLING') {
    boardRenderer.setCenterPrompt(`${current.name} sedang melempar dadu...`);
  } else if (gameState.phase === 'READY_TO_ROLL') {
    boardRenderer.setCenterPrompt(`Giliran ${current.name} melempar dadu.`);
  } else if (gameState.phase === 'ACTION_REQUIRED') {
    boardRenderer.setCenterPrompt(`${current.name} sedang mengambil keputusan.`, 'highlight');
  } else if (gameState.phase === 'TURN_ENDED') {
    boardRenderer.setCenterPrompt(`Giliran ${current.name} selesai.`);
  }
}

// Perbarui List Seluruh Pemain
function updatePlayersList() {
  playersListContainer.innerHTML = '';
  const current = gameState.getCurrentPlayer();

  gameState.players.forEach(p => {
    const isCurrent = current && p.id === current.id;
    const isBankrupt = p.isBankrupt;

    const el = document.createElement('div');
    el.className = `p-2.5 rounded-xl border transition flex items-center justify-between ${isCurrent ? 'bg-amber-950/40 border-amber-500/60 shadow-md' : 'bg-zinc-800/60 border-zinc-700/60'} ${isBankrupt ? 'opacity-40 grayscale' : ''}`;

    el.innerHTML = `
      <div class="flex items-center gap-2.5">
        <span class="text-xl p-1 rounded-lg" style="background-color: ${p.color}33">${p.token}</span>
        <div>
          <div class="font-bold text-xs text-white flex items-center gap-1">
            <span>${p.name}</span>
            ${p.isAI ? '<span class="text-[9px] bg-zinc-700 text-gray-300 px-1 rounded">AI</span>' : ''}
            ${p.inJail ? '<span class="text-[9px] bg-red-900 text-red-300 px-1 rounded">Penjara</span>' : ''}
            ${isBankrupt ? '<span class="text-[9px] bg-red-800 text-white px-1 rounded font-bold">BANGKRUT</span>' : ''}
          </div>
          <div class="text-[11px] font-semibold text-emerald-400">Rp ${p.money.toLocaleString('id-ID')}</div>
        </div>
      </div>
      ${isCurrent && !isBankrupt ? '<span class="text-[10px] text-amber-400 font-extrabold animate-pulse">AKTIF</span>' : ''}
    `;

    playersListContainer.appendChild(el);
  });
}

// Perbarui Riwayat Log Game
function renderLogs() {
  gameLogsList.innerHTML = '';
  gameState.logs.forEach(log => {
    const item = document.createElement('div');
    let colorClass = 'text-gray-300 bg-zinc-800/40 border-zinc-700/40';
    if (log.type === 'success') colorClass = 'text-emerald-300 bg-emerald-950/30 border-emerald-600/40';
    else if (log.type === 'warning') colorClass = 'text-amber-300 bg-amber-950/30 border-amber-600/40';
    else if (log.type === 'danger') colorClass = 'text-red-300 bg-red-950/30 border-red-600/40';
    else if (log.type === 'highlight') colorClass = 'text-yellow-200 bg-yellow-950/40 border-yellow-500/50';

    item.className = `p-2 rounded-lg border text-[11px] leading-snug flex gap-2 ${colorClass}`;
    item.innerHTML = `
      <span class="text-[9px] opacity-60 shrink-0 font-mono mt-0.5">${log.time}</span>
      <span>${log.message}</span>
    `;
    gameLogsList.appendChild(item);
  });
}

// Perbarui Portfolio Aset Properti (Card Grid)
function updatePortfolio() {
  const current = gameState.getCurrentPlayer();
  if (!current) return;

  let viewedPlayer = gameState.players.find(p => p.id === selectedPortfolioPlayerId && !p.isBankrupt);
  if (!viewedPlayer) {
    viewedPlayer = current;
    selectedPortfolioPlayerId = viewedPlayer.id;
  }

  // Render Tabs Pemain
  if (portfolioPlayerTabs) {
    portfolioPlayerTabs.innerHTML = '';
    gameState.players.forEach(p => {
      if (p.isBankrupt) return;
      const pProps = BOARD_SPACES.filter(s => gameState.properties[s.id] && gameState.properties[s.id].ownerId === p.id);
      const isSelected = p.id === viewedPlayer.id;
      
      const tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = `px-2 py-0.5 rounded-lg font-bold text-[10px] transition shrink-0 flex items-center gap-1 cursor-pointer border ${
        isSelected 
          ? 'bg-amber-500 text-zinc-950 border-amber-300 font-black' 
          : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 border-zinc-700'
      }`;
      
      tabBtn.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${p.color}"></span>
        <span>${p.name.split(' ')[0]}</span>
        <span class="px-1 py-0.2 rounded-full ${isSelected ? 'bg-black/20' : 'bg-zinc-900 text-amber-300'} text-[9px]">${pProps.length}</span>
      `;
      
      tabBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedPortfolioPlayerId = p.id;
        updatePortfolio();
      });
      
      portfolioPlayerTabs.appendChild(tabBtn);
    });
  }

  const ownedProps = BOARD_SPACES.filter(s => {
    const prop = gameState.properties[s.id];
    return prop && prop.ownerId === viewedPlayer.id;
  });

  if (portfolioStatsBadge) {
    portfolioStatsBadge.textContent = `${ownedProps.length} Kartu`;
  }

  if (ownedProps.length === 0) {
    portfolioList.innerHTML = `
      <div class="col-span-2 text-gray-500 text-center py-6 text-xs flex flex-col items-center justify-center gap-1">
        <span class="text-2xl">🏷️</span>
        <span>${viewedPlayer.name} belum memiliki properti.</span>
      </div>
    `;
    updateTradingWidget();
    return;
  }

  portfolioList.innerHTML = '';
  ownedProps.forEach(space => {
    const prop = gameState.properties[space.id];
    const item = document.createElement('div');
    item.className = `mini-deed-card ${prop.isMortgaged ? 'is-mortgaged' : ''}`;

    const headerColor = space.color || (space.type === 'railroad' ? '#1e293b' : (space.type === 'utility' ? '#0f766e' : '#475569'));
    const topTag = space.type === 'railroad' ? '🚂 STASIUN' : (space.type === 'utility' ? '⚡ UTILITAS' : (space.city || 'TANAH'));

    let statusText = 'Tanah';
    if (prop.isMortgaged) statusText = '🔒 Tergadai';
    else if (prop.isHotel) statusText = '🏨 Hotel';
    else if (prop.houses > 0) statusText = `🏠 ${prop.houses} Rumah`;

    item.innerHTML = `
      <div class="mini-deed-color-bar" style="background-color: ${headerColor};">
        <span>${topTag}</span>
        <span>Rp ${(space.price / 1000).toLocaleString('id-ID')}rb</span>
      </div>
      <div class="mini-deed-body">
        <div>
          <div class="font-bold text-white text-[11px] truncate mt-0.5">${space.name}</div>
          <div class="text-[9px] text-emerald-400 font-semibold mt-0.5">${statusText}</div>
        </div>
        <div class="pt-1 border-t border-zinc-800 flex items-center justify-between text-[9px] text-amber-300">
          <span>Lihat Kartu</span>
          <span>›</span>
        </div>
      </div>
    `;

    item.addEventListener('click', () => {
      modalManager.showTitleDeed(space, gameState);
    });

    portfolioList.appendChild(item);
  });

  updateTradingWidget();
}

function updateTradingWidget() {
  if (!tradingPartnersStatus) return;
  const current = gameState.getCurrentPlayer();
  if (!current) return;
  const opponents = gameState.players.filter(p => !p.isBankrupt && p.id !== current.id);
  tradingPartnersStatus.innerHTML = opponents.map(op => `
    <span class="px-1.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-gray-300 flex items-center gap-1 font-semibold text-[9px]">
      <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${op.color}"></span>
      <span>${op.name.split(' ')[0]}</span>
    </span>
  `).join('');
}

// Langganan Event Game State
gameState.subscribe((eventType, data) => {
  if (eventType === 'game_started') {
    updateHUD();
    updatePlayersList();
    updatePortfolio();
  } else if (eventType === 'turn_changed') {
    updateHUD();
    updatePlayersList();
    updatePortfolio();
  } else if (eventType === 'phase_changed') {
    updateHUD();
  } else if (eventType === 'player_moved') {
    boardRenderer.updateTokens(gameState);
    updatePlayersList();
  } else if (eventType === 'dice_rolled') {
    boardRenderer.updateDiceDisplay(data.dice[0], data.dice[1]);
  } else if (eventType === 'property_bought' || eventType === 'building_updated' || eventType === 'mortgage_updated') {
    boardRenderer.updateProperties(gameState);
    updateHUD();
    updatePlayersList();
    updatePortfolio();
  } else if (eventType === 'action_required') {
    updateHUD();
    const current = gameState.getCurrentPlayer();
    if (!current.isAI) {
      if (data.type === 'BUY_PROPOSAL') {
        modalManager.showBuyProposal(
          data,
          current,
          () => gameState.buyProperty(current.id, data.space.id),
          () => gameState.passBuyProperty()
        );
      } else if (data.type === 'CARD_DRAWN') {
        modalManager.showCardDrawn(
          data,
          current,
          (choiceId) => gameState.resolveCardAction(choiceId)
        );
      }
    }
  } else if (eventType === 'log_added') {
    renderLogs();
  } else if (eventType === 'jail_status_changed') {
    updateHUD();
    updatePlayersList();
  } else if (eventType === 'player_bankrupt') {
    boardRenderer.updateTokens(gameState);
    boardRenderer.updateProperties(gameState);
    updatePlayersList();
    updatePortfolio();
  } else if (eventType === 'game_over') {
    modalManager.showGameOver(data, () => {
      modalManager.showSetupModal(startNewGameSession);
    });
  }
});

// Event Listener Tombol HUD
btnRollDice?.addEventListener('click', () => {
  gameState.rollDice();
});

// Klik dadu di tengah board untuk melempar
boardElement?.addEventListener('click', (e) => {
  const target = e.target.closest('#die1, #die2, #diceCenterContainer');
  if (target && !btnRollDice?.disabled) {
    gameState.rollDice();
  }
});

// Shortcut Keyboard (Spasi untuk Kocok Dadu / Akhiri Giliran)
window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  if (e.code === 'Space') {
    e.preventDefault();
    if (!btnRollDice?.disabled && gameState.phase === 'READY_TO_ROLL') {
      gameState.rollDice();
    } else if (!btnEndTurn?.disabled && gameState.phase === 'TURN_ENDED') {
      gameState.endTurn();
    }
  }
});

btnEndTurn?.addEventListener('click', () => {
  gameState.endTurn();
});

btnPayJailFine?.addEventListener('click', () => {
  const current = gameState.getCurrentPlayer();
  if (current) gameState.payJailFine(current);
});

btnUseJailCard?.addEventListener('click', () => {
  const current = gameState.getCurrentPlayer();
  if (current) gameState.useJailCard(current);
});

// Sound Toggle
btnSoundToggle?.addEventListener('click', () => {
  const isEnabled = sound.toggle();
  soundIcon.textContent = isEnabled ? '🔊' : '🔇';
  soundLabel.textContent = isEnabled ? 'Suara On' : 'Mute';
});

// Rules Modal
btnGameRules?.addEventListener('click', () => {
  rulesModal?.classList.remove('hidden');
});

btnCloseRules?.addEventListener('click', () => {
  rulesModal?.classList.add('hidden');
});

btnConfirmRules?.addEventListener('click', () => {
  rulesModal?.classList.add('hidden');
});

// Tombol Game Baru
btnNewGame?.addEventListener('click', () => {
  modalManager.showSetupModal(startNewGameSession);
});

// Tampilkan Setup Modal Saat Halaman Dibuka Pertama Kali
window.addEventListener('DOMContentLoaded', () => {
  modalManager.showSetupModal(startNewGameSession);
});
