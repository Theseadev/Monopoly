// Kumpulan Kartu Kesempatan (Chance) dan Dana Umum (Community Chest)
// Tema: Satir Isu Sosial & Pemerintahan Indonesia

export const CHANCE_CARDS = [
  {
    id: "c1",
    title: "🔥 Kebakaran Hutan & Kabut Asap",
    description: "Lahan konsesi sawit Anda terbakar misterius saat musim kemarau. Bayar denda pemulihan lingkungan & beli masker Rp 500.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 500000);
      return "Membayar denda kabut asap Rp 500.000.";
    }
  },
  {
    id: "c2",
    title: "🌴 Izin Ekspor Sawit (CPO) Lolos",
    description: "Lobi kuota ekspor minyak sawit mentah disetujui kementerian! Terima royalti ekspor sebesar Rp 1.500.000.",
    action: (player) => {
      player.money += 1500000;
      return "Mendapat royalti ekspor sawit Rp 1.500.000.";
    }
  },
  {
    id: "c3",
    title: "🏛️ Groundbreaking Proyek IKN",
    description: "Dapat proyek pembangunan gedung kementerian di Nusantara! Maju langsung ke Kalimantan Timur (Kaltim). Jika lewat Mulai, ambil Rp 2.000.000.",
    action: (player, state) => {
      state.movePlayerTo(player, 29, true);
    }
  },
  {
    id: "c4",
    title: "📦 Bagi-Bagi Bansos Jelang Pemilu",
    description: "Bansos beras dan sembako cair serentak dari kas negara. Anda kebagian jatah bantuan tunai Rp 800.000.",
    action: (player) => {
      player.money += 800000;
      return "Menerima bansos tunai Rp 800.000.";
    }
  },
  {
    id: "c5",
    title: "🚫 Kominfo Blokir Akses Internet",
    description: "Layanan server Anda terblokir PSE Kominfo karena telat urus perizinan. Bisnis mandek, mundur 3 langkah ke belakang.",
    action: (player, state) => {
      const newPos = (player.position - 3 + 40) % 40;
      state.movePlayerTo(player, newPos, false);
    }
  },
  {
    id: "c6",
    title: "👮 Tertangkap Operasi Tangkap Tangan (OTT) KPK!",
    description: "Ketahuan bagi-bagi kuota proyek fiktif. Langsung dijebloskan ke penjara tanpa melewati Mulai dan tanpa Rp 2.000.000!",
    action: (player, state) => {
      state.sendToJail(player);
    }
  },
  {
    id: "c7",
    title: "👑 Orang Dalam (Ordal) & Privilese",
    description: "Punya kenalan paman pejabat Mahkamah & petinggi pusat! Kebal dari segala jeratan hukum. (Kartu Bebas Penjara).",
    action: (player) => {
      player.getOutOfJailFreeCards += 1;
      return "Menyimpan 1 Kartu Bebas Penjara (Ordal).";
    }
  },
  {
    id: "c8",
    title: "🚧 Proyek Mangkrak & Aspal Retak",
    description: "Kontraktor kabur saat perbaikan fasilitas umum. Perbaiki seluruh bangunan: Bayar Rp 250.000 per rumah dan Rp 1.000.000 per hotel.",
    action: (player, state) => {
      const cost = state.calculateRepairs(player, 250000, 1000000);
      player.money = Math.max(0, player.money - cost);
      return `Membayar biaya perbaikan proyek mangkrak Rp ${cost.toLocaleString('id-ID')}.`;
    }
  },
  {
    id: "c9",
    title: "🛃 Flexing Anak Pejabat Bea Cukai",
    description: "Barang kiriman Anda ditahan dan dikenakan bea masuk 300% gara-gara viral di medsos. Bayar pajak denda Rp 400.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 400000);
      return "Membayar denda bea cukai Rp 400.000.";
    }
  },
  {
    id: "c10",
    title: "🚂 Naik Kereta Cepat Whoosh!",
    description: "Sensasi naik kereta cepat Jakarta-Bandung 350 km/jam! Maju langsung ke Stasiun Bandung. Jika lewat Mulai, ambil Rp 2.000.000.",
    action: (player, state) => {
      state.movePlayerTo(player, 15, true);
    }
  },
  {
    id: "c11",
    title: "🧧 Sumbangan Wajib Ormas Wilayah",
    description: "Didatangi ormas seragam loreng meminta proposal dana pembinaan & THR. Bagi-bagi uang Rp 100.000 ke setiap pemain!",
    action: (player, state) => {
      state.payEachPlayer(player, 100000);
      return "Membayar uang koordinasi ormas Rp 100.000 ke masing-masing pemain.";
    }
  },
  {
    id: "c12",
    title: "🏖️ Kunker Studi Banding ke Pantai Bali",
    description: "Dapat surat tugas kunker pemda ke pulau dewata. Maju langsung ke provinsi Bali. Jika lewat Mulai, ambil Rp 2.000.000.",
    action: (player, state) => {
      state.movePlayerTo(player, 23, true);
    }
  },
  {
    id: "c13",
    title: "📈 Dividen Hilirisasi Tambang Nikel",
    description: "Pabrik smelter nikel dan baterai EV membukukan rekor laba bersih! Ambil dividen investasi Rp 1.000.000.",
    action: (player) => {
      player.money += 1000000;
      return "Mendapat dividen hilirisasi nikel Rp 1.000.000.";
    }
  },
  {
    id: "c14",
    title: "📝 Video Klarifikasi Materai Rp 10.000",
    description: "Bikin gaduh publik, cukup minta maaf di atas kertas bermaterai sepuluh ribu. Bayar biaya admin & humas Rp 150.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 150000);
      return "Membayar biaya materai dan klarifikasi Rp 150.000.";
    }
  },
  {
    id: "c15",
    title: "⚡ Tarif Penyesuaian Listrik PLN Naik",
    description: "Golongan daya listrik rumah dinaikkan sepihak tanpa pemberitahuan. Bayar tagihan membengkak Rp 300.000 ke Bank.",
    action: (player) => {
      player.money = Math.max(0, player.money - 300000);
      return "Membayar tagihan listrik PLN naik Rp 300.000.";
    }
  },
  {
    id: "c16",
    title: "🚀 Pelantikan Pejabat Baru (Maju ke Mulai)",
    description: "Menang tender pengadaan mobil dinas kementerian! Maju langsung ke petak Mulai (Ambil Rp 2.000.000).",
    action: (player, state) => {
      state.movePlayerTo(player, 0, true);
    }
  }
];

