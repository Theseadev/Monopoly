<?php

namespace App\Data;

class CardsData {
    public const CHANCE_CARDS = array (
  0 => 
  array (
    'id' => 'c1',
    'title' => 'Maju ke Petak Mulai (GO)',
    'description' => 'Maju langsung ke petak Mulai dan ambil gaji Rp 2.000.000 dari Bank!',
    'type' => 'move_to',
    'target' => 0,
    'collectGo' => true,
  ),
  1 => 
  array (
    'id' => 'c2',
    'title' => 'Liburan Mewah ke Raja Ampat Papua!',
    'description' => 'Terbang langsung menikmati indahnya surga bahari Raja Ampat Papua. Jika melewati Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 39,
    'collectGo' => true,
  ),
  2 => 
  array (
    'id' => 'c3',
    'title' => 'Proyek Strategis IKN Kalimantan Timur!',
    'description' => 'Mendapat penugasan penting ke Ibu Kota Nusantara di Kalimantan Timur. Jika melewati Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 31,
    'collectGo' => true,
  ),
  3 => 
  array (
    'id' => 'c4',
    'title' => 'Wisata Budaya D.I. Yogyakarta!',
    'description' => 'Kunjungan budaya ke Keraton & Candi Borobudur di Yogyakarta. Jika melewati Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 21,
    'collectGo' => true,
  ),
  4 => 
  array (
    'id' => 'c5',
    'title' => 'Berlayar dari Pelabuhan Tanjung Priok!',
    'description' => 'Maju langsung ke Pelabuhan Tanjung Priok. Jika melewati Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 15,
    'collectGo' => true,
  ),
  5 => 
  array (
    'id' => 'c6',
    'title' => 'Wisata Kuliner Gedung Sate Bandung!',
    'description' => 'Maju langsung ke Gedung Sate di Jawa Barat. Jika melewati Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 6,
    'collectGo' => true,
  ),
  6 => 
  array (
    'id' => 'c7',
    'title' => 'Mudik Naik Kereta Cepat Whoosh!',
    'description' => 'Perjalanan kilat tanpa hambatan melintasi jalur cepat Whoosh! Maju 4 petak ke depan.',
    'type' => 'move_steps',
    'steps' => 4,
  ),
  7 => 
  array (
    'id' => 'c8',
    'title' => 'Naik Mobil Patwal Pejabat Bebas Macet!',
    'description' => 'Dikawal sirine strobo patwal di jalan tol, melaju kencang tanpa hambatan! Maju 5 petak.',
    'type' => 'move_steps',
    'steps' => 5,
  ),
  8 => 
  array (
    'id' => 'c9',
    'title' => 'Tiket Konser VIP Baris Depan!',
    'description' => 'Dapat tiket gratis VIP baris paling depan dari promotor! Maju 3 petak ke depan.',
    'type' => 'move_steps',
    'steps' => 3,
  ),
  9 => 
  array (
    'id' => 'c10',
    'title' => 'Menang Undian Panen Hadiah Bank BRI!',
    'description' => 'Kupon tabungan Anda keluar sebagai pemenang utama grand prize! Ambil hadiah Rp 1.500.000 dari Bank.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  10 => 
  array (
    'id' => 'c11',
    'title' => 'Dividen Saham Batu Bara & Emas Antam Melejit!',
    'description' => 'Harga komoditas tambang menembus rekor tertinggi all-time high! Terima dividen Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  11 => 
  array (
    'id' => 'c12',
    'title' => 'Warisan Rumah Kuno Kawasan Menteng Jakarta!',
    'description' => 'Ahli waris menyerahkan sertifikat rumah tua di lokasi paling elit ibu kota! Terima dana warisan Rp 2.500.000.',
    'type' => 'receive_money',
    'amount' => 2500000,
  ),
  12 => 
  array (
    'id' => 'c13',
    'title' => 'Video TikTok FYP Ditonton 25 Juta Kali!',
    'description' => 'Konten video komedi Anda viral nasional dan diserbu sponsor endorsement brand! Ambil Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  13 => 
  array (
    'id' => 'c14',
    'title' => 'Restitusi Kelebihan Bayar Pajak SPT Tahunan!',
    'description' => 'Direktorat Jenderal Pajak menyetujui pengembalian lebih bayar SPT pajak penghasilan Anda. Terima Rp 1.200.000.',
    'type' => 'receive_money',
    'amount' => 1200000,
  ),
  14 => 
  array (
    'id' => 'c15',
    'title' => 'Menang Tender Pengadaan Seragam Kantor Dinas!',
    'description' => 'Proposal tender garmen konveksi Anda disetujui pemda tanpa sanggahan! Ambil laba bersih Rp 1.800.000.',
    'type' => 'receive_money',
    'amount' => 1800000,
  ),
  15 => 
  array (
    'id' => 'c16',
    'title' => 'Bonus Gaji Ke-13 & Tukin PNS Cair!',
    'description' => 'Tunjangan kinerja dan gaji ke-13 resmi ditransfer serentak ke rekening Anda! Ambil Rp 1.500.000.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  16 => 
  array (
    'id' => 'c17',
    'title' => 'Investasi Kopi Susu Gula Aren Balik Modal Kilat!',
    'description' => 'Gerai franchise kopi kekinian Anda ramai diserbu anak muda! Terima bagi hasil keuntungan Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  17 => 
  array (
    'id' => 'c18',
    'title' => 'Juara 1 Lomba Burung Kicau Piala Presiden!',
    'description' => 'Burung Murai Batu peliharaan Anda gacor tanpa henti di gantangan nasional! Terima hadiah uang Rp 800.000.',
    'type' => 'receive_money',
    'amount' => 800000,
  ),
  18 => 
  array (
    'id' => 'c19',
    'title' => 'Cashback 50% Promo Tanggal Kembar 12.12!',
    'description' => 'Voucher e-commerce berhasil di-claim saat perang flash sale tengah malam! Ambil cashback Rp 600.000.',
    'type' => 'receive_money',
    'amount' => 600000,
  ),
  19 => 
  array (
    'id' => 'c20',
    'title' => 'Startup Lolos Pendanaan Angel Investor!',
    'description' => 'Aplikasi rintisan Anda mendapat suntikan modal venture capital! Terima dana investasi Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  20 => 
  array (
    'id' => 'c21',
    'title' => 'Panen Raya Kopi Gayo & Padi Organik!',
    'description' => 'Musim panen raya melimpah bebas hama wereng! Hasil penjualan komoditas pertanian menghasilkan Rp 1.300.000.',
    'type' => 'receive_money',
    'amount' => 1300000,
  ),
  21 => 
  array (
    'id' => 'c22',
    'title' => 'Menang Lomba 17-an Panjat Pinang Tingkat RW!',
    'description' => 'Berhasil meraih sepeda dan amplop hadiah di puncak pohon pinang! Terima hadiah Rp 500.000.',
    'type' => 'receive_money',
    'amount' => 500000,
  ),
  22 => 
  array (
    'id' => 'c23',
    'title' => 'YouTube Tembus 1 Juta Subscribers (Gold Play Button)!',
    'description' => 'Perayaan pencapaian 1 juta pelanggan! Setiap pemain lain wajib memberi saweran Rp 150.000 untuk Anda.',
    'type' => 'collect_all_players',
    'amount' => 150000,
  ),
  23 => 
  array (
    'id' => 'c24',
    'title' => 'Kartu Sakti Bebas Penjara Orang Dalam (Ordal)',
    'description' => 'Kartu nama pejabat berpegaruh! Simpan kartu ini untuk bebas dari penjara secara instan tanpa membayar denda.',
    'type' => 'jail_card',
  ),
  24 => 
  array (
    'id' => 'c25',
    'title' => 'Tawaran Robot Trading Crazy Rich',
    'description' => 'Influencer flexing supercar mengajak Anda deposit ke platform crypto otomatis "pasti cuan 300%":',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'invest',
        'title' => 'Gas All-In Hype (Rp 400.000)',
        'desc' => 'Peluang 50% digandakan jadi Rp 1.200.000, atau 50% lenyap kena rug pull!',
        'action' => 'gamble',
        'cost' => 400000,
        'reward' => 1200000,
        'icon' => '🎰',
        'badge' => 'Taruhan Rp 400.000',
        'theme' => 'amber',
      ),
      1 => 
      array (
        'id' => 'pass',
        'title' => 'Tolak & Beli Emas Antam',
        'desc' => 'Pilih jalur aman, tidak ada uang yang keluar atau masuk.',
        'action' => 'none',
        'icon' => '🛡️',
        'badge' => 'Lewati (Gratis)',
        'theme' => 'slate',
      ),
    ),
  ),
  25 => 
  array (
    'id' => 'c26',
    'title' => 'Kena Tilang Razia Operasi Patuh!',
    'description' => 'Motor Anda terjaring razia knalpot brong & STNK mati di perempatan. Pak Polisi memberi Anda pilihan penyelesaian:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'bribe',
        'title' => 'Uang Damai (Sogok Polisi)',
        'desc' => 'Bayar Rp 150.000 untuk "uang rokok & bensin" petugas, langsung jalan.',
        'action' => 'pay_money',
        'amount' => 150000,
        'icon' => '💸',
        'badge' => 'Bayar Rp 150.000',
        'theme' => 'emerald',
      ),
      1 => 
      array (
        'id' => 'jail',
        'title' => 'Ikut Sidang (Masuk Penjara)',
        'desc' => 'Motor ditahan, Anda masuk sel menunggu jadwal sidang pengadilan.',
        'action' => 'go_to_jail',
        'icon' => '⚖️',
        'badge' => 'Masuk Penjara',
        'theme' => 'rose',
      ),
    ),
  ),
  26 => 
  array (
    'id' => 'c27',
    'title' => 'Barang Impor Ditahan Bea Cukai Bandara!',
    'description' => 'Koper belanjaan oleh-oleh luar negeri Anda di-scan di bandara dan kena tagihan bea masuk membengkak!',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'ordal',
        'title' => 'Titip Amplop Ordal (Rp 120.000)',
        'desc' => 'Beri uang pelicin ke kenalan orang dalam bandara agar koper langsung lolos.',
        'action' => 'pay_money',
        'amount' => 120000,
        'icon' => '🤫',
        'badge' => 'Bayar Rp 120.000',
        'theme' => 'amber',
      ),
      1 => 
      array (
        'id' => 'official',
        'title' => 'Bayar Pajak Resmi (Rp 350.000)',
        'desc' => 'Taat aturan negara, bayar pajak impor resmi Rp 350.000 ke kas Bank.',
        'action' => 'pay_money',
        'amount' => 350000,
        'icon' => '🧾',
        'badge' => 'Bayar Rp 350.000',
        'theme' => 'blue',
      ),
    ),
  ),
  27 => 
  array (
    'id' => 'c28',
    'title' => 'Resepsi Hajatan Anak Sultan',
    'description' => 'Anda mendapat undangan VIP resepsi pernikahan termewah di ballroom hotel bintang 5:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'vip',
        'title' => 'Kasih Amplop Sultan (Rp 200.000)',
        'desc' => 'Dapat koneksi pejabat & langsung melaju 3 langkah ke depan!',
        'action' => 'pay_and_move',
        'cost' => 200000,
        'steps' => 3,
        'icon' => '🧧',
        'badge' => 'Bayar Rp 200.000 + Maju 3',
        'theme' => 'purple',
      ),
      1 => 
      array (
        'id' => 'buffet',
        'title' => 'Makan Prasmanan Saja (Gratis)',
        'desc' => 'Cicip kambing guling dan es teler tanpa keluar uang sepeserpun.',
        'action' => 'none',
        'icon' => '🍲',
        'badge' => 'Makan Gratis',
        'theme' => 'slate',
      ),
    ),
  ),
  28 => 
  array (
    'id' => 'c29',
    'title' => 'Ketahuan Titip Absen Sidang Paripurna!',
    'description' => 'Kamera wartawan memergoki Anda tidur pulas dan menitipkan jastip presensi absensi. Langsung dijebloskan ke penjara!',
    'type' => 'go_to_jail',
  ),
  29 => 
  array (
    'id' => 'c30',
    'title' => 'Grebek Judi Sabung Ayam & Slot Kakek Zeus!',
    'description' => 'Polisi menggerebek lokasi perjudian terselubung dan nama Anda masuk daftar pemain! Langsung masuk penjara tanpa melewati Mulai.',
    'type' => 'go_to_jail',
  ),
  30 => 
  array (
    'id' => 'c31',
    'title' => 'Mobil Diderek Dishub Parkir Sembarangan!',
    'description' => 'Parkir sembarangan di atas trotoar jalur sepeda, mobil Anda diderek Dishub. Bayar denda retribusi Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  31 => 
  array (
    'id' => 'c32',
    'title' => 'M-Banking Kena Phishing Undangan Nikah APK!',
    'description' => 'Terlanjur mengklik file APK berkedok undangan pernikahan online, saldo rekening terkuras! Bayar kerugian Rp 1.000.000.',
    'type' => 'pay_money',
    'amount' => 1000000,
  ),
  32 => 
  array (
    'id' => 'c33',
    'title' => 'Denda Pajak Kendaraan Bermotor Mati 5 Tahun!',
    'description' => 'Terjaring razia Samsat keliling, STNK dan pajak motor mati bertahun-tahun. Bayar denda tunggakan Rp 600.000.',
    'type' => 'pay_money',
    'amount' => 600000,
  ),
  33 => 
  array (
    'id' => 'c34',
    'title' => 'Dipalak Ormas Minta Proposal Agustusan!',
    'description' => 'Rombongan oknum ormas berseragam loreng datang menyodorkan map proposal uang keamanan. Bayar sumbangan Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  34 => 
  array (
    'id' => 'c35',
    'title' => 'Nonton Konser Ditipu Calo Tiket Palsu!',
    'description' => 'Barcode tiket konser musik ditolak di pintu gerbang venue karena duplikat calo. Bayar kerugian Rp 750.000.',
    'type' => 'pay_money',
    'amount' => 750000,
  ),
  35 => 
  array (
    'id' => 'c36',
    'title' => 'Tagihan Kartu Kredit Bengkak Libur Lebaran!',
    'description' => 'Belanja oleh-oleh dan traktir kerabat saat mudik melebihi limit bulanan. Bayar tagihan cicilan Rp 900.000.',
    'type' => 'pay_money',
    'amount' => 900000,
  ),
  36 => 
  array (
    'id' => 'c37',
    'title' => 'Rumah Kena Razia Kos-Kosan Satpol PP!',
    'description' => 'Izin peruntukan rumah hunian dijadikan kos bebas tanpa lapor RT/RW. Bayar denda administratif Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  37 => 
  array (
    'id' => 'c38',
    'title' => 'Denda Tilang Kamera ETLE Terobos Busway!',
    'description' => 'Kamera tilang elektronik otomatis memotret pelat nomor Anda menerobos jalur TransJakarta. Bayar denda Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  38 => 
  array (
    'id' => 'c39',
    'title' => 'Beli Franchise Boba Viral Tapi Gulung Tikar!',
    'description' => 'Tren minuman boba meredup drastis, gerai sepi pembeli dan stok bahan baku kadaluarsa. Bayar kerugian modal Rp 800.000.',
    'type' => 'pay_money',
    'amount' => 800000,
  ),
  39 => 
  array (
    'id' => 'c40',
    'title' => 'Biaya Turun Mesin & Ganti Radiator Mobil!',
    'description' => 'Mesin mobil mogok berasap saat menanjak di jalan tol. Bayar ongkos bengkel bubut dan onderdil Rp 650.000.',
    'type' => 'pay_money',
    'amount' => 650000,
  ),
  40 => 
  array (
    'id' => 'c41',
    'title' => 'Razia Uji Emisi Gas Buang & Knalpot Brong!',
    'description' => 'Asap knalpot kendaraan hitam pekat tidak lolos ambang batas polusi udara DKI. Bayar denda emisi Rp 350.000.',
    'type' => 'pay_money',
    'amount' => 350000,
  ),
  41 => 
  array (
    'id' => 'c42',
    'title' => 'Denda Keterlambatan Bayar PBB Rumah!',
    'description' => 'Surat tagihan Pajak Bumi dan Bangunan terlambat disetor melewati batas jatuh tempo. Bayar denda Rp 450.000.',
    'type' => 'pay_money',
    'amount' => 450000,
  ),
  42 => 
  array (
    'id' => 'c43',
    'title' => 'Ganti Rugi Kaca Mobil Tetangga Dilempar Bola!',
    'description' => 'Anak-anak komplek bermain sepak bola di depan rumah dan memecahkan kaca mobil tetangga. Bayar ganti rugi Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  43 => 
  array (
    'id' => 'c44',
    'title' => 'Salah Masuk Jalur Ganjil Genap Polantas!',
    'description' => 'Lupa melihat tanggal kalender, mobil dengan pelat nomor salah dicegat polisi di jalan protokol. Bayar tilang Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  44 => 
  array (
    'id' => 'c45',
    'title' => 'Iuran Pengelolaan Lingkungan Apartemen Naik!',
    'description' => 'Pengembang apartemen menaikkan tarif service charge dan sinking fund sepihak. Bayar tagihan IPL Rp 550.000.',
    'type' => 'pay_money',
    'amount' => 550000,
  ),
  45 => 
  array (
    'id' => 'c46',
    'title' => 'Belanja Online Ditipu Seller Dikirim Kardus Kosong!',
    'description' => 'Paket gadget murah yang ditunggu-tunggu ternyata hanya berisi potongan kertas koran. Bayar kerugian penipuan Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  46 => 
  array (
    'id' => 'c47',
    'title' => 'Renovasi Genteng Bocor & Plafon Jebol!',
    'description' => 'Hujan badai ekstrem merusak seluruh atap properti Anda! Bayar Rp 150.000 untuk setiap Rumah dan Rp 600.000 untuk setiap Hotel.',
    'type' => 'repairs',
    'perHouse' => 150000,
    'perHotel' => 600000,
  ),
  47 => 
  array (
    'id' => 'c48',
    'title' => 'Renovasi Pagar Properti Ditabrak Truk Galon!',
    'description' => 'Truk pengangkut galon air oleng menabrak pagar deretan properti Anda. Bayar biaya tukang Rp 100.000 per Rumah dan Rp 400.000 per Hotel.',
    'type' => 'repairs',
    'perHouse' => 100000,
    'perHotel' => 400000,
  ),
  48 => 
  array (
    'id' => 'c49',
    'title' => 'Terjebak Macet Horor Buka-Tutup Jalur Puncak!',
    'description' => 'Sistem rekayasa lalu lintas satu arah (one-way) membuat kendaraan Anda terjebak berjam-jam. Mundur 3 petak ke belakang.',
    'type' => 'move_steps',
    'steps' => -3,
  ),
  49 => 
  array (
    'id' => 'c50',
    'title' => 'Tarik Tunai Mesin ATM Rusak Saldo Terpotong!',
    'description' => 'Uang tunai tidak keluar dari mulut mesin ATM tetapi saldo rekening berkurang otomatis. Bayar kerugian Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
);

    public const COMMUNITY_CHEST_CARDS = array (
  0 => 
  array (
    'id' => 'cc1',
    'title' => 'Bantuan Subsidi Upah (BSU) & BLT Cair!',
    'description' => 'Nama Anda terverifikasi di database kementerian untuk menerima bantuan tunai langsung! Ambil Rp 1.000.000 dari Kas.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  1 => 
  array (
    'id' => 'cc2',
    'title' => 'Ganti Untung Tol Trans-Jawa!',
    'description' => 'Lahan tanah pekarangan keluarga terlewati proyek strategis nasional jalan tol. Ambil ganti untung Rp 2.500.000.',
    'type' => 'receive_money',
    'amount' => 2500000,
  ),
  2 => 
  array (
    'id' => 'cc3',
    'title' => 'Kartu Sakti Bebas Penjara Tokoh Adat',
    'description' => 'Dukungan dari tokoh masyarakat setempat! Simpan kartu ini untuk bebas seketika dari tahanan.',
    'type' => 'jail_card',
  ),
  3 => 
  array (
    'id' => 'cc4',
    'title' => 'Franchise Es Teh Manis Jumbo Viral!',
    'description' => 'Bisnis gerobak es teh viral diserbu antrean panjang! Setiap pemain lain wajib jajan dan memberi Anda Rp 100.000.',
    'type' => 'collect_all_players',
    'amount' => 100000,
  ),
  4 => 
  array (
    'id' => 'cc5',
    'title' => 'Panen Sawit Riau & Dividen Koperasi Cair!',
    'description' => 'Hasil tandan buah segar perkebunan sawit melimpah ruah. Terima bagi hasil dividen koperasi Rp 1.500.000.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  5 => 
  array (
    'id' => 'cc6',
    'title' => 'Menang Undian Tabungan Berjangka Simpedes!',
    'description' => 'Nomor rekening tabungan Anda keluar saat penarikan undian semesteran! Ambil hadiah Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  6 => 
  array (
    'id' => 'cc7',
    'title' => 'Maju ke Petak Mulai (GO)',
    'description' => 'Kembali ke petak Mulai dan ambil gaji resmi bulanan Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 0,
    'collectGo' => true,
  ),
  7 => 
  array (
    'id' => 'cc8',
    'title' => 'Klaim Asuransi Rawat Inap Disetujui Penuh!',
    'description' => 'Seluruh biaya rumah sakit dan obat-obatan diganti penuh oleh asuransi kesehatan swasta. Terima klaim Rp 800.000.',
    'type' => 'receive_money',
    'amount' => 800000,
  ),
  8 => 
  array (
    'id' => 'cc9',
    'title' => 'Juara 1 Festival Rendang Nusantara!',
    'description' => 'Racikan bumbu rempah rendang daging sapi Anda dinobatkan sebagai yang terlezat se-Indonesia! Ambil hadiah Rp 750.000.',
    'type' => 'receive_money',
    'amount' => 750000,
  ),
  9 => 
  array (
    'id' => 'cc10',
    'title' => 'Warisan Toko Grosir Sembako Tanah Abang!',
    'description' => 'Menerima penyerahan hak waris toko kain & sembako grosir di Pasar Tanah Abang. Ambil uang kas toko Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  10 => 
  array (
    'id' => 'cc11',
    'title' => 'Jual Akun Game & Item Langka Cuan Maksimal!',
    'description' => 'Koleksi skin senjata dan akun game rank Mythical Glory laku dibeli kolektor sultan. Terima pembayaran Rp 600.000.',
    'type' => 'receive_money',
    'amount' => 600000,
  ),
  11 => 
  array (
    'id' => 'cc12',
    'title' => 'Subsidi Tagihan Listrik PLN & Air PDAM!',
    'description' => 'Mendapat pemotongan tarif subsidi energi dari pemerintah untuk pelanggan rumah tangga. Ambil bonus Rp 400.000.',
    'type' => 'receive_money',
    'amount' => 400000,
  ),
  12 => 
  array (
    'id' => 'cc13',
    'title' => 'Royalti Dangdut Koplo Viral di TikTok!',
    'description' => 'Aransemen lagu dangdut koplo buatan Anda dipakai oleh 2 juta kreator video pendek. Terima royalti Rp 1.200.000.',
    'type' => 'receive_money',
    'amount' => 1200000,
  ),
  13 => 
  array (
    'id' => 'cc14',
    'title' => 'Menang Hadiah Mobil dari Tutup Botol Minuman!',
    'description' => 'Kode unik di balik tutup botol teh kemasan terverifikasi asli oleh notaris! Ambil uang senilai Rp 1.800.000.',
    'type' => 'receive_money',
    'amount' => 1800000,
  ),
  14 => 
  array (
    'id' => 'cc15',
    'title' => 'Beasiswa S2 Luar Negeri Full Coverage!',
    'description' => 'Lolos seleksi beasiswa magister bergengsi lengkap dengan biaya hidup dan uang saku! Terima santunan Rp 1.500.000.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  15 => 
  array (
    'id' => 'cc16',
    'title' => 'Festival Kuliner Nusantara di Gedung Sate!',
    'description' => 'Maju langsung ke Gedung Sate Bandung untuk menghadiri pembukaan pameran kuliner nusantara.',
    'type' => 'move_to',
    'target' => 6,
    'collectGo' => true,
  ),
  16 => 
  array (
    'id' => 'cc17',
    'title' => 'Ekspor Batik Tulis Pekalongan Tembus Eropa!',
    'description' => 'Pesanan kontainer kain batik tulis tradisional berhasil dikapalkan ke Paris dan Milan. Ambil laba Rp 1.100.000.',
    'type' => 'receive_money',
    'amount' => 1100000,
  ),
  17 => 
  array (
    'id' => 'cc18',
    'title' => 'Juara Turnamen E-Sports Mobile Legends!',
    'description' => 'Tim e-sports binaan Anda menjuarai kompetisi nasional di Istora Senayan! Terima bagian hadiah Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  18 => 
  array (
    'id' => 'cc19',
    'title' => 'Doorprize Motor Matic Jalan Sehat HUT RI!',
    'description' => 'Kupon jalan santai perayaan kemerdekaan Anda ditarik oleh bupati! Ambil pencairan hadiah Rp 900.000.',
    'type' => 'receive_money',
    'amount' => 900000,
  ),
  19 => 
  array (
    'id' => 'cc20',
    'title' => 'Bonus Tahunan Pegawai Teladan Telkom!',
    'description' => 'Pencapaian target KPI tahunan memuaskan dengan predikat istimewa. Terima transferan bonus Rp 1.400.000.',
    'type' => 'receive_money',
    'amount' => 1400000,
  ),
  20 => 
  array (
    'id' => 'cc21',
    'title' => 'Menang Lelang Pengadaan Barang Kementerian!',
    'description' => 'Perusahaan rekanan Anda dinyatakan sebagai penawar terbaik dalam e-katalog LKPP. Terima keuntungan Rp 1.700.000.',
    'type' => 'receive_money',
    'amount' => 1700000,
  ),
  21 => 
  array (
    'id' => 'cc22',
    'title' => 'Voucher BBM Subsidi & Cuci Mobil 1 Tahun!',
    'description' => 'Mendapatkan kupon bahan bakar gratis dan fasilitas salon detailing mobil selama satu tahun penuh. Ambil Rp 500.000.',
    'type' => 'receive_money',
    'amount' => 500000,
  ),
  22 => 
  array (
    'id' => 'cc23',
    'title' => 'Panen Raya Bawang Merah Brebes Melonjak 200%!',
    'description' => 'Harga pasaran bawang merah melonjak tinggi saat musim perayaan hari besar nasional. Terima laba penjualan Rp 1.200.000.',
    'type' => 'receive_money',
    'amount' => 1200000,
  ),
  23 => 
  array (
    'id' => 'cc24',
    'title' => 'Undian Wisata Religi Sekeluarga!',
    'description' => 'Memenangkan paket perjalanan wisata ziarah religi keluarga besar dari biro travel terpercaya! Ambil uang Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  24 => 
  array (
    'id' => 'cc25',
    'title' => 'Sisa Anggaran Dana Desa',
    'description' => 'Terdapat sisa alokasi anggaran pembangunan gapura dan posyandu desa akhir tahun:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'pocket',
        'title' => 'Masuk Kas Pribadi (+Rp 600.000)',
        'desc' => 'Ambil sisa dana tanpa laporan audit BPK.',
        'action' => 'receive_money',
        'amount' => 600000,
        'icon' => '💼',
        'badge' => 'Ambil Rp 600.000',
        'theme' => 'emerald',
      ),
      1 => 
      array (
        'id' => 'share',
        'title' => 'Bagi Rata ke Seluruh Warga (Pemain)',
        'desc' => 'Bagi-bagi rezeki Rp 100.000 ke setiap pemain demi elektabilitas.',
        'action' => 'pay_all_players',
        'amount' => 100000,
        'icon' => '🎁',
        'badge' => 'Bagi Rp 100.000 / Pemain',
        'theme' => 'blue',
      ),
    ),
  ),
  25 => 
  array (
    'id' => 'cc26',
    'title' => 'Terjaring OTT KPK Kasus Pengadaan!',
    'description' => 'Nama Anda terciduk menerima aliran dana fee proyek fiktif dinas. Wartawan sudah mengepung kantor Anda!',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'lawyer',
        'title' => 'Sewa Pengacara Top (Rp 400.000)',
        'desc' => 'Bayar Rp 400.000 untuk pengalihan isu & jasa pembelaan hukum.',
        'action' => 'pay_money',
        'amount' => 400000,
        'icon' => '👨‍💼',
        'badge' => 'Bayar Rp 400.000',
        'theme' => 'amber',
      ),
      1 => 
      array (
        'id' => 'jail',
        'title' => 'Pakai Rompi Oranye (Masuk Penjara)',
        'desc' => 'Pasrah digiring ke rutan KPK tanpa melewati Mulai.',
        'action' => 'go_to_jail',
        'icon' => '🏛️',
        'badge' => 'Masuk Penjara',
        'theme' => 'rose',
      ),
    ),
  ),
  26 => 
  array (
    'id' => 'cc27',
    'title' => 'Uang Pelicin Sertifikat Tanah (PTSL)',
    'description' => 'Program sertifikat tanah gratis di kelurahan, tapi diminta uang rokok oleh oknum calo:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'bribe',
        'title' => 'Beri Uang Rokok Calo (Rp 150.000)',
        'desc' => 'Sertifikat tanah langsung jadi dalam 3 hari kerja.',
        'action' => 'pay_money',
        'amount' => 150000,
        'icon' => '☕',
        'badge' => 'Bayar Rp 150.000',
        'theme' => 'amber',
      ),
      1 => 
      array (
        'id' => 'wait',
        'title' => 'Ikut Prosedur Normal (Mundur 2 Petak)',
        'desc' => 'Berkas tertimbun 2 tahun di lemari, waktu terbuang sia-sia.',
        'action' => 'move_steps',
        'steps' => -2,
        'icon' => '🐢',
        'badge' => 'Mundur 2 Langkah',
        'theme' => 'slate',
      ),
    ),
  ),
  27 => 
  array (
    'id' => 'cc28',
    'title' => 'Tukang Parkir Gaib Muncul di Depan Minimarket!',
    'description' => 'Baru parkir motor 30 detik beli air mineral, tiba-tiba muncul peluit dan meminta uang parkir. Bayar retribusi liar Rp 200.000.',
    'type' => 'pay_money',
    'amount' => 200000,
  ),
  28 => 
  array (
    'id' => 'cc29',
    'title' => 'Iuran Nobar Timnas & Genset Pos Ronda!',
    'description' => 'Ketua RT mengumpulkan dana sumbangan sewa proyektor layar tancap dan bahan bakar genset. Bayar iuran Rp 250.000.',
    'type' => 'pay_money',
    'amount' => 250000,
  ),
  29 => 
  array (
    'id' => 'cc30',
    'title' => 'Tunggakan Iuran BPJS Mandiri 1 Tahun!',
    'description' => 'Status kartu BPJS Kesehatan non-aktif karena lupa bayar autodebet bulanan. Bayar denda tunggakan Rp 600.000.',
    'type' => 'pay_money',
    'amount' => 600000,
  ),
  30 => 
  array (
    'id' => 'cc31',
    'title' => 'PBB Rumah Naik Drastis Akibat NJOP Wilayah!',
    'description' => 'Pemerintah kota menyesuaikan Nilai Jual Objek Pajak kawasan perumahan Anda. Bayar kenaikan PBB Rp 700.000.',
    'type' => 'pay_money',
    'amount' => 700000,
  ),
  31 => 
  array (
    'id' => 'cc32',
    'title' => 'Data KTP Bocor Digunakan Oknum Pinjol Ilegal!',
    'description' => 'Diteror telepon penagih hutang pinjol tak dikenal akibat kebocoran data e-KTP. Bayar jasa mediasi hukum Rp 800.000.',
    'type' => 'pay_money',
    'amount' => 800000,
  ),
  32 => 
  array (
    'id' => 'cc33',
    'title' => 'Tertipu Arisan Bodong Mama Muda Untung 50%!',
    'description' => 'Admin arisan online kabur membawa lari seluruh uang setoran member arisan. Bayar kerugian modal Rp 1.000.000.',
    'type' => 'pay_money',
    'amount' => 1000000,
  ),
  33 => 
  array (
    'id' => 'cc34',
    'title' => 'Denda Buang Sampah Terekam CCTV Pemda!',
    'description' => 'Petugas Satpol PP melacak rekaman kamera pengawas warga membuang kantong plastik di bantaran sungai. Bayar denda Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  34 => 
  array (
    'id' => 'cc35',
    'title' => 'Tagihan Listrik PLN Naik AC Hidup 24 Jam!',
    'description' => 'Cuaca kemarau terik membuat penggunaan pendingin ruangan tidak pernah mati seharian. Bayar tagihan listrik Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  35 => 
  array (
    'id' => 'cc36',
    'title' => 'Pipa PDAM Keruh, Beli Air Bersih Truk Tangki!',
    'description' => 'Pasokan air bersih pipa PDAM macet total selama dua minggu. Bayar pesanan air bersih tangki keliling Rp 350.000.',
    'type' => 'pay_money',
    'amount' => 350000,
  ),
  36 => 
  array (
    'id' => 'cc37',
    'title' => 'Denda Telat Lapor SPT Tahunan Pajak Badan!',
    'description' => 'Konsultan akuntan lalai mengunggah laporan keuangan tahunan badan usaha melewati tanggal 30 April. Bayar denda Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  37 => 
  array (
    'id' => 'cc38',
    'title' => 'Ditilang Polantas Karena Motor Masuk Tol!',
    'description' => 'Mengikuti panduan rute GPS maps mobil, sepeda motor Anda menerobos gerbang tol otomatis. Bayar tilang Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  38 => 
  array (
    'id' => 'cc39',
    'title' => 'Bayar Uang Gedung & SPP Kampus Semester Baru!',
    'description' => 'Registrasi ulang mata kuliah dan sumbangan pengembangan sarana kampus wajib dilunasi. Bayar SPP Rp 1.200.000.',
    'type' => 'pay_money',
    'amount' => 1200000,
  ),
  39 => 
  array (
    'id' => 'cc40',
    'title' => 'Kaca Spion Mobil Diembat Maling di Lampu Merah!',
    'description' => 'Pengendara motor misterius mematahkan dan membawa kabur kaca spion kanan saat macet malam hari. Bayar penggantian Rp 450.000.',
    'type' => 'pay_money',
    'amount' => 450000,
  ),
  40 => 
  array (
    'id' => 'cc41',
    'title' => 'Denda Overstay Tarif Parkir Inap Bandara!',
    'description' => 'Salah menghitung durasi tiket parkir inap mobil di terminal bandara saat cuti liburan. Bayar tagihan parkir Rp 650.000.',
    'type' => 'pay_money',
    'amount' => 650000,
  ),
  41 => 
  array (
    'id' => 'cc42',
    'title' => 'Pajak Progresif Kepemilikan Kendaraan Bermotor!',
    'description' => 'Nama keluarga tercatat memiliki 3 mobil dan 4 motor sekaligus dalam satu kartu keluarga. Bayar pajak progresif Rp 750.000.',
    'type' => 'pay_money',
    'amount' => 750000,
  ),
  42 => 
  array (
    'id' => 'cc43',
    'title' => 'Tertipu Modus Tukar Uang Baru Lebaran!',
    'description' => 'Jasa penukaran uang pecahan baru di pinggir jalan menyisipkan lembaran uang palsu dan cacat cetak. Bayar kerugian Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  43 => 
  array (
    'id' => 'cc44',
    'title' => 'Iuran Sampah & Keamanan Komplek 1 Tahun!',
    'description' => 'Petugas pos satpam menagih pembayaran iuran kebersihan dan ronda malam komplek satu tahun di muka. Bayar Rp 350.000.',
    'type' => 'pay_money',
    'amount' => 350000,
  ),
  44 => 
  array (
    'id' => 'cc45',
    'title' => 'Saldo e-Toll Kurang, Kena Denda Tarif Tol Terjauh!',
    'description' => 'Kartu tol tidak bisa ditempel di gerbang keluar dan memicu kemacetan panjang di belakang. Bayar denda tarif terjauh Rp 250.000.',
    'type' => 'pay_money',
    'amount' => 250000,
  ),
  45 => 
  array (
    'id' => 'cc46',
    'title' => 'Biaya Fogging Nyamuk DBD & Kerja Bakti RT!',
    'description' => 'Beberapa warga terjangkit demam berdarah, pengurus RT memesan mobil fogging disinfeksi nyamuk. Bayar sumbangan Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  46 => 
  array (
    'id' => 'cc47',
    'title' => 'Ganti Rugi Nabrak Palang Otomatis Cluster!',
    'description' => 'Buru-buru melaju sebelum palang pintu terbuka sempurna sampai sensor patah. Bayar ganti rugi perbaikan Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  47 => 
  array (
    'id' => 'cc48',
    'title' => 'Traktir Bakso & Es Kelapa Satu Gang!',
    'description' => 'Mengadakan pesta syukuran kecil di depan rumah bersama tetangga. Bagikan Rp 100.000 kepada setiap pemain lain.',
    'type' => 'pay_all_players',
    'amount' => 100000,
  ),
  48 => 
  array (
    'id' => 'cc49',
    'title' => 'Renovasi Rumah Rusak Terkena Banjir Rob!',
    'description' => 'Banjir pasang air laut merendam lantai dasar properti Anda! Bayar biaya renovasi Rp 200.000 per Rumah dan Rp 800.000 per Hotel.',
    'type' => 'repairs',
    'perHouse' => 200000,
    'perHotel' => 800000,
  ),
  49 => 
  array (
    'id' => 'cc50',
    'title' => 'Terlibat Skandal Mafia Tanah & Sertifikat Ganda!',
    'description' => 'Satgas mafia tanah membekukan aset dan menyeret Anda ke meja hijau. Langsung dijebloskan ke penjara!',
    'type' => 'go_to_jail',
  ),
);
}
