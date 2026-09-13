// Frontend Game Controller untuk Monopoly Nusantara (Flight PHP Backend)

// Sound Engine Menggunakan Web Audio API
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playStep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playDiceRoll() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 14; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + i * 0.07;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300 + Math.random() * 280, time);
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.06);
    }
  }

  playCash() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [987.77, 1318.51, 1975.53].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + idx * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.22);
    });
  }

  playPayCash() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [783.99, 587.33, 392.00].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const time = now + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.7, time + 0.16);
        gain.gain.setValueAtTime(0.22, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.16);
      });
    } catch (e) {}
  }

  playCardFlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  playBuy() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + i * 0.07;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.18);
    });
  }

  playJail() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + idx * 0.15;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.25);
    });
  }

  _createNoise(duration, filterFreq, filterQ, peakGain, startTime) {
    if (!this.ctx) return;
    try {
      const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(filterFreq, startTime);
      filter.Q.setValueAtTime(filterQ, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(startTime);
      noise.stop(startTime + duration);
    } catch (e) {}
  }

  _playVocalSyllable(startTime, startF0, endF0, dur, vol, f1Val = 780, f2Val = 1320) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(Math.max(20, startF0), startTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endF0), startTime + dur);

      const f1 = this.ctx.createBiquadFilter();
      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(f1Val, startTime);
      f1.Q.setValueAtTime(3.6, startTime);

      const f2 = this.ctx.createBiquadFilter();
      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(f2Val, startTime);
      f2.Q.setValueAtTime(4.2, startTime);

      const syllableGain = this.ctx.createGain();
      syllableGain.gain.setValueAtTime(0.0001, startTime);
      syllableGain.gain.linearRampToValueAtTime(vol, startTime + 0.016);
      syllableGain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

      osc.connect(f1);
      osc.connect(f2);
      f1.connect(syllableGain);
      f2.connect(syllableGain);
      syllableGain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur);

      // Breath aspiration "h" sound at the start of syllable
      this._createNoise(0.032, Math.max(800, f2Val * 0.9), 2.2, vol * 0.32, startTime);
    } catch (e) {}
  }

  playEmotePop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const baseFreq = 420 + Math.random() * 260;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playEmoteSound(emote) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. 😂 - Tertawa / Wkwk (Hearty vocal laugh "HA-ha-ha-ha-ha")
    if (emote === '😂') {
      const syllables = [
        { delay: 0.00, f0: 410, fEnd: 320, dur: 0.12, vol: 0.28 },
        { delay: 0.13, f0: 380, fEnd: 290, dur: 0.11, vol: 0.26 },
        { delay: 0.25, f0: 345, fEnd: 260, dur: 0.11, vol: 0.24 },
        { delay: 0.37, f0: 305, fEnd: 230, dur: 0.10, vol: 0.20 },
        { delay: 0.48, f0: 265, fEnd: 195, dur: 0.14, vol: 0.16 }
      ];
      syllables.forEach(s => {
        const jitter = (Math.random() - 0.5) * 18;
        this._playVocalSyllable(now + s.delay, s.f0 + jitter, s.fEnd + jitter, s.dur, s.vol, 780, 1300);
      });
      return;
    }

    // 2. 🤣 - Ngakak Guling / Hysterical High Laugh ("HE-HE-HE-HA-ha-ha")
    if (emote === '🤣') {
      const syllables = [
        { delay: 0.00, f0: 560, fEnd: 480, dur: 0.09, vol: 0.28, f1: 850, f2: 1850 },
        { delay: 0.095, f0: 620, fEnd: 520, dur: 0.09, vol: 0.30, f1: 880, f2: 1950 },
        { delay: 0.19, f0: 540, fEnd: 440, dur: 0.095, vol: 0.27, f1: 820, f2: 1750 },
        { delay: 0.29, f0: 460, fEnd: 360, dur: 0.10, vol: 0.25, f1: 780, f2: 1500 },
        { delay: 0.40, f0: 390, fEnd: 290, dur: 0.105, vol: 0.22, f1: 760, f2: 1350 },
        { delay: 0.51, f0: 310, fEnd: 220, dur: 0.13, vol: 0.18, f1: 740, f2: 1250 }
      ];
      syllables.forEach(s => {
        const jitter = (Math.random() - 0.5) * 20;
        this._playVocalSyllable(now + s.delay, s.f0 + jitter, s.fEnd + jitter, s.dur, s.vol, s.f1, s.f2);
      });
      return;
    }

    // 3. 😭 - Nangis / Apes (Vocal Wah-Wah Crying)
    if (emote === '😭') {
      [0, 0.28].forEach((offset, idx) => {
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440 - idx * 40, t);
        osc.frequency.linearRampToValueAtTime(520 - idx * 40, t + 0.08);
        osc.frequency.exponentialRampToValueAtTime(220 - idx * 30, t + 0.26);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600, t);
        filter.frequency.linearRampToValueAtTime(1100, t + 0.08);
        filter.frequency.exponentialRampToValueAtTime(450, t + 0.26);
        filter.Q.setValueAtTime(3.2, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.24, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.26);
      });
      return;
    }

    // 4. 😡 - Marah / Emosi (Low Aggressive Distortion Growl)
    if (emote === '😡') {
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.28);

      subOsc.type = 'square';
      subOsc.frequency.setValueAtTime(80, now);
      subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.28);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.28);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 0.3);
      subOsc.stop(now + 0.3);
      return;
    }

    // 5. 🤑 - Cuan / Kaya (Sparkling Jackpot Bells)
    if (emote === '🤑') {
      const notes = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02]; // C6, E6, G6, C7, E7
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * 0.042;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.22);
      });
      return;
    }

    // 6. 😎 - Santai / Keren (Smooth Brass/Synth Chord)
    if (emote === '😎') {
      const chord = [523.25, 659.25, 783.99, 987.77, 1174.66]; // Cmaj9
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * 0.035;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
      });
      return;
    }

    // 7. 💀 - Tamat / Tengkorak (Hollow Wooden Skull Knock)
    if (emote === '💀') {
      [0, 0.08].forEach((offset, i) => {
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(i === 0 ? 380 : 260, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.09);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(i === 0 ? 520 : 380, t);
        filter.Q.setValueAtTime(5.0, t);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.1);
      });
      return;
    }

    // 8. 🎲 - Hoki Dadu (Realistic Dice Cup Shake & Table Clatter)
    if (emote === '🎲') {
      for (let i = 0; i < 5; i++) {
        const t = now + i * 0.035;
        this._createNoise(0.025, 1800 + Math.random() * 1200, 3.5, 0.22, t);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450 + Math.random() * 250, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.03);
      }
      return;
    }

    // 9. 🔥 - Membara (Dynamic Sizzle Fire Whoosh)
    if (emote === '🔥') {
      this._createNoise(0.24, 900, 1.2, 0.28, now);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.2);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
      return;
    }

    // 10. 👏 - Tepuk Tangan (Realistic Crisp Handclap)
    if (emote === '👏') {
      [0, 0.09].forEach(offset => {
        const t = now + offset;
        this._createNoise(0.045, 1200, 1.8, 0.35, t);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.04);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.045);
      });
      return;
    }

    // Fallback: Default Pop Sound
    this.playEmotePop();
  }
}

const sound = new SoundEngine();

// State & Cache
let state = window.INITIAL_STATE || null;
const BOARD_SPACES = window.BOARD_SPACES || [];
let isAnimating = false;
let isBotRunning = false;
let isModalOpen = false;
let isProcessingAction = false;

// Online Multiplayer Room State
let currentOnlineRoom = null;
let currentOnlinePlayer = null;
let lobbyPollInterval = null;
let inGamePollInterval = null;

// Screen DOM Elements
const homeMenuScreen = document.getElementById('homeMenuScreen');
const settingsAiScreen = document.getElementById('settingsAiScreen');
const settingsPvpScreen = document.getElementById('settingsPvpScreen');
const settingsOnlineScreen = document.getElementById('settingsOnlineScreen');
const onlineLobbyScreen = document.getElementById('onlineLobbyScreen');
const inGameBoardScreen = document.getElementById('inGameBoardScreen');

// Online Lobby Elements
const lobbyRoomCodeDisplay = document.getElementById('lobbyRoomCodeDisplay');
const btnCopyRoomCode = document.getElementById('btnCopyRoomCode');
const copyIcon = document.getElementById('copyIcon');
const copyLabel = document.getElementById('copyLabel');
const lobbyPlayerCountBadge = document.getElementById('lobbyPlayerCountBadge');
const lobbySlotsContainer = document.getElementById('lobbySlotsContainer');
const lobbyHostControls = document.getElementById('lobbyHostControls');
const btnLobbyAddBot = document.getElementById('btnLobbyAddBot');
const btnLobbyStartGame = document.getElementById('btnLobbyStartGame');
const lobbyStartBtnText = document.getElementById('lobbyStartBtnText');
const lobbyStartWarningText = document.getElementById('lobbyStartWarningText');
const lobbyGuestControls = document.getElementById('lobbyGuestControls');
const btnLeaveLobby = document.getElementById('btnLeaveLobby');

// In-Game HUD Elements
const boardElement = document.getElementById('monopolyBoard');
const modalContainer = document.getElementById('modalContainer');
const btnRollDice = document.getElementById('btnRollDice');
const btnEndTurn = document.getElementById('btnEndTurn');
const btnPayJailFine = document.getElementById('btnPayJailFine');
const btnUseJailCard = document.getElementById('btnUseJailCard');
const jailActions = document.getElementById('jailActions');
const hudPlayerToken = document.getElementById('hudPlayerToken');
const hudPlayerName = document.getElementById('hudPlayerName');
const hudPlayerBalance = document.getElementById('hudPlayerBalance');
const turnBadge = document.getElementById('turnBadge');
const inGameModeBadge = document.getElementById('inGameModeBadge');
const playersListContainer = document.getElementById('playersListContainer');
const gameLogsList = document.getElementById('gameLogsList');
const portfolioList = document.getElementById('portfolioList');
const portfolioPlayerTabs = document.getElementById('portfolioPlayerTabs');
const portfolioStatsBadge = document.getElementById('portfolioStatsBadge');
const portfolioScrollHint = document.getElementById('portfolioScrollHint');
const tradingPartnersStatus = document.getElementById('tradingPartnersStatus');
const btnOpenTradingDesk = document.getElementById('btnOpenTradingDesk');
let selectedPortfolioPlayerId = null;

// Chat & Emoticon Elements
const playerChatCard = document.getElementById('playerChatCard');
const quickEmoteBar = document.getElementById('quickEmoteBar');
const chatMessagesList = document.getElementById('chatMessagesList');
const chatInputForm = document.getElementById('chatInputForm');
const inputChatMessage = document.getElementById('inputChatMessage');
const btnSendChatMessage = document.getElementById('btnSendChatMessage');
let localChats = [];
let processedChatIds = new Set();
let botReactionTimeout = null;

// Trade Handshake & Barter State Tracking
let activeTradeInvitePromptId = null;
let isWaitingForTradeInvite = false;
let activeWaitingInviteTargetName = '';
let activePendingTradeId = null;
let isWaitingForTradeProposal = false;
let isGameOverModalShown = false;

const btnLogsDropdown = document.getElementById('btnLogsDropdown');
const logsDropdownMenu = document.getElementById('logsDropdownMenu');
const logsBadgeCount = document.getElementById('logsBadgeCount');
const logsDropdownArrow = document.getElementById('logsDropdownArrow');
const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');
const fullscreenIcon = document.getElementById('fullscreenIcon');
const fullscreenLabel = document.getElementById('fullscreenLabel');
const fullscreenToast = document.getElementById('fullscreenToast');
let fullscreenToastTimeout = null;
const btnSoundToggle = document.getElementById('btnSoundToggle');
const soundIcon = document.getElementById('soundIcon');
const soundLabel = document.getElementById('soundLabel');
const btnGameRules = document.getElementById('btnGameRules');
const rulesModal = document.getElementById('rulesModal');
const btnCloseRules = document.getElementById('btnCloseRules');
const btnConfirmRules = document.getElementById('btnConfirmRules');
const btnNewGame = document.getElementById('btnNewGame');
const btnInGameBackHome = document.getElementById('btnInGameBackHome');

// Helper Navigasi Layar (Screen Switcher)
function showScreen(screenId) {
  [homeMenuScreen, settingsAiScreen, settingsPvpScreen, settingsOnlineScreen, onlineLobbyScreen, inGameBoardScreen].forEach(scr => {
    if (scr) scr.classList.add('hidden');
  });
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.remove('hidden');
  }
}

// Helper API Fetch ke Flight PHP
async function apiCall(endpoint, data = null, method = 'POST') {
  try {
    const isGet = (method === 'GET' && (data === null || typeof data === 'object'));
    let url = (window.BASE_URL || '') + endpoint;

    if (currentOnlineRoom && currentOnlineRoom.code) {
      if (isGet) {
        const sep = url.includes('?') ? '&' : '?';
        url += `${sep}roomCode=${encodeURIComponent(currentOnlineRoom.code)}`;
      } else {
        if (data && typeof data === 'object') {
          data.roomCode = currentOnlineRoom.code;
        } else if (data === null) {
          data = { roomCode: currentOnlineRoom.code };
        }
      }
    }

    const options = {
      method: isGet ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    };
    if (!isGet) {
      options.body = JSON.stringify(data !== null ? data : {});
    }
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return null;
  }
}

// Format Nominal Singkat Rupiah
function formatShortPrice(num) {
  if (!num) return '';
  if (num >= 1000000) {
    const jt = num / 1000000;
    return `Rp ${jt % 1 === 0 ? jt : jt.toFixed(1)} jt`;
  }
  return `Rp ${Math.round(num / 1000)} rb`;
}

// Format Uang Standar Rupiah
function formatCurrency(num) {
  return `Rp ${(num || 0).toLocaleString('id-ID')}`;
}

// Menentukan Posisi Grid 11x11
function getGridPosition(id) {
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

// Slider Helper untuk Update Progress Bar Kuning
function setupSlider(sliderId, valueDisplayId, formatFn = val => val) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(valueDisplayId);
  if (!slider) return;

  const update = () => {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--slider-progress', `${pct}%`);
    if (display) {
      display.textContent = formatFn(val);
    }
  };

  slider.addEventListener('input', update);
  update();
}

// Setup Toggle Switches
function setupToggle(toggleId) {
  const toggle = document.getElementById(toggleId);
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const isChecked = toggle.getAttribute('data-checked') === 'true';
    const nextState = !isChecked;
    toggle.setAttribute('data-checked', nextState ? 'true' : 'false');
    if (nextState) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  });
}

// Inisialisasi Seluruh Sliders & Toggles Menu
function initSettingsControls() {
  // Pengaturan AI
  setupSlider('aiPlayersSlider', 'aiPlayersVal', val => `${val} Orang`);
  setupSlider('aiRobotsSlider', 'aiRobotsVal', val => {
    if (val === 1) return 'Mudah';
    if (val === 2) return 'Sedang';
    return 'Sulit (Pintar)';
  });
  setupSlider('aiMoneySlider', 'aiMoneyVal', val => formatCurrency(val));
  setupToggle('aiJailToggle');
  setupToggle('aiAuctionToggle');

  // Pengaturan PvP
  setupSlider('pvpPlayersSlider', 'pvpPlayersVal', val => `${val} Orang`);
  setupSlider('pvpMoneySlider', 'pvpMoneyVal', val => formatCurrency(val));
  setupToggle('pvpJailToggle');
  setupToggle('pvpAuctionToggle');

  // Pengaturan Online
  setupSlider('onlineMaxPlayersSlider', 'onlineMaxPlayersVal', val => `${val} Orang`);
  setupToggle('onlineJailToggle');
  setupToggle('onlineAuctionToggle');
}

// Render 3D Dice Face with Crisp Authentic Pip Grid (Exact Match to Mockup)
function renderDiceFace(el, val) {
  if (!el) return;
  const v = Math.min(6, Math.max(1, parseInt(val) || 1));
  const pipMaps = {
    1: [4],
    2: [2, 6],
    3: [2, 4, 6],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };
  const active = pipMaps[v] || [4];
  let html = '<div class="dice-pip-grid">';
  for (let i = 0; i < 9; i++) {
    html += `<div class="dice-pip ${active.includes(i) ? 'active' : ''}"></div>`;
  }
  html += '</div>';
  el.innerHTML = html;
}

// ==============================================
// VECTOR ICON SYSTEM (DELUXE MONOPOLY SVG ICONS)
// ==============================================
const GameIcons = {
  train: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>',
  zap: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  water: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  tax: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/><path d="M5 21v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M12 10v4"/><path d="M10 12h4"/></svg>',
  diamond: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>',
  chance: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  chest: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><circle cx="12" cy="12" r="1.5"/></svg>',
  goArrow: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  jailLock: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  jailUnlock: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',
  visiting: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M10 22v-6l-2-2-1 4"/><path d="M14 22v-6l2-2.5-1.5-3.5L11 11"/></svg>',
  freeParking: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3c-.1.2-.1.5-.1.8v4.3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
  police: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/><path d="m10 13 4-4"/></svg>',
  arrowDownLeft: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/></svg>',
  house: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M10.7 2.3a1 1 0 0 1 1.4 0l8 8a1 1 0 0 1-1.4 1.4L18 11V20a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9l-.7.7a1 1 0 0 1-1.4-1.4l8-8z"/></svg>',
  hotel: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2H5a2 2 0 0 0-2 2v18h18V4a2 2 0 0 0-2-2zm-8 4h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm-4-8h2v2H7V6zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm8-8h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zM9 20v-2h6v2H9z"/></svg>',
  crown: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v2H2v-2zm2-2l2-13 5 6 3-8 3 8 5-6 2 13H4z"/></svg>',
  trophy: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8v2h8v-2h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
  dice: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" ry="3"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/></svg>',
  hourglass: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>',
  next: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
  refresh: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  bot: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>',
  user: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  check: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  copy: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  warning: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  moneyBag: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L8 5h8l-4-4zm-1 6H9.5a2.5 2.5 0 0 0-2.5 2.5V10c0 4.5 3 9 7 10 4-1 7-5.5 7-10V9.5A2.5 2.5 0 0 0 18.5 7H13v3h3v2h-3v4h-2v-4H8v-2h3V7z"/></svg>',
  bill: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>',
  key: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m21 3-9.5 9.5"/><path d="m15.5 7.5 3 3"/></svg>',
  compass: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  tools: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  cardEmblem: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>',
  tap: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="M14 12V8a2 2 0 0 0-4 0v8l-2-2a2 2 0 0 0-3 3l5 5a7 7 0 0 0 10-2l2-6a2 2 0 0 0-3.5-1.5L17 14v-2a2 2 0 0 0-3 0z"/></svg>',
  shield: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.08 8.8-7 9.9-3.92-1.1-7-5.36-7-9.9V7.3l7-3.12z"/></svg>',
  soundOn: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  soundOff: '<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
};

// Render Papan Monopoli Vintage Deluxe & Clean Physical Board
function renderBoard() {
  if (!boardElement) return;
  boardElement.innerHTML = '';

  BOARD_SPACES.forEach(space => {
    const pos = getGridPosition(space.id);
    const cell = document.createElement('div');
    cell.className = `board-tile tile-${pos.side} group cursor-pointer relative select-none transition-all`;
    cell.style.gridRow = pos.row;
    cell.style.gridColumn = pos.col;
    cell.dataset.spaceId = space.id;

    // 1. CORNER TILES (0, 10, 20, 30)
    if (space.type === 'corner') {
      if (space.id === 0) {
        // MULAI / GO
        cell.className += ' corner-go';
        cell.innerHTML = `
          <div class="tile-content flex-1 flex flex-col items-center justify-between text-center p-1 z-0 w-full h-full select-none">
            <span class="corner-go-sub font-black text-[#784419] uppercase tracking-wider leading-none pt-0.5 font-outfit">LEWAT AMBIL</span>
            <div class="my-auto flex flex-col items-center justify-center">
              <span class="corner-go-main font-black text-[#b91c1c] font-outfit tracking-widest leading-none">MULAI</span>
              <span class="corner-go-bonus font-mono text-[#b91c1c] font-bold leading-tight mt-0.5">+Rp 2 JT</span>
            </div>
            <div class="corner-go-arrow text-[#b91c1c] flex items-center justify-center mb-0.5">${GameIcons.goArrow}</div>
          </div>
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-0.5 z-20 flex-wrap p-0.5"></div>
        `;
      } else if (space.id === 10) {
        // PENJARA / JAIL
        cell.className += ' corner-jail';
        cell.innerHTML = `
          <div class="w-full h-full flex flex-col justify-between items-center p-0.5 select-none z-0">
            <div class="corner-jail-visiting w-full py-0.5 px-0.5 bg-[#ecdcc3] border-b border-[#8c6738] flex items-center justify-center gap-1 leading-none shrink-0">
              <span class="w-2 h-2 inline-block text-[#4a2c0c] shrink-0">${GameIcons.visiting}</span>
              <span class="corner-jail-visiting-text font-black text-[#4a2c0c] uppercase font-outfit">HANYA LEWAT</span>
            </div>
            <div class="corner-jail-cell flex-1 w-[90%] my-0.5 bg-[#fef2f2] border border-[#ef4444] rounded flex flex-col items-center justify-center p-0.5 shadow-inner">
              <div class="corner-jail-icon text-[#c2410c] flex items-center justify-center shrink-0 mb-0.5">${GameIcons.jailLock}</div>
              <span class="corner-jail-text font-black text-[#c2410c] font-outfit tracking-wider leading-none">PENJARA</span>
            </div>
          </div>
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-0.5 z-20 flex-wrap p-0.5"></div>
        `;
      } else if (space.id === 20) {
        // PARKIR BEBAS / FREE PARKING
        cell.className += ' corner-free-parking';
        cell.innerHTML = `
          <div class="tile-content flex-1 flex flex-col items-center justify-center text-center p-1 z-0 w-full h-full select-none">
            <div class="corner-parking-icon text-[#1e3a8a] flex items-center justify-center shrink-0 mb-0.5">${GameIcons.freeParking}</div>
            <span class="corner-parking-title text-[#1e3a8a] font-black leading-tight font-outfit">PARKIR BEBAS</span>
            <span class="corner-parking-sub text-[#475569] font-bold leading-none mt-0.5">Istirahat</span>
          </div>
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-0.5 z-20 flex-wrap p-0.5"></div>
        `;
      } else if (space.id === 30) {
        // MASUK PENJARA / GO TO JAIL
        cell.className += ' corner-go-to-jail';
        cell.innerHTML = `
          <div class="tile-content flex-1 flex flex-col items-center justify-center text-center p-1 z-0 w-full h-full select-none">
            <div class="corner-gtj-police text-[#b91c1c] flex items-center justify-center shrink-0 mb-0.5">${GameIcons.police}</div>
            <span class="corner-gtj-sub text-[#4a2c0c] font-extrabold leading-none font-outfit">MASUK</span>
            <span class="corner-gtj-main font-black text-[#b91c1c] font-outfit leading-tight mt-0.5">PENJARA!</span>
            <div class="corner-gtj-arrow text-[#b91c1c] flex items-center justify-center shrink-0 mt-0.5">${GameIcons.arrowDownLeft}</div>
          </div>
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-0.5 z-20 flex-wrap p-0.5"></div>
        `;
      }
    } else {
      // 2. REGULAR TILES (Properties, Railroads, Utilities, Taxes, Cards)
      let colorBarHtml = '';
      let indicatorsHtml = '<div class="indicators-container absolute flex items-center gap-0.5 z-10 pointer-events-none"></div>';
      let iconHtml = '';
      let priceText = space.price ? formatShortPrice(space.price) : (space.amount ? `Bayar ${formatShortPrice(space.amount)}` : '');
      const displayName = space.shortName || space.name;

      if (space.type === 'property') {
        colorBarHtml = `<div class="color-bar" style="background-color: ${space.color}"></div>`;
      } else if (space.type === 'railroad') {
        iconHtml = `<div class="tile-icon text-zinc-700">${GameIcons.train}</div>`;
      } else if (space.type === 'utility') {
        iconHtml = space.icon === 'zap' ? `<div class="tile-icon text-amber-500">${GameIcons.zap}</div>` : `<div class="tile-icon text-blue-500">${GameIcons.water}</div>`;
      } else if (space.type === 'tax') {
        iconHtml = space.id === 4 ? `<div class="tile-icon text-amber-600">${GameIcons.tax}</div>` : `<div class="tile-icon text-cyan-600">${GameIcons.diamond}</div>`;
      } else if (space.type === 'special') {
        iconHtml = space.subType === 'chance' ? `<div class="tile-icon text-amber-600">${GameIcons.chance}</div>` : `<div class="tile-icon text-sky-600">${GameIcons.chest}</div>`;
      }

      const priceBadgeHtml = priceText ? `<span class="tile-price-badge">${priceText}</span>` : '';

      if (pos.side === 'top') {
        // TOP TILES: Price at Top (outer edge), Name/Icon in middle, Color bar at Bottom (facing center)
        cell.innerHTML = `
          ${priceBadgeHtml}
          ${indicatorsHtml}
          <div class="tile-content">
            ${iconHtml}
            <span class="tile-name">${displayName}</span>
          </div>
          ${colorBarHtml}
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-1 z-20 flex-wrap p-1"></div>
        `;
      } else if (pos.side === 'left') {
        // LEFT TILES: Name/Icon/Price on left, Color bar at Right (vertical strip facing center)
        cell.innerHTML = `
          ${indicatorsHtml}
          <div class="tile-content">
            ${iconHtml}
            <span class="tile-name">${displayName}</span>
            ${priceBadgeHtml}
          </div>
          ${colorBarHtml}
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-1 z-20 flex-wrap p-1"></div>
        `;
      } else if (pos.side === 'right') {
        // RIGHT TILES: Color bar at Left (vertical strip facing center), Name/Icon/Price on right
        cell.innerHTML = `
          ${colorBarHtml}
          ${indicatorsHtml}
          <div class="tile-content">
            ${iconHtml}
            <span class="tile-name">${displayName}</span>
            ${priceBadgeHtml}
          </div>
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-1 z-20 flex-wrap p-1"></div>
        `;
      } else {
        // BOTTOM TILES: Color bar at Top (facing center), Name/Icon in middle, Price at Bottom (outer edge)
        cell.innerHTML = `
          ${colorBarHtml}
          ${indicatorsHtml}
          <div class="tile-content">
            ${iconHtml}
            <span class="tile-name">${displayName}</span>
          </div>
          ${priceBadgeHtml}
          <div class="tokens-container absolute inset-0 pointer-events-none flex items-center justify-center gap-1 z-20 flex-wrap p-1"></div>
        `;
      }
    }

    cell.addEventListener('click', () => {
      showTitleDeed(space);
    });

    boardElement.appendChild(cell);
  });

  // 3. CENTER BOARD AREA (Horizontal Decks Above Dice Layout)
  const centerArea = document.createElement('div');
  centerArea.className = 'board-center flex flex-col items-center justify-between p-2 md:p-3 relative z-0';
  centerArea.style.gridRow = '2 / 11';
  centerArea.style.gridColumn = '2 / 11';
  centerArea.id = 'boardCenterArea';

  centerArea.innerHTML = `
    <!-- Top Section: Elegant Monopoly Header -->
    <div class="center-header flex flex-col items-center pt-2 md:pt-3">
      <div class="w-7 h-7 md:w-8 md:h-8 text-[#784419] mb-0.5 drop-shadow-sm">${GameIcons.shield}</div>
      <h1 class="text-xl md:text-3xl font-black tracking-widest text-[#5c2d08] uppercase font-outfit leading-none drop-shadow-sm">
        MONOPOLY
      </h1>
      <div class="text-[8px] md:text-[10px] uppercase tracking-[0.28em] font-black text-[#784419] mt-0.5 font-outfit">
        • EDISI NUSANTARA •
      </div>
    </div>

    <!-- Middle-Top Section: Authentic 3D Rectangular Card Decks (Above Dice) -->
    <div class="center-horizontal-decks-row">
      
      <!-- 1. LEFT: Deck Kartu Kesempatan (Landscape Rectangle) -->
      <div class="board-deck-slot-h" id="boardDeckChance" title="Klik untuk melihat info Kartu Kesempatan">
        <div class="board-deck-wrapper-h">
          <div class="deck-tray-outline-h deck-tray-chance"></div>
          <div class="deck-stack-card-h layer-back bg-[#fde68a]"></div>
          <div class="deck-stack-card-h layer-mid bg-[#fef3c7]"></div>
          <div class="deck-main-card-h card-chance">
            <div class="deck-card-frame-h">
              <div class="card-badge-h badge-chance">
                <span class="font-black text-base md:text-xl font-outfit leading-none select-none text-[#c2410c] drop-shadow-sm">?</span>
              </div>
              
              <div class="flex flex-col items-start justify-center leading-tight min-w-0">
                <span class="text-[6.5px] md:text-[7.5px] font-black uppercase tracking-[0.18em] text-amber-200/90 font-outfit leading-none">KARTU</span>
                <span class="card-title-h font-outfit text-amber-100">KESEMPATAN</span>
                <span class="card-sub-h font-sans text-amber-200/90">CHANCE</span>
                <span class="text-[5.5px] md:text-[6.5px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-black/25 text-amber-100/90 mt-0.5">50 KARTU</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. RIGHT: Deck Kartu Dana Umum (Landscape Rectangle) -->
      <div class="board-deck-slot-h" id="boardDeckChest" title="Klik untuk melihat info Kartu Dana Umum">
        <div class="board-deck-wrapper-h">
          <div class="deck-tray-outline-h deck-tray-chest"></div>
          <div class="deck-stack-card-h layer-back bg-[#bae6fd]"></div>
          <div class="deck-stack-card-h layer-mid bg-[#e0f2fe]"></div>
          <div class="deck-main-card-h card-chest">
            <div class="deck-card-frame-h">
              <div class="card-badge-h badge-chest">
                <div class="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[#0369a1] drop-shadow-sm">${GameIcons.chest}</div>
              </div>
              
              <div class="flex flex-col items-start justify-center leading-tight min-w-0">
                <span class="text-[6.5px] md:text-[7.5px] font-black uppercase tracking-[0.18em] text-sky-200/90 font-outfit leading-none">KARTU</span>
                <span class="card-title-h font-outfit text-sky-100">DANA UMUM</span>
                <span class="card-sub-h font-sans text-sky-200/90">COMMUNITY CHEST</span>
                <span class="text-[5.5px] md:text-[6.5px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-black/25 text-sky-100/90 mt-0.5">50 KARTU</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Middle-Bottom Section: Dice Rolling Station & Turn HUD (Below Cards) -->
    <div class="center-dice-station flex flex-col items-center gap-2 md:gap-2.5">
      <div id="diceCenterContainer" class="flex items-center justify-center gap-3 md:gap-5 cursor-pointer py-0.5">
        <div id="die1" class="dice-box"></div>
        <div id="die2" class="dice-box"></div>
      </div>

      <!-- Tap Dice To Roll Pill Button -->
      <button id="btnCenterTapDice" class="dice-tap-pill font-outfit">
        TAP DICE TO ROLL
      </button>

      <!-- Center Dynamic Status HUD Capsule -->
      <div id="centerPrompt" class="center-turn-capsule font-sans">
        <span class="turn-dot-indicator"></span>
        <span id="centerPromptText">Game started! Player 1 goes first!</span>
      </div>
    </div>

    <!-- Bottom Section: Helper Hint -->
    <div class="text-center text-[8.5px] md:text-[10px] text-[#784419]/80 font-semibold pb-1">
      Klik petak mana saja untuk melihat Sertifikat & Rincian Sewa
    </div>

    <!-- Floating Board Emote Overlay (Spam Emoticon FX) -->
    <div id="boardEmoteOverlay" class="board-emote-overlay"></div>
  `;

  boardElement.appendChild(centerArea);

  const btnCenterTap = centerArea.querySelector('#btnCenterTapDice');
  if (btnCenterTap) {
    btnCenterTap.addEventListener('click', (e) => {
      e.stopPropagation();
      handleMainActionButton();
    });
  }

  centerArea.querySelector('#diceCenterContainer')?.addEventListener('click', () => {
    handleMainActionButton();
  });

  const d1 = document.getElementById('die1');
  const d2 = document.getElementById('die2');
  if (d1) renderDiceFace(d1, (state && state.dice) ? state.dice[0] : 1);
  if (d2) renderDiceFace(d2, (state && state.dice) ? state.dice[1] : 1);

  updateBoardUI();
}

