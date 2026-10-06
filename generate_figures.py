import os
import zipfile
import shutil
import pandas as pd
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

os.makedirs(r'C:\laragon\www\Monopoly\figures', exist_ok=True)
plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.serif'] = ['Times New Roman', 'DejaVu Serif', 'serif']
plt.rcParams['font.size'] = 9.5
plt.rcParams['axes.labelsize'] = 10
plt.rcParams['axes.titlesize'] = 10.5
plt.rcParams['xtick.labelsize'] = 9
plt.rcParams['ytick.labelsize'] = 9
plt.rcParams['legend.fontsize'] = 9
plt.rcParams['figure.titlesize'] = 11

# ==============================================================================
# 1. Figure 1: Research Analytical Workflow (Updated for 1,017 records & 922 completed)
# ==============================================================================
fig, ax = plt.subplots(figsize=(7.5, 3.8), dpi=300)
ax.axis('off')
boxes = [
    'Raw Transaction Logs\n(N = 1,017 Order Records)',
    'Data Cleaning & Filter\n(N = 922 Completed Orders)',
    'Consumer Identification\n(208 Unique Completed Buyers)',
    'Purchase Frequency ($F_i$)\nCalculation',
    'Cohort Segmentation\n(One-Time vs. Repeat)',
    'Inter-Purchase Interval\n($I_{i,j}$) Computation ($N=714$)',
    'Descriptive Analytics &\nPareto Concentration',
    'Empirical Interpretation &\nIS Marketplace Insights'
]

cols = 4
for i, text in enumerate(boxes):
    r = i // cols
    c = i % cols
    if r == 1:
        c = cols - 1 - c # snake back
    x = c * 2.1 + 0.2
    y = 2.4 - r * 1.7
    rect = plt.Rectangle((x, y), 1.75, 0.95, facecolor='#f4f7f9', edgecolor='#1a365d', linewidth=1.2, zorder=2)
    ax.add_patch(rect)
    ax.text(x + 0.875, y + 0.475, text, ha='center', va='center', fontsize=8, fontweight='bold', color='#0f172a', zorder=3)

for c in range(3):
    ax.annotate('', xy=(c * 2.1 + 0.2 + 1.75 + 0.35, 2.875), xytext=(c * 2.1 + 0.2 + 1.75, 2.875),
                arrowprops=dict(arrowstyle='->', lw=1.2, color='#1a365d'))
ax.annotate('', xy=(3 * 2.1 + 0.2 + 0.875, 2.4 - 1.7 + 0.98), xytext=(3 * 2.1 + 0.2 + 0.875, 2.38),
            arrowprops=dict(arrowstyle='->', lw=1.2, color='#1a365d'))
for c in range(3, 0, -1):
    x_curr = c * 2.1 + 0.2
    ax.annotate('', xy=(x_curr - 0.35, 2.4 - 1.7 + 0.475), xytext=(x_curr, 2.4 - 1.7 + 0.475),
                arrowprops=dict(arrowstyle='->', lw=1.2, color='#1a365d'))

ax.set_xlim(0, 8.8)
ax.set_ylim(0.3, 3.6)
fig.tight_layout()
fig.savefig(r'C:\laragon\www\Monopoly\figures\Figure1_Research_Workflow.png', dpi=300)
plt.close(fig)

# ==============================================================================
# 2. Figure 2: One-Time vs Repeat Buyers Comparison (Exact N=922 Completed Orders)
# ==============================================================================
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(7.5, 3.2), dpi=300)
categories = ['One-Time Buyers\n(F = 1)', 'Repeat Buyers\n(F >= 2)']
cust_pcts = [37.98, 62.02] # 79 vs 129
order_pcts = [8.57, 91.43] # 79 vs 843
rev_millions = [1.3358, 29.4582] # Gross Transaction Value in Million IDR

x = np.arange(len(categories))
width = 0.32

