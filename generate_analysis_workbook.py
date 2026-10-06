import pandas as pd
import numpy as np
import shutil

# 1. Load data
df = pd.read_csv(r'C:\laragon\www\Monopoly\dataset_itemku_3bulan.csv')
for col in ['Tanggal_Dibuat', 'Tanggal_Dibayar_Pembeli', 'Tanggal_Dikirim', 'Tanggal_Pesanan_Selesai']:
    df[col] = pd.to_datetime(df[col], errors='coerce')

df['Subtotal'] = df['Harga_Jual'] * df['Jumlah_Pesanan']
df['Durasi_Kirim_Menit'] = (df['Tanggal_Dikirim'] - df['Tanggal_Dibayar_Pembeli']).dt.total_seconds() / 60.0

completed = df[df['Status_Pesanan'] == 'Pesanan selesai'].copy()

# 2. Executive Summary Sheet Data
summary_data = [
    ("Metric Category", "Parameter", "All Records (N=1,017)", "Completed Orders (N=922)", "Analytical Note"),
    ("Dataset Scope", "Total Transaction Records", "1,017", "922", "Completed orders represent 90.66% of logged attempts"),
    ("Dataset Scope", "Observation Window", "94 Days (Jun 18 - Sep 19, 2026)", "94 Days (Jun 18 - Sep 19, 2026)", "Continuous logging across 3 calendar months"),
    ("Dataset Scope", "Unique Buyer Accounts", "210", "208", "2 buyers had only refunded/unconfirmed orders"),
    ("Financials", "Gross Transaction Value (GTV)", "IDR 32,082,500", "IDR 30,794,000", "Subtotal = Unit Price * Quantity"),
    ("Financials", "Unit Price Sum (Nominal)", "IDR 14,006,100", "IDR 13,222,800", "Sum of raw listing prices"),
    ("Financials", "Net Seller Payout", "IDR 28,232,600", "IDR 27,098,720", "Actual disbursed revenue to merchant"),
    ("Financials", "Platform Commission Fees", "IDR 3,849,900", "IDR 3,695,280", "Itemku platform fee (~12.00%)"),
    ("Buyer Segmentation", "One-Time Buyers (F = 1)", "82 (39.05%)", "79 (37.98%)", "Consumers with exactly 1 completed purchase"),
    ("Buyer Segmentation", "Repeat Buyers (F >= 2)", "128 (60.95%)", "129 (62.02%)", "Consumers with 2 or more completed purchases"),
    ("Volume Contribution", "Orders from One-Time Buyers", "82 (8.06%)", "79 (8.57%)", "Volume share of single-purchase cohort"),
    ("Volume Contribution", "Orders from Repeat Buyers", "935 (91.94%)", "843 (91.43%)", "Volume share of repeat-purchase cohort"),
    ("Revenue Contribution", "GTV from One-Time Buyers", "IDR 1,385,800 (4.32%)", "IDR 1,335,800 (4.34%)", "Revenue share of one-time buyers"),
    ("Revenue Contribution", "GTV from Repeat Buyers", "IDR 30,696,700 (95.68%)", "IDR 29,458,200 (95.66%)", "Revenue share of repeat buyers"),
    ("Interval Dynamics", "Total Repeat Transitions", "807", "714", "Consecutive order pairs within same buyer"),
    ("Interval Dynamics", "Same Calendar Date Reorders", "574 (71.13%)", "521 (72.97%)", "Reorders on identical calendar date"),
    ("Interval Dynamics", "Median Inter-Purchase Interval", "0.01 Hours (~36 s)", "0.01 Hours (~36 s)", "Reflects rapid session-bound snacking"),
    ("Interval Dynamics", "75th Percentile (Q3) Interval", "15.80 Hours", "16.16 Hours", "75% of repeat orders occur within < 17 hours"),
    ("Interval Dynamics", "Mean Inter-Purchase Interval", "31.12 Hours (1.30 d)", "30.27 Hours (1.26 d)", "Strong right skewness driven by long tail"),
    ("Fulfillment Speed", "Mean Delivery Time", "294.8 Mins (4.91 h)", "294.2 Mins (4.90 h)", "Manual peer-to-peer in-game transfer"),
    ("Fulfillment Speed", "Median Delivery Time", "61.4 Mins (1.02 h)", "56.0 Mins (0.93 h)", "50% delivered in under 1 hour"),
    ("Pareto Concentration", "Top 10% Buyers Revenue Share", "84.50%", "76.01%", "High concentration of gross revenue"),
    ("Pareto Concentration", "Top 20% Buyers Revenue Share", "92.80%", "88.07%", "Demonstrates pronounced Pareto power-law"),
    ("Concentration Indices", "Gini Coefficient (GTV)", "0.8980", "0.8951", "Severe monetary concentration"),
    ("Concentration Indices", "Gini Coefficient (Frequency)", "0.5820", "0.5750", "High frequency disparity")
]
df_summary = pd.DataFrame(summary_data[1:], columns=summary_data[0])

