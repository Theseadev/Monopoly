// Data Kartu Kesempatan (Chance) dan Dana Umum (Community Chest)

export const CHANCE_CARDS = [
    {
        "id": "c_loss_1",
        "title": "Kena Tilang ETLE & Plat Mati",
        "description": "Kamera pengawas ETLE merekam plat nomor mati dan tidak memakai helm standar. Bayar denda tilang Rp 500.000 ke Bank.",
        "category": "loss",
        "type": "pay_money",
        "amount": 500000
    },
    {
        "id": "c_loss_2",
        "title": "Renovasi Darurat Seluruh Properti",
        "description": "Musim hujan lebat menyebabkan kebocoran atap dan kerusakan dinding. Bayar biaya perbaikan Rp 250.000 per rumah dan Rp 1.000.000 per hotel.",
        "category": "loss",
        "type": "repairs",
        "perHouse": 250000,
        "perHotel": 1000000
    },
    {
        "id": "c_loss_3",
        "title": "Terjaring OTT Petugas Berwajib",
        "description": "Tertangkap basah dalam operasi tangkap tangan kasus suap izin proyek! Langsung dijebloskan ke sel Penjara tanpa melewati Mulai.",
        "category": "loss",
        "type": "go_to_jail"
    },
    {
        "id": "c_loss_4",
        "title": "Audit Pajak Penghasilan (PPh)",
        "description": "Kantor Pelayanan Pajak menemukan selisih pada laporan SPT tahunan Anda. Bayar kekurangan pokok pajak Rp 1.500.000 ke kas negara.",
        "category": "loss",
        "type": "pay_money",
        "amount": 1500000
    },
    {
        "id": "c_loss_5",
        "title": "Traktir Rombongan Pejabat Makan Seafood",
        "description": "Menjamu seluruh kolega dan mitra bisnis di restoran bintang lima tepi pantai. Bayar Rp 400.000 ke setiap pemain!",
        "category": "loss",
        "type": "pay_all_players",
        "amount": 400000
    },
    {
        "id": "c_loss_6",
        "title": "Jalan Tol Amblas & Longsor",
        "description": "Jalur utama tertutup longsor parah, kendaraan Anda terpaksa putar balik arah. Mundur 3 petak ke belakang.",
        "category": "loss",
        "type": "move_steps",
        "steps": -3
    },
    {
        "id": "c_gain_1",
        "title": "Dividen Saham BUMN Melimpah",
        "description": "Laba bersih portofolio saham BUMN meroket tajam tahun ini! Cairkan dividen tunai Rp 2.000.000 dari Bank.",
        "category": "profit",
        "type": "receive_money",
        "amount": 2000000
    },
    {
        "id": "c_gain_2",
        "title": "Pencairan Insentif Ekspor Nasional",
        "description": "Komoditas rempah dan kopi Anda tembus pasar internasional. Klaim bonus insentif ekspor Rp 1.500.000.",
        "category": "profit",
        "type": "receive_money",
        "amount": 1500000
    },
    {
        "id": "c_gain_3",
        "title": "Hadiah Undian Tabungan Mandiri",
        "description": "Nomor rekening tabungan Anda terpilih sebagai pemenang gebyar undian utama! Ambil hadiah Rp 1.000.000.",
        "category": "profit",
        "type": "receive_money",
        "amount": 1000000
    },
    {
        "id": "c_gain_4",
        "title": "Pesta Gala Dinner Konglomerat",
        "description": "Merayakan keberhasilan merger korporasi bersama mitra taipan! Kumpulkan hadiah Rp 500.000 dari setiap pemain.",
        "category": "profit",
        "type": "collect_all_players",
        "amount": 500000
    },
    {
        "id": "c_gain_5",
        "title": "Terbang Kelas Utama ke Raja Ampat",
        "description": "Tiket penerbangan mewah langsung ke destinasi wisata kelas dunia Raja Ampat. Jika melewati Mulai, ambil jatah Rp 2.000.000.",
        "category": "profit",
        "type": "move_to",
        "target": 39,
        "collectGo": true
    },
    {
        "id": "c_gain_6",
        "title": "Undangan Kehormatan ke Gedung Sate Bandung",
        "description": "Menghadiri rapat koordinasi investasi daerah di Bandung. Jika melewati Mulai, ambil jatah Rp 2.000.000.",
        "category": "profit",
        "type": "move_to",
        "target": 6,
        "collectGo": true
    },
    {
        "id": "c_gacha_1",
        "title": "Gacha Kripto & Saham Gorengan",
        "description": "Alokasikan modal spekulasi Rp 1.000.000 di bursa kripto. Peluang 50% Cuan Meledak Rp 3.000.000 atau 50% Rug Pull modal hangus!",
        "category": "gacha",
        "type": "gamble",
        "cost": 1000000,
        "reward": 3000000
    },
    {
        "id": "c_gacha_2",
        "title": "Putar Roda Keberuntungan VIP",
        "description": "Peluang emas memutar roda keberuntungan kasino VIP!",
        "category": "gacha",
        "type": "choice",
        "choices": [
            {
                "id": "wheel_gamble",
                "title": "Putar Roda Taruhan (Modal Rp 500.000)",
                "desc": "50% Menang Hadiah Utama Rp 2.500.000 \/ 50% Zonk",
                "action": "gamble",
                "cost": 500000,
                "reward": 2500000,
                "badge": "🎰 GACHA",
                "theme": "amber",
                "icon": "🎡"
            },
            {
                "id": "wheel_safe",
                "title": "Ambil Bonus Aman (Tanpa Risiko)",
                "desc": "Dapatkan cashback aman Rp 250.000 tanpa risiko",
                "action": "receive_money",
                "amount": 250000,
                "badge": "🛡️ AMAN",
                "theme": "emerald",
                "icon": "💰"
            }
        ]
    },
    {
        "id": "c_gacha_3",
        "title": "Warp Portal Dimensi Kilat",
        "description": "Mesin eksperimental membuka portal teleportasi berkecepatan tinggi melintasi papan!",
        "category": "gacha",
        "type": "choice",
        "choices": [
            {
                "id": "warp_fast",
                "title": "Lompat Turbo (Bayar Rp 400.000)",
                "desc": "Melaju kencang maju 5 petak ke depan",
                "action": "pay_and_move",
                "cost": 400000,
                "steps": 5,
                "badge": "⚡ TURBO",
                "theme": "purple",
                "icon": "🚀"
            },
            {
                "id": "warp_steady",
                "title": "Jalan Normal (Gratis)",
                "desc": "Maju santai 2 petak tanpa bayar biaya",
                "action": "move_steps",
                "steps": 2,
                "badge": "🚶 SANTAI",
                "theme": "blue",
                "icon": "👣"
            }
        ]
    },
    {
        "id": "c_gacha_4",
        "title": "Lelang Kilat Aset Sitaan Negara",
        "description": "Ikuti penawaran lelang kilat dengan tiket masuk Rp 800.000. 50% Menang lelang bawa pulang Rp 2.400.000!",
        "category": "gacha",
        "type": "gamble",
        "cost": 800000,
        "reward": 2400000
    },
    {
        "id": "c_gacha_5",
        "title": "Pilihan Jalur Tol vs Jalur Arteri",
        "description": "Pilih strategi mobilitas Anda untuk menembus kemacetan lalu lintas kota.",
        "category": "gacha",
        "type": "choice",
        "choices": [
            {
                "id": "toll_express",
                "title": "Jalur Tol Layang (Bayar Rp 300.000)",
                "desc": "Bebas hambatan maju 4 petak ke depan",
                "action": "pay_and_move",
                "cost": 300000,
                "steps": 4,
                "badge": "🏎️ CEPAT",
                "theme": "rose",
                "icon": "🛣️"
            },
            {
                "id": "artery_slow",
                "title": "Jalur Arteri Biasa (Gratis)",
                "desc": "Maju 1 petak tanpa keluar uang",
                "action": "move_steps",
                "steps": 1,
                "badge": "🛵 GRATIS",
                "theme": "emerald",
                "icon": "🚦"
            }
        ]
    },
    {
        "id": "c_gacha_6",
        "title": "Kotak Pandora Misterius",
        "description": "Buka peti harta karun misterius. Peluang 50% Temukan emas bernilai Rp 2.000.000 atau 50% Zonk kehilangan modal Rp 500.000.",
        "category": "gacha",
        "type": "gamble",
        "cost": 500000,
        "reward": 2000000
    },
    {
        "id": "c_special_jail",
        "title": "Kartu Bebas Penjara",
        "description": "Surat sakti koneksi orang dalam! Simpan kartu ini di inventori untuk langsung bebas dari Penjara tanpa membayar denda Rp 1.500.000. (Hanya bisa dipakai 1x & masuk kembali ke dek saat dipakai).",
        "category": "special",
        "type": "jail_card"
    },
    {
        "id": "c_special_tax",
        "title": "Kartu Bebas Pajak (Tax Free Shield)",
        "description": "Sertifikat Tax Amnesty Eksklusif! Simpan kartu ini di inventori untuk membebaskan 100% biaya saat Anda menginjak petak Pajak Istimewa atau Pajak Jalan. (Hanya bisa dipakai 1x & masuk kembali ke dek saat dipakai).",
        "category": "special",
        "type": "tax_free_card"
    }
];

