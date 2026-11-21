@echo off
title AURA Luxury Commerce Ecosystem
echo ===================================================
echo   AURA Luxury Commerce - Multi-Tier Platform
echo   1. Backend:   FastAPI REST API  (http://localhost:8000)
echo   2. Frontend:  Next.js Storefront (http://localhost:3000)
echo   3. Dashboard: Streamlit Analytics (http://localhost:8501)
echo ===================================================

echo [1/3] Starting Python FastAPI Backend on port 8000...
start "AURA FastAPI Backend" cmd /k "cd /d %~dp0backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/3] Starting Next.js Storefront on port 3000...
start "AURA Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"

echo [3/3] Starting Streamlit Business Analytics on port 8501...
start "AURA Streamlit Analytics" cmd /k "cd /d %~dp0dashboard && python -m streamlit run app.py --server.port 8501"

echo.
echo All services launched!
echo - Storefront:       http://localhost:3000
echo - API Documentation: http://localhost:8000/docs
echo - Business Insights: http://localhost:8501
echo ===================================================
pause