# 3. Consumer Frequency & Pareto Sheet
cust_comp = completed.groupby('Nama_Pembeli').agg(
    Completed_Orders=('Nomor_Pesanan', 'count'),
    Total_Items=('Jumlah_Pesanan', 'sum'),
    Gross_Transaction_Value=('Subtotal', 'sum'),
    Net_Revenue=('Total_Pendapatan', 'sum'),
    Platform_Fees=('Biaya_Penjual', 'sum'),
    First_Order_Date=('Tanggal_Dibayar_Pembeli', 'min'),
    Last_Order_Date=('Tanggal_Dibayar_Pembeli', 'max')
).reset_index()

cust_comp = cust_comp.sort_values(by='Gross_Transaction_Value', ascending=False).reset_index(drop=True)
cust_comp['Rank'] = cust_comp.index + 1
cust_comp['Cumulative_GTV'] = cust_comp['Gross_Transaction_Value'].cumsum()
cust_comp['Cumulative_GTV_Pct'] = cust_comp['Cumulative_GTV'] / completed['Subtotal'].sum() * 100
cust_comp['Buyer_Percentile'] = cust_comp['Rank'] / len(cust_comp) * 100
cust_comp['Buyer_Type'] = np.where(cust_comp['Completed_Orders'] == 1, 'One-Time (F=1)', 'Repeat (F>=2)')

# 4. Inter-Purchase Intervals Sheet
completed_sorted = completed.sort_values(by=['Nama_Pembeli', 'Tanggal_Dibayar_Pembeli'])
intervals_list = []
trans_id = 1
for buyer, group in completed_sorted.groupby('Nama_Pembeli'):
    if len(group) > 1:
        dates = group['Tanggal_Dibayar_Pembeli'].values
        order_ids = group['Nomor_Pesanan'].values
        items = group['Nama_Produk'].values
        prices = group['Subtotal'].values
        for i in range(1, len(dates)):
            t_prev = pd.to_datetime(dates[i-1])
            t_curr = pd.to_datetime(dates[i])
            delta = t_curr - t_prev
            hours = delta.total_seconds() / 3600.0
            days = delta.total_seconds() / 86400.0
            same_day = (t_prev.date() == t_curr.date())
            
            if hours <= 1.0:
                bracket = '<= 1 Hour'
            elif hours <= 24.0:
                bracket = '1 - 24 Hours'
            elif hours <= 72.0:
                bracket = '1 - 3 Days (24-72h)'
            elif hours <= 168.0:
                bracket = '3 - 7 Days (72-168h)'
            elif hours <= 336.0:
                bracket = '7 - 14 Days'
            else:
                bracket = '> 14 Days'

            intervals_list.append({
                'Transition_ID': trans_id,
                'Buyer_Username': buyer,
                'Preceding_Order_ID': order_ids[i-1],
                'Preceding_Order_Time': t_prev,
                'Subsequent_Order_ID': order_ids[i],
                'Subsequent_Order_Time': t_curr,
                'Interval_Hours': round(hours, 2),
                'Interval_Days': round(days, 3),
                'Same_Calendar_Date': same_day,
                'Temporal_Bracket': bracket,
                'Subsequent_Product': items[i],
                'Subsequent_GTV': prices[i]
            })
            trans_id += 1

