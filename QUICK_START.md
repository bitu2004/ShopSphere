# 🚀 ShopSphere - Quick Start Guide

## ✅ Everything is Working!

Your ShopSphere e-commerce application is now fully operational and ready to use.

---

## 🌐 Access Points

| Service | URL | Status |
|---------|-----|--------|
| **Frontend (Website)** | http://localhost:3000 | ✅ Running |
| **Backend (API)** | http://127.0.0.1:8000 | ✅ Running |
| **API Documentation** | http://127.0.0.1:8000/docs | ✅ Available |

---

## 🎯 What You Can Do Now

### 1. Create an Account
- Go to http://localhost:3000
- Click "Account" button in navbar
- Fill in registration form with:
  - Username
  - Email
  - Password

### 2. Login
- Use your credentials to login
- System will generate a token

### 3. Browse Products
- View all products on homepage
- Product details include:
  - Name, Price, Description
  - Category, Stock, Rating
  - Add to Cart functionality

### 4. Shopping Cart
- Add products to cart
- View cart summary
- See total price

### 5. Orders
- Navigate to Orders section
- View all orders with:
  - Order ID
  - Item details
  - Order status
  - Tracking information
  - Estimated delivery date

---

## 🔧 If Something Goes Wrong

### Backend Not Responding (Connection Refused)
```powershell
# Check if backend is running
netstat -ano | findstr ":8000"

# If not running, restart:
# Open new cmd window and run:
cd D:\ShopSphere\backend && python run_server.py
```

### Frontend Not Loading
```powershell
# Check if frontend is running
netstat -ano | findstr ":3000"

# If not running, restart:
# Open new cmd window and run:
cd D:\ShopSphere\frontend && npm install --legacy-peer-deps && npm run dev
```

### Port Already in Use
```powershell
# For port 8000 (Backend):
netstat -ano | findstr ":8000"
taskkill /PID [number] /F

# For port 3000 (Frontend):
netstat -ano | findstr ":3000"
taskkill /PID [number] /F
```

---

## 📚 API Testing

### Using Swagger UI (Easiest)
1. Go to: http://127.0.0.1:8000/docs
2. Try all endpoints interactively
3. See responses in real-time

### Using PowerShell
```powershell
# Get all products
Invoke-WebRequest -Uri "http://127.0.0.1:8000/products/" | ConvertFrom-Json

# Health check
Invoke-WebRequest -Uri "http://127.0.0.1:8000/health" | ConvertFrom-Json
```

### Using cURL (if installed)
```bash
curl http://127.0.0.1:8000/products/
curl http://127.0.0.1:8000/health
```

---

## 🛠️ Restart All Services

### Option 1: Use Batch File
```batch
D:\ShopSphere\RUN_ALL.bat
```

### Option 2: Manual Restart
1. Close backend cmd window (Ctrl+C)
2. Close frontend cmd window (Ctrl+C)
3. Open new cmd and run backend:
   ```
   cd D:\ShopSphere\backend && python run_server.py
   ```
4. Open another cmd and run frontend:
   ```
   cd D:\ShopSphere\frontend && npm run dev
   ```

---

## 📁 Project Structure

```
D:\ShopSphere/
├── backend/
│   ├── main.py              # Main FastAPI app
│   ├── auth.py              # Authentication endpoints
│   ├── products.py          # Products endpoints
│   ├── orders.py            # Orders endpoints
│   ├── requirements.txt      # Python dependencies
│   └── run_server.py         # Server launcher
├── frontend/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── styles/              # CSS files
│   ├── package.json         # Node dependencies
│   └── .env.local           # Environment config
└── RUN_ALL.bat              # Start all services

```

---

## 🎯 Features

✅ **User Management**
- Register new accounts
- Secure login
- User profiles

✅ **Product Catalog**
- Browse products
- View details
- Search functionality
- Stock status

✅ **Shopping**
- Add to cart
- Cart management
- Price calculation

✅ **Orders**
- Order history
- Order tracking
- Estimated delivery

✅ **Responsive Design**
- Works on desktop
- Mobile-friendly
- Smooth animations

---

## 📞 Support

If you encounter issues:
1. Check port availability: `netstat -ano | findstr ":8000"` or `:3000`
2. Verify Python and Node are installed
3. Check console output for error messages
4. Try restarting services

---

**Enjoy using ShopSphere!** 🎉
