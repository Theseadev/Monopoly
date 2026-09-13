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
      background-color: #190407;
      background-image: 
        radial-gradient(ellipse at 50% 30%, rgba(225, 29, 72, 0.28) 0%, rgba(159, 18, 57, 0.3) 45%, rgba(15, 2, 4, 0.98) 100%),
        repeating-linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.03) 0px,
          rgba(255, 255, 255, 0.03) 1px,
          transparent 2px,
          transparent 4px,
          rgba(0, 0, 0, 0.04) 5px,
          transparent 7px
        );
      background-attachment: fixed;
      background-size: cover;
    }

    .font-outfit {
      font-family: 'Outfit', sans-serif;
    }

    .text-gold-3d {
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      letter-spacing: 0.04em;
      background: linear-gradient(180deg, #ffffff 15%, #ffd5df 65%, #f43f5e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 0 #9f1239) drop-shadow(0 4px 12px rgba(225, 29, 72, 0.5));
    }

    .text-gold-subtitle {
      color: #fecdd3;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      letter-spacing: 0.22em;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
    }

    .btn-menu-orange {
      background: linear-gradient(180deg, #e11d48 0%, #be123c 50%, #9f1239 100%) !important;
      border: 2px solid #fb7185 !important;
      box-shadow: 0 5px 0 #4c0519, 0 12px 22px rgba(225, 29, 72, 0.35), inset 0 1.5px 1px rgba(255, 255, 255, 0.4) !important;
      font-family: 'Outfit', sans-serif;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-menu-orange:hover {
      background: linear-gradient(180deg, #f43f5e 0%, #e11d48 50%, #be123c 100%) !important;
      transform: translateY(-2px);
      box-shadow: 0 7px 0 #4c0519, 0 16px 26px rgba(225, 29, 72, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.5) !important;
    }
    .btn-menu-orange:active {
      transform: translateY(3px);
      box-shadow: 0 2px 0 #4c0519, 0 4px 8px rgba(0, 0, 0, 0.4) !important;
    }

    .btn-menu-green {
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%) !important;
      border: 2px solid #cbd5e1 !important;
      box-shadow: 0 5px 0 #94a3b8, 0 10px 18px rgba(0, 0, 0, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.8) !important;
      font-family: 'Outfit', sans-serif;
      color: #be123c !important;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-menu-green svg, .btn-menu-green span {
      color: #be123c !important;
    }
    .btn-menu-green:hover {
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 50%, #f1f5f9 100%) !important;
      transform: translateY(-2px);
      box-shadow: 0 7px 0 #94a3b8, 0 14px 22px rgba(0, 0, 0, 0.5), inset 0 1.5px 1px #ffffff !important;
    }
    .btn-menu-green:active {
      transform: translateY(3px);
      box-shadow: 0 2px 0 #94a3b8, 0 4px 8px rgba(0, 0, 0, 0.4) !important;
    }

    .btn-menu-blue {
      background: linear-gradient(180deg, #be123c 0%, #9f1239 50%, #881337 100%) !important;
      border: 2px solid #f43f5e !important;
      box-shadow: 0 5px 0 #4c0519, 0 12px 22px rgba(225, 29, 72, 0.35), inset 0 1.5px 1px rgba(255, 255, 255, 0.35) !important;
      font-family: 'Outfit', sans-serif;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-menu-blue:hover {
      background: linear-gradient(180deg, #e11d48 0%, #be123c 50%, #9f1239 100%) !important;
      transform: translateY(-2px);
      box-shadow: 0 7px 0 #4c0519, 0 16px 26px rgba(225, 29, 72, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.45) !important;
    }
    .btn-menu-blue:active {
      transform: translateY(3px);
      box-shadow: 0 2px 0 #4c0519, 0 4px 8px rgba(0, 0, 0, 0.4) !important;
    }

    .btn-home-pill {
      background: #2b080c !important;
      border: 2px solid #e11d48 !important;
      box-shadow: 0 3px 0 #150204, 0 6px 12px rgba(0, 0, 0, 0.45) !important;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #fecdd3 !important;
      transition: all 0.15s ease;
    }
    .btn-home-pill:hover {
      background: #3b0d13 !important;
      transform: translateY(-1px);
    }
    .btn-home-pill:active {
      transform: translateY(2px);
      box-shadow: 0 1px 0 #150204 !important;
    }

    .settings-card {
      background: linear-gradient(175deg, rgba(38, 8, 14, 0.96) 0%, rgba(20, 3, 6, 0.98) 100%) !important;
      border: 1.5px solid rgba(244, 63, 94, 0.3) !important;
      border-radius: 24px !important;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(225, 29, 72, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.12) !important;
      backdrop-filter: blur(20px);
      box-sizing: border-box;
    }
    @media (min-width: 640px) {
      .settings-card {
        border-radius: 28px !important;
      }
    }

    .form-setting-row {
      background: rgba(18, 3, 6, 0.7);
      border: 1.5px solid rgba(255, 255, 255, 0.07);
      border-radius: 14px;
      padding: 8px 11px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
    }
    @media (min-width: 640px) {
      .form-setting-row {
        border-radius: 18px;
        padding: 10px 13px;
      }
    }
    .form-setting-row:focus-within, .form-setting-row:hover {
      border-color: rgba(244, 63, 94, 0.35);
      background: rgba(26, 4, 9, 0.85);
    }

    .gaming-input {
      background: rgba(14, 2, 4, 0.85) !important;
      border: 1.5px solid rgba(244, 63, 94, 0.25) !important;
      border-radius: 13px !important;
      color: #ffffff !important;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      transition: all 0.2s ease !important;
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.7) !important;
    }
    .gaming-input:focus {
      border-color: #f43f5e !important;
      box-shadow: 0 0 16px rgba(244, 63, 94, 0.3), inset 0 2px 5px rgba(0, 0, 0, 0.7) !important;
    }

    .btn-card-back {
      background-color: rgba(45, 10, 16, 0.85) !important;
      border: 1.5px solid rgba(244, 63, 94, 0.3) !important;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4) !important;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #fecdd3 !important;
      transition: all 0.15s ease;
    }
    .btn-card-back:hover {
      background-color: rgba(70, 15, 25, 0.95) !important;
      border-color: rgba(244, 63, 94, 0.6) !important;
      transform: translateY(-1px);
    }
    .btn-card-back:active {
      transform: scale(0.96);
    }

    input[type="range"].monopoly-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      background: #200508;
      border-radius: 9999px;
      outline: none;
      border: 1px solid #3d0a11;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.8);
    }
    input[type="range"].monopoly-slider::-webkit-slider-runnable-track {
      height: 8px;
      border-radius: 9999px;
      background: linear-gradient(to right, #e11d48 var(--slider-progress, 50%), #3a0d13 var(--slider-progress, 50%));
    }
    input[type="range"].monopoly-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #ffffff 0%, #f8fafc 50%, #f43f5e 100%);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 0 10px rgba(244, 63, 94, 0.5);
      border: 2px solid #ffffff;
      cursor: pointer;
      margin-top: -9px;
      transition: transform 0.15s ease;
    }
    input[type="range"].monopoly-slider::-webkit-slider-thumb:hover {
      transform: scale(1.12);
    }
    input[type="range"].monopoly-slider::-webkit-slider-thumb:active {
      transform: scale(0.95);
    }

    /* Ultra-Clean Modern Toggle Switch (No Text Clipping Bug) */
    .toggle-switch-track {
      width: 50px;
      height: 28px;
      background-color: #2b080c;
      border: 1.5px solid #52131b;
      border-radius: 9999px;
      position: relative;
      cursor: pointer;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }
    .toggle-switch-track:hover {
      border-color: #f43f5e;
    }
    .toggle-switch-track.active {
      background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
      border-color: #fb7185;
      box-shadow: 0 0 15px rgba(225, 29, 72, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.35);
    }
    .toggle-knob {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%);
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 2px;
      top: 1.5px;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .toggle-switch-track.active .toggle-knob {
      transform: translateX(22px);
      background: #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4), 0 0 10px rgba(255, 255, 255, 0.9);
    }

    /* ======================================================== */
    /* STRICT SCREEN ISOLATION & NO-SCROLL ENGINE               */
    /* ======================================================== */
    html, body {
      height: 100% !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }

    /* Screen display control: hidden means totally hidden */
    .hidden,
    section.hidden,
    div.hidden,
    aside.hidden,
    nav.hidden,
    #inGameBoardScreen.hidden,
    #homeMenuScreen.hidden,
    #settingsAiScreen.hidden,
    #settingsPvpScreen.hidden,
    #settingsOnlineScreen.hidden,
    #onlineLobbyScreen.hidden,
    #inGameBoardScreen.hidden #mobileBottomNav,
    #inGameBoardScreen.hidden #mobileTopPlayerStrip,
    #inGameBoardScreen.hidden #mobileBottomEventTicker,
    #inGameBoardScreen.hidden header {
      display: none !important;
    }

    #homeMenuScreen:not(.hidden),
    #settingsAiScreen:not(.hidden),
    #settingsPvpScreen:not(.hidden),
    #settingsOnlineScreen:not(.hidden),
    #onlineLobbyScreen:not(.hidden) {
      height: 100% !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
    }

    #inGameBoardScreen:not(.hidden) {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      width: 100% !important;
      height: 100% !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      z-index: 30 !important;
    }

    /* Desktop hides mobile navigation bar & mobile strips */
    @media (min-width: 1024px) {
      #mobileBottomNav,
      #mobileTopPlayerStrip,
      #mobileBottomEventTicker {
        display: none !important;
      }
    }
  </style>
