# 🚀 ShopSphere Setup Guide - Windows

## Step-by-Step Installation

### ✅ Prerequisites Check
- [ ] Python 3.8+ installed (check: `python --version`)
- [ ] Node.js 16+ installed (check: `node --version`)
- [ ] Git installed (check: `git --version`)

---

## 📦 Backend Setup (Python)

### 1. Open PowerShell/CMD in the backend folder
```powershell
cd backend
```

### 2. Create Virtual Environment
```powershell
python -m venv venv
```

### 3. Activate Virtual Environment
```powershell
# On Windows PowerShell
venv\Scripts\Activate.ps1

# On Windows CMD
venv\Scripts\activate.bat
```

### 4. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 5. Run Backend Server
```powershell
python main.py
```

**✅ Backend running at:** `http://localhost:8000`
**📚 API Docs at:** `http://localhost:8000/docs`

---

## 🎨 Frontend Setup (Node.js/Next.js)

### 1. Open New PowerShell/CMD window in frontend folder
```powershell
cd frontend
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Run Development Server
```powershell
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
```powershell
# Kill process on port 3000
Get-Process | Where-Object {$_.MainWindowTitle -like "*3000*"} | Stop-Process

# Or find what's using it
netstat -ano | findstr :3000
```

### Port 8000 already in use?
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill by Process ID
taskkill /PID <PID> /F
```

### Virtual environment not activating?
```powershell
# If error about execution policy, run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then activate again:
venv\Scripts\Activate.ps1
```

### Pip install fails?
```powershell
# Update pip first:
python -m pip install --upgrade pip

# Then retry:
pip install -r requirements.txt
```

---

## 🧹 Clean Start (Remove & Reinstall)

### Clean Frontend
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

### Clean Backend
```powershell
cd backend
Remove-Item -Recurse -Force venv
python -m venv venv
venv\Scripts\Activate.ps1
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

---

## 🎉 You're All Set!

Enjoy exploring ShopSphere! 🛍️✨

For more details, see **README.md**
