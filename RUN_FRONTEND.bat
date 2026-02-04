@echo off
REM ShopSphere - Run Frontend

echo.
echo 🎨 ShopSphere - Starting Frontend
echo ======================================
echo.

cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo ✅ Starting frontend development server...
echo.

call npm run dev

pause