</head>
<body class="h-screen max-h-screen h-[100dvh] w-full flex flex-col text-slate-100 overflow-hidden">

  <!-- ========================================== -->
  <!-- 1. LAYAR MENU UTAMA (HOME / MENU UTAMA)    -->
  <!-- ========================================== -->
  <section id="homeMenuScreen" class="w-full max-w-lg h-full max-h-screen flex flex-col items-center justify-center p-4 sm:p-6 mx-auto overflow-hidden">
    <!-- 3D Dice Logo -->
    <div class="mb-2 sm:mb-3 transform hover:rotate-6 transition-transform duration-300 drop-shadow-2xl">
      <svg class="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <div class="text-center mb-4 sm:mb-7">
      <h1 class="text-gold-3d text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider">
        MONOPOLI
      </h1>
      <p class="text-gold-subtitle text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest mt-0.5">
        GAME PAPAN KLASIK
      </p>
    </div>

    <!-- Main Menu Buttons Stack -->
    <div class="w-full max-w-[320px] sm:max-w-[340px] space-y-3 sm:space-y-4">
      <!-- 1. Play vs AI -->
      <button id="btnMenuAi" class="btn-menu-orange w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-2xl flex items-center justify-center gap-3 text-white font-extrabold text-sm sm:text-base md:text-lg cursor-pointer active:scale-95 transition">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white shrink-0" viewBox="0 0 24 24">
          <path d="M12 2a2 2 0 0 1 2 2v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1v1a2 2 0 0 1-4 0v-1H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <span class="text-white tracking-wide">Main vs Bot AI</span>
      </button>

      <!-- 2. Player vs Player -->
      <button id="btnMenuPvp" class="btn-menu-green w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-2xl flex items-center justify-center gap-3 text-white font-extrabold text-sm sm:text-base md:text-lg cursor-pointer active:scale-95 transition">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white shrink-0" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span class="text-white tracking-wide">Pemain vs Pemain</span>
      </button>

      <!-- 3. Online Multiplayer -->
      <button id="btnMenuOnline" class="btn-menu-blue w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-2xl flex items-center justify-center gap-3 text-white font-extrabold text-sm sm:text-base md:text-lg cursor-pointer active:scale-95 transition">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white shrink-0" viewBox="0 0 24 24">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 4.5c3.34 0 6.4 1.25 8.74 3.32L12 19.34 3.26 11.82A13.2 13.2 0 0 1 12 8.5z"/>
        </svg>
        <span class="text-white tracking-wide">Multiplayer Online</span>
      </button>
    </div>

    <!-- Home Pill Button -->
    <div class="mt-4 sm:mt-6">
      <button id="btnMenuHomeReset" class="btn-home-pill px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl flex items-center gap-2 text-rose-200 font-bold text-xs cursor-pointer active:scale-95 transition">
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span>Beranda</span>
      </button>
    </div>
  </section>


  <!-- ========================================== -->
  <!-- 2. LAYAR PENGATURAN "MAIN VS BOT AI"       -->
  <!-- ========================================== -->
  <section id="settingsAiScreen" class="hidden w-full max-w-[420px] min-h-screen flex flex-col items-center justify-center p-3.5 sm:p-5 mx-auto animate-fade-in">
    <div class="settings-card w-full p-4 sm:p-6 pb-5 sm:pb-6 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <button id="btnBackFromAi" class="btn-card-back px-3 py-1.5 rounded-xl text-xs font-bold text-rose-200 flex items-center gap-1.5 cursor-pointer active:scale-95 transition">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Kembali</span>
        </button>
        <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-[11px] font-extrabold text-rose-300 font-outfit shadow-sm">
          <svg class="w-3.5 h-3.5 fill-current text-purple-400" viewBox="0 0 24 24">
            <path d="M12 2a2 2 0 0 1 2 2v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1v1a2 2 0 0 1-4 0v-1H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          </svg>
          <span>Main vs Bot AI</span>
        </div>
        <div class="w-10"></div>
      </div>

      <!-- Title -->
      <div class="text-center mb-4 sm:mb-5">
        <h2 class="text-gold-3d text-2xl sm:text-3xl font-black uppercase tracking-wider">
          PENGATURAN
        </h2>
        <p class="text-rose-300/80 text-[11px] sm:text-xs font-semibold mt-0.5">
          Konfigurasi permainan melawan kecerdasan buatan
        </p>
      </div>

      <!-- Form Controls -->
      <div class="space-y-2.5 sm:space-y-3">
        <!-- 1. Jumlah Pemain -->
        <div class="form-setting-row space-y-1.5 sm:space-y-2">
          <div class="flex justify-between items-center text-xs font-bold text-white font-outfit">
            <span class="flex items-center gap-1.5"><span>👥</span> <span>Jumlah Pemain</span></span>
            <span id="aiPlayersVal" class="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-500/40 font-extrabold text-xs">4 Orang</span>
          </div>
          <input type="range" id="aiPlayersSlider" min="2" max="4" value="4" step="1" class="monopoly-slider" />
        </div>

        <!-- 2. Tingkat Kecerdasan Bot -->
        <div class="form-setting-row space-y-1.5 sm:space-y-2">
          <div class="flex justify-between items-center text-xs font-bold text-white font-outfit">
            <span class="flex items-center gap-1.5"><span>🧠</span> <span>Tingkat Kecerdasan Bot</span></span>
            <span id="aiRobotsVal" class="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-500/40 font-extrabold text-xs">Sedang</span>
          </div>
          <input type="range" id="aiRobotsSlider" min="1" max="3" value="2" step="1" class="monopoly-slider" />
        </div>

        <!-- 3. Modal Awal Uang -->
        <div class="form-setting-row space-y-1.5 sm:space-y-2">
          <div class="flex justify-between items-center text-xs font-bold text-white font-outfit">
            <span class="flex items-center gap-1.5"><span>💰</span> <span>Modal Awal Uang</span></span>
            <span id="aiMoneyVal" class="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-500/40 font-extrabold text-xs">Rp 15.000.000</span>
          </div>
          <input type="range" id="aiMoneySlider" min="5000000" max="25000000" value="15000000" step="2500000" class="monopoly-slider" />
        </div>

        <!-- 4. Tarik Sewa di Penjara -->
        <div class="form-setting-row flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="text-xs font-extrabold text-white font-outfit flex items-center gap-1.5">
              <span>🔒</span> <span class="truncate">Tarik Sewa di Penjara</span>
            </div>
            <div class="text-[10px] sm:text-[10.5px] text-zinc-400 leading-tight sm:leading-snug mt-0.5">Pemilik yang dipenjara tidak menerima uang sewa</div>
          </div>
          <div id="aiJailToggle" class="toggle-switch-track shrink-0" data-checked="false">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <!-- 5. Mode Lelang Properti -->
        <div class="form-setting-row flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="text-xs font-extrabold text-white font-outfit flex items-center gap-1.5">
              <span>🏷️</span> <span class="truncate">Mode Lelang Properti</span>
            </div>
            <div class="text-[10px] sm:text-[10.5px] text-zinc-400 leading-tight sm:leading-snug mt-0.5">Properti yang dilewati langsung dilelang</div>
          </div>
          <div id="aiAuctionToggle" class="toggle-switch-track shrink-0" data-checked="false">
            <div class="toggle-knob"></div>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <button id="btnStartAiGame" class="btn-menu-orange w-full py-3 sm:py-3.5 mt-4 sm:mt-5 rounded-xl sm:rounded-2xl text-white font-black text-xs sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95 transition">
        <span>Lanjut ke Permainan</span>
        <svg class="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </section>


  <!-- ============================================== -->
  <!-- 3. LAYAR PENGATURAN "PEMAIN VS PEMAIN"         -->
  <!-- ============================================== -->
  <section id="settingsPvpScreen" class="hidden w-full max-w-[420px] min-h-screen flex flex-col items-center justify-center p-3.5 sm:p-5 mx-auto animate-fade-in">
    <div class="settings-card w-full p-4 sm:p-6 pb-5 sm:pb-6 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <button id="btnBackFromPvp" class="btn-card-back px-3 py-1.5 rounded-xl text-xs font-bold text-rose-200 flex items-center gap-1.5 cursor-pointer active:scale-95 transition">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Kembali</span>
        </button>
        <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-[11px] font-extrabold text-rose-300 font-outfit shadow-sm">
          <svg class="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <span>Pemain vs Pemain</span>
        </div>
        <div class="w-10"></div>
      </div>

      <!-- Title -->
      <div class="text-center mb-4 sm:mb-5">
        <h2 class="text-gold-3d text-2xl sm:text-3xl font-black uppercase tracking-wider">
          PENGATURAN
        </h2>
        <p class="text-rose-300/80 text-[11px] sm:text-xs font-semibold mt-0.5">
          Main bersama teman secara bergiliran di 1 perangkat
        </p>
      </div>

      <!-- Form Controls -->
      <div class="space-y-2.5 sm:space-y-3">
        <!-- 1. Jumlah Pemain -->
        <div class="form-setting-row space-y-1.5 sm:space-y-2">
          <div class="flex justify-between items-center text-xs font-bold text-white font-outfit">
            <span class="flex items-center gap-1.5"><span>👥</span> <span>Jumlah Pemain</span></span>
            <span id="pvpPlayersVal" class="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-500/40 font-extrabold text-xs">2 Orang</span>
          </div>
          <input type="range" id="pvpPlayersSlider" min="2" max="4" value="2" step="1" class="monopoly-slider" />
        </div>

        <!-- 2. Modal Awal Uang -->
        <div class="form-setting-row space-y-1.5 sm:space-y-2">
          <div class="flex justify-between items-center text-xs font-bold text-white font-outfit">
            <span class="flex items-center gap-1.5"><span>💰</span> <span>Modal Awal Uang</span></span>
            <span id="pvpMoneyVal" class="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-500/40 font-extrabold text-xs">Rp 15.000.000</span>
          </div>
          <input type="range" id="pvpMoneySlider" min="5000000" max="25000000" value="15000000" step="2500000" class="monopoly-slider" />
        </div>

        <!-- 3. Tarik Sewa di Penjara -->
        <div class="form-setting-row flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="text-xs font-extrabold text-white font-outfit flex items-center gap-1.5">
              <span>🔒</span> <span class="truncate">Tarik Sewa di Penjara</span>
            </div>
            <div class="text-[10px] sm:text-[10.5px] text-zinc-400 leading-tight sm:leading-snug mt-0.5">Pemilik yang dipenjara tidak menerima uang sewa</div>
          </div>
          <div id="pvpJailToggle" class="toggle-switch-track shrink-0" data-checked="false">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <!-- 4. Mode Lelang Properti -->
        <div class="form-setting-row flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="text-xs font-extrabold text-white font-outfit flex items-center gap-1.5">
              <span>🏷️</span> <span class="truncate">Mode Lelang Properti</span>
            </div>
            <div class="text-[10px] sm:text-[10.5px] text-zinc-400 leading-tight sm:leading-snug mt-0.5">Properti yang dilewati langsung dilelang</div>
          </div>
          <div id="pvpAuctionToggle" class="toggle-switch-track shrink-0" data-checked="false">
            <div class="toggle-knob"></div>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <button id="btnStartPvpGame" class="btn-menu-orange w-full py-3 sm:py-3.5 mt-4 sm:mt-5 rounded-xl sm:rounded-2xl text-white font-black text-xs sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95 transition">
        <span>Lanjut ke Permainan</span>
        <svg class="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </section>


  <!-- ============================================== -->
  <!-- 4. LAYAR "MULTIPLAYER ONLINE"                  -->
  <!-- ============================================== -->
  <section id="settingsOnlineScreen" class="hidden w-full max-w-[420px] min-h-screen flex flex-col items-center justify-center p-3.5 sm:p-5 mx-auto animate-fade-in">
    <div class="settings-card w-full p-4 sm:p-6 pb-6 sm:pb-7 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <button id="btnBackFromOnline" class="btn-card-back px-3 py-1.5 rounded-xl text-xs font-bold text-rose-200 flex items-center gap-1.5 cursor-pointer active:scale-95 transition">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Kembali</span>
        </button>
        <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-[11px] font-extrabold text-rose-300 font-outfit shadow-sm">
          <svg class="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 4.5c3.34 0 6.4 1.25 8.74 3.32L12 19.34 3.26 11.82A13.2 13.2 0 0 1 12 8.5z"/>
          </svg>
          <span>Multiplayer Online</span>
        </div>
        <div class="w-10"></div>
      </div>

      <!-- Title -->
      <div class="text-center mb-3.5 sm:mb-4">
        <h2 class="text-gold-3d text-2xl sm:text-3xl font-black uppercase tracking-wider">
          GAME ONLINE
        </h2>
        <p class="text-rose-300/80 text-[11px] sm:text-xs font-semibold mt-0.5">
          Buat ruangan baru atau gabung dengan teman
        </p>
      </div>

      <!-- Form Controls -->
      <div class="space-y-2.5 sm:space-y-3">
        <!-- 1. Nama Anda -->
        <div class="form-setting-row space-y-1 sm:space-y-1.5">
          <label class="block text-xs font-extrabold text-rose-200 font-outfit flex items-center gap-1.5">
            <span class="text-sm">👤</span> <span>Nama Anda</span>
          </label>
          <div class="relative">
            <input type="text" id="onlinePlayerName" value="Pemain 1" maxlength="15" placeholder="Ketik nama Anda..." class="gaming-input w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-white font-bold text-xs sm:text-sm outline-none placeholder:text-zinc-500" />
          </div>
        </div>

        <!-- 2. Maksimal Pemain -->
        <div class="form-setting-row space-y-1.5 sm:space-y-2">
          <div class="flex justify-between items-center text-xs font-bold text-white font-outfit">
            <span class="flex items-center gap-1.5"><span>👥</span> <span>Maksimal Pemain</span></span>
            <span id="onlineMaxPlayersVal" class="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-500/40 font-extrabold text-xs">4 Orang</span>
          </div>
          <input type="range" id="onlineMaxPlayersSlider" min="2" max="4" value="4" step="1" class="monopoly-slider" />
        </div>

        <!-- 3. Tarik Sewa di Penjara -->
        <div class="form-setting-row flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="text-xs font-extrabold text-white font-outfit flex items-center gap-1.5">
              <span>🔒</span> <span class="truncate">Tarik Sewa di Penjara</span>
            </div>
            <div class="text-[10px] sm:text-[10.5px] text-zinc-400 leading-tight sm:leading-snug mt-0.5">Pemilik yang dipenjara tidak menerima sewa</div>
          </div>
          <div id="onlineJailToggle" class="toggle-switch-track shrink-0" data-checked="false">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <!-- 4. Mode Lelang Properti -->
        <div class="form-setting-row flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="text-xs font-extrabold text-white font-outfit flex items-center gap-1.5">
              <span>🏷️</span> <span class="truncate">Mode Lelang Properti</span>
            </div>
            <div class="text-[10px] sm:text-[10.5px] text-zinc-400 leading-tight sm:leading-snug mt-0.5">Properti yang dilewati langsung dilelang</div>
          </div>
          <div id="onlineAuctionToggle" class="toggle-switch-track shrink-0" data-checked="false">
            <div class="toggle-knob"></div>
          </div>
        </div>
      </div>

      <!-- Create Room Button -->
      <button id="btnCreateOnlineRoom" class="btn-menu-blue w-full py-3 sm:py-3.5 mt-3.5 sm:mt-4 rounded-xl sm:rounded-2xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition">
        <span>🏠</span>
        <span>+ Buat Ruangan</span>
      </button>

      <!-- Divider & Join Room -->
      <div class="relative flex py-2 sm:py-2.5 items-center my-0.5 sm:my-1">
        <div class="flex-grow border-t border-rose-500/20"></div>
        <span class="flex-shrink mx-2.5 text-[9.5px] sm:text-[10.5px] font-extrabold text-rose-300/80 uppercase tracking-widest font-outfit">ATAU GABUNG RUANGAN</span>
        <div class="flex-grow border-t border-rose-500/20"></div>
      </div>

      <div class="flex gap-2 items-center">
        <input type="text" id="onlineRoomCodeInput" placeholder="KODE (CTH: MONO-88)" class="gaming-input flex-1 min-w-0 px-3 py-2 sm:py-2.5 text-xs font-black text-white uppercase outline-none text-center tracking-wider placeholder:text-zinc-500 placeholder:normal-case placeholder:font-medium placeholder:text-[10px] sm:placeholder:text-[11px]" />
        <button id="btnJoinOnlineRoom" class="btn-menu-orange px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black text-white cursor-pointer active:scale-95 transition flex items-center justify-center gap-1.5 shrink-0 shadow-md">
          <span>🚪</span>
          <span>Gabung</span>
        </button>
      </div>
    </div>
  </section>


  <!-- ======================================================== -->
  <!-- 4.5. LAYAR LOBBY MENUNGGU PEMAIN (ONLINE LOBBY SCREEN)   -->
  <!-- ======================================================== -->
  <section id="onlineLobbyScreen" class="hidden w-full max-w-[440px] min-h-screen flex flex-col items-center justify-center p-4 sm:p-5 mx-auto animate-fade-in">
    <div class="settings-card w-full p-5 sm:p-6 relative">
      <!-- Top Sub-Header -->
      <div class="flex items-center justify-between mb-4">
        <button id="btnLeaveLobby" class="btn-card-back px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-200 flex items-center gap-1.5 cursor-pointer active:scale-95 transition">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Keluar</span>
        </button>
        <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-[11px] font-extrabold text-rose-300 font-outfit shadow-sm">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Lobby Online</span>
        </div>
        <div class="w-10"></div>
      </div>

      <!-- Header Title -->
      <div class="text-center mb-4">
        <h2 class="text-gold-3d text-2xl sm:text-3xl font-black uppercase tracking-wider">
          RUANG TUNGGU
        </h2>
        <p class="text-rose-300/80 text-xs font-semibold mt-0.5">
          Kumpulkan teman sebelum memulai kompetisi
        </p>
      </div>

      <!-- Room Code Banner -->
      <div class="bg-gradient-to-b from-[#24060b] to-[#140205] border-2 border-rose-500/40 rounded-2xl p-4 mb-4 text-center shadow-inner relative overflow-hidden">
        <div class="text-[10px] uppercase tracking-widest font-black text-rose-300/80 mb-1 font-outfit">
          KODE RUANGAN
        </div>
        <div class="flex items-center justify-center gap-2.5">
          <span id="lobbyRoomCodeDisplay" class="text-2xl sm:text-3xl font-black tracking-widest text-white font-mono drop-shadow bg-black/40 px-3.5 py-1 rounded-xl border border-white/10">
            ------
          </span>
          <button id="btnCopyRoomCode" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow-lg cursor-pointer active:scale-95 border border-rose-400/50" title="Salin Kode ke Clipboard">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <span id="copyLabel">Salin</span>
          </button>
        </div>
        <p class="text-[10.5px] text-zinc-400 mt-2">
          Bagikan kode ini ke teman agar mereka dapat bergabung.
        </p>
      </div>

      <!-- Capacity & Status Badge -->
      <div class="flex items-center justify-between px-1 mb-2.5">
        <span class="text-xs font-extrabold text-zinc-300 font-outfit">Daftar Pemain</span>
        <span id="lobbyPlayerCountBadge" class="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40">
          1 / 4 Pemain
        </span>
      </div>

      <!-- Player Slots Grid (1 to 4) -->
      <div id="lobbySlotsContainer" class="space-y-2 mb-5">
        <!-- Rendered dynamically via JS -->
      </div>

      <!-- Host Controls -->
      <div id="lobbyHostControls" class="space-y-2.5">
        <div class="flex gap-2">
          <button id="btnLobbyAddBot" class="flex-1 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-sm">
            <svg class="w-4 h-4 fill-current text-purple-400" viewBox="0 0 24 24">
              <path d="M12 2a2 2 0 0 1 2 2v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1v1a2 2 0 0 1-4 0v-1H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1V4a2 2 0 0 1 2-2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
            </svg>
            <span>+ Tambah Bot AI</span>
          </button>
        </div>

        <button id="btnLobbyStartGame" disabled class="btn-menu-orange w-full py-3.5 rounded-2xl text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 cursor-not-allowed opacity-50 shadow-xl transition">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span id="lobbyStartBtnText">MULAI PERMAINAN (0/4)</span>
        </button>
        
        <p id="lobbyStartWarningText" class="text-[11px] text-center text-rose-400/90 font-semibold">
          Wajib ada 4 orang pemain terisi penuh sebelum dapat memulai permainan.
        </p>
      </div>

      <!-- Guest Waiting Notice -->
      <div id="lobbyGuestControls" class="hidden text-center py-3 bg-zinc-900/70 rounded-xl border border-zinc-800 p-3">
        <div class="flex items-center justify-center gap-2 text-rose-300 font-bold text-xs mb-1 font-outfit">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
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
  <section id="inGameBoardScreen" class="hidden w-full h-screen max-h-screen flex flex-col bg-zinc-950/85 overflow-hidden">
    <!-- Top In-Game Header Bar -->
    <header class="h-10 sm:h-12 border-b border-red-950/70 bg-zinc-900/95 backdrop-blur px-1.5 sm:px-3 flex items-center justify-between shadow-lg sticky top-0 z-40 shrink-0">
      <div class="flex items-center gap-1 sm:gap-2 shrink-0 min-w-0">
        <button id="btnInGameBackHome" class="btn-home-pill p-1.5 sm:px-2.5 sm:py-1 rounded-lg flex items-center justify-center gap-1.5 text-rose-200 font-bold text-xs cursor-pointer shrink-0 active:scale-95" title="Kembali ke Menu Utama">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span class="hidden md:inline">Menu Utama</span>
        </button>
        <span class="font-black text-[11.5px] sm:text-sm md:text-base tracking-normal sm:tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-200 to-white font-outfit whitespace-nowrap shrink-0">
          MONOPOLI NUSANTARA
        </span>
        <span id="inGameModeBadge" class="hidden lg:inline-block ml-1 text-[9.5px] bg-red-950 text-rose-200 border border-red-600/40 px-2 py-0.2 rounded-full font-bold">
          vs Bot AI
        </span>
      </div>

      <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <!-- Riwayat Permainan Dropdown Menu -->
        <div class="relative">
          <button id="btnLogsDropdown" class="p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-rose-200 text-xs font-bold transition flex items-center justify-center gap-0.5 sm:gap-1 border border-zinc-700 shadow cursor-pointer active:scale-95 shrink-0" title="Riwayat Permainan">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
            <span class="hidden md:inline">Riwayat</span>
            <span id="logsBadgeCount" class="bg-red-950/80 text-rose-300 text-[8.5px] sm:text-[9px] px-1 sm:px-1.5 py-0.2 rounded-full border border-red-500/40 font-bold">0</span>
            <svg class="w-3 h-3 fill-current opacity-70 transition-transform duration-200 hidden sm:inline" id="logsDropdownArrow" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>

          <!-- Dropdown Popup Card (Solid Opaque 100% Contrast & Centered on Mobile) -->
          <div id="logsDropdownMenu" class="hidden fixed inset-x-3 top-14 sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:inset-x-auto w-auto sm:w-88 bg-[#190407] border-2 border-red-500/70 rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.95)] z-[60] animate-fadeIn">
            <div class="flex items-center justify-between pb-2 border-b border-zinc-800 mb-2">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 fill-current text-red-400" viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
                <div class="text-[11px] uppercase font-extrabold tracking-wider text-rose-300 font-outfit">Riwayat Permainan</div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[9px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/80 px-1.5 py-0.2 rounded-full border border-emerald-500/40">
                  <span class="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                  Live
                </span>
                <button type="button" id="btnCloseLogsDropdown" class="sm:hidden text-zinc-400 hover:text-white p-0.5" title="Tutup">
                  <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <div id="gameLogsList" class="h-60 sm:h-64 overflow-y-auto space-y-1.5 pr-1 text-[11px]"></div>
          </div>
        </div>

        <!-- Tombol Layar Penuh (Fullscreen) & Perkecil Layar -->
        <button id="btnFullscreenToggle" class="p-1 sm:px-2 sm:py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-rose-200 text-xs font-bold transition flex items-center justify-center gap-1 border border-zinc-700 shadow cursor-pointer active:scale-95 shrink-0" title="Layar Penuh (Tekan ESC untuk keluar)">
          <span id="fullscreenIcon" class="w-3.5 h-3.5 inline-flex items-center justify-center">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </span>
          <span class="hidden lg:inline text-[11px]" id="fullscreenLabel">Layar Penuh</span>
        </button>

        <button id="btnSoundToggle" class="p-1 sm:px-2 sm:py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-400 text-xs font-bold transition flex items-center justify-center gap-1 border border-zinc-700 shadow cursor-pointer active:scale-95 shrink-0" title="Aktif/Nonaktifkan Suara">
          <span id="soundIcon" class="w-3.5 h-3.5 inline-flex items-center justify-center">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </span>
          <span class="hidden md:inline text-[11px]" id="soundLabel">Suara</span>
        </button>

        <button id="btnGameRules" class="p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1 border border-zinc-700 shadow cursor-pointer active:scale-95 shrink-0" title="Panduan Aturan Main">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <span class="hidden md:inline text-[11px]">Aturan</span>
        </button>

        <button id="btnNewGame" class="p-1 sm:px-3 sm:py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-lg active:scale-95 cursor-pointer shrink-0" title="Mulai Ulang / Keluar">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          <span class="hidden md:inline text-[11px]">Mulai Ulang</span>
        </button>
      </div>
    </header>

    <!-- Floating Fullscreen Notification Toast -->
    <div id="fullscreenToast" class="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/95 border border-red-500/60 text-rose-300 text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 pointer-events-none opacity-0 transition-all duration-300 transform -translate-y-2">
      <svg class="w-4 h-4 fill-current text-red-400 shrink-0" viewBox="0 0 24 24">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
      </svg>
      <span class="font-semibold text-[11px]">Mode Layar Penuh Aktif — Tekan <kbd class="px-1.5 py-0.5 bg-black/50 border border-red-500/40 rounded text-[10px] font-mono text-white">ESC</kbd> untuk keluar</span>
    </div>

    <!-- Mobile Drawer Backdrop Overlay (Khusus Mobile) -->
    <div id="mobileDrawerBackdrop" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"></div>

    <!-- Main Workspace -->
    <div class="flex-1 p-1.5 sm:p-2 lg:p-2.5 flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-2 lg:gap-3.5 max-w-[1920px] mx-auto w-full min-h-0 overflow-hidden">
      <!-- Left Column: Player Cards & Chat -->
      <aside id="asideLeft" class="w-full lg:w-72 2xl:w-80 shrink-0 flex flex-col gap-2 lg:gap-2.5 order-2 lg:order-1 min-h-0">
        <!-- 1. Daftar Pemain (Card) -->
        <div id="playerInfoCard" class="mobile-panel-section bg-zinc-900/90 border border-zinc-800 rounded-2xl p-2.5 sm:p-3 shadow-xl shrink-0">
          <!-- Mobile Drag Handle Bar & Close Button (Shown only on Mobile Drawer) -->
          <div class="mobile-drawer-header lg:hidden flex items-center justify-between pb-1 mb-1 border-b border-rose-500/20">
            <div class="w-8 h-1 bg-zinc-600 rounded-full mx-auto"></div>
            <button type="button" class="btn-close-mobile-drawer text-zinc-400 hover:text-white p-1 cursor-pointer" title="Tutup">
              <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-zinc-800">
            <h3 class="text-xs uppercase font-extrabold tracking-wider text-rose-300 font-outfit">Daftar Pemain</h3>
            <span class="text-[9.5px] text-gray-400 font-medium">Status & Giliran</span>
          </div>
          <div id="playersListContainer" class="space-y-1.5"></div>

          <!-- Jail Actions (Aktif jika pemain sedang di penjara) -->
          <div id="jailActions" class="hidden pt-2 border-t border-zinc-800 space-y-1 mt-2">
            <div class="text-[10px] text-red-400 font-semibold text-center flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <span>Anda Ditahan di Penjara</span>
            </div>
            <button id="btnPayJailFine" class="w-full py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 text-xs font-bold transition cursor-pointer font-outfit">
              Bayar Denda Rp 1.500.000
            </button>
            <button id="btnUseJailCard" class="hidden w-full py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-200 text-xs font-bold transition cursor-pointer font-outfit">
              Gunakan Kartu Bebas Penjara
            </button>
          </div>
        </div>

        <!-- 2. Obrolan Pemain & Reaksi Emoticon -->
        <div id="playerChatCard" class="mobile-panel-section bg-zinc-900/90 border border-zinc-800 rounded-2xl p-2.5 sm:p-3 shadow-xl flex flex-col flex-1 min-h-0 gap-2">
          <!-- Mobile Drag Handle Bar & Close Button (Shown only on Mobile Drawer) -->
          <div class="mobile-drawer-header lg:hidden flex items-center justify-between pb-1 mb-1 border-b border-rose-500/20">
            <div class="w-8 h-1 bg-zinc-600 rounded-full mx-auto"></div>
            <button type="button" class="btn-close-mobile-drawer text-zinc-400 hover:text-white p-1 cursor-pointer" title="Tutup">
              <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Header -->
          <div class="flex items-center justify-between pb-1.5 border-b border-zinc-800 shrink-0">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 fill-current text-rose-400" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
              </svg>
              <h3 class="text-xs uppercase font-extrabold tracking-wider text-rose-300 font-outfit">Obrolan Pemain</h3>
            </div>
            <span class="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>

          <!-- Quick Reaction Emoticon Bar -->
          <div class="shrink-0">
            <div class="text-[8.5px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Reaksi Cepat</span>
              <span class="text-[8px] text-rose-400/80 lowercase">klik di papan</span>
            </div>
            <div id="quickEmoteBar" class="grid grid-cols-5 gap-1 bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-1 overflow-hidden">
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
          <div id="chatMessagesList" class="flex-1 min-h-[50px] overflow-y-auto overflow-x-hidden space-y-1.5 pr-1 text-xs custom-chat-scroll flex flex-col justify-start">
            <div class="text-[9.5px] text-zinc-500 text-center py-2 italic">
              Ketik pesan di bawah untuk mengobrol dengan sesama pemain.
            </div>
          </div>

          <!-- Chat Input Form -->
          <form id="chatInputForm" class="flex items-center gap-1.5 pt-1.5 border-t border-zinc-800/80 shrink-0 mt-auto">
            <input 
              type="text" 
              id="inputChatMessage" 
              placeholder="Ketik pesan..." 
              maxlength="80" 
              autocomplete="off"
              class="flex-1 bg-zinc-950 border border-zinc-700/80 rounded-xl px-2.5 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition"
            />
            <button 
              type="submit" 
              id="btnSendChatMessage" 
              class="p-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold transition flex items-center justify-center shadow cursor-pointer active:scale-95 shrink-0"
              title="Kirim Pesan"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      </aside>

      <!-- Center Column: The Monopoly Board -->
      <section class="flex flex-col items-center justify-center order-1 lg:order-2 shrink-0 min-w-0 min-h-0 w-full lg:w-auto">
        <!-- Mobile Top Player Strip (Visible on mobile < 1024px only) -->
        <div id="mobileTopPlayerStrip" class="w-full max-w-[440px] mb-1 px-1 lg:hidden flex items-center justify-between gap-1"></div>

        <div id="monopolyBoard" class="monopoly-board"></div>

        <!-- Mobile Bottom Quick Bar (Visible on mobile < 1024px only) -->
        <div id="mobileBottomEventTicker" class="w-full max-w-[440px] mt-1 px-1 lg:hidden flex items-center gap-1.5"></div>
      </section>

      <!-- Right Column: Asset Portfolio & Sleek Trading Hub -->
      <aside id="asideRight" class="w-full lg:w-72 2xl:w-80 shrink-0 flex flex-col gap-2 lg:gap-2.5 order-3 min-h-0">
        <!-- Aset & Properti Card (Spacious, full height) -->
        <div id="portfolioCard" class="mobile-panel-section bg-zinc-900/90 border border-zinc-800 rounded-2xl p-2.5 sm:p-3 shadow-xl flex flex-col flex-1 min-h-0 overflow-hidden">
          <!-- Mobile Drag Handle Bar & Close Button (Shown only on Mobile Drawer) -->
          <div class="mobile-drawer-header lg:hidden flex items-center justify-between pb-1 mb-1 border-b border-rose-500/20">
            <div class="w-8 h-1 bg-zinc-600 rounded-full mx-auto"></div>
            <button type="button" class="btn-close-mobile-drawer text-zinc-400 hover:text-white p-1 cursor-pointer" title="Tutup">
              <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Card Header -->
          <div class="flex items-center justify-between pb-1.5 border-b border-zinc-800 mb-1.5 shrink-0">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 fill-current text-rose-400" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
              </svg>
              <h3 class="text-xs uppercase font-extrabold tracking-wider text-rose-300 font-outfit">Aset & Properti</h3>
            </div>
            <span id="portfolioStatsBadge" class="text-[9px] text-rose-300 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-500/40 font-bold whitespace-nowrap shrink-0">0 Properti</span>
          </div>

          <!-- Filter Pemain / Tabs Switcher -->
          <div id="portfolioPlayerTabs" class="flex items-center gap-1 overflow-x-auto pb-1 mb-1.5 scrollbar-none text-[10px] shrink-0">
            <!-- Populated by JavaScript -->
          </div>

          <!-- Cards Grid Container with Smooth Scrollbar -->
          <div id="portfolioList" class="flex-1 min-h-0 overflow-y-auto pr-1 text-xs grid grid-cols-2 gap-2 content-start custom-portfolio-scroll">
            <p class="text-gray-500 text-center py-4 col-span-2 text-[10px]">Belum ada properti yang dibeli.</p>
          </div>
          <div id="portfolioScrollHint" class="hidden text-center text-[9px] text-rose-400/90 pt-1 border-t border-zinc-800/80 font-medium shrink-0 flex items-center justify-center gap-1">
            <span class="animate-bounce">↓</span> <span id="portfolioScrollHintText">Gulir untuk melihat properti lainnya</span>
          </div>

          <!-- Sleek Compact Trading Hub at bottom of card -->
          <div id="tradingCard" class="mt-2 pt-2 border-t border-zinc-800/80 shrink-0 flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1 text-[10.5px] font-extrabold text-rose-300 font-outfit">
                <span>🤝</span>
                <span>Trading Aset</span>
              </div>
              <div id="tradingPartnersStatus" class="flex items-center gap-1 text-[9.5px]">
                <!-- Opponent quick chips populated by JS -->
              </div>
            </div>
            <button id="btnOpenTradingDesk" class="w-full py-2 rounded-xl btn-menu-orange text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer font-outfit shadow-md active:scale-95">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
              </svg>
              <span>Buka Meja Trading</span>
            </button>
          </div>
        </div>
      </aside>
    </div>

    <!-- Mobile Bottom Navigation Bar (Khusus Smartphone Layout < 1024px) -->
    <nav id="mobileBottomNav" class="flex lg:hidden items-center justify-around">
      <button type="button" class="mobile-tab-btn flex-1 py-1 px-1 rounded-xl text-xs font-bold font-outfit flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 transition text-rose-200" data-target="playerInfoCard">
        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span class="text-[9px] tracking-wider uppercase font-extrabold">Pemain</span>
      </button>

      <button type="button" class="mobile-tab-btn flex-1 py-1 px-1 rounded-xl text-xs font-bold font-outfit flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 transition text-rose-200 relative" data-target="portfolioCard">
        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
        </svg>
        <span class="text-[9px] tracking-wider uppercase font-extrabold">Aset</span>
        <span id="mobilePortfolioBadge" class="hidden absolute top-0.5 right-3.5 bg-rose-600 text-white text-[7.5px] font-black px-1 rounded-full border border-white/40 shadow-sm">0</span>
      </button>

      <button type="button" id="btnMobileBottomTrade" class="mobile-tab-btn flex-1 py-1 px-1 rounded-xl text-xs font-bold font-outfit flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 transition text-rose-200 relative">
        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
        </svg>
        <span class="text-[9px] tracking-wider uppercase font-extrabold">Trading</span>
        <span id="mobileTradeBadge" class="hidden absolute top-0.5 right-3.5 bg-amber-500 text-black text-[7.5px] font-black px-1 rounded-full border border-amber-300 shadow-sm animate-pulse">!</span>
      </button>

      <button type="button" class="mobile-tab-btn flex-1 py-1 px-1 rounded-xl text-xs font-bold font-outfit flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 transition text-rose-200 relative" data-target="playerChatCard">
        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
        <span class="text-[9px] tracking-wider uppercase font-extrabold">Obrolan</span>
        <span id="mobileChatBadge" class="hidden absolute top-0.5 right-3.5 bg-rose-500 text-white text-[7.5px] font-black px-1 rounded-full border border-white/40 shadow-sm">0</span>
      </button>
    </nav>
  </section>

  <!-- Modal Container Overlay -->
  <div id="modalContainer" class="hidden"></div>

  <!-- Rules Guide Modal -->
  <div id="rulesModal" class="hidden fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div class="bg-[#190407] border-2 border-red-500/60 rounded-3xl max-w-lg w-full shadow-2xl p-6 text-white max-h-[85vh] overflow-y-auto font-sans">
      <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 fill-current text-red-400" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <h2 class="font-black text-lg text-rose-200 font-outfit">Panduan Aturan Permainan Monopoli</h2>
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
          <h4 class="font-bold text-rose-300 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/></svg>
            <span>Dadu & Angka Kembar</span>
          </h4>
          <ul class="list-disc list-inside space-y-1 pl-1">
            <li>Jika melempar angka kembar (misal 4-4), Anda berhak jalan lagi setelah giliran selesai.</li>
            <li>Jika melempar angka kembar <b>3 kali berturut-turut</b> dalam 1 giliran, Anda langsung dijebloskan ke <b>Penjara</b>!</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-rose-300 text-sm mb-1 font-outfit flex items-center gap-1.5">
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
          <h4 class="font-bold text-rose-300 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Aturan Penjara</span>
          </h4>
          <p>Keluar dari penjara dengan 3 cara: melempar dadu kembar, membayar denda Rp 1.500.000, atau menggunakan Kartu Bebas Penjara.</p>
        </div>

        <div>
          <h4 class="font-bold text-rose-300 text-sm mb-1 font-outfit flex items-center gap-1.5">
            <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4"/><path d="M12 6v12"/></svg>
            <span>Melewati Petak Mulai (GO)</span>
          </h4>
          <p>Hanya saat <b>benar-benar melintas/melewati</b> petak Mulai, Bank memberikan uang tunai <b>Rp 2.000.000</b>. Jika berhenti tepat di Mulai, pemain tidak mendapatkan uang.</p>
        </div>
      </div>

      <button id="btnConfirmRules" class="w-full py-2.5 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer font-outfit text-white">
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
    window.CHANCE_CARDS = <?= json_encode(\App\Data\CardsData::CHANCE_CARDS, JSON_UNESCAPED_UNICODE) ?>;
    window.COMMUNITY_CHEST_CARDS = <?= json_encode(\App\Data\CardsData::COMMUNITY_CHEST_CARDS, JSON_UNESCAPED_UNICODE) ?>;
  </script>
  <script src="./assets/js/game.js?v=<?= time() ?>"></script>
</body>
</html>