// Generator Pion Catur Berwarna 3D (Authentic Colored 3D Chess Pawn)
function getChessPawnSVG(color, playerId = '0') {
  const cleanColor = color || '#ef4444';
  const id = `pawn_${playerId}_${Math.random().toString(36).substring(2, 7)}`;
  
  return `
    <svg class="chess-pawn-svg" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Head Spherical Shading -->
        <radialGradient id="${id}_head" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
          <stop offset="30%" stop-color="${cleanColor}"/>
          <stop offset="85%" stop-color="${cleanColor}"/>
          <stop offset="100%" stop-color="#18181b"/>
        </radialGradient>

        <!-- Body Linear Shading -->
        <linearGradient id="${id}_body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
          <stop offset="28%" stop-color="${cleanColor}"/>
          <stop offset="78%" stop-color="${cleanColor}"/>
          <stop offset="100%" stop-color="#09090b" stop-opacity="0.8"/>
        </linearGradient>

        <!-- Base Pedestal Shading -->
        <linearGradient id="${id}_base" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
          <stop offset="30%" stop-color="${cleanColor}"/>
          <stop offset="75%" stop-color="${cleanColor}"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.85"/>
        </linearGradient>

        <!-- Soft Ground Contact Shadow -->
        <radialGradient id="${id}_shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Ground Contact Shadow -->
      <ellipse cx="14" cy="34.5" rx="10" ry="1.5" fill="url(#${id}_shadow)"/>

      <!-- Base Bottom Tier -->
      <path d="M 4.5 32 C 4.5 33.8 6 34.5 14 34.5 C 22 34.5 23.5 33.8 23.5 32 C 23.5 30.5 21.5 29.5 18.5 29.5 L 9.5 29.5 C 6.5 29.5 4.5 30.5 4.5 32 Z" fill="url(#${id}_base)" stroke="rgba(0,0,0,0.3)" stroke-width="0.6"/>

      <!-- Base Collar Step -->
      <ellipse cx="14" cy="29.5" rx="6.8" ry="1.4" fill="url(#${id}_base)" stroke="rgba(0,0,0,0.25)" stroke-width="0.5"/>

      <!-- Curved Waist / Body -->
      <path d="M 11.2 15 C 11.2 19 13.2 24.5 9 29.2 L 19 29.2 C 14.8 24.5 16.8 19 16.8 15 Z" fill="url(#${id}_body)" stroke="rgba(0,0,0,0.25)" stroke-width="0.5"/>

      <!-- Neck Ring -->
      <ellipse cx="14" cy="15" rx="4.6" ry="1.2" fill="url(#${id}_base)" stroke="rgba(0,0,0,0.3)" stroke-width="0.5"/>

      <!-- Sphere Head -->
      <circle cx="14" cy="8.5" r="5.5" fill="url(#${id}_head)" stroke="rgba(0,0,0,0.25)" stroke-width="0.5"/>
    </svg>
  `;
}

// Render Player Tokens (Pion Catur 3D Berwarna)
function renderPlayerTokens(customPosMap = null) {
  if (!state) return;

  document.querySelectorAll('.board-tile').forEach(tile => {
    const tContainer = tile.querySelector('.tokens-container');
    if (tContainer) tContainer.innerHTML = '';
  });

  state.players.forEach(p => {
    if (p.isBankrupt) return;
    const pos = (customPosMap && customPosMap[p.id] !== undefined) ? customPosMap[p.id] : p.position;
    const tile = document.querySelector(`.board-tile[data-space-id="${pos}"]`);
    if (tile) {
      const container = tile.querySelector('.tokens-container');
      if (container) {
        const pawn = document.createElement('div');
        pawn.className = 'player-pawn-wrapper animate-pawn-idle';
        pawn.title = `${p.name} (Pion ${p.name})`;
        pawn.dataset.playerId = p.id;
        pawn.innerHTML = getChessPawnSVG(p.color, p.id);
        container.appendChild(pawn);
      }
    }
  });
}

// ==============================================
// GAMEPLAY ANIMATION & EFFECTS ENGINE
// ==============================================

function triggerConfetti(options = {}) {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: options.particleCount || 65,
      spread: options.spread || 70,
      origin: options.origin || { y: 0.65 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#ec4899', '#fbbf24']
    });
  }
}

function triggerScreenShake() {
  // Dinonaktifkan sesuai permintaan pengguna agar halaman web tidak bergetar
}

function triggerJailSiren() {
  const overlay = document.createElement('div');
  overlay.className = 'jail-siren-overlay';
  document.body.appendChild(overlay);
  sound.playJail();
  triggerScreenShake();
  setTimeout(() => overlay.remove(), 1600);
}

let processedLogSet = new Set();
let isInitialLogLoad = true;

function showFloatingCash(amount, isPositive = true, label = '', startPosElement = null) {
  if (!amount || isNaN(amount)) return;
  const rawAmt = Math.abs(amount);

  const bubble = document.createElement('div');
  bubble.className = `floating-cash-notification ${isPositive ? 'floating-cash-positive' : 'floating-cash-negative'}`;

  const prefix = isPositive ? '+ ' : '- ';
  const iconEmoji = isPositive ? '💰' : '💸';
  bubble.innerHTML = `
    <div class="flex items-center gap-1.5 leading-none">
      <span class="text-xl sm:text-2xl">${iconEmoji}</span>
      <span class="text-base sm:text-lg font-black font-outfit tracking-tight">${prefix}${formatCurrency(rawAmt)}</span>
    </div>
    ${label ? `<div class="text-[9.5px] sm:text-[10.5px] font-bold text-white/95 tracking-wide uppercase font-outfit mt-0.5">${escapeHtml(label)}</div>` : ''}
  `;

  // Posisikan tepat di tengah papan permainan (Center Hub)
  const boardEl = document.getElementById('monopolyBoard');
  if (boardEl) {
    const rect = boardEl.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      bubble.style.left = `${rect.left + rect.width / 2}px`;
      bubble.style.top = `${rect.top + rect.height / 2}px`;
    } else {
      bubble.style.left = `${window.innerWidth / 2}px`;
      bubble.style.top = `${window.innerHeight / 2}px`;
    }
  } else {
    bubble.style.left = `${window.innerWidth / 2}px`;
    bubble.style.top = `${window.innerHeight / 2}px`;
  }

  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2100);
}

function processFinancialLogs(logs) {
  if (!logs || !Array.isArray(logs) || logs.length === 0) return;

  // On initial page load, record all existing logs without popping historical notifications
  if (isInitialLogLoad) {
    logs.forEach(l => {
      processedLogSet.add(`${l.time}_${l.message}`);
    });
    isInitialLogLoad = false;
    return;
  }

  // Gather new logs that haven't been processed yet
  const newLogs = [];
  for (let i = 0; i < Math.min(logs.length, 15); i++) {
    const log = logs[i];
    const key = `${log.time}_${log.message}`;
    if (processedLogSet.has(key)) break;
    newLogs.unshift(log); // Keep chronological order (oldest to newest among new)
    processedLogSet.add(key);
  }

  if (processedLogSet.size > 200) {
    const arr = Array.from(processedLogSet);
    processedLogSet = new Set(arr.slice(arr.length - 100));
  }

  newLogs.forEach((log, index) => {
    const msg = log.message || '';
    const delay = index * 350;

    setTimeout(() => {
      // 1. Lewat Mulai (GO) (+2 Jt)
      if (msg.includes('melewati Mulai')) {
        sound.playCash();
        showFloatingCash(2000000, true, 'Lewat Mulai (+2 Jt)');
        triggerConfetti({ particleCount: 35 });
        return;
      }

      // 2. Bayar Sewa Properti
      if (msg.includes('membayar sewa')) {
        sound.playPayCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, 'Bayar Sewa Properti');
        return;
      }

      // 3. Bayar Pajak
      if (msg.includes('membayar Pajak') || msg.includes('Pajak Penghasilan') || msg.includes('Pajak Istimewa')) {
        sound.playPayCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, 'Bayar Pajak');
        return;
      }

      // 4. Beli Properti
      if (msg.includes('membeli ') && msg.includes('seharga Rp')) {
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, 'Beli Properti');
        return;
      }

      // 5. Bangun Rumah / Hotel
      if (msg.includes('membangun Rumah') || msg.includes('meng-upgrade ke HOTEL')) {
        const isHotel = msg.includes('HOTEL');
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, isHotel ? 'Bangun Hotel Megah' : 'Bangun Rumah');
        return;
      }

      // 6. Jual Properti
      if (msg.includes('menjual ') && msg.includes('seharga Rp')) {
        sound.playCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, true, 'Jual Aset (+50%)');
        return;
      }

      // 7. Denda Penjara
      if (msg.includes('membayar denda Rp 1.500.000')) {
        sound.playPayCash();
        showFloatingCash(1500000, false, 'Denda Bebas Penjara');
        return;
      }

      // 8. Cuan / Hadiah Kartu
      if (msg.includes('menang jackpot')) {
        sound.playCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) {
          showFloatingCash(amt, true, '🎉 Cuan Jackpot!');
          triggerConfetti({ particleCount: 50 });
        }
        return;
      }

      if (msg.includes('memperoleh Rp') || msg.includes('mengambil Rp') || msg.includes('mengumpulkan Rp')) {
        sound.playCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) {
          showFloatingCash(amt, true, 'Hadiah Kartu');
          triggerConfetti({ particleCount: 30 });
        }
        return;
      }

      // 9. Denda / Rugi / Biaya Kartu
      if (msg.includes('kehilangan modal') || msg.includes('RUG PULL')) {
        sound.playPayCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, '💥 Rug Pull / Scam');
        return;
      }

      if (msg.includes('biaya perbaikan') || msg.includes('renovasi total')) {
        sound.playPayCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, 'Biaya Renovasi');
        return;
      }

      if (msg.includes('membagikan Rp')) {
        sound.playPayCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, 'Bagi-bagi THR');
        return;
      }

      if (msg.includes('membayar Rp') && !msg.includes('membeli')) {
        sound.playPayCash();
        const match = msg.match(/Rp\s*([\d\.]+)/);
        const amt = match ? parseInt(match[1].replace(/\./g, '')) : 0;
        if (amt > 0) showFloatingCash(amt, false, 'Pembayaran Denda');
        return;
      }
    }, delay);
  });
}

// Animasi Langkah Bidak Per Petak (Hopping Arc + Glow + Audio Step)
async function animateTokenStepByStep(playerId, fromPos, toPos, totalSteps, isBackward = false) {
  if (totalSteps <= 0) return;
  isAnimating = true;
  for (let s = 1; s <= totalSteps; s++) {
    const tempPos = isBackward ? (fromPos - s + 40) % 40 : (fromPos + s) % 40;
    renderPlayerTokens({ [playerId]: tempPos });
    sound.playStep();

    // Animasi lompatan bidak pion & tile glow tanpa terpotong
    const currentTile = document.querySelector(`.board-tile[data-space-id="${tempPos}"]`);
    if (currentTile) {
      currentTile.style.zIndex = '35';
      const badge = currentTile.querySelector(`.player-pawn-wrapper[data-player-id="${playerId}"]`) || currentTile.querySelector('.player-pawn-wrapper');
      if (badge) {
        badge.classList.remove('pawn-hop-active');
        void badge.offsetWidth;
        badge.classList.add('pawn-hop-active');
      }
      if (s === totalSteps) {
        currentTile.classList.add('tile-landed-glow');
        setTimeout(() => {
          currentTile.classList.remove('tile-landed-glow');
          currentTile.style.zIndex = '';
        }, 1000);
      } else {
        setTimeout(() => {
          currentTile.style.zIndex = '';
        }, 160);
      }
    }

    // Lewat Mulai (GO)
    if (!isBackward && tempPos === 0 && s < totalSteps) {
      sound.playCash();
      showFloatingCash(2000000, true, 'Lewat Mulai (+2 Jt)');
      triggerConfetti({ particleCount: 35 });
    }

    await new Promise(r => setTimeout(r, 155));
  }
  isAnimating = false;
}

// Update Board UI Real-Estate Indicators & Badges
function updateBoardUI() {
  if (!state) return;

  renderPlayerTokens();

  document.querySelectorAll('.board-tile').forEach(tile => {
    const iContainer = tile.querySelector('.indicators-container');
    if (iContainer) iContainer.innerHTML = '';
  });

  BOARD_SPACES.forEach(space => {
    const prop = state.properties[space.id];
    if (!prop || prop.ownerId === null || prop.ownerId === undefined) return;

    const tile = document.querySelector(`.board-tile[data-space-id="${space.id}"]`);
    if (!tile) return;
    const container = tile.querySelector('.indicators-container');
    if (!container) return;

    const owner = state.players[prop.ownerId];
    if (!owner) return;

    // Owner Jewel Dot
    const dot = document.createElement('div');
    dot.className = 'owner-dot';
    dot.style.backgroundColor = owner.color;
    dot.style.color = owner.color;
    dot.title = `Dimiliki oleh ${owner.name}`;
    container.appendChild(dot);

    // House / Hotel 3D Badge
    if (prop.isHotel) {
      const hotel = document.createElement('div');
      hotel.className = 'building-hotel flex items-center gap-1';
      hotel.innerHTML = `<span class="w-3 h-3 inline-block">${GameIcons.hotel}</span><span>Hotel</span>`;
      hotel.title = 'Hotel Megah';
      container.appendChild(hotel);
    } else if (prop.houses > 0) {
      const house = document.createElement('div');
      house.className = 'building-house flex items-center gap-0.5';
      house.innerHTML = `<span class="w-2.5 h-2.5 inline-block">${GameIcons.house}</span><span>${prop.houses}</span>`;
      house.title = `${prop.houses} Rumah`;
      container.appendChild(house);
    }
  });

  if (state.dice) {
    const d1 = document.getElementById('die1');
    const d2 = document.getElementById('die2');
    if (d1) renderDiceFace(d1, state.dice[0] || 1);
    if (d2) renderDiceFace(d2, state.dice[1] || 1);
  }
}

// Update HUD
function updateHUD() {
  if (!state) return;
  const current = state.players[state.currentPlayerIndex];
  if (!current) return;

  if (hudPlayerToken) {
    hudPlayerToken.innerHTML = getChessPawnSVG(current.color, current.id);
    hudPlayerToken.style.borderColor = current.color;
  }
  if (hudPlayerName) hudPlayerName.textContent = current.name;
  if (hudPlayerBalance) hudPlayerBalance.textContent = formatCurrency(current.money);

  const isHuman = !current.isAI;
  const isReady = state.phase === 'READY_TO_ROLL';
  const isEnded = state.phase === 'TURN_ENDED';

  const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  const nextPlayer = state.players[nextPlayerIndex];

  const isOnline = !!currentOnlineRoom;
  const isMyTurn = !isOnline || (currentOnlinePlayer && current.id === currentOnlinePlayer.id);

  if (turnBadge) {
    if (current.isAI) {
      turnBadge.textContent = `Giliran ${current.name} (Bot AI)`;
      turnBadge.style.backgroundColor = `${current.color}22`;
      turnBadge.style.borderColor = `${current.color}66`;
      turnBadge.style.color = current.color;
      turnBadge.className = 'text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm';
    } else {
      turnBadge.textContent = isMyTurn ? `Giliran Anda (${current.name})` : `Giliran: ${current.name}`;
      turnBadge.style.backgroundColor = `${current.color}22`;
      turnBadge.style.borderColor = `${current.color}66`;
      turnBadge.style.color = current.color;
      turnBadge.className = 'text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm animate-pulse';
    }
  }

  if (btnRollDice) {
    if (isHuman && isReady && !isAnimating) {
      if (isMyTurn) {
        btnRollDice.disabled = false;
        btnRollDice.innerHTML = `<span class="w-5 h-5 inline-block">${GameIcons.dice}</span><span>KOCOK DADU (${current.name.toUpperCase()})</span>`;
        btnRollDice.className = 'w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 font-black text-sm tracking-wider shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-outfit';
      } else {
        btnRollDice.disabled = true;
        btnRollDice.innerHTML = `<span class="w-5 h-5 inline-block animate-spin">${GameIcons.hourglass}</span><span>MENUNGGU GILIRAN ${current.name.toUpperCase()}...</span>`;
        btnRollDice.className = 'w-full py-3.5 rounded-xl bg-zinc-800/80 text-zinc-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-not-allowed font-outfit border border-zinc-700';
      }
      if (btnEndTurn) btnEndTurn.classList.add('hidden');
    } else if (isHuman && isEnded && !isAnimating) {
      if (isMyTurn) {
        btnRollDice.disabled = false;
        btnRollDice.innerHTML = `<span class="w-5 h-5 inline-block">${GameIcons.next}</span><span>GILIRAN ${nextPlayer.name.toUpperCase()} (LANJUT)</span>`;
        btnRollDice.className = 'w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-zinc-950 font-black text-sm tracking-wider shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer animate-bounce-gentle font-outfit';
      } else {
        btnRollDice.disabled = true;
        btnRollDice.innerHTML = `<span class="w-5 h-5 inline-block animate-spin">${GameIcons.hourglass}</span><span>MENUNGGU ${current.name.toUpperCase()} SELESAI...</span>`;
        btnRollDice.className = 'w-full py-3.5 rounded-xl bg-zinc-800/80 text-zinc-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-not-allowed font-outfit border border-zinc-700';
      }
      if (btnEndTurn) btnEndTurn.classList.add('hidden');
    } else if (isHuman && state.phase === 'ACTION_REQUIRED' && !isAnimating) {
      if (isMyTurn) {
        btnRollDice.disabled = false;
        btnRollDice.innerHTML = `<span class="w-5 h-5 inline-block">${GameIcons.house}</span><span>PILIH AKSI PROPERTI</span>`;
        btnRollDice.className = 'w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 font-black text-sm tracking-wider shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-outfit animate-pulse';
      } else {
        btnRollDice.disabled = true;
        btnRollDice.innerHTML = `<span class="w-5 h-5 inline-block animate-spin">${GameIcons.hourglass}</span><span>MENUNGGU ${current.name.toUpperCase()}...</span>`;
        btnRollDice.className = 'w-full py-3.5 rounded-xl bg-zinc-800/80 text-zinc-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-not-allowed font-outfit border border-zinc-700';
      }
      if (btnEndTurn) btnEndTurn.classList.add('hidden');
    } else {
      btnRollDice.disabled = true;
      btnRollDice.innerHTML = `<span class="w-5 h-5 inline-block">${GameIcons.dice}</span><span>KOCOK DADU</span>`;
      btnRollDice.className = 'w-full py-3.5 rounded-xl bg-zinc-800 text-zinc-500 font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-not-allowed font-outfit';
      if (btnEndTurn) btnEndTurn.classList.add('hidden');
    }
  }

  if (jailActions && btnPayJailFine && btnUseJailCard) {
    if (isHuman && isMyTurn && current.inJail && isReady) {
      jailActions.classList.remove('hidden');
      btnPayJailFine.disabled = current.money < 1500000;
      if (current.getOutOfJailFreeCards > 0) {
        btnUseJailCard.classList.remove('hidden');
      } else {
        btnUseJailCard.classList.add('hidden');
      }
    } else {
      jailActions.classList.add('hidden');
    }
  }

  const prompt = document.getElementById('centerPrompt');
  const btnCenterTap = document.getElementById('btnCenterTapDice');
  if (btnCenterTap) {
    if (current.isAI) {
      btnCenterTap.textContent = 'GILIRAN BOT AI...';
      btnCenterTap.disabled = true;
    } else if (!isMyTurn) {
      btnCenterTap.textContent = `MENUNGGU ${current.name.toUpperCase()}...`;
      btnCenterTap.disabled = true;
    } else if (state.phase === 'READY_TO_ROLL' && !isAnimating) {
      btnCenterTap.textContent = 'TAP DICE TO ROLL';
      btnCenterTap.disabled = false;
    } else if (state.phase === 'TURN_ENDED' && !isAnimating) {
      btnCenterTap.textContent = `LANJUT KE ${nextPlayer.name.toUpperCase()}`;
      btnCenterTap.disabled = false;
    } else if (state.phase === 'ACTION_REQUIRED' && !isAnimating) {
      btnCenterTap.textContent = 'PILIH AKSI PROPERTI';
      btnCenterTap.disabled = !isMyTurn;
    } else {
      btnCenterTap.textContent = 'PILIH AKSI PROPERTI';
      btnCenterTap.disabled = true;
    }
  }

  if (prompt) {
    let promptMsg = '';
    if (state.phase === 'READY_TO_ROLL') {
      promptMsg = `Giliran ${current.name} melempar dadu`;
    } else if (state.phase === 'ACTION_REQUIRED') {
      promptMsg = `${current.name} sedang mengambil keputusan properti`;
    } else if (state.phase === 'TURN_ENDED') {
      promptMsg = `Giliran ${current.name} selesai. Lanjut ke ${nextPlayer.name}`;
    } else {
      promptMsg = `Permainan Sedang Berlangsung`;
    }
    prompt.innerHTML = `<span class="turn-dot-indicator"></span><span id="centerPromptText">${promptMsg}</span>`;
  }

  try { updatePlayersList(); } catch (e) { console.error('updatePlayersList error:', e); }
  try { renderLogs(); } catch (e) { console.error('renderLogs error:', e); }
  try { processFinancialLogs(state.logs); } catch (e) { console.error('processFinancialLogs error:', e); }
  try { updatePortfolio(); } catch (e) { console.error('updatePortfolio error:', e); }
  try { updateTradingWidget(); } catch (e) { console.error('updateTradingWidget error:', e); }
  try { syncChatsFromState(); } catch (e) { console.error('syncChatsFromState error:', e); }
  try { checkModals(); } catch (e) { console.error('checkModals error:', e); }

  if (current.isAI && !isBotRunning && state.phase !== 'GAME_OVER') {
    // Di mode online, hanya host yang memproses giliran bot agar tidak dobel
    if (!currentOnlineRoom || (currentOnlinePlayer && currentOnlinePlayer.isHost)) {
      runBotTurn();
    }
  }
}

