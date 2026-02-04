# 🧪 ShopSphere - Complete Testing & Verification Guide

## ✅ Pre-Deployment Checklist

Use this guide to verify that everything is working correctly before deploying.

---

## 📋 Step 1: System Requirements Check

### Windows
```bash
# Check Python
python --version     # Should be 3.8 or higher

# Check Node.js
node --version       # Should be 16 or higher
npm --version        # Should be 8 or higher
```

### macOS/Linux
```bash
# Check Python
python3 --version    # Should be 3.8 or higher

# Check Node.js
node --version       # Should be 16 or higher
npm --version        # Should be 8 or higher
```

---

## 🔧 Step 2: Backend Verification

### 2.1 Installation Check
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Install requirements
pip install -r requirements.txt

# Verify installation
pip list  # Check all packages are listed
```

### 2.2 Run Backend
```bash
python -m uvicorn main:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### 2.3 Test Backend Endpoints

**Terminal 3** - Test with cURL or Postman:

#### 1. Health Check
```bash
curl http://localhost:8000/health
```
Expected Response:
```json
{"status":"healthy","message":"API is running smoothly and ready to serve requests"}
```

#### 2. API Status
```bash
curl http://localhost:8000/
```
Expected Response:
```json
{
  "message": "ShopSphere Backend Running Successfully",
  "status": "operational",
  "version": "1.0.0"
}
```

#### 3. Get All Products
```bash
curl http://localhost:8000/products/
```
Expected Response:
```json
[
  {"id": 1, "name": "Laptop", "price": 999.99, ...},
  {"id": 2, "name": "Phone", "price": 499.99, ...},
  ...
]
```

#### 4. Get All Orders
```bash
curl http://localhost:8000/orders/
```
Expected Response:
```json
[
  {"id": 1, "item": "Laptop", "status": "Delivered", ...},
  ...
]
```

### 2.4 API Documentation
Visit: `http://localhost:8000/docs`

**What to verify:**
- ✅ Swagger UI loads without errors
- ✅ All endpoints are listed
- ✅ Each endpoint has proper documentation
- ✅ Try it out button works
- ✅ Mock requests execute successfully

---

## 🎨 Step 3: Frontend Verification

### 3.1 Installation Check
```bash
cd frontend

# Install dependencies
npm install

# Verify installation
npm list react react-dom next  # Check key packages
```

### 3.2 Run Frontend
```bash
npm run dev
```

**Expected Output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### 3.3 Test Frontend Pages

Open browser and visit each page:

#### 1. Home Page: `http://localhost:3000`
**Verify:**
- ✅ Hero section displays with title and buttons
- ✅ Features section shows 4 feature cards
- ✅ Products load from backend (6 products should display)
- ✅ Navigation bar is sticky at top
- ✅ Products have hover effects
- ✅ Shopping cart button is visible
- ✅ Newsletter section displays
- ✅ Footer is visible
- ✅ No console errors

#### 2. Products Page: `http://localhost:3000/products`
**Verify:**
- ✅ Page loads with hero section
- ✅ Search bar works (type something and see results filter)
- ✅ Category filter works
- ✅ Sort dropdown works
- ✅ Price range filter works
- ✅ Products grid displays all 6 products
- ✅ Product count updates correctly
- ✅ Mobile responsive (test in dev tools)

#### 3. Orders Page: `http://localhost:3000/orders`
**Verify:**
- ✅ Page loads with hero section
- ✅ 3 sample orders display
- ✅ Each order shows status, date, and price
- ✅ Clicking order expands to show details
- ✅ Timeline shows delivery progress
- ✅ Order summary is visible
- ✅ Support and return buttons are present

#### 4. Navigation
**Verify from any page:**
- ✅ Logo/Home link works
- ✅ Products link works
- ✅ Orders link works
- ✅ Mobile menu opens/closes
- ✅ Search functionality works

### 3.4 Test Functionality

#### Shopping Cart
1. Go to home page
2. Click "Add to Cart" on a product
3. Button should change to "✓ Added to Cart"
4. Cart counter should increase
5. Click "Shopping Cart" button
6. Product should appear in cart
7. Click "Remove" button
8. Product should disappear from cart

#### Responsive Design
1. Open DevTools (F12)
2. Toggle device toolbar
3. Test on:
   - ✅ Mobile (375px)
   - ✅ Tablet (768px)
   - ✅ Desktop (1920px)
4. Verify layout adjusts correctly

---

## 🔗 Step 4: Integration Testing

### 4.1 Verify Backend-Frontend Connection

1. **Backend running?**
   - Terminal shows: `Application startup complete`
   - Visit: `http://localhost:8000/health` → See status

