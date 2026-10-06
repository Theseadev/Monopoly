$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

$docPath = "C:\laragon\www\Monopoly\SISFOKOM_Article_Final.docx"
$pdfPath = "C:\laragon\www\Monopoly\SISFOKOM_Article_Final.pdf"
$pdfDl = "C:\Users\fahru\Downloads\SISFOKOM_Article_Final.pdf"

try {
    Write-Host "Opening document: $docPath"
    $doc = $word.Documents.Open($docPath, $false, $true)
    Write-Host "Exporting to PDF: $pdfPath"
    $doc.SaveAs([ref]$pdfPath, [ref]17)
    $pageCount = $doc.ComputeStatistics(2)
    Write-Host "Computed Page Count: $pageCount"
    $doc.Close([ref]$false)
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
    Copy-Item $pdfPath $pdfDl -Force
    Write-Host "PDF Export Succeeded! Total Pages: $pageCount"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    $word.Quit()
}
