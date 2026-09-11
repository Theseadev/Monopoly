<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Banjar - Monopoly Nusantara</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#fffbeb',
              100: '#fef3c7',
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
              700: '#b45309'
            }
          },
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace']
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <style>
    body {
      background-color: #09090b;
      color: #f4f4f5;
    }
    .glass-card {
      background: rgba(24, 24, 27, 0.75);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(63, 63, 70, 0.45);
    }
    .custom-scroll::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 4px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: rgba(113, 113, 122, 0.5);
      border-radius: 4px;
    }
    .custom-scroll::-webkit-scrollbar-thumb:hover {
      background: rgba(245, 158, 11, 0.7);
    }
  </style>
</head>
<body class="min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">

<?php if (empty($isLoggedIn)): ?>
  <!-- ============================================== -->
  <!-- LOGIN GATE (JIKA BELUM LOGIN) -->
  <!-- ============================================== -->
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
    <div class="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800 space-y-6 relative overflow-hidden">
      
      <!-- Ambient Glow Decor -->
      <div class="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-16 -left-16 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Header / Logo -->
      <div class="text-center space-y-2">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-2xl font-black text-black shadow-lg shadow-amber-500/25">
          👑
        </div>
        <h1 class="text-xl font-extrabold text-white tracking-tight">Panel Admin Banjar</h1>
        <p class="text-xs text-zinc-400">Silakan masukkan akun admin Anda untuk mengelola ruangan multiplayer & versi GitHub.</p>
      </div>

      <!-- Database Status Badge -->
      <div class="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-[11px]">
        <span class="text-zinc-400">Database MySQL:</span>
        <span class="flex items-center gap-1.5 font-semibold <?= !empty($dbConnected) ? 'text-emerald-400' : 'text-amber-400' ?>">
          <span class="w-2 h-2 rounded-full <?= !empty($dbConnected) ? 'bg-emerald-500' : 'bg-amber-500' ?> animate-pulse"></span>
          <?= !empty($dbConnected) ? 'Terhubung (InfinityFree)' : 'Fallback Mode (Ready)' ?>
        </span>
      </div>

      <!-- Login Form -->
      <form id="adminLoginForm" onsubmit="handleAdminLogin(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-zinc-300 mb-1.5 uppercase tracking-wider">Username</label>
          <div class="relative">
            <input type="text" id="loginUsername" required autocomplete="username" placeholder="Masukkan username" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-zinc-300 mb-1.5 uppercase tracking-wider">Password</label>
          <div class="relative">
            <input type="password" id="loginPassword" required autocomplete="current-password" placeholder="Masukkan password" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition" />
          </div>
        </div>

        <div id="loginErrorMessage" class="hidden p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-semibold"></div>

        <button type="submit" id="btnLoginSubmit" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-[0.98]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
          <span>Masuk ke Panel Admin</span>
        </button>
      </form>

      <div class="text-center pt-2">
        <a href="/" class="text-xs text-zinc-500 hover:text-amber-400 transition inline-flex items-center gap-1">
          <span>&larr;</span>
          <span>Kembali ke Halaman Permainan</span>
        </a>
      </div>

    </div>
  </div>

  <script>
    async function handleAdminLogin(e) {
      e.preventDefault();
      const username = document.getElementById('loginUsername')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;
      const errorBox = document.getElementById('loginErrorMessage');
      const submitBtn = document.getElementById('btnLoginSubmit');

      if (!username || !password) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Memverifikasi...</span>';
      if (errorBox) errorBox.classList.add('hidden');

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (data && data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Login Berhasil!',
            text: data.message,
            timer: 1200,
            showConfirmButton: false
          }).then(() => {
            window.location.reload();
          });
        } else {
          if (errorBox) {
            errorBox.textContent = data?.message || 'Username atau Password salah!';
            errorBox.classList.remove('hidden');
          }
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Masuk ke Panel Admin</span>';
        }
      } catch (err) {
        if (errorBox) {
          errorBox.textContent = 'Koneksi gagal: ' + err.message;
          errorBox.classList.remove('hidden');
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Masuk ke Panel Admin</span>';
      }
    }
  </script>

