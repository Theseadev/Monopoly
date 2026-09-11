// Kumpulan Kartu Kesempatan (Chance) dan Dana Umum (Community Chest)
// Tema: Satir Isu Sosial & Pemerintahan Indonesia

export const CHANCE_CARDS = [
  {
    id: "c1",
    title: "Kena Tilang Razia Operasi Patuh!",
    description: "Motor Anda terjaring razia knalpot brong & STNK mati di perempatan. Pak Polisi memberi Anda pilihan penyelesaian:",
    type: "choice",
    choices: [
      {
        id: "bribe",
        title: "Uang Damai (Sogok Polisi)",
        desc: "Bayar Rp 150.000 untuk 'uang rokok & bensin' petugas, langsung jalan.",
        action: "pay_money",
        amount: 150000,
        icon: "💸",
        badge: "Bayar Rp 150.000",
        theme: "emerald"
      },
      {
        id: "jail",
        title: "Ikut Sidang (Masuk Penjara)",
        desc: "Motor ditahan, Anda masuk sel menunggu jadwal sidang pengadilan.",
        action: "go_to_jail",
        icon: "⚖️",
        badge: "Masuk Penjara",
        theme: "rose"
      }
    ]
  },
  {
    id: "c2",
    title: "Tawaran Robot Trading Crazy Rich",
    description: "Influencer viral flexing supercar mengajak Anda deposit ke platform crypto otomatis 'pasti cuan 300%':",
    type: "choice",
    choices: [
      {
        id: "invest",
        title: "Gas All-In Hype (Rp 400.000)",
        desc: "Peluang 50% digandakan jadi Rp 1.200.000, atau 50% lenyap kena rug pull!",
        action: "gamble",
        cost: 400000,
        reward: 1200000,
        icon: "🎰",
        badge: "Taruhan Rp 400.000",
        theme: "amber"
      },
      {
        id: "pass",
        title: "Tolak & Beli Emas Antam",
        desc: "Pilih jalur aman, tidak ada uang yang keluar atau masuk.",
        action: "none",
        icon: "🛡️",
        badge: "Lewati (Gratis)",
        theme: "slate"
      }
    ]
  },
  {
    id: "c3",
    title: "Barang Impor Ditahan Bea Cukai",
    description: "Koper belanjaan oleh-oleh luar negeri Anda di-scan di bandara dan kena tagihan bea masuk membengkak!",
    type: "choice",
    choices: [
      {
        id: "ordal",
        title: "Titip Amplop Ordal (Rp 120.000)",
        desc: "Beri uang pelicin ke kenalan orang dalam bandara agar koper langsung lolos.",
        action: "pay_money",
        amount: 120000,
        icon: "🤫",
        badge: "Bayar Rp 120.000",
        theme: "amber"
      },
      {
        id: "official",
        title: "Bayar Pajak Resmi (Rp 350.000)",
        desc: "Taat aturan negara, bayar pajak impor resmi Rp 350.000 ke kas Bank.",
        action: "pay_money",
        amount: 350000,
        icon: "🧾",
        badge: "Bayar Rp 350.000",
        theme: "blue"
      }
    ]
  },
  {
    id: "c4",
    title: "Resepsi Hajatan Anak Sultan",
    description: "Anda mendapat undangan VIP resepsi pernikahan termewah di ballroom hotel bintang 5:",
    type: "choice",
    choices: [
      {
        id: "vip",
        title: "Kasih Amplop Sultan (Rp 200.000)",
        desc: "Dapat koneksi pejabat & langsung melaju 3 langkah ke depan!",
        action: "pay_and_move",
        cost: 200000,
        steps: 3,
        icon: "💎",
        badge: "Bayar & Maju 3 Petak",
        theme: "purple"
      },
      {
        id: "free",
        title: "Numpang Makan Prasmanan",
        desc: "Isi buku tamu doang dan bungkus lauk, hemat tanpa biaya.",
        action: "none",
        icon: "🍱",
        badge: "Santai (Gratis)",
        theme: "slate"
      }
    ]
  },
  {
    id: "c5",
    title: "Izin Ekspor Sawit (CPO) Lolos",
    description: "Lobi kuota ekspor minyak sawit mentah disetujui kementerian! Terima royalti ekspor sebesar Rp 1.500.000.",
    type: "receive_money",
    amount: 1500000
  },
  {
    id: "c6",
    title: "Groundbreaking Proyek IKN",
    description: "Dapat proyek pembangunan gedung kementerian di Nusantara! Maju langsung ke Kalimantan Timur (Kaltim). Jika lewat Mulai, ambil Rp 2.000.000.",
    type: "move_to",
    target: 29,
    collectGo: true
  },
  {
    id: "c7",
    title: "Bagi-Bagi Bansos Jelang Pemilu",
    description: "Bansos beras dan sembako cair serentak dari kas negara. Anda kebagian jatah bantuan tunai Rp 800.000.",
    type: "receive_money",
    amount: 800000
  },
  {
    id: "c8",
    title: "Kominfo Blokir Akses Internet",
    description: "Layanan server Anda terblokir PSE Kominfo karena telat urus perizinan. Bisnis mandek, mundur 3 langkah ke belakang.",
    type: "move_steps",
    steps: -3
  },
  {
    id: "c9",
    title: "Orang Dalam (Ordal) & Privilese",
    description: "Punya kenalan paman pejabat Mahkamah & petinggi pusat! Kebal dari segala jeratan hukum. (Kartu Bebas Penjara).",
    type: "jail_card"
  },
  {
    id: "c10",
    title: "Proyek Mangkrak & Aspal Retak",
    description: "Kontraktor kabur saat perbaikan fasilitas umum. Perbaiki seluruh bangunan: Bayar Rp 250.000 per rumah dan Rp 1.000.000 per hotel.",
    type: "repairs",
    perHouse: 250000,
    perHotel: 1000000
  },
  {
    id: "c11",
    title: "Naik Kereta Cepat Whoosh!",
    description: "Sensasi naik kereta cepat Jakarta-Bandung 350 km/jam! Maju langsung ke Stasiun Bandung. Jika lewat Mulai, ambil Rp 2.000.000.",
    type: "move_to",
    target: 15,
    collectGo: true
  },
  {
    id: "c12",
    title: "Sumbangan Wajib Ormas Wilayah",
    description: "Didatangi ormas seragam loreng meminta proposal dana pembinaan & THR. Bagi-bagi uang Rp 100.000 ke setiap pemain!",
    type: "pay_all_players",
    amount: 100000
  },
  {
    id: "c13",
    title: "Kunker Studi Banding ke Pantai Bali",
    description: "Dapat surat tugas kunker pemda ke pulau dewata. Maju langsung ke provinsi Bali. Jika lewat Mulai, ambil Rp 2.000.000.",
    type: "move_to",
    target: 23,
    collectGo: true
  },
  {
    id: "c14",
    title: "Dividen Hilirisasi Tambang Nikel",
    description: "Pabrik smelter nikel dan baterai EV membukukan rekor laba bersih! Ambil dividen investasi Rp 1.000.000.",
    type: "receive_money",
    amount: 1000000
  },
  {
    id: "c15",
    title: "Tarif Penyesuaian Listrik PLN Naik",
    description: "Golongan daya listrik rumah dinaikkan sepihak tanpa pemberitahuan. Bayar tagihan membengkak Rp 300.000 ke Bank.",
    type: "pay_money",
    amount: 300000
  },
  {
    id: "c16",
    title: "Pelantikan Pejabat Baru (Maju ke Mulai)",
    description: "Menang tender pengadaan mobil dinas kementerian! Maju langsung ke petak Mulai (Ambil Rp 2.000.000).",
    type: "move_to",
    target: 0,
    collectGo: true
  }
];

