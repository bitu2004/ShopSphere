# ShopSphere - Modern E-Commerce Platform 🛍️

A beautiful, modern e-commerce platform built with Next.js frontend and FastAPI backend. ShopSphere provides a seamless shopping experience with attractive UI, smooth animations, and responsive design.

## 🌟 Features

### Frontend (Next.js + React)
- ✨ Modern, responsive UI with Tailwind CSS
- 🎨 Beautiful animations and transitions
- 📱 Mobile-first design
- 🛒 Shopping cart functionality
- 📦 Order tracking with visual progress
- 🔍 Product search and filtering
- ⭐ Product ratings and reviews
- 💳 Secure checkout experience
- 📊 Order statistics dashboard

### Backend (FastAPI)
- 🚀 Fast and modern API
- 📚 Interactive API documentation (Swagger)
- 🔐 CORS enabled for frontend integration
- 💾 Product management
- 📦 Order management
- 🛡️ Error handling and validation
- 📍 RESTful endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- npm or yarn (for frontend package management)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create a virtual environment (recommended):**
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Run the backend server:**
```bash
python main.py
```

The backend will start at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

The frontend will start at `http://localhost:3000`

## 📁 Project Structure

```
ShopSphere/
├── backend/
│   ├── main.py           # Main FastAPI application
│   ├── auth.py           # Authentication routes
│   ├── products.py       # Product routes and database
│   ├── orders.py         # Order routes and database
│   └── requirements.txt   # Python dependencies
│
├── frontend/
│   ├── app/
│   │   ├── layout.js     # Root layout
│   │   ├── page.js       # Homepage
│   │   ├── products/
│   │   │   └── page.js   # Products page with search & filter
│   │   └── orders/
│   │       └── page.js   # Orders page with tracking
│   ├── components/
│   │   ├── Navbar.js     # Navigation bar
│   │   └── ProductCard.js # Product card component
│   ├── styles/
│   │   └── globals.css   # Global styles and animations
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json      # Node dependencies
│
└── README.md            # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (600-800)
- **Secondary**: Purple accents
- **Accent**: Yellow highlights
- **Success**: Green indicators

### Animations
- Fade-in animations on page load
- Smooth transitions on hover
- Bounce effects on CTAs
- Pulse glow on interactive elements
- Shimmer loading states

### UI Components
- Gradient buttons with hover effects
- Card components with shadow effects
- Progress bars for order tracking
- Badge system for discounts and status
- Responsive grid layouts

## 🔌 API Endpoints

### Products
- `GET /products/` - Get all products
- `GET /products/{id}` - Get specific product
- `POST /products/` - Create new product

### Orders
- `GET /orders/` - Get all orders
- `GET /orders/{id}` - Get specific order
- `POST /orders/` - Create new order
- `PUT /orders/{id}` - Update order status

### Authentication
- `POST /auth/login` - User login

### Health
- `GET /health` - API health check
- `GET /` - API status

## 📊 Sample Data

### Products
1. **Laptop** - $999.99
2. **Phone** - $499.99
3. **Tablet** - $299.99
4. **Headphones** - $149.99
5. **Smartwatch** - $199.99
6. **Camera** - $649.99

### Orders
Sample orders with different statuses:
- Delivered
- Processing
- Shipped

## 🛠️ Customization

### Adding New Products
Edit `backend/products.py` and add to the `PRODUCTS` list:
```python
{
    "id": 7,
    "name": "Your Product",
    "price": 199.99,
    "description": "Product description",
    "category": "electronics",
    "stock": 50,
    "rating": 4.8
}
```

### Styling
- Global styles: `frontend/styles/globals.css`
- Tailwind config: `frontend/tailwind.config.js`
- Component-level: Use inline Tailwind classes

### Colors in Tailwind
Modify `frontend/tailwind.config.js` to customize colors:
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... more color stops
  }
}
```

## 🌐 Deployment

### Frontend (Vercel Recommended)
```bash
npm run build
npm start
# Or deploy directly to Vercel via GitHub
```

### Backend (Heroku/Railway/Render)
```bash
# Create Procfile
echo "web: python main.py" > Procfile

# Deploy with git
git push heroku main
```

## 📝 Environment Variables

Create a `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### CORS Issues
- Make sure backend is running on `localhost:8000`
- Check that CORS middleware is enabled in `main.py`
- Verify frontend API URL in fetch requests

### Port Already in Use
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9
```

### Products Not Loading
1. Check backend is running
2. Open `http://localhost:8000/docs` to test API
3. Check browser console for errors
4. Verify CORS is properly configured

## 📚 Technologies Used

### Frontend
- Next.js 14
- React 18
- Tailwind CSS 3.3
- JavaScript (ES6+)

### Backend
- FastAPI
- Python 3.8+
- Uvicorn
- Python-Jose (JWT)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📧 Support

For support, please create an issue or contact the development team.

---

**Made with ❤️ for better shopping experiences**

Version: 1.0.0 | Last Updated: December 2025