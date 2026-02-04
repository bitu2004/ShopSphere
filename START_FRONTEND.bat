@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
cd /d D:\ShopSphere\frontend

echo.
echo ========================================
echo ShopSphere Frontend Server
echo ========================================
echo.

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --legacy-peer-deps
)

echo.
echo Starting Next.js dev server...
echo Frontend will be available at: http://localhost:3000
echo.

call npm run dev

pause
