from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from products import router as product_router
from orders import router as order_router
import uvicorn
from fastapi.responses import Response

app = FastAPI(
    title="ShopSphere API",
    description="E-commerce API for ShopSphere platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware with proper configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with proper prefixes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(product_router, prefix="/products", tags=["Products"])
app.include_router(order_router, prefix="/orders", tags=["Orders"])

@app.get("/")
def root():
    """Root endpoint - API Status"""
    return {
        "message": "ShopSphere Backend Running Successfully",
        "status": "operational",
        "version": "1.0.0",
        "endpoints": {
            "products": "/products",
            "orders": "/orders",
            "auth": "/auth",
            "docs": "/docs",
            "health": "/health"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "API is running smoothly and ready to serve requests"
    }

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    """Avoid 404s for browser favicon requests"""
    return Response(status_code=204)

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        log_level="info"
    )