// Update Players List
function updatePlayersList() {
  if (!playersListContainer || !state) return;
  playersListContainer.innerHTML = '';
  const current = state.players[state.currentPlayerIndex];
  const humanPlayer = getCurrentHumanPlayer();

  state.players.forEach(p => {
    const isCurrent = current && p.id === current.id;
    const isBankrupt = p.isBankrupt;
    const isSelf = currentOnlineRoom && currentOnlinePlayer && p.id === currentOnlinePlayer.id;
    const isHumanSelf = humanPlayer && p.id === humanPlayer.id;
    const isOpponent = !isBankrupt && !isHumanSelf && !(currentOnlineRoom && isSelf);

    const el = document.createElement('div');
    el.className = `p-2 sm:p-2.5 rounded-xl border transition flex items-center justify-between gap-1.5 ${isCurrent ? 'bg-amber-950/40 border-amber-500/60 shadow-md' : 'bg-zinc-800/60 border-zinc-700/60'} ${isBankrupt ? 'opacity-40 grayscale' : ''}`;

    el.innerHTML = `
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <div class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-inner shrink-0">
          ${getChessPawnSVG(p.color, p.id)}
        </div>
        <div class="min-w-0 flex-1">
          <div class="font-bold text-xs text-white flex items-center gap-1 truncate">
            <span class="truncate">${p.name}</span>
            ${isSelf || isHumanSelf ? '<span class="text-[8.5px] bg-amber-500 text-zinc-950 px-1 rounded font-black shrink-0">Anda</span>' : ''}
            ${p.isAI ? '<span class="text-[8.5px] bg-zinc-700 text-gray-300 px-1 rounded font-semibold shrink-0">Bot</span>' : ''}
            ${p.inJail ? '<span class="text-[8.5px] bg-red-900 text-red-300 px-1 rounded font-semibold shrink-0">Penjara</span>' : ''}
            ${isBankrupt ? '<span class="text-[8.5px] bg-red-800 text-white px-1 rounded font-bold shrink-0">BANGKRUT</span>' : ''}
          </div>
          <div class="text-[11px] font-semibold text-emerald-400">${formatCurrency(p.money)}</div>
        </div>
      </div>
      <div class="flex items-center gap-1 shrink-0">
        ${isOpponent ? `
          <button type="button" class="btn-player-quick-trade px-1.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-rose-950 border border-zinc-700/80 hover:border-rose-500/50 text-rose-300 hover:text-white transition cursor-pointer active:scale-95 flex items-center gap-1 font-outfit text-[10px] font-bold shadow-sm" data-player-id="${p.id}" title="Ajak trading barter aset dengan ${p.name}">
            <span>🤝</span>
            <span class="hidden sm:inline">Trade</span>
          </button>
        ` : ''}
        ${isCurrent && !isBankrupt ? '<span class="text-[9.5px] text-amber-400 font-extrabold animate-pulse bg-amber-950/60 border border-amber-500/40 px-1.5 py-0.5 rounded-md">AKTIF</span>' : ''}
      </div>
    `;

    const tradeBtn = el.querySelector('.btn-player-quick-trade');
    if (tradeBtn) {
      tradeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTradingDesk(p.id);
      });
    }

    playersListContainer.appendChild(el);
  });
}

// Render Logs
function renderLogs() {
  if (logsBadgeCount && state && state.logs) {
    logsBadgeCount.textContent = state.logs.length;
  }
  if (!gameLogsList || !state || !state.logs) return;
  gameLogsList.innerHTML = '';

  if (state.logs.length === 0) {
    gameLogsList.innerHTML = `
      <div class="text-zinc-500 text-center py-6 text-xs flex flex-col items-center justify-center gap-1.5">
        <svg class="w-6 h-6 text-zinc-600 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        <span>Belum ada catatan aktivitas permainan.</span>
      </div>
    `;
    return;
  }

  state.logs.forEach(log => {
    const item = document.createElement('div');
    let colorClass = 'text-zinc-100 bg-[#1e2029] border-zinc-700';
    if (log.type === 'success') colorClass = 'text-emerald-200 bg-[#0c281e] border-emerald-600/70';
    else if (log.type === 'warning') colorClass = 'text-amber-200 bg-[#2d1b06] border-amber-500/70';
    else if (log.type === 'danger') colorClass = 'text-red-200 bg-[#2d0e0e] border-red-500/70';
    else if (log.type === 'highlight') colorClass = 'text-yellow-100 bg-[#332408] border-yellow-400/80 font-bold';

    item.className = `p-2.5 rounded-xl border text-xs leading-snug flex items-start gap-2.5 shadow-md ${colorClass}`;
    item.innerHTML = `
      <span class="text-[10px] text-amber-400 font-mono font-bold mt-0.5 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">${log.time}</span>
      <span class="flex-1 font-medium">${log.message}</span>
    `;
    gameLogsList.appendChild(item);
  });
}

// Helper Penentu Monopoli Satu Kelompok Warna
const PROPERTY_GROUPS = window.PROPERTY_GROUPS || {
  brown: [1, 3],
  cyan: [6, 8, 9],
  pink: [11, 13, 14],
  orange: [16, 18, 19],
  red: [21, 23, 24],
  yellow: [26, 27, 29],
  green: [31, 32, 34],
  darkblue: [37, 39],
  railroad: [5, 15, 25, 35],
  utility: [12, 28]
};

function isColorGroupMonopoly(groupKey, playerId) {
  if (!groupKey || !PROPERTY_GROUPS[groupKey] || !state || !state.properties) return false;
  const spaceIds = PROPERTY_GROUPS[groupKey];
  return spaceIds.every(id => state.properties[id] && state.properties[id].ownerId === playerId);
}

// Helper Menghitung Nilai Sewa Cepat untuk Kartu Portofolio
function getQuickRent(space, prop) {
  if (!space || !prop || prop.ownerId === null || prop.ownerId === undefined) return 0;
  if (space.type === 'property') {
    if (prop.isHotel) return (space.rent && space.rent[5] !== undefined) ? space.rent[5] : Math.round((space.price || 0) * 6.0);
    if (prop.houses > 0) return (space.rent && space.rent[prop.houses] !== undefined) ? space.rent[prop.houses] : Math.round((space.price || 0) * 1.5);
    return (space.rent && space.rent[0] !== undefined) ? space.rent[0] : Math.round((space.price || 0) * 0.1);
  }
  if (space.type === 'railroad') {
    return (space.rent && space.rent[0] !== undefined) ? space.rent[0] : 250000;
  }
  if (space.type === 'utility') {
    return (space.rent && space.rent[0] !== undefined) ? space.rent[0] : 150000;
  }
  return 0;
}

// Update Portfolio Tab & Property Deed Grid
function updatePortfolio() {
  if (!portfolioList || !state) return;
  const current = state.players[state.currentPlayerIndex];
  if (!current) return;

  const currentHuman = getCurrentHumanPlayer();
  const isMultiplayerOnline = Boolean(currentOnlineRoom && currentOnlinePlayer);

  // Tentukan pemain mana yang sedang dilihat portofolionya
  let viewedPlayer;
  if (isMultiplayerOnline) {
    viewedPlayer = currentHuman || state.players[0];
    selectedPortfolioPlayerId = viewedPlayer.id;
  } else {
    viewedPlayer = state.players.find(p => p.id === selectedPortfolioPlayerId && !p.isBankrupt);
    if (!viewedPlayer) {
      viewedPlayer = current;
      selectedPortfolioPlayerId = viewedPlayer.id;
    }
  }

  // Render Tabs Pemain
  if (portfolioPlayerTabs) {
    portfolioPlayerTabs.innerHTML = '';
    if (isMultiplayerOnline) {
      // Khusus Multiplayer Online: Hanya tampilkan tab aset sendiri
      const pProps = BOARD_SPACES.filter(s => state.properties[s.id] && state.properties[s.id].ownerId === viewedPlayer.id);
      const tabBtn = document.createElement('div');
      tabBtn.className = 'px-2.5 py-1 rounded-lg font-black text-[10px] bg-gradient-to-r from-amber-500 to-yellow-400 text-zinc-950 border border-amber-300 shadow-sm flex items-center gap-1.5';
      tabBtn.innerHTML = `
        <span class="w-2 h-2 rounded-full inline-block shrink-0" style="background-color: ${viewedPlayer.color}"></span>
        <span class="truncate">Aset Saya (${viewedPlayer.name})</span>
        <span class="px-1.5 py-0.2 rounded-full bg-black/25 text-zinc-950 font-black text-[8.5px]">${pProps.length}</span>
      `;
      portfolioPlayerTabs.appendChild(tabBtn);
    } else {
      state.players.forEach(p => {
        if (p.isBankrupt) return;
        const pProps = BOARD_SPACES.filter(s => state.properties[s.id] && state.properties[s.id].ownerId === p.id);
        const isSelected = p.id === viewedPlayer.id;
        
        const tabBtn = document.createElement('button');
        tabBtn.type = 'button';
        tabBtn.className = `px-2.5 py-1 rounded-lg font-bold text-[10px] transition shrink-0 flex items-center gap-1.5 cursor-pointer border ${
          isSelected 
            ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-zinc-950 border-amber-300 shadow-sm font-black' 
            : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 border-zinc-700'
        }`;
        
        tabBtn.innerHTML = `
          <span class="w-2 h-2 rounded-full inline-block shrink-0" style="background-color: ${p.color}"></span>
          <span class="truncate">${p.name.split(' ')[0]}</span>
          <span class="px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/25 text-zinc-950 font-black' : 'bg-zinc-900 text-amber-300'} text-[8.5px]">${pProps.length}</span>
        `;
        
        tabBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectedPortfolioPlayerId = p.id;
          updatePortfolio();
        });
        
        portfolioPlayerTabs.appendChild(tabBtn);
      });
    }
  }

  // Dapatkan Properti yang Dimiliki Pemain Terpilih
  const ownedProps = BOARD_SPACES.filter(s => {
    const prop = state.properties[s.id];
    return prop && prop.ownerId === viewedPlayer.id;
  });

  // Hitung Total Nilai Aset Portofolio
  let totalValuation = 0;
  ownedProps.forEach(s => {
    const p = state.properties[s.id];
    totalValuation += (s.price || 0);
    if (p.houses > 0 && s.housePrice) totalValuation += (p.houses * s.housePrice);
    if (p.isHotel && s.housePrice) totalValuation += (5 * s.housePrice);
  });

  if (portfolioStatsBadge) {
    portfolioStatsBadge.textContent = `${ownedProps.length} Kartu • ${formatShortPrice(totalValuation)}`;
  }

  if (ownedProps.length === 0) {
    portfolioList.innerHTML = `
      <div class="col-span-2 text-gray-500 text-center py-8 text-xs flex flex-col items-center justify-center gap-1.5">
        <div class="w-8 h-8 opacity-40">${GameIcons.house}</div>
        <span class="font-medium">${viewedPlayer.name} belum memiliki kartu properti.</span>
      </div>
    `;
    updateTradingWidget();
    return;
  }

  portfolioList.innerHTML = '';
  ownedProps.forEach(space => {
    const prop = state.properties[space.id];
    const card = document.createElement('div');
    card.className = `group relative rounded-xl overflow-hidden bg-[#faf8f4] border-2 border-[#d5cbbe] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-150 cursor-pointer flex flex-col justify-between active:scale-95 select-none text-center h-[78px] min-h-[78px]`;
    card.title = `Klik untuk kelola ${space.name}`;

    card.innerHTML = `
      <!-- Top Colored Stripe with Level Indicators -->
      <div class="h-4.5 w-full flex items-center justify-between px-1.5 shadow-inner shrink-0" style="background-color: ${space.color || '#475569'}">
        <span class="text-[7.5px] font-black tracking-wider text-white drop-shadow font-outfit uppercase truncate">
          ${space.group ? space.group.toUpperCase() : 'ASET'}
        </span>
        ${prop.isHotel ? `
          <span class="flex items-center gap-0.5 bg-red-950 text-red-200 px-1 py-0.2 rounded text-[6.5px] font-bold border border-red-400/60 shrink-0">
            <span class="w-2 h-2 inline-block">${GameIcons.hotel}</span> 1H
          </span>
        ` : (prop.houses > 0 ? `
          <span class="flex items-center gap-0.5 bg-emerald-950 text-emerald-200 px-1 py-0.2 rounded text-[6.5px] font-bold border border-emerald-400/60 shrink-0">
            <span class="w-2 h-2 inline-block">${GameIcons.house}</span> ${prop.houses}
          </span>
        ` : '')}
      </div>
      
      <!-- Card Body: Clean Prominent Title -->
      <div class="px-1.5 py-1 text-center flex flex-col items-center justify-center flex-1 bg-gradient-to-b from-[#faf8f4] to-[#f2ece0] min-h-0">
        <div class="font-extrabold text-[11.5px] text-zinc-900 font-outfit leading-tight truncate w-full" title="${space.name}">
          ${space.name}
        </div>
      </div>

      <!-- Bottom Rent Status -->
      <div class="px-1.5 py-0.5 bg-[#ebe3d3] border-t border-[#d8cdb8] flex items-center justify-between text-[8px] shrink-0 font-outfit">
        <span class="text-zinc-600 font-semibold truncate">Sewa:</span>
        <span class="text-emerald-800 font-black">${formatCurrency(getQuickRent(space, prop))}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      showTitleDeed(space);
    });

    portfolioList.appendChild(card);
  });

  if (portfolioScrollHint) {
    if (ownedProps.length >= 9 || portfolioList.scrollHeight > portfolioList.clientHeight + 5) {
      portfolioScrollHint.classList.remove('hidden');
      const extraCards = Math.max(1, ownedProps.length - 8);
      const hintText = document.getElementById('portfolioScrollHintText');
      if (hintText) {
        hintText.textContent = `Gulir untuk melihat properti lainnya (${extraCards} lagi)`;
      } else {
        portfolioScrollHint.innerHTML = `<span class="animate-bounce">↓</span> Gulir untuk melihat properti lainnya (${extraCards} lagi)`;
      }
    } else {
      portfolioScrollHint.classList.add('hidden');
    }
  }

  updateTradingWidget();
}

// ==============================================
// SISTEM TRADING SESAMA PEMAIN & NEGOSIASI DESK
// ==============================================

function updateTradingWidget() {
  if (!tradingPartnersStatus || !state) return;
  const humanPlayer = getCurrentHumanPlayer();
  if (!humanPlayer) return;

  const opponents = state.players.filter(p => !p.isBankrupt && p.id !== humanPlayer.id);
  if (opponents.length === 0) {
    tradingPartnersStatus.innerHTML = '<span class="text-zinc-500 text-[9.5px]">Tidak ada lawan</span>';
    return;
  }

  tradingPartnersStatus.innerHTML = opponents.map(op => {
    const pProps = BOARD_SPACES.filter(s => state.properties[s.id] && state.properties[s.id].ownerId === op.id);
    return `
      <button type="button" class="btn-trade-partner px-2 py-0.5 rounded-full bg-zinc-800/90 hover:bg-rose-950 border border-zinc-700/80 hover:border-rose-500/50 text-gray-200 hover:text-white flex items-center gap-1 font-bold text-[9.5px] transition cursor-pointer active:scale-95 shadow-sm" data-player-id="${op.id}" title="Ajak trading dengan ${op.name}">
        <span class="w-1.5 h-1.5 rounded-full inline-block shrink-0" style="background-color: ${op.color}"></span>
        <span class="truncate">${op.name.split(' ')[0]}</span>
        <span class="text-amber-400 font-extrabold">(${pProps.length})</span>
      </button>
    `;
  }).join('');

  tradingPartnersStatus.querySelectorAll('.btn-trade-partner').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = parseInt(btn.dataset.playerId);
      openTradingDesk(pid);
    });
  });
}

function updateTradingDesk() {
  updateTradingWidget();
}

// Entry Point: Mengajak Lawan Trading (Handshake Konfirmasi Pop-up)
async function openTradingDesk(targetPlayerId = null) {
  if (!state || isProcessingAction) return;

  const humanPlayer = getCurrentHumanPlayer();
  const opponents = state.players.filter(p => !p.isBankrupt && p.id !== humanPlayer.id);

  if (opponents.length === 0) {
    Swal.fire({
      title: 'Tidak Ada Lawan',
      text: 'Tidak ada pemain lain yang masih aktif untuk diajak bernegosiasi.',
      icon: 'info',
      customClass: { popup: 'swal2-monopoly-popup' }
    });
    return;
  }

  let selectedOpponentId = targetPlayerId;

  // Jika belum memilih lawan dan ada lebih dari 1 lawan, tanyakan ke pemain ingin trading dengan siapa
  if (selectedOpponentId === null) {
    if (opponents.length === 1) {
      selectedOpponentId = opponents[0].id;
    } else {
      const inputOptions = {};
      opponents.forEach(op => {
        const propCount = BOARD_SPACES.filter(s => state.properties[s.id] && state.properties[s.id].ownerId === op.id).length;
        inputOptions[op.id] = `${op.name} (${formatCurrency(op.money)} - ${propCount} properti)`;
      });

      const { value: chosenId } = await Swal.fire({
        title: '<span class="swal2-monopoly-title">Pilih Lawan Trading</span>',
        input: 'radio',
        inputOptions: inputOptions,
        inputValue: String(opponents[0].id),
        showCancelButton: true,
        confirmButtonText: 'Lanjutkan',
        cancelButtonText: 'Batal',
        customClass: {
          popup: 'swal2-monopoly-popup',
          confirmButton: 'swal2-monopoly-confirm',
          cancelButton: 'swal2-monopoly-cancel'
        },
        buttonsStyling: false
      });

      if (!chosenId) return;
      selectedOpponentId = parseInt(chosenId);
    }
  }

  const targetPlayer = state.players.find(p => p.id === selectedOpponentId);
  if (!targetPlayer) return;

  // 1. Jika Target adalah BOT AI -> Langsung Buka Meja Trading
  if (targetPlayer.isAI) {
    openTradingDeskModal(targetPlayer.id);
    return;
  }

  // 2. Jika Mode Pass & Play (Local PvP tanpa Online Room)
  if (!currentOnlineRoom) {
    const res = await Swal.fire({
      title: `<span class="swal2-monopoly-title">🤝 Ajakan Trading</span>`,
      html: `
        <div class="text-center text-xs text-zinc-300 font-sans space-y-2 py-1">
          <p class="text-sm"><b>${humanPlayer.name}</b> ingin mengajak <b>${targetPlayer.name}</b> untuk melakukan trading aset.</p>
          <p class="text-zinc-400 text-[11px]">Apakah <b>${targetPlayer.name}</b> menerima ajakan trading ini?</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Terima & Buka Trading',
      cancelButtonText: 'Tolak',
      customClass: {
        popup: 'swal2-monopoly-popup',
        confirmButton: 'swal2-monopoly-confirm',
        cancelButton: 'swal2-monopoly-cancel'
      },
      buttonsStyling: false
    });

    if (res.isConfirmed) {
      openTradingDeskModal(targetPlayer.id);
    }
    return;
  }

  // 3. Mode Online Multiplayer -> Kirim Ajakan ke Server & Tampilkan Pop-up Menunggu
  isWaitingForTradeInvite = true;
  activeWaitingInviteTargetName = targetPlayer.name;

  Swal.fire({
    title: `<span class="swal2-monopoly-title">Mengirim Ajakan Trading...</span>`,
    html: `
      <div class="text-center text-xs text-zinc-300 font-sans space-y-3 py-2">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-rose-500 border-t-transparent"></div>
        <p>Menunggu konfirmasi persetujuan dari <b class="text-rose-400 font-bold">${targetPlayer.name}</b>...</p>
      </div>
    `,
    showCancelButton: true,
    cancelButtonText: 'Batalkan',
    showConfirmButton: false,
    customClass: {
      popup: 'swal2-monopoly-popup',
      cancelButton: 'swal2-monopoly-cancel'
    },
    buttonsStyling: false,
    allowOutsideClick: false
  }).then(async (result) => {
    if (result.dismiss === Swal.DismissReason.cancel) {
      isWaitingForTradeInvite = false;
      await apiCall('/api/game/trade-invite-cancel', { playerId: humanPlayer.id }, 'POST');
    }
  });

  await apiCall('/api/game/trade-invite', {
    fromPlayerId: humanPlayer.id,
    toPlayerId: targetPlayer.id
  }, 'POST');
}

