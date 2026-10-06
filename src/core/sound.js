// Web Audio API Procedural Sound Engine
// Menghasilkan efek audio game Monopoly secara dinamis tanpa perlu file audio eksternal

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.bgmEnabled = true;
    this.bgmPlaying = false;
    this.bgmVolume = 0.15; // Pleasant ambient volume
    this.bgmGainNode = null;
    this.bgmInterval = null;
    this.bgmNextNoteTime = 0;
    this.bgmStep = 0;
    this.bpm = 104;
    this.stepDuration = 60 / this.bpm / 4; // 16th note in seconds (~0.144s)
    this._userGestureAttached = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.ctx && !this.bgmGainNode) {
      this.bgmGainNode = this.ctx.createGain();
      const currentGain = this.enabled && this.bgmEnabled ? this.bgmVolume : 0.0001;
      this.bgmGainNode.gain.setValueAtTime(currentGain, this.ctx.currentTime);
      this.bgmGainNode.connect(this.ctx.destination);
    }
  }

  // Toggle master sound on/off
  toggle() {
    this.enabled = !this.enabled;
    if (this.bgmGainNode && this.ctx) {
      const targetGain = this.enabled && this.bgmEnabled ? this.bgmVolume : 0.0001;
      this.bgmGainNode.gain.setValueAtTime(this.bgmGainNode.gain.value, this.ctx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.15);
    }
    return this.enabled;
  }

  // Start background music loop (with auto-resume on first user gesture)
  startBGM() {
    this.init();
    
    // Auto-bind user gesture if AudioContext is blocked/suspended
    if (!this._userGestureAttached && typeof window !== 'undefined') {
      this._userGestureAttached = true;
      const resumeAudioAndPlayBGM = () => {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        if (this.enabled && this.bgmEnabled && !this.bgmPlaying) {
          this._startBGMScheduler();
        }
      };
      ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
        window.addEventListener(evt, resumeAudioAndPlayBGM, { once: true, passive: true });
      });
    }

    if (this.bgmPlaying) return;
    this._startBGMScheduler();
  }

  _startBGMScheduler() {
    if (!this.ctx) return;
    this.bgmPlaying = true;
    if (this.bgmGainNode) {
      const targetGain = this.enabled && this.bgmEnabled ? this.bgmVolume : 0.0001;
      this.bgmGainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.4);
    }

    this.bgmNextNoteTime = this.ctx.currentTime + 0.05;
    this.bgmStep = 0;

    if (this.bgmInterval) clearInterval(this.bgmInterval);
    this.bgmInterval = setInterval(() => {
      this._schedulerBGM();
    }, 30);
  }

  stopBGM() {
    if (!this.bgmPlaying) return;
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmGainNode && this.ctx) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmGainNode.gain.value, this.ctx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
    }
  }

  toggleBGM() {
    this.bgmEnabled = !this.bgmEnabled;
    if (this.bgmGainNode && this.ctx) {
      const targetGain = this.enabled && this.bgmEnabled ? this.bgmVolume : 0.0001;
      this.bgmGainNode.gain.setValueAtTime(this.bgmGainNode.gain.value, this.ctx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.15);
    }
    return this.bgmEnabled;
  }

  setBGMVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGainNode && this.ctx && this.enabled && this.bgmEnabled) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmGainNode.gain.value, this.ctx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(this.bgmVolume, this.ctx.currentTime + 0.05);
    }
  }

  _schedulerBGM() {
    if (!this.ctx || !this.bgmPlaying) return;
    // Lookahead: schedule notes up to 0.15 seconds in advance
    while (this.bgmNextNoteTime < this.ctx.currentTime + 0.15) {
      this._playBGMStep(this.bgmStep, this.bgmNextNoteTime);
      this.bgmNextNoteTime += this.stepDuration;
      this.bgmStep = (this.bgmStep + 1) % 64; // 64 steps = 4 bars
    }
  }

  // Sintesis Instrumen Gamelan / Metallophone Bell Chime
  _playGamelanBell(freq, time, duration = 0.45, vol = 0.22) {
    if (!this.ctx || !this.bgmGainNode) return;
    try {
      // Fundamental oscillator
      const osc1 = this.ctx.createOscillator();
      const oscGain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, time);

      oscGain1.gain.setValueAtTime(0.0001, time);
      oscGain1.gain.linearRampToValueAtTime(vol, time + 0.006);
      oscGain1.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      // Metallic overtone oscillator (harmonic shimmer 2.756x)
      const osc2 = this.ctx.createOscillator();
      const oscGain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.756, time);

      oscGain2.gain.setValueAtTime(0.0001, time);
      oscGain2.gain.linearRampToValueAtTime(vol * 0.45, time + 0.004);
      oscGain2.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.6);

      // Lowpass / Bandpass tone filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, time);

      osc1.connect(oscGain1);
      osc2.connect(oscGain2);
      oscGain1.connect(filter);
      oscGain2.connect(filter);
      filter.connect(this.bgmGainNode);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + duration);
      osc2.stop(time + duration);
    } catch (e) {}
  }

  // Sintesis Ambient Pad Chords (Suasana Nusantara Mewah & Tenang)
  _playWarmPad(freqs, time, duration = 2.2, vol = 0.09) {
    if (!this.ctx || !this.bgmGainNode) return;
    try {
      const padGain = this.ctx.createGain();
      padGain.gain.setValueAtTime(0.0001, time);
      padGain.gain.linearRampToValueAtTime(vol, time + 0.35); // Slow gentle attack
      padGain.gain.setValueAtTime(vol, time + duration - 0.4);
      padGain.gain.linearRampToValueAtTime(0.0001, time + duration); // Smooth release

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, time);

      padGain.connect(filter);
      filter.connect(this.bgmGainNode);

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        const detune = (idx % 2 === 0 ? 1 : -1) * 3; // Subtle stereo-like detune
        osc.frequency.setValueAtTime(freq, time);
        osc.detune.setValueAtTime(detune, time);
        osc.connect(padGain);
        osc.start(time);
        osc.stop(time + duration);
      });
    } catch (e) {}
  }

  // Sintesis Perkusi Tradisional (Kendang / Gong Ageng / Kethuk)
  _playKendang(type, time, vol = 0.25) {
    if (!this.ctx || !this.bgmGainNode) return;
    try {
      if (type === 'gong') {
        // Resonant Grand Gong Ageng
        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, time);
        osc.frequency.exponentialRampToValueAtTime(82.4, time + 1.8);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(164.8, time);
        osc2.frequency.exponentialRampToValueAtTime(123.4, time + 1.2);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(vol * 1.2, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.0);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(filter);
        filter.connect(this.bgmGainNode);

        osc.start(time);
        osc2.start(time);
        osc.stop(time + 2.0);
        osc2.stop(time + 2.0);
      } else if (type === 'ageng') {
        // Low warm kendang thump
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, time);
        osc.frequency.exponentialRampToValueAtTime(55, time + 0.22);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(vol * 0.9, time + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);

        osc.connect(gain);
        gain.connect(this.bgmGainNode);

        osc.start(time);
        osc.stop(time + 0.24);
      } else if (type === 'kethuk') {
        // Syncopated light woody percussion
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(380, time);
        osc.frequency.exponentialRampToValueAtTime(150, time + 0.05);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(850, time);
        filter.Q.setValueAtTime(3.0, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(vol * 0.45, time + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.bgmGainNode);

        osc.start(time);
        osc.stop(time + 0.06);
      }
    } catch (e) {}
  }

  // Sintesis Bassline Lembut Penyeimbang Ritme
  _playBass(freq, time, duration = 0.32, vol = 0.2) {
    if (!this.ctx || !this.bgmGainNode) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(vol, time + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGainNode);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {}
  }

  // Scheduler 64-Step Loop Musik Latar (Monopoli Nusantara Theme)
  _playBGMStep(step, time) {
    // 1. Pad Chords (Harmoni Tiap Bar - 16 Steps per Bar)
    if (step === 0) {
      // Bar 1: C Major (C4, E4, G4, B4)
      this._playWarmPad([261.63, 329.63, 392.00, 493.88], time, 2.3, 0.09);
      this._playKendang('gong', time, 0.3);
    } else if (step === 16) {
      // Bar 2: A Minor (A3, C4, E4, G4)
      this._playWarmPad([220.00, 261.63, 329.63, 392.00], time, 2.3, 0.09);
    } else if (step === 32) {
      // Bar 3: F Major (F3, A3, C4, E4)
      this._playWarmPad([174.61, 220.00, 261.63, 329.63], time, 2.3, 0.09);
      this._playKendang('gong', time, 0.28);
    } else if (step === 48) {
      // Bar 4: G Dominant (G3, B3, D4, F4)
      this._playWarmPad([196.00, 246.94, 293.66, 349.23], time, 2.3, 0.09);
    }

    // 2. Bassline Groove
    if (step === 0 || step === 8) this._playBass(130.81, time, 0.35, 0.22); // C3
    else if (step === 16 || step === 24) this._playBass(110.00, time, 0.35, 0.22); // A2
    else if (step === 32 || step === 40) this._playBass(87.31, time, 0.35, 0.22); // F2
    else if (step === 48 || step === 56) this._playBass(98.00, time, 0.35, 0.22); // G2

    // 3. Kendang & Perkusi Ritme
    if ([0, 16, 32, 48].includes(step)) {
      this._playKendang('ageng', time, 0.26);
    } else if ([6, 12, 22, 28, 38, 44, 54, 60].includes(step)) {
      this._playKendang('kethuk', time, 0.18);
    }

    // 4. Melodi Gamelan Pentatonik Nusantara (Slendro & Pelog Balinese/Javanese chime)
    const melodyMap = {
      // Bar 1
      0: 783.99,  // G5
      2: 659.25,  // E5
      4: 587.33,  // D5
      6: 523.25,  // C5
      8: 659.25,  // E5
      10: 783.99, // G5
      12: 880.00, // A5
      14: 783.99, // G5

      // Bar 2
      16: 659.25, // E5
      18: 523.25, // C5
      20: 440.00, // A4
      22: 523.25, // C5
      24: 659.25, // E5
      26: 587.33, // D5
      28: 523.25, // C5
      30: 587.33, // D5

      // Bar 3
      32: 880.00,  // A5
      34: 783.99,  // G5
      36: 698.46,  // F5
      38: 659.25,  // E5
      40: 587.33,  // D5
      42: 698.46,  // F5
      44: 880.00,  // A5
      46: 1046.50, // C6

      // Bar 4
      48: 987.77, // B5
      50: 783.99, // G5
      52: 880.00, // A5
      54: 783.99, // G5
      56: 659.25, // E5
      58: 587.33, // D5
      60: 659.25, // E5
      62: 587.33  // D5
    };

    if (melodyMap[step]) {
      this._playGamelanBell(melodyMap[step], time, 0.42, 0.2);
    }
  }

  // Efek langkah pion
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

  // Efek kocok & lempar dadu
  playDiceRoll() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + i * 0.045;

      osc.type = 'sine';
      const freq = 450 + Math.random() * 250;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.04);
    }
  }

  // Efek uang / kaching (transaksi sewa atau beli)
  playCash() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [987.77, 1318.51, 1975.53]; // B5, E6, B6
    notes.forEach((freq, idx) => {
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

  // Efek sukses beli properti / upgrade rumah
  playBuy() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, i) => {
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

  // Efek ambil kartu kesempatan / dana umum
  playCard() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Efek masuk penjara
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

  // Efek bangkrut (kalah)
  playBankrupt() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [311.13, 293.66, 277.18, 261.63]; // Eb4, D4, C#4, C4
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + i * 0.15;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.2);
    });
  }

  // Fanfare kemenangan
  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.50];
    const delays = [0, 0.12, 0.24, 0.36, 0.5, 0.7];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + delays[idx];

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      const duration = idx === notes.length - 1 ? 0.6 : 0.18;
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
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
      const notes = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02];
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
      const chord = [523.25, 659.25, 783.99, 987.77, 1174.66];
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

export const sound = new SoundEngine();
