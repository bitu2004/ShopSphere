@echo off
REM ShopSphere - Automated Setup Script for Windows
REM This script will set up ShopSphere automatically

echo.
echo 🛍️  ShopSphere - Automated Setup for Windows
echo =============================================
echo.

REM Check Python
echo ✓ Checking Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Python not found. Please install Python 3.8+
    exit /b 1
)
python --version

REM Check Node.js
echo ✓ Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js not found. Please install Node.js 16+
    exit /b 1
)
node --version

REM Setup Backend
echo.
echo 📦 Setting up Backend...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt
cd ..

REM Setup Frontend
echo.
echo 🎨 Setting up Frontend...
cd frontend
call npm install
cd ..

echo.
echo =============================================
echo ✅ Setup Complete!
echo.
echo To run ShopSphere:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   venv\Scripts\activate
echo   python -m uvicorn main:app --reload
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo 🚀 Happy coding!
echo.
pause