// Meja Trading (Bilik Negosiasi & Barter Aset)
function openTradingDeskModal(targetPlayerId) {
  if (!state) return;
  const humanPlayer = getCurrentHumanPlayer();
  const opponents = state.players.filter(p => !p.isBankrupt && p.id !== humanPlayer.id);
  if (opponents.length === 0) return;

  let selectedOpponentId = targetPlayerId !== null && opponents.some(o => o.id === targetPlayerId) 
    ? targetPlayerId 
    : opponents[0].id;

  let offerCash = 0;
  let offerPropertyIds = new Set();

  function renderTradeDeskModal() {
    const opponent = state.players.find(p => p.id === selectedOpponentId);
    if (!opponent) return;

    const myProps = BOARD_SPACES.filter(s => state.properties[s.id] && state.properties[s.id].ownerId === humanPlayer.id);
    const oppProps = BOARD_SPACES.filter(s => state.properties[s.id] && state.properties[s.id].ownerId === opponent.id);

    // Chess Pawn SVG Generator (Clean 3D Vector)
    const renderPawn = (color) => `
      <svg class="w-8 h-8 shrink-0 drop-shadow-md" viewBox="0 0 24 24">
        <defs>
          <radialGradient id="pawnGlow_${color.replace('#','')}" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
            <stop offset="35%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.7"/>
          </radialGradient>
        </defs>
        <path d="M12 2a3.5 3.5 0 0 0-3.5 3.5c0 1.2.6 2.3 1.5 2.9-.3.4-.6.9-.8 1.4h5.6c-.2-.5-.5-1-.8-1.4.9-.6 1.5-1.7 1.5-2.9A3.5 3.5 0 0 0 12 2zm-3 9.5c-.8.8-1.5 2-1.8 3.5h9.6c-.3-1.5-1-2.7-1.8-3.5H9zm-3.5 5.5c-.8 0-1.5.7-1.5 1.5v1.5h16v-1.5c0-.8-.7-1.5-1.5-1.5H5.5z" fill="url(#pawnGlow_${color.replace('#','')})" stroke="#1f1006" stroke-width="0.7"/>
      </svg>
    `;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate__animated animate__fadeIn animate__faster">
        <div class="bg-[#1f0e05] border-[4px] border-[#f59e0b] rounded-[32px] max-w-xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] p-5 sm:p-6 text-white flex flex-col font-sans select-none relative max-h-[92vh]">
          
          <!-- Header: Golden Handshake + "Trade" Title -->
          <div class="flex items-center justify-center gap-2 mb-4">
            <svg class="w-7 h-7 text-amber-400 shrink-0 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 7.5L16.2 4.2c-.4-.4-1-.4-1.4 0l-3.3 3.3-1.4-1.4c-.4-.4-1-.4-1.4 0L4.5 10.3c-.4.4-.4 1 0 1.4l5.3 5.3c.4.4 1 .4 1.4 0l1.4-1.4 3.3 3.3c.4.4 1 .4 1.4 0l3.3-3.3c.4-.4.4-1 0-1.4l-1.4-1.4 1.7-1.7c.4-.4.4-1 0-1.4l-1.4-1.4 1.4-1.4c.4-.4.4-1 0-1.4z"/>
            </svg>
            <h2 class="font-black text-2xl sm:text-3xl text-amber-400 font-outfit tracking-wide">Meja Trading</h2>
          </div>

          <!-- Main 2-Panel Trade Section -->
          <div class="flex items-center gap-2 sm:gap-3 flex-1 min-h-0">
            
            <!-- Panel Kiri: AKUN SENDIRI (Pemain 1 / Anda) -->
            <div class="flex-1 bg-[#140a04] border-2 border-amber-600/60 rounded-2xl p-3 sm:p-3.5 flex flex-col h-[340px] shadow-lg">
              
              <!-- Player Info Header (Anda) -->
              <div class="flex items-center gap-2.5 pb-2 border-b border-amber-900/40">
                ${renderPawn(humanPlayer.color || '#ef4444')}
                <div class="flex-1 min-w-0">
                  <div class="font-black text-sm text-amber-400 font-outfit truncate flex items-center gap-1">
                    <span>${humanPlayer.name}</span>
                    <span class="text-[9px] bg-amber-500 text-zinc-950 px-1 rounded font-black">ANDA</span>
                  </div>
                  <div class="text-xs text-emerald-400 font-semibold">${formatCurrency(humanPlayer.money)}</div>
                </div>
              </div>

              <!-- Money Box (Anda Tawarkan) -->
              <div class="bg-[#0a0502] border border-amber-500/50 rounded-xl px-3 py-2 flex items-center justify-between mt-2 shadow-inner">
                <span class="text-amber-400 font-black text-xs font-outfit shrink-0">Beri Rp</span>
                <input type="text" inputmode="numeric" pattern="[0-9]*" id="inputOfferCash" value="${offerCash || 0}" class="bg-transparent text-amber-300 font-black text-base sm:text-lg font-mono text-right w-full outline-none px-1" placeholder="0">
              </div>

              <!-- PROPERTIES Section (Aset Anda Yang Ditawarkan) -->
              <div class="mt-2 flex-1 flex flex-col min-h-0">
                <div class="text-[9.5px] font-black tracking-widest text-amber-400 text-center mb-1 uppercase font-outfit flex items-center justify-center gap-1">
                  <span>ASET ANDA</span>
                  <span class="text-[8.5px] text-zinc-400 font-normal">(PILIH DIBERIKAN)</span>
                </div>
                <div class="flex-1 overflow-y-auto space-y-1.5 trade-scroll-area pr-1">
                  ${myProps.length === 0 ? `
                    <div class="h-full flex items-center justify-center italic text-stone-500 text-xs font-medium text-center px-2">Anda belum memiliki kartu properti</div>
                  ` : myProps.map(space => {
                    const isSelected = offerPropertyIds.has(space.id);
                    return `
                      <div class="trade-card-select ${isSelected ? 'selected' : ''}" data-type="offer" data-space-id="${space.id}">
                        <div class="flex items-center gap-2">
                          <div class="w-2.5 h-6 rounded-sm shrink-0" style="background-color: ${space.color || '#64748b'}"></div>
                          <div class="flex-1 min-w-0 text-left">
                            <div class="font-bold text-xs text-white truncate font-outfit">${space.name}</div>
                            <div class="text-[10px] text-stone-400">${formatShortPrice(space.price)}</div>
                          </div>
                          ${isSelected ? '<svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : ''}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

            </div>

            <!-- Center Exchange Arrow -->
            <div class="flex flex-col items-center justify-center text-amber-400 text-lg font-black shrink-0 px-0.5">
              <span>⇄</span>
              <span class="text-[8.5px] text-amber-500/80 font-bold uppercase tracking-tighter">BARTER</span>
            </div>

            <!-- Panel Kanan: AKUN MUSUH / LAWAN -->
            <div class="flex-1 bg-[#140a04] border border-[#3b1d0e] rounded-2xl p-3 sm:p-3.5 flex flex-col h-[340px]">
              
              <!-- Player Info Header (Musuh) -->
              <div class="flex items-center gap-2.5 pb-2 border-b border-stone-800/60">
                ${renderPawn(opponent.color || '#0284c7')}
                <div class="flex-1 min-w-0">
                  ${opponents.length > 1 ? `
                    <select id="selectTradeOpponent" class="bg-transparent text-sky-400 font-black text-sm font-outfit cursor-pointer outline-none border-b border-sky-500/30 pb-0.5 w-full truncate">
                      ${opponents.map(op => `
                        <option value="${op.id}" class="bg-[#140a04] text-white" ${op.id === opponent.id ? 'selected' : ''}>
                          ${op.name} ${op.isAI ? '(Bot)' : ''}
                        </option>
                      `).join('')}
                    </select>
                  ` : `
                    <div class="font-black text-sm text-sky-400 font-outfit truncate">${opponent.name} ${opponent.isAI ? '<span class="text-[9px] bg-zinc-800 text-sky-300 px-1 py-0.2 rounded font-bold">Bot</span>' : ''}</div>
                  `}
                  <div class="text-xs text-stone-400 font-medium">${formatCurrency(opponent.money)}</div>
                </div>
              </div>

              <!-- Money Box (Musuh Tentukan Sendiri) -->
              <div class="bg-[#0a0502]/60 border border-[#3b1d0e]/60 rounded-xl px-3 py-2 flex items-center justify-between mt-2 opacity-75 select-none" title="Uang ditentukan oleh musuh">
                <span class="text-amber-400/60 font-black text-xs font-outfit shrink-0">Kas Musuh</span>
                <span class="text-stone-400 text-[11px] italic font-medium">Musuh yg tentukan</span>
              </div>

              <!-- PROPERTIES Section (Aset Milik Musuh) -->
              <div class="mt-2 flex-1 flex flex-col min-h-0">
                <div class="text-[9.5px] font-black tracking-widest text-sky-400 text-center mb-1 uppercase font-outfit flex items-center justify-center gap-1">
                  <span>ASET LAWAN</span>
                  <span class="text-[8.5px] text-zinc-400 font-normal">(DIPILIH LAWAN)</span>
                </div>
                <div class="flex-1 overflow-y-auto space-y-1.5 trade-scroll-area pr-1">
                  ${oppProps.length === 0 ? `
                    <div class="h-full flex items-center justify-center italic text-stone-500 text-xs font-medium text-center px-2">Lawan belum memiliki kartu properti</div>
                  ` : oppProps.map(space => {
                    return `
                      <div class="trade-card-readonly" title="Properti milik ${opponent.name} (Hanya dapat dipilih oleh lawan)">
                        <div class="flex items-center gap-2">
                          <div class="w-2.5 h-6 rounded-sm shrink-0" style="background-color: ${space.color || '#64748b'}"></div>
                          <div class="flex-1 min-w-0 text-left">
                            <div class="font-bold text-xs text-stone-300 truncate font-outfit">${space.name}</div>
                            <div class="text-[10px] text-stone-500">${formatShortPrice(space.price)}</div>
                          </div>
                          <span class="text-[9px] text-stone-500 font-bold">🔒</span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
                <div class="text-[9px] text-amber-500/80 font-bold text-center bg-amber-950/30 border border-amber-500/20 rounded-md py-0.5 mt-1">
                  🔒 Lawan sendiri yang menentukan imbalan
                </div>
              </div>

            </div>

          </div>

          <!-- Bottom Action Buttons: Ajukan Tawaran & Batal -->
          <div class="flex items-center gap-3 mt-4 pt-1">
            <button id="btnSubmitTradeDesk" class="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-b from-[#22c55e] to-[#15803d] border border-[#16a34a] text-white font-black text-lg sm:text-xl font-outfit shadow-[0_5px_0_#14532d] hover:brightness-110 active:translate-y-1 active:shadow-[0_1px_0_#14532d] transition-all cursor-pointer text-center">
              Ajukan Tawaran
            </button>
            <button id="btnCancelTradeDesk" class="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-b from-[#4a2612] to-[#281308] border border-[#5c3017] text-[#fed7aa] font-black text-lg sm:text-xl font-outfit shadow-[0_5px_0_#150903] hover:brightness-110 active:translate-y-1 active:shadow-[0_1px_0_#150903] transition-all cursor-pointer text-center">
              Tutup
            </button>
          </div>

        </div>
      </div>
    `;

    modalContainer.classList.remove('hidden');
    isModalOpen = true;

    document.getElementById('btnCancelTradeDesk')?.addEventListener('click', () => {
      isModalOpen = false;
      closeModal();
    });

    document.getElementById('selectTradeOpponent')?.addEventListener('change', (e) => {
      selectedOpponentId = parseInt(e.target.value);
      renderTradeDeskModal();
    });

    document.getElementById('inputOfferCash')?.addEventListener('input', (e) => {
      const clean = e.target.value.replace(/\D/g, '');
      let val = parseInt(clean) || 0;
      if (val < 0) val = 0;
      if (val > humanPlayer.money) val = humanPlayer.money;
      offerCash = val;
      e.target.value = val === 0 && clean === '' ? '' : val;
    });

    // Hanya kartu di sisi KIRI (Aset Anda) yang dapat diklik
    document.querySelectorAll('.trade-card-select').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.dataset.type;
        const spaceId = parseInt(card.dataset.spaceId);
        if (type === 'offer') {
          if (offerPropertyIds.has(spaceId)) offerPropertyIds.delete(spaceId);
          else offerPropertyIds.add(spaceId);
        }
        renderTradeDeskModal();
      });
    });

    document.getElementById('btnSubmitTradeDesk')?.addEventListener('click', async () => {
      if (offerCash === 0 && offerPropertyIds.size === 0) {
        Swal.fire({
          title: 'Tawaran Masih Kosong',
          text: 'Pilih minimal satu properti milik Anda atau masukkan nominal uang tunai yang ingin Anda berikan kepada lawan.',
          icon: 'warning',
          customClass: { popup: 'swal2-monopoly-popup' }
        });
        return;
      }

      const offerObj = {
        cash: offerCash,
        propertyIds: Array.from(offerPropertyIds),
        jailCards: 0
      };

      isModalOpen = false;
      closeModal();
      await handleProposeTrade(humanPlayer, opponent, offerObj);
    });
  }

  renderTradeDeskModal();
}

// Handler Pengajuan Proposal Barter ke Lawan (Bot AI / Pemain Manusia)
async function handleProposeTrade(fromPlayer, toPlayer, offer) {
  if (isProcessingAction) return;
  isProcessingAction = true;

  try {
    if (toPlayer.isAI) {
      const evaluation = evaluateAndPickBotTrade(toPlayer, fromPlayer, offer, state);
      
      if (evaluation.accept) {
        const offerPropNames = (offer.propertyIds || []).map(pid => BOARD_SPACES.find(s => s.id === pid)?.name || '').filter(Boolean);
        const botPropNames = (evaluation.chosenPropertyIds || []).map(pid => BOARD_SPACES.find(s => s.id === pid)?.name || '').filter(Boolean);

        let youGiveList = [];
        if (offerPropNames.length) youGiveList.push(`🏢 Properti: <b class="text-white">${offerPropNames.join(', ')}</b>`);
        if (offer.cash > 0) youGiveList.push(`💰 Uang Tunai: <b class="text-amber-400">${formatCurrency(offer.cash)}</b>`);

        let botGivesList = [];
        if (botPropNames.length) botGivesList.push(`🏢 Properti: <b class="text-white">${botPropNames.join(', ')}</b>`);
        if (evaluation.chosenCash > 0) botGivesList.push(`💰 Uang Tunai: <b class="text-emerald-400">${formatCurrency(evaluation.chosenCash)}</b>`);

        const swalRes = await Swal.fire({
          title: `<span class="swal2-monopoly-title">🤝 Tawaran Disetujui ${toPlayer.name}!</span>`,
          html: `
            <div class="text-left text-xs text-zinc-300 font-sans space-y-3 py-1">
              <div class="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-200 text-center font-medium">
                <b>${toPlayer.name}:</b> "${evaluation.message}"
              </div>
              <div class="grid grid-cols-2 gap-2 mt-2">
                <div class="p-2.5 bg-[#140a04] rounded-xl border border-amber-600/40">
                  <div class="font-bold text-amber-400 mb-1 text-[11px]">Anda Menyerahkan:</div>
                  <div class="space-y-0.5 text-[11px]">${youGiveList.length ? youGiveList.join('<br>') : 'Tidak ada'}</div>
                </div>
                <div class="p-2.5 bg-[#140a04] rounded-xl border border-emerald-600/40">
                  <div class="font-bold text-emerald-400 mb-1 text-[11px]">${toPlayer.name} Memberikan:</div>
                  <div class="space-y-0.5 text-[11px]">${botGivesList.length ? botGivesList.join('<br>') : 'Tidak ada'}</div>
                </div>
              </div>
              <p class="text-center text-zinc-400 text-[11px] pt-1">Apakah Anda menyetujui pertukaran barter ini?</p>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Setuju & Barter',
          cancelButtonText: 'Batal',
          customClass: {
            popup: 'swal2-monopoly-popup',
            confirmButton: 'swal2-monopoly-confirm',
            cancelButton: 'swal2-monopoly-cancel'
          },
          buttonsStyling: false
        });

        if (swalRes.isConfirmed) {
          sound.playCash();
          triggerConfetti({ particleCount: 50, spread: 80 });
          const requestObj = {
            cash: evaluation.chosenCash || 0,
            propertyIds: evaluation.chosenPropertyIds || [],
            jailCards: 0
          };
          await executeTrade(fromPlayer.id, toPlayer.id, offer, requestObj);
        }
      } else {
        await Swal.fire({
          title: '<span class="text-amber-400 font-outfit">Tawaran Ditolak</span>',
          html: `
            <div class="text-left text-xs text-zinc-300 font-sans space-y-2">
              <div class="p-3 bg-zinc-800/80 border border-zinc-700 rounded-xl text-gray-200">
                <b>${toPlayer.name}:</b> "${evaluation.reason}"
              </div>
              <p class="text-center text-gray-400 text-[11px]">
                Tip: Coba tawarkan nominal uang tunai yang lebih tinggi atau sertifikat tanah yang melengkapi warna kelompok Bot.
              </p>
            </div>
          `,
          icon: 'warning',
          confirmButtonText: 'Tutup',
          customClass: { popup: 'swal2-monopoly-popup', confirmButton: 'swal2-monopoly-confirm' },
          buttonsStyling: false
        });
      }
    } else {
      if (currentOnlineRoom) {
        isWaitingForTradeProposal = true;
        Swal.fire({
          title: '<span class="swal2-monopoly-title">Mengirim Proposal Barter...</span>',
          html: `
            <div class="text-center text-xs text-zinc-300 font-sans space-y-3 py-2">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
              <p>Menunggu tanggapan tawaran dari <b class="text-rose-400 font-bold">${toPlayer.name}</b>...</p>
            </div>
          `,
          showCancelButton: true,
          cancelButtonText: 'Batalkan',
          showConfirmButton: false,
          customClass: { popup: 'swal2-monopoly-popup', cancelButton: 'swal2-monopoly-cancel' },
          buttonsStyling: false
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            isWaitingForTradeProposal = false;
            await apiCall('/api/game/trade/cancel', { playerId: fromPlayer.id }, 'POST');
          }
        });

        await apiCall('/api/game/trade/propose', {
          fromPlayerId: fromPlayer.id,
          toPlayerId: toPlayer.id,
          offerPropertyIds: offer.propertyIds || [],
          offerMoney: offer.cash || 0,
          requestPropertyIds: [],
          requestMoney: 0
        }, 'POST');
      } else {
        const res = await showIncomingTradeProposal(fromPlayer, toPlayer, offer, { cash: 0, propertyIds: [], jailCards: 0 });
        if (res.isConfirmed) {
          await executeTrade(fromPlayer.id, toPlayer.id, offer, { cash: 0, propertyIds: [], jailCards: 0 });
        } else {
          Swal.fire({
            title: 'Trading Ditolak',
            text: `${toPlayer.name} menolak tawaran trading Anda.`,
            icon: 'info',
            customClass: { popup: 'swal2-monopoly-popup' }
          });
        }
      }
    }
  } finally {
    isProcessingAction = false;
  }
}

// Algoritma Evaluasi & Pemilihan Aset Balasan oleh Bot AI
function evaluateAndPickBotTrade(botPlayer, humanPlayer, offer, state) {
  const offerCash = offer.cash || 0;
  const offerPropIds = offer.propertyIds || [];

  if (offerCash <= 0 && offerPropIds.length === 0) {
    return {
      accept: false,
      reason: "Anda belum memilih aset atau uang apa pun yang ingin Anda berikan kepada saya."
    };
  }

  // Hitung total nilai tawaran pemain dari sudut pandang Bot
  let botGainValue = offerCash;
  const botOwnedProps = BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === botPlayer.id);

  offerPropIds.forEach(pid => {
    const space = BOARD_SPACES.find(s => s.id === pid);
    if (!space) return;
    let val = space.price || 1000000;

    // Bonus jika melengkapi komplek monopoli bagi Bot
    const groupSpaces = BOARD_SPACES.filter(s => s.group === space.group && s.type === space.type);
    const botOwnedInGroup = groupSpaces.filter(s => state.properties[s.id]?.ownerId === botPlayer.id).length;

    if (botOwnedInGroup === groupSpaces.length - 1) {
      val *= 2.5; // Melengkapi monopoli! Sangat bernilai bagi Bot
    } else if (botOwnedInGroup >= 1) {
      val *= 1.4;
    }

    botGainValue += val;
  });

  // Identifikasi properti Bot yang terlindungi (bagian dari komplek monopoli penuh)
  const botCompletedMonopolies = new Set();
  Object.keys(PROPERTY_GROUPS).forEach(gKey => {
    if (isColorGroupMonopoly(gKey, botPlayer.id)) {
      PROPERTY_GROUPS[gKey].forEach(id => botCompletedMonopolies.add(id));
    }
  });

  // Properti Bot yang bersedia dibarterkan
  const candidateProps = botOwnedProps.filter(s => !botCompletedMonopolies.has(s.id));

  let chosenPropertyIds = [];
  let chosenCash = 0;

  // 1. Jika Pemain Menawarkan Properti (Bisa + Uang)
  if (offerPropIds.length > 0) {
    // Cari properti Bot yang paling seimbang nilainya dengan yang ditawarkan
    const sortedCandidates = [...candidateProps].sort((a, b) => {
      const diffA = Math.abs((a.price || 0) - botGainValue);
      const diffB = Math.abs((b.price || 0) - botGainValue);
      return diffA - diffB;
    });

    if (sortedCandidates.length > 0) {
      const bestProp = sortedCandidates[0];
      const propVal = bestProp.price || 0;

      // Jika nilai properti bot berada di rentang wajar (tidak jauh lebih mahal dari yang didapat Bot)
      if (propVal <= botGainValue * 1.35) {
        chosenPropertyIds.push(bestProp.id);
        // Jika pemain memberi nilai jauh lebih tinggi, Bot tambahkan uang kembalian
        if (botGainValue > propVal + 400000 && botPlayer.money >= 500000) {
          const cashBonus = Math.min(botPlayer.money - 300000, Math.floor((botGainValue - propVal) * 0.7 / 100000) * 100000);
          if (cashBonus > 0) chosenCash = cashBonus;
        }
      } else if (botPlayer.money >= 500000) {
        // Jika properti Bot terlalu mahal, Bot tawarkan uang tunai yang adil untuk membeli properti pemain
        chosenCash = Math.min(botPlayer.money - 300000, Math.floor(botGainValue * 0.95 / 100000) * 100000);
      }
    } else if (botPlayer.money >= 500000) {
      // Bot tidak punya properti bebas, beri uang tunai
      chosenCash = Math.min(botPlayer.money - 300000, Math.floor(botGainValue * 0.95 / 100000) * 100000);
    }
  } else {
    // 2. Jika Pemain Hanya Menawarkan Uang Tunai (Ingin Beli Properti Bot)
    const affordableProps = candidateProps.filter(s => (s.price || 0) <= offerCash * 0.9);
    if (affordableProps.length > 0) {
      affordableProps.sort((a, b) => (b.price || 0) - (a.price || 0));
      chosenPropertyIds.push(affordableProps[0].id);
    }
  }

  // Evaluasi final
  if (chosenPropertyIds.length === 0 && chosenCash === 0) {
    if (offerPropIds.length === 0) {
      return {
        accept: false,
        reason: `Uang tunai ${formatCurrency(offerCash)} yang Anda tawarkan belum cukup bagi saya untuk melepas sertifikat properti milik saya.`
      };
    }
    return {
      accept: false,
      reason: "Saat ini saya belum memiliki properti atau saldo kas yang seimbang untuk dibarterkan dengan tawaran Anda."
    };
  }

  const acceptMessages = [
    "Tawaran yang menarik! Saya memilih untuk memberikan aset ini sebagai imbalan barter yang adil.",
    "Saya menyetujui tawaran barter ini dan telah memilih aset yang cocok untuk Anda.",
    "Kesepakatan bisnis yang bagus! Ini adalah aset yang saya bersedia berikan kepada Anda.",
    "Saya setuju! Transaksi barter ini menguntungkan kedua belah pihak."
  ];

  return {
    accept: true,
    chosenPropertyIds,
    chosenCash,
    message: acceptMessages[Math.floor(Math.random() * acceptMessages.length)]
  };
}

