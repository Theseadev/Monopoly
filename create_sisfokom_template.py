import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_section_columns(section, num_cols=2, space_twips=400):
    sectPr = section._sectPr
    # remove existing w:cols if any
    for child in sectPr.findall(qn('w:cols')):
        sectPr.remove(child)
    cols_elem = parse_xml(f'<w:cols {nsdecls("w")} w:num="{num_cols}" w:space="{space_twips}"/>')
    sectPr.append(cols_elem)

def set_continuous_section(section):
    sectPr = section._sectPr
    for child in sectPr.findall(qn('w:type')):
        sectPr.remove(child)
    type_elem = parse_xml(f'<w:type {nsdecls("w")} w:val="continuous"/>')
    sectPr.append(type_elem)

def create_sisfokom_template_doc():
    doc = docx.Document()
    
    # Section 1: Header + Title + Authors + Abstracts (Single Column)
    sec1 = doc.sections[0]
    sec1.page_width = Inches(8.27)
    sec1.page_height = Inches(11.69)
    sec1.top_margin = Inches(0.8)
    sec1.bottom_margin = Inches(0.8)
    sec1.left_margin = Inches(0.8)
    sec1.right_margin = Inches(0.8)

    # Header in Section 1
    header = sec1.header
    p_hdr = header.paragraphs[0]
    p_hdr.paragraph_format.space_after = Pt(0)
    p_hdr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r_hdr = p_hdr.add_run("Jurnal Sisfokom (Sistem Informasi dan Komputer), Volume 15, Nomor 03, 2026\np-ISSN: 2301-7988, e-ISSN: 2581-0588")
    r_hdr.font.name = 'Times New Roman'
    r_hdr.font.size = Pt(8.5)
    r_hdr.font.italic = True
    r_hdr.font.color.rgb = RGBColor(100, 100, 100)

    # Sisfokom Top Bar Header Table
    t_top = doc.add_table(rows=1, cols=2)
    t_top.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_top.autofit = False
    t_top.columns[0].width = Inches(4.2)
    t_top.columns[1].width = Inches(2.4)
    
    c_left = t_top.cell(0, 0)
    p_tl = c_left.paragraphs[0]
    p_tl.paragraph_format.space_after = Pt(0)
    r_tl = p_tl.add_run("JURNAL SISFOKOM (Sistem Informasi dan Komputer)\nhttp://jurnal.atmaluhur.ac.id/index.php/sisfokom")
    r_tl.font.name = 'Times New Roman'
    r_tl.font.size = Pt(8.5)
    r_tl.bold = True
    r_tl.font.color.rgb = RGBColor(0, 51, 102)

    c_right = t_top.cell(0, 1)
    p_tr = c_right.paragraphs[0]
    p_tr.paragraph_format.space_after = Pt(0)
    p_tr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r_tr = p_tr.add_run("p-ISSN: 2301-7988\ne-ISSN: 2581-0588\nSINTA 3 Accredited")
    r_tr.font.name = 'Times New Roman'
    r_tr.font.size = Pt(8)
    r_tr.font.color.rgb = RGBColor(120, 120, 120)

    # Decorative line
    p_line = doc.add_paragraph()
    p_line.paragraph_format.space_before = Pt(4)
    p_line.paragraph_format.space_after = Pt(14)
    r_line = p_line.add_run("_________________________________________________________________________________")
    r_line.font.color.rgb = RGBColor(0, 51, 102)
    p_line.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Article Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(12)
    r_title = p_title.add_run("Repeated Purchase Patterns of Consumers in a Roblox Virtual Goods Marketplace: An Analysis of Transaction Frequency and Inter-Transaction Intervals")
    r_title.bold = True
    r_title.font.name = 'Times New Roman'
    r_title.font.size = Pt(14)

    # Authors
    p_author = doc.add_paragraph()
    p_author.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_author.paragraph_format.space_after = Pt(4)
    r_author = p_author.add_run("Penulis Pertama1*, Penulis Kedua2")
    r_author.bold = True
    r_author.font.name = 'Times New Roman'
    r_author.font.size = Pt(10.5)

    # Affiliation
    p_aff = doc.add_paragraph()
    p_aff.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_aff.paragraph_format.space_after = Pt(14)
    r_aff = p_aff.add_run("1,2Program Studi Sistem Informasi, Fakultas Ilmu Komputer, Nama Universitas\nKota, Indonesia\n*email_korespondensi@kampus.ac.id")
    r_aff.font.name = 'Times New Roman'
    r_aff.font.size = Pt(9)
    r_aff.font.italic = True

    # Abstract Box
    t_abs = doc.add_table(rows=1, cols=1)
    t_abs.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_abs.autofit = False
    t_abs.columns[0].width = Inches(6.6)
    c_abs = t_abs.cell(0, 0)
    
    # Border styling for abstract box
    tcPr = c_abs._tc.get_or_add_tcPr()
    tcBorders = parse_xml(r'''
        <w:tcBorders {} >
            <w:top w:val="single" w:sz="6" w:space="0" w:color="003366"/>
            <w:left w:val="none"/>
            <w:bottom w:val="single" w:sz="6" w:space="0" w:color="003366"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    '''.format(nsdecls('w')))
    tcPr.append(tcBorders)

    # Indonesian Abstract inside Box
    p_abs_id = c_abs.paragraphs[0]
    p_abs_id.paragraph_format.space_before = Pt(4)
    p_abs_id.paragraph_format.space_after = Pt(4)
    p_abs_id.paragraph_format.line_spacing = 1.05
    p_abs_id.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r_lbl_id = p_abs_id.add_run("Abstrak— ")
    r_lbl_id.bold = True
    r_lbl_id.font.name = 'Times New Roman'
    r_lbl_id.font.size = Pt(9)
    r_txt_id = p_abs_id.add_run(
        "Pertumbuhan pesat platform game daring telah mendorong berkembangnya pasar sekunder untuk perdagangan barang virtual (virtual goods). "
        "Karakteristik transaksi pada pasar digital Customer-to-Customer (C2C) ini memiliki dinamika operasional yang berbeda dari e-commerce fisik. "
        "Penelitian ini bertujuan untuk menganalisis pola perilaku pembelian berulang (repeat purchase pattern) konsumen barang virtual Roblox pada platform marketplace Itemku "
        "melalui analisis frekuensi transaksi dan interval waktu antar-pembelian (inter-purchase time). Penelitian ini menggunakan metode kuantitatif observasional "
        "berbasis data sekunder sebanyak 1.017 log transaksi riil dari 233 konsumen unik selama periode 18 Juni hingga 19 September 2026. Analisis komparatif dilakukan "
        "antara kelompok pembeli sekali (one-time buyers) dan pembeli berulang (repeat buyers). Hasil penelitian menunjukkan bahwa pembeli berulang mewakili 60,94% "
        "dari total konsumen, menghasilkan 91,05% volume pesanan (926 transaksi), dan menyumbang 92,62% total omzet penjualan (Rp 12,97 Juta dari Rp 14,00 Juta). "
        "Analisis interval membuktikan adanya pola transaksi berulang cepat (session-driven micro-purchases), di mana rata-rata interval adalah 1,31 hari dengan median 0,00 hari "
        "(hari yang sama), serta 75% pesanan berulang terjadi dalam rentang waktu kurang dari 15,6 jam. Temuan ini menegaskan bahwa keberlanjutan bisnis barang virtual "
        "sangat bergantung pada retensi frekuensi transaksi mikro dalam sesi bermain aktif konsumen."
    )
    r_txt_id.font.name = 'Times New Roman'
    r_txt_id.font.size = Pt(9)

    # Keywords ID
    p_kw_id = c_abs.add_paragraph()
    p_kw_id.paragraph_format.space_after = Pt(6)
    r_kw_lbl_id = p_kw_id.add_run("Kata Kunci: ")
    r_kw_lbl_id.bold = True
    r_kw_lbl_id.font.name = 'Times New Roman'
    r_kw_lbl_id.font.size = Pt(9)
    r_kw_val_id = p_kw_id.add_run("Barang Virtual, E-Commerce C2C, Frekuensi Transaksi, Interval Pembelian, Pembelian Berulang, Roblox.")
    r_kw_val_id.font.name = 'Times New Roman'
    r_kw_val_id.font.size = Pt(9)
    r_kw_val_id.font.italic = True

    # English Abstract inside Box
    p_abs_en = c_abs.add_paragraph()
    p_abs_en.paragraph_format.space_before = Pt(4)
    p_abs_en.paragraph_format.space_after = Pt(4)
    p_abs_en.paragraph_format.line_spacing = 1.05
    p_abs_en.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r_lbl_en = p_abs_en.add_run("Abstract— ")
    r_lbl_en.bold = True
    r_lbl_en.font.name = 'Times New Roman'
    r_lbl_en.font.size = Pt(9)
    r_txt_en = p_abs_en.add_run(
        "The rapid expansion of online gaming platforms has fostered secondary markets for virtual goods trading. Transaction processing characteristics "
        "in this C2C digital marketplace possess distinct operational dynamics compared to conventional physical e-commerce. This study aims to analyze "
        "the repeat purchase patterns of Roblox virtual goods consumers on the Itemku marketplace platform by examining the dimensions of transaction frequency "
        "and inter-purchase intervals. This research employs an observational quantitative method based on the processing of actual secondary transaction log "
        "data comprising 1,017 clean orders from 233 unique consumers between June 18 and September 19, 2026. A comparative cohort analysis was conducted "
        "between one-time buyers and repeat buyers. The empirical results reveal that repeat buyers constitute 60.94% of the total consumer base, generate 91.05% "
        "of total order volume (926 orders), and contribute 92.62% of total gross revenue (IDR 12.97 Million of IDR 14.00 Million). Inter-purchase interval analysis "
        "demonstrates a rapid-session micro-purchasing pattern, with an average interval of 1.31 days, a median of 0.00 days, and 75% of repeat orders occurring "
        "within less than 15.6 hours. These findings confirm that virtual goods commerce operates on compressed temporal horizons heavily reliant on repeat micro-transactions."
    )
    r_txt_en.font.name = 'Times New Roman'
    r_txt_en.font.size = Pt(9)
    r_txt_en.font.italic = True

    # Keywords EN
    p_kw_en = c_abs.add_paragraph()
    p_kw_en.paragraph_format.space_after = Pt(4)
    r_kw_lbl_en = p_kw_en.add_run("Keywords: ")
    r_kw_lbl_en.bold = True
    r_kw_lbl_en.font.name = 'Times New Roman'
    r_kw_lbl_en.font.size = Pt(9)
    r_kw_val_en = p_kw_en.add_run("C2C E-Commerce, Inter-Purchase Interval, Purchase Frequency, Repeat Purchase, Roblox, Virtual Goods.")
    r_kw_val_en.font.name = 'Times New Roman'
    r_kw_val_en.font.size = Pt(9)
    r_kw_val_en.font.italic = True

    # Spacer before body
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(4)
    p_sp.paragraph_format.space_after = Pt(4)

    # -------------------------------------------------------------
    # SECTION 2: 2-COLUMN BODY
    # -------------------------------------------------------------
    sec2 = doc.add_section()
    set_continuous_section(sec2)
    set_section_columns(sec2, num_cols=2, space_twips=360) # 0.25 inch column gap
    sec2.top_margin = Inches(0.8)
    sec2.bottom_margin = Inches(0.8)
    sec2.left_margin = Inches(0.8)
    sec2.right_margin = Inches(0.8)

    def add_sec_heading(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(10)
        h.paragraph_format.space_after = Pt(3)
        h.paragraph_format.line_spacing = 1.05
        r = h.add_run(text)
        r.bold = True
        r.font.name = 'Times New Roman'
        r.font.size = Pt(10)
        return h

    def add_sec_subheading(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(6)
        h.paragraph_format.space_after = Pt(2)
        h.paragraph_format.line_spacing = 1.05
        r = h.add_run(text)
        r.bold = True
        r.font.name = 'Times New Roman'
        r.font.size = Pt(9.5)
        return h

    def add_p(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.05
        p.paragraph_format.first_line_indent = Inches(0.2)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(9.5)
        return p

    def format_open_table(table):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        for row_idx, row in enumerate(table.rows):
            for cell in row.cells:
                cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                tcPr = cell._tc.get_or_add_tcPr()
                # Remove default borders
                for b in tcPr.findall(qn('w:tcBorders')):
                    tcPr.remove(b)
                # Apply top and bottom horizontal borders only
                if row_idx == 0:
                    tcBorders = parse_xml(r'''
                        <w:tcBorders {} >
                            <w:top w:val="single" w:sz="8" w:space="0" w:color="000000"/>
                            <w:left w:val="none"/>
                            <w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                            <w:right w:val="none"/>
                        </w:tcBorders>
                    '''.format(nsdecls('w')))
                    shading = parse_xml(r'<w:shd {} w:fill="F2F2F2"/>'.format(nsdecls('w')))
                    tcPr.append(shading)
                elif row_idx == len(table.rows) - 1:
                    tcBorders = parse_xml(r'''
                        <w:tcBorders {} >
                            <w:top w:val="none"/>
                            <w:left w:val="none"/>
                            <w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/>
                            <w:right w:val="none"/>
                        </w:tcBorders>
                    '''.format(nsdecls('w')))
                else:
                    tcBorders = parse_xml(r'''
                        <w:tcBorders {} >
                            <w:top w:val="none"/>
                            <w:left w:val="none"/>
                            <w:bottom w:val="none"/>
                            <w:right w:val="none"/>
                        </w:tcBorders>
                    '''.format(nsdecls('w')))
                tcPr.append(tcBorders)

    # I. PENDAHULUAN
    add_sec_heading("I. PENDAHULUAN")
    add_p(
        "Perkembangan teknologi komputasi dan internet telah mentransformasi industri hiburan digital secara fundamental, salah satunya melalui platform "
        "game berbasis komunitas seperti Roblox yang memfasilitasi jutaan interaksi ekonomi virtual setiap harinya [1]. Dalam ekosistem ini, barang virtual "
        "(virtual goods) berupa aksesoris, hewan peliharaan (pets), dan item penguat kemampuan game menjadi komoditas ekonomi yang memiliki nilai utilitas riil "
        "bagi penggunanya [2]. Kebutuhan pemain untuk memperoleh aset digital langka secara lebih fleksibel telah memicu pembentukan pasar sekunder "
        "pihak ketiga (third-party C2C marketplace), seperti platform Itemku di Indonesia."
    )
    add_p(
        "Dalam bidang Sistem Informasi bisnis dan analitika e-commerce, pemrosesan data log transaksi sekunder (transaction data processing) stanowi "
        "fondasi utama untuk memahami efisiensi operasional dan pola perilaku aktual konsumen [3]. Salah satu indikator performa paling esensial dalam analitika "
        "pelanggan adalah perilaku pembelian berulang (repeat purchase behavior) [4]. Pada e-commerce barang fisik, interval dan frekuensi transaksi dipengaruhi "
        "oleh logistik pengiriman fisik dan masa pakai produk [5]. Sebaliknya, barang virtual memiliki karakteristik unik berupa wujud non-fisik (intangible), "
        "biaya marjinal nol, dan konsumsi seketika dalam sesi bermain [6]."
    )
    add_p(
        "Sebagian besar literatur terdahulu mengenai barang virtual lebih banyak mengeksplorasi motivasi psikologis melalui kuesioner persepsi, seperti "
        "Technology Acceptance Model (TAM) dan Theory of Planned Behavior [7], [8]. Namun, masih sangat terbatas penelitian empiris yang mengevaluasi "
        "data log transaksi aktual pada pasar sekunder C2C untuk membedah bagaimana distribusi frekuensi transaksi dan interval waktu antar-pembelian "
        "(inter-purchase time) terbentuk secara riil. Ketiadaan analisis berbasis data transaksi ini menjadi celah penelitian (research gap) yang mendasari studi ini."
    )
    add_p(
        "Penelitian ini bertujuan untuk menganalisis pola pembelian berulang konsumen pada marketplace barang virtual Roblox melalui pendekatan analitika data "
        "transaksi sekunder. Tiga pertanyaan penelitian (Research Questions) yang dijawab adalah: (RQ1) Bagaimana distribusi struktural konsumen saat disegmentasikan "
        "menjadi pembeli sekali dan pembeli berulang? (RQ2) Bagaimana karakteristik distribusi frekuensi transaksi pada basis konsumen? dan (RQ3) Bagaimana pola "
        "temporal interval waktu antar-transaksi yang terbentuk pada pembeli berulang?"
    )

    # II. METODE PENELITIAN
    add_sec_heading("II. METODE PENELITIAN")
    add_sec_subheading("A. Desain Penelitian dan Sumber Data")
    add_p(
        "Penelitian ini menerapkan pendekatan kuantitatif deskriptif-observasional berbasis data sekunder. Data yang dianalisis merupakan catatan log transaksi "
        "aktual dari entitas penjual aktif di marketplace Itemku untuk kategori produk game Roblox (khususnya sub-game Build A Zoo dan Chop Your Tree). "
        "Periode observasi mencakup 94 hari kalender berturut-turut, dari 18 Juni 2026 hingga 19 September 2026. Dataset gabungan mencakup 1.017 transaksi bersih "
        "dari 233 akun konsumen unik pada 337 judul item digital yang terdaftar."
    )

    add_sec_subheading("B. Operasionalisasi Variabel Dataset")
    add_p(
        "Variabel-variabel utama yang diekstraksi dari skema database transaksi dirangkum pada Tabel I."
    )

    # Table 1 in 2-col
    p_t1_lbl = doc.add_paragraph()
    p_t1_lbl.paragraph_format.space_before = Pt(4)
    p_t1_lbl.paragraph_format.space_after = Pt(2)
    r_t1_lbl = p_t1_lbl.add_run("TABEL I\nVARIABEL DATASET DAN DEFINISI OPERASIONAL")
    r_t1_lbl.bold = True
    r_t1_lbl.font.name = 'Times New Roman'
    r_t1_lbl.font.size = Pt(8.5)
    p_t1_lbl.alignment = WD_ALIGN_PARAGRAPH.CENTER

    t1 = doc.add_table(rows=7, cols=3)
    format_open_table(t1)
    t1.columns[0].width = Inches(1.1)
    t1.columns[1].width = Inches(1.3)
    t1.columns[2].width = Inches(0.8)
    
    headers_t1 = ["Variabel", "Deskripsi Operasional", "Tipe Data"]
    for i, h in enumerate(headers_t1):
        cell = t1.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(1)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = 'Times New Roman'
        r.font.size = Pt(8)

    t1_data = [
        ("Nomor_Pesanan", "ID unik pengenal transaksi", "String"),
        ("Nama_Pembeli", "ID unik anonim akun konsumen", "String"),
        ("Tanggal_Dibayar", "Timestamp pembayaran lunas (WIB)", "Datetime"),
        ("Tanggal_Dikirim", "Timestamp penyelesaian kirim item", "Datetime"),
        ("Harga_Jual", "Nominal transaksi bruto (Rp)", "Integer"),
        ("Status_Pesanan", "Status akhir pesanan sistem", "Categorical")
    ]
    for row_idx, data in enumerate(t1_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t1.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(1)
            r = cell.paragraphs[0].add_run(text)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(7.5)

    add_sec_subheading("C. Pembersihan Data dan Klasifikasi Konsumen")
    add_p(
        "Audit data memastikan tidak terdapat duplikasi Nomor_Pesanan (0 duplikat). Variabel kunci tidak memiliki nilai kosong (0% missing). "
        "Status pesanan mencakup 922 Selesai (90,66%), 77 Dana Dikembalikan (7,57%), dan 18 Konfirmasi Pembeli (1,77%). Harga jual berkisar "
        "antara Rp 200 hingga Rp 850.000 (Rata-rata = Rp 13.771,98, Median = Rp 2.000)."
    )
    add_p(
        "Konsumen diklasifikasikan secara objektif berdasarkan jumlah transaksi tercatat: Pembeli Sekali (One-Time Buyer) didefinisikan memiliki tepat 1 transaksi "
        "(Fi = 1), sedangkan Pembeli Berulang (Repeat Buyer) memiliki 2 transaksi atau lebih (Fi >= 2). Frekuensi pembelian dirumuskan sebagai:\n"
        "Fi = Ni                                                    (1)\n"
        "di mana Ni adalah total akumulasi transaksi oleh konsumen i."
    )
    add_p(
        "Untuk pembeli berulang, seluruh pesanan diurutkan secara kronologis berdasarkan Tanggal_Dibayar_Pembeli. Interval antar-transaksi I(i,j) dirumuskan sebagai:\n"
        "I(i,j) = T(i,j) - T(i,j-1)                                  (2)\n"
        "di mana T(i,j) adalah timestamp transaksi ke-j dan T(i,j-1) adalah timestamp transaksi sebelumnya, dihitung dalam satuan hari dan jam."
    )

    # III. HASIL DAN PEMBAHASAN
    add_sec_heading("III. HASIL DAN PEMBAHASAN")
    add_sec_subheading("A. Karakteristik Umum dan Durasi Layanan")
    add_p(
        "Selama 94 hari pengamatan, 1.017 transaksi menghasilkan total perputaran omzet kotor sebesar Rp 14.006.100. Analisis terhadap 941 pesanan terkirim "
        "menunjukkan rata-rata waktu pemenuhan pesanan sebesar 294,8 menit (~4,91 jam) dengan median 61,4 menit (~1,02 jam). Sebanyak 50,48% pesanan "
        "membutuhkan waktu lebih dari 1 jam, yang merefleksikan model operasional pengiriman manual di dalam game (in-game trade) oleh pedagang mikro."
    )

    add_sec_subheading("B. Analisis Komparatif Segmen Konsumen")
    add_p(
        "Perbandingan empiris antara segmen pembeli sekali dan pembeli berulang disajikan pada Tabel II."
    )

    # Table 2 in 2-col
    p_t2_lbl = doc.add_paragraph()
    p_t2_lbl.paragraph_format.space_before = Pt(4)
    p_t2_lbl.paragraph_format.space_after = Pt(2)
    r_t2_lbl = p_t2_lbl.add_run("TABEL II\nPERBANDINGAN PEMBELI SEKALI VS BERULANG")
    r_t2_lbl.bold = True
    r_t2_lbl.font.name = 'Times New Roman'
    r_t2_lbl.font.size = Pt(8.5)
    p_t2_lbl.alignment = WD_ALIGN_PARAGRAPH.CENTER

    t2 = doc.add_table(rows=7, cols=3)
    format_open_table(t2)
    t2.columns[0].width = Inches(1.3)
    t2.columns[1].width = Inches(0.9)
    t2.columns[2].width = Inches(1.0)

    headers_t2 = ["Parameter Metrik", "Pembeli Sekali (F=1)", "Pembeli Berulang (F>=2)"]
    for i, h in enumerate(headers_t2):
        cell = t2.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(1)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = 'Times New Roman'
        r.font.size = Pt(8)

    t2_data = [
        ("Jumlah Konsumen Unik", "91 (39,06%)", "142 (60,94%)"),
        ("Volume Pesanan", "91 (8,95%)", "926 (91,05%)"),
        ("Kontribusi Omzet (Rp)", "Rp 1.034.300 (7,38%)", "Rp 12.971.800 (92,62%)"),
        ("Rata-rata Nilai Order", "Rp 11.365,93", "Rp 7.881,13"),
        ("Median Nilai Order", "Rp 1.000,00", "Rp 1.450,00"),
        ("Rata-rata Waktu Tunggu", "233,91 Menit", "214,17 Menit")
    ]
    for row_idx, data in enumerate(t2_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t2.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(1)
            r = cell.paragraphs[0].add_run(text)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(7.5)

    add_p(
        "Sebagaimana tertera pada Tabel II, pembeli berulang mendominasi sebesar 60,94% populasi konsumen (142 dari 233 orang) dan menghasilkan 91,05% "
        "volume pesanan (926 transaksi) serta 92,62% total perputaran omzet (Rp 12,97 Juta). Hal ini menunjukkan konsentrasi Pareto yang sangat kuat, "
        "di mana keberlangsungan operasional penjual ditopang secara masif oleh retensi transaksi berulang."
    )

    add_sec_subheading("C. Distribusi Frekuensi Transaksi")
    add_p(
        "Rata-rata frekuensi pembelian pada kelompok pembeli berulang adalah 6,52 transaksi per konsumen. Tabel III menyajikan stratifikasi konsumen "
        "berdasarkan kelompok frekuensi transaksi."
    )

    # Table 3 in 2-col
    p_t3_lbl = doc.add_paragraph()
    p_t3_lbl.paragraph_format.space_before = Pt(4)
    p_t3_lbl.paragraph_format.space_after = Pt(2)
    r_t3_lbl = p_t3_lbl.add_run("TABEL III\nDISTRIBUSI TIER FREKUENSI TRANSAKSI KONSUMEN")
    r_t3_lbl.bold = True
    r_t3_lbl.font.name = 'Times New Roman'
    r_t3_lbl.font.size = Pt(8.5)
    p_t3_lbl.alignment = WD_ALIGN_PARAGRAPH.CENTER

    t3 = doc.add_table(rows=6, cols=3)
    format_open_table(t3)
    t3.columns[0].width = Inches(1.3)
    t3.columns[1].width = Inches(0.9)
    t3.columns[2].width = Inches(1.0)

    headers_t3 = ["Tier Frekuensi", "Jumlah Konsumen", "Akumulasi Pesanan"]
    for i, h in enumerate(headers_t3):
        cell = t3.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(1)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = 'Times New Roman'
        r.font.size = Pt(8)

    t3_data = [
        ("1x Transaksi (One-time)", "91 (39,06%)", "91 Pesanan"),
        ("2 - 5x Transaksi", "93 (39,91%)", "287 Pesanan"),
        ("6 - 15x Transaksi", "35 (15,02%)", "314 Pesanan"),
        ("16 - 50x Transaksi", "13 (5,58%)", "423 Pesanan"),
        ("> 50x Transaksi (Power)", "1 (0,43%)", "102 Pesanan")
    ]
    for row_idx, data in enumerate(t3_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t3.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(1)
            r = cell.paragraphs[0].add_run(text)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(7.5)

    add_p(
        "Tabel III memperlihatkan bahwa 14 konsumen teratas (6,01% total konsumen) menghasilkan 525 transaksi (51,62% total transaksi toko). "
        "Frekuensi tertinggi tercatat pada konsumen Sam Shears dengan 102 kali transaksi (total belanja Rp 4.197.500), diikuti Lynn geasley sebanyak 50 kali "
        "(Rp 1.018.300), dan betty murakami sebanyak 33 kali."
    )

    add_sec_subheading("D. Distribusi Interval Waktu Pembelian Ulang")
    add_p(
        "Pengukuran jarak waktu antar-pesanan pada 784 pasangan transaksi berulang berurutan disajikan pada Tabel IV."
    )

    # Table 4 in 2-col
    p_t4_lbl = doc.add_paragraph()
    p_t4_lbl.paragraph_format.space_before = Pt(4)
    p_t4_lbl.paragraph_format.space_after = Pt(2)
    r_t4_lbl = p_t4_lbl.add_run("TABEL IV\nSTATISTIK INTERVAL PEMBELIAN ULANG")
    r_t4_lbl.bold = True
    r_t4_lbl.font.name = 'Times New Roman'
    r_t4_lbl.font.size = Pt(8.5)
    p_t4_lbl.alignment = WD_ALIGN_PARAGRAPH.CENTER

    t4 = doc.add_table(rows=7, cols=2)
    format_open_table(t4)
    t4.columns[0].width = Inches(1.8)
    t4.columns[1].width = Inches(1.4)

    headers_t4 = ["Parameter Statistik", "Nilai Interval (Hari & Jam)"]
    for i, h in enumerate(headers_t4):
        cell = t4.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(1)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = 'Times New Roman'
        r.font.size = Pt(8)

    t4_data = [
        ("Jumlah Pasangan Transaksi (N)", "784 Interval"),
        ("Rata-rata (Mean)", "1,31 Hari (~31,44 Jam)"),
        ("Median (Q2)", "0,00 Hari (< 1 Jam / Hari sama)"),
        ("Kuartil Bawah (Q1 - 25%)", "0,00 Hari (Seketika)"),
        ("Kuartil Atas (Q3 - 75%)", "0,65 Hari (~15,60 Jam)"),
        ("Interval Maksimum", "49,77 Hari (~1.194,5 Jam)")
    ]
    for row_idx, data in enumerate(t4_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t4.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(1)
            r = cell.paragraphs[0].add_run(text)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(7.5)

    add_p(
        "Distribusi interval pada Tabel IV menunjukkan sifat zero-inflated yang sangat pekat: median interval bernilai 0,00 hari dan 75% pesanan ulang "
        "terjadi dalam rentang waktu kurang dari 15,60 jam (Q3 = 0,65 hari). Hal ini membuktikan bahwa transaksi berulang terjadi secara rapat dalam "
        "sesi bermain aktif yang sama."
    )

    add_sec_subheading("E. Pembahasan")
    add_p(
        "Temuan empiris ini memberikan wawasan penting bagi sistem informasi dan analitika perilaku konsumen digital:\n"
        "1. Pola Pembelian Terikat Sesi Bermain: Transaksi berulang pada barang virtual Roblox bersifat rapid snacking micro-purchases, di mana keputusan membeli "
        "kembali muncul dalam hitungan jam saat pemain membutuhkan progresivitas instan di dalam game.\n"
        "2. Karakteristik Toleransi Waktu Layanan: Tingginya retensi pembeli (60,94%) tetap bertahan meski rata-rata waktu pemrosesan mencapai 3,57 jam. "
        "Pada pasar barang digital sekunder, kepastian pengiriman dan keandalan toko menjadi parameter yang mengimbangi waktu tunggu non-instan.\n"
        "3. Konteks Strategi Operasional: Praktik penjual yang kerap menyertakan bonus item saat terjadi penyesuaian layanan berfungsi sebagai stimulus pengikat "
        "(lock-in mechanism) yang memperkuat hubungan transaksional."
    )

    # IV. KESIMPULAN
    add_sec_heading("IV. KESIMPULAN")
    add_p(
        "Penelitian ini menyimpulkan bahwa perilaku pembelian berulang pada marketplace barang virtual Roblox ditandai oleh konsentrasi pendapatan yang sangat "
        "tinggi pada segmen pembeli berulang (92,62%), nilai transaksi rata-rata yang bersifat mikro, dan interval waktu antar-pembelian yang sangat singkat "
        "(75% terjadi dalam waktu < 15,60 jam pada sesi bermain aktif yang sama)."
    )
    add_p(
        "Implikasi Praktis dan Sistem: Pengembang sistem informasi e-commerce dan penjual mikro perlu menyelaraskan ketersediaan layanan pada jam-jam puncak "
        "bermain game (malam hari) guna menangkap aliran transaksi mikro beruntun dari konsumen loyal."
    )
    add_p(
        "Keterbatasan dan Saran: Penelitian ini dibatasi oleh penggunaan data observasional tunggal tanpa pengukuran langsung variabel psikologis batin pembeli. "
        "Penelitian selanjutnya disarankan untuk mengintegrasikan data log transaksi dengan instrumen survei kepuasan guna mengukur korelasi persepsi nilai secara komprehensif."
    )

    # DAFTAR PUSTAKA
    add_sec_heading("DAFTAR PUSTAKA")
    refs = [
        "[1] J. Hamari and V. Lehdonvirta, \"Game design as marketing: How game mechanics create demand for virtual goods,\" Int. J. Bus. Sci. Appl. Manag., vol. 5, no. 1, pp. 14-29, 2010.",
        "[2] V. Lehdonvirta, \"Virtual item sales as a revenue model: Identifying attributes that drive purchase decisions,\" Electron. Commer. Res., vol. 9, no. 1-2, pp. 97-113, 2009.",
        "[3] P. S. Fader, B. G. Hardie, and K. L. Lee, \"RFM and CLV: Using iso-value curves for customer base analysis,\" J. Mark. Res., vol. 42, no. 4, pp. 415-430, 2005.",
        "[4] P. K. Hellier, G. M. Geursen, R. A. Carr, and J. A. Rickard, \"Customer repurchase intention: A general structural equation model,\" Eur. J. Mark., vol. 37, no. 11/12, pp. 1762-1800, 2003.",
        "[5] P. K. Chintagunta, J. Chu, and J. Cebollada, \"Quantifying transaction costs in online/off-line grocery channel choice,\" Mark. Sci., vol. 31, no. 1, pp. 96-114, 2012.",
        "[6] J. A. Fairfield, \"Virtual property,\" Boston Univ. Law Rev., vol. 85, pp. 1047-1102, 2005.",
        "[7] J. Hamari, \"Why do people buy virtual goods? Attitude towards virtual good purchases versus purchase intention,\" Int. J. Inf. Manage., vol. 35, no. 3, pp. 299-308, 2015.",
        "[8] R. L. Oliver, \"Whence consumer loyalty?,\" J. Mark., vol. 63, no. 4_suppl1, pp. 33-44, 1999."
    ]
    for r_text in refs:
        p_ref = doc.add_paragraph()
        p_ref.paragraph_format.space_after = Pt(2)
        p_ref.paragraph_format.line_spacing = 1.05
        p_ref.paragraph_format.left_indent = Inches(0.2)
        p_ref.paragraph_format.first_line_indent = Inches(-0.2)
        r = p_ref.add_run(r_text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(8.5)

    # Save to Downloads & Workspace
    out_dl = r'C:\Users\fahru\Downloads\TEMPLATE_RESMI_SISFOKOM_SINTA3.docx'
    out_ws = r'C:\laragon\www\Monopoly\TEMPLATE_RESMI_SISFOKOM_SINTA3.docx'
    doc.save(out_dl)
    doc.save(out_ws)
    print(f"Template Sisfokom generated successfully:\n1. {out_dl}\n2. {out_ws}")

if __name__ == '__main__':
    create_sisfokom_template_doc()
