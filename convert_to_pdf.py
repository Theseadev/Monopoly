import os
import sys

try:
    import win32com.client
    word = win32com.client.DispatchEx("Word.Application")
    word.Visible = False
    doc_path = os.path.abspath(r'C:\Users\fahru\Downloads\SISFOKOM_Article_Final.docx')
    pdf_path = os.path.abspath(r'C:\Users\fahru\Downloads\SISFOKOM_Article_Final.pdf')
    
    print(f"Opening: {doc_path}")
    doc = word.Documents.Open(doc_path)
    print("Exporting to PDF...")
    doc.SaveAs(pdf_path, FileFormat=17) # 17 = wdFormatPDF
    page_count = doc.ComputeStatistics(2) # 2 = wdStatisticPages
    doc.Close()
    word.Quit()
    print(f"Successfully generated PDF: {pdf_path}")
    print(f"Total Page Count: {page_count} pages")
except Exception as e:
    print(f"Conversion error: {e}")