// Dialog Konfirmasi Tawaran Masuk untuk Pemain Manusia
async function showIncomingTradeProposal(fromPlayer, toPlayer, offer, request) {
  const offerPropNames = (offer.propertyIds || []).map(pid => BOARD_SPACES.find(s => s.id === pid)?.name || '').filter(Boolean);
  const reqPropNames = (request.propertyIds || []).map(pid => BOARD_SPACES.find(s => s.id === pid)?.name || '').filter(Boolean);

  let offerList = [];
  if (offerPropNames.length) offerList.push(`Properti: <b>${offerPropNames.join(', ')}</b>`);
  if (offer.cash > 0) offerList.push(`Uang Tunai: <b class="text-emerald-400">${formatCurrency(offer.cash)}</b>`);
  if (offer.jailCards > 0) offerList.push(`Kartu Bebas Penjara: <b>${offer.jailCards}x</b>`);

  let reqList = [];
  if (reqPropNames.length) reqList.push(`Properti: <b>${reqPropNames.join(', ')}</b>`);
  if (request.cash > 0) reqList.push(`Uang Tunai: <b class="text-amber-400">${formatCurrency(request.cash)}</b>`);
  if (request.jailCards > 0) reqList.push(`Kartu Bebas Penjara: <b>${request.jailCards}x</b>`);

  return await Swal.fire({
    title: `<span class="swal2-monopoly-title">Tawaran Trading dari ${fromPlayer.name}</span>`,
    html: `
      <div class="text-left text-xs text-zinc-300 font-sans space-y-3">
        <div class="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
          <div class="font-bold text-emerald-400 mb-1">Anda Akan Menerima:</div>
          <div class="pl-2 space-y-0.5">${offerList.length ? offerList.join('<br>') : 'Tidak ada'}</div>
        </div>
        <div class="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
          <div class="font-bold text-amber-400 mb-1">Anda Diminta Menyerahkan:</div>
          <div class="pl-2 space-y-0.5">${reqList.length ? reqList.join('<br>') : 'Tidak ada'}</div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Terima Tawaran',
    cancelButtonText: 'Tolak Tawaran',
    customClass: {
      popup: 'swal2-monopoly-popup',
      confirmButton: 'swal2-monopoly-confirm',
      cancelButton: 'swal2-monopoly-cancel'
    },
    buttonsStyling: false
  });
}

// Eksekusi Perpindahan Aset & Uang Setelah Disetujui
async function executeTrade(playerAId, playerBId, offer, request) {
  const pA = state.players.find(p => p.id === playerAId);
  const pB = state.players.find(p => p.id === playerBId);
  if (!pA || !pB) return;

  // Transfer Uang
  const offerCash = offer.cash || 0;
  const requestCash = request.cash || 0;
  pA.money = pA.money - offerCash + requestCash;
  pB.money = pB.money - requestCash + offerCash;

  // Transfer Properti
  const offerPropNames = [];
  (offer.propertyIds || []).forEach(pid => {
    if (state.properties[pid]) {
      state.properties[pid].ownerId = playerBId;
      const sp = BOARD_SPACES.find(s => s.id === pid);
      if (sp) offerPropNames.push(sp.name);
    }
  });

  const reqPropNames = [];
  (request.propertyIds || []).forEach(pid => {
    if (state.properties[pid]) {
      state.properties[pid].ownerId = playerAId;
      const sp = BOARD_SPACES.find(s => s.id === pid);
      if (sp) reqPropNames.push(sp.name);
    }
  });

  // Transfer Kartu Penjara
  const offerJail = offer.jailCards || 0;
  const reqJail = request.jailCards || 0;
  pA.getOutOfJailFreeCards = (pA.getOutOfJailFreeCards || 0) - offerJail + reqJail;
  pB.getOutOfJailFreeCards = (pB.getOutOfJailFreeCards || 0) - reqJail + offerJail;

  // Log Permainan
  const offerDesc = [];
  if (offerPropNames.length) offerDesc.push(offerPropNames.join(', '));
  if (offerCash > 0) offerDesc.push(formatCurrency(offerCash));
  if (offerJail > 0) offerDesc.push(`${offerJail} Kartu Penjara`);

  const reqDesc = [];
  if (reqPropNames.length) reqDesc.push(reqPropNames.join(', '));
  if (requestCash > 0) reqDesc.push(formatCurrency(requestCash));
  if (reqJail > 0) reqDesc.push(`${reqJail} Kartu Penjara`);

  const msg = `[TRADING BERHASIL] ${pA.name} menukar [${offerDesc.join(' + ') || 'Tanpa Aset'}] dengan [${reqDesc.join(' + ') || 'Tanpa Aset'}] milik ${pB.name}!`;
  
  if (!state.logs) state.logs = [];
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  state.logs.unshift({ time: timeStr, message: msg, type: 'highlight' });

  // Sinkronisasi ke Backend Flight PHP
  await apiCall('/api/game/trade', {
    playerAId,
    playerBId,
    offer,
    request
  }, 'POST');

  updateBoardUI();
}

// Helper Tutup Modal Aksi Giliran Secara Bersih
function forceCloseAllModals() {
  closeModal();
  isModalOpen = false;
}

// Check Modals
function checkModals() {
  if (!state) return;
  const current = state.players[state.currentPlayerIndex];

  if (state.phase === 'GAME_OVER') {
    if (!isGameOverModalShown) {
      isGameOverModalShown = true;
      forceCloseAllModals();
      try { Swal.close(); } catch (e) {}
      const active = state.players.filter(p => !p.isBankrupt);
      const winner = active[0] || current || { name: 'Pemenang', id: 0 };
      showGameOver(winner);
    }
    return;
  }

  if (isProcessingAction) return;

  // Jika bukan fase ACTION_REQUIRED, pastikan modal aksi giliran tertutup
  if (state.phase !== 'ACTION_REQUIRED') {
    if (!isModalOpen && !isProcessingAction) {
      closeModal();
    }
    return;
  }

  if (current.isAI) return;

  // Jika multiplayer online, jangan munculkan dialog keputusan giliran di layar pemain yang bukan gilirannya
  if (currentOnlineRoom && currentOnlinePlayer && current.id !== currentOnlinePlayer.id) {
    closeModal();
    return;
  }

  if (state.phase === 'ACTION_REQUIRED' && state.currentAction && !isModalOpen && !isProcessingAction) {
    if (state.currentAction.type === 'BUY_PROPOSAL') {
      showBuyProposal(state.currentAction, current);
    } else if (state.currentAction.type === 'BUILD_PROPOSAL') {
      showBuildProposal(state.currentAction, current);
    } else if (state.currentAction.type === 'CARD_DRAWN') {
      showCardDrawn(state.currentAction, current);
    }
  }
}

// Helper escape HTML untuk keamanan input chat
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==============================================
// SISTEM CHAT SESAMA PEMAIN & FLOATING EMOTICONS
// ==============================================

function getCurrentHumanPlayer() {
  if (currentOnlineRoom && currentOnlinePlayer) return currentOnlinePlayer;
  if (state && state.players) {
    return state.players.find(p => !p.isAI && !p.isBankrupt) || state.players[0];
  }
  return { id: 0, name: 'Pemain 1', color: '#3b82f6' };
}

function spawnFloatingEmote(emote, senderName = '', senderColor = '#f59e0b') {
  if (!emote) return;
  const overlay = document.getElementById('boardEmoteOverlay');
  const targetParent = overlay || document.getElementById('boardCenterArea') || boardElement;
  if (!targetParent) return;

  sound.playEmoteSound(emote);

  const el = document.createElement('div');
  el.className = 'floating-board-emote';

  // Random scatter coordinates & rotations so rapid spamming creates a burst/fountain
  const dx = (Math.random() - 0.5) * 140; // -70px to +70px
  const dy = (Math.random() - 0.5) * 80;  // -40px to +40px
  const drift = (Math.random() - 0.5) * 90;
  const rot = (Math.random() - 0.5) * 36;
  const rotDrift = (Math.random() - 0.5) * 24;

  el.style.setProperty('--dx', `${dx}px`);
  el.style.setProperty('--dy', `${dy}px`);
  el.style.setProperty('--drift', `${drift}px`);
  el.style.setProperty('--rot', `${rot}deg`);
  el.style.setProperty('--rot-drift', `${rotDrift}deg`);

  el.innerHTML = `
    <span class="emote-glyph">${emote}</span>
    ${senderName ? `<span class="emote-sender-tag" style="border-color: ${senderColor}; color: #fff;">${senderName}</span>` : ''}
  `;

  targetParent.appendChild(el);

  setTimeout(() => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }, 1850);
}

function renderChats() {
  if (!chatMessagesList) return;
  const textChats = localChats.filter(c => c.message && c.message.trim() !== '');
  if (textChats.length === 0) {
    chatMessagesList.innerHTML = `
      <div class="text-[10px] text-zinc-500 text-center py-4 italic">
        Ketik pesan di bawah untuk mengobrol dengan sesama pemain.
      </div>
    `;
    return;
  }

  const currentHuman = getCurrentHumanPlayer();
  const myId = currentHuman ? currentHuman.id : 0;

  chatMessagesList.innerHTML = '';
  textChats.forEach(chat => {
    const isSelf = (chat.senderId === myId);
    const row = document.createElement('div');
    row.className = `chat-msg-row ${isSelf ? 'items-end' : 'items-start'} max-w-full`;

    row.innerHTML = `
      <div class="flex items-center gap-1 text-[9.5px] text-gray-400">
        <span class="font-bold" style="color: ${chat.senderColor || '#f59e0b'}">${chat.senderName}</span>
        <span class="text-[8.5px] text-gray-500">${chat.time || ''}</span>
      </div>
      <div class="chat-bubble ${isSelf ? 'chat-bubble-self' : 'chat-bubble-other'}">
        ${escapeHtml(chat.message)}
      </div>
    `;
    chatMessagesList.appendChild(row);
  });

  chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
}

function syncChatsFromState(chatsList) {
  const incomingChats = chatsList || (state && state.chats);
  if (!incomingChats || !Array.isArray(incomingChats)) return;
  let hasNew = false;
  const currentHuman = getCurrentHumanPlayer();
  const myId = currentHuman ? currentHuman.id : 0;

  incomingChats.forEach(c => {
    if (!processedChatIds.has(c.id)) {
      processedChatIds.add(c.id);
      if (c.senderId !== myId) {
        if (c.message && c.message.trim() !== '') {
          localChats.push(c);
          hasNew = true;
        }
        if (c.emote) {
          spawnFloatingEmote(c.emote, c.senderName, c.senderColor);
        }
      }
    }
  });

  if (hasNew) {
    if (localChats.length > 50) {
      localChats = localChats.slice(-50);
    }
    renderChats();
  }
}

async function sendUserChatMessage(text) {
  if (!text || text.trim() === '') return;
  const human = getCurrentHumanPlayer();
  const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const cleanText = text.trim();

  // If text has laughing or emotion keywords, trigger floating emote on board
  if (/wkwk|haha|wk|kocak|ngakak|😂|🤣/i.test(cleanText)) {
    spawnFloatingEmote('😂', human.name, human.color);
  } else if (/cuan|duit|kaya|untung|🤑/i.test(cleanText)) {
    spawnFloatingEmote('🤑', human.name, human.color);
  } else if (/apes|rugi|sedih|nangis|😭/i.test(cleanText)) {
    spawnFloatingEmote('😭', human.name, human.color);
  } else if (/marah|curang|sialan|😡/i.test(cleanText)) {
    spawnFloatingEmote('😡', human.name, human.color);
  }

  const chatEntry = {
    id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    senderId: human.id,
    senderName: human.name,
    senderColor: human.color,
    message: cleanText,
    emote: '',
    time: timeStr,
    timestamp: Date.now() / 1000
  };

  localChats.push(chatEntry);
  if (localChats.length > 50) localChats.shift();
  processedChatIds.add(chatEntry.id);
  renderChats();

  // Kirim ke backend API
  apiCall('/api/game/chat', {
    senderId: human.id,
    senderName: human.name,
    senderColor: human.color,
    message: cleanText,
    emote: ''
  }).catch(() => {});

  // Respon AI Bot jika ada
  triggerBotChatReaction(cleanText, '');
}

async function sendUserEmote(emote) {
  if (!emote) return;
  const human = getCurrentHumanPlayer();

  // 1. Munculkan langsung melayang di tengah papan (TIDAK dimasukkan ke ruang chat)
  spawnFloatingEmote(emote, human.name, human.color);

  // 2. Kirim ke backend untuk sync online room tanpa menambah teks chat
  apiCall('/api/game/chat', {
    senderId: human.id,
    senderName: human.name,
    senderColor: human.color,
    message: '',
    emote: emote,
    onlyEmote: true
  }).catch(() => {});

  // 3. Tanggapan Bot AI (membalas floating emote di tengah papan)
  triggerBotChatReaction('', emote);
}

function triggerBotChatReaction(userText, userEmote) {
  if (!state || !state.players) return;
  const bots = state.players.filter(p => p.isAI && !p.isBankrupt);
  if (bots.length === 0) return;
  const bot = bots[Math.floor(Math.random() * bots.length)];

  if (botReactionTimeout) clearTimeout(botReactionTimeout);
  botReactionTimeout = setTimeout(() => {
    // 65% kesempatan bot merespon
    if (Math.random() > 0.65) return;

    let replyEmote = '';
    let replyText = '';

    if (userEmote === '😂' || userEmote === '🤣' || /wkwk|haha|ngakak/i.test(userText)) {
      const laughs = ['😂', '🤣', '😎', '💀'];
      replyEmote = laughs[Math.floor(Math.random() * laughs.length)];
      const texts = [
        'Wkwkwk ketawa terus, awas giliran lo!',
        'Hahaha santai dulu gak sih!',
        'Ketawa di awal, bangkrut di akhir wkwk!',
        'Bisa aja lu bro'
      ];
      replyText = (userText && Math.random() > 0.4) ? texts[Math.floor(Math.random() * texts.length)] : '';
    } else if (userEmote === '🤑' || /cuan|duit/i.test(userText)) {
      replyEmote = Math.random() > 0.5 ? '🤑' : '😡';
      replyText = userText ? (Math.random() > 0.5 ? 'Bagi-bagi cuannya lah bos!' : 'Tunggu giliran tanah gua diinjak!') : '';
    } else if (userEmote === '😭' || userEmote === '💀' || /apes|sedih/i.test(userText)) {
      replyEmote = Math.random() > 0.5 ? '😂' : '👏';
      replyText = userText ? (Math.random() > 0.5 ? 'Wkwkwk sabar ya, namanya juga permainan!' : 'Jangan sedih, masih ada harapan!') : '';
    } else if (userEmote === '😡') {
      replyEmote = Math.random() > 0.5 ? '😎' : '🤣';
      replyText = userText ? 'Jangan emosi bos, ngopi dulu biar santai' : '';
    } else {
      const randomEmotes = ['😎', '🎲', '🔥', '😂'];
      replyEmote = randomEmotes[Math.floor(Math.random() * randomEmotes.length)];
    }

    // Bot membalas floating emote di tengah papan
    if (replyEmote) {
      spawnFloatingEmote(replyEmote, bot.name, bot.color);
    }

    // Bot HANYA memasukkan ke ruang obrolan jika ada pesan teks
    if (replyText) {
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const botChatEntry = {
        id: 'bot_' + Date.now(),
        senderId: bot.id,
        senderName: bot.name,
        senderColor: bot.color,
        message: replyText,
        emote: '',
        time: timeStr,
        timestamp: Date.now() / 1000
      };

      localChats.push(botChatEntry);
      if (localChats.length > 50) localChats.shift();
      processedChatIds.add(botChatEntry.id);
      renderChats();

      apiCall('/api/game/chat', {
        senderId: bot.id,
        senderName: bot.name,
        senderColor: bot.color,
        message: replyText,
        emote: ''
      }).catch(() => {});
    }
  }, 900 + Math.random() * 1100);
}

// Bot AI Runner dengan Pacing Halus, Jeda Natural & Anti-Ngebug
async function runBotTurn() {
  if (isBotRunning || !state) return;
  const current = state.players[state.currentPlayerIndex];
  if (!current || !current.isAI || state.phase === 'GAME_OVER') return;

  isBotRunning = true;
  const die1 = document.getElementById('die1');
  const die2 = document.getElementById('die2');
  const promptEl = document.getElementById('centerPromptText');
  let rollInterval = null;

  try {
    // 1. Jeda berpikir / persiapan melempar dadu (1.0 detik)
    if (promptEl) {
      promptEl.textContent = `${current.name} sedang bersiap melempar dadu...`;
    }
    await new Promise(r => setTimeout(r, 1000));

    // 2. Animasi acak putar dadu bot yang halus dan berdurasi wajar (1.4 detik)
    sound.playDiceRoll();
    if (die1 && die2) {
      die1.classList.remove('dice-landed-pop');
      die2.classList.remove('dice-landed-pop');
      die1.classList.add('dice-wild-rolling');
      die2.classList.add('dice-wild-rolling');
      rollInterval = setInterval(() => {
        renderDiceFace(die1, Math.floor(Math.random() * 6) + 1);
        renderDiceFace(die2, Math.floor(Math.random() * 6) + 1);
      }, 80);
    }

    const startPos = current.position;
    const playerId = current.id;
    const [newState] = await Promise.all([
      apiCall('/api/game/bot-step', {}, 'POST'),
      new Promise(r => setTimeout(r, 1400))
    ]);

    if (rollInterval) clearInterval(rollInterval);
    if (die1 && die2) {
      die1.classList.remove('dice-wild-rolling');
      die2.classList.remove('dice-wild-rolling');
    }

    if (newState) {
      // 3. Tampilkan angka dadu hasil lemparan & jeda membaca dadu (650ms)
      if (die1) {
        renderDiceFace(die1, newState.dice[0] || 1);
        die1.classList.add('dice-landed-pop');
      }
      if (die2) {
        renderDiceFace(die2, newState.dice[1] || 1);
        die2.classList.add('dice-landed-pop');
      }

      if (promptEl) {
        const total = (newState.dice[0] || 1) + (newState.dice[1] || 1);
        promptEl.textContent = `${current.name} melempar angka ${newState.dice[0] || 1} & ${newState.dice[1] || 1} (Total: ${total})`;
      }

      await new Promise(r => setTimeout(r, 650));

      // 4. Jalankan animasi langkah bidak bertahap
      const updatedBot = newState.players[playerId];
      const endPos = updatedBot ? updatedBot.position : startPos;

      if (!current.inJail && endPos !== startPos) {
        const totalSteps = newState.dice[0] + newState.dice[1];
        await animateTokenStepByStep(playerId, startPos, endPos, totalSteps);
      }

      if (updatedBot && updatedBot.inJail && !current.inJail) {
        triggerJailSiren();
      }

      if (newState.logs && newState.logs.length > 0) {
        const latestMsg = newState.logs[0].message;
        if (latestMsg.includes('membayar sewa') || latestMsg.includes('membayar Pajak') || latestMsg.includes('membayar denda') || latestMsg.includes('membayar Rp') || latestMsg.includes('kehilangan modal')) {
          sound.playPayCash();
          const match = latestMsg.match(/Rp\s*([\d\.]+)/);
          const rawAmount = match ? parseInt(match[1].replace(/\./g, '')) : 0;
          if (rawAmount > 0) {
            let label = 'Keluar Uang';
            if (latestMsg.includes('membayar sewa')) label = 'Bayar Sewa Properti';
            else if (latestMsg.includes('membayar Pajak')) label = 'Bayar Pajak';
            else if (latestMsg.includes('membayar denda')) label = 'Denda';
            else if (latestMsg.includes('membayar Rp')) label = 'Bayar Biaya';
            showFloatingCash(rawAmount, false, label);
          }
        }
      }

      state = newState;
      updateBoardUI();
      updateHUD();

      // 5. Jeda observasi hasil aksi mendarat sebelum mengakhiri giliran (950ms)
      await new Promise(r => setTimeout(r, 950));
    }

    // 6. Selesaikan giliran bot dan serahkan ke pemain berikutnya
    if (state && state.phase === 'TURN_ENDED') {
      const endState = await apiCall('/api/game/end-turn', {}, 'POST');
      if (endState) {
        state = endState;
        updateBoardUI();
        updateHUD();
      }
    }
  } catch (err) {
    console.error('Bot turn error:', err);
  } finally {
    if (rollInterval) clearInterval(rollInterval);
    if (die1 && die2) {
      die1.classList.remove('dice-wild-rolling');
      die2.classList.remove('dice-wild-rolling');
    }
    isBotRunning = false;
    updateHUD();
  }
}

// Roll Dice Handler
async function handleRollDice() {
  if (isAnimating || isModalOpen || !state) return;
  const current = state.players[state.currentPlayerIndex];
  if (!current || current.isAI || state.phase !== 'READY_TO_ROLL') return;

  isAnimating = true;
  if (btnRollDice) btnRollDice.disabled = true;

  sound.playDiceRoll();
  const die1 = document.getElementById('die1');
  const die2 = document.getElementById('die2');
  let rollInterval = null;

  if (die1 && die2) {
    die1.classList.remove('dice-landed-pop');
    die2.classList.remove('dice-landed-pop');
    die1.classList.add('dice-wild-rolling');
    die2.classList.add('dice-wild-rolling');
    rollInterval = setInterval(() => {
      renderDiceFace(die1, Math.floor(Math.random() * 6) + 1);
      renderDiceFace(die2, Math.floor(Math.random() * 6) + 1);
    }, 70);
  }

  try {
    const startPos = current.position;
    const playerId = current.id;
    const [newState] = await Promise.all([
      apiCall('/api/game/roll', {}, 'POST'),
      new Promise(r => setTimeout(r, 1100))
    ]);

    if (rollInterval) clearInterval(rollInterval);
    if (die1 && die2) {
      die1.classList.remove('dice-wild-rolling');
      die2.classList.remove('dice-wild-rolling');
    }

    if (newState) {
      if (die1) {
        renderDiceFace(die1, newState.dice[0] || 1);
        die1.classList.add('dice-landed-pop');
      }
      if (die2) {
        renderDiceFace(die2, newState.dice[1] || 1);
        die2.classList.add('dice-landed-pop');
      }

      await new Promise(r => setTimeout(r, 300));

      const updatedPlayer = newState.players[playerId];
      const endPos = updatedPlayer ? updatedPlayer.position : startPos;

      if (!current.inJail && endPos !== startPos) {
        const totalSteps = newState.dice[0] + newState.dice[1];
        await animateTokenStepByStep(playerId, startPos, endPos, totalSteps);
      }

      if (updatedPlayer && updatedPlayer.inJail && !current.inJail) {
        triggerJailSiren();
      }

      if (newState.logs && newState.logs.length > 0) {
        const latestMsg = newState.logs[0].message;
        if (latestMsg.includes('membayar sewa') || latestMsg.includes('membayar Pajak') || latestMsg.includes('membayar denda') || latestMsg.includes('membayar Rp') || latestMsg.includes('kehilangan modal')) {
          sound.playPayCash();
          const match = latestMsg.match(/Rp\s*([\d\.]+)/);
          const rawAmount = match ? parseInt(match[1].replace(/\./g, '')) : 0;
          if (rawAmount > 0) {
            let label = 'Keluar Uang';
            if (latestMsg.includes('membayar sewa')) label = 'Bayar Sewa Properti';
            else if (latestMsg.includes('membayar Pajak')) label = 'Bayar Pajak';
            else if (latestMsg.includes('membayar denda')) label = 'Denda';
            else if (latestMsg.includes('membayar Rp')) label = 'Bayar Biaya';
            showFloatingCash(rawAmount, false, label);
          }
        }
      }

      state = newState;
      isAnimating = false; // Reset animasi sebelum updateHUD agar tombol tidak disable!
      updateBoardUI();
      updateHUD();
    }
  } catch (err) {
    console.error('Error rolling dice:', err);
  } finally {
    if (rollInterval) clearInterval(rollInterval);
    if (die1 && die2) {
      die1.classList.remove('dice-wild-rolling');
      die2.classList.remove('dice-wild-rolling');
    }
    isAnimating = false;
    updateHUD();
  }
}

// End Turn Handler
async function handleEndTurn() {
  const newState = await apiCall('/api/game/end-turn', {}, 'POST');
  if (newState) {
    state = newState;
    isAnimating = false;
    isBotRunning = false;
    forceCloseAllModals();
    updateBoardUI();
    updateHUD();
  }
}

// Unified Main Action Button (Kocok Dadu / Lanjut Giliran)
async function handleMainActionButton() {
  if (isAnimating || isBotRunning || isModalOpen || !state) return;
  const current = state.players[state.currentPlayerIndex];
  if (!current || current.isAI) return;

  const isOnline = !!currentOnlineRoom;
  const isMyTurn = !isOnline || (currentOnlinePlayer && current.id === currentOnlinePlayer.id);
  if (!isMyTurn) return;

  if (state.phase === 'READY_TO_ROLL') {
    await handleRollDice();
  } else if (state.phase === 'TURN_ENDED') {
    await handleEndTurn();
  } else if (state.phase === 'ACTION_REQUIRED') {
    checkModals();
  }
}

// Modals
function closeModal() {
  if (modalContainer) {
    modalContainer.innerHTML = '';
    modalContainer.classList.add('hidden');
  }
}

// ==============================================
// DELUXE TITLE DEED CARD GENERATOR
// ==============================================

function generateTitleDeedCardHTML(space, prop = null, highlightNextLevel = false, extraFooterHtml = '') {
  if (!space) return '';
  const currentHouses = prop ? (prop.houses || 0) : 0;
  const isHotel = prop ? !!prop.isHotel : false;

  const houseIconHtml = (count) => {
    let icons = '';
    for (let i = 0; i < count; i++) {
      icons += `<span class="w-3.5 h-3.5 inline-block text-emerald-600">${GameIcons.house}</span>`;
    }
    return `<span class="inline-flex items-center gap-0.5">${icons}</span>`;
  };

  if (space.type === 'property') {
    const headerColor = space.color || '#3b82f6';
    const rentBase = space.rent && space.rent[0] !== undefined ? space.rent[0] : Math.round(space.price * 0.1);
    const rent1 = space.rent && space.rent[1] !== undefined ? space.rent[1] : Math.round(space.price * 0.5);
    const rent2 = space.rent && space.rent[2] !== undefined ? space.rent[2] : Math.round(space.price * 1.5);
    const rent3 = space.rent && space.rent[3] !== undefined ? space.rent[3] : Math.round(space.price * 3.0);
    const rent4 = space.rent && space.rent[4] !== undefined ? space.rent[4] : Math.round(space.price * 4.5);
    const rentHotel = space.rent && space.rent[5] !== undefined ? space.rent[5] : Math.round(space.price * 6.0);
    const houseCost = space.housePrice || Math.round(space.price * 0.5);
    const mortgageVal = space.mortgage || Math.round(space.price * 0.5);

    return `
      <div class="title-deed-card-container mx-auto bg-white rounded-3xl border-4 border-zinc-900 overflow-hidden text-zinc-900 shadow-2xl max-w-[340px] w-full select-none text-left">
        <!-- Colored Header -->
        <div class="p-3.5 text-center text-white" style="background-color: ${headerColor};">
          <div class="text-[9px] uppercase tracking-widest opacity-80 font-bold font-outfit">SERTIFIKAT KEPEMILIKAN</div>
          <div class="text-base md:text-lg font-black uppercase font-outfit leading-tight mt-0.5 drop-shadow-sm">${space.name}</div>
          ${space.city ? `<div class="text-[10px] font-semibold opacity-90">${space.city}</div>` : ''}
        </div>

        <!-- Rent Base -->
        <div class="py-2 text-center font-bold text-xs text-zinc-800 tracking-wide border-b border-zinc-200">
          SEWA DASAR &nbsp;<span class="font-black text-sm text-zinc-950">${formatCurrency(rentBase)}</span>
        </div>

        <!-- Rent Tiers -->
        <div class="p-3 space-y-1.5 text-xs font-semibold">
          <div class="flex items-center justify-between px-2 py-1 rounded-lg ${highlightNextLevel && currentHouses === 0 && !isHotel ? 'bg-amber-100 border border-amber-400 font-black text-amber-950 shadow-sm' : (currentHouses === 1 && !isHotel ? 'bg-emerald-100 text-emerald-950 font-black border border-emerald-300' : 'text-zinc-700')}">
            <span class="flex items-center gap-1.5">${houseIconHtml(1)} <span>Dengan 1 Rumah</span></span>
            <span class="font-bold">${formatCurrency(rent1)}</span>
          </div>
          <div class="flex items-center justify-between px-2 py-1 rounded-lg ${highlightNextLevel && currentHouses === 1 && !isHotel ? 'bg-amber-100 border border-amber-400 font-black text-amber-950 shadow-sm' : (currentHouses === 2 && !isHotel ? 'bg-emerald-100 text-emerald-950 font-black border border-emerald-300' : 'text-zinc-700')}">
            <span class="flex items-center gap-1.5">${houseIconHtml(2)} <span>Dengan 2 Rumah</span></span>
            <span class="font-bold">${formatCurrency(rent2)}</span>
          </div>
          <div class="flex items-center justify-between px-2 py-1 rounded-lg ${highlightNextLevel && currentHouses === 2 && !isHotel ? 'bg-amber-100 border border-amber-400 font-black text-amber-950 shadow-sm' : (currentHouses === 3 && !isHotel ? 'bg-emerald-100 text-emerald-950 font-black border border-emerald-300' : 'text-zinc-700')}">
            <span class="flex items-center gap-1.5">${houseIconHtml(3)} <span>Dengan 3 Rumah</span></span>
            <span class="font-bold">${formatCurrency(rent3)}</span>
          </div>
          <div class="flex items-center justify-between px-2 py-1 rounded-lg ${highlightNextLevel && currentHouses === 3 && !isHotel ? 'bg-amber-100 border border-amber-400 font-black text-amber-950 shadow-sm' : (currentHouses === 4 && !isHotel ? 'bg-emerald-100 text-emerald-950 font-black border border-emerald-300' : 'text-zinc-700')}">
            <span class="flex items-center gap-1.5">${houseIconHtml(4)} <span>Dengan 4 Rumah</span></span>
            <span class="font-bold">${formatCurrency(rent4)}</span>
          </div>
          <div class="flex items-center justify-between px-2 py-1.5 rounded-lg ${highlightNextLevel && currentHouses === 4 && !isHotel ? 'bg-amber-100 border border-amber-400 font-black text-amber-950 shadow-sm' : (isHotel ? 'bg-red-100 text-red-950 font-black border border-red-400 shadow-sm' : 'text-red-700 bg-red-50/60')}">
            <span class="flex items-center gap-1.5 font-bold"><span class="w-4 h-4 inline-block text-red-600">${GameIcons.hotel}</span> <span>Dengan HOTEL</span></span>
            <span class="font-black text-red-600">${formatCurrency(rentHotel)}</span>
          </div>
        </div>

        <!-- Level upgrade & Jual Tanah -->
        <div class="px-3.5 py-2.5 bg-zinc-50 border-t border-zinc-200 text-[11px] text-zinc-600 space-y-1">
          <div class="flex justify-between items-center">
            <span>Biaya Bangun Rumah/Hotel:</span>
            <span class="font-bold text-zinc-900">${formatCurrency(houseCost)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>Nilai Jual ke Bank (50%):</span>
            <span class="font-bold text-emerald-700">${formatCurrency(Math.round(space.price * 0.5))}</span>
          </div>
        </div>

        <!-- Price Badge Bottom -->
        <div class="py-2.5 bg-zinc-900 text-center text-white">
          <div class="text-[9px] uppercase tracking-wider text-amber-400 font-bold">HARGA BELI TANAH</div>
          <div class="text-base font-black text-amber-300 font-outfit tracking-wide">${formatCurrency(space.price)}</div>
        </div>

        ${extraFooterHtml}
      </div>
    `;
  } else if (space.type === 'railroad') {
    return `
      <div class="title-deed-card-container mx-auto bg-white rounded-3xl border-4 border-zinc-900 overflow-hidden text-zinc-900 shadow-2xl max-w-[340px] w-full select-none text-left">
        <div class="p-4 text-center bg-zinc-800 text-white">
          <div class="w-10 h-10 mx-auto text-amber-300 mb-1">${GameIcons.train}</div>
          <div class="text-[9px] uppercase tracking-widest opacity-80 font-outfit">STASIUN KERETA NUSANTARA</div>
          <div class="text-base md:text-lg font-black uppercase font-outfit leading-tight mt-0.5">${space.name}</div>
        </div>
        <div class="p-3.5 space-y-2 text-xs font-semibold text-zinc-700">
          <div class="flex justify-between px-2 py-1 bg-zinc-50 rounded-lg"><span>Sewa 1 Stasiun</span><span class="font-bold">Rp 250.000</span></div>
          <div class="flex justify-between px-2 py-1 bg-zinc-50 rounded-lg"><span>Sewa 2 Stasiun</span><span class="font-bold">Rp 500.000</span></div>
          <div class="flex justify-between px-2 py-1 bg-zinc-50 rounded-lg"><span>Sewa 3 Stasiun</span><span class="font-bold">Rp 1.000.000</span></div>
          <div class="flex justify-between px-2 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg font-bold"><span>Sewa 4 Stasiun</span><span class="font-black">Rp 2.000.000</span></div>
        </div>
        <div class="px-4 py-2 bg-zinc-50 border-t border-zinc-200 text-[11px] flex justify-between text-zinc-600">
          <span>Nilai Jual ke Bank (50%):</span>
          <span class="font-bold text-emerald-700">${formatCurrency(Math.round(space.price * 0.5))}</span>
        </div>
        <div class="py-2.5 bg-zinc-900 text-center text-white">
          <div class="text-[9px] uppercase tracking-wider text-amber-400 font-bold">HARGA BELI STASIUN</div>
          <div class="text-base font-black text-amber-300 font-outfit tracking-wide">${formatCurrency(space.price)}</div>
        </div>

        ${extraFooterHtml}
      </div>
    `;
  } else if (space.type === 'utility') {
    const isZap = space.icon === 'zap';
    return `
      <div class="title-deed-card-container mx-auto bg-white rounded-3xl border-4 border-zinc-900 overflow-hidden text-zinc-900 shadow-2xl max-w-[340px] w-full select-none text-left">
        <div class="p-4 text-center bg-zinc-800 text-white">
          <div class="w-10 h-10 mx-auto ${isZap ? 'text-amber-400' : 'text-blue-400'} mb-1">${isZap ? GameIcons.zap : GameIcons.water}</div>
          <div class="text-[9px] uppercase tracking-widest opacity-80 font-outfit">PERUSAHAAN PUBLIK</div>
          <div class="text-base md:text-lg font-black uppercase font-outfit leading-tight mt-0.5">${space.name}</div>
        </div>
        <div class="p-4 space-y-2.5 text-xs text-zinc-700 leading-relaxed">
          <div class="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
            Jika memiliki <b>1 Utilitas</b>, sewa adalah <b>4x lipat</b> dari total angka dadu yang dilempar.
          </div>
          <div class="p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-amber-950">
            Jika memiliki <b>2 Utilitas</b>, sewa adalah <b>10x lipat</b> dari total angka dadu yang dilempar.
          </div>
        </div>
        <div class="px-4 py-2 bg-zinc-50 border-t border-zinc-200 text-[11px] flex justify-between text-zinc-600">
          <span>Nilai Jual ke Bank (50%):</span>
          <span class="font-bold text-emerald-700">${formatCurrency(Math.round(space.price * 0.5))}</span>
        </div>
        <div class="py-2.5 bg-zinc-900 text-center text-white">
          <div class="text-[9px] uppercase tracking-wider text-amber-400 font-bold">HARGA BELI UTILITAS</div>
          <div class="text-base font-black text-amber-300 font-outfit tracking-wide">${formatCurrency(space.price)}</div>
        </div>

        ${extraFooterHtml}
      </div>
    `;
  } else if (space.type === 'corner') {
    let headerBg = 'bg-zinc-800';
    let headerIcon = GameIcons.freeParking;
    let categoryTitle = 'SUDUT PAPAN';
    let cardTitle = space.name || 'Petak Sudut';
    let subTitle = '';
    let infoTitle = 'Informasi Petak';
    let infoContent = space.description || '';
    let badgeText = 'Sudut Papan';
    let badgeColor = 'text-zinc-400';

    if (space.id === 20 || space.subType === 'free-parking') {
      headerBg = 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900';
      headerIcon = `<div class="w-12 h-12 mx-auto text-blue-200 mb-1">${GameIcons.freeParking}</div>`;
      categoryTitle = 'ZONA AMAN • PERISTIRAHATAN';
      cardTitle = 'PARKIR BEBAS';
      subTitle = 'FREE PARKING';
      infoTitle = 'Zona Aman Tanpa Biaya';
      infoContent = 'Area peristirahatan aman di papan monopoli. Pemain yang mendarat di petak ini dapat bersantai tanpa dikenakan biaya sewa tanah, denda kas, maupun pajak apapun.';
      badgeText = 'Bebas Sewa & Denda';
      badgeColor = 'text-emerald-400';
    } else if (space.id === 0 || space.subType === 'go') {
      headerBg = 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900';
      headerIcon = `<div class="w-12 h-12 mx-auto text-emerald-200 mb-1 flex items-center justify-center text-4xl">🚩</div>`;
      categoryTitle = 'GARIS AWAL • GAJI RESMI';
      cardTitle = 'MULAI (GO)';
      subTitle = 'STARTING POINT';
      infoTitle = 'Ketentuan Bonus Gaji Rp 2.000.000';
      infoContent = 'Bonus gaji Rp 2.000.000 dari Bank hanya diberikan saat bidak Anda <b>benar-benar melintas/melewati</b> petak Mulai. Jika langkah dadu berhenti tepat di petak Mulai, Anda tidak mendapatkan uang.';
      badgeText = 'Gaji: +Rp 2.000.000 (Jika Melintas)';
      badgeColor = 'text-emerald-400';
    } else if (space.id === 10 || space.subType === 'jail') {
      headerBg = 'bg-gradient-to-r from-amber-950 via-amber-900 to-orange-950';
      headerIcon = `<div class="w-12 h-12 mx-auto text-amber-300 mb-1">${GameIcons.jailLock}</div>`;
      categoryTitle = 'FASILITAS HUKUM • STATUS GANDA';
      cardTitle = 'PENJARA';
      subTitle = 'JUST VISITING / IN JAIL';
      infoTitle = 'Ketentuan Hanya Lewat vs Tahanan';
      infoContent = '• <b>Hanya Lewat:</b> Jika mendarat biasa, Anda hanya berkunjung dan bebas melangkah di putaran berikutnya.<br>• <b>Tahanan:</b> Jika dijebloskan, keluar dengan dadu kembar, tebusan Rp 1.500.000, atau Kartu Bebas Penjara.';
      badgeText = 'Tebusan: Rp 1.500.000';
      badgeColor = 'text-amber-400';
    } else if (space.id === 30 || space.subType === 'go-to-jail') {
      headerBg = 'bg-gradient-to-r from-rose-950 via-red-900 to-rose-900';
      headerIcon = `<div class="w-12 h-12 mx-auto text-rose-200 mb-1">${GameIcons.police}</div>`;
      categoryTitle = 'PERINTAH POLISI • TAHANAN';
      cardTitle = 'MASUK PENJARA!';
      subTitle = 'GO TO JAIL';
      infoTitle = 'Perintah Penahanan Langsung';
      infoContent = 'Bidak Anda langsung dipindahkan ke sel Penjara (posisi 10). Anda tidak melewati petak Mulai dan tidak mendapatkan gaji Rp 2.000.000.';
      badgeText = 'Pindah ke Petak 10';
      badgeColor = 'text-rose-400';
    }

    return `
      <div class="title-deed-card-container mx-auto bg-white rounded-3xl border-4 border-zinc-900 overflow-hidden text-zinc-900 shadow-2xl max-w-[340px] w-full select-none text-left">
        <div class="p-4 text-center ${headerBg} text-white">
          ${headerIcon}
          <div class="text-[9px] uppercase tracking-widest opacity-80 font-outfit font-bold">${categoryTitle}</div>
          <div class="text-base md:text-lg font-black uppercase font-outfit leading-tight mt-0.5">${cardTitle}</div>
          ${subTitle ? `<div class="text-[10px] font-semibold opacity-90 tracking-wider font-outfit">${subTitle}</div>` : ''}
        </div>
        <div class="p-4 space-y-3 text-xs text-zinc-700 leading-relaxed">
          <div class="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
            <div class="font-black text-zinc-900 flex items-center gap-1.5 font-outfit text-xs">
              <span>📌</span> <span>${infoTitle}</span>
            </div>
            <p class="text-zinc-600 text-[11.5px] leading-relaxed">
              ${infoContent}
            </p>
          </div>
          <div class="px-3.5 py-2 bg-zinc-900 text-white rounded-xl flex items-center justify-between text-[11.5px] font-semibold font-outfit">
            <span class="text-zinc-400">Status Petak:</span>
            <span class="font-bold ${badgeColor}">${badgeText}</span>
          </div>
        </div>
        ${extraFooterHtml}
      </div>
    `;
  } else if (space.type === 'tax') {
    const isLuxury = space.id === 38 || (space.name && space.name.includes('Istimewa'));
    const taxAmount = space.amount || (isLuxury ? 1000000 : 2000000);
    return `
      <div class="title-deed-card-container mx-auto bg-white rounded-3xl border-4 border-zinc-900 overflow-hidden text-zinc-900 shadow-2xl max-w-[340px] w-full select-none text-left">
        <div class="p-4 text-center bg-gradient-to-r from-rose-950 via-rose-900 to-red-950 text-white">
          <div class="w-12 h-12 mx-auto text-rose-300 mb-1 flex items-center justify-center text-3xl">🧾</div>
          <div class="text-[9px] uppercase tracking-widest opacity-80 font-outfit font-bold">KAS NEGARA • PAJAK WAJIB</div>
          <div class="text-base md:text-lg font-black uppercase font-outfit leading-tight mt-0.5">${space.name}</div>
          <div class="text-[10px] font-semibold opacity-90 tracking-wider font-outfit">${isLuxury ? 'LUXURY TAX' : 'INCOME TAX'}</div>
        </div>
        <div class="p-4 space-y-3 text-xs text-zinc-700 leading-relaxed">
          <div class="p-3 bg-rose-50 border border-rose-200 rounded-2xl space-y-1">
            <div class="font-black text-rose-950 flex items-center gap-1.5 font-outfit text-xs">
              <span>⚠️</span> <span>Kewajiban Setor Kas</span>
            </div>
            <p class="text-rose-900/90 text-[11.5px] leading-relaxed">
              ${space.description || 'Pemain yang mendarat di petak ini wajib membayar sejumlah dana pajak resmi langsung ke Bank kas negara.'}
            </p>
          </div>
          <div class="py-2 bg-zinc-900 text-center text-white rounded-xl font-outfit">
            <div class="text-[9px] uppercase tracking-wider text-rose-300 font-bold">NOMINAL PAJAK KAS</div>
            <div class="text-base font-black text-rose-200 tracking-wide">${formatCurrency(taxAmount)}</div>
          </div>
        </div>
        ${extraFooterHtml}
      </div>
    `;
  } else if (space.type === 'special') {
    const isChance = space.subType === 'chance' || (space.name && space.name.includes('Kesempatan'));
    return `
      <div class="title-deed-card-container mx-auto bg-white rounded-3xl border-4 border-zinc-900 overflow-hidden text-zinc-900 shadow-2xl max-w-[340px] w-full select-none text-left">
        <div class="p-4 text-center ${isChance ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600' : 'bg-gradient-to-r from-sky-800 via-sky-700 to-blue-700'} text-white">
          <div class="w-12 h-12 mx-auto text-white mb-1 flex items-center justify-center text-3xl">${isChance ? '🎲' : '💼'}</div>
          <div class="text-[9px] uppercase tracking-widest opacity-80 font-outfit font-bold">${isChance ? 'KARTU KESEMPATAN' : 'KARTU DANA UMUM'}</div>
          <div class="text-base md:text-lg font-black uppercase font-outfit leading-tight mt-0.5">${space.name}</div>
          <div class="text-[10px] font-semibold opacity-90 tracking-wider font-outfit">${isChance ? 'CHANCE SPACE' : 'COMMUNITY CHEST SPACE'}</div>
        </div>
        <div class="p-4 space-y-3 text-xs text-zinc-700 leading-relaxed">
          <div class="p-3 ${isChance ? 'bg-amber-50 border border-amber-200' : 'bg-sky-50 border border-sky-200'} rounded-2xl space-y-1">
            <div class="font-black ${isChance ? 'text-amber-950' : 'text-sky-950'} flex items-center gap-1.5 font-outfit text-xs">
              <span>✨</span> <span>Ambil Kartu Kejutan</span>
            </div>
            <p class="${isChance ? 'text-amber-900/90' : 'text-sky-900/90'} text-[11.5px] leading-relaxed">
              ${isChance ? 'Mendarat di petak ini akan memicu penarikan satu Kartu Kesempatan. Bersiaplah untuk hadiah uang, tagihan pajak tak terduga, jalan-jalan dinas, atau pilihan keputusan satir!' : 'Mendarat di petak ini akan memicu penarikan satu Kartu Dana Umum kas warga. Dapatkan bantuan subsidi, denda iuran, perbaikan rumah, atau pilihan sosial!'}
            </p>
          </div>
          <div class="px-3.5 py-2 bg-zinc-900 text-white rounded-xl flex items-center justify-between text-[11.5px] font-semibold font-outfit">
            <span class="text-zinc-400">Efek Pendaratan:</span>
            <span class="font-bold text-amber-300">Tarik Kartu Otomatis</span>
          </div>
        </div>
        ${extraFooterHtml}
      </div>
    `;
  }

  // Fallback untuk petak lainnya agar tidak pernah mengembalikan string kosong
  return `
    <div class="title-deed-card-container mx-auto bg-white rounded-3xl border-4 border-zinc-900 overflow-hidden text-zinc-900 shadow-2xl max-w-[340px] w-full select-none text-left">
      <div class="p-4 text-center bg-zinc-800 text-white">
        <div class="text-base font-black uppercase font-outfit leading-tight">${space.name || 'Petak Papan'}</div>
      </div>
      <div class="p-4 text-xs text-zinc-700 leading-relaxed">
        <p>${space.description || 'Informasi petak pada papan permainan Monopoli Nusantara.'}</p>
      </div>
      ${extraFooterHtml}
    </div>
  `;
}

// Dialog Pembelian Properti Mewah - Full Kartu Sertifikat Modal
async function showBuyProposal(action, player) {
  if (isModalOpen || isProcessingAction) return;
  isModalOpen = true;
  isProcessingAction = true;

  try {
    const space = action.space;
    const canAfford = player.money >= action.price;
    const balanceFormatted = formatCurrency(player.money);
    const remainingBalanceFormatted = formatCurrency(Math.max(0, player.money - action.price));

    const extraFooterHtml = `
      <!-- User Cash Info -->
      <div class="p-3 bg-zinc-950 text-white border-t border-zinc-800 space-y-1.5 text-xs">
        <div class="flex justify-between items-center">
          <span class="text-zinc-400 font-medium">Saldo Kas Anda:</span>
          <span class="font-bold text-white">${balanceFormatted}</span>
        </div>
        <div class="flex justify-between items-center border-t border-zinc-800/80 pt-1.5">
          <span class="text-zinc-400 font-medium">Estimasi Sisa Saldo:</span>
          <span class="${canAfford ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}">${remainingBalanceFormatted}</span>
        </div>
        ${!canAfford ? '<div class="text-center text-[10px] text-red-400 font-bold bg-red-950/60 border border-red-500/30 py-1 rounded-lg mt-1">Saldo kas tidak mencukupi untuk membeli properti ini</div>' : ''}
      </div>

      <!-- Action Buttons -->
      <div class="p-2.5 bg-zinc-900 border-t border-zinc-800 flex gap-2 font-outfit">
        ${canAfford ? `
          <button id="btnBuyNow" class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs md:text-sm tracking-wide shadow transition flex items-center justify-center gap-1.5 cursor-pointer">
            Beli Properti
          </button>
        ` : `
          <button disabled class="flex-1 py-2.5 px-3 rounded-xl bg-zinc-800 text-zinc-500 font-bold text-xs md:text-sm tracking-wide cursor-not-allowed flex items-center justify-center gap-1.5">
            Saldo Kurang
          </button>
        `}
        <button id="btnPassBuy" class="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 hover:text-white font-semibold text-xs md:text-sm transition flex items-center justify-center gap-1 cursor-pointer">
          Lewati
        </button>
      </div>
    `;

    const cardHtml = generateTitleDeedCardHTML(space, null, false, extraFooterHtml);

    modalContainer.innerHTML = `
      <div class="fixed inset-0 bg-black/40 backdrop-blur-[3px] flex items-center justify-center p-4 z-50 font-sans animate-fade-in select-none">
        <div class="relative max-w-[340px] w-full animate-scale-up">
          ${cardHtml}
        </div>
      </div>
    `;
    modalContainer.classList.remove('hidden');

    const userChoice = await new Promise((resolve) => {
      document.getElementById('btnBuyNow')?.addEventListener('click', () => resolve('buy'));
      document.getElementById('btnPassBuy')?.addEventListener('click', () => resolve('pass'));
    });

    closeModal();
    forceCloseAllModals();

    if (userChoice === 'buy' && canAfford) {
      sound.playBuy();
      showFloatingCash(action.price, false, 'Beli Properti');
      triggerConfetti({ particleCount: 40 });
      const newState = await apiCall('/api/game/buy', { spaceId: space.id, playerId: player.id });
      if (newState) {
        state = newState;
        updateBoardUI();
      }
    } else {
      const newState = await apiCall('/api/game/pass');
      if (newState) {
        state = newState;
        updateBoardUI();
      }
    }
  } finally {
    isProcessingAction = false;
    isModalOpen = false;
    forceCloseAllModals();
    updateHUD();
  }
}

// Dialog Bangun Rumah / Hotel saat mendarat di tanah sendiri - Full Kartu Sertifikat Modal
async function showBuildProposal(action, player) {
  if (isModalOpen || isProcessingAction) return;
  isModalOpen = true;
  isProcessingAction = true;

  try {
    const space = action.space;
    const prop = (state && state.properties && state.properties[space.id]) || { houses: action.currentHouses || 0, isHotel: action.isHotel || false };
    const canAfford = player.money >= action.cost;
    const isHotel = action.nextLevel === 'hotel';
    const nextLevelName = isHotel ? 'Hotel Megah' : `Rumah ke-${action.nextHouseNum || ((prop.houses || 0) + 1)}`;
    const costFormatted = formatCurrency(action.cost);
    const balanceFormatted = formatCurrency(player.money);
    const remainingBalanceFormatted = formatCurrency(Math.max(0, player.money - action.cost));

    const extraFooterHtml = `
      <!-- User Cash Info -->
      <div class="p-3 bg-zinc-950 text-white border-t border-zinc-800 space-y-1.5 text-xs">
        <div class="flex justify-between items-center">
          <span class="text-zinc-400 font-medium">Konstruksi:</span>
          <span class="font-bold text-amber-300 font-outfit text-sm">${nextLevelName}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-zinc-400 font-medium">Biaya Bangun:</span>
          <span class="font-bold text-amber-400 text-sm">${costFormatted}</span>
        </div>
        <div class="flex justify-between items-center border-t border-zinc-800/80 pt-1.5">
          <span class="text-zinc-400 font-medium">Saldo Kas Anda:</span>
          <span class="font-bold text-white">${balanceFormatted}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-zinc-400 font-medium">Estimasi Sisa Saldo:</span>
          <span class="${canAfford ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}">${remainingBalanceFormatted}</span>
        </div>
        ${!canAfford ? '<div class="text-center text-[10px] text-red-400 font-bold bg-red-950/60 border border-red-500/30 py-1 rounded-lg mt-1">Saldo kas tidak mencukupi untuk membangun properti ini</div>' : ''}
      </div>

      <!-- Action Buttons -->
      <div class="p-2.5 bg-zinc-900 border-t border-zinc-800 flex gap-2 font-outfit">
        ${canAfford ? `
          <button id="btnBuildNow" class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs md:text-sm tracking-wide shadow transition flex items-center justify-center gap-1.5 cursor-pointer">
            Bangun ${isHotel ? 'Hotel' : 'Rumah'}
          </button>
        ` : `
          <button disabled class="flex-1 py-2.5 px-3 rounded-xl bg-zinc-800 text-zinc-500 font-bold text-xs md:text-sm tracking-wide cursor-not-allowed flex items-center justify-center gap-1.5">
            Saldo Kurang
          </button>
        `}
        <button id="btnPassBuild" class="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 hover:text-white font-semibold text-xs md:text-sm transition flex items-center justify-center gap-1 cursor-pointer">
          Lewati
        </button>
      </div>
    `;

    const cardHtml = generateTitleDeedCardHTML(space, prop, true, extraFooterHtml);

    modalContainer.innerHTML = `
      <div class="fixed inset-0 bg-black/40 backdrop-blur-[3px] flex items-center justify-center p-4 z-50 font-sans animate-fade-in select-none">
        <div class="relative max-w-[340px] w-full animate-scale-up">
          ${cardHtml}
        </div>
      </div>
    `;
    modalContainer.classList.remove('hidden');

    const userChoice = await new Promise((resolve) => {
      document.getElementById('btnBuildNow')?.addEventListener('click', () => resolve('build'));
      document.getElementById('btnPassBuild')?.addEventListener('click', () => resolve('pass'));
    });

    closeModal();
    forceCloseAllModals();

    if (userChoice === 'build' && canAfford) {
      sound.playBuy();
      showFloatingCash(action.cost, false, isHotel ? 'Bangun Hotel' : 'Bangun Rumah');
      triggerConfetti({ particleCount: 45 });
      const newState = await apiCall('/api/game/build', { spaceId: space.id, playerId: player.id });
      if (newState) {
        state = newState;
        updateBoardUI();
      }
    } else {
      const newState = await apiCall('/api/game/pass');
      if (newState) {
        state = newState;
        updateBoardUI();
      }
    }
  } finally {
    isProcessingAction = false;
    isModalOpen = false;
    forceCloseAllModals();
    updateHUD();
  }
}

// Dialog Kartu Satir Interaktif dengan Tampilan Deluxe & Keputusan Interaktif
async function showCardDrawn(action, player) {
  if (isModalOpen || isProcessingAction) return;
  isModalOpen = true;
  isProcessingAction = true;

  try {
    const isChance = action.cardType === 'Chance' || action.cardType === 'Kesempatan';
    const card = action.card;
    const headerTitle = isChance ? 'KESEMPATAN' : 'DANA UMUM';
    const cardSubtitle = isChance ? 'CHANCE CARD' : 'COMMUNITY CHEST';
    const cardHeaderIconHtml = isChance ? `<div class="w-5 h-5 text-amber-300">${GameIcons.chance}</div>` : `<div class="w-5 h-5 text-sky-200">${GameIcons.chest}</div>`;

    const hasChoices = card.choices && Array.isArray(card.choices) && card.choices.length > 0;

    // Ambil icon utama dari tipe kartu
    let mainIconHtml = `<div class="w-12 h-12 mx-auto text-zinc-600">${GameIcons.cardEmblem}</div>`;
    if (hasChoices) mainIconHtml = `<div class="w-12 h-12 mx-auto text-amber-500 flex items-center justify-center text-3xl">⚖️</div>`;
    else if (card.type === 'receive_money') mainIconHtml = `<div class="w-12 h-12 mx-auto text-emerald-600">${GameIcons.moneyBag}</div>`;
    else if (card.type === 'pay_money') mainIconHtml = `<div class="w-12 h-12 mx-auto text-red-500">${GameIcons.bill}</div>`;
    else if (card.type === 'go_to_jail') mainIconHtml = `<div class="w-12 h-12 mx-auto text-orange-600">${GameIcons.jailLock}</div>`;
    else if (card.type === 'jail_card') mainIconHtml = `<div class="w-12 h-12 mx-auto text-emerald-500 text-4xl flex items-center justify-center">🍀</div>`;
    else if (card.type === 'move_to' || card.type === 'move_steps') mainIconHtml = `<div class="w-12 h-12 mx-auto text-blue-600">${GameIcons.compass}</div>`;
    else if (card.type === 'repairs') mainIconHtml = `<div class="w-12 h-12 mx-auto text-amber-700">${GameIcons.tools}</div>`;

    modalContainer.innerHTML = `
      <div id="cardDrawnBackdrop" class="fixed inset-0 bg-black/75 backdrop-blur-[3px] flex items-center justify-center p-4 z-50 font-sans select-none animate-fade-in">
        <!-- Container Kartu dengan Perspektif 3D -->
        <div class="relative w-full max-w-[340px] sm:max-w-[350px] h-[480px]" style="perspective: 1200px;" onclick="event.stopPropagation();">
          
          <!-- Tombol Tutup Silang di Sudut Atas (✕) -->
          <button id="btnCloseCardTop" type="button" onclick="event.stopPropagation(); window.handleCardConfirm();" class="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-zinc-900 border-2 border-amber-400 text-amber-300 hover:bg-rose-600 hover:border-rose-400 hover:text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 cursor-pointer z-50 text-sm font-black">
            ✕
          </button>

          <!-- Tumpukan Kartu di Bawah (Efek Visual Deck Bertingkat sesuai Mockup) -->
          <div class="absolute -bottom-2.5 inset-x-2 h-14 rounded-[30px] ${isChance ? 'bg-[#78350f] border-2 border-[#92400e]' : 'bg-[#0c4a6e] border-2 border-[#0369a1]'} -z-10 shadow-lg pointer-events-none transition-transform duration-300"></div>
          <div class="absolute -bottom-5 inset-x-4 h-14 rounded-[30px] ${isChance ? 'bg-[#451a03] border-2 border-[#78350f]' : 'bg-[#082f49] border-2 border-[#0c4a6e]'} -z-20 shadow-md pointer-events-none transition-transform duration-300"></div>
          <div class="absolute -bottom-7 inset-x-6 h-14 rounded-[30px] ${isChance ? 'bg-[#1c0a02] border-2 border-[#451a03]' : 'bg-[#021d30] border-2 border-[#082f49]'} -z-30 shadow-sm pointer-events-none transition-transform duration-300"></div>

          <!-- Elemen Kartu yang Berputar 3D (Flip Card) -->
          <div id="activeFlipCard" class="flip-card">
            
            <!-- SISI BELAKANG (Tertutup / Face-down saat pertama kali muncul) -->
            <div class="flip-card-face flip-card-back ${isChance ? 'card-pattern-chance' : 'card-pattern-chest'} p-4 flex flex-col items-center justify-between text-center select-none cursor-pointer">
              
              <!-- Frame Hiasan Mewah Dalam -->
              <div class="w-full h-full rounded-[22px] border-2 ${isChance ? 'border-amber-300/40 bg-black/15' : 'border-sky-300/40 bg-black/15'} p-4 flex flex-col items-center justify-between relative overflow-hidden">
                
                <!-- Badge Atas -->
                <div class="flex items-center gap-1.5 px-3 py-1 rounded-full ${isChance ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40' : 'bg-sky-500/30 text-sky-200 border border-sky-400/40'} text-[10px] font-black tracking-widest uppercase">
                  <span>${isChance ? '🎲' : '💼'}</span>
                  <span>${isChance ? 'KARTU KESEMPATAN' : 'KARTU DANA UMUM'}</span>
                </div>

                <!-- Lambang Emblem Utama Bercahaya -->
                <div class="my-auto flex flex-col items-center">
                  <div class="w-24 h-24 rounded-full ${isChance ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 shadow-[0_0_35px_rgba(245,158,11,0.6)]' : 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-700 shadow-[0_0_35px_rgba(56,189,248,0.6)]'} border-4 border-white/80 flex items-center justify-center text-white mb-2.5">
                    ${isChance ? `
                      <span class="text-5xl font-black font-outfit drop-shadow-md">?</span>
                    ` : `
                      <div class="w-12 h-12 text-white drop-shadow-md">${GameIcons.chest}</div>
                    `}
                  </div>
                  <div class="text-xl font-black text-white tracking-widest font-outfit uppercase drop-shadow-md">
                    ${isChance ? 'KESEMPATAN' : 'DANA UMUM'}
                  </div>
                  <div class="text-[10px] font-bold text-white/70 tracking-widest uppercase mt-0.5 font-sans">
                    MONOPOLI NUSANTARA
                  </div>
                </div>

                <!-- Tombol Interaktif Buka Kartu -->
                <div class="w-full flex flex-col items-center">
                  <div class="w-full py-3 rounded-2xl bg-gradient-to-r ${isChance ? 'from-amber-400 via-yellow-300 to-amber-500 text-zinc-950 shadow-[0_0_25px_rgba(245,158,11,0.7)]' : 'from-sky-300 via-sky-100 to-sky-400 text-zinc-950 shadow-[0_0_25px_rgba(56,189,248,0.7)]'} font-black text-sm tracking-wider uppercase font-outfit flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 transition shadow-2xl animate-pulse">
                    <span class="text-base">👆</span>
                    <span>BUKA KARTU</span>
                  </div>
                  <div class="text-[11px] text-white/80 font-medium tracking-wide mt-1.5">
                    Ketuk untuk membuka kartu
                  </div>
                </div>

              </div>
            </div>

            <!-- SISI DEPAN (Terbuka / Face-up setelah animasi flip) -->
            <div class="flip-card-face flip-card-front bg-[#fdfbf7] flex flex-col justify-between overflow-hidden border-4 ${isChance ? 'border-[#b45309]' : 'border-[#0369a1]'}">
              
              <!-- Banner Atas Berwarna Sesuai Desain Asli -->
              <div class="${isChance ? 'flip-card-header-chance' : 'flip-card-header-chest'} pt-3.5 pb-2.5 px-4 text-center text-white flex flex-col items-center justify-center shadow-md shrink-0">
                <div class="w-8 h-8 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center mb-1 shadow-inner">
                  ${cardHeaderIconHtml}
                </div>
                <div class="text-sm font-black tracking-widest uppercase font-outfit leading-tight">
                  ${isChance ? 'KESEMPATAN' : 'DANA UMUM'}
                </div>
                <div class="text-[9px] font-semibold text-white/80 uppercase tracking-wider">
                  ${isChance ? 'CHANCE CARD' : 'COMMUNITY CHEST'}
                </div>
              </div>

              <!-- Isi Konten Kartu -->
              <div class="flex-1 py-3 px-5 flex flex-col items-center justify-center text-center bg-[#fdfbf7] overflow-y-auto">
                <div class="mb-2 filter drop-shadow-sm shrink-0">
                  ${mainIconHtml}
                </div>

                <div class="text-base sm:text-lg font-black text-zinc-900 font-outfit leading-tight mb-1.5 shrink-0">
                  ${card.title}
                </div>

                <div class="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium max-w-xs mx-auto mb-3">
                  ${card.description}
                </div>

                ${hasChoices ? `
                  <!-- Pilihan Keputusan Interaktif -->
                  <div class="w-full space-y-2 my-1 shrink-0 text-left">
                    ${card.choices.map((c, idx) => `
                      <button type="button" data-choice-id="${c.id}" onclick="event.stopPropagation(); window.handleCardChoiceSelect('${c.id}');" class="card-choice-btn w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 shadow-sm transition transform active:scale-[0.97] cursor-pointer select-none ${
                        c.theme === 'emerald' ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-500/60 text-emerald-950 font-bold' :
                        c.theme === 'rose' ? 'bg-rose-50 hover:bg-rose-100 border-rose-500/60 text-rose-950 font-bold' :
                        c.theme === 'amber' ? 'bg-amber-50 hover:bg-amber-100 border-amber-500/60 text-amber-950 font-bold' :
                        c.theme === 'purple' ? 'bg-purple-50 hover:bg-purple-100 border-purple-500/60 text-purple-950 font-bold' :
                        c.theme === 'blue' ? 'bg-blue-50 hover:bg-blue-100 border-blue-500/60 text-blue-950 font-bold' :
                        'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-900 font-bold'
                      }">
                        <div class="flex items-center gap-2 min-w-0 pointer-events-none">
                          <span class="text-xl shrink-0">${c.icon || '👉'}</span>
                          <div class="min-w-0">
                            <div class="text-xs font-black font-outfit leading-snug tracking-tight">${escapeHtml(c.title)}</div>
                            <div class="text-[10px] text-zinc-600 font-medium leading-tight truncate">${escapeHtml(c.desc)}</div>
                          </div>
                        </div>
                        ${c.badge ? `<span class="shrink-0 text-[9.5px] font-black px-2 py-0.5 rounded-full font-mono shadow-xs pointer-events-none ${
                          c.theme === 'rose' ? 'bg-rose-500 text-white' :
                          c.theme === 'emerald' ? 'bg-emerald-600 text-white' :
                          c.theme === 'purple' ? 'bg-purple-600 text-white' :
                          c.theme === 'blue' ? 'bg-blue-600 text-white' :
                          'bg-amber-500 text-black'
                        }">${escapeHtml(c.badge)}</span>` : ''}
                      </button>
                    `).join('')}
                  </div>
                ` : `
                  <!-- Indikator Pemain Terkena Efek (Pawn + Player Name sesuai Mockup) -->
                  <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-200/80 border border-zinc-300 text-xs font-bold text-zinc-800 shadow-sm shrink-0">
                    <span class="w-4 h-4 inline-flex items-center justify-center">${getChessPawnSVG(player.color, player.id, 18)}</span>
                    <span class="font-outfit font-black" style="color: ${player.color}">${player.name}</span>
                  </div>
                `}
              </div>

              <!-- Tombol Aksi di Bawah (Tombol OK Emas/Biru sesuai Mockup) -->
              <div class="p-3 bg-[#fdfbf7] border-t border-zinc-200/80 shrink-0">
                ${hasChoices ? `
                  <div class="text-center text-[10.5px] font-bold text-zinc-500 tracking-wide uppercase font-outfit">
                    👆 Pilih salah satu tindakan di atas
                  </div>
                ` : `
                  <button id="btnConfirmCardFlip" type="button" onclick="event.stopPropagation(); window.handleCardConfirm();" class="w-full py-3.5 rounded-2xl ${isChance ? 'btn-card-ok-chance' : 'btn-card-ok'} text-white font-black text-base tracking-wider font-outfit shadow-lg cursor-pointer transform active:scale-95 transition flex items-center justify-center gap-2">
                    <span>OK</span>
                  </button>
                `}
              </div>

            </div>

          </div>
        </div>
      </div>
    `;
    modalContainer.classList.remove('hidden');

    // Mekanisme Interaksi Flip Kartu 3D
    let isCardFlipped = false;
    const flipCardEl = document.getElementById('activeFlipCard');

    const doFlip = () => {
      if (isCardFlipped || !flipCardEl) return;
      isCardFlipped = true;

      sound.playCardFlip();
      flipCardEl.classList.add('is-flipped');

      setTimeout(() => {
        flipCardEl.classList.add('flip-done');

        // Normalisasi DOM setelah rotasi selesai agar tombol bebas dari batasan 3D rendering
        const backFace = flipCardEl.querySelector('.flip-card-back');
        if (backFace) {
          backFace.style.display = 'none';
          backFace.style.pointerEvents = 'none';
          backFace.style.visibility = 'hidden';
        }
        const frontFace = flipCardEl.querySelector('.flip-card-front');
        if (frontFace) {
          frontFace.style.position = 'relative';
          frontFace.style.transform = 'none';
          frontFace.style.pointerEvents = 'auto';
          frontFace.style.zIndex = '1000';
          frontFace.style.visibility = 'visible';
        }
        flipCardEl.style.transform = 'none';
        flipCardEl.style.transformStyle = 'flat';

        // Efek audio & visual setelah kartu terbuka
        if (!hasChoices && card.amount) {
          if (card.type === 'receive_money') {
            sound.playCash();
            showFloatingCash(card.amount, true, card.title || 'Hadiah Kartu');
            triggerConfetti({ particleCount: 50 });
          } else if (card.type === 'pay_money') {
            sound.playPayCash();
            showFloatingCash(card.amount, false, card.title || 'Denda Kartu');
          }
        }
        if (!hasChoices && card.type === 'go_to_jail') {
          triggerJailSiren();
        }
      }, 480);
    };

    if (flipCardEl) {
      flipCardEl.addEventListener('click', (e) => {
        if (!isCardFlipped) {
          e.stopPropagation();
          doFlip();
        }
      });
    }

    // Klik backdrop luar untuk menutup modal
    const backdropEl = document.getElementById('cardDrawnBackdrop');
    backdropEl?.addEventListener('click', (e) => {
      if (e.target === backdropEl) {
        window.handleCardConfirm();
      }
    });

    // Pasang direct event listener ke tombol OK dan Tutup Silang
    const btnOk = document.getElementById('btnConfirmCardFlip');
    if (btnOk) {
      const handleOk = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.handleCardConfirm();
      };
      btnOk.addEventListener('click', handleOk);
      btnOk.addEventListener('pointerup', handleOk);
      btnOk.addEventListener('touchend', handleOk);
    }

    const btnCloseTop = document.getElementById('btnCloseCardTop');
    if (btnCloseTop) {
      const handleCloseTop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.handleCardConfirm();
      };
      btnCloseTop.addEventListener('click', handleCloseTop);
      btnCloseTop.addEventListener('pointerup', handleCloseTop);
      btnCloseTop.addEventListener('touchend', handleCloseTop);
    }

    modalContainer.querySelectorAll('.card-choice-btn').forEach(btn => {
      const choiceId = btn.getAttribute('data-choice-id');
      if (choiceId) {
        const handleChoice = (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.handleCardChoiceSelect(choiceId);
        };
        btn.addEventListener('click', handleChoice);
        btn.addEventListener('pointerup', handleChoice);
        btn.addEventListener('touchend', handleChoice);
      }
    });

  } catch (err) {
    console.error('Card display error:', err);
    window._activeTestCard = null;
    window._activeTestCardType = null;
    isProcessingAction = false;
    isModalOpen = false;
    forceCloseAllModals();
    updateHUD();
  }
}

// Handler konfirmasi tombol OK pada kartu
window._isResolvingCardConfirm = false;

window.handleCardConfirm = async function() {
  // 1. TUTUP MODAL LANGSUNG SECARA INSTAN DI DOM TANPA MENUNGGU APAPUN
  try {
    const mc = document.getElementById('modalContainer');
    if (mc) {
      mc.innerHTML = '';
      mc.classList.add('hidden');
    }
  } catch (e) {}
  isModalOpen = false;
  isProcessingAction = false;
  try { sound?.playClick?.(); } catch (e) {}

  if (window._isResolvingCardConfirm) return;
  window._isResolvingCardConfirm = true;

  try {
    const currentP = state ? state.players[state.currentPlayerIndex] : null;
    const prevPos = currentP ? currentP.position : 0;
    const prevPlayerId = currentP ? currentP.id : 0;
    const prevInJail = currentP ? currentP.inJail : false;

    const payload = {};
    if (window._activeTestCard) {
      payload.testCard = window._activeTestCard;
      payload.cardType = window._activeTestCardType;
    }

    const newState = await apiCall('/api/game/resolve-card', payload);
    window._activeTestCard = null;
    window._activeTestCardType = null;
    if (newState) {
      const updatedP = newState.players[prevPlayerId];
      const newPos = updatedP ? updatedP.position : prevPos;

      // 1. Jika kartu menginstruksikan langkah gerak maju / mundur (ada animasi jalan dan sound effect)
      if (!prevInJail && updatedP && !updatedP.inJail && newPos !== prevPos) {
        let totalSteps = (newPos - prevPos + 40) % 40;
        let isBackward = false;

        // Cek jika perpindahan adalah langkah mundur (misal: mundur 3 langkah)
        const diff = (prevPos - newPos + 40) % 40;
        if (diff > 0 && diff <= 10 && ((prevPos - newPos === 3) || (prevPos === 0 && newPos === 37) || (prevPos === 1 && newPos === 38) || (prevPos === 2 && newPos === 39))) {
          totalSteps = diff;
          isBackward = true;
        }

        if (totalSteps > 0) {
          await animateTokenStepByStep(prevPlayerId, prevPos, newPos, totalSteps, isBackward);
        }
      }

      // 2. Deteksi keluar/masuk uang dari efek kartu & log permainan
      if (newState.logs && newState.logs.length > 0) {
        const latestMsg = newState.logs[0].message;
        if (latestMsg.includes('membayar sewa') || latestMsg.includes('membayar Pajak') || latestMsg.includes('membayar denda') || latestMsg.includes('membayar Rp') || latestMsg.includes('kehilangan modal')) {
          sound.playPayCash();
          const match = latestMsg.match(/Rp\s*([\d\.]+)/);
          const rawAmount = match ? parseInt(match[1].replace(/\./g, '')) : 0;
          if (rawAmount > 0) {
            let label = 'Keluar Uang';
            if (latestMsg.includes('membayar sewa')) label = 'Bayar Sewa Properti';
            else if (latestMsg.includes('membayar Pajak')) label = 'Bayar Pajak';
            else if (latestMsg.includes('membayar denda')) label = 'Denda Kartu';
            else if (latestMsg.includes('kehilangan modal')) label = 'Rugi Trading';
            else if (latestMsg.includes('membayar Rp')) label = 'Pembayaran Kartu';
            showFloatingCash(rawAmount, false, label);
          }
        } else if (latestMsg.includes('memperoleh') || latestMsg.includes('mengambil Rp') || latestMsg.includes('menang jackpot')) {
          sound.playCash();
          const match = latestMsg.match(/Rp\s*([\d\.]+)/);
          const rawAmount = match ? parseInt(match[1].replace(/\./g, '')) : 0;
          if (rawAmount > 0) {
            let label = 'Terima Uang';
            if (latestMsg.includes('melewati Mulai')) label = 'Gaji Lewat Mulai';
            else if (latestMsg.includes('menang jackpot')) label = '🎉 Cuan Jackpot!';
            else if (latestMsg.includes('memperoleh')) label = 'Hadiah Kartu';
            showFloatingCash(rawAmount, true, label);
            triggerConfetti({ particleCount: 40 });
          }
        }
      }

      state = newState;
      updateBoardUI();

      // Cek apakah aksi menyebabkan masuk penjara
      if (updatedP && updatedP.inJail && !prevInJail) {
        triggerJailSiren();
      }
    }
  } catch (err) {
    console.error('Resolve confirm card error:', err);
    window._activeTestCard = null;
    window._activeTestCardType = null;
  } finally {
    isProcessingAction = false;
    isModalOpen = false;
    window._isResolvingCardConfirm = false;
    forceCloseAllModals();
    updateHUD();
  }
};

// Handler pemilihan opsi keputusan pada kartu
window._isResolvingCardChoice = false;

window.handleCardChoiceSelect = async function(choiceId) {
  // 1. TUTUP MODAL LANGSUNG SECARA INSTAN DI DOM TANPA MENUNGGU APAPUN
  try {
    const mc = document.getElementById('modalContainer');
    if (mc) {
      mc.innerHTML = '';
      mc.classList.add('hidden');
    }
  } catch (e) {}
  isModalOpen = false;
  isProcessingAction = false;
  try { sound?.playClick?.(); } catch (e) {}

  if (window._isResolvingCardChoice) return;
  window._isResolvingCardChoice = true;

  try {
    const currentP = state ? state.players[state.currentPlayerIndex] : null;
    const prevPos = currentP ? currentP.position : 0;
    const prevPlayerId = currentP ? currentP.id : 0;
    const prevInJail = currentP ? currentP.inJail : false;

    const payload = { choice: choiceId };
    if (window._activeTestCard) {
      payload.testCard = window._activeTestCard;
      payload.cardType = window._activeTestCardType;
    }

    const newState = await apiCall('/api/game/resolve-card', payload);
    window._activeTestCard = null;
    window._activeTestCardType = null;
    if (newState) {
      const updatedP = newState.players[prevPlayerId];
      const newPos = updatedP ? updatedP.position : prevPos;

      // 1. Jika kartu menginstruksikan langkah gerak maju / mundur (ada animasi jalan dan sound effect)
      if (!prevInJail && updatedP && !updatedP.inJail && newPos !== prevPos) {
        let totalSteps = (newPos - prevPos + 40) % 40;
        let isBackward = false;

        // Cek jika perpindahan adalah langkah mundur (misal: mundur 3 langkah)
        const diff = (prevPos - newPos + 40) % 40;
        if (diff > 0 && diff <= 10 && (choiceId === 'choice_step_back' || (prevPos - newPos === 3) || (prevPos === 0 && newPos === 37) || (prevPos === 1 && newPos === 38) || (prevPos === 2 && newPos === 39))) {
          totalSteps = diff;
          isBackward = true;
        }

        if (totalSteps > 0) {
          await animateTokenStepByStep(prevPlayerId, prevPos, newPos, totalSteps, isBackward);
        }
      }

      // 2. Deteksi keluar/masuk uang dari efek kartu & log permainan
      if (newState.logs && newState.logs.length > 0) {
        const latestMsg = newState.logs[0].message;
        if (latestMsg.includes('membayar sewa') || latestMsg.includes('membayar Pajak') || latestMsg.includes('membayar denda') || latestMsg.includes('membayar Rp') || latestMsg.includes('kehilangan modal')) {
          sound.playPayCash();
          const match = latestMsg.match(/Rp\s*([\d\.]+)/);
          const rawAmount = match ? parseInt(match[1].replace(/\./g, '')) : 0;
          if (rawAmount > 0) {
            let label = 'Keluar Uang';
            if (latestMsg.includes('membayar sewa')) label = 'Bayar Sewa Properti';
            else if (latestMsg.includes('membayar Pajak')) label = 'Bayar Pajak';
            else if (latestMsg.includes('membayar denda')) label = 'Denda Kartu';
            else if (latestMsg.includes('kehilangan modal')) label = 'Rugi Trading';
            else if (latestMsg.includes('membayar Rp')) label = 'Pembayaran Kartu';
            showFloatingCash(rawAmount, false, label);
          }
        } else if (latestMsg.includes('memperoleh') || latestMsg.includes('mengambil Rp') || latestMsg.includes('menang jackpot')) {
          sound.playCash();
          const match = latestMsg.match(/Rp\s*([\d\.]+)/);
          const rawAmount = match ? parseInt(match[1].replace(/\./g, '')) : 0;
          if (rawAmount > 0) {
            let label = 'Terima Uang';
            if (latestMsg.includes('melewati Mulai')) label = 'Gaji Lewat Mulai';
            else if (latestMsg.includes('menang jackpot')) label = '🎉 Cuan Jackpot!';
            else if (latestMsg.includes('memperoleh')) label = 'Hadiah Kartu';
            showFloatingCash(rawAmount, true, label);
            triggerConfetti({ particleCount: 40 });
          }
        }
      }

      state = newState;
      updateBoardUI();

      // Cek apakah aksi menyebabkan masuk penjara
      if (updatedP && updatedP.inJail && !prevInJail) {
        triggerJailSiren();
      }
    }
  } catch (err) {
    console.error('Resolve choice card error:', err);
    window._activeTestCard = null;
    window._activeTestCardType = null;
  } finally {
    isProcessingAction = false;
    isModalOpen = false;
    window._isResolvingCardChoice = false;
    forceCloseAllModals();
    updateHUD();
  }
};

// Sertifikat Kepemilikan Tanah & Bangunan (Visual Title Deed Card) - Full Kartu Modal
function showTitleDeed(space) {
  if (!state || isModalOpen) return;
  const prop = state.properties[space.id];
  const owner = prop && prop.ownerId !== null && prop.ownerId !== undefined ? state.players[prop.ownerId] : null;
  const current = state.players[state.currentPlayerIndex];
  const isOwnerAndTurn = owner && current && owner.id === current.id && !current.isAI && state.phase !== 'GAME_OVER';

  const sellPrice = Math.round((space.price || 0) * 0.5);
  const housesRefund = prop ? ((prop.houses || 0) * Math.round((space.housePrice || 0) * 0.5) + (prop.isHotel ? 5 * Math.round((space.housePrice || 0) * 0.5) : 0)) : 0;
  const totalSellPrice = sellPrice + housesRefund;
  const isPurchasable = ['property', 'railroad', 'utility'].includes(space.type);

  const extraFooterHtml = `
    ${isPurchasable ? `
      <!-- Ownership Status -->
      <div class="p-3 bg-zinc-950 text-white border-t border-zinc-800 text-xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-zinc-400">Status Kepemilikan:</span>
          ${owner ? `<span class="font-bold flex items-center gap-1.5" style="color: ${owner.color}"><span class="w-4 h-4 inline-flex items-center justify-center">${getChessPawnSVG(owner.color, owner.id, 18)}</span> <span>${owner.name}</span></span>` : `<span class="font-bold text-emerald-400">Tersedia (Bebas)</span>`}
        </div>
        ${prop?.houses > 0 && !prop?.isHotel ? `<div class="text-emerald-400 font-semibold flex items-center gap-1.5"><span class="w-3.5 h-3.5 inline-block">${GameIcons.house}</span> <span>Terbangun ${prop.houses} Rumah</span></div>` : ''}
        ${prop?.isHotel ? `<div class="text-red-400 font-semibold flex items-center gap-1.5"><span class="w-3.5 h-3.5 inline-block">${GameIcons.hotel}</span> <span>Terbangun Hotel Megah</span></div>` : ''}
      </div>

      ${isOwnerAndTurn ? `
        <div class="p-2.5 bg-zinc-900 border-t border-zinc-800 flex flex-col gap-2 font-outfit">
          ${space.type === 'property' && !prop.isHotel ? `
            <div class="p-2 bg-zinc-950/80 rounded-xl text-zinc-400 text-[11px] text-center border border-zinc-800/80 font-medium">
              Pembangunan rumah dilakukan saat bidak Anda mendarat kembali di petak ini (maksimal 1 per pendaratan).
            </div>
          ` : ''}
          <button id="btnSellPropertyDeed" class="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-rose-950/90 hover:bg-rose-900 text-rose-200 border border-rose-500/50 shadow transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5">
            <span>🏷️ Jual ke Bank (+${formatCurrency(totalSellPrice)})</span>
          </button>
        </div>
      ` : ''}
    ` : ''}

    <div class="p-2.5 bg-zinc-950 border-t border-zinc-800">
      <button id="btnCloseDeed" class="w-full py-2 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-gray-200 rounded-xl text-xs font-semibold transition cursor-pointer font-outfit">
        Tutup
      </button>
    </div>
  `;

  const cardHtml = generateTitleDeedCardHTML(space, prop, false, extraFooterHtml);
  if (!cardHtml) return;

  modalContainer.innerHTML = `
    <div id="titleDeedBackdrop" class="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center p-4 z-50 font-sans animate-fade-in select-none">
      <div class="relative max-w-[340px] w-full animate-scale-up" onclick="event.stopPropagation();">
        <button id="btnCloseDeedTop" type="button" class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-400 text-zinc-200 hover:bg-rose-600 hover:border-rose-400 hover:text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 cursor-pointer z-50 text-xs font-black" title="Tutup">✕</button>
        ${cardHtml}
      </div>
    </div>
  `;
  modalContainer.classList.remove('hidden');

  document.getElementById('btnCloseDeed')?.addEventListener('click', closeModal);
  document.getElementById('btnCloseDeedTop')?.addEventListener('click', closeModal);
  document.getElementById('titleDeedBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'titleDeedBackdrop') {
      closeModal();
    }
  });

  // Konfirmasi Jual Properti ke Bank dengan SweetAlert
  document.getElementById('btnSellPropertyDeed')?.addEventListener('click', async () => {
    closeModal();
    if (isModalOpen || isProcessingAction) return;
    isModalOpen = true;
    isProcessingAction = true;
    try {
      const result = await Swal.fire({
        title: `<span class="swal2-monopoly-title">Jual Properti ke Bank</span>`,
        html: `
          <div class="text-left text-xs text-zinc-300 font-sans">
            <p class="mb-3 text-sm">Apakah Anda yakin ingin menjual sertifikat <b class="text-amber-300">${space.name}</b> ke Bank?</p>
            <div class="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="text-zinc-400">Harga Beli:</span>
                <span class="font-bold text-white">${formatCurrency(space.price)}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-zinc-400">Nilai Jual (50%):</span>
                <span class="text-emerald-400 font-black text-sm">+${formatCurrency(totalSellPrice)}</span>
              </div>
              <div class="text-[11px] text-rose-300 bg-rose-950/40 border border-rose-500/30 p-2 rounded-lg leading-relaxed mt-1">
                ⚠️ Tanah ini akan kembali <b>BEBAS tanpa pemilik</b>. Siapapun yang mendarat di petak ini nantinya bisa membelinya kembali dari Bank.
              </div>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Ya, Jual Sekarang',
        cancelButtonText: 'Batal',
        customClass: {
          popup: 'swal2-monopoly-popup',
          confirmButton: 'swal2-monopoly-confirm',
          cancelButton: 'swal2-monopoly-cancel'
        },
        buttonsStyling: false
      });

      forceCloseAllModals();

      if (result.isConfirmed) {
        sound.playCash();
        showFloatingCash(totalSellPrice, true);
        const newState = await apiCall('/api/game/sell-property', { spaceId: space.id, playerId: current.id });
        if (newState) {
          state = newState;
          updateBoardUI();
        }
      }
    } finally {
      isProcessingAction = false;
      isModalOpen = false;
      forceCloseAllModals();
      updateHUD();
    }
  });
}

