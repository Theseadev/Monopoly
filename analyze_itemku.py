import os
import pandas as pd
import numpy as np

files = [
    r'C:\Users\fahru\Downloads\2026-06-18_2026-07-19_Riwayat-Pesanan.xlsx',
    r'C:\Users\fahru\Downloads\2026-07-20_2026-08-19_Riwayat-Pesanan.xlsx',
    r'C:\Users\fahru\Downloads\2026-08-22_2026-09-21_Riwayat-Pesanan.xlsx'
]

dfs = []
for f in files:
    df_temp = pd.read_excel(f)
    print(f"{os.path.basename(f)}: {len(df_temp)} baris")
    dfs.append(df_temp)

df = pd.concat(dfs, ignore_index=True).drop_duplicates(subset=['Nomor_Pesanan'])

for col in ['Tanggal_Dibuat', 'Tanggal_Dibayar_Pembeli', 'Tanggal_Dikirim', 'Tanggal_Pesanan_Selesai']:
    df[col] = pd.to_datetime(df[col], errors='coerce')

df['Durasi_Kirim_Menit'] = (df['Tanggal_Dikirim'] - df['Tanggal_Dibayar_Pembeli']).dt.total_seconds() / 60.0
df['Bulan'] = df['Tanggal_Dibayar_Pembeli'].dt.to_period('M')

# Save merged dataset for future use
df.to_csv(r'C:\laragon\www\Monopoly\dataset_itemku_3bulan.csv', index=False)

print("\n" + "="*50)
print(f"TOTAL TRANSAKSI BERSIH (3 BULAN): {len(df)}")
print("="*50)

print("\n--- 1. RINGKASAN KEUANGAN ---")
print(f"Total Omzet Kotor (Harga Jual): Rp {df['Harga_Jual'].sum():,}")
print(f"Total Pendapatan Bersih: Rp {df['Total_Pendapatan'].sum():,}")
print(f"Total Biaya Admin: Rp {df['Biaya_Penjual'].sum():,}")

print("\n--- 2. STATUS TRANSAKSI ---")
print(df['Status_Pesanan'].value_counts().to_string())

print("\n--- 3. ANALISIS KECEPATAN PENGIRIMAN (FULFILLMENT SPEED) ---")
shipped = df[df['Durasi_Kirim_Menit'].notnull()]
print(f"Pesanan Selesai Terkirim: {len(shipped)}")
print(f"Rata-rata Waktu Kirim : {shipped['Durasi_Kirim_Menit'].mean():.1f} Menit ({shipped['Durasi_Kirim_Menit'].mean()/60:.2f} Jam)")
print(f"Median Waktu Kirim    : {shipped['Durasi_Kirim_Menit'].median():.1f} Menit ({shipped['Durasi_Kirim_Menit'].median()/60:.2f} Jam)")

fast_10 = (shipped['Durasi_Kirim_Menit'] <= 10).sum()
med_60 = ((shipped['Durasi_Kirim_Menit'] > 10) & (shipped['Durasi_Kirim_Menit'] <= 60)).sum()
slow_60 = (shipped['Durasi_Kirim_Menit'] > 60).sum()
very_slow_360 = (shipped['Durasi_Kirim_Menit'] > 360).sum()

print(f"[1] Sangat Cepat (<= 10 Menit) : {fast_10} ({fast_10/len(shipped)*100:.2f}%)")
print(f"[2] Standar (10 - 60 Menit)    : {med_60} ({med_60/len(shipped)*100:.2f}%)")
print(f"[3] Lambat (> 1 Jam)           : {slow_60} ({slow_60/len(shipped)*100:.2f}%)")
print(f"[4] Sangat Lambat (> 6 Jam)    : {very_slow_360} ({very_slow_360/len(shipped)*100:.2f}%)")

print("\n--- 4. ANALISIS LOYALITAS KONSUMEN (REPEAT PURCHASE) ---")
cust = df.groupby('Nama_Pembeli').agg(
    Total_Pesanan=('Nomor_Pesanan', 'count'),
    Total_Belanja=('Harga_Jual', 'sum'),
    Pertama_Beli=('Tanggal_Dibayar_Pembeli', 'min'),
    Terakhir_Beli=('Tanggal_Dibayar_Pembeli', 'max')
).reset_index()

total_cust = len(cust)
repeat_cust = cust[cust['Total_Pesanan'] > 1]
print(f"Total Pembeli Unik: {total_cust}")
print(f"Pembeli Repeat Order (>1x): {len(repeat_cust)} ({len(repeat_cust)/total_cust*100:.2f}%)")
print(f"Rata-rata Order per Pembeli Loyal: {repeat_cust['Total_Pesanan'].mean():.2f} kali")

print("\n--- 5. TOP 10 PELANGGAN PALING LOYAL ---")
print(cust.sort_values(by=['Total_Pesanan', 'Total_Belanja'], ascending=False).head(10).to_string(index=False))

print("\n--- 6. TREN BULANAN ---")
monthly = df.groupby('Bulan').agg(
    Jumlah_Pesanan=('Nomor_Pesanan', 'count'),
    Total_Omzet=('Harga_Jual', 'sum'),
    Rata_Kirim_Jam=('Durasi_Kirim_Menit', lambda x: round(x.mean()/60, 2))
).reset_index()
print(monthly.to_string(index=False))

print("\n--- 7. TOP 5 PRODUK PALING LAKU ---")
print(df['Nama_Produk'].value_counts().head(5).to_string())
