<?php

namespace App\Data;

class CardsData {
    public const CHANCE_CARDS = array (
  0 => 
  array (
    'id' => 'c1',
    'title' => 'Balik ke Titik Mulai (GO)',
    'description' => 'Maju langsung ke titik Mulai. Sesuai aturan, bonus Rp 2.000.000 hanya didapat jika melintas/melewati, bukan berhenti di Mulai.',
    'type' => 'move_to',
    'target' => 0,
    'collectGo' => false,
  ),
  1 => 
  array (
    'id' => 'c2',
    'title' => 'Dinas Sambil Liburan ke Raja Ampat',
    'description' => 'Agenda rapat evaluasi di resort pinggir pantai Papua. Kalau lewat Mulai, ambil jatah Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 39,
    'collectGo' => true,
  ),
  2 => 
  array (
    'id' => 'c3',
    'title' => 'Bagi-Bagi Kavling Proyek IKN',
    'description' => 'Dapat undangan khusus peninjauan kavling strategis di Ibu Kota Nusantara. Kalau lewat Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 31,
    'collectGo' => true,
  ),
  3 => 
  array (
    'id' => 'c4',
    'title' => 'Kunjungan Budaya ke D.I. Yogyakarta',
    'description' => 'Mampir santai ke Malioboro sebelum lanjut urusan kerjaan. Kalau lewat Mulai, klaim Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 21,
    'collectGo' => true,
  ),
  4 => 
  array (
    'id' => 'c5',
    'title' => 'Cek Muatan di Tanjung Priok',
    'description' => 'Meluncur ke Pelabuhan Tanjung Priok buat urus kelancaran kontainer. Lewat Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 15,
    'collectGo' => true,
  ),
  5 => 
  array (
    'id' => 'c6',
    'title' => 'Agenda Kerja di Gedung Sate Bandung',
    'description' => 'Meluncur ke Bandung buat rapat koordinasi lintas instansi. Lewat Mulai, ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 6,
    'collectGo' => true,
  ),
  6 => 
  array (
    'id' => 'c7',
    'title' => 'Naik Kereta Cepat Whoosh',
    'description' => 'Naik kereta cepat biar gak kena macet tol. Maju 4 petak ke depan.',
    'type' => 'move_steps',
    'steps' => 4,
  ),
  7 => 
  array (
    'id' => 'c8',
    'title' => 'Ngekor Iring-Iringan Patwal Strobo',
    'description' => 'Mengekor di belakang mobil pejabat sirine strobo, jalanan jadi lancar. Tancap gas maju 5 petak.',
    'type' => 'move_steps',
    'steps' => 5,
  ),
  8 => 
  array (
    'id' => 'c9',
    'title' => 'Dapat Kursi VIP Baris Depan',
    'description' => 'Dapat akses tiket VIP tanpa antre berkat koneksi ordal panitia. Maju 3 petak ke depan.',
    'type' => 'move_steps',
    'steps' => 3,
  ),
  9 => 
  array (
    'id' => 'c10',
    'title' => 'Sunat Alokasi Bansos Sembako',
    'description' => 'Paket bantuan dipotong setengah dari kuota resmi, sisanya masuk rekening pribadi. Ambil Rp 1.500.000.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  10 => 
  array (
    'id' => 'c11',
    'title' => 'Bagi Hasil Tambang Ilegal',
    'description' => 'Galian tambang tanpa izin amdal jalan mulus berkat bekingan orang dalam. Cairkan setoran Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  11 => 
  array (
    'id' => 'c12',
    'title' => 'Begal Anggaran Menara BTS Fiktif',
    'description' => 'Tiang sinyal cuma berdiri di laporan kerja, anggarannya cair 100%. Ambil dana proyek Rp 2.500.000.',
    'type' => 'receive_money',
    'amount' => 2500000,
  ),
  12 => 
  array (
    'id' => 'c13',
    'title' => 'Kontrak Buzzer Pencitraan Dinas',
    'description' => 'Menang proyek pengondisian opini medsos buat angkat citra pimpinan. Cairkan fee Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  13 => 
  array (
    'id' => 'c14',
    'title' => 'Atur Angka Pajak bareng Oknum Fiskus',
    'description' => 'Negosiasi pengurangan tagihan pajak korporasi di restoran mewah. Terima komisi Rp 1.200.000.',
    'type' => 'receive_money',
    'amount' => 1200000,
  ),
  14 => 
  array (
    'id' => 'c15',
    'title' => 'Markup Pengadaan Seragam Dinas',
    'description' => 'Bahan kain kiloan biasa di-markup berkali lipat di e-Katalog dan langsung lolos acc. Ambil laba Rp 1.800.000.',
    'type' => 'receive_money',
    'amount' => 1800000,
  ),
  15 => 
  array (
    'id' => 'c16',
    'title' => 'Jual Beli Kursi Jabatan Pemda',
    'description' => 'Jadi calo ordal mutasi posisi lurah dan kepala dinas basah. Terima uang pelicin Rp 1.500.000.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  16 => 
  array (
    'id' => 'c17',
    'title' => 'Pelicin Izin Amdal Kilat',
    'description' => 'Tanda tangan persetujuan lingkungan keluar semalam tanpa survei lapangan. Terima amplop Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  17 => 
  array (
    'id' => 'c18',
    'title' => 'Sunat Honor Pelatihan KPPS',
    'description' => 'Uang transportasi dan konsumsi bimtek disunat setengahnya. Kantongi sisa anggaran Rp 800.000.',
    'type' => 'receive_money',
    'amount' => 800000,
  ),
  18 => 
  array (
    'id' => 'c19',
    'title' => 'Sisa Dana Kampanye & Spanduk Partai',
    'description' => 'Cetak spanduk bahan tipis sablon luntur, selisih anggaran masuk dompet sendiri Rp 600.000.',
    'type' => 'receive_money',
    'amount' => 600000,
  ),
  19 => 
  array (
    'id' => 'c20',
    'title' => 'Pencairan Hibah Yayasan Bodong',
    'description' => 'Bikin yayasan keluarga buat nampung alokasi dana hibah APBD. Tarik dana cair Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  20 => 
  array (
    'id' => 'c21',
    'title' => 'Monopoli Kuota Impor Sembako',
    'description' => 'Mendapat jatah izin impor eksklusif karena lingkaran dekat kementerian. Ambil margin Rp 1.300.000.',
    'type' => 'receive_money',
    'amount' => 1300000,
  ),
  21 => 
  array (
    'id' => 'c22',
    'title' => 'Uang Damai Protes Limbah Pabrik',
    'description' => 'Ditunjuk jadi penengah aksi warga sekitar pabrik, dapat uang kompensasi tutup mulut Rp 500.000.',
    'type' => 'receive_money',
    'amount' => 500000,
  ),
  22 => 
  array (
    'id' => 'c23',
    'title' => 'Amplop Setoran Resepsi Pejabat',
    'description' => 'Gelar hajatan mewah, seluruh pemain lawan (bawahan instansi) wajib setor amplop masing-masing Rp 150.000.',
    'type' => 'collect_all_players',
    'amount' => 150000,
  ),
  23 => 
  array (
    'id' => 'c24',
    'title' => 'Kartu Sakti Ordal Bintang Tiga',
    'description' => 'Kartu nama paman pejabat berpangkat tinggi. Simpan kartu ini untuk bebas dari sel penjara kapan saja.',
    'type' => 'jail_card',
  ),
  24 => 
  array (
    'id' => 'c25',
    'title' => 'Tawaran Robot Trading Kripto',
    'description' => 'Influencer pamer mobil sewaan nawarin bot trading otomatis dengan janji pasti cuan:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'invest',
        'title' => 'Ikut Pasang Modal (Rp 400.000)',
        'desc' => 'Peluang 50% modal berlipat jadi Rp 1.200.000, atau 50% hilang dibawa kabur.',
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
        'title' => 'Tolak Tawaran',
        'desc' => 'Simpan uang di tabungan biasa tanpa ambil risiko.',
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
    'title' => 'Razia Operasi Patuh',
    'description' => 'Kelengkapan surat kendaraan mati dan kena razia petugas di lampu merah. Tentukan langkahmu:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'bribe',
        'title' => 'Uang Damai (Rp 150.000)',
        'desc' => 'Beri uang bensin ke petugas biar kendaraan tidak disita.',
        'action' => 'pay_money',
        'amount' => 150000,
        'icon' => '💸',
        'badge' => 'Bayar Rp 150.000',
        'theme' => 'emerald',
      ),
      1 => 
      array (
        'id' => 'jail',
        'title' => 'Ikut Sidang Pengadilan',
        'desc' => 'Menolak damai, motor ditahan dan kamu harus masuk sel.',
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
    'title' => 'Koper Jastip Ditahan Bea Cukai',
    'description' => 'Bawaan tas branded impor dicurigai petugas bandara dan diminta kejelasan:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'ordal',
        'title' => 'Jalur Belakang Ordal (Rp 120.000)',
        'desc' => 'Titip uang rokok ke kenalan bandara biar barang langsung lewat.',
        'action' => 'pay_money',
        'amount' => 120000,
        'icon' => '🤫',
        'badge' => 'Bayar Rp 120.000',
        'theme' => 'amber',
      ),
      1 => 
      array (
        'id' => 'official',
        'title' => 'Bayar Bea Masuk Resmi (Rp 350.000)',
        'desc' => 'Bayar tagihan pajak resmi negara sesuai aturan.',
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
    'title' => 'Undangan Hajatan Hotel Bintang Lima',
    'description' => 'Dapat undangan pesta nikahan megah anak pejabat:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'vip',
        'title' => 'Isi Amplop Tebal (Rp 200.000)',
        'desc' => 'Beri sumbangan layak, dapat koneksi pejabat baru & maju 3 langkah.',
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
        'title' => 'Datang Numpang Makan',
        'desc' => 'Makan prasmanan tanpa isi amplop sumbangan.',
        'action' => 'none',
        'icon' => '🍲',
        'badge' => 'Gratis',
        'theme' => 'slate',
      ),
    ),
  ),
  28 => 
  array (
    'id' => 'c29',
    'title' => 'Terciduk Titip Absen Sidang Paripurna',
    'description' => 'Kamera wartawan merekam kursi kosong padahal daftar hadir penuh. Langsung digiring ke sel penjara.',
    'type' => 'go_to_jail',
  ),
  29 => 
  array (
    'id' => 'c30',
    'title' => 'Penggerebekan Tempat Perjudian',
    'description' => 'Tempat nongkrong digerebek aparat saat main judi online. Masuk ke sel penjara tanpa lewat Mulai.',
    'type' => 'go_to_jail',
  ),
  30 => 
  array (
    'id' => 'c31',
    'title' => 'Mobil Diderek Petugas Dishub',
    'description' => 'Parkir sembarangan di atas trotoar, mobil langsung diangkut mobil derek. Bayar tebusan denda Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  31 => 
  array (
    'id' => 'c32',
    'title' => 'Tertipu File APK Undangan',
    'description' => 'Sembarangan mengunduh file undangan nikah dari nomor tak dikenal, saldo rekening terkuras Rp 1.000.000.',
    'type' => 'pay_money',
    'amount' => 1000000,
  ),
  32 => 
  array (
    'id' => 'c33',
    'title' => 'Tunggakan Pajak Kendaraan',
    'description' => 'Terjaring razia pajak Samsat gabungan karena STNK mati bertahun-tahun. Bayar tunggakan Rp 600.000.',
    'type' => 'pay_money',
    'amount' => 600000,
  ),
  33 => 
  array (
    'id' => 'c34',
    'title' => 'Iuran Keamanan Tak Resmi',
    'description' => 'Didatangi perwakilan ormas setempat bawa proposal sumbangan kegiatan. Bayar Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  34 => 
  array (
    'id' => 'c35',
    'title' => 'Tertipu Calo Tiket Konser Palsu',
    'description' => 'Beli tiket konser dari calo media sosial, barcode tidak terbaca di pintu masuk. Rugi Rp 750.000.',
    'type' => 'pay_money',
    'amount' => 750000,
  ),
  35 => 
  array (
    'id' => 'c36',
    'title' => 'Tagihan Kartu Kredit Bengkak',
    'description' => 'Kebanyakan traktir teman pas liburan kemarin, tagihan bulanan tembus limit. Bayar cicilan Rp 900.000.',
    'type' => 'pay_money',
    'amount' => 900000,
  ),
  36 => 
  array (
    'id' => 'c37',
    'title' => 'Teguran Keributan Satpol PP',
    'description' => 'Warga sekitar komplek melapor karena suara musik terlalu keras tengah malam. Bayar denda ketertiban Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  37 => 
  array (
    'id' => 'c38',
    'title' => 'Surat Tilang Kamera ETLE',
    'description' => 'Terekam kamera tilang elektronik saat menerobos jalur busway. Bayar denda tilang Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  38 => 
  array (
    'id' => 'c39',
    'title' => 'Modal Usaha Franchise Gagal',
    'description' => 'Ikut tren buka gerai minuman kekinian pas pasarnya sudah sepi pembeli. Tanggung kerugian modal Rp 800.000.',
    'type' => 'pay_money',
    'amount' => 800000,
  ),
  39 => 
  array (
    'id' => 'c40',
    'title' => 'Mobil Mogok di Tol Layang',
    'description' => 'Mesin mobil overheat di tengah tol layang tanpa bahu jalan. Bayar biaya derek dan perbaikan bengkel Rp 650.000.',
    'type' => 'pay_money',
    'amount' => 650000,
  ),
  40 => 
  array (
    'id' => 'c41',
    'title' => 'Gagal Uji Emisi Kendaraan',
    'description' => 'Asap knalpot hitam pekat terjaring razia uji emisi lingkungan. Bayar denda penalti Rp 350.000.',
    'type' => 'pay_money',
    'amount' => 350000,
  ),
  41 => 
  array (
    'id' => 'c42',
    'title' => 'Denda Keterlambatan PBB',
    'description' => 'Surat tagihan Pajak Bumi dan Bangunan terselip sampai lewat batas jatuh tempo. Bayar denda Rp 450.000.',
    'type' => 'pay_money',
    'amount' => 450000,
  ),
  42 => 
  array (
    'id' => 'c43',
    'title' => 'Ganti Rugi Kaca Mobil Tetangga',
    'description' => 'Anak main bola di jalan komplek dan mengenai kaca spion tetangga. Bayar ganti rugi Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  43 => 
  array (
    'id' => 'c44',
    'title' => 'Salah Tanggal Jalur Ganjil-Genap',
    'description' => 'Lupa cek plat nomor saat masuk kawasan jalan protokol pada jam sibuk. Bayar tilang Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  44 => 
  array (
    'id' => 'c45',
    'title' => 'Kenaikan Biaya IPL Apartemen',
    'description' => 'Pengelola gedung menaikkan iuran pemeliharaan lingkungan sepihak. Bayar tagihan Rp 550.000.',
    'type' => 'pay_money',
    'amount' => 550000,
  ),
  45 => 
  array (
    'id' => 'c46',
    'title' => 'Barang Belanja Online Palsu',
    'description' => 'Tergiur promo harga miring di marketplace, pesanan yang datang cuma kotak kosong. Rugi Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  46 => 
  array (
    'id' => 'c47',
    'title' => 'Perbaikan Atap Pasca Badai',
    'description' => 'Hujan deras dan angin kencang merusak bagian atap bangunan. Bayar Rp 150.000 per Rumah dan Rp 600.000 per Hotel.',
    'type' => 'repairs',
    'perHouse' => 150000,
    'perHotel' => 600000,
  ),
  47 => 
  array (
    'id' => 'c48',
    'title' => 'Renovasi Pagar Properti',
    'description' => 'Pagar pembatas properti roboh terkena muatan kendaraan proyek. Bayar tukang Rp 100.000 per Rumah dan Rp 400.000 per Hotel.',
    'type' => 'repairs',
    'perHouse' => 100000,
    'perHotel' => 400000,
  ),
  48 => 
  array (
    'id' => 'c49',
    'title' => 'Terjebak Macet Jalur Wisata',
    'description' => 'Pemberlakuan satu arah di jalur wisata bikin kendaraan tertahan berjam-jam. Mundur 3 petak ke belakang.',
    'type' => 'move_steps',
    'steps' => -3,
  ),
  49 => 
  array (
    'id' => 'c50',
    'title' => 'Masalah Transaksi Mesin ATM',
    'description' => 'Uang tunai tidak keluar dari mesin tapi saldo terpotong otomatis di sistem. Rugi sementara Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
);

    public const COMMUNITY_CHEST_CARDS = array (
  0 => 
  array (
    'id' => 'cc1',
    'title' => 'Penyaluran Dana Bantuan Tunai',
    'description' => 'Alokasi dana bantuan tunai cair lewat kantor pos tanpa potongan calo. Ambil Rp 1.000.000 dari Kas.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  1 => 
  array (
    'id' => 'cc2',
    'title' => 'Ganti Untung Pembebasan Lahan Tol',
    'description' => 'Lahan warisan keluarga terkena proyek perluasan jalur jalan tol pemerintah. Terima pembayaran ganti untung Rp 2.500.000.',
    'type' => 'receive_money',
    'amount' => 2500000,
  ),
  2 => 
  array (
    'id' => 'cc3',
    'title' => 'Surat Pembebasan Bersyarat',
    'description' => 'Mendapat rekomendasi penjaminan hukum dari tokoh masyarakat. Simpan kartu ini untuk bebas dari sel penjara.',
    'type' => 'jail_card',
  ),
  3 => 
  array (
    'id' => 'cc4',
    'title' => 'Retribusi Kebersihan Lingkungan',
    'description' => 'Sebagai pengurus paguyuban warga, kumpulkan iuran kebersihan dari setiap pemain lawan sebesar Rp 100.000.',
    'type' => 'collect_all_players',
    'amount' => 100000,
  ),
  4 => 
  array (
    'id' => 'cc5',
    'title' => 'Bagi Hasil Kemitraan Kebun Sawit',
    'description' => 'Perkebunan kelapa sawit memasuki masa panen raya dengan harga komoditas tinggi. Terima dividen Rp 1.500.000.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  5 => 
  array (
    'id' => 'cc6',
    'title' => 'Honor Pembahasan Anggaran Daerah',
    'description' => 'Sidang paripurna persetujuan rancangan perda berjalan lancar sesuai jadwal. Terima uang sidang Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  6 => 
  array (
    'id' => 'cc7',
    'title' => 'Perjalanan Dinas Luar Kota',
    'description' => 'Menyelesaikan tugas kunjungan kerja resmi ke pusat. Meluncur langsung ke petak Mulai dan ambil gaji Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 0,
    'collectGo' => true,
  ),
  7 => 
  array (
    'id' => 'cc8',
    'title' => 'Klaim Asuransi Kesehatan',
    'description' => 'Klaim penggantian biaya rawat inap dan pengobatan disetujui penuh oleh asuransi. Ambil pencairan dana Rp 800.000.',
    'type' => 'receive_money',
    'amount' => 800000,
  ),
  8 => 
  array (
    'id' => 'cc9',
    'title' => 'Penghematan Anggaran Konsumsi Rapat',
    'description' => 'Pengadaan konsumsi rapat dinas berjalan efisien di bawah pagu anggaran. Simpan selisih dana Rp 750.000.',
    'type' => 'receive_money',
    'amount' => 750000,
  ),
  9 => 
  array (
    'id' => 'cc10',
    'title' => 'Distribusi Pupuk & Benih Bersubsidi',
    'description' => 'Penyaluran pasokan pupuk dan benih tani berjalan lancar ke seluruh kelompok tani. Terima bagi hasil Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  10 => 
  array (
    'id' => 'cc11',
    'title' => 'Insentif Sertifikasi Kompetensi',
    'description' => 'Lulus uji sertifikasi keahlian profesi dan mendapat kenaikan grade tunjangan. Terima bonus Rp 600.000.',
    'type' => 'receive_money',
    'amount' => 600000,
  ),
  11 => 
  array (
    'id' => 'cc12',
    'title' => 'Efisiensi Pemeliharaan Jaringan Air',
    'description' => 'Pekerjaan perbaikan saluran pipa PDAM selesai lebih cepat dari target. Ambil sisa anggaran Rp 400.000.',
    'type' => 'receive_money',
    'amount' => 400000,
  ),
  12 => 
  array (
    'id' => 'cc13',
    'title' => 'Penyelesaian Proyek Pengaspalan Jalan',
    'description' => 'Pekerjaan pengaspalan jalan desa selesai diaudit dan termin pembayaran cair. Terima pembayaran termin Rp 1.200.000.',
    'type' => 'receive_money',
    'amount' => 1200000,
  ),
  13 => 
  array (
    'id' => 'cc14',
    'title' => 'Menang Tender Renovasi Gedung Dinas',
    'description' => 'Proposal penawaran renovasi gedung instansi lolos evaluasi lelang. Terima uang muka proyek Rp 1.800.000.',
    'type' => 'receive_money',
    'amount' => 1800000,
  ),
  14 => 
  array (
    'id' => 'cc15',
    'title' => 'Tunjangan Program Beasiswa Unggulan',
    'description' => 'Lolos seleksi beasiswa pendidikan tingkat lanjut yang didanai penuh pemerintah. Terima tunjangan riset Rp 1.500.000.',
    'type' => 'receive_money',
    'amount' => 1500000,
  ),
  15 => 
  array (
    'id' => 'cc16',
    'title' => 'Studi Banding Tata Kota Bandung',
    'description' => 'Menghadiri forum koordinasi perencanaan wilayah di Gedung Sate. Maju langsung ke Gedung Sate, lewat Mulai ambil Rp 2.000.000.',
    'type' => 'move_to',
    'target' => 6,
    'collectGo' => true,
  ),
  16 => 
  array (
    'id' => 'cc17',
    'title' => 'Insentif Efisiensi Logistik Pelabuhan',
    'description' => 'Waktu bongkar muat peti kemas di dermaga ekspor berjalan lebih cepat. Ambil bonus kelancaran Rp 1.100.000.',
    'type' => 'receive_money',
    'amount' => 1100000,
  ),
  17 => 
  array (
    'id' => 'cc18',
    'title' => 'Pencairan Dana Aspirasi Pembangunan',
    'description' => 'Program bantuan sarana kelompok masyarakat terealisasi tepat sasaran. Terima pencairan dana program Rp 1.000.000.',
    'type' => 'receive_money',
    'amount' => 1000000,
  ),
  18 => 
  array (
    'id' => 'cc19',
    'title' => 'Hadiah Utama Acara Hari Jadi Kota',
    'description' => 'Kupon undian jalan sehat peringatan hari jadi kota keluar sebagai pemenang. Ambil hadiah tunai Rp 900.000.',
    'type' => 'receive_money',
    'amount' => 900000,
  ),
  19 => 
  array (
    'id' => 'cc20',
    'title' => 'Bonus Tahunan Kinerja Instansi',
    'description' => 'Target kinerja tahunan tercapai melampaui rencana kerja. Terima bonus pencapaian Rp 1.400.000.',
    'type' => 'receive_money',
    'amount' => 1400000,
  ),
  20 => 
  array (
    'id' => 'cc21',
    'title' => 'Pengadaan Perangkat Komputer Kantor',
    'description' => 'Kontrak pengadaan unit komputer instansi selesai diverifikasi tanpa kendala. Ambil keuntungan Rp 1.700.000.',
    'type' => 'receive_money',
    'amount' => 1700000,
  ),
  21 => 
  array (
    'id' => 'cc22',
    'title' => 'Kompensasi Operasional Kendaraan Dinas',
    'description' => 'Klaim penggantian biaya bahan bakar dan servis rutin kendaraan dinas disetujui. Ambil Rp 500.000.',
    'type' => 'receive_money',
    'amount' => 500000,
  ),
  22 => 
  array (
    'id' => 'cc23',
    'title' => 'Keuntungan Distribusi Komoditas Pangan',
    'description' => 'Pasokan bahan pokok dari sentra produksi tersalurkan lancar ke pasar induk. Ambil keuntungan Rp 1.200.000.',
    'type' => 'receive_money',
    'amount' => 1200000,
  ),
  23 => 
  array (
    'id' => 'cc24',
    'title' => 'Penghargaan Pelayanan Publik Terbaik',
    'description' => 'Unit kerja dinobatkan sebagai pelaksana layanan terbaik tingkat nasional. Bawa pulang dana penghargaan Rp 2.000.000.',
    'type' => 'receive_money',
    'amount' => 2000000,
  ),
  24 => 
  array (
    'id' => 'cc25',
    'title' => 'Sisa Anggaran Dana Pembangunan',
    'description' => 'Pembangunan pos keamanan lingkungan selesai dan masih menyisakan saldo kas:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'pocket',
        'title' => 'Simpan untuk Kas Pengurus (+Rp 600.000)',
        'desc' => 'Alokasikan sisa dana pembangunan untuk kas operasional pengurus.',
        'action' => 'receive_money',
        'amount' => 600000,
        'icon' => '💼',
        'badge' => 'Ambil Rp 600.000',
        'theme' => 'emerald',
      ),
      1 => 
      array (
        'id' => 'share',
        'title' => 'Bagi Rata ke Seluruh Warga',
        'desc' => 'Bagi saldo sisa Rp 100.000 ke setiap warga pemain sebagai transparansi.',
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
    'title' => 'Pemeriksaan Khusus Inspektorat',
    'description' => 'Ada laporan dugaan ketidaksesuaian administrasi proyek yang sedang diselidiki petugas:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'lawyer',
        'title' => 'Tunjuk Kuasa Hukum (Rp 400.000)',
        'desc' => 'Gunakan bantuan kantor pengacara profesional untuk mendampingi klarifikasi berkas.',
        'action' => 'pay_money',
        'amount' => 400000,
        'icon' => '👨‍💼',
        'badge' => 'Bayar Rp 400.000',
        'theme' => 'amber',
      ),
      1 => 
      array (
        'id' => 'jail',
        'title' => 'Ikuti Proses Penahanan',
        'desc' => 'Kooperatif menjalani proses penyelidikan langsung di sel penahanan sementara.',
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
    'title' => 'Pengurusan Sertifikat Tanah',
    'description' => 'Berkas pendaftaran tanah sudah masuk ke loket pelayanan kelurahan:',
    'type' => 'choice',
    'choices' => 
    array (
      0 => 
      array (
        'id' => 'bribe',
        'title' => 'Biaya Jalur Cepat (Rp 150.000)',
        'desc' => 'Gunakan layanan prioritas ekspres agar sertifikat segera selesai diverifikasi.',
        'action' => 'pay_money',
        'amount' => 150000,
        'icon' => '☕',
        'badge' => 'Bayar Rp 150.000',
        'theme' => 'amber',
      ),
      1 => 
      array (
        'id' => 'wait',
        'title' => 'Antre Jalur Biasa (Mundur 2)',
        'desc' => 'Menunggu verifikasi sesuai nomor urut antrean standar. Mundur 2 petak.',
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
    'title' => 'Tarif Parkir Liar Tak Resmi',
    'description' => 'Parkir sebentar di bahu jalan, juru parkir tanpa seragam resmi langsung menagih. Bayar Rp 200.000.',
    'type' => 'pay_money',
    'amount' => 200000,
  ),
  28 => 
  array (
    'id' => 'cc29',
    'title' => 'Iuran Kegiatan Perayaan Komplek',
    'description' => 'Pengurus RT mengumpulkan sumbangan untuk acara perlombaan warga. Bayar iuran Rp 250.000.',
    'type' => 'pay_money',
    'amount' => 250000,
  ),
  29 => 
  array (
    'id' => 'cc30',
    'title' => 'Denda Keterlambatan Iuran BPJS',
    'description' => 'Status kepesertaan nonaktif saat pemeriksaan di klinik karena telat bayar iuran. Lunasi denda Rp 600.000.',
    'type' => 'pay_money',
    'amount' => 600000,
  ),
  30 => 
  array (
    'id' => 'cc31',
    'title' => 'Penyesuaian Nilai Jual Objek Pajak',
    'description' => 'NJOP di kawasan tempat tinggalmu naik sehingga tagihan PBB ikut bertambah. Bayar kewajiban pajak Rp 700.000.',
    'type' => 'pay_money',
    'amount' => 700000,
  ),
  31 => 
  array (
    'id' => 'cc32',
    'title' => 'Penyalahgunaan Data Pribadi',
    'description' => 'Data identitas terdaftar pada layanan pinjaman online tanpa persetujuan. Bayar jasa mediasi Rp 800.000.',
    'type' => 'pay_money',
    'amount' => 800000,
  ),
  32 => 
  array (
    'id' => 'cc33',
    'title' => 'Kerugian Investasi Tanpa Izin',
    'description' => 'Mengikuti program tabungan bersama yang ternyata tidak berizin resmi. Tanggung kerugian modal Rp 1.000.000.',
    'type' => 'pay_money',
    'amount' => 1000000,
  ),
  33 => 
  array (
    'id' => 'cc34',
    'title' => 'Sanksi Buang Sampah Sembarangan',
    'description' => 'Terekam kamera pengawas membuang kantong sampah di luar tempat penampungan resmi. Bayar denda Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  34 => 
  array (
    'id' => 'cc35',
    'title' => 'Tagihan Listrik Rumah Tangga',
    'description' => 'Penggunaan pendingin ruangan nonstop selama cuaca panas membuat tagihan listrik melonjak. Bayar Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  35 => 
  array (
    'id' => 'cc36',
    'title' => 'Beli Air Bersih Truk Tangki',
    'description' => 'Pasokan air PDAM sempat terhenti karena perbaikan pipa utama. Beli air tangki darurat Rp 350.000.',
    'type' => 'pay_money',
    'amount' => 350000,
  ),
  36 => 
  array (
    'id' => 'cc37',
    'title' => 'Denda Telat Lapor SPT Tahunan',
    'description' => 'Melewati batas akhir pelaporan surat pemberitahuan pajak tahunan. Bayar denda keterlambatan Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  37 => 
  array (
    'id' => 'cc38',
    'title' => 'Salah Masuk Gerbang Tol',
    'description' => 'Sepeda motor salah membaca rute navigasi dan masuk akses gerbang tol. Bayar denda penanganan Rp 500.000.',
    'type' => 'pay_money',
    'amount' => 500000,
  ),
  38 => 
  array (
    'id' => 'cc39',
    'title' => 'Pembayaran Uang Kuliah Semester',
    'description' => 'Waktunya melunasi biaya kuliah dan administrasi akademik semester baru. Bayar Rp 1.200.000.',
    'type' => 'pay_money',
    'amount' => 1200000,
  ),
  39 => 
  array (
    'id' => 'cc40',
    'title' => 'Kehilangan Kaca Spion Mobil',
    'description' => 'Kaca spion kendaraan hilang saat parkir di tepi jalan umum. Beli suku cadang pengganti Rp 450.000.',
    'type' => 'pay_money',
    'amount' => 450000,
  ),
  40 => 
  array (
    'id' => 'cc41',
    'title' => 'Biaya Parkir Inap Bandara',
    'description' => 'Meninggalkan mobil di area parkir terminal bandara selama perjalanan dinas. Bayar karcis parkir inap Rp 650.000.',
    'type' => 'pay_money',
    'amount' => 650000,
  ),
  41 => 
  array (
    'id' => 'cc42',
    'title' => 'Pajak Progresif Kendaraan',
    'description' => 'Nama terdaftar pada kepemilikan lebih dari satu kendaraan bermotor. Bayar pajak progresif Rp 750.000.',
    'type' => 'pay_money',
    'amount' => 750000,
  ),
  42 => 
  array (
    'id' => 'cc43',
    'title' => 'Selisih Penukaran Uang Pecahan',
    'description' => 'Jasa penukaran uang baru di pinggir jalan mengenakan biaya administrasi ekstra. Bayar selisih Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  43 => 
  array (
    'id' => 'cc44',
    'title' => 'Iuran Kebersihan & Keamanan Komplek',
    'description' => 'Pengurus lingkungan menagih iuran keamanan dan pengangkutan sampah tahunan. Bayar Rp 350.000.',
    'type' => 'pay_money',
    'amount' => 350000,
  ),
  44 => 
  array (
    'id' => 'cc45',
    'title' => 'Saldo Uang Elektronik Kurang',
    'description' => 'Saldo kartu elektronik tidak mencukupi saat di gardu tol otomatis. Kena tarif penyesuaian Rp 250.000.',
    'type' => 'pay_money',
    'amount' => 250000,
  ),
  45 => 
  array (
    'id' => 'cc46',
    'title' => 'Biaya Fogging Nyamuk Lingkungan',
    'description' => 'Kegiatan penyemprotan sarang nyamuk serentak di lingkungan RT. Bayar iuran kegiatan Rp 300.000.',
    'type' => 'pay_money',
    'amount' => 300000,
  ),
  46 => 
  array (
    'id' => 'cc47',
    'title' => 'Perbaikan Portal Gerbang Otomatis',
    'description' => 'Kendaraan menyenggol palang portal otomatis perumahan. Bayar biaya perbaikan sensor gerbang Rp 400.000.',
    'type' => 'pay_money',
    'amount' => 400000,
  ),
  47 => 
  array (
    'id' => 'cc48',
    'title' => 'Syukuran Naik Pangkat',
    'description' => 'Dapat promosi jabatan baru di kantor, traktir makan siang bersama untuk setiap pemain lain sebesar Rp 100.000.',
    'type' => 'pay_all_players',
    'amount' => 100000,
  ),
  48 => 
  array (
    'id' => 'cc49',
    'title' => 'Perbaikan Saluran Sanitasi Properti',
    'description' => 'Saluran pembuangan air dan keramik lantai dasar membutuhkan peremajaan. Bayar Rp 200.000 per Rumah dan Rp 800.000 per Hotel.',
    'type' => 'repairs',
    'perHouse' => 200000,
    'perHotel' => 800000,
  ),
  49 => 
  array (
    'id' => 'cc50',
    'title' => 'Sengketa Kepemilikan Lahan Bermasalah',
    'description' => 'Dokumen tanah yang dibeli ternyata memiliki sengketa batas wilayah. Masuk ke sel penjara untuk proses mediasi.',
    'type' => 'go_to_jail',
  ),
);
}
