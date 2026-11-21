Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "   AURA Luxury Commerce - Enterprise Ecosystem" -ForegroundColor Yellow
Write-Host "   1. Backend:   FastAPI REST API  (http://localhost:8000)" -ForegroundColor Green
Write-Host "   2. Frontend:  Next.js Storefront (http://localhost:3000)" -ForegroundColor Green
Write-Host "   3. Dashboard: Streamlit Analytics (http://localhost:8501)" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan

# Start FastAPI Backend
Write-Host "[1/3] Starting FastAPI Backend on port 8000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot/backend'; python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

# Start Next.js Frontend
Write-Host "[2/3] Starting Next.js Storefront on port 3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot/frontend'; npm.cmd run dev"

# Start Streamlit Dashboard
Write-Host "[3/3] Starting Streamlit Analytics on port 8501..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot/dashboard'; python -m streamlit run app.py --server.port 8501"

Write-Host "`nAll three applications are running!" -ForegroundColor Green
Write-Host "- Next.js Storefront:       http://localhost:3000" -ForegroundColor White
Write-Host "- FastAPI Swagger Docs:     http://localhost:8000/docs" -ForegroundColor White
Write-Host "- Streamlit Executive Suite: http://localhost:8501" -ForegroundColor White