df_intervals = pd.DataFrame(intervals_list)

# 5. Frequency Brackets Sheet
f_brackets = [
    ('1 order (One-time)', 1, 1),
    ('2-3 orders', 2, 3),
    ('4-5 orders', 4, 5),
    ('6-10 orders', 6, 10),
    ('11-20 orders', 11, 20),
    ('> 20 orders', 21, 999)
]

fb_rows = []
for b_name, b_min, b_max in f_brackets:
    sub = cust_comp[(cust_comp['Completed_Orders'] >= b_min) & (cust_comp['Completed_Orders'] <= b_max)]
    fb_rows.append({
        'Frequency_Bracket': b_name,
        'Buyer_Count': len(sub),
        'Buyer_Percentage': round(len(sub) / len(cust_comp) * 100, 2),
        'Completed_Orders': sub['Completed_Orders'].sum(),
        'Order_Percentage': round(sub['Completed_Orders'].sum() / len(completed) * 100, 2),
        'Gross_Transaction_Value_IDR': sub['Gross_Transaction_Value'].sum(),
        'Revenue_Percentage': round(sub['Gross_Transaction_Value'].sum() / completed['Subtotal'].sum() * 100, 2)
    })
df_fb = pd.DataFrame(fb_rows)

# 6. Fulfillment Speed Sheet
df_fulfillment = completed[['Nomor_Pesanan', 'Nama_Pembeli', 'Tanggal_Dibayar_Pembeli', 'Tanggal_Dikirim', 'Durasi_Kirim_Menit', 'Subtotal']].copy()
df_fulfillment['Durasi_Kirim_Jam'] = round(df_fulfillment['Durasi_Kirim_Menit'] / 60.0, 2)
df_fulfillment['Speed_Category'] = np.select(
    [
        df_fulfillment['Durasi_Kirim_Menit'] <= 10,
        df_fulfillment['Durasi_Kirim_Menit'] <= 60,
        df_fulfillment['Durasi_Kirim_Menit'] > 60
    ],
    ['Fast (<= 10 mins)', 'Standard (10-60 mins)', 'Delayed (> 1 hour)'],
    default='Unknown'
)

# 7. Write to Excel workbook
out_xlsx_ws = r'C:\laragon\www\Monopoly\SISFOKOM_Analysis.xlsx'
out_xlsx_dl = r'C:\Users\fahru\Downloads\SISFOKOM_Analysis.xlsx'

with pd.ExcelWriter(out_xlsx_ws, engine='openpyxl') as writer:
    df_summary.to_excel(writer, sheet_name='Executive_Summary', index=False)
    cust_comp.to_excel(writer, sheet_name='Consumer_Pareto_Analysis', index=False)
    df_intervals.to_excel(writer, sheet_name='Inter_Purchase_Intervals', index=False)
    df_fb.to_excel(writer, sheet_name='Frequency_Brackets', index=False)
    df_fulfillment.to_excel(writer, sheet_name='Fulfillment_Speed', index=False)
    completed.to_excel(writer, sheet_name='Completed_Orders_Raw', index=False)
    df.to_excel(writer, sheet_name='All_1017_Orders_Raw', index=False)

shutil.copyfile(out_xlsx_ws, out_xlsx_dl)
print(f"Workbook successfully updated with 7 detailed sheets:\n1. {out_xlsx_ws}\n2. {out_xlsx_dl}")