2. **Frontend running?**
   - Terminal shows: `ready started server on 0.0.0.0:3000`
   - Visit: `http://localhost:3000` → See home page

3. **Data loading?**
   - Home page shows 6 products
   - Browser console shows no CORS errors
   - Network tab shows requests to `/products/` endpoint

### 4.2 Test API Calls

Open browser DevTools (F12) → Network Tab:

1. Refresh home page
2. Look for requests to:
   - ✅ `localhost:8000/products/` → Status 200
   - ✅ Response contains product data

---

## 📊 Step 5: Performance Testing

### 5.1 Load Times
1. Open DevTools → Performance tab
2. Refresh page
3. Check:
   - ✅ Page loads in < 3 seconds
   - ✅ Interactive within < 5 seconds
   - ✅ Lighthouse score > 75

### 5.2 API Response Times
1. DevTools → Network tab
2. Refresh page
3. Check:
   - ✅ `/products/` response < 200ms
   - ✅ `/orders/` response < 200ms
   - ✅ All resources load successfully

---

## 🧹 Step 6: Error Handling Check

### 6.1 Stop Backend Service
1. Ctrl+C to stop backend
2. Try to load home page
3. Should show: "Unable to load products. Please try again later."
4. Error message should be user-friendly

### 6.2 Check Console for Errors
1. Open DevTools → Console tab
2. No red errors should appear
3. Should see only informational logs

---

## 📱 Step 7: Mobile Testing

### 7.1 Mobile Responsiveness
1. DevTools → Toggle device toolbar
2. Test iPhone 12 (390x844)
3. Verify:
   - ✅ Navigation bar works
   - ✅ Mobile menu opens/closes
   - ✅ Products grid is single column
   - ✅ Buttons are tap-able
   - ✅ Text is readable

### 7.2 Mobile Features
- ✅ Search works on mobile
- ✅ Cart is accessible
- ✅ Orders page displays correctly
- ✅ No horizontal scroll

---

## ✨ Step 8: Visual Quality Check

### Colors & Design
- ✅ Gradients display smoothly
- ✅ Shadows render properly
- ✅ Font sizes are readable
- ✅ Icons display correctly
- ✅ Emojis render as expected

### Animations
- ✅ Hover effects work
- ✅ Transitions are smooth
- ✅ Loading spinner appears
- ✅ No jittery animations

---

## 🔐 Step 9: Security Check

### 9.1 Check CORS
```bash
# This should work without CORS errors
curl -H "Origin: http://localhost:3000" http://localhost:8000/products/
```

### 9.2 Check API Response Headers
```bash
curl -I http://localhost:8000/products/
```
Should see:
- ✅ `access-control-allow-origin: *`
- ✅ `content-type: application/json`

---

## 📝 Step 10: Documentation Verification

Check these files exist and are readable:
- ✅ `GET_STARTED.md` - Quick start guide
- ✅ `SETUP_AND_RUN.md` - Detailed setup
- ✅ `README.md` - Project overview
- ✅ All files have clear instructions

---

## 🚀 Step 11: Final Production Checklist

### Before Deployment:
- [ ] All endpoints tested and working
- [ ] Frontend loads all pages without errors
- [ ] Products and orders data displays correctly
- [ ] No console errors
- [ ] Mobile responsive verified
- [ ] Performance acceptable (< 3s load time)
- [ ] CORS properly configured
- [ ] API documentation accessible
- [ ] Environment variables configured
- [ ] Database connection verified

### Deployment:
- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Update API URL in frontend
- [ ] Test all pages in production
- [ ] Monitor error logs
- [ ] Verify traffic is flowing

---

## 🧪 Sample Test Data

### Products Available:
1. Laptop - $999.99
2. Phone - $499.99
3. Tablet - $299.99
4. Headphones - $149.99
5. Smartwatch - $199.99
6. Camera - $649.99

### Orders Available:
1. Order #1 - Laptop (Delivered)
2. Order #2 - Phone (Processing)
3. Order #3 - Tablet (Shipped)

---

## 📞 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8000 in use | Run on different port: `--port 8001` |
| Port 3000 in use | Run frontend with: `npm run dev -- -p 3001` |
| Can't fetch products | Check backend is running on 8000 |
| Products not showing | Check browser console for errors |
| Styling looks broken | Clear browser cache (Ctrl+Shift+Delete) |
| Slow performance | Check network tab for slow requests |

---

## ✅ Sign-Off

When all tests pass, you're ready for production! 🎉

**Last Verified:** [Your Date]
**Tester:** [Your Name]
**Status:** ✅ All systems operational

---

For help, see: [SETUP_AND_RUN.md](SETUP_AND_RUN.md)