// Layar Pemenang Spektakuler dengan SweetAlert2 & Confetti Fireworks
function showGameOver(winner) {
  isModalOpen = true;
  isGameOverModalShown = true;
  sound.playWin();

  // Kembang api confetti berulang selama 4 detik
  const duration = 4 * 1000;
  const end = Date.now() + duration;
  const frame = () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#fbbf24']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#fbbf24']
      });
    }
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();

  const isOnlyRemaining = state && state.players && (state.players.filter(p => !p.isBankrupt).length <= 1);

  Swal.fire({
    title: `<span class="swal2-monopoly-title text-2xl md:text-3xl flex items-center justify-center gap-2"><span class="w-7 h-7 text-amber-400 inline-block">${GameIcons.trophy}</span> <span>JUARA MONOPOLI!</span> <span class="w-7 h-7 text-amber-400 inline-block">${GameIcons.trophy}</span></span>`,
    html: `
      <div class="text-center font-sans py-2">
        <div class="w-16 h-16 mx-auto text-amber-400 mb-3 animate__animated animate__tada animate__infinite">${GameIcons.crown}</div>
        <h2 class="text-2xl font-black text-amber-300 font-outfit mb-2">${winner.name}</h2>
        <p class="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
          ${isOnlyRemaining ? 'Selamat! Seluruh pemain lawan telah keluar/menyerah atau bangkrut. Anda menjadi satu-satunya pemain yang bertahan dan dinobatkan sebagai <b>Penguasa Properti Terkaya di Nusantara</b>!' : 'Selamat! Seluruh konglomerat lawan telah bangkrut. Anda dinobatkan sebagai <b>Penguasa Properti Terkaya di Nusantara</b>!'}
        </p>
      </div>
    `,
    confirmButtonText: `<span class="flex items-center justify-center gap-1.5"><span class="w-4 h-4 inline-block">${GameIcons.refresh}</span> <span>Main Lagi</span></span>`,
    customClass: {
      popup: 'swal2-monopoly-popup',
      confirmButton: 'swal2-monopoly-confirm'
    },
    buttonsStyling: false,
    allowOutsideClick: false
  }).then(() => {
    forceCloseAllModals();
    stopAllPolling();
    currentOnlineRoom = null;
    currentOnlinePlayer = null;
    isGameOverModalShown = false;
    showScreen('homeMenuScreen');
  });
}