ax1.bar(x - width/2, cust_pcts, width, label='% of Consumers', color='#4682b4', edgecolor='black', lw=0.8)
ax1.bar(x + width/2, order_pcts, width, label='% of Total Orders', color='#1b2631', edgecolor='black', lw=0.8)
ax1.set_ylabel('Percentage (%)')
ax1.set_title('(a) Consumer Base vs. Order Volume')
ax1.set_xticks(x)
ax1.set_xticklabels(categories)
ax1.set_ylim(0, 105)
ax1.legend(loc='upper left', frameon=True, framealpha=0.9)
for i in x:
    ax1.text(i - width/2, cust_pcts[i] + 2, f'{cust_pcts[i]:.1f}%', ha='center', fontsize=8)
    ax1.text(i + width/2, order_pcts[i] + 2, f'{order_pcts[i]:.1f}%', ha='center', fontsize=8)

ax2.bar(categories, rev_millions, color=['#707b7c', '#1b4f72'], edgecolor='black', width=0.45, lw=0.8)
ax2.set_ylabel('Gross Transaction Value (Million IDR)')
ax2.set_title('(b) Gross Revenue Contribution')
ax2.set_ylim(0, 34)
for i, v in enumerate(rev_millions):
    pct = [4.34, 95.66][i]
    ax2.text(i, v + 0.8, f'IDR {v:.2f}M\n({pct:.1f}%)', ha='center', fontsize=8)

fig.tight_layout()
fig.savefig(r'C:\laragon\www\Monopoly\figures\Figure2_OneTime_vs_Repeat_Buyers.png', dpi=300)
plt.close(fig)

# ==============================================================================
# 3. Figure 3: Purchase Frequency Tier Distribution (N=208 Completed Buyers)
# ==============================================================================
tiers = ['1\n(One-time)', '2 - 3\n(Low)', '4 - 5\n(Moderate)', '6 - 10\n(High)', '11 - 20\n(V. High)', '> 20\n(Power)']
tier_cust = [79, 60, 25, 30, 7, 7]
tier_orders = [79, 141, 109, 220, 100, 273]

fig, ax1 = plt.subplots(figsize=(7.5, 3.4), dpi=300)
x = np.arange(len(tiers))
width = 0.35

color1 = '#2e4053'
color2 = '#d4ac0d'

rects1 = ax1.bar(x - width/2, tier_cust, width, label='Number of Consumers', color=color1, edgecolor='black', lw=0.8)
ax1.set_ylabel('Consumer Count', color=color1, fontweight='bold')
ax1.tick_params(axis='y', labelcolor=color1)
ax1.set_xticks(x)
ax1.set_xticklabels(tiers)
ax1.set_xlabel('Purchase Frequency Brackets (Orders per Consumer)')
ax1.set_ylim(0, 95)

ax2 = ax1.twinx()
rects2 = ax2.bar(x + width/2, tier_orders, width, label='Total Completed Orders', color=color2, edgecolor='black', lw=0.8)
ax2.set_ylabel('Total Completed Orders', color='#9a7d0a', fontweight='bold')
ax2.tick_params(axis='y', labelcolor='#9a7d0a')
ax2.set_ylim(0, 310)

for rect in rects1:
    h = rect.get_height()
    ax1.annotate(f'{h}', xy=(rect.get_x() + rect.get_width() / 2, h),
                 xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=8)

for rect in rects2:
    h = rect.get_height()
    ax2.annotate(f'{h}', xy=(rect.get_x() + rect.get_width() / 2, h),
                 xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=8, fontweight='bold')

lines1, labels1 = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper right', frameon=True, framealpha=0.9)

plt.title('Consumer Distribution and Completed Orders Across Frequency Brackets', pad=12)
fig.tight_layout()
fig.savefig(r'C:\laragon\www\Monopoly\figures\Figure3_Purchase_Frequency_Distribution.png', dpi=300)
plt.close(fig)

# ==============================================================================
# 4. Figure 4: Inter-Transaction Interval Distribution (N=714 Transitions)
# ==============================================================================
# Load actual interval data
df = pd.read_csv(r'C:\laragon\www\Monopoly\dataset_itemku_3bulan.csv')
for col in ['Tanggal_Dibayar_Pembeli', 'Tanggal_Dikirim']:
    df[col] = pd.to_datetime(df[col], errors='coerce')

completed = df[df['Status_Pesanan'] == 'Pesanan selesai'].sort_values(by=['Nama_Pembeli', 'Tanggal_Dibayar_Pembeli'])
intervals_hours = []
intervals_days = []