export const COMMUNITY_CHEST_CARDS = [
  {
    id: "cc1",
    title: "💳 Sisa Anggaran Pengadaan e-KTP",
    description: "Blanko e-KTP habis lagi di kelurahan, tapi sisa dana anggarannya masuk ke dompet Anda. Ambil Rp 1.500.000.",
    action: (player) => {
      player.money += 1500000;
      return "Mendapat sisa dana anggaran Rp 1.500.000.";
    }
  },
  {
    id: "cc2",
    title: "💸 Tarif PPN Naik Jadi 12%",
    description: "Pemerintah resmi menaikkan tarif pajak pertambahan nilai belanja bulanan. Bayar potongan PPN Rp 300.000 ke Bank.",
    action: (player) => {
      player.money = Math.max(0, player.money - 300000);
      return "Membayar potongan kenaikan PPN Rp 300.000.";
    }
  },
  {
    id: "cc3",
    title: "🚑 Antrean Faskes BPJS Kesehatan",
    description: "Surat rujukan BPJS dipersulit, terpaksa berobat rawat inap mandiri di RS swasta. Bayar biaya medis Rp 400.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 400000);
      return "Membayar biaya RS mandiri Rp 400.000.";
    }
  },
  {
    id: "cc4",
    title: "💰 Uang Pelicin Urus Sertifikat Tanah (PTSL)",
    description: "Program sertifikat tanah gratis tapi dimintai uang rokok & bensin oleh oknum. Bayar biaya pelicin Rp 200.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 200000);
      return "Membayar biaya pungli urus sertifikat Rp 200.000.";
    }
  },
  {
    id: "cc5",
    title: "👑 Bekingan Jenderal Bintang Tiga",
    description: "Punya bekingan jenderal bintang tiga! Lolos mulus dari razia dan persidangan tipikor. (Kartu Bebas Penjara).",
    action: (player) => {
      player.getOutOfJailFreeCards += 1;
      return "Menyimpan 1 Kartu Bebas Penjara (Bekingan).";
    }
  },
  {
    id: "cc6",
    title: "👮 Razia Pajak Kendaraan & Plat Palsu",
    description: "STNK mati 5 tahun dan ketahuan pakai plat nomor palsu. Langsung ditahan di penjara tanpa lewat Mulai!",
    action: (player, state) => {
      state.sendToJail(player);
    }
  },
  {
    id: "cc7",
    title: "🥤 Buka Usaha Franchise Es Teh & Seblak Viral",
    description: "Bisnis kuliner viral diserbu antrean Gen-Z! Setiap pemain jajan dan memberi Anda Rp 100.000.",
    action: (player, state) => {
      state.collectFromEachPlayer(player, 100000);
      return "Menerima omzet kuliner viral Rp 100.000 dari masing-masing pemain.";
    }
  },
  {
    id: "cc8",
    title: "🏗️ Ganti Untung Proyek Jalan Tol Trans-Jawa",
    description: "Tanah warisan keluarga Anda terlewati proyek strategis nasional. Terima dana ganti untung negara Rp 2.000.000.",
    action: (player) => {
      player.money += 2000000;
      return "Menerima ganti untung jalan tol Rp 2.000.000.";
    }
  },
  {
    id: "cc9",
    title: "💧 Pipa Air PDAM Keruh Bau Lumpur",
    description: "Pipa PDAM mampet sebulan, terpaksa sewa tangki air bersih keliling. Bayar biaya perbaikan pipa Rp 250.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 250000);
      return "Membayar tagihan pipa PDAM Rp 250.000.";
    }
  },
  {
    id: "cc10",
    title: "🌴 Pemutihan Denda Sawit Ilegal",
    description: "Kebun kelapa sawit Anda di hutan lindung dapat pemutihan denda dari kementerian. Ambil pengembalian modal Rp 1.200.000.",
    action: (player) => {
      player.money += 1200000;
      return "Menerima pengembalian modal pemutihan sawit Rp 1.200.000.";
    }
  },
  {
    id: "cc11",
    title: "📱 Data KTP Bocor Dipakai Pinjol",
    description: "Data KTP bocor di forum gelap dan ditembak tagihan pinjol tak dikenal. Bayar biaya blokir data & lawyer Rp 500.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 500000);
      return "Membayar biaya lawyer urus pinjol data bocor Rp 500.000.";
    }
  },
  {
    id: "cc12",
    title: "🏭 Denda Uji Emisi & Polusi Udara",
    description: "Polusi udara kota memburuk, razia uji emisi mendenda kendaraan operasional Anda. Bayar denda Rp 350.000.",
    action: (player) => {
      player.money = Math.max(0, player.money - 350000);
      return "Membayar denda uji emisi polusi Rp 350.000.";
    }
  },
  {
    id: "cc13",
    title: "🎉 Pesta Hajatan Tutup Jalan Protokol",
    description: "Gelar tenda pesta pernikahan menutup separuh jalan raya provinsi! Seluruh pemain wajib memberi amplop Rp 100.000.",
    action: (player, state) => {
      state.collectFromEachPlayer(player, 100000);
      return "Menerima amplop kondangan Rp 100.000 dari masing-masing pemain.";
    }
  },
  {
    id: "cc14",
    title: "💡 Sisa Anggaran Dinas Akhir Tahun",
    description: "Sisa anggaran dinas luar kota akhir tahun dihabiskan tanpa temuan BPK. Kantongi bonus Rp 750.000.",
    action: (player) => {
      player.money += 750000;
      return "Mengambil sisa anggaran dinas Rp 750.000.";
    }
  },
  {
    id: "cc15",
    title: "✈️ Kunker Pengawasan Otsus ke Papua",
    description: "Ditunjuk jadi delegasi peninjau pembangunan daerah timur. Maju langsung ke Papua (Ambil Rp 2.000.000 jika lewat Mulai).",
    action: (player, state) => {
      state.movePlayerTo(player, 39, true);
    }
  },
  {
    id: "cc16",
    title: "🏛️ Gaji Ke-13 & Tukin PNS Cair Serentak",
    description: "Tunjangan kinerja dan gaji ke-13 resmi cair serentak! Maju langsung ke petak Mulai (Ambil Rp 2.000.000).",
    action: (player, state) => {
      state.movePlayerTo(player, 0, true);
    }
  }
];
