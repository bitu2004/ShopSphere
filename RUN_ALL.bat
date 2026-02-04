@echo off
REM Comprehensive ShopSphere Setup and Verification Script

setlocal enabledelayedexpansion
cd /d %~dp0

echo.
echo ====================================================
echo          ShopSphere - Complete Setup
echo ====================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.10+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Python is installed: 
python --version

echo [OK] Node.js is installed: 
node --version

echo.
echo ====================================================
echo Starting ShopSphere Services...
echo ====================================================
echo.

REM Start Backend in a new window
echo [1/2] Starting Backend Server...
start "ShopSphere Backend" cmd /k "cd /d %~dp0backend && python run_server.py"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start Frontend in a new window
echo [2/2] Starting Frontend Server...
start "ShopSphere Frontend" cmd /k "cd /d %~dp0frontend && npm install --legacy-peer-deps && npm run dev"

echo.
echo ====================================================
echo Services Starting...
echo ====================================================
echo.
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo API Docs: http://127.0.0.1:8000/docs
echo.
echo Both servers should open in separate windows.
echo Keep these windows open while using the application.
echo.
pause