// ==============================================
// MULTIPLAYER ONLINE ROOM & LOBBY ENGINE
// ==============================================

function stopAllPolling() {
  if (lobbyPollInterval) {
    clearInterval(lobbyPollInterval);
    lobbyPollInterval = null;
  }
  if (inGamePollInterval) {
    clearInterval(inGamePollInterval);
    inGamePollInterval = null;
  }
}

function startLobbyPolling(code) {
  stopAllPolling();
  lobbyPollInterval = setInterval(async () => {
    if (!onlineLobbyScreen || onlineLobbyScreen.classList.contains('hidden')) {
      clearInterval(lobbyPollInterval);
      lobbyPollInterval = null;
      return;
    }
    const res = await apiCall(`/api/room/status?code=${encodeURIComponent(code)}`, null, 'GET');
    if (res && res.success && res.room) {
      currentOnlineRoom = res.room;
      if (res.room.status === 'PLAYING' && res.room.gameState) {
        stopAllPolling();
        launchOnlineGame(res.room.gameState);
      } else {
        renderLobbyUI();
      }
    }
  }, 1200);
}

async function checkOnlineTradeEvents(res) {
  if (!res) return;
  const human = getCurrentHumanPlayer();
  const myId = human ? parseInt(human.id) : 0;
  const myName = (human && human.name) ? human.name.trim().toLowerCase() : '';

  // 1. CEK AJAKAN TRADING (Trade Invite Handshake)
  if (res.tradeInvite) {
    const invite = res.tradeInvite;
    const isTargetMe = (parseInt(invite.toPlayerId) === myId) || (invite.toPlayerName && myName && invite.toPlayerName.trim().toLowerCase() === myName);
    const isSenderMe = (parseInt(invite.fromPlayerId) === myId) || (invite.fromPlayerName && myName && invite.fromPlayerName.trim().toLowerCase() === myName);

    // A. Pemain saat ini adalah pihak yang DIAJAK trading
    if (isTargetMe && invite.status === 'PENDING') {
      if (activeTradeInvitePromptId !== invite.id) {
        activeTradeInvitePromptId = invite.id;
        sound.playDiceRoll();

        const result = await Swal.fire({
          title: `<span class="swal2-monopoly-title">🤝 Ajakan Trading</span>`,
          html: `
            <div class="text-center text-xs text-zinc-300 font-sans space-y-2 py-1">
              <p class="text-sm"><b class="text-amber-400 font-bold">${escapeHtml(invite.fromPlayerName)}</b> mengajak Anda membuka <b class="text-white">Meja Trading</b> untuk bernegosiasi & bertukar aset properti.</p>
              <p class="text-zinc-400 text-[11px]">Apakah Anda menerima ajakan trading ini?</p>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Terima & Buka Trading',
          cancelButtonText: 'Tolak',
          customClass: {
            popup: 'swal2-monopoly-popup',
            confirmButton: 'swal2-monopoly-confirm',
            cancelButton: 'swal2-monopoly-cancel'
          },
          buttonsStyling: false,
          allowOutsideClick: false
        });

        if (result.isConfirmed) {
          sound.playCash();
          await apiCall('/api/game/trade-invite-respond', {
            playerId: myId,
            accept: true,
            inviteId: invite.id
          }, 'POST');
          openTradingDeskModal(invite.fromPlayerId);
        } else {
          await apiCall('/api/game/trade-invite-respond', {
            playerId: myId,
            accept: false,
            inviteId: invite.id
          }, 'POST');
        }
      }
    }

    // B. Pemain saat ini adalah pihak yang MENGAJAK trading
    if (isSenderMe) {
      if (invite.status === 'ACCEPTED' && isWaitingForTradeInvite) {
        isWaitingForTradeInvite = false;
        Swal.close();
        sound.playCash();
        openTradingDeskModal(invite.toPlayerId);
      } else if (invite.status === 'DECLINED' && isWaitingForTradeInvite) {
        isWaitingForTradeInvite = false;
        Swal.close();
        Swal.fire({
          title: '<span class="text-amber-400 font-outfit">Ajakan Ditolak</span>',
          text: `${activeWaitingInviteTargetName || invite.toPlayerName || 'Pemain'} menolak ajakan trading Anda saat ini.`,
          icon: 'info',
          confirmButtonText: 'Tutup',
          customClass: {
            popup: 'swal2-monopoly-popup',
            confirmButton: 'swal2-monopoly-confirm'
          },
          buttonsStyling: false
        });
        apiCall('/api/game/trade-invite-cancel', { playerId: myId }, 'POST').catch(() => {});
      }
    }
  } else {
    activeTradeInvitePromptId = null;
    if (isWaitingForTradeInvite) {
      isWaitingForTradeInvite = false;
      Swal.close();
    }
  }

  // 2. CEK PROPOSAL BARTER MASUK (Pending Trade Barter)
  if (res.pendingTrade) {
    const trade = res.pendingTrade;
    const isTargetMe = (parseInt(trade.toPlayerId) === myId);

    if (isTargetMe) {
      if (activePendingTradeId !== trade.createdAt) {
        activePendingTradeId = trade.createdAt;
        const fromPlayer = res.players.find(p => p.id === trade.fromPlayerId) || { name: 'Pemain ' + (trade.fromPlayerId + 1), id: trade.fromPlayerId };
        const toPlayer = human;

        const offer = {
          cash: trade.offerMoney || 0,
          propertyIds: trade.offerPropertyIds || [],
          jailCards: 0
        };

        const request = {
          cash: trade.requestMoney || 0,
          propertyIds: trade.requestPropertyIds || [],
          jailCards: 0
        };

        sound.playDiceRoll();
        const swalRes = await showIncomingTradeProposal(fromPlayer, toPlayer, offer, request);

        if (swalRes.isConfirmed) {
          sound.playCash();
          triggerConfetti({ particleCount: 50, spread: 80 });
          const updatedState = await apiCall('/api/game/trade/respond', {
            playerId: myId,
            accept: true
          }, 'POST');
          if (updatedState) {
            state = updatedState;
            updateBoardUI();
            updateHUD();
          }
        } else {
          await apiCall('/api/game/trade/respond', {
            playerId: myId,
            accept: false
          }, 'POST');
        }
      }
    }
  } else {
    activePendingTradeId = null;
    if (isWaitingForTradeProposal) {
      isWaitingForTradeProposal = false;
      Swal.close();
    }
  }
}

function startInGamePolling(code) {
  stopAllPolling();
  inGamePollInterval = setInterval(async () => {
    if (!inGameBoardScreen || inGameBoardScreen.classList.contains('hidden')) {
      clearInterval(inGamePollInterval);
      inGamePollInterval = null;
      return;
    }

    const res = await apiCall('/api/game/state', null, 'GET');
    if (res && res.players) {
      // 1. Sinkronisasi Real-time Emoticon & Obrolan
      if (res.chats && Array.isArray(res.chats)) {
        syncChatsFromState(res.chats);
      }

      // 2. Deteksi Event Ajakan & Proposal Barter Online
      checkOnlineTradeEvents(res);

      if (isAnimating || isBotRunning) return;

      // 3. Deteksi Pergerakan Musuh / Lawan & Mainkan Animasi Langkah + Sound Effect
      if (state && state.players) {
        for (let i = 0; i < res.players.length; i++) {
          const oldP = state.players[i];
          const newP = res.players[i];
          if (oldP && newP && oldP.position !== newP.position && !newP.inJail) {
            const currentHuman = getCurrentHumanPlayer();
            const myId = currentHuman ? currentHuman.id : -1;

            if (newP.id !== myId || state.currentPlayerIndex !== myId) {
              const startPos = oldP.position;
              const endPos = newP.position;
              let totalSteps = (endPos - startPos + 40) % 40;
              if (res.dice && Array.isArray(res.dice) && (res.dice[0] + res.dice[1]) > 0) {
                totalSteps = res.dice[0] + res.dice[1];
              }

              if (totalSteps > 0 && totalSteps <= 12) {
                isAnimating = true;
                sound.playDiceRoll();
                const die1 = document.getElementById('die1');
                const die2 = document.getElementById('die2');
                if (die1 && res.dice) renderDiceFace(die1, res.dice[0] || 1);
                if (die2 && res.dice) renderDiceFace(die2, res.dice[1] || 1);

                animateTokenStepByStep(newP.id, startPos, endPos, totalSteps).then(() => {
                  isAnimating = false;
                  state = res;
                  updateBoardUI();
                  updateHUD();
                });
                return;
              }
            }
          }
        }
      }

      const isDifferent = !state ||
        res.currentPlayerIndex !== state.currentPlayerIndex ||
        res.phase !== state.phase ||
        JSON.stringify(res.dice) !== JSON.stringify(state.dice) ||
        (res.logs && state.logs && res.logs.length !== state.logs.length) ||
        JSON.stringify(res.properties) !== JSON.stringify(state.properties) ||
        JSON.stringify(res.players.map(p => ({ pos: p.position, money: p.money, jail: p.inJail }))) !== JSON.stringify(state.players.map(p => ({ pos: p.position, money: p.money, jail: p.inJail })));

      if (isDifferent) {
        state = res;
        updateBoardUI();
        updateHUD();
      }
    }
  }, 1000);
}

function renderLobbyUI() {
  if (!currentOnlineRoom) return;

  if (lobbyRoomCodeDisplay) lobbyRoomCodeDisplay.textContent = currentOnlineRoom.code;
  const currentCount = currentOnlineRoom.players.length;
  const maxCount = currentOnlineRoom.maxPlayers;

  if (lobbyPlayerCountBadge) {
    lobbyPlayerCountBadge.textContent = `${currentCount} / ${maxCount} Pemain`;
    if (currentCount >= maxCount) {
      lobbyPlayerCountBadge.className = 'text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    } else {
      lobbyPlayerCountBadge.className = 'text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40';
    }
  }

  if (lobbySlotsContainer) {
    lobbySlotsContainer.innerHTML = '';

    for (let i = 0; i < maxCount; i++) {
      const player = currentOnlineRoom.players[i];
      const slotEl = document.createElement('div');

      if (player) {
        const isSelf = currentOnlinePlayer && (player.name === currentOnlinePlayer.name);
        slotEl.className = `p-3 rounded-2xl border transition flex items-center justify-between ${isSelf ? 'bg-amber-950/50 border-amber-500/80 shadow-md' : 'bg-zinc-800/80 border-zinc-700/80'}`;

        slotEl.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 p-1 rounded-xl border flex items-center justify-center shadow-inner" style="background-color: ${player.color}25; border-color: ${player.color}66;">
              ${getChessPawnSVG(player.color, player.id)}
            </div>
            <div>
              <div class="font-extrabold text-sm text-white flex items-center gap-2">
                <span>${player.name}</span>
                ${isSelf ? '<span class="text-[9px] bg-amber-500 text-zinc-950 font-black px-1.5 py-0.2 rounded-md">ANDA</span>' : ''}
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                ${player.isHost ? `<span class="text-[10px] bg-amber-950 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded font-bold inline-flex items-center gap-1"><span class="w-2.5 h-2.5 inline-block">${GameIcons.crown}</span><span>Host</span></span>` : ''}
                ${player.isAI ? `<span class="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 px-1.5 py-0.5 rounded font-bold inline-flex items-center gap-1"><span class="w-2.5 h-2.5 inline-block">${GameIcons.bot}</span><span>Bot AI</span></span>` : ''}
                <span class="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Siap
                </span>
              </div>
            </div>
          </div>
          <span class="text-xs font-mono font-bold text-zinc-500">#${i + 1}</span>
        `;
      } else {
        slotEl.className = 'p-3 rounded-2xl border-2 border-dashed border-zinc-700/60 bg-zinc-900/30 flex items-center justify-between opacity-70';
        slotEl.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl border border-zinc-700/60 bg-zinc-800/50 flex items-center justify-center p-2.5">
              ${GameIcons.user}
            </div>
            <div>
              <div class="font-bold text-xs text-zinc-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-ping"></span>
                <span>Menunggu Pemain Masuk...</span>
              </div>
              <div class="text-[10px] text-zinc-500">Slot Kosong (${i + 1}/${maxCount})</div>
            </div>
          </div>
          <span class="text-xs font-mono font-bold text-zinc-600">#${i + 1}</span>
        `;
      }
      lobbySlotsContainer.appendChild(slotEl);
    }
  }

  const isHost = !!currentOnlinePlayer?.isHost;
  if (isHost) {
    if (lobbyHostControls) lobbyHostControls.classList.remove('hidden');
    if (lobbyGuestControls) lobbyGuestControls.classList.add('hidden');

    if (btnLobbyAddBot) {
      btnLobbyAddBot.disabled = (currentCount >= maxCount);
      if (currentCount >= maxCount) {
        btnLobbyAddBot.classList.add('opacity-40', 'cursor-not-allowed');
      } else {
        btnLobbyAddBot.classList.remove('opacity-40', 'cursor-not-allowed');
      }
    }

    if (currentCount >= maxCount) {
      if (btnLobbyStartGame) {
        btnLobbyStartGame.disabled = false;
        btnLobbyStartGame.classList.remove('opacity-50', 'cursor-not-allowed');
        btnLobbyStartGame.classList.add('cursor-pointer');
      }
      if (lobbyStartBtnText) lobbyStartBtnText.textContent = `MULAI PERMAINAN (${currentCount}/${maxCount})`;
      if (lobbyStartWarningText) {
        lobbyStartWarningText.innerHTML = `<span class="inline-flex items-center gap-1.5"><span class="w-3.5 h-3.5 inline-block text-emerald-400">${GameIcons.check}</span> <span>Ruangan telah terisi penuh! Klik tombol di atas untuk memulai permainan.</span></span>`;
        lobbyStartWarningText.className = 'text-[11px] text-center text-emerald-400 font-bold';
      }
    } else {
      if (btnLobbyStartGame) {
        btnLobbyStartGame.disabled = true;
        btnLobbyStartGame.classList.add('opacity-50', 'cursor-not-allowed');
        btnLobbyStartGame.classList.remove('cursor-pointer');
      }
      if (lobbyStartBtnText) lobbyStartBtnText.textContent = `MULAI PERMAINAN (${currentCount}/${maxCount})`;
      if (lobbyStartWarningText) {
        const remaining = maxCount - currentCount;
        lobbyStartWarningText.innerHTML = `<span class="inline-flex items-center gap-1.5"><span class="w-3.5 h-3.5 inline-block text-amber-400">${GameIcons.warning}</span> <span>Wajib ada ${maxCount} orang pemain terisi penuh sebelum dapat mulai! (Butuh ${remaining} pemain lagi)</span></span>`;
        lobbyStartWarningText.className = 'text-[11px] text-center text-amber-400/90 font-semibold';
      }
    }
  } else {
    if (lobbyHostControls) lobbyHostControls.classList.add('hidden');
    if (lobbyGuestControls) lobbyGuestControls.classList.remove('hidden');
  }
}

function launchOnlineGame(gameState) {
  state = gameState;
  isGameOverModalShown = false;
  processedLogSet.clear();
  isInitialLogLoad = true;
  processedChatIds.clear();
  localChats = [];
  if (gameState && gameState.chats && Array.isArray(gameState.chats)) {
    gameState.chats.forEach(c => {
      processedChatIds.add(c.id);
      if (c.message && c.message.trim() !== '') {
        localChats.push(c);
      }
    });
    renderChats();
  }
  if (inGameModeBadge) {
    inGameModeBadge.textContent = `Online: ${currentOnlineRoom ? currentOnlineRoom.code : ''}`;
  }
  requestGameFullscreen();
  showScreen('inGameBoardScreen');
  renderBoard();
  updateHUD();
  if (currentOnlineRoom) {
    startInGamePolling(currentOnlineRoom.code);
  }
}

// Inisialisasi Game dari Form Pengaturan (AI / PvP)
async function startConfiguredGame(mode) {
  requestGameFullscreen();
  stopAllPolling();
  processedLogSet.clear();
  isInitialLogLoad = true;
  currentOnlineRoom = null;
  currentOnlinePlayer = null;
  isGameOverModalShown = false;

  let players = [];
  let options = { gameMode: mode };

  if (mode === 'ai') {
    const playerCount = parseInt(document.getElementById('aiPlayersSlider')?.value) || 4;
    const robotDiff = parseInt(document.getElementById('aiRobotsSlider')?.value) || 2;
    const money = parseInt(document.getElementById('aiMoneySlider')?.value) || 15000000;
    const collectInJail = document.getElementById('aiJailToggle')?.getAttribute('data-checked') === 'true';
    const auctionMode = document.getElementById('aiAuctionToggle')?.getAttribute('data-checked') === 'true';

    options.startingMoney = money;
    options.collectRentInJail = collectInJail;
    options.auctionMode = auctionMode;
    options.aiDifficulty = robotDiff === 1 ? 'Mudah' : (robotDiff === 2 ? 'Sedang' : 'Sulit');

    const tokens = ['Merah', 'Biru', 'Hijau', 'Kuning'];
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
    const botNames = ['Bot Budi', 'Bot Siti', 'Bot Joko'];

    players.push({ name: 'Pemain 1', isAI: false, token: tokens[0], color: colors[0] });
    for (let i = 1; i < playerCount; i++) {
      players.push({
        name: botNames[i - 1] || `Bot ${i}`,
        isAI: true,
        token: tokens[i] || 'Pion',
        color: colors[i] || '#8b5cf6'
      });
    }

    if (inGameModeBadge) inGameModeBadge.textContent = `vs Bot AI (${options.aiDifficulty})`;
  } else if (mode === 'pvp') {
    const playerCount = parseInt(document.getElementById('pvpPlayersSlider')?.value) || 2;
    const money = parseInt(document.getElementById('pvpMoneySlider')?.value) || 15000000;
    const collectInJail = document.getElementById('pvpJailToggle')?.getAttribute('data-checked') === 'true';
    const auctionMode = document.getElementById('pvpAuctionToggle')?.getAttribute('data-checked') === 'true';

    options.startingMoney = money;
    options.collectRentInJail = collectInJail;
    options.auctionMode = auctionMode;

    const tokens = ['Merah', 'Biru', 'Hijau', 'Kuning'];
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

    for (let i = 0; i < playerCount; i++) {
      players.push({
        name: `Pemain ${i + 1}`,
        isAI: false,
        token: tokens[i] || 'Pion',
        color: colors[i] || '#3b82f6'
      });
    }

    if (inGameModeBadge) inGameModeBadge.textContent = 'Pemain vs Pemain';
  }

  const newState = await apiCall('/api/game/new', { players, options });
  if (newState) {
    state = newState;
    processedChatIds.clear();
    localChats = [];
    renderChats();
    showScreen('inGameBoardScreen');
    renderBoard();
    updateHUD();
  }
}

// Navigation Event Listeners
document.getElementById('btnMenuAi')?.addEventListener('click', () => {
  showScreen('settingsAiScreen');
});

document.getElementById('btnMenuPvp')?.addEventListener('click', () => {
  showScreen('settingsPvpScreen');
});

document.getElementById('btnMenuOnline')?.addEventListener('click', () => {
  showScreen('settingsOnlineScreen');
});

document.getElementById('btnMenuHomeReset')?.addEventListener('click', () => {
  stopAllPolling();
  currentOnlineRoom = null;
  currentOnlinePlayer = null;
  showScreen('homeMenuScreen');
});

document.getElementById('btnBackFromAi')?.addEventListener('click', () => {
  showScreen('homeMenuScreen');
});

document.getElementById('btnBackFromPvp')?.addEventListener('click', () => {
  showScreen('homeMenuScreen');
});

document.getElementById('btnBackFromOnline')?.addEventListener('click', () => {
  showScreen('homeMenuScreen');
});

document.getElementById('btnInGameBackHome')?.addEventListener('click', async () => {
  // Jika sudah fase GAME_OVER, langsung kembali ke menu
  if (state && state.phase === 'GAME_OVER') {
    stopAllPolling();
    currentOnlineRoom = null;
    currentOnlinePlayer = null;
    forceCloseAllModals();
    showScreen('homeMenuScreen');
    return;
  }

  const result = await Swal.fire({
    title: '<span class="text-rose-400 font-outfit">Keluar dari Permainan?</span>',
    html: `
      <div class="text-center text-xs text-zinc-300 font-sans space-y-2 py-1">
        <p>Apakah Anda yakin ingin keluar ke Menu Utama?</p>
        <p class="text-amber-400 font-bold">Jika Anda keluar di tengah permainan, Anda dianggap menyerah dan pemain yang tersisa akan otomatis memenangkan permainan!</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Menyerah & Keluar',
    cancelButtonText: 'Batal',
    customClass: {
      popup: 'swal2-monopoly-popup',
      confirmButton: 'swal2-monopoly-confirm bg-rose-600 hover:bg-rose-500 text-white font-bold',
      cancelButton: 'swal2-monopoly-cancel'
    },
    buttonsStyling: false,
    allowOutsideClick: false
  });

  if (result.isConfirmed) {
    const currentHuman = getCurrentHumanPlayer();
    const myId = currentHuman ? currentHuman.id : 0;

    // 1. Kirim sinyal surrender ke server
    try {
      await apiCall('/api/game/surrender', { playerId: myId }, 'POST');
    } catch (e) {
      console.error('Surrender error:', e);
    }

    // 2. Jika online room, tinggalkan room
    if (currentOnlineRoom && currentOnlineRoom.code) {
      try {
        await apiCall('/api/room/leave', { code: currentOnlineRoom.code, playerId: myId }, 'POST');
      } catch (e) {
        console.error('Leave room error:', e);
      }
    }

    stopAllPolling();
    currentOnlineRoom = null;
    currentOnlinePlayer = null;
    forceCloseAllModals();
    showScreen('homeMenuScreen');
  }
});

// Form Submissions
document.getElementById('btnStartAiGame')?.addEventListener('click', () => {
  startConfiguredGame('ai');
});

document.getElementById('btnStartPvpGame')?.addEventListener('click', () => {
  startConfiguredGame('pvp');
});

// Multiplayer Online: Buat Ruangan
document.getElementById('btnCreateOnlineRoom')?.addEventListener('click', async () => {
  const hostName = document.getElementById('onlinePlayerName')?.value.trim() || 'Host';
  const maxPlayers = parseInt(document.getElementById('onlineMaxPlayersSlider')?.value) || 4;
  const rentInJail = document.getElementById('onlineJailToggle')?.getAttribute('data-checked') === 'true';
  const auctionMode = document.getElementById('onlineAuctionToggle')?.getAttribute('data-checked') === 'true';

  const res = await apiCall('/api/room/create', {
    hostName,
    maxPlayers,
    options: {
      rentInJail,
      auctionMode,
      startingMoney: 15000000
    }
  }, 'POST');

  if (res && res.success) {
    currentOnlineRoom = res.room;
    currentOnlinePlayer = res.player;
    showScreen('onlineLobbyScreen');
    renderLobbyUI();
    startLobbyPolling(res.room.code);
  } else {
    alert('Gagal membuat ruangan: ' + (res?.message || 'Terjadi kesalahan sistem'));
  }
});

// Multiplayer Online: Gabung Ruangan
document.getElementById('btnJoinOnlineRoom')?.addEventListener('click', async () => {
  const code = document.getElementById('onlineRoomCodeInput')?.value.trim().toUpperCase();
  const playerName = document.getElementById('onlinePlayerName')?.value.trim() || 'Tamu';

  if (!code) {
    alert('Silakan masukkan kode ruangan terlebih dahulu!');
    return;
  }

  const res = await apiCall('/api/room/join', { code, playerName }, 'POST');
  if (res && res.success) {
    currentOnlineRoom = res.room;
    currentOnlinePlayer = res.player;
    showScreen('onlineLobbyScreen');
    renderLobbyUI();
    startLobbyPolling(res.room.code);
  } else {
    alert(res?.message || 'Gagal bergabung ke ruangan!');
  }
});

// Salin Kode Ruangan
btnCopyRoomCode?.addEventListener('click', async () => {
  if (!currentOnlineRoom) return;
  try {
    await navigator.clipboard.writeText(currentOnlineRoom.code);
    if (copyIcon) copyIcon.innerHTML = `<span class="w-4 h-4 inline-block text-emerald-400">${GameIcons.check}</span>`;
    if (copyLabel) copyLabel.textContent = 'Tersalin!';
    setTimeout(() => {
      if (copyIcon) copyIcon.innerHTML = `<span class="w-4 h-4 inline-block text-amber-300">${GameIcons.copy}</span>`;
      if (copyLabel) copyLabel.textContent = 'Salin';
    }, 2000);
  } catch (err) {
    prompt('Salin kode ruangan berikut:', currentOnlineRoom.code);
  }
});

// Tambah Bot di Lobby
btnLobbyAddBot?.addEventListener('click', async () => {
  if (!currentOnlineRoom) return;
  const res = await apiCall('/api/room/add-bot', { code: currentOnlineRoom.code }, 'POST');
  if (res && res.success) {
    currentOnlineRoom = res.room;
    renderLobbyUI();
  } else {
    alert(res?.message || 'Gagal menambahkan bot');
  }
});

// Host Mulai Permainan
btnLobbyStartGame?.addEventListener('click', async () => {
  if (!currentOnlineRoom) return;
  if (currentOnlineRoom.players.length < currentOnlineRoom.maxPlayers) {
    alert(`Wajib ada ${currentOnlineRoom.maxPlayers} pemain untuk memulai! Saat ini baru ada ${currentOnlineRoom.players.length} pemain.`);
    return;
  }

  const res = await apiCall('/api/room/start', { code: currentOnlineRoom.code }, 'POST');
  if (res && res.success) {
    stopAllPolling();
    currentOnlineRoom = res.room;
    launchOnlineGame(res.gameState);
  } else {
    alert(res?.message || 'Gagal memulai permainan');
  }
});

// Keluar dari Lobby
btnLeaveLobby?.addEventListener('click', async () => {
  if (currentOnlineRoom && currentOnlinePlayer) {
    await apiCall('/api/room/leave', { code: currentOnlineRoom.code, playerId: currentOnlinePlayer.id }, 'POST');
  }
  stopAllPolling();
  currentOnlineRoom = null;
  currentOnlinePlayer = null;
  showScreen('settingsOnlineScreen');
});

// In-Game Controls
btnRollDice?.addEventListener('click', handleMainActionButton);
btnEndTurn?.addEventListener('click', handleEndTurn);
btnPayJailFine?.addEventListener('click', async () => {
  if (isModalOpen || isProcessingAction) return;
  isModalOpen = true;
  isProcessingAction = true;
  try {
    const result = await Swal.fire({
      title: '<span class="swal2-monopoly-title">Bayar Denda Penjara</span>',
      html: `
        <div class="text-center text-xs text-zinc-300 font-sans">
          <div class="w-12 h-12 mx-auto text-emerald-400 my-2">${GameIcons.jailUnlock}</div>
          <p class="mb-2">Bayar denda sebesar <b class="text-amber-400">Rp 1.500.000</b> ke Bank untuk langsung bebas dari Penjara sekarang?</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: `<span class="flex items-center justify-center gap-1.5"><span class="w-4 h-4 inline-block">${GameIcons.moneyBag}</span><span>Bayar Rp 1.500.000</span></span>`,
      cancelButtonText: 'Tutup',
      customClass: {
        popup: 'swal2-monopoly-popup',
        confirmButton: 'swal2-monopoly-confirm',
        cancelButton: 'swal2-monopoly-cancel'
      },
      buttonsStyling: false
    });

    forceCloseAllModals();

    if (result.isConfirmed) {
      sound.playPayCash();
      showFloatingCash(1500000, false, 'Denda Bebas Penjara');
      const newState = await apiCall('/api/game/jail-fine', {}, 'POST');
      if (newState) {
        state = newState;
        updateBoardUI();
      }
    }
  } finally {
    isProcessingAction = false;
    isModalOpen = false;
    forceCloseAllModals();
    updateHUD();
  }
});

btnUseJailCard?.addEventListener('click', async () => {
  if (isModalOpen || isProcessingAction) return;
  isModalOpen = true;
  isProcessingAction = true;
  try {
    const result = await Swal.fire({
      title: '<span class="swal2-monopoly-title">Kartu Bebas Penjara</span>',
      html: `
        <div class="text-center text-xs text-zinc-300 font-sans">
          <div class="w-12 h-12 mx-auto text-amber-400 my-2">${GameIcons.key}</div>
          <p class="mb-2">Gunakan <b>1 Kartu Bebas Penjara</b> (Bekingan Ordal/Jenderal) untuk langsung bebas tanpa bayar denda?</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: `<span class="flex items-center justify-center gap-1.5"><span class="w-4 h-4 inline-block">${GameIcons.key}</span><span>Gunakan Kartu</span></span>`,
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'swal2-monopoly-popup',
        confirmButton: 'swal2-monopoly-confirm',
        cancelButton: 'swal2-monopoly-cancel'
      },
      buttonsStyling: false
    });

    forceCloseAllModals();

    if (result.isConfirmed) {
      sound.playCash();
      triggerConfetti({ particleCount: 30 });
      const newState = await apiCall('/api/game/use-jail-card', {}, 'POST');
      if (newState) {
        state = newState;
        updateBoardUI();
      }
    }
  } finally {
    isProcessingAction = false;
    isModalOpen = false;
    forceCloseAllModals();
    updateHUD();
  }
});

// Keyboard Shortcut (Spasi)
window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  if (e.code === 'Space') {
    e.preventDefault();
    handleMainActionButton();
  }
});