for buyer, group in completed.groupby('Nama_Pembeli'):
    if len(group) > 1:
        dates = group['Tanggal_Dibayar_Pembeli'].values
        for i in range(1, len(dates)):
            delta = pd.to_datetime(dates[i]) - pd.to_datetime(dates[i-1])
            intervals_hours.append(delta.total_seconds() / 3600.0)
            intervals_days.append(delta.total_seconds() / 86400.0)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(7.5, 3.2), dpi=300)

# (a) Histogram: focus on 0 to 72 hours
hours_subset = [h for h in intervals_hours if h <= 72]
bins = np.linspace(0, 72, 25)
ax1.hist(hours_subset, bins=bins, color='#2874a6', edgecolor='black', lw=0.8, alpha=0.85)
ax1.set_xlabel('Inter-Purchase Interval (Hours, <= 72h)')
ax1.set_ylabel('Number of Transitions')
ax1.set_title('(a) Interval Distribution (0 - 72 Hours)')
ax1.axvline(np.median(intervals_hours), color='red', linestyle='--', linewidth=1.2, label=f'Median: {np.median(intervals_hours):.2f} h')
ax1.axvline(np.percentile(intervals_hours, 75), color='darkorange', linestyle=':', linewidth=1.2, label=f'Q3: {np.percentile(intervals_hours, 75):.2f} h')
ax1.legend(loc='upper right')

# (b) Boxplot of intervals in days
bp = ax2.boxplot(intervals_days, vert=True, patch_artist=True,
                 boxprops=dict(facecolor='#aed6f1', color='#1b4f72'),
                 whiskerprops=dict(color='#1b4f72', lw=1.2),
                 capprops=dict(color='#1b4f72', lw=1.2),
                 medianprops=dict(color='red', lw=1.5),
                 flierprops=dict(marker='o', markerfacecolor='#e74c3c', markersize=4, alpha=0.6))
ax2.set_ylabel('Interval Duration (Calendar Days)')
ax2.set_title('(b) Boxplot of Interval Durations (Full)')
ax2.set_xticklabels(['Consecutive\nTransitions (N=714)'])

fig.tight_layout()
fig.savefig(r'C:\laragon\www\Monopoly\figures\Figure4_Inter_Transaction_Intervals.png', dpi=300)
plt.close(fig)

# ==============================================================================
# 5. Figure 5: Temporal Daily Order Trend Across the Observation Window
# ==============================================================================
daily_comp = completed.groupby(completed['Tanggal_Dibayar_Pembeli'].dt.date).size()
dates = pd.to_datetime(daily_comp.index)
counts = daily_comp.values

fig, ax = plt.subplots(figsize=(7.5, 3.2), dpi=300)
ax.plot(dates, counts, color='#1b4f72', lw=1.5, marker='o', markersize=3, label='Daily Completed Orders')
ax.axhline(np.mean(counts), color='#e74c3c', linestyle='--', lw=1.2, label=f'Daily Mean: {np.mean(counts):.1f} Orders')
ax.fill_between(dates, counts, alpha=0.15, color='#2980b9')

ax.set_ylabel('Completed Orders per Day')
ax.set_xlabel('Date (June - September 2026)')
ax.set_title('Daily Completed Order Trend Across 94-Day Observation Window')
ax.grid(True, linestyle=':', alpha=0.6)
ax.legend(loc='upper right')

fig.tight_layout()
fig.savefig(r'C:\laragon\www\Monopoly\figures\Figure5_Temporal_Daily_Pattern.png', dpi=300)
plt.close(fig)

# Zip figures for easy user access
zip_path = r'C:\laragon\www\Monopoly\SISFOKOM_Figures.zip'
zip_dl = r'C:\Users\fahru\Downloads\SISFOKOM_Figures.zip'
with zipfile.ZipFile(zip_path, 'w') as zf:
    for f in os.listdir(r'C:\laragon\www\Monopoly\figures'):
        if f.endswith('.png'):
            zf.write(os.path.join(r'C:\laragon\www\Monopoly\figures', f), f)

shutil.copyfile(zip_path, zip_dl)
print(f"Generated 5 figures and zipped to {zip_path} and {zip_dl}")