<?php else: ?>

  <!-- ============================================== -->
  <!-- DASHBOARD ADMIN (JIKA SUDAH LOGIN) -->
  <!-- ============================================== -->

  <!-- Header Panel -->
  <header class="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3.5">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold text-xl shadow-lg shadow-amber-500/20">
          👑
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-base lg:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              Panel Admin Banjar
              <span class="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                <?= htmlspecialchars($adminUser ?? 'Fahrul') ?>
              </span>
            </h1>
          </div>
          <p class="text-[11px] text-zinc-400">Monopoly Nusantara Management & Version Control</p>
        </div>
      </div>

      <div class="flex items-center gap-2.5">
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Server: <b id="clockDisplay" class="font-mono text-amber-400">--:--:--</b></span>
        </div>

        <a href="/" target="_blank" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition">
          <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          <span class="hidden sm:inline">Game</span>
        </a>

        <button onclick="handleAdminLogout()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span>Keluar</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Navigation Tabs -->
  <div class="bg-zinc-900/60 border-b border-zinc-800/60 px-4 lg:px-8">
    <div class="max-w-7xl mx-auto flex gap-2 sm:gap-4 overflow-x-auto py-2">
      <button onclick="switchTab('rooms')" id="tabBtn-rooms" class="tab-btn active px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition bg-amber-500 text-black shadow-md shadow-amber-500/20">
        <span>🎮</span>
        <span>Ruangan Multiplayer Aktif</span>
        <span id="tabBadgeRooms" class="px-1.5 py-0.2 rounded-full bg-black/30 text-[11px] font-extrabold text-black">
          <?= (int)($roomsData['stats']['total'] ?? 0) ?>
        </span>
      </button>

      <button onclick="switchTab('git')" id="tabBtn-git" class="tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50">
        <span>🐙</span>
        <span>Pembaruan GitHub (Git Pull)</span>
        <span id="gitStatusDot" class="w-2 h-2 rounded-full bg-emerald-400"></span>
      </button>

      <button onclick="switchTab('system')" id="tabBtn-system" class="tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50">
        <span>⚙️</span>
        <span>Database & Server</span>
      </button>
    </div>
  </div>

  <!-- Main Content Body -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">

    <!-- ============================================== -->
    <!-- TAB 1: RUANGAN MULTIPLAYER AKTIF -->
    <!-- ============================================== -->
    <section id="tabContent-rooms" class="tab-pane space-y-6">
      
      <!-- Metrics Overview Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div class="glass-card p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Ruangan</div>
            <div id="statTotalRooms" class="text-2xl lg:text-3xl font-extrabold text-white mt-0.5"><?= $roomsData['stats']['total'] ?></div>
            <div class="text-[10px] text-zinc-500 mt-1">Tersimpan di storage</div>
          </div>
          <div class="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl text-blue-400">
            🏢
          </div>
        </div>

        <div class="glass-card p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Sedang Bermain</div>
            <div id="statPlayingRooms" class="text-2xl lg:text-3xl font-extrabold text-emerald-400 mt-0.5"><?= $roomsData['stats']['playing'] ?></div>
            <div class="text-[10px] text-zinc-500 mt-1">In-Game Active</div>
          </div>
          <div class="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl text-emerald-400">
            🎲
          </div>
        </div>

        <div class="glass-card p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div class="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Menunggu Lobby</div>
            <div id="statLobbyRooms" class="text-2xl lg:text-3xl font-extrabold text-amber-400 mt-0.5"><?= $roomsData['stats']['lobby'] ?></div>
            <div class="text-[10px] text-zinc-500 mt-1">Menunggu pemain</div>
          </div>
          <div class="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl text-amber-400">
            ⏳
          </div>
        </div>

        <div class="glass-card p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div class="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Total Pemain</div>
            <div class="text-2xl lg:text-3xl font-extrabold text-white mt-0.5 flex items-baseline gap-1.5">
              <span id="statTotalHumans" class="text-purple-400"><?= $roomsData['stats']['totalHumans'] ?></span>
              <span class="text-xs text-zinc-500 font-normal">/ <span id="statTotalBots"><?= $roomsData['stats']['totalBots'] ?></span> Bot</span>
            </div>
            <div class="text-[10px] text-zinc-500 mt-1">Human online & Bot AI</div>
          </div>
          <div class="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl text-purple-400">
            👥
          </div>
        </div>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="glass-card p-3.5 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <!-- Search input -->
          <div class="relative flex-1 sm:w-64">
            <input type="text" id="roomSearchInput" oninput="applyRoomFilters()" placeholder="Cari Kode Room / Host..." class="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500" />
            <svg class="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          <!-- Status Filter -->
          <select id="roomStatusFilter" onchange="applyRoomFilters()" class="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500">
            <option value="ALL">Semua Status</option>
            <option value="PLAYING">Sedang Main (Playing)</option>
            <option value="LOBBY">Lobby (Menunggu)</option>
            <option value="FINISHED">Selesai (Finished)</option>
          </select>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <!-- Auto Refresh Interval -->
          <div class="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-xl text-xs text-zinc-400">
            <span>Auto:</span>
            <select id="autoRefreshSelect" onchange="setupAutoRefresh()" class="bg-transparent text-amber-400 font-bold focus:outline-none">
              <option value="5">5s</option>
              <option value="10" selected>10s</option>
              <option value="30">30s</option>
              <option value="0">Mati</option>
            </select>
            <span id="refreshTimerCountdown" class="w-2 h-2 rounded-full bg-amber-400"></span>
          </div>

          <!-- Manual Refresh Button -->
          <button onclick="fetchRooms(true)" id="btnRefreshRooms" class="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition" title="Refresh Sekarang">
            <svg id="refreshIconSvg" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </button>

          <!-- Cleanup Stale Rooms -->
          <button onclick="cleanupStaleRooms()" class="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition flex items-center gap-1.5" title="Hapus room idle > 12 jam">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            <span class="hidden sm:inline">Bersihkan Stale</span>
          </button>
        </div>
      </div>

      <!-- Rooms Grid List -->
      <div id="roomsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Rendered via JavaScript -->
        <div class="col-span-full py-12 text-center text-zinc-500 text-sm italic">
          Memuat data ruangan aktif...
        </div>
      </div>

    </section>

    <!-- ============================================== -->
    <!-- TAB 2: PEMBARUAN GITHUB (GIT PULL & SYNC) -->
    <!-- ============================================== -->
    <section id="tabContent-git" class="tab-pane hidden space-y-6">
      
      <!-- Git Info & Status Card -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="glass-card p-5 rounded-2xl space-y-4 lg:col-span-1">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold text-white flex items-center gap-2">
              <span class="text-lg">🐙</span>
              Repository Status
            </h2>
            <button onclick="fetchGitStatus()" class="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition" title="Refresh Git Status">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
              <div class="text-zinc-500 text-[10px] uppercase font-semibold">Remote Origin URL</div>
              <div id="gitRemoteUrl" class="font-mono text-zinc-200 break-all text-[11px] mt-0.5">Memuat...</div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                <div class="text-zinc-500 text-[10px] uppercase font-semibold">Branch Aktif</div>
                <div id="gitCurrentBranch" class="font-mono text-amber-400 font-bold mt-0.5">--</div>
              </div>
              <div class="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                <div class="text-zinc-500 text-[10px] uppercase font-semibold">Working Tree</div>
                <div id="gitWorkingTree" class="font-semibold text-emerald-400 mt-0.5">Clean</div>
              </div>
            </div>

            <div class="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
              <div class="text-zinc-500 text-[10px] uppercase font-semibold">Commit Terakhir</div>
              <div id="gitLastCommit" class="font-mono text-zinc-300 text-[11px] mt-0.5">Memuat...</div>
            </div>
          </div>

          <div class="pt-2 flex flex-col gap-2.5">
            <!-- Tombol 1: Upgrade Website -->
            <button onclick="executeGitPull()" id="btnGitPull" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-[0.98]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Upgrade Website</span>
            </button>

            <!-- Tombol 2: Cek Pembaruan -->
            <button onclick="executeGitFetch()" id="btnGitFetch" class="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2 border border-zinc-700 transition active:scale-[0.98]">
              <svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>
              <span>Cek Pembaruan</span>
            </button>
          </div>
        </div>

        <!-- Terminal Console View -->
        <div class="glass-card rounded-2xl flex flex-col overflow-hidden lg:col-span-2 border border-zinc-800">
          <div class="bg-zinc-950 px-4 py-2.5 border-b border-zinc-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
              </div>
              <span class="text-[11px] font-mono text-zinc-400 ml-2">admin@monopoly-server:~/Monopoly$</span>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="clearConsoleLog()" class="text-[11px] text-zinc-400 hover:text-zinc-200 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 transition">
                Bersihkan
              </button>
              <button onclick="copyConsoleLog()" class="text-[11px] text-amber-400 hover:text-amber-300 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 transition">
                Salin Log
              </button>
            </div>
          </div>

          <div id="gitConsoleLogs" class="p-4 bg-[#090d16] font-mono text-[11.5px] leading-relaxed text-zinc-300 h-80 lg:h-96 overflow-y-auto custom-scroll space-y-1">
            <div class="text-zinc-500">[System] Siap mengeksekusi perintah. Klik "Cek Pembaruan" untuk memeriksa update atau "Upgrade Website" untuk menerapkan versi terbaru dari GitHub.</div>
          </div>
        </div>
      </div>

    </section>

    <!-- ============================================== -->
    <!-- TAB 3: INFORMASI SISTEM & DATABASE -->
    <!-- ============================================== -->
    <section id="tabContent-system" class="tab-pane hidden space-y-6">
      
      <!-- Database Connection Status Card -->
      <div class="glass-card p-6 rounded-2xl space-y-4 border border-zinc-800">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              <span>🗄️</span>
              Koneksi Database MySQL (InfinityFree)
            </h2>
            <p class="text-xs text-zinc-400 mt-0.5">Konfigurasi database MySQL online untuk Monopoly Nusantara.</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold border <?= !empty($dbConnected) ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30' ?>">
            <?= !empty($dbConnected) ? '🟢 Terhubung Online' : '🟡 Standby / Local Mode' ?>
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div class="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <div class="text-[10px] text-zinc-500 uppercase font-semibold">MySQL Host</div>
            <div class="font-mono text-zinc-200 mt-0.5">sql107.infinityfree.com</div>
          </div>
          <div class="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <div class="text-[10px] text-zinc-500 uppercase font-semibold">Database Name</div>
            <div class="font-mono text-amber-400 font-bold mt-0.5">if0_39237979_monopoli</div>
          </div>
          <div class="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <div class="text-[10px] text-zinc-500 uppercase font-semibold">MySQL User</div>
            <div class="font-mono text-zinc-200 mt-0.5">if0_39237979</div>
          </div>
          <div class="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <div class="text-[10px] text-zinc-500 uppercase font-semibold">Berkas Skema SQL</div>
            <div class="font-mono text-emerald-400 font-bold mt-0.5">database.sql</div>
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 space-y-1">
          <div class="font-bold text-amber-400 flex items-center gap-1.5">
            <span>💡</span>
            <span>Petunjuk Import ke InfinityFree (phpMyAdmin):</span>
          </div>
          <p class="text-zinc-400 leading-relaxed text-[11.5px]">
            Buka cPanel InfinityFree &rarr; Klik <b>phpMyAdmin</b> pada database <b class="text-zinc-200">if0_39237979_monopoli</b> &rarr; Pilih menu <b>Import</b> &rarr; Upload berkas <b class="text-amber-300 font-mono">database.sql</b> yang sudah disediakan di root folder project. Akun admin <b>Fahrul</b> akan otomatis terdaftar dan aktif.
          </p>
        </div>
      </div>

      <!-- Server Runtime Config -->
      <div class="glass-card p-6 rounded-2xl space-y-4 border border-zinc-800">
        <div>
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span>⚙️</span>
            Runtime & Lingkungan Server
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div class="text-xs text-zinc-500 font-semibold">Versi PHP</div>
            <div class="text-base font-extrabold text-amber-400 mt-1"><?= htmlspecialchars($serverInfo['phpVersion']) ?></div>
            <div class="text-[10px] text-zinc-500 mt-0.5">SAPI: <?= php_sapi_name() ?></div>
          </div>

          <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div class="text-xs text-zinc-500 font-semibold">Sistem Operasi</div>
            <div class="text-base font-extrabold text-white mt-1"><?= htmlspecialchars($serverInfo['os']) ?></div>
            <div class="text-[10px] text-zinc-500 mt-0.5"><?= htmlspecialchars($serverInfo['serverSoftware']) ?></div>
          </div>

          <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div class="text-xs text-zinc-500 font-semibold">Penggunaan Memori PHP</div>
            <div class="text-base font-extrabold text-emerald-400 mt-1"><?= htmlspecialchars($serverInfo['memoryUsage']) ?></div>
            <div class="text-[10px] text-zinc-500 mt-0.5">Limit: <?= ini_get('memory_limit') ?></div>
          </div>

          <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div class="text-xs text-zinc-500 font-semibold">Penyimpanan Room Data</div>
            <div class="text-base font-extrabold text-purple-400 mt-1">
              <?= round(($roomsData['stats']['totalStorageBytes'] ?? 0) / 1024, 2) ?> KB
            </div>
            <div class="text-[10px] text-zinc-500 mt-0.5">Lokasi: storage/rooms/</div>
          </div>

          <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div class="text-xs text-zinc-500 font-semibold">Upload & Post Max</div>
            <div class="text-base font-extrabold text-zinc-300 mt-1">
              <?= htmlspecialchars($serverInfo['uploadMax']) ?> / <?= htmlspecialchars($serverInfo['postMax']) ?>
            </div>
            <div class="text-[10px] text-zinc-500 mt-0.5">Ukuran data maksimal request</div>
          </div>

          <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div class="text-xs text-zinc-500 font-semibold">Waktu Server</div>
            <div class="text-sm font-mono font-bold text-zinc-200 mt-1"><?= htmlspecialchars($serverInfo['serverTime']) ?></div>
            <div class="text-[10px] text-zinc-500 mt-0.5">Timezone: <?= date_default_timezone_get() ?></div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Modal Inspector Data Room (JSON Snapshot) -->
  <div id="roomDetailModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>📋</span>
            <span>Snapshot Data Ruangan:</span>
            <span id="modalRoomCodeTitle" class="text-amber-400 font-mono">NUSAN-XX</span>
          </h3>
          <p class="text-[11px] text-zinc-400">Payload gameState & konfigurasi room JSON</p>
        </div>
        <button onclick="closeRoomModal()" class="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="p-4 flex-1 overflow-y-auto custom-scroll bg-[#0b0f19]">
        <pre id="modalJsonContent" class="text-[11.5px] font-mono text-emerald-300 leading-relaxed break-all whitespace-pre-wrap"></pre>
      </div>

      <div class="px-5 py-3 border-t border-zinc-800 flex justify-end gap-2 bg-zinc-950">
        <button onclick="copyModalJson()" class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition">
          Salin JSON
        </button>
        <button onclick="closeRoomModal()" class="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-bold text-black transition">
          Tutup
        </button>
      </div>
    </div>
  </div>

  <!-- JavaScript Admin Logic -->
  <script>
    let currentRoomsData = <?= json_encode($roomsData['rooms'] ?? []) ?>;
    let autoRefreshTimer = null;
    let countdownSec = 10;
    let currentModalJson = '';

    // Handle Admin Logout
    function handleAdminLogout() {
      Swal.fire({
        title: 'Keluar dari Admin?',
        text: 'Sesi admin Anda akan diakhiri.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#27272a',
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await fetch('/api/admin/logout', { method: 'POST' });
          } catch (e) {}
          window.location.href = '/adminbanjar';
        }
      });
    }

    // Tab Switching Logic
    function switchTab(tabId) {
      document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-black', 'shadow-md', 'shadow-amber-500/20');
        btn.classList.add('bg-zinc-800/80', 'text-zinc-300', 'border', 'border-zinc-700/50');
      });

      const activePane = document.getElementById('tabContent-' + tabId);
      const activeBtn = document.getElementById('tabBtn-' + tabId);

      if (activePane) activePane.classList.remove('hidden');
      if (activeBtn) {
        activeBtn.classList.remove('bg-zinc-800/80', 'text-zinc-300', 'border', 'border-zinc-700/50');
        activeBtn.classList.add('bg-amber-500', 'text-black', 'shadow-md', 'shadow-amber-500/20');
      }

      if (tabId === 'git') {
        fetchGitStatus();
      }
    }

    // Format Rupiah
    function formatRupiah(amount) {
      return 'Rp ' + Number(amount || 0).toLocaleString('id-ID');
    }

    // Relative Time Helper
    function timeAgo(timestamp) {
      const diff = Math.floor(Date.now() / 1000 - timestamp);
      if (diff < 10) return 'Baru saja';
      if (diff < 60) return diff + ' detik lalu';
      if (diff < 3600) return Math.floor(diff / 60) + ' menit lalu';
      if (diff < 86400) return Math.floor(diff / 3600) + ' jam lalu';
      return Math.floor(diff / 86400) + ' hari lalu';
    }

    // Fetch and Render Rooms
    async function fetchRooms(isManual = false) {
      const refreshIcon = document.getElementById('refreshIconSvg');
      if (refreshIcon) refreshIcon.classList.add('animate-spin');

      try {
        const res = await fetch('/api/admin/rooms');
        const data = await res.json();
        if (data && data.success) {
          currentRoomsData = data.rooms;
          updateMetrics(data.stats);
          renderRoomsList(currentRoomsData);
        } else if (data && data.unauthorized) {
          window.location.reload();
        }
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        if (refreshIcon) {
          setTimeout(() => refreshIcon.classList.remove('animate-spin'), 400);
        }
      }
    }

    function updateMetrics(stats) {
      if (!stats) return;
      document.getElementById('statTotalRooms').textContent = stats.total || 0;
      document.getElementById('statPlayingRooms').textContent = stats.playing || 0;
      document.getElementById('statLobbyRooms').textContent = stats.lobby || 0;
      document.getElementById('statTotalHumans').textContent = stats.totalHumans || 0;
      document.getElementById('statTotalBots').textContent = stats.totalBots || 0;
      document.getElementById('tabBadgeRooms').textContent = stats.total || 0;
    }

    function applyRoomFilters() {
      const query = (document.getElementById('roomSearchInput')?.value || '').toLowerCase().trim();
      const statusFilter = document.getElementById('roomStatusFilter')?.value || 'ALL';

      const filtered = currentRoomsData.filter(r => {
        const matchesQuery = !query || r.code.toLowerCase().includes(query) || (r.host || '').toLowerCase().includes(query);
        const matchesStatus = (statusFilter === 'ALL') || (r.status === statusFilter);
        return matchesQuery && matchesStatus;
      });

      renderRoomsList(filtered);
    }

    function renderRoomsList(rooms) {
      const container = document.getElementById('roomsContainer');
      if (!container) return;

      if (!rooms || rooms.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-16 text-center glass-card rounded-2xl border border-zinc-800">
            <div class="text-3xl mb-2">📭</div>
            <div class="text-sm font-bold text-zinc-300">Tidak ada ruangan aktif</div>
            <div class="text-xs text-zinc-500 mt-1">Belum ada player yang membuat ruangan multiplayer atau filter tidak cocok.</div>
          </div>
        `;
        return;
      }

      container.innerHTML = rooms.map(r => {
        let statusBadgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        let statusLabel = '⏳ Lobby';

        if (r.status === 'PLAYING') {
          statusBadgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 animate-pulse';
          statusLabel = '🎲 Sedang Main';
        } else if (r.status === 'FINISHED') {
          statusBadgeClass = 'bg-purple-500/10 text-purple-400 border-purple-500/30';
          statusLabel = '🏆 Selesai';
        }

        return `
          <div class="glass-card rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition flex flex-col justify-between">
            
            <!-- Room Header -->
            <div class="p-4 border-b border-zinc-800/60 bg-zinc-950/40">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-base font-extrabold font-mono text-white tracking-wide">${r.code}</span>
                    <span class="text-[10.5px] px-2 py-0.5 rounded-full font-bold border ${statusBadgeClass}">
                      ${statusLabel}
                    </span>
                  </div>
                  <div class="text-xs text-zinc-400 mt-1">
                    Host: <b class="text-zinc-200">${escapeHtml(r.host)}</b>
                  </div>
                </div>

                <div class="text-right">
                  <div class="text-xs font-bold text-zinc-300">
                    ${r.playerCount} / ${r.maxPlayers} <span class="text-[10px] text-zinc-500 font-normal">Pemain</span>
                  </div>
                  <div class="text-[10px] text-zinc-500 mt-0.5" title="Aktivitas Terakhir">
                    ${timeAgo(r.lastActivity)}
                  </div>
                </div>
              </div>
            </div>

            <!-- Players List -->
            <div class="p-4 space-y-2 flex-1">
              <div class="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Daftar Pemain</span>
                <span class="text-[10px] text-zinc-500">${r.humanCount} Human | ${r.botCount} Bot</span>
              </div>

              <div class="space-y-1.5">
                ${(r.players || []).map(p => `
                  <div class="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-xs">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: ${p.color || '#3b82f6'};"></span>
                      <span class="font-bold truncate text-zinc-200">${escapeHtml(p.name)}</span>
                      ${p.isHost ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">Host</span>' : ''}
                      ${p.isAI ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold">AI</span>' : ''}
                      ${p.isBankrupt ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-bold">Kalah</span>' : ''}
                    </div>

                    <div class="text-right flex-shrink-0 font-mono text-[11px]">
                      <div class="text-amber-400 font-semibold">${formatRupiah(p.money)}</div>
                      ${p.propertiesCount > 0 ? `<div class="text-[9.5px] text-zinc-500">${p.propertiesCount} aset</div>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>

              ${r.currentTurnPlayer ? `
                <div class="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>Giliran Aktif: <b>${escapeHtml(r.currentTurnPlayer)}</b></span>
                </div>
              ` : ''}

              ${r.winner ? `
                <div class="mt-2.5 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300 flex items-center gap-1.5">
                  <span>👑</span>
                  <span>Pemenang: <b>${escapeHtml(r.winner)}</b></span>
                </div>
              ` : ''}
            </div>

            <!-- Actions Footer -->
            <div class="p-3 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-between gap-2">
              <button onclick="inspectRoom('${r.code}')" class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition flex items-center gap-1">
                <span>📋</span>
                <span>Detail Data</span>
              </button>

              <button onclick="confirmDeleteRoom('${r.code}')" class="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition flex items-center gap-1">
                <span>🗑️</span>
                <span>Bubarkan</span>
              </button>
            </div>

          </div>
        `;
      }).join('');
    }

    // Inspect Room Modal
    async function inspectRoom(code) {
      try {
        const res = await fetch(`/api/admin/room/${code}`);
        const data = await res.json();
        if (data && data.success) {
          document.getElementById('modalRoomCodeTitle').textContent = code;
          currentModalJson = JSON.stringify(data.room, null, 2);
          document.getElementById('modalJsonContent').textContent = currentModalJson;
          document.getElementById('roomDetailModal').classList.remove('hidden');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: data?.message || 'Gagal memuat snapshot room.'
          });
        }
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      }
    }

    function closeRoomModal() {
      document.getElementById('roomDetailModal').classList.add('hidden');
    }

    function copyModalJson() {
      if (!currentModalJson) return;
      navigator.clipboard.writeText(currentModalJson).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Tersalin!',
          text: 'Data JSON ruangan berhasil disalin ke clipboard.',
          timer: 1500,
          showConfirmButton: false
        });
      });
    }

    // Delete Room
    function confirmDeleteRoom(code) {
      Swal.fire({
        title: `Bubarkan Ruangan ${code}?`,
        text: 'Ruangan ini akan langsung dihapus dari server dan sesi pemain akan dihentikan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#27272a',
        confirmButtonText: 'Ya, Bubarkan!',
        cancelButtonText: 'Batal'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch(`/api/admin/room/${code}/delete`, { method: 'POST' });
            const data = await res.json();
            if (data && data.success) {
              Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: data.message,
                timer: 1500,
                showConfirmButton: false
              });
              fetchRooms();
            } else {
              Swal.fire({ icon: 'error', title: 'Gagal', text: data?.message });
            }
          } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: err.message });
          }
        }
      });
    }

    // Cleanup Stale Rooms
    function cleanupStaleRooms() {
      Swal.fire({
        title: 'Bersihkan Ruangan Stale?',
        text: 'Seluruh ruangan yang idle/tidak ada aktivitas lebih dari 12 jam akan dihapus.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#f59e0b',
        cancelButtonColor: '#27272a',
        confirmButtonText: 'Bersihkan Sekarang',
        cancelButtonText: 'Batal'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch('/api/admin/rooms/cleanup', { method: 'POST' });
            const data = await res.json();
            Swal.fire({
              icon: data?.success ? 'success' : 'error',
              title: data?.success ? 'Selesai' : 'Gagal',
              text: data?.message
            });
            fetchRooms();
          } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: err.message });
          }
        }
      });
    }

    // ==============================================
    // GIT & GITHUB OPERATIONS
    // ==============================================

    function appendConsoleLog(text, type = 'info') {
      const consoleBox = document.getElementById('gitConsoleLogs');
      if (!consoleBox) return;

      const line = document.createElement('div');
      const time = new Date().toLocaleTimeString('id-ID');

      if (type === 'cmd') {
        line.className = 'text-amber-400 font-bold';
        line.innerHTML = `<span class="text-zinc-500">[${time}]</span> $ ${escapeHtml(text)}`;
      } else if (type === 'success') {
        line.className = 'text-emerald-400 font-semibold';
        line.innerHTML = `<span class="text-zinc-500">[${time}]</span> [SUCCESS] ${escapeHtml(text)}`;
      } else if (type === 'error') {
        line.className = 'text-red-400 font-semibold';
        line.innerHTML = `<span class="text-zinc-500">[${time}]</span> [ERROR] ${escapeHtml(text)}`;
      } else {
        line.className = 'text-zinc-300';
        line.innerHTML = `<span class="text-zinc-500">[${time}]</span> ${escapeHtml(text)}`;
      }

      consoleBox.appendChild(line);
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }

    function clearConsoleLog() {
      const consoleBox = document.getElementById('gitConsoleLogs');
      if (consoleBox) {
        consoleBox.innerHTML = '<div class="text-zinc-500">[System] Log konsol dibersihkan.</div>';
      }
    }

    function copyConsoleLog() {
      const consoleBox = document.getElementById('gitConsoleLogs');
      if (consoleBox) {
        navigator.clipboard.writeText(consoleBox.innerText).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Log Tersalin!',
            timer: 1200,
            showConfirmButton: false
          });
        });
      }
    }

    async function fetchGitStatus() {
      try {
        const res = await fetch('/api/admin/git/status');
        const data = await res.json();
        if (data && data.success) {
          document.getElementById('gitRemoteUrl').textContent = data.remoteUrl || '-';
          document.getElementById('gitCurrentBranch').textContent = data.branch || 'main';
          document.getElementById('gitLastCommit').textContent = data.lastCommit || '-';

          const isClean = !data.statusShort;
          const statusBadge = document.getElementById('gitWorkingTree');
          if (statusBadge) {
            statusBadge.textContent = isClean ? 'Clean (Siap)' : 'Ada Modifikasi';
            statusBadge.className = isClean ? 'font-semibold text-emerald-400 mt-0.5' : 'font-semibold text-amber-400 mt-0.5';
          }
        }
      } catch (err) {
        console.error('Failed to get git status:', err);
      }
    }

    async function executeGitFetch() {
      const btn = document.getElementById('btnGitFetch');
      btn.disabled = true;
      btn.classList.add('opacity-50');

      appendConsoleLog('git fetch origin', 'cmd');

      try {
        const res = await fetch('/api/admin/git/fetch', { method: 'POST' });
        const data = await res.json();

        if (data && data.success) {
          appendConsoleLog(data.output, 'info');
          if (data.hasUpdates) {
            appendConsoleLog(`Ditemukan pembaruan di GitHub:\n${data.incomingCommits}`, 'success');
          } else {
            appendConsoleLog('Repository lokal sudah sama persis dengan GitHub (Up to date).', 'success');
          }
        } else {
          appendConsoleLog(data?.message || 'Git fetch error.', 'error');
        }
      } catch (err) {
        appendConsoleLog('Network error: ' + err.message, 'error');
      } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-50');
        fetchGitStatus();
      }
    }

    async function executeGitPull() {
      const btn = document.getElementById('btnGitPull');
      btn.disabled = true;
      btn.classList.add('opacity-50');

      appendConsoleLog('git pull origin (menarik pembaruan dari GitHub)...', 'cmd');

      try {
        const res = await fetch('/api/admin/git/pull', { method: 'POST' });
        const data = await res.json();

        if (data && data.success) {
          appendConsoleLog(data.output, 'info');
          appendConsoleLog(`Git pull berhasil dalam ${data.duration}s! Commit sekarang: ${data.lastCommit}`, 'success');
          Swal.fire({
            icon: 'success',
            title: 'Pembaruan Berhasil Ditarik!',
            text: `Source code terbaru dari GitHub berhasil diterapkan (${data.branch}).`,
            timer: 2500
          });
        } else {
          appendConsoleLog(data?.output || data?.message || 'Git pull error.', 'error');
          Swal.fire({
            icon: 'warning',
            title: 'Hasil Git Pull',
            text: data?.output || data?.message || 'Terjadi kendala saat melakukan git pull.'
          });
        }
      } catch (err) {
        appendConsoleLog('Network error: ' + err.message, 'error');
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-50');
        fetchGitStatus();
      }
    }

    async function executeGitCommitPush() {
      const { value: commitMsg } = await Swal.fire({
        title: 'Simpan & Push ke GitHub',
        text: 'Masukkan pesan commit untuk perubahan saat ini:',
        input: 'text',
        inputValue: 'Update Monopoly Nusantara ' + new Date().toLocaleDateString('id-ID'),
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#27272a',
        confirmButtonText: 'Push Sekarang',
        cancelButtonText: 'Batal',
        inputValidator: (value) => {
          if (!value || !value.trim()) {
            return 'Pesan commit tidak boleh kosong!';
          }
        }
      });

      if (!commitMsg) return;

      const btn = document.getElementById('btnGitCommitPush');
      btn.disabled = true;
      btn.classList.add('opacity-50');

      appendConsoleLog(`git commit & push: "${commitMsg}"...`, 'cmd');

      try {
        const res = await fetch('/api/admin/git/commit-push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: commitMsg.trim() })
        });
        const data = await res.json();

        if (data && data.success) {
          appendConsoleLog(data.output, 'info');
          appendConsoleLog(`Push ke GitHub berhasil dalam ${data.duration}s! Commit: ${data.lastCommit}`, 'success');
          Swal.fire({
            icon: 'success',
            title: 'Berhasil di-Push!',
            text: 'Source code lokal berhasil disimpan dan diunggah ke GitHub.',
            timer: 2500
          });
        } else {
          appendConsoleLog(data?.output || data?.message || 'Push error.', 'error');
          Swal.fire({
            icon: data?.success ? 'success' : 'warning',
            title: 'Hasil Commit & Push',
            text: data?.output || data?.message || 'Proses selesai.'
          });
        }
      } catch (err) {
        appendConsoleLog('Network error: ' + err.message, 'error');
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-50');
        fetchGitStatus();
      }
    }

    // Auto Refresh Timer Management
    function setupAutoRefresh() {
      if (autoRefreshTimer) clearInterval(autoRefreshTimer);
      const intervalSec = parseInt(document.getElementById('autoRefreshSelect')?.value || '10');
      if (intervalSec <= 0) {
        document.getElementById('refreshTimerCountdown').style.opacity = '0.3';
        return;
      }

      document.getElementById('refreshTimerCountdown').style.opacity = '1';
      countdownSec = intervalSec;

      autoRefreshTimer = setInterval(() => {
        countdownSec--;
        if (countdownSec <= 0) {
          fetchRooms();
          countdownSec = intervalSec;
        }
      }, 1000);
    }

    // Escape HTML Helper
    function escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Clock Display
    setInterval(() => {
      const now = new Date();
      const clockEl = document.getElementById('clockDisplay');
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString('id-ID');
      }
    }, 1000);

    // Initial Load
    window.addEventListener('DOMContentLoaded', () => {
      renderRoomsList(currentRoomsData);
      setupAutoRefresh();
      fetchGitStatus();
    });
  </script>
<?php endif; ?>

</body>
</html>
