@echo off
REM ShopSphere - Run Both Services
REM This script will start both backend and frontend

echo.
echo 🛍️  ShopSphere - Starting Services
echo ======================================
echo.

REM Check if dependencies are installed
if not exist "backend\venv" (
    echo Installing backend dependencies...
    cd backend
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    cd ..
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ✅ All dependencies ready!
echo.
echo 🚀 Starting Backend (Terminal 1)...
echo.
cd backend
call venv\Scripts\activate.bat
python run_server.py

pause
