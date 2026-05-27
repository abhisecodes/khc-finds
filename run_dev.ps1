# KHC Finds - Development Bootstrapper
$env:PATH = "D:\KHC Website\.node;" + $env:PATH
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "  Starting KHC Finds affiliate platform..." -ForegroundColor Green
Write-Host "  Local Node: v22.13.0" -ForegroundColor Cyan
Write-Host "  Listening on: http://localhost:3000" -ForegroundColor Yellow
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
npm run dev
