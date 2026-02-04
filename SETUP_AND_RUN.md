# ShopSphere - Complete Setup & Run Guide

A beautiful, modern e-commerce platform built with **Next.js** (Frontend) and **FastAPI** (Backend).

## 🚀 Quick Start - 2 Simple Steps

### Step 1: Install Dependencies

**Backend Setup:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend Setup:**
```bash
cd frontend
npm install
```

### Step 2: Run Both Services

**Terminal 1 - Backend (API Server):**
```bash
cd backend
venv\Scripts\activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
✅ Backend runs at: `http://localhost:8000`
📚 API Docs: `http://localhost:8000/docs`

**Terminal 2 - Frontend (Web App):**
```bash
cd frontend
npm run dev
```
✅ Frontend runs at: `http://localhost:3000`

---

## 📋 Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org))
- **Python** 3.8+ ([Download](https://python.org))
- **npm** or **yarn** (comes with Node.js)

## 🔧 Detailed Setup Instructions

### Windows Users

#### Backend Setup:
```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Frontend Setup:
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Install Tailwind CSS (if not already included)
npm install -D tailwindcss postcss autoprefixer
```

### macOS/Linux Users

#### Backend Setup:
```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Frontend Setup:
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

---

## ▶️ Running the Application

### Development Mode

**Start Backend (Terminal 1):**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python -m uvicorn main:app --reload
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

### Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Run Backend (Production):**
```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🌐 Access the Application

- **Website**: http://localhost:3000
- **API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Interactive Swagger UI)

---

## 📂 Project Structure

```
ShopSphere/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── auth.py              # Authentication routes
│   ├── products.py          # Product routes & database
│   ├── orders.py            # Order routes & database
│   ├── requirements.txt      # Python dependencies
│   └── venv/                # Virtual environment (created after setup)
│
├── frontend/
│   ├── app/
│   │   ├── page.js          # Home page
│   │   ├── layout.js        # Root layout
│   │   ├── products/
│   │   │   └── page.js      # Products listing page
│   │   └── orders/
│   │       └── page.js      # Orders tracking page
│   ├── components/
│   │   ├── Navbar.js        # Navigation bar
│   │   └── ProductCard.js   # Product card component
│   ├── styles/
│   │   └── globals.css      # Global styles & animations
│   ├── package.json         # Node dependencies
│   ├── next.config.js       # Next.js configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── postcss.config.js    # PostCSS configuration
│
└── Documentation files...
```

---

## 🎨 Features

### Frontend
✨ Modern responsive UI with Tailwind CSS
🎯 Beautiful animations and transitions
📱 Mobile-first design
🛒 Shopping cart functionality
📦 Order tracking with visual progress
🔍 Product search and filtering
⭐ Product ratings and reviews
💳 Smooth checkout experience

### Backend
🚀 Fast and modern FastAPI framework
📚 Interactive API documentation (Swagger)
🔐 CORS enabled for frontend integration
💾 Product management system
📦 Order management system
🛡️ Error handling and validation
📍 RESTful API endpoints

---

## 🔗 API Endpoints

### Products
- `GET /products/` - Get all products
- `GET /products/{id}` - Get product by ID
- `POST /products/` - Create new product

### Orders
- `GET /orders/` - Get all orders
- `GET /orders/{id}` - Get order by ID
- `POST /orders/` - Create new order

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /auth/profile/{username}` - Get user profile

### System
- `GET /` - API status
- `GET /health` - Health check

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Make sure you're in the backend directory
cd backend

# Activate virtual environment
venv\Scripts\activate

# Try installing dependencies again
pip install -r requirements.txt

# Run with verbose output
python -m uvicorn main:app --reload --log-level debug
```

### Frontend Won't Load
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -r node_modules
npm install

# Try again
npm run dev
```

### Port Already in Use
```bash
# Run backend on different port
python -m uvicorn main:app --port 8001

# Update frontend .env.local to use new port
# Add: NEXT_PUBLIC_API_URL=http://localhost:8001
```

### CORS Errors
The backend already has CORS enabled. If issues persist:
1. Check that backend is running on port 8000
2. Verify frontend is running on port 3000
3. Check browser console for detailed error messages

---

## 📊 Testing the API

### Using cURL
```bash
# Get all products
curl http://localhost:8000/products/

# Get API status
curl http://localhost:8000/

# Health check
curl http://localhost:8000/health
```

### Using Postman
1. Import API endpoints from `http://localhost:8000/docs`
2. Test each endpoint
3. Check responses

---

## 🚀 Deployment

### Deploy Backend (Heroku Example)
```bash
# Create Procfile in backend directory
web: uvicorn main:app --host 0.0.0.0 --port $PORT

# Deploy to Heroku
heroku create shopsphere-api
git push heroku main
```

### Deploy Frontend (Vercel Example)
```bash
cd frontend
npm run build
vercel deploy --prod
```

---

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./shopsphere.db
API_PORT=8000
DEBUG=True
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 💡 Tips & Tricks

1. **Hot Reload**: Both frontend and backend support hot reloading. Just save your changes!
2. **API Documentation**: Visit `http://localhost:8000/docs` for interactive API testing
3. **Mobile Testing**: Use `npm run dev -- -H 0.0.0.0` to access from other devices
4. **Database**: The backend uses in-memory storage by default. Data resets on restart.

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all services are running on correct ports

---

## 📄 License

ShopSphere is open source and available under the MIT License.

---

## 🎉 You're All Set!

Your ShopSphere application is ready to use. Start shopping and have fun! 🛍️

**Happy Shopping!** 🌟
