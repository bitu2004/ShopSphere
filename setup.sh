#!/bin/bash

# ShopSphere - Automated Setup Script
# This script will set up ShopSphere automatically on your system

echo "🛍️  ShopSphere - Automated Setup"
echo "================================"
echo ""

# Check Python
echo "✓ Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "✗ Python 3 not found. Please install Python 3.8+"
    exit 1
fi
python3 --version

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install Node.js 16+"
    exit 1
fi
node --version

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend
python3 -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

pip install --upgrade pip
pip install -r requirements.txt

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
cd frontend
npm install
cd ..

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo ""
echo "To run ShopSphere:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    echo "  venv\Scripts\activate"
else
    echo "  source venv/bin/activate"
fi
echo "  python -m uvicorn main:app --reload"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "🚀 Happy coding!"
