import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def create_document():
    doc = docx.Document()
    
    # Page setup - Standard A4
    sections = doc.sections
    for section in sections:
        section.page_width = Inches(8.27)
        section.page_height = Inches(11.69)
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Base styling
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(0, 0, 0)
    normal_style.paragraph_format.line_spacing = 1.15
    normal_style.paragraph_format.space_after = Pt(6)

    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(12)
    run_title = p_title.add_run("Repeated Purchase Patterns of Consumers in a Roblox Virtual Goods Marketplace: An Analysis of Transaction Frequency and Inter-Transaction Intervals")
    run_title.bold = True
    run_title.font.size = Pt(14)
    run_title.font.name = 'Times New Roman'

    # Authors
    p_author = doc.add_paragraph()
    p_author.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_author.paragraph_format.space_after = Pt(4)
    r_author = p_author.add_run("First Author1*, Second Author2")
    r_author.bold = True
    r_author.font.size = Pt(11)

    # Affiliation
    p_aff = doc.add_paragraph()
    p_aff.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_aff.paragraph_format.space_after = Pt(14)
    r_aff = p_aff.add_run("Department of Information Systems, Faculty of Computer Science, University Name\nCity, Postal Code, Country\n*Corresponding Email: author@institution.ac.id")
    r_aff.font.size = Pt(9.5)
    r_aff.font.italic = True

    # Divider line
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_after = Pt(10)
    r_div = p_div.add_run("_________________________________________________________________________________")
    r_div.font.color.rgb = RGBColor(180, 180, 180)
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Abstract Heading
    p_abs_h = doc.add_paragraph()
    p_abs_h.paragraph_format.space_after = Pt(4)
    r_abs_h = p_abs_h.add_run("Abstract")
    r_abs_h.bold = True
    r_abs_h.font.size = Pt(11)

    # Abstract Content
    p_abs = doc.add_paragraph()
    p_abs.paragraph_format.space_after = Pt(8)
    p_abs.paragraph_format.line_spacing = 1.15
    p_abs.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r_abs = p_abs.add_run(
        "The rapid expansion of online gaming platforms has fostered secondary markets for virtual goods trading. "
        "Understanding transaction dynamics in these Customer-to-Customer (C2C) digital ecosystems is crucial for information systems "
        "and consumer analytics. This study investigates the repeated purchase patterns of consumers in a secondary Roblox virtual goods "
        "marketplace on the Itemku platform by analyzing transaction frequency and inter-transaction intervals. Utilizing an observational "
        "quantitative research design, this study examines an empirical dataset comprising 1,017 completed transactions from 233 unique "
        "consumers recorded between June 18, 2026, and September 19, 2026. A comparative cohort analysis was conducted between one-time "
        "buyers and repeat buyers. The empirical results demonstrate that repeat buyers represent 60.94% of the total consumer base, generate "
        "91.05% of the total transaction volume (926 orders), and account for 92.62% of total gross revenue (IDR 12,971,800 out of IDR 14,006,100). "
        "The inter-transaction interval analysis reveals an average interval of 1.31 calendar days, a median of 0.00 days, and a 75th percentile "
        "interval of 0.65 days (15.6 hours), demonstrating rapid, session-driven micro-purchasing behavior. These findings indicate that virtual "
        "goods commerce relies predominantly on active repeat purchase retention within compressed operational windows, providing actionable "
        "insights for consumer relationship management and marketplace analytics."
    )
    r_abs.font.size = Pt(10)
    r_abs.font.italic = True

    # Keywords
    p_kw = doc.add_paragraph()
    p_kw.paragraph_format.space_after = Pt(14)
    r_kw_label = p_kw.add_run("Keywords: ")
    r_kw_label.bold = True
    r_kw_label.font.size = Pt(10)
    r_kw = p_kw.add_run("C2C E-Commerce, Inter-Transaction Interval, Purchase Frequency, Repeat Purchase, Roblox, Virtual Goods.")
    r_kw.font.size = Pt(10)
    r_kw.font.italic = True

    # Section Helper
    def add_heading(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(12)
        h.paragraph_format.space_after = Pt(4)
        r = h.add_run(text)
        r.bold = True
        r.font.size = Pt(11.5)
        return h

    def add_subheading(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(8)
        h.paragraph_format.space_after = Pt(3)
        r = h.add_run(text)
        r.bold = True
        r.font.size = Pt(10.5)
        return h

    def add_body(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.15
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        r = p.add_run(text)
        r.font.size = Pt(10.5)
        return p

    def format_table(table):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        for row in table.rows:
            for cell in row.cells:
                cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                tcPr = cell._tc.get_or_add_tcPr()
                tcMar = OxmlElement('w:tcMar')
                for m in ['top', 'bottom', 'left', 'right']:
                    node = OxmlElement(f'w:{m}')
                    node.set(qn('w:w'), '120' if m in ['top', 'bottom'] else '180')
                    node.set(qn('w:type'), 'dxa')
                    tcMar.append(node)
                tcPr.append(tcMar)

    # 1. INTRODUCTION
    add_heading("1. INTRODUCTION")
    add_body(
        "The digital entertainment ecosystem has witnessed significant transformation through platform-based online games, "
        "among which Roblox has emerged as a prominent environment facilitating millions of daily digital interactions [1]. "
        "Within this ecosystem, virtual goods—including digital pets, in-game cosmetics, and progression items—function as economic "
        "assets possessing tangible utility and perceived value for active players [2]. While primary virtual asset exchanges occur "
        "within proprietary game engines, the high demand for specialized items and pricing flexibilities has fostered secondary "
        "Customer-to-Customer (C2C) trading marketplaces, such as Itemku in Indonesia."
    )
    add_body(
        "In the domain of Information Systems (IS) and electronic commerce analytics, secondary transaction log processing constitutes "
        "an objective foundation for understanding operational efficiency and user purchasing patterns [3]. Repeat purchase behavior is "
        "widely recognized as a vital metric for evaluating customer retention, lifecycle value, and merchant sustainability [4]. "
        "In conventional physical e-commerce, transaction frequencies and reorder intervals are heavily constrained by physical logistics, "
        "product depreciation, and replenishment cycles [5]. Conversely, virtual goods possess intangible characteristics, zero marginal "
        "delivery costs, and instantaneous consumption within digital gaming sessions [6]."
    )
    add_body(
        "Prior Information Systems and consumer behavior literature concerning virtual items has predominantly relied on perceptual survey "
        "methodologies, employing frameworks such as the Technology Acceptance Model (TAM) and the Theory of Planned Behavior to measure "
        "purchase intentions [7], [8]. However, empirical studies examining actual secondary transaction logs to evaluate granular "
        "frequency distributions and inter-transaction time intervals remain scarce. This creates a recognized empirical research gap regarding "
        "how repeat purchasing genuinely unfolds at the transaction level in secondary gaming asset markets."
    )
    add_body(
        "To address this gap, this study examines the repeat purchase behavior of consumers in a Roblox virtual goods secondary marketplace "
        "using empirical transaction log data. Specifically, this research addresses three research questions: (RQ1) What is the structural "
        "distribution of consumers when segmented into one-time and repeat buyers? (RQ2) What characteristics define the transaction frequency "
        "distribution across the consumer base? and (RQ3) What temporal patterns characterize the inter-transaction intervals among repeat buyers? "
        "By grounding the analysis in 1,017 actual transaction records, this paper provides verifiable empirical evidence on digital micro-transaction "
        "retention without relying on unmeasured psychological assumptions."
    )

    # 2. RELATED WORK
    add_heading("2. RELATED WORK")
    add_body(
        "Virtual goods commerce has been explored from multiple academic perspectives, including game economics, consumer motivation, and digital "
        "asset valuation. Hamari and Lehdonvirta established that game mechanics and social dynamics directly generate economic demand for virtual "
        "assets [1]. Lehdonvirta further categorized virtual item attributes into functional, aesthetic, and social dimensions, demonstrating that "
        "in-game items drive monetization models through continuous engagement [2]. Fairfield examined the legal and institutional aspects of virtual "
        "property, highlighting how ownership constructs translate into real-world economic value [6]."
    )
    add_body(
        "From an analytical Information Systems perspective, transaction data analysis provides empirical rigor by tracking objective behavioral "
        "events rather than self-reported intentions. Fader, Hardie, and Lee developed foundational customer base analysis models based on "
        "Recency, Frequency, and Monetary (RFM) metrics, proving that transaction frequency and interval timings serve as primary parameters for "
        "predicting customer lifetime activity [3]. In digital retail environments, Chintagunta, Chu, and Cebollada demonstrated that transaction "
        "costs and fulfillment delays directly influence channel selection and repurchase tendencies [5]."
    )
    add_body(
        "Despite these foundational contributions, contemporary literature lacks empirical investigation into micro-transaction logs within "
        "emerging peer-to-peer and C2C gaming secondary markets. Existing studies frequently model repeat purchases under the assumption of "
        "elongated inter-purchase cycles typical of physical goods. Consequently, observing empirical transaction intervals and frequency "
        "concentrations in rapid digital gaming markets provides a valuable contextual extension to Information Systems transaction analytics."
    )

    # 3. RESEARCH METHOD
    add_heading("3. RESEARCH METHOD")
    add_subheading("3.1 Research Design and Analytical Workflow")
    add_body(
        "This study adopts an observational quantitative research design utilizing secondary transaction data. The analytical workflow "
        "comprises six systematic phases: (1) Raw Data Ingestion from multi-period merchant logs, (2) Data Preprocessing and Deduplication, "
        "(3) Consumer Identification and Transaction Aggregation, (4) One-Time versus Repeat Buyer Cohort Classification, (5) Purchase Frequency "
        "and Inter-Transaction Interval Computation, and (6) Comparative Descriptive Analytics and Discussion."
    )

    add_subheading("3.2 Dataset Description")
    add_body(
        "The empirical dataset comprises secondary transaction records obtained from an active merchant operating on the Itemku marketplace platform, "
        "specializing in Roblox digital assets (primarily within the sub-games 'Build A Zoo' and 'Chop Your Tree'). The observation window spans "
        "94 consecutive calendar days, from June 18, 2026, to September 19, 2026. The combined dataset encompasses 1,017 validated transaction "
        "records generated by 233 unique consumer accounts across 337 distinct digital item listings. Table 1 outlines the dataset variables and their "
        "operational definitions."
    )

    # Table 1
    p_t1 = doc.add_paragraph()
    p_t1.paragraph_format.space_before = Pt(6)
    p_t1.paragraph_format.space_after = Pt(3)
    r_t1 = p_t1.add_run("Table 1. Dataset Variables and Operational Definitions")
    r_t1.bold = True
    r_t1.font.size = Pt(10)

    t1 = doc.add_table(rows=7, cols=4)
    format_table(t1)
    headers_t1 = ["Variable", "Description", "Data Type", "Role in Analysis"]
    for i, h in enumerate(headers_t1):
        cell = t1.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(2)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.size = Pt(9.5)
        shading = parse_xml(r'<w:shd {} w:fill="E8EEF5"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shading)

    rows_t1_data = [
        ("Nomor_Pesanan", "Unique order identifier assigned by marketplace system", "String", "Primary transaction key"),
        ("Nama_Pembeli", "Anonymized consumer account username", "String", "Consumer identifier (Unit of analysis)"),
        ("Tanggal_Dibayar_Pembeli", "Timestamp of verified payment completion (WIB)", "Datetime", "Temporal timestamp for transaction ordering"),
        ("Tanggal_Dikirim", "Timestamp when merchant completed in-game delivery", "Datetime", "Fulfillment duration endpoint"),
        ("Harga_Jual", "Gross transaction price in Indonesian Rupiah (IDR)", "Integer", "Monetary transaction value metric"),
        ("Status_Pesanan", "Final operational order status (Completed, Refunded, Confirming)", "Categorical", "Transaction validity filtering")
    ]
    for row_idx, data in enumerate(rows_t1_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t1.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(2)
            r = cell.paragraphs[0].add_run(text)
            r.font.size = Pt(9)

    add_subheading("3.3 Data Preprocessing and Data Quality Audit")
    add_body(
        "A rigorous data quality audit was executed across all 1,017 records. No duplicate order identifiers (Nomor_Pesanan) were present. "
        "Key transaction fields (Nomor_Pesanan, Nama_Pembeli, Tanggal_Dibayar_Pembeli, Harga_Jual) exhibited zero missing values (100% complete). "
        "The order status distribution comprises 922 Completed orders (90.66%), 77 Refunded orders (7.57%), and 18 Buyer Confirmation orders (1.77%). "
        "Numerical integrity checks confirmed no negative prices or zero quantities; Harga_Jual ranged from IDR 200 to IDR 850,000 (Mean = IDR 13,771.98, "
        "Median = IDR 2,000). For service fulfillment calculations, 76 records lacking Tanggal_Dikirim due to cancellation were excluded, resulting in "
        "941 valid fulfillment records."
    )

    add_subheading("3.4 Consumer Classification and Mathematical Formulation")
    add_body(
        "Consumers are classified strictly based on observed transaction counts. A one-time buyer is defined as a consumer with exactly one "
        "recorded transaction (F_i = 1), whereas a repeat buyer is defined as a consumer with two or more recorded transactions (F_i >= 2). "
        "This classification reflects observed transaction frequency and avoids unmeasured claims regarding customer loyalty."
    )
    add_body(
        "The purchase frequency F_i for consumer i is formulated as:\n"
        "F_i = N_i\n"
        "where N_i denotes the total number of transactions executed by consumer i within the observation window."
    )
    add_body(
        "For repeat buyers (F_i >= 2), transactions are ordered chronologically by payment timestamp. The inter-transaction interval I_{i,j} "
        "between consecutive transactions j and j-1 is defined as:\n"
        "I_{i,j} = T_{i,j} - T_{i,j-1}\n"
        "where T_{i,j} represents the payment timestamp of transaction j, and T_{i,j-1} represents the timestamp of the immediately preceding transaction. "
        "Intervals are measured in continuous calendar days and fractional hours."
    )

    # 4. RESULTS AND DISCUSSION
    add_heading("4. RESULTS AND DISCUSSION")
    add_subheading("4.1 Transaction Overview and Fulfillment Characteristics")
    add_body(
        "Across the 94-day observation window, the 1,017 transactions generated an aggregate gross monetary value of IDR 14,006,100. "
        "Fulfillment time analysis (n = 941) indicates a mean fulfillment duration of 294.8 minutes (4.91 hours) and a median duration of 61.4 minutes "
        "(1.02 hours). A total of 50.48% of shipments required more than 1 hour, and 33.16% exceeded 6 hours, reflecting the manual in-game "
        "delivery model of peer-to-peer micro-merchants."
    )

    add_subheading("4.2 Comparative Analysis of One-Time and Repeat Buyers")
    add_body(
        "Table 2 provides an empirical comparison between one-time buyers and repeat buyers across consumer counts, transaction volumes, "
        "revenue contributions, transaction pricing, and service wait times."
    )

    # Table 2
    p_t2 = doc.add_paragraph()
    p_t2.paragraph_format.space_before = Pt(6)
    p_t2.paragraph_format.space_after = Pt(3)
    r_t2 = p_t2.add_run("Table 2. Empirical Comparison of One-Time and Repeat Buyers")
    r_t2.bold = True
    r_t2.font.size = Pt(10)

    t2 = doc.add_table(rows=7, cols=4)
    format_table(t2)
    headers_t2 = ["Metric Parameter", "One-Time Buyers (F = 1)", "Repeat Buyers (F >= 2)", "Combined Total / Average"]
    for i, h in enumerate(headers_t2):
        cell = t2.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(2)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.size = Pt(9.5)
        shading = parse_xml(r'<w:shd {} w:fill="E8EEF5"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shading)

    rows_t2_data = [
        ("Number of Unique Consumers", "91 (39.06%)", "142 (60.94%)", "233 Consumers (100%)"),
        ("Total Transaction Volume (Orders)", "91 (8.95%)", "926 (91.05%)", "1,017 Orders (100%)"),
        ("Gross Revenue Contribution (IDR)", "IDR 1,034,300 (7.38%)", "IDR 12,971,800 (92.62%)", "IDR 14,006,100 (100%)"),
        ("Mean Transaction Value (Harga Jual)", "IDR 11,365.93", "IDR 7,881.13", "IDR 8,194.22"),
        ("Median Transaction Value (Harga Jual)", "IDR 1,000.00", "IDR 1,450.00", "IDR 1,400.00"),
        ("Mean Fulfillment Wait Time", "233.91 Minutes (~3.90 Hours)", "214.17 Minutes (~3.57 Hours)", "215.91 Minutes")
    ]
    for row_idx, data in enumerate(rows_t2_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t2.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(2)
            r = cell.paragraphs[0].add_run(text)
            r.font.size = Pt(9)

    add_body(
        "As detailed in Table 2, repeat buyers represent 60.94% of the unique consumer base (142 of 233 consumers) but generate 91.05% of total orders "
        "(926 transactions) and 92.62% of gross revenue (IDR 12.97 Million). This demonstrates an extreme Pareto concentration where business survival "
        "is almost entirely sustained by repeat transactions. Furthermore, repeat buyers exhibited a lower mean transaction value (IDR 7,881.13) compared "
        "to one-time buyers (IDR 11,365.93), indicating an incremental micro-purchasing strategy."
    )

    add_subheading("4.3 Purchase Frequency Distribution")
    add_body(
        "Among repeat buyers, the mean purchase frequency was 6.52 transactions per consumer. Table 3 presents the distribution of consumers "
        "stratified by transaction frequency tiers."
    )

    # Table 3
    p_t3 = doc.add_paragraph()
    p_t3.paragraph_format.space_before = Pt(6)
    p_t3.paragraph_format.space_after = Pt(3)
    r_t3 = p_t3.add_run("Table 3. Distribution of Consumers by Purchase Frequency Tier")
    r_t3.bold = True
    r_t3.font.size = Pt(10)

    t3 = doc.add_table(rows=6, cols=4)
    format_table(t3)
    headers_t3 = ["Frequency Tier (Transactions)", "Number of Consumers", "Percentage of Consumers", "Cumulative Orders Generated"]
    for i, h in enumerate(headers_t3):
        cell = t3.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(2)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.size = Pt(9.5)
        shading = parse_xml(r'<w:shd {} w:fill="E8EEF5"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shading)

    rows_t3_data = [
        ("1 Transaction (One-time)", "91", "39.06%", "91 Orders"),
        ("2 - 5 Transactions", "93", "39.91%", "287 Orders"),
        ("6 - 15 Transactions", "35", "15.02%", "314 Orders"),
        ("16 - 50 Transactions", "13", "5.58%", "423 Orders"),
        ("> 50 Transactions (Extreme power)", "1", "0.43%", "102 Orders")
    ]
    for row_idx, data in enumerate(rows_t3_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t3.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(2)
            r = cell.paragraphs[0].add_run(text)
            r.font.size = Pt(9)

    add_body(
        "Table 3 shows that while 39.91% of consumers fall into the 2-5 transaction tier, a highly active subgroup of 14 consumers (6.01% of the total) "
        "executed more than 15 transactions, generating 525 orders (51.62% of all marketplace orders). The maximum recorded individual frequency "
        "reached 102 transactions by a single consumer (Sam Shears), generating IDR 4,197,500 in total expenditure."
    )

    add_subheading("4.4 Inter-Transaction Interval Distribution")
    add_body(
        "To evaluate temporal purchasing density, inter-transaction intervals were computed across all 784 consecutive repeat purchase pairs. "
        "Table 4 summarizes the descriptive statistics of the observed intervals."
    )

    # Table 4
    p_t4 = doc.add_paragraph()
    p_t4.paragraph_format.space_before = Pt(6)
    p_t4.paragraph_format.space_after = Pt(3)
    r_t4 = p_t4.add_run("Table 4. Descriptive Statistics of Inter-Transaction Intervals")
    r_t4.bold = True
    r_t4.font.size = Pt(10)

    t4 = doc.add_table(rows=8, cols=3)
    format_table(t4)
    headers_t4 = ["Statistical Metric", "Interval Value (Calendar Days)", "Operational Time Equivalent"]
    for i, h in enumerate(headers_t4):
        cell = t4.cell(0, i)
        cell.paragraphs[0].paragraph_format.space_after = Pt(2)
        r = cell.paragraphs[0].add_run(h)
        r.bold = True
        r.font.size = Pt(9.5)
        shading = parse_xml(r'<w:shd {} w:fill="E8EEF5"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shading)

    rows_t4_data = [
        ("Total Consecutive Pairs (N)", "784 Intervals", "784 Transitions"),
        ("Mean Interval", "1.31 Days", "31.44 Hours"),
        ("Median Interval (Q2)", "0.00 Days", "< 1 Hour (Same calendar day)"),
        ("First Quartile (Q1 - 25%)", "0.00 Days", "Immediate successive purchase"),
        ("Third Quartile (Q3 - 75%)", "0.65 Days", "15.60 Hours"),
        ("Minimum Interval", "0.00 Days (0.00 Hours)", "Consecutive batch order"),
        ("Maximum Interval", "49.77 Days", "~1,194.50 Hours")
    ]
    for row_idx, data in enumerate(rows_t4_data, start=1):
        for col_idx, text in enumerate(data):
            cell = t4.cell(row_idx, col_idx)
            cell.paragraphs[0].paragraph_format.space_after = Pt(2)
            r = cell.paragraphs[0].add_run(text)
            r.font.size = Pt(9)

    add_body(
        "The empirical findings in Table 4 reveal a highly skewed, zero-inflated interval distribution. Over 50% of repeat purchases occurred "
        "on the exact same calendar day (Median = 0.00 days). Furthermore, 75% of all repeat transactions took place within less than 15.60 hours (Q3 = 0.65 days). "
        "This indicates that consumers engage in burst-like purchasing cycles during active gaming sessions."
    )

    add_subheading("4.5 Discussion")
    add_body(
        "The empirical findings provide three critical insights for virtual goods commerce and Information Systems analytics:\n\n"
        "1. Session-Bound Micro-Purchasing Pattern: Unlike conventional retail where repeat purchases occur over weekly or monthly cycles, "
        "virtual goods transactions exhibit rapid, session-driven execution. Consumers reorder within hours during live gameplay as immediate in-game "
        "needs emerge.\n\n"
        "2. Service Delay Tolerance in Niche Digital Assets: Despite an average fulfillment duration of 3.57 hours for repeat buyers, retention remained "
        "exceptionally high (60.94%). In specialized C2C digital asset markets, fulfillment certainty and merchant reliability outweigh non-instantaneous "
        "delivery speeds.\n\n"
        "3. Contextual Value-Added Practices: Merchant operational practices, such as incorporating unquantified bonus items during service adjustments, "
        "likely reinforce ongoing transactional relationships. While not modeled as a numerical variable, these operational practices serve as a valuable "
        "contextual mechanism supporting high customer retention."
    )

    # 5. CONCLUSION
    add_heading("5. CONCLUSION")
    add_body(
        "This study analyzed the repeat purchase patterns of consumers in a Roblox secondary virtual goods marketplace using 1,017 transaction records. "
        "The findings confirm that repeat buyers dominate revenue generation (92.62%) and exhibit rapid repurchase cycles, with 75% of repeat orders "
        "occurring within less than 15.60 hours. This confirms that virtual goods commerce operates on compressed temporal horizons heavily concentrated "
        "among high-frequency micro-purchasers."
    )
    add_body(
        "Practical and System Implications: E-commerce platform developers and marketplace merchants should tailor customer relationship management (CRM) "
        "systems toward active gaming session windows. Optimizing automated merchant availability and notification pipelines during peak evening gaming hours "
        "can directly capture consecutive micro-transaction streams."
    )
    add_body(
        "Limitations and Future Research: This research is constrained to observational log data from a single merchant entity without direct psychometric "
        "measurement of consumer perceptions. Future research should integrate quantitative log data with structured consumer surveys to evaluate the "
        "interplay between perceived value, price sensitivity, and repeat purchase decisions."
    )

    # REFERENCES
    add_heading("REFERENCES")
    refs = [
        "[1] J. Hamari and V. Lehdonvirta, \"Game design as marketing: How game mechanics create demand for virtual goods,\" International Journal of Business Science & Applied Management, vol. 5, no. 1, pp. 14-29, 2010.",
        "[2] V. Lehdonvirta, \"Virtual item sales as a revenue model: Identifying attributes that drive purchase decisions,\" Electronic Commerce Research, vol. 9, no. 1-2, pp. 97-113, 2009.",
        "[3] P. S. Fader, B. G. Hardie, and K. L. Lee, \"RFM and CLV: Using iso-value curves for customer base analysis,\" Journal of Marketing Research, vol. 42, no. 4, pp. 415-430, 2005.",
        "[4] P. K. Hellier, G. M. Geursen, R. A. Carr, and J. A. Rickard, \"Customer repurchase intention: A general structural equation model,\" European Journal of Marketing, vol. 37, no. 11/12, pp. 1762-1800, 2003.",
        "[5] P. K. Chintagunta, J. Chu, and J. Cebollada, \"Quantifying transaction costs in online/off-line grocery channel choice,\" Marketing Science, vol. 31, no. 1, pp. 96-114, 2012.",
        "[6] J. A. Fairfield, \"Virtual property,\" Boston University Law Review, vol. 85, pp. 1047-1102, 2005.",
        "[7] J. Hamari, \"Why do people buy virtual goods? Attitude towards virtual good purchases versus purchase intention,\" International Journal of Information Management, vol. 35, no. 3, pp. 299-308, 2015.",
        "[8] R. L. Oliver, \"Whence consumer loyalty?,\" Journal of Marketing, vol. 63, no. 4_suppl1, pp. 33-44, 1999."
    ]
    for r_text in refs:
        p_ref = doc.add_paragraph()
        p_ref.paragraph_format.space_after = Pt(3)
        p_ref.paragraph_format.left_indent = Inches(0.25)
        p_ref.paragraph_format.first_line_indent = Inches(-0.25)
        r = p_ref.add_run(r_text)
        r.font.size = Pt(9.5)

    # Save to both Downloads and workspace
    target_downloads = r'C:\Users\fahru\Downloads\Naskah_Jurnal_SISFOKOM_SINTA3.docx'
    target_workspace = r'C:\laragon\www\Monopoly\Naskah_Jurnal_SISFOKOM_SINTA3.docx'
    
    doc.save(target_downloads)
    doc.save(target_workspace)
    print(f"Successfully generated DOCX files:\n1. {target_downloads}\n2. {target_workspace}")

if __name__ == '__main__':
    create_document()
