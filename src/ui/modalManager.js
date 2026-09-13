// Modal Manager untuk Menampilkan Dialog Interaktif Permainan

import confetti from 'canvas-confetti';
import { GameRules } from '../core/gameRules.js';

export class ModalManager {
  constructor(containerElement) {
    this.container = containerElement;
  }

  // Menutup modal aktif
  close() {
    this.container.innerHTML = '';
    this.container.classList.add('hidden');
  }

  // 1. Modal Sertifikat Tanah (Title Deed)
  showTitleDeed(space, gameState) {
    const prop = gameState.properties[space.id];
    const owner = prop?.ownerId !== null && prop?.ownerId !== undefined ? gameState.players[prop.ownerId] : null;
    const activePlayer = gameState.getCurrentPlayer();
    const isMyTurnAndProperty = owner && activePlayer && owner.id === activePlayer.id && !activePlayer.isAI && gameState.phase !== 'GAME_OVER';

    let canBuild = false;
    let buildReason = '';
    if (isMyTurnAndProperty && space.type === 'property') {
      const check = GameRules.canBuildHouse(space, activePlayer, gameState.properties);
      canBuild = check.canBuild;
      buildReason = check.reason || '';
    }

    const rentRows = space.type === 'property' ? `
      <div class="space-y-1 text-xs text-gray-700 dark:text-gray-200 mt-3 border-t border-b border-gray-200 dark:border-gray-700 py-2">
        <div class="flex justify-between"><span>Sewa Dasar:</span><span class="font-bold">Rp ${space.rent[0].toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between"><span>Dengan 1 Rumah:</span><span>Rp ${space.rent[1].toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between"><span>Dengan 2 Rumah:</span><span>Rp ${space.rent[2].toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between"><span>Dengan 3 Rumah:</span><span>Rp ${space.rent[3].toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between"><span>Dengan 4 Rumah:</span><span>Rp ${space.rent[4].toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between font-bold text-red-600 dark:text-red-400"><span>Dengan HOTEL:</span><span>Rp ${space.rent[5].toLocaleString('id-ID')}</span></div>
      </div>
      <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-2 space-y-0.5">
        <div>Biaya Bangun Rumah: <span class="font-semibold text-gray-700 dark:text-gray-200">Rp ${space.housePrice?.toLocaleString('id-ID')}</span></div>
        <div>Biaya Bangun Hotel: <span class="font-semibold text-gray-700 dark:text-gray-200">Rp ${space.housePrice?.toLocaleString('id-ID')}</span> (+ 4 rumah)</div>
        <div>Nilai Gadai (Hipotek): <span class="font-semibold text-gray-700 dark:text-gray-200">Rp ${space.mortgage?.toLocaleString('id-ID')}</span></div>
      </div>
    ` : (space.type === 'railroad' ? `
      <div class="space-y-1 text-xs text-gray-700 dark:text-gray-200 mt-3 border-t border-b border-gray-200 dark:border-gray-700 py-2">
        <div class="flex justify-between"><span>Sewa 1 Stasiun:</span><span>Rp 250.000</span></div>
        <div class="flex justify-between"><span>Sewa 2 Stasiun:</span><span>Rp 500.000</span></div>
        <div class="flex justify-between"><span>Sewa 3 Stasiun:</span><span>Rp 1.000.000</span></div>
        <div class="flex justify-between font-bold text-amber-500"><span>Sewa 4 Stasiun:</span><span>Rp 2.000.000</span></div>
      </div>
      <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
        Nilai Gadai: <span class="font-semibold text-gray-700 dark:text-gray-200">Rp ${space.mortgage?.toLocaleString('id-ID')}</span>
      </div>
    ` : `
      <div class="text-xs text-gray-700 dark:text-gray-200 mt-3 border-t border-b border-gray-200 dark:border-gray-700 py-2">
        <div>Jika memiliki 1 Utilitas: <b>4x</b> angka dadu yang dilempar</div>
        <div>Jika memiliki 2 Utilitas: <b>10x</b> angka dadu yang dilempar</div>
      </div>
      <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-2">
        Nilai Gadai: <span class="font-semibold text-gray-700 dark:text-gray-200">Rp ${space.mortgage?.toLocaleString('id-ID')}</span>
      </div>
    `);

    this.container.innerHTML = `
      <div class="fixed inset-0 bg-black/35 flex items-center justify-center p-4 z-50">
        <div class="bg-white dark:bg-zinc-900 border-2 border-amber-500/50 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden animate-scale-up">
          <!-- Card Header -->
          <div class="p-4 text-center text-white" style="background-color: ${space.color || '#475569'}">
            <div class="text-[10px] tracking-widest uppercase font-bold opacity-80">SERTIFIKAT KEPEMILIKAN TANAH</div>
            <div class="text-xl font-black mt-1">${space.name}</div>
            ${space.city ? `<div class="text-xs opacity-90">${space.city}</div>` : ''}
          </div>

          <!-- Body -->
          <div class="p-4">
            <div class="flex items-center justify-between text-xs pb-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-500 dark:text-gray-400">Status Kepemilikan:</span>
              ${owner ? `
                <span class="font-bold flex items-center gap-1" style="color: ${owner.color}">
                  <span>${owner.token}</span> ${owner.name}
                </span>
              ` : `<span class="font-semibold text-emerald-500">Tersedia (Bisa Dibeli)</span>`}
            </div>

            ${prop?.houses > 0 ? `<div class="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Terdapat: ${prop.houses} Rumah</div>` : ''}
            ${prop?.isHotel ? `<div class="mt-2 text-xs text-red-600 dark:text-red-400 font-semibold">Terdapat: 1 Hotel Megah</div>` : ''}
            ${prop?.isMortgaged ? `<div class="mt-2 text-xs text-amber-600 font-semibold">⚠️ Sedang Digadaikan ke Bank</div>` : ''}

            ${rentRows}

            <!-- Tombol Aksi Tambahan untuk Pemilik -->
            ${isMyTurnAndProperty ? `
              <div class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
                ${space.type === 'property' && !prop.isHotel ? `
                  <button id="btnBuildDeed" class="w-full py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${canBuild ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg' : 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed'}" ${!canBuild ? 'disabled' : ''}>
                    <span>🏠</span> Bangun ${prop.houses === 4 ? 'Hotel' : 'Rumah'} (Rp ${space.housePrice?.toLocaleString('id-ID')})
                  </button>
                  ${!canBuild ? `<p class="text-[10px] text-amber-500 text-center">${buildReason}</p>` : ''}
                ` : ''}

                ${!prop.isMortgaged ? `
                  <button id="btnMortgageDeed" class="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 transition">
                    Gadaikan (+Rp ${space.mortgage?.toLocaleString('id-ID')})
                  </button>
                ` : `
                  <button id="btnUnmortgageDeed" class="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition">
                    Tebus Gadai (Rp ${Math.round(space.mortgage * 1.1).toLocaleString('id-ID')})
                  </button>
                `}
              </div>
            ` : ''}

            <button id="btnCloseDeed" class="mt-4 w-full py-2 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition">
              Tutup
            </button>
          </div>
        </div>
      </div>
    `;

    this.container.classList.remove('hidden');

    document.getElementById('btnCloseDeed')?.addEventListener('click', () => this.close());
    document.getElementById('btnBuildDeed')?.addEventListener('click', () => {
      gameState.buildHouse(activePlayer.id, space.id);
      this.close();
    });
    document.getElementById('btnMortgageDeed')?.addEventListener('click', () => {
      gameState.mortgageProperty(activePlayer.id, space.id);
      this.close();
    });
    document.getElementById('btnUnmortgageDeed')?.addEventListener('click', () => {
      gameState.unmortgageProperty(activePlayer.id, space.id);
      this.close();
    });
  }

  // 2. Modal Tawaran Pembelian Properti
  showBuyProposal(action, player, onBuy, onPass) {
    const space = action.space;
    const canAfford = player.money >= action.price;

    this.container.innerHTML = `
      <div class="fixed inset-0 bg-black/35 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div class="bg-zinc-900 border-2 border-emerald-500/50 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden p-5 text-center">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl shadow-inner" style="background-color: ${space.color ? space.color + '33' : '#05966933'}">
            ${space.icon === 'train' ? '🚂' : (space.icon === 'zap' ? '⚡' : (space.icon === 'droplet' ? '💧' : '🏡'))}
          </div>

          <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-400">Peluang Investasi Properti</h3>
          <h2 class="text-2xl font-black text-white mt-1">${space.name}</h2>
          ${space.city ? `<p class="text-xs text-gray-400">${space.city}</p>` : ''}

          <div class="bg-zinc-800/80 rounded-xl p-3 my-4 border border-zinc-700/60">
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-400">Harga Beli:</span>
              <span class="text-amber-400 font-extrabold text-base">Rp ${action.price.toLocaleString('id-ID')}</span>
            </div>
            <div class="flex justify-between items-center text-xs mt-1 text-gray-400">
              <span>Saldo Kas Anda:</span>
              <span class="font-semibold text-gray-200">Rp ${player.money.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <button id="btnPassBuy" class="flex-1 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-sm font-semibold transition">
              Lewati
            </button>
            <button id="btnConfirmBuy" class="flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-1.5 ${canAfford ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-zinc-700 text-gray-500 cursor-not-allowed'}" ${!canAfford ? 'disabled' : ''}>
              <span>💰</span> Beli Properti
            </button>
          </div>
        </div>
      </div>
    `;

    this.container.classList.remove('hidden');

    document.getElementById('btnConfirmBuy')?.addEventListener('click', () => {
      this.close();
      onBuy();
    });

    document.getElementById('btnPassBuy')?.addEventListener('click', () => {
      this.close();
      onPass();
    });
  }

  // 3. Modal Kartu Kesempatan / Dana Umum
  showCardDrawn(action, player, onContinue) {
    const isChance = action.cardType === 'Kesempatan' || action.cardType === 'Chance';
    const card = action.card;
    const hasChoices = card.choices && Array.isArray(card.choices) && card.choices.length > 0;

    this.container.innerHTML = `
      <div id="modalBackdropCard" class="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 z-50 animate-fade-in select-none">
        <div class="relative bg-gradient-to-b ${isChance ? 'from-amber-900/95 to-zinc-950 border-amber-500' : 'from-blue-900/95 to-zinc-950 border-blue-500'} border-2 rounded-2xl max-w-sm w-full shadow-2xl p-6 text-center animate-scale-up" onclick="event.stopPropagation();">
          
          <button id="btnModalCloseTop" type="button" class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 border-2 border-amber-400 text-amber-300 hover:bg-rose-600 hover:text-white flex items-center justify-center shadow-xl transition cursor-pointer text-sm font-black">
            ✕
          </button>

          <div class="text-4xl mb-2">${isChance ? '❓' : '📦'}</div>
          <div class="text-xs uppercase tracking-widest font-extrabold ${isChance ? 'text-amber-400' : 'text-blue-400'}">
            KARTU ${(action.cardType || '').toUpperCase()}
          </div>

          <h3 class="text-xl font-black text-white mt-3">${card.title}</h3>
          <p class="text-sm text-gray-300 mt-2 px-2 leading-relaxed">${card.description}</p>

          ${hasChoices ? `
            <div class="mt-4 space-y-2 text-left">
              ${card.choices.map(c => `
                <button type="button" data-choice-id="${c.id}" class="card-choice-btn w-full p-2.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700/90 text-white flex items-center justify-between gap-2 shadow-sm transition transform active:scale-95 cursor-pointer">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">${c.icon || '👉'}</span>
                    <div>
                      <div class="text-xs font-bold">${c.title}</div>
                      <div class="text-[10px] text-gray-400">${c.desc || ''}</div>
                    </div>
                  </div>
                  ${c.badge ? `<span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black">${c.badge}</span>` : ''}
                </button>
              `).join('')}
            </div>
          ` : `
            <div class="mt-4 pt-3 border-t border-white/10 text-xs text-gray-400">
              Ditarik oleh: <span class="font-bold text-white">${player.name}</span>
            </div>

            <button id="btnCardContinue" class="mt-6 w-full py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition cursor-pointer ${isChance ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'}">
              OK
            </button>
          `}
        </div>
      </div>
    `;

    this.container.classList.remove('hidden');

    const backdrop = document.getElementById('modalBackdropCard');
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.close();
        onContinue();
      }
    });

    document.getElementById('btnModalCloseTop')?.addEventListener('click', () => {
      this.close();
      onContinue();
    });

    if (hasChoices) {
      this.container.querySelectorAll('.card-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const choiceId = btn.getAttribute('data-choice-id');
          this.close();
          onContinue(choiceId);
        });
      });
    } else {
      document.getElementById('btnCardContinue')?.addEventListener('click', () => {
        this.close();
        onContinue();
      });
    }
  }

  // 4. Modal Setup Permainan Awal
  showSetupModal(onStartGame) {
    this.container.innerHTML = `
      <div class="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div class="bg-zinc-900 border-2 border-emerald-500/50 rounded-3xl max-w-md w-full shadow-2xl p-6 text-white my-8">
          <!-- Logo & Header -->
          <div class="text-center mb-5">
            <div class="text-4xl mb-1">🏛️</div>
            <h1 class="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
              MONOPOLI
            </h1>
            <p class="text-xs text-emerald-400 font-semibold uppercase tracking-wider mt-1">Edisi Nusantara Indonesia</p>
          </div>

          <!-- Konfigurasi Pemain -->
          <div class="space-y-3" id="playersSetupContainer">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Pengaturan Pemain (2 - 4 Pemain)</label>
            
            <!-- Pemain 1 (Anda) -->
            <div class="p-3 bg-zinc-800/80 rounded-2xl border border-zinc-700 flex items-center gap-3">
              <span class="text-2xl player-token-preview">🚗</span>
              <div class="flex-1">
                <input type="text" id="p1Name" value="Pemain 1" class="w-full bg-transparent font-bold text-sm outline-none border-b border-zinc-600 pb-1 text-white focus:border-emerald-400" />
                <span class="text-[10px] text-emerald-400 font-semibold">Manusia (Anda)</span>
              </div>
            </div>

            <!-- Pemain 2 -->
            <div class="p-3 bg-zinc-800/80 rounded-2xl border border-zinc-700 flex items-center gap-3">
              <span class="text-2xl player-token-preview">🎩</span>
              <div class="flex-1">
                <input type="text" id="p2Name" value="Bot Budi" class="w-full bg-transparent font-bold text-sm outline-none border-b border-zinc-600 pb-1 text-white focus:border-emerald-400" />
                <div class="flex items-center gap-3 mt-1">
                  <label class="text-[11px] text-gray-400 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p2Type" value="human" class="accent-emerald-500"> Manusia
                  </label>
                  <label class="text-[11px] text-emerald-400 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p2Type" value="ai" checked class="accent-emerald-500"> Bot AI Pintar
                  </label>
                </div>
              </div>
            </div>

            <!-- Pemain 3 -->
            <div class="p-3 bg-zinc-800/80 rounded-2xl border border-zinc-700 flex items-center gap-3">
              <span class="text-2xl player-token-preview">🚀</span>
              <div class="flex-1">
                <input type="text" id="p3Name" value="Bot Siti" class="w-full bg-transparent font-bold text-sm outline-none border-b border-zinc-600 pb-1 text-white focus:border-emerald-400" />
                <div class="flex items-center gap-3 mt-1">
                  <label class="text-[11px] text-gray-400 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p3Type" value="human" class="accent-emerald-500"> Manusia
                  </label>
                  <label class="text-[11px] text-emerald-400 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p3Type" value="ai" checked class="accent-emerald-500"> Bot AI
                  </label>
                  <label class="text-[11px] text-gray-500 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p3Type" value="off" class="accent-emerald-500"> Nonaktif
                  </label>
                </div>
              </div>
            </div>

            <!-- Pemain 4 -->
            <div class="p-3 bg-zinc-800/80 rounded-2xl border border-zinc-700 flex items-center gap-3">
              <span class="text-2xl player-token-preview">🚢</span>
              <div class="flex-1">
                <input type="text" id="p4Name" value="Bot Joko" class="w-full bg-transparent font-bold text-sm outline-none border-b border-zinc-600 pb-1 text-white focus:border-emerald-400" />
                <div class="flex items-center gap-3 mt-1">
                  <label class="text-[11px] text-gray-400 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p4Type" value="human" class="accent-emerald-500"> Manusia
                  </label>
                  <label class="text-[11px] text-emerald-400 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p4Type" value="ai" checked class="accent-emerald-500"> Bot AI
                  </label>
                  <label class="text-[11px] text-gray-500 flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="p4Type" value="off" class="accent-emerald-500"> Nonaktif
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Info Saldo Awal -->
          <div class="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
            <span>Modal Awal Tiap Pemain:</span>
            <span class="font-extrabold text-amber-400 text-sm">Rp 15.000.000</span>
          </div>

          <button id="btnStartGameNow" class="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 font-extrabold text-base tracking-wider uppercase shadow-xl transition transform active:scale-95">
            Mulai Permainan 🎲
          </button>
        </div>
      </div>
    `;

    this.container.classList.remove('hidden');

    document.getElementById('btnStartGameNow')?.addEventListener('click', () => {
      const p1Name = document.getElementById('p1Name')?.value || 'Pemain 1';
      const p2Name = document.getElementById('p2Name')?.value || 'Bot Budi';
      const p3Name = document.getElementById('p3Name')?.value || 'Bot Siti';
      const p4Name = document.getElementById('p4Name')?.value || 'Bot Joko';

      const p2Type = document.querySelector('input[name="p2Type"]:checked')?.value || 'ai';
      const p3Type = document.querySelector('input[name="p3Type"]:checked')?.value || 'ai';
      const p4Type = document.querySelector('input[name="p4Type"]:checked')?.value || 'ai';

      const players = [
        { name: p1Name, isAI: false, token: '🚗', color: '#3b82f6' },
        { name: p2Name, isAI: p2Type === 'ai', token: '🎩', color: '#ef4444' }
      ];

      if (p3Type !== 'off') {
        players.push({ name: p3Name, isAI: p3Type === 'ai', token: '🚀', color: '#10b981' });
      }
      if (p4Type !== 'off') {
        players.push({ name: p4Name, isAI: p4Type === 'ai', token: '🚢', color: '#f59e0b' });
      }

      this.close();
      onStartGame(players);
    });
  }

  // 5. Modal Game Over / Kemenangan
  showGameOver(winner, onRestart) {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });

    this.container.innerHTML = `
      <div class="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
        <div class="bg-gradient-to-b from-amber-950/80 to-zinc-900 border-2 border-amber-500 rounded-3xl max-w-sm w-full shadow-2xl p-6 text-center animate-scale-up">
          <div class="text-6xl mb-2">🏆</div>
          <h2 class="text-xs uppercase font-extrabold tracking-widest text-amber-400">PEMENANG MONOPOLI</h2>
          <h1 class="text-3xl font-black text-white mt-1">${winner.name}</h1>
          <p class="text-sm text-gray-300 mt-2">Seluruh lawan telah bangkrut! Anda menjadi konglomerat terkaya se-Indonesia.</p>

          <div class="bg-zinc-800/80 rounded-xl p-3 my-4 border border-zinc-700">
            <span class="text-xs text-gray-400">Saldo Kas Akhir:</span>
            <div class="text-xl font-black text-emerald-400 mt-0.5">Rp ${winner.money.toLocaleString('id-ID')}</div>
          </div>

          <button id="btnPlayAgain" class="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 font-black rounded-xl text-sm shadow-xl transition transform active:scale-95">
            Main Lagi 🔄
          </button>
        </div>
      </div>
    `;

    this.container.classList.remove('hidden');

    document.getElementById('btnPlayAgain')?.addEventListener('click', () => {
      this.close();
      onRestart();
    });
  }
}
