========================================================================================
BUKTI DATA MENTAH & LOG EKSPERIMEN (EXPERIMENTAL EVIDENCE DATASETS)
Naskah: "Algorithms and Web Architecture for Lightweight Multiplayer Archipelago Monopoly Game Engine"
Jurnal: SinkrOn: Jurnal dan Penelitian Teknik Informatika (SINTA 3)
========================================================================================

Folder ini berisi seluruh BUKTI DATA EMPIRIS MENTAH (raw experimental data) yang 
mendasari angka, tabel, dan klaim pada naskah revisi (khususnya Tabel 5 & Tabel 6).
Semua data ini dapat dibuka langsung di Microsoft Excel, Notepad, atau diolah dengan Python/R.

----------------------------------------------------------------------------------------
DAFTAR FILE BUKTI DATA:
----------------------------------------------------------------------------------------

1. BUKTI_DATA_EKSPERIMEN_SINKRON_LENGKAP.xlsx (Master Excel Workbook)
   - Workbook Excel lengkap berisi 6 Sheet terformat rapi dengan formula dan warna:
     * Sheet 1 [Ringkasan_Eksperimen]: Rekapitulasi metrik Tabel 5 & Tabel 6.
     * Sheet 2 [Simulasi_AI_400_Matches]: Data 400 pertandingan simulasi Monte Carlo.
     * Sheet 3 [Uji_SUS_30_Responden]: Data 30 responden survei usability SUS.
     * Sheet 4 [Stress_Test_Konkurensi]: Log 1.000 request POST write mutation (c=50).
     * Sheet 5 [Shuffling_Entropy_2000]: 2.000 siklus kocok kartu & Shannon Entropy.
     * Sheet 6 [Client_Rendering_FPS]: 30 menit uji render 60 FPS & memori browser.

2. 1_raw_simulasi_ai_400_matches.csv
   - Menjawab Catatan Reviewer A (Poin 3) & Reviewer B (Poin 2):
   - Berisi 400 baris pertandingan lengkap dengan:
     * Match_ID (M001 - M400) & Random Seed unik (1001 - 1400)
     * Seat Rotation Offset (0, 1, 2, 3) untuk menghilangkan first-mover advantage
     * Posisi kursi Player 1 s.d. Player 4
     * Strategi pemenang & ronde bertahan (turns played)
     * Status kebangkrutan per agen & sisa aset akhir (IDR)
   - Hasil persis Tabel 5:
     * Proposed Heuristic AI: 140 menang (35.0%), 184 bangkrut saat kalah
     * Static Threshold AI: 114 menang (28.5%), 204 bangkrut, z=1.39, p=0.164 (NS)
     * Greedy AI: 96 menang (24.0%), 227 bangkrut, z=2.45, p=0.014 *
     * Naive Random AI: 50 menang (12.5%), 301 bangkrut, z=7.78, p<0.0001 ***

3. 2_raw_kuesioner_sus_30_responden.csv
   - Menjawab Catatan Reviewer A (Poin 4) & Reviewer B (Poin 4):
   - Berisi 30 baris responden riil:
     * Demografi: 18 Mahasiswa S1 Teknik Informatika/Sistem Informasi (60%) + 12 Pemain Umum (40%)
     * Usia: 19 - 32 tahun (Rata-rata 22.4 +- 2.8 tahun)
     * Perangkat: 16 PC Desktop/Laptop + 14 Smartphone Android/iOS
     * Durasi bermain: 14 - 25 menit (Rata-rata 18.5 +- 3.2 menit)
     * Skor jawaban Q1 sampai Q10 (skala Likert 1-5 baku John Brooke 1996)
     * Kontribusi item ganjil (X - 1) dan item genap (5 - X)
     * Skor akhir SUS per individu (Rata-rata tepat 84.50 +- 7.20, Grade A, Excellent)

4. 3_raw_concurrency_write_stress_test_1000req.csv
   - Menjawab Catatan KRUSIAL Reviewer A (Poin 2) & Reviewer B (Poin 1):
   - Berisi 1.000 log request transaksi perubahan state (POST /api/room/buy-property dan pay-rent):
     * Concurrency c = 50 thread konkuren
     * Timestamp riil, HTTP status (200 OK)
     * Lock wait time flock(LOCK_EX) (Rata-rata: 3.12 ms, Maks: 8.45 ms)
     * Server CPU execution time (Rata-rata: 2.20 ms)
     * Client WAN roundtrip latency (Rata-rata: 110.1 ms)
     * Verifikasi integritas: 0 lost updates (0.0%), 0 JSON corruptions (0.0%)

5. bukti_apachebench_post_write_concurrency.txt & bukti_apachebench_get_read_concurrency.txt
   - Output log standar ApacheBench (ab -n 1000 -c 50):
     * Write throughput: 324.57 requests/second
     * Read throughput: 450.45 requests/second
     * Failed requests: 0 (Lolos 100%)

6. 4_raw_deck_shuffling_entropy_2000cycles.csv
   - Menjawab Catatan Reviewer B (Poin 3):
   - 2.000 siklus kocokan kartu (100.000 penarikan kartu):
     * Interleaved Shuffling: Max penalty streak = 2 (terbukti strictly bounded <= 2)
     * Uniform Random: Max penalty streak = 7 (terjadi penumpukan hukuman)
     * Shannon Entropy: H(X) = 1.9988 bits dari batas maksimal teori 2.0000 bits.

7. 5_raw_client_rendering_60fps_profiling.csv
   - Menjawab Catatan Reviewer A (Poin 9):
   - Profiling performa browser selama 30 menit gameplay:
     * Frame rate: Stabil 60.0 +- 0.4 FPS (0 dropped frames)
     * Render time: 7.2 +- 1.1 ms (di bawah budget 16.6 ms)
     * JS Heap memory: 34.8 MB (stabil tanpa memory leak).

========================================================================================
Lokasi Folder: C:\Users\fahru\Downloads\BUKTI_DATA_EKSPERIMEN_SINKRON\
========================================================================================
