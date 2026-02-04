# 🚀 ShopSphere Setup Guide - macOS/Linux

## Step-by-Step Installation

### ✅ Prerequisites Check
- [ ] Python 3.8+ installed (check: `python3 --version`)
- [ ] Node.js 16+ installed (check: `node --version`)
- [ ] Git installed (check: `git --version`)

---

## 📦 Backend Setup (Python)

### 1. Open Terminal in the backend folder
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
python3 -m venv venv
```

### 3. Activate Virtual Environment
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run Backend Server
```bash
python main.py
```

**✅ Backend running at:** `http://localhost:8000`
**📚 API Docs at:** `http://localhost:8000/docs`

---

## 🎨 Frontend Setup (Node.js/Next.js)

### 1. Open New Terminal window in frontend folder
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

**✅ Frontend running at:** `http://localhost:3000`

---

## ✨ Everything Ready!

Once both servers are running, open your browser:
- **Website:** `http://localhost:3000`
- **API Documentation:** `http://localhost:8000/docs`
- **API Health:** `http://localhost:8000/health`

---

## 🛠️ Troubleshooting

### Port 3000 already in use?
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or find what's using it
lsof -i :3000
```

### Port 8000 already in use?
```bash
# Find process using port 8000
lsof -i :8000

# Kill by Process ID
kill -9 <PID>
```

### Virtual environment not activating?
```bash
# Make sure you're in the backend directory
cd backend

# Check if venv exists
ls -la venv/

# If not, recreate it
python3 -m venv venv

# Activate again
source venv/bin/activate
```

### Pip install fails?
```bash
# Update pip first:
python3 -m pip install --upgrade pip

# Then retry:
pip install -r requirements.txt
```

### Permission denied on venv/bin/activate?
```bash
# Make it executable
chmod +x venv/bin/activate

# Then activate
source venv/bin/activate
```

---

## 🧹 Clean Start (Remove & Reinstall)

### Clean Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Clean Backend
```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

---

## 📝 Tips

- **Keep both terminals open** while developing
- **Backend must run first** for API to be available
- **Use Ctrl+C** to stop either server
- **Refresh browser** if changes don't appear
- **Check console errors** (F12) for debugging
- **On M1/M2 Mac**: May need `arch -arm64 python3 -m venv venv`

---

## 🎉 You're All Set!

Enjoy exploring ShopSphere! 🛍️✨

For more details, see **README.md**