export const COMMUNITY_CHEST_CARDS = [
    {
        "id": "cc_loss_1",
        "title": "Iuran BPJS & Asuransi Kesehatan",
        "description": "Pembayaran premi jaminan kesehatan nasional keluarga jatuh tempo. Bayar tagihan Rp 500.000 ke Bank.",
        "category": "loss",
        "type": "pay_money",
        "amount": 500000
    },
    {
        "id": "cc_loss_2",
        "title": "Pajak Bumi & Bangunan (PBB)",
        "description": "Surat tagihan PBB tahunan untuk seluruh portofolio properti Anda telah terbit. Bayar Rp 1.000.000 ke Bank.",
        "category": "loss",
        "type": "pay_money",
        "amount": 1000000
    },
    {
        "id": "cc_loss_3",
        "title": "Pemugaran & Perawatan Berkala Bangunan",
        "description": "Biaya peremajaan cat dan instalasi listrik properti. Bayar Rp 200.000 per rumah dan Rp 800.000 per hotel.",
        "category": "loss",
        "type": "repairs",
        "perHouse": 200000,
        "perHotel": 800000
    },
    {
        "id": "cc_loss_4",
        "title": "Donasi Bencana Alam Nusantara",
        "description": "Penyaluran bantuan logistik darurat untuk korban bencana alam di daerah terdampak. Salurkan donasi Rp 750.000.",
        "category": "loss",
        "type": "pay_money",
        "amount": 750000
    },
    {
        "id": "cc_loss_5",
        "title": "Iuran Arisan Keluarga Besar",
        "description": "Kocokan arisan keluarga besar bulan ini tiba. Bayar setoran arisan Rp 300.000 ke masing-masing pemain!",
        "category": "loss",
        "type": "pay_all_players",
        "amount": 300000
    },
    {
        "id": "cc_loss_6",
        "title": "Sanksi Pelanggaran Izin Usaha",
        "description": "Inspeksi mendadak mendapati ketidaklengkapan berkas operasional pabrik. Langsung dijebloskan ke sel Penjara!",
        "category": "loss",
        "type": "go_to_jail"
    },
    {
        "id": "cc_gain_1",
        "title": "Klaim Asuransi Unit Link Cair",
        "description": "Polis asuransi dan investasi unit link Anda jatuh tempo dengan hasil gemilang. Ambil dana cair Rp 2.000.000 dari Bank.",
        "category": "profit",
        "type": "receive_money",
        "amount": 2000000
    },
    {
        "id": "cc_gain_2",
        "title": "Pencairan Dana Hibah Riset & Inovasi",
        "description": "Proposal teknologi terbarukan Anda disetujui kementerian. Terima dana hibah pengembangan Rp 1.500.000.",
        "category": "profit",
        "type": "receive_money",
        "amount": 1500000
    },
    {
        "id": "cc_gain_3",
        "title": "Juara Festival Kuliner Nusantara",
        "description": "Restoran binaan Anda menyabet penghargaan cita rasa terbaik nasional! Terima trofi dan hadiah uang Rp 1.000.000.",
        "category": "profit",
        "type": "receive_money",
        "amount": 1000000
    },
    {
        "id": "cc_gain_4",
        "title": "Ganti Untung Pembebasan Lahan Tol",
        "description": "Pemerintah membebaskan sebagian tanah Anda dengan nilai kompensasi di atas NJOP. Terima ganti untung Rp 2.500.000.",
        "category": "profit",
        "type": "receive_money",
        "amount": 2500000
    },
    {
        "id": "cc_gain_5",
        "title": "Menang Arisan Jackpot Bulanan",
        "description": "Nama Anda keluar sebagai pemenang arisan utama! Kumpulkan iuran Rp 400.000 dari masing-masing pemain.",
        "category": "profit",
        "type": "collect_all_players",
        "amount": 400000
    },
    {
        "id": "cc_gain_6",
        "title": "Bonus THR & Prestasi Akhir Tahun",
        "description": "Perusahaan mencatatkan rekor omzet tertinggi! Cairkan bonus prestasi dan THR sebesar Rp 1.200.000 dari Bank.",
        "category": "profit",
        "type": "receive_money",
        "amount": 1200000
    },
    {
        "id": "cc_gacha_1",
        "title": "Investasi Start-up Unicorn (Gacha)",
        "description": "Suntikkan modal ventura Rp 1.000.000 ke perusahaan rintisan. Peluang 50% IPO Sukses Untung Rp 3.500.000 atau 50% Gulung Tikar!",
        "category": "gacha",
        "type": "gamble",
        "cost": 1000000,
        "reward": 3500000
    },
    {
        "id": "cc_gacha_2",
        "title": "Program CSR Sekolah vs Kas Desa",
        "description": "Tentukan alokasi program tanggung jawab sosial perusahaan.",
        "category": "gacha",
        "type": "choice",
        "choices": [
            {
                "id": "csr_school",
                "title": "Bangun Laboratorium Komputer (Biaya Rp 500.000)",
                "desc": "Reputasi naik tajam! Maju 4 petak ke depan",
                "action": "pay_and_move",
                "cost": 500000,
                "steps": 4,
                "badge": "🎓 EDUKASI",
                "theme": "emerald",
                "icon": "🏫"
            },
            {
                "id": "csr_safe",
                "title": "Alokasi Reguler (Tanpa Biaya)",
                "desc": "Tetap di posisi saat ini dengan aman",
                "action": "none",
                "badge": "🛡️ AMAN",
                "theme": "blue",
                "icon": "📋"
            }
        ]
    },
    {
        "id": "cc_gacha_3",
        "title": "Undian Kupon Koperasi Simpan Pinjam",
        "description": "Beli kupon undian SHU koperasi seharga Rp 400.000. Peluang 50% Menang Hadiah Utama Rp 1.600.000 atau Zonk!",
        "category": "gacha",
        "type": "gamble",
        "cost": 400000,
        "reward": 1600000
    },
    {
        "id": "cc_gacha_4",
        "title": "Eksplorasi Tambang Emas Tradisional",
        "description": "Uji keberuntungan mendulang emas di sungai Kalimantan (Modal Rp 700.000). Peluang 50% Temukan urat emas murni Rp 2.800.000!",
        "category": "gacha",
        "type": "gamble",
        "cost": 700000,
        "reward": 2800000
    },
    {
        "id": "cc_gacha_5",
        "title": "Pilihan Transportasi Antar Pulau",
        "description": "Pilih akomodasi perjalanan bisnis lintas kepulauan nusantara.",
        "category": "gacha",
        "type": "choice",
        "choices": [
            {
                "id": "plane_fast",
                "title": "Penerbangan Cepat (Bayar Rp 600.000)",
                "desc": "Langsung melaju cepat maju 6 petak",
                "action": "pay_and_move",
                "cost": 600000,
                "steps": 6,
                "badge": "✈️ CEPAT",
                "theme": "purple",
                "icon": "🛫"
            },
            {
                "id": "boat_free",
                "title": "Kapal Ferry Penyeberangan (Gratis)",
                "desc": "Maju 2 petak tanpa bayar tiket",
                "action": "move_steps",
                "steps": 2,
                "badge": "🚢 HEMAT",
                "theme": "emerald",
                "icon": "🛳️"
            }
        ]
    },
    {
        "id": "cc_gacha_6",
        "title": "Tebak Koin Keberuntungan",
        "description": "Lempar koin emas keberuntungan (Modal Rp 500.000). 50% Sisi Gambar Cuan Rp 1.800.000 atau 50% Sisi Angka Modal Hilang!",
        "category": "gacha",
        "type": "gamble",
        "cost": 500000,
        "reward": 1800000
    },
    {
        "id": "cc_special_jail",
        "title": "Kartu Bebas Penjara",
        "description": "Surat grasi istimewa! Simpan kartu ini di inventori untuk langsung bebas dari Penjara tanpa membayar denda Rp 1.500.000. (Hanya bisa dipakai 1x & masuk kembali ke dek saat dipakai).",
        "category": "special",
        "type": "jail_card"
    },
    {
        "id": "cc_special_tax",
        "title": "Kartu Bebas Pajak (Tax Free Shield)",
        "description": "Sertifikat Pembebasan Pajak Resmi! Simpan kartu ini di inventori untuk membebaskan 100% biaya saat Anda menginjak petak Pajak Istimewa atau Pajak Jalan. (Hanya bisa dipakai 1x & masuk kembali ke dek saat dipakai).",
        "category": "special",
        "type": "tax_free_card"
    }
];