// Riwayat Permainan Dropdown Listeners
btnLogsDropdown?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (logsDropdownMenu) {
    const isHidden = logsDropdownMenu.classList.toggle('hidden');
    if (!isHidden) {
      renderLogs();
    }
    if (logsDropdownArrow) {
      logsDropdownArrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  }
});

document.getElementById('btnCloseLogsDropdown')?.addEventListener('click', (e) => {
  e.stopPropagation();
  logsDropdownMenu?.classList.add('hidden');
  if (logsDropdownArrow) {
    logsDropdownArrow.style.transform = 'rotate(0deg)';
  }
});

document.addEventListener('click', (e) => {
  if (logsDropdownMenu && !logsDropdownMenu.classList.contains('hidden')) {
    if (!logsDropdownMenu.contains(e.target) && !btnLogsDropdown?.contains(e.target)) {
      logsDropdownMenu.classList.add('hidden');
      if (logsDropdownArrow) {
        logsDropdownArrow.style.transform = 'rotate(0deg)';
      }
    }
  }
});

btnSoundToggle?.addEventListener('click', () => {
  const isEnabled = sound.toggle();
  soundIcon.innerHTML = isEnabled ? GameIcons.soundOn : GameIcons.soundOff;
  soundLabel.textContent = isEnabled ? 'Suara Nyala' : 'Mute';
});

btnGameRules?.addEventListener('click', () => rulesModal?.classList.remove('hidden'));
btnCloseRules?.addEventListener('click', () => rulesModal?.classList.add('hidden'));
btnConfirmRules?.addEventListener('click', () => rulesModal?.classList.add('hidden'));
btnOpenTradingDesk?.addEventListener('click', () => openTradingDesk());
btnNewGame?.addEventListener('click', () => {
  stopAllPolling();
  currentOnlineRoom = null;
  currentOnlinePlayer = null;
  showScreen('homeMenuScreen');
});

// Chat & Emoticon Event Listeners
quickEmoteBar?.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-quick-emote');
  if (!btn) return;
  const emote = btn.getAttribute('data-emote');
  if (emote) {
    sendUserEmote(emote);
  }
});

chatInputForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!inputChatMessage) return;
  const text = inputChatMessage.value.trim();
  if (text) {
    sendUserChatMessage(text);
    inputChatMessage.value = '';
  }
});

portfolioList?.addEventListener('scroll', () => {
  if (portfolioScrollHint) {
    const isBottom = (portfolioList.scrollHeight - portfolioList.scrollTop - portfolioList.clientHeight < 25);
    if (isBottom) {
      portfolioScrollHint.classList.add('hidden');
    } else if (portfolioList.scrollHeight > portfolioList.clientHeight + 10) {
      portfolioScrollHint.classList.remove('hidden');
    }
  }
});

// ===================================================
// FULLSCREEN MODE & ESCAPE (ESC) KEY HANDLER
// ===================================================
function showFullscreenToast(message) {
  if (!fullscreenToast) return;
  if (fullscreenToastTimeout) clearTimeout(fullscreenToastTimeout);
  if (message) {
    const span = fullscreenToast.querySelector('span');
    if (span) span.innerHTML = message;
  }
  fullscreenToast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
  fullscreenToast.classList.add('opacity-100', 'translate-y-0');
  fullscreenToastTimeout = setTimeout(() => {
    fullscreenToast.classList.remove('opacity-100', 'translate-y-0');
    fullscreenToast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
  }, 3000);
}

function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
}

function isMobileDevice() {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
}

function requestGameFullscreen(force = false) {
  // Disable automatic fullscreen when starting/joining game on mobile devices
  if (!force && isMobileDevice()) {
    return;
  }
  const elem = document.documentElement;
  try {
    if (!isFullscreenActive()) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  } catch (err) {
    console.log('Fullscreen request ignored:', err);
  }
}

function exitGameFullscreen() {
  try {
    if (isFullscreenActive()) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (err) {
    console.log('Exit fullscreen error:', err);
  }
}

function toggleGameFullscreen() {
  if (isFullscreenActive()) {
    exitGameFullscreen();
  } else {
    requestGameFullscreen(true);
  }
}

function updateFullscreenUI() {
  const isFull = isFullscreenActive();
  document.body.classList.toggle('fullscreen-active', isFull);
  document.documentElement.classList.toggle('fullscreen-active', isFull);
  if (fullscreenIcon) {
    fullscreenIcon.innerHTML = isFull
      ? `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`
      : `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
  }
  if (fullscreenLabel) {
    fullscreenLabel.textContent = isFull ? 'Keluar Full' : 'Layar Penuh';
  }
  if (btnFullscreenToggle) {
    btnFullscreenToggle.title = isFull ? 'Keluar Layar Penuh (ESC)' : 'Layar Penuh (Tekan ESC untuk keluar)';
  }
  if (isFull) {
    showFullscreenToast('Mode Layar Penuh Aktif — Tekan <kbd class="px-1.5 py-0.5 bg-black/50 border border-amber-500/40 rounded text-[10px] font-mono text-white">ESC</kbd> untuk keluar');
  }
}

// Event Listeners untuk perubahan status fullscreen & tombol ESC
['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
  document.addEventListener(evt, updateFullscreenUI);
});

btnFullscreenToggle?.addEventListener('click', () => {
  toggleGameFullscreen();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isFullscreenActive()) {
    exitGameFullscreen();
  }
});

// Mobile Slide-out Sidebar Drawer Navigation Handler
function openMobileDrawer(targetId) {
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (backdrop) backdrop.classList.remove('hidden');

  document.querySelectorAll('.mobile-panel-section').forEach(sec => {
    sec.classList.remove('drawer-open');
  });

  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.add('drawer-open');
  }

  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
  });
}

function closeMobileDrawer() {
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (backdrop) backdrop.classList.add('hidden');

  document.querySelectorAll('.mobile-panel-section').forEach(sec => {
    sec.classList.remove('drawer-open');
  });

  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
}

function initMobileSectionTabs() {
  const tabs = document.querySelectorAll('.mobile-tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      const isAlreadyOpen = targetEl && targetEl.classList.contains('drawer-open');

      if (isAlreadyOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer(targetId);
      }
    });
  });

  // Close buttons inside mobile drawers
  document.querySelectorAll('.btn-close-mobile-drawer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileDrawer();
    });
  });

  // Backdrop click to close drawer
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeMobileDrawer();
    });
  }

  // Also close drawer on Escape key if open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileDrawer();
    }
  });
}

// Page Load Setup
window.addEventListener('DOMContentLoaded', () => {
  initSettingsControls();
  initMobileSectionTabs();
  renderChats();
  showScreen('homeMenuScreen');
  updateFullscreenUI();
});
