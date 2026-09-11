<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <title>Monopoli Nusantara - Game Papan Klasik</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%22%20%22100%22%20%22100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23b91c1c%22/><text y=%22.75em%22 x=%22.5em%22 text-anchor=%22middle%22 font-size=%2265%22 font-family=%22sans-serif%22 font-weight=%22900%22 fill=%22white%22>M</text></svg>">
  
  <!-- Google Fonts: Plus Jakarta Sans & Outfit (Sangat Mudah Dibaca & Friendly) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- SweetAlert2 (Mewah & Interaktif) -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- Canvas Confetti (Efek Kemenangan & Rezeki) -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
  <link rel="stylesheet" href="./assets/css/style.css?v=<?= time() ?>" />
  <style>
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      user-select: none;
      background-color: #cb8f50;
      background-image: 
        radial-gradient(ellipse at 50% 35%, rgba(255, 235, 195, 0.5) 0%, rgba(145, 80, 25, 0.55) 100%),
        repeating-linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.04) 0px,
          rgba(255, 255, 255, 0.04) 1px,
          transparent 2px,
          transparent 4px,
          rgba(0, 0, 0, 0.035) 5px,
          transparent 7px
        );
      background-attachment: fixed;
      background-size: cover;
    }

    .font-outfit {
      font-family: 'Outfit', sans-serif;
    }

    .text-gold-3d {
      color: #f6be3c;
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-shadow: 
        0 1px 0 #d99c22,
        0 2px 0 #bd8214,
        0 3px 0 #9e6708,
        0 4px 0 #7b4c00,
        0 6px 12px rgba(0, 0, 0, 0.55);
    }

    .text-gold-subtitle {
      color: #ebd09c;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    .btn-menu-orange {
      background: linear-gradient(180deg, #c76510 0%, #a44806 100%) !important;
      border: 2px solid #5a2302 !important;
      box-shadow: 0 5px 0 #3a1601, 0 10px 18px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px rgba(255, 255, 255, 0.35) !important;
      font-family: 'Outfit', sans-serif;
    }
    .btn-menu-orange:hover {
      background: linear-gradient(180deg, #d67017 0%, #b25008 100%) !important;
      transform: translateY(-2px);
      box-shadow: 0 7px 0 #3a1601, 0 14px 22px rgba(0, 0, 0, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.4) !important;
    }
    .btn-menu-orange:active {
      transform: translateY(3px);
      box-shadow: 0 2px 0 #3a1601, 0 4px 8px rgba(0, 0, 0, 0.4) !important;
    }

    .btn-menu-green {
      background: linear-gradient(180deg, #1b6d49 0%, #114c32 100%) !important;
      border: 2px solid #082b1c !important;
      box-shadow: 0 5px 0 #051b11, 0 10px 18px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px rgba(255, 255, 255, 0.35) !important;
      font-family: 'Outfit', sans-serif;
    }
    .btn-menu-green:hover {
      background: linear-gradient(180deg, #217d54 0%, #155a3c 100%) !important;
      transform: translateY(-2px);
      box-shadow: 0 7px 0 #051b11, 0 14px 22px rgba(0, 0, 0, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.4) !important;
    }
    .btn-menu-green:active {
      transform: translateY(3px);
      box-shadow: 0 2px 0 #051b11, 0 4px 8px rgba(0, 0, 0, 0.4) !important;
    }

    .btn-menu-blue {
      background: linear-gradient(180deg, #185994 0%, #0d3b66 100%) !important;
      border: 2px solid #06233f !important;
      box-shadow: 0 5px 0 #031527, 0 10px 18px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px rgba(255, 255, 255, 0.35) !important;
      font-family: 'Outfit', sans-serif;
    }
    .btn-menu-blue:hover {
      background: linear-gradient(180deg, #1d69ad 0%, #10467a 100%) !important;
      transform: translateY(-2px);
      box-shadow: 0 7px 0 #031527, 0 14px 22px rgba(0, 0, 0, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.4) !important;
    }
    .btn-menu-blue:active {
      transform: translateY(3px);
      box-shadow: 0 2px 0 #031527, 0 4px 8px rgba(0, 0, 0, 0.4) !important;
    }

    .btn-home-pill {
      background: #231207 !important;
      border: 2px solid #cca134 !important;
      box-shadow: 0 3px 0 #0d0602, 0 6px 12px rgba(0, 0, 0, 0.4) !important;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .settings-card {
      background-color: #351c0e !important;
      border: 2px solid #231107 !important;
      border-radius: 24px !important;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
    }

    .btn-card-back {
      background-color: #4a2714 !important;
      border: 1.5px solid #241107 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    input[type="range"].monopoly-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      background: #241208;
      border-radius: 4px;
      outline: none;
      border: 1px solid #170b04;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.7);
    }
    input[type="range"].monopoly-slider::-webkit-slider-runnable-track {
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(to right, #d49c20 var(--slider-progress, 50%), #241208 var(--slider-progress, 50%));
    }
    input[type="range"].monopoly-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #ff4d94 0%, #c4185d 50%, #7d0838 100%);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.6);
      border: 1.5px solid #5a0426;
      cursor: pointer;
      margin-top: -10px;
    }

    .toggle-switch-track {
      width: 58px;
      height: 28px;
      background-color: #231208;
      border: 1.5px solid #140803;
      border-radius: 14px;
      position: relative;
      cursor: pointer;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 6px;
    }
    .toggle-switch-track.active {
      background-color: #174229;
      border-color: #0d2818;
    }
    .toggle-knob {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #a8a8a8 0%, #707070 50%, #444444 100%);
      border: 1px solid #333333;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.5);
      position: absolute;
      left: 3px;
      top: 2px;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .toggle-switch-track.active .toggle-knob {
      transform: translateX(28px);
      background: radial-gradient(circle at 35% 35%, #ffffff 0%, #cccccc 50%, #999999 100%);
    }
    .toggle-label-no, .toggle-label-yes {
      font-size: 9px;
      font-weight: 800;
      color: #8c8c8c;
      pointer-events: none;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .toggle-label-yes { display: none; }
    .toggle-switch-track.active .toggle-label-no { display: none; }
    .toggle-switch-track.active .toggle-label-yes { display: inline-block; color: #34d399; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-center items-center text-slate-100">

  <!-- ========================================== -->
  <!-- 1. LAYAR MENU UTAMA (HOME / MENU UTAMA)    -->
  <!-- ========================================== -->
  <section id="homeMenuScreen" class="w-full max-w-lg min-h-screen flex flex-col items-center justify-center p-6 mx-auto">
    <!-- 3D Dice Logo -->
    <div class="mb-3 transform hover:rotate-6 transition-transform duration-300 drop-shadow-2xl">
      <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,12 86,30 50,48 14,30" fill="#ffffff" stroke="#dcdcdc" stroke-width="2" stroke-linejoin="round" />
        <polygon points="14,30 50,48 50,88 14,70" fill="#eceff1" stroke="#cfd8dc" stroke-width="2" stroke-linejoin="round" />
        <polygon points="50,48 86,30 86,70 50,88" fill="#cfd8dc" stroke="#b0bec5" stroke-width="2" stroke-linejoin="round" />
        <circle cx="50" cy="30" r="5" fill="#e91e63" />
        <circle cx="28" cy="46" r="3.5" fill="#7c4dff" />
        <circle cx="38" cy="62" r="3.5" fill="#7c4dff" />
        <circle cx="64" cy="46" r="3.5" fill="#7c4dff" />
        <circle cx="74" cy="62" r="3.5" fill="#7c4dff" />
        <circle cx="64" cy="68" r="3.5" fill="#7c4dff" />
      </svg>
    </div>

    <!-- Title & Subtitle -->
    <div class="text-center mb-8">
      <h1 class="text-gold-3d text-5xl md:text-6xl font-black uppercase tracking-wider">
        MONOPOLI
      </h1>
      <p class="text-gold-subtitle text-xs md:text-sm font-bold uppercase tracking-widest mt-1">
        GAME PAPAN KLASIK
      </p>
    </div>

    <!-- Main Menu Buttons Stack -->
    <div class="w-full max-w-[340px] space-y-4">
      <!-- 1. Play vs AI -->
      <button id="btnMenuAi" class="btn-menu-orange w-full py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 text-white font-extrabold text-base md:text-lg cursor-pointer">
        <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 2a2 2 0 0 1 2 2v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1v1a2 2 0 0 1-4 0v-1H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <span class="text-white tracking-wide">Main vs Bot AI</span>
      </button>

      <!-- 2. Player vs Player -->
      <button id="btnMenuPvp" class="btn-menu-green w-full py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 text-white font-extrabold text-base md:text-lg cursor-pointer">
        <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span class="text-white tracking-wide">Pemain vs Pemain</span>
      </button>

      <!-- 3. Online Multiplayer -->
      <button id="btnMenuOnline" class="btn-menu-blue w-full py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 text-white font-extrabold text-base md:text-lg cursor-pointer">
        <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 4.5c3.34 0 6.4 1.25 8.74 3.32L12 19.34 3.26 11.82A13.2 13.2 0 0 1 12 8.5z"/>
        </svg>
        <span class="text-white tracking-wide">Multiplayer Online</span>
      </button>
    </div>

    <!-- Home Pill Button -->
    <div class="mt-7">
      <button id="btnMenuHomeReset" class="btn-home-pill px-5 py-2 rounded-xl flex items-center gap-2 text-amber-300 font-bold text-xs cursor-pointer">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span>Beranda</span>
      </button>
    </div>
  </section>


  <!-- ========================================== -->
  <!-- 2. LAYAR PENGATURAN "MAIN VS BOT AI"       -->
  <!-- ========================================== -->
  <section id="settingsAiScreen" class="hidden w-full max-w-md min-h-screen flex flex-col items-center justify-center p-4 mx-auto">
    <div class="settings-card w-full p-6 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-4">
        <button id="btnBackFromAi" class="btn-card-back px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Kembali</span>
        </button>
        <div class="flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2a2 2 0 0 1 2 2v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1v1a2 2 0 0 1-4 0v-1H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          </svg>
          <span>Main vs Bot AI</span>
        </div>
        <div class="w-12"></div>
      </div>

      <!-- Title -->
      <h2 class="text-gold-3d text-2xl font-black text-center tracking-wider mb-6">
        PENGATURAN
      </h2>

      <!-- Form Controls -->
      <div class="space-y-5">
        <!-- 1. Jumlah Pemain -->
        <div>
          <div class="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>Jumlah Pemain</span>
            <span id="aiPlayersVal" class="text-white font-extrabold text-base">4 Orang</span>
          </div>
          <input type="range" id="aiPlayersSlider" min="2" max="4" value="4" step="1" class="monopoly-slider" />
        </div>

        <!-- 2. Tingkat Kecerdasan Bot -->
        <div>
          <div class="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>Tingkat Kecerdasan Bot</span>
            <span id="aiRobotsVal" class="text-white font-extrabold text-base">Sedang</span>
          </div>
          <input type="range" id="aiRobotsSlider" min="1" max="3" value="2" step="1" class="monopoly-slider" />
        </div>

        <!-- 3. Modal Awal Uang -->
        <div>
          <div class="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>Modal Awal Uang</span>
            <span id="aiMoneyVal" class="text-white font-extrabold text-base">Rp 15.000.000</span>
          </div>
          <input type="range" id="aiMoneySlider" min="5000000" max="25000000" value="15000000" step="2500000" class="monopoly-slider" />
        </div>

        <!-- 4. Tarik Sewa di Penjara -->
        <div class="flex items-center justify-between pt-2">
          <div>
            <div class="text-sm font-bold text-white">Tarik Sewa di Penjara</div>
            <div class="text-[11px] text-zinc-400">Pemilik yang ditahan di penjara tidak dapat menarik sewa</div>
          </div>
          <div id="aiJailToggle" class="toggle-switch-track" data-checked="false">
            <div class="toggle-knob"></div>
            <span class="toggle-label-no">TIDAK</span>
            <span class="toggle-label-yes">YA</span>
          </div>
        </div>

        <!-- 5. Mode Lelang Properti -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-bold text-white">Mode Lelang Properti</div>
            <div class="text-[11px] text-zinc-400">Properti yang tidak mampu dibeli langsung dilewati</div>
          </div>
          <div id="aiAuctionToggle" class="toggle-switch-track" data-checked="false">
            <div class="toggle-knob"></div>
            <span class="toggle-label-no">TIDAK</span>
            <span class="toggle-label-yes">YA</span>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <button id="btnStartAiGame" class="btn-menu-orange w-full py-3.5 mt-8 rounded-2xl text-white font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl">
        <span>Lanjut</span>
        <svg class="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </section>


  <!-- ============================================== -->
  <!-- 3. LAYAR PENGATURAN "PEMAIN VS PEMAIN"         -->
  <!-- ============================================== -->
  <section id="settingsPvpScreen" class="hidden w-full max-w-md min-h-screen flex flex-col items-center justify-center p-4 mx-auto">
    <div class="settings-card w-full p-6 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-4">
        <button id="btnBackFromPvp" class="btn-card-back px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Kembali</span>
        </button>
        <div class="flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <span>Pemain vs Pemain</span>
        </div>
        <div class="w-12"></div>
      </div>

      <!-- Title -->
      <h2 class="text-gold-3d text-2xl font-black text-center tracking-wider mb-6">
        PENGATURAN
      </h2>

      <!-- Form Controls -->
      <div class="space-y-5">
        <!-- 1. Jumlah Pemain -->
        <div>
          <div class="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>Jumlah Pemain</span>
            <span id="pvpPlayersVal" class="text-white font-extrabold text-base">2 Orang</span>
          </div>
          <input type="range" id="pvpPlayersSlider" min="2" max="4" value="2" step="1" class="monopoly-slider" />
        </div>

        <!-- 2. Modal Awal Uang -->
        <div>
          <div class="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>Modal Awal Uang</span>
            <span id="pvpMoneyVal" class="text-white font-extrabold text-base">Rp 15.000.000</span>
          </div>
          <input type="range" id="pvpMoneySlider" min="5000000" max="25000000" value="15000000" step="2500000" class="monopoly-slider" />
        </div>

        <!-- 3. Tarik Sewa di Penjara -->
        <div class="flex items-center justify-between pt-2">
          <div>
            <div class="text-sm font-bold text-white">Tarik Sewa di Penjara</div>
            <div class="text-[11px] text-zinc-400">Pemilik yang ditahan di penjara tidak dapat menarik sewa</div>
          </div>
          <div id="pvpJailToggle" class="toggle-switch-track" data-checked="false">
            <div class="toggle-knob"></div>
            <span class="toggle-label-no">TIDAK</span>
            <span class="toggle-label-yes">YA</span>
          </div>
        </div>

        <!-- 4. Mode Lelang Properti -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-bold text-white">Mode Lelang Properti</div>
            <div class="text-[11px] text-zinc-400">Properti yang tidak mampu dibeli langsung dilewati</div>
          </div>
          <div id="pvpAuctionToggle" class="toggle-switch-track" data-checked="false">
            <div class="toggle-knob"></div>
            <span class="toggle-label-no">TIDAK</span>
            <span class="toggle-label-yes">YA</span>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <button id="btnStartPvpGame" class="btn-menu-orange w-full py-3.5 mt-8 rounded-2xl text-white font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl">
        <span>Lanjut</span>
        <svg class="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </section>


  <!-- ============================================== -->
  <!-- 4. LAYAR "MULTIPLAYER ONLINE"                  -->
  <!-- ============================================== -->
  <section id="settingsOnlineScreen" class="hidden w-full max-w-md min-h-screen flex flex-col items-center justify-center p-4 mx-auto">
    <div class="settings-card w-full p-6 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-4">
        <button id="btnBackFromOnline" class="btn-card-back px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Kembali</span>
        </button>
        <div class="flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 4.5c3.34 0 6.4 1.25 8.74 3.32L12 19.34 3.26 11.82A13.2 13.2 0 0 1 12 8.5z"/>
          </svg>
          <span>Multiplayer Online</span>
        </div>
        <div class="w-12"></div>
      </div>

      <!-- Title -->
      <h2 class="text-gold-3d text-2xl font-black text-center tracking-wider mb-6">
        GAME ONLINE
      </h2>

      <!-- Form Controls -->
      <div class="space-y-4">
        <!-- 1. Nama Anda -->
        <div>
          <label class="block text-xs font-bold text-amber-200 mb-1.5">Nama Anda</label>
          <input type="text" id="onlinePlayerName" value="Pemain 1" class="w-full bg-[#231208] border border-[#3d1f0d] rounded-xl px-3.5 py-2.5 text-white font-bold text-sm outline-none focus:border-amber-500 shadow-inner" />
        </div>

        <!-- 2. Maksimal Pemain -->
        <div>
          <div class="flex justify-between items-center text-sm font-bold text-white mb-2">
            <span>Maksimal Pemain</span>
            <span id="onlineMaxPlayersVal" class="text-white font-extrabold text-base">4 Orang</span>
          </div>
          <input type="range" id="onlineMaxPlayersSlider" min="2" max="4" value="4" step="1" class="monopoly-slider" />
        </div>

        <!-- 3. Tarik Sewa di Penjara -->
        <div class="flex items-center justify-between pt-1">
          <div>
            <div class="text-sm font-bold text-white">Tarik Sewa di Penjara</div>
            <div class="text-[11px] text-zinc-400">Pemilik yang ditahan di penjara tidak dapat menarik sewa</div>
          </div>
          <div id="onlineJailToggle" class="toggle-switch-track" data-checked="false">
            <div class="toggle-knob"></div>
            <span class="toggle-label-no">TIDAK</span>
            <span class="toggle-label-yes">YA</span>
          </div>
        </div>

        <!-- 4. Mode Lelang Properti -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-bold text-white">Mode Lelang Properti</div>
            <div class="text-[11px] text-zinc-400">Properti yang tidak mampu dibeli langsung dilewati</div>
          </div>
          <div id="onlineAuctionToggle" class="toggle-switch-track" data-checked="false">
            <div class="toggle-knob"></div>
            <span class="toggle-label-no">TIDAK</span>
            <span class="toggle-label-yes">YA</span>
          </div>
        </div>
      </div>

      <!-- Create Room Button -->
      <button id="btnCreateOnlineRoom" class="btn-menu-blue w-full py-3.5 mt-6 rounded-2xl text-white font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl">
        <span>+ Buat Ruangan</span>
      </button>

      <!-- Divider & Join Room -->
      <div class="text-center my-4">
        <span class="text-[11px] font-extrabold text-amber-400/70 uppercase tracking-widest">— ATAU GABUNG RUANGAN —</span>
      </div>

      <div class="flex gap-2">
        <input type="text" id="onlineRoomCodeInput" placeholder="Masukkan Kode (cth: MONO-88)" class="flex-1 bg-[#231208] border border-[#3d1f0d] rounded-xl px-3 py-2 text-xs font-bold text-white uppercase outline-none focus:border-amber-500 text-center tracking-widest placeholder:text-zinc-500" />
        <button id="btnJoinOnlineRoom" class="btn-menu-orange px-5 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer">
          <span>Gabung</span>
        </button>
      </div>
    </div>
  </section>


  <!-- ======================================================== -->
  <!-- 4.5. LAYAR LOBBY MENUNGGU PEMAIN (ONLINE LOBBY SCREEN)   -->
  <!-- ======================================================== -->
  <section id="onlineLobbyScreen" class="hidden w-full max-w-lg min-h-screen flex flex-col items-center justify-center p-4 mx-auto">
    <div class="settings-card w-full p-6 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-4">
        <button id="btnLeaveLobby" class="btn-card-back px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Keluar</span>
        </button>
        <div class="flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Lobby Online</span>
        </div>
        <div class="w-12"></div>
      </div>

      <!-- Header Title -->
      <h2 class="text-gold-3d text-2xl font-black text-center tracking-wider mb-2">
        RUANG TUNGGU
      </h2>
      <p class="text-xs text-center text-amber-200/80 mb-5 font-medium">
        Kumpulkan temanmu sebelum memulai kompetisi!
      </p>

      <!-- Room Code Banner -->
      <div class="bg-[#241208] border-2 border-[#d49c20]/60 rounded-2xl p-4 mb-5 text-center shadow-inner relative overflow-hidden">
        <div class="text-[11px] uppercase tracking-widest font-extrabold text-amber-300/80 mb-1 font-outfit">
          KODE RUANGAN
        </div>
        <div class="flex items-center justify-center gap-3">
          <span id="lobbyRoomCodeDisplay" class="text-2xl md:text-3xl font-black tracking-widest text-white font-mono drop-shadow">
            ------
          </span>
          <button id="btnCopyRoomCode" class="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs transition flex items-center gap-1.5 shadow cursor-pointer active:scale-95" title="Salin Kode ke Clipboard">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <span id="copyLabel">Salin</span>
          </button>
        </div>
        <p class="text-[11px] text-zinc-400 mt-2">
          Bagikan kode ini ke pemain lain agar mereka dapat masuk dari peramban masing-masing.
        </p>
      </div>

      <!-- Capacity & Status Badge -->
      <div class="flex items-center justify-between px-2 mb-3">
        <span class="text-xs font-bold text-zinc-300">Daftar Pemain di Ruangan</span>
        <span id="lobbyPlayerCountBadge" class="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
          1 / 4 Pemain
        </span>
      </div>

      <!-- Player Slots Grid (1 to 4) -->
      <div id="lobbySlotsContainer" class="space-y-2.5 mb-6">
        <!-- Rendered dynamically via JS -->
      </div>

      <!-- Host Controls -->
      <div id="lobbyHostControls" class="space-y-3">
        <div class="flex gap-2">
          <button id="btnLobbyAddBot" class="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-amber-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer">
            <svg class="w-4 h-4 fill-current text-amber-300" viewBox="0 0 24 24">
              <path d="M12 2a2 2 0 0 1 2 2v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1v1a2 2 0 0 1-4 0v-1H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
            </svg>
            <span>+ Tambah Bot AI</span>
          </button>
        </div>

        <button id="btnLobbyStartGame" disabled class="btn-menu-orange w-full py-3.5 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 cursor-not-allowed opacity-50 shadow-xl transition">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span id="lobbyStartBtnText">MULAI PERMAINAN (0/4)</span>
        </button>
        
        <p id="lobbyStartWarningText" class="text-[11px] text-center text-amber-400/90 font-semibold">
          Wajib ada 4 orang pemain terisi penuh sebelum dapat memulai permainan.
        </p>
      </div>

      <!-- Guest Waiting Notice -->
      <div id="lobbyGuestControls" class="hidden text-center py-3 bg-zinc-900/60 rounded-xl border border-zinc-800 p-3">
        <div class="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs mb-1">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>Menunggu Host Memulai Permainan...</span>
        </div>
        <p class="text-[11px] text-zinc-400">
          Permainan akan otomatis dimulai saat Host menekan tombol Mulai setelah 4 pemain terisi.
        </p>
      </div>
    </div>
  </section>


  <!-- ========================================== -->
  <!-- 5. LAYAR PAPAN PERMAINAN (IN-GAME BOARD)   -->
  <!-- ========================================== -->
  <section id="inGameBoardScreen" class="hidden w-full min-h-screen flex flex-col bg-zinc-950/85">
    <!-- Top In-Game Header Bar -->
    <header class="h-11 md:h-12 border-b border-amber-900/60 bg-zinc-900/90 backdrop-blur px-3 flex items-center justify-between shadow-lg sticky top-0 z-30">
      <div class="flex items-center gap-2">
        <button id="btnInGameBackHome" class="btn-home-pill px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-amber-300 font-bold text-xs cursor-pointer" title="Kembali ke Menu Utama">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span class="hidden sm:inline">Menu Utama</span>
        </button>
        <span class="font-black text-sm md:text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 font-outfit">
          MONOPOLI NUSANTARA
        </span>
        <span id="inGameModeBadge" class="hidden md:inline-block ml-1 text-[9.5px] bg-amber-950 text-amber-300 border border-amber-600/40 px-2 py-0.2 rounded-full font-bold">
          vs Bot AI
        </span>
      </div>

      <div class="flex items-center gap-1.5">
        <!-- Riwayat Permainan Dropdown Menu -->
        <div class="relative">
          <button id="btnLogsDropdown" class="p-1.5 px-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-bold transition flex items-center gap-1.5 border border-zinc-700 shadow cursor-pointer active:scale-95" title="Riwayat Permainan">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
            <span class="hidden sm:inline">Riwayat</span>
            <span id="logsBadgeCount" class="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded-full border border-amber-500/30">0</span>
            <svg class="w-3 h-3 fill-current opacity-70 transition-transform duration-200" id="logsDropdownArrow" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>

          <!-- Dropdown Popup Card (Solid Opaque 100% Contrast) -->
          <div id="logsDropdownMenu" class="hidden absolute right-0 mt-2 w-72 sm:w-80 bg-[#12131a] border-2 border-amber-500/70 rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.95)] z-50 animate-fadeIn">
            <div class="flex items-center justify-between pb-2 border-b border-zinc-800 mb-2">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
                <div class="text-[11px] uppercase font-extrabold tracking-wider text-amber-300 font-outfit">Riwayat Permainan</div>
              </div>
              <span class="text-[9px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/80 px-1.5 py-0.2 rounded-full border border-emerald-500/40">
                <span class="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                Live
              </span>
            </div>
            <div id="gameLogsList" class="h-64 overflow-y-auto space-y-1.5 pr-1 text-[11px]"></div>
          </div>
        </div>

        <button id="btnSoundToggle" class="p-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-400 text-xs font-bold transition flex items-center gap-1 border border-zinc-700 shadow cursor-pointer" title="Aktif/Nonaktifkan Suara">
          <span id="soundIcon" class="w-3.5 h-3.5 inline-flex items-center justify-center">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </span>
          <span class="hidden sm:inline text-[11px]" id="soundLabel">Suara</span>
        </button>

        <button id="btnGameRules" class="p-1.5 px-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-bold transition flex items-center gap-1 border border-zinc-700 shadow cursor-pointer" title="Panduan Aturan Main">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <span class="hidden sm:inline text-[11px]">Aturan</span>
        </button>

        <button id="btnNewGame" class="p-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-lg active:scale-95 cursor-pointer">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          <span class="text-[11px]">Mulai Ulang</span>
        </button>
      </div>
    </header>

    <!-- Main Workspace -->
    <div class="flex-1 p-1 sm:p-1.5 xl:p-2 flex flex-col xl:flex-row items-center xl:items-start justify-center gap-1.5 xl:gap-2.5 max-w-[1440px] mx-auto w-full min-h-0">
      <!-- Left Column: Player Cards -->
      <aside class="w-full xl:w-56 2xl:w-64 shrink-0 flex flex-col gap-2 order-2 xl:order-1">
        <div class="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5 shadow-xl">
          <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-zinc-800">
            <h3 class="text-[11px] uppercase font-extrabold tracking-wider text-amber-400 font-outfit">Daftar Pemain</h3>
            <span class="text-[9.5px] text-gray-400 font-medium">Status & Giliran</span>
          </div>
          <div id="playersListContainer" class="space-y-1.5"></div>

          <!-- Jail Actions (Aktif jika pemain sedang di penjara) -->
          <div id="jailActions" class="hidden pt-2 border-t border-zinc-800 space-y-1.5 mt-2">
            <div class="text-[10px] text-red-400 font-semibold text-center flex items-center justify-center gap-1">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <span>Anda Ditahan di Penjara</span>
            </div>
            <button id="btnPayJailFine" class="w-full py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 text-[11px] font-bold transition cursor-pointer font-outfit">
              Bayar Denda Rp 500.000
            </button>
            <button id="btnUseJailCard" class="hidden w-full py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-200 text-[11px] font-bold transition cursor-pointer font-outfit">
              Gunakan Kartu Bebas Penjara
            </button>
          </div>
        </div>

        <!-- Obrolan Pemain & Reaksi Emoticon -->
        <div id="playerChatCard" class="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5 shadow-xl flex flex-col gap-1.5">
          <!-- Header -->
          <div class="flex items-center justify-between pb-1 border-b border-zinc-800">
            <div class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
              </svg>
              <h3 class="text-[11px] uppercase font-extrabold tracking-wider text-amber-400 font-outfit">Obrolan Pemain</h3>
            </div>
            <span class="flex items-center gap-1 text-[8.5px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.2 rounded-full border border-emerald-500/40">
              <span class="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>

          <!-- Quick Reaction Emoticon Bar (Bisa Di-Spam ke Tengah Papan) -->
          <div>
            <div class="text-[8.5px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Reaksi Cepat (Spam)</span>
              <span class="text-[8px] text-amber-400/80 lowercase">klik muncul di papan</span>
            </div>
            <div id="quickEmoteBar" class="grid grid-cols-5 gap-1 bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-1 overflow-hidden">
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="😂" title="Tertawa (wkwk)">😂</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="🤣" title="Ngakak">🤣</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="🤑" title="Cuan / Kaya">🤑</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="😭" title="Nangis / Apes">😭</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="😡" title="Marah / Emosi">😡</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="😎" title="Santai / Bos">😎</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="💀" title="Tamat / Apes">💀</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="🎲" title="Hoki Dadu">🎲</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="🔥" title="Membara">🔥</button>
              <button type="button" class="btn-quick-emote h-6 hover:bg-zinc-800/90 rounded text-sm hover:scale-125 active:scale-90 transition transform cursor-pointer select-none flex items-center justify-center" data-emote="👏" title="Tepuk Tangan">👏</button>
            </div>
          </div>

          <!-- Chat Message Feed -->
          <div id="chatMessagesList" class="h-20 xl:h-24 overflow-y-auto overflow-x-hidden space-y-1 pr-1 text-[11px] custom-chat-scroll flex flex-col">
            <div class="text-[9.5px] text-zinc-500 text-center py-1 italic">
              Ketik pesan di bawah untuk mengobrol.
            </div>
          </div>

          <!-- Chat Input Form -->
          <form id="chatInputForm" class="flex items-center gap-1 pt-1 border-t border-zinc-800/80">
            <input 
              type="text" 
              id="inputChatMessage" 
              placeholder="Ketik pesan..." 
              maxlength="80" 
              autocomplete="off"
              class="flex-1 bg-zinc-950 border border-zinc-700/80 rounded-lg px-2 py-1 text-[11px] text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition"
            />
            <button 
              type="submit" 
              id="btnSendChatMessage" 
              class="p-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold transition flex items-center justify-center shadow cursor-pointer active:scale-95"
              title="Kirim Pesan"
            >
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      </aside>

      <!-- Center Column: The Monopoly Board -->
      <section class="flex flex-col items-center justify-center order-1 xl:order-2 shrink-0 min-w-0 min-h-0">
        <div id="monopolyBoard" class="monopoly-board"></div>
      </section>

      <!-- Right Column: Asset Portfolio & Player-to-Player Trading System -->
      <aside class="w-full xl:w-56 2xl:w-64 shrink-0 flex flex-col gap-2 order-3">
        <!-- 1. Aset & Properti (Card Grid Mini Title Deed) -->
        <div class="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5 shadow-xl flex flex-col max-h-[390px] overflow-hidden">
          <div class="flex items-center justify-between pb-1 border-b border-zinc-800 mb-1 shrink-0">
            <div class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
              </svg>
              <div class="text-[11px] uppercase font-extrabold tracking-wider text-amber-400 font-outfit">Aset & Properti</div>
            </div>
            <span id="portfolioStatsBadge" class="text-[9px] text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded-full border border-amber-500/40 font-bold">0 Properti</span>
          </div>

          <!-- Filter Pemain / Tabs Switcher -->
          <div id="portfolioPlayerTabs" class="flex items-center gap-1 overflow-x-auto pb-0.5 mb-0.5 scrollbar-none text-[9.5px] shrink-0">
            <!-- Populated by JavaScript -->
          </div>

          <!-- Cards Grid Container with Smooth Scrollbar (Scrolls on 9+ cards) -->
          <div id="portfolioList" class="flex-1 min-h-0 max-h-[300px] overflow-y-auto pr-1 text-[11px] grid grid-cols-2 gap-1.5 content-start custom-portfolio-scroll">
            <p class="text-gray-500 text-center py-4 col-span-2 text-[10px]">Belum ada properti yang dibeli.</p>
          </div>
          <div id="portfolioScrollHint" class="hidden text-center text-[8.5px] text-amber-400/90 pt-1 border-t border-zinc-800/80 font-medium shrink-0 flex items-center justify-center gap-1">
            <span class="animate-bounce">↓</span> <span id="portfolioScrollHintText">Gulir untuk melihat properti lainnya</span>
          </div>
        </div>

        <!-- 2. Sistem Trading Sesama Pemain (Player-to-Player Trading Desk) -->
        <div class="bg-zinc-900/90 border-2 border-amber-500/40 rounded-xl p-2.5 shadow-xl flex flex-col gap-1.5 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95">
          <div class="flex items-center justify-between pb-1 border-b border-zinc-800">
            <div class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 24 24">
                <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
              </svg>
              <div class="text-[11px] uppercase font-extrabold tracking-wider text-amber-400 font-outfit">Trading Pemain</div>
            </div>
            <span class="text-[8.5px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.2 rounded-full border border-emerald-500/40">
              Tukar Aset
            </span>
          </div>

          <p class="text-[11px] text-gray-300 leading-snug">
            Tukar-tambah tanah, stasiun, utilitas, atau uang tunai secara strategis dengan pemain lawan / Bot AI.
          </p>

          <div id="tradingPartnersStatus" class="flex items-center gap-1.5 text-[10px] text-gray-400">
            <!-- Partner indicators populated dynamically -->
          </div>

          <button id="btnOpenTradingDesk" class="w-full py-2.5 rounded-xl btn-menu-orange text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer font-outfit shadow-lg active:scale-95">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
            </svg>
            <span>Buka Meja Trading</span>
          </button>
        </div>
      </aside>
    </div>
  </section>

  <!-- Modal Container Overlay -->
  <div id="modalContainer" class="hidden"></div>

  <!-- Rules Guide Modal -->
  <div id="rulesModal" class="hidden fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div class="bg-zinc-900 border-2 border-emerald-500/50 rounded-3xl max-w-lg w-full shadow-2xl p-6 text-white max-h-[85vh] overflow-y-auto font-sans">
      <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 fill-current text-amber-400" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <h2 class="font-black text-lg text-amber-400 font-outfit">Panduan Aturan Permainan Monopoli</h2>
        </div>
        <button id="btnCloseRules" class="text-gray-400 hover:text-white transition cursor-pointer p-1">
          <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="space-y-4 my-4 text-xs leading-relaxed text-gray-300">
        <div class="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
          <h4 class="font-bold text-emerald-400 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            <span>Tujuan Utama</span>
          </h4>
          <p>Membeli, menyewakan, dan menguasai properti di seluruh Indonesia hingga seluruh lawan bangkrut!</p>
        </div>

        <div>
          <h4 class="font-bold text-amber-400 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/></svg>
            <span>Dadu & Angka Kembar</span>
          </h4>
          <ul class="list-disc list-inside space-y-1 pl-1">
            <li>Jika melempar angka kembar (misal 4-4), Anda berhak jalan lagi setelah giliran selesai.</li>
            <li>Jika melempar angka kembar <b>3 kali berturut-turut</b> dalam 1 giliran, Anda langsung dijebloskan ke <b>Penjara</b>!</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-amber-400 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10.7 2.3a1 1 0 0 1 1.4 0l8 8a1 1 0 0 1-1.4 1.4L18 11V20a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9l-.7.7a1 1 0 0 1-1.4-1.4l8-8z"/></svg>
            <span>Aturan Pembelian & Pembangunan Rumah</span>
          </h4>
          <ul class="list-disc list-inside space-y-1 pl-1">
            <li>Saat pertama kali mendarat di tanah kosong, Anda hanya membeli tanah mentahnya saja.</li>
            <li>Pembangunan rumah hanya dapat dilakukan saat bidak Anda <b>mendarat kembali di petak milik sendiri</b> pada putaran berikutnya (maksimal 1 rumah per pendaratan).</li>
            <li>Di luar mendarat di petak tersebut, Anda tidak dapat membangun rumah secara langsung.</li>
            <li>Maksimal 4 rumah sebelum dapat di-upgrade menjadi <b>Hotel Megah</b> pada pendaratan ke-5.</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-amber-400 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Aturan Penjara</span>
          </h4>
          <p>Keluar dari penjara dengan 3 cara: melempar dadu kembar, membayar denda Rp 500.000, atau menggunakan Kartu Bebas Penjara.</p>
        </div>

        <div>
          <h4 class="font-bold text-amber-400 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4"/><path d="M12 6v12"/></svg>
            <span>Melewati Petak Mulai (GO)</span>
          </h4>
          <p>Setiap kali melewati atau mendarat di petak Mulai, Bank memberikan uang tunai <b>Rp 2.000.000</b>.</p>
        </div>
      </div>

      <button id="btnConfirmRules" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer font-outfit">
        Saya Mengerti!
      </button>
    </div>
  </div>

  <!-- State Bootstrapper dari Flight PHP -->
  <script>
    window.BASE_URL = "<?= rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? ''), '/\\') ?>";
    window.INITIAL_STATE = <?= json_encode($initialState, JSON_UNESCAPED_UNICODE) ?>;
    window.BOARD_SPACES = <?= json_encode($boardSpaces, JSON_UNESCAPED_UNICODE) ?>;
    window.PROPERTY_GROUPS = <?= json_encode($propertyGroups, JSON_UNESCAPED_UNICODE) ?>;
  </script>
  <script src="./assets/js/game.js?v=<?= time() ?>"></script>
</body>
</html>
