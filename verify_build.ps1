# KHC Finds - Compilation/Build Verifier
$env:PATH = "D:\KHC Website\.node;" + $env:PATH
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "  Building and compiling Next.js application..." -ForegroundColor Green
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
npm run build