export const COMMUNITY_CHEST_CARDS = [
  {
    id: "cc1",
    title: "Terjaring OTT KPK Kasus Bansos!",
    description: "Nama Anda terciduk menerima aliran dana proyek pengadaan fiktif. Wartawan sudah mengepung kantor Anda!",
    type: "choice",
    choices: [
      {
        id: "lawyer",
        title: "Sewa Pengacara Top & Buzzer (Rp 400.000)",
        desc: "Bayar Rp 400.000 untuk pengalihan isu & jasa pembelaan hukum.",
        action: "pay_money",
        amount: 400000,
        icon: "👨‍💼",
        badge: "Bayar Rp 400.000",
        theme: "amber"
      },
      {
        id: "jail",
        title: "Pakai Rompi Oranye (Masuk Penjara)",
        desc: "Pasrah digiring ke rutan KPK tanpa melewati Mulai.",
        action: "go_to_jail",
        icon: "🏛️",
        badge: "Masuk Penjara",
        theme: "rose"
      }
    ]
  },
  {
    id: "cc2",
    title: "Dilema Sisa Anggaran Dana Desa",
    description: "Ada kelebihan dana desa Rp 600.000 di kas akhir tahun. Bagaimana Anda mengelolanya?",
    type: "choice",
    choices: [
      {
        id: "pocket",
        title: "Simpan ke Kantong Sendiri (+Rp 600.000)",
        desc: "Kantongi seluruh sisa dana Rp 600.000 langsung ke kas pribadi.",
        action: "receive_money",
        amount: 600000,
        icon: "💼",
        badge: "Ambil Rp 600.000",
        theme: "emerald"
      },
      {
        id: "share",
        title: "Bagi Rata ke Seluruh Warga (Pemain)",
        desc: "Bagi-bagi rezeki Rp 100.000 ke setiap pemain demi elektabilitas.",
        action: "pay_all_players",
        amount: 100000,
        icon: "🎁",
        badge: "Bagi Rp 100.000 / Pemain",
        theme: "blue"
      }
    ]
  },
  {
    id: "cc3",
    title: "Uang Pelicin Sertifikat Tanah (PTSL)",
    description: "Program sertifikat tanah gratis di kelurahan, tapi diminta uang rokok oleh oknum calo:",
    type: "choice",
    choices: [
      {
        id: "bribe",
        title: "Beri Uang Rokok Calo (Rp 150.000)",
        desc: "Sertifikat tanah langsung jadi dalam 3 hari kerja.",
        action: "pay_money",
        amount: 150000,
        icon: "☕",
        badge: "Bayar Rp 150.000",
        theme: "amber"
      },
      {
        id: "wait",
        title: "Ikut Prosedur Normal (Mundur 2 Petak)",
        desc: "Berkas tertimbun 2 tahun di lemari, waktu terbuang sia-sia.",
        action: "move_steps",
        steps: -2,
        icon: "🐢",
        badge: "Mundur 2 Langkah",
        theme: "slate"
      }
    ]
  },
  {
    id: "cc4",
    title: "Sisa Anggaran Pengadaan e-KTP",
    description: "Blanko e-KTP habis lagi di kelurahan, tapi sisa dana anggarannya masuk ke dompet Anda. Ambil Rp 1.500.000.",
    type: "receive_money",
    amount: 1500000
  },
  {
    id: "cc5",
    title: "Tarif PPN Naik Jadi 12%",
    description: "Pemerintah resmi menaikkan tarif pajak pertambahan nilai belanja bulanan. Bayar potongan PPN Rp 300.000 ke Bank.",
    type: "pay_money",
    amount: 300000
  },
  {
    id: "cc6",
    title: "Antrean Faskes BPJS Kesehatan",
    description: "Surat rujukan BPJS dipersulit, terpaksa berobat rawat inap mandiri di RS swasta. Bayar biaya medis Rp 400.000.",
    type: "pay_money",
    amount: 400000
  },
  {
    id: "cc7",
    title: "Bekingan Jenderal Bintang Tiga",
    description: "Punya bekingan jenderal bintang tiga! Lolos mulus dari razia dan persidangan tipikor. (Kartu Bebas Penjara).",
    type: "jail_card"
  },
  {
    id: "cc8",
    title: "Buka Usaha Franchise Es Teh & Seblak Viral",
    description: "Bisnis kuliner viral diserbu antrean Gen-Z! Setiap pemain jajan dan memberi Anda Rp 100.000.",
    type: "collect_all_players",
    amount: 100000
  },
  {
    id: "cc9",
    title: "Ganti Untung Proyek Jalan Tol Trans-Jawa",
    description: "Tanah warisan keluarga Anda terlewati proyek strategis nasional. Terima dana ganti untung negara Rp 2.000.000.",
    type: "receive_money",
    amount: 2000000
  },
  {
    id: "cc10",
    title: "Pipa Air PDAM Keruh Bau Lumpur",
    description: "Pipa PDAM mampet sebulan, terpaksa sewa tangki air bersih keliling. Bayar biaya perbaikan pipa Rp 250.000.",
    type: "pay_money",
    amount: 250000
  },
  {
    id: "cc11",
    title: "Pemutihan Denda Sawit Ilegal",
    description: "Kebun kelapa sawit Anda di hutan lindung dapat pemutihan denda dari kementerian. Ambil pengembalian modal Rp 1.200.000.",
    type: "receive_money",
    amount: 1200000
  },
  {
    id: "cc12",
    title: "Data KTP Bocor Dipakai Pinjol",
    description: "Data KTP bocor di forum gelap dan ditembak tagihan pinjol tak dikenal. Bayar biaya blokir data & lawyer Rp 500.000.",
    type: "pay_money",
    amount: 500000
  },
  {
    id: "cc13",
    title: "Denda Uji Emisi & Polusi Udara",
    description: "Polusi udara kota memburuk, razia uji emisi mendenda kendaraan operasional Anda. Bayar denda Rp 350.000.",
    type: "pay_money",
    amount: 350000
  },
  {
    id: "cc14",
    title: "Pesta Hajatan Tutup Jalan Protokol",
    description: "Gelar tenda pesta pernikahan menutup separuh jalan raya provinsi! Seluruh pemain wajib memberi amplop Rp 100.000.",
    type: "collect_all_players",
    amount: 100000
  },
  {
    id: "cc15",
    title: "Sisa Anggaran Dinas Akhir Tahun",
    description: "Sisa anggaran dinas luar kota akhir tahun dihabiskan tanpa temuan BPK. Kantongi bonus Rp 750.000.",
    type: "receive_money",
    amount: 750000
  },
  {
    id: "cc16",
    title: "Gaji Ke-13 & Tukin PNS Cair Serentak",
    description: "Tunjangan kinerja dan gaji ke-13 resmi cair serentak! Maju langsung ke petak Mulai (Ambil Rp 2.000.000).",
    type: "move_to",
    target: 0,
    collectGo: true
  }
];
