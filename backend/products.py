from fastapi import APIRouter, HTTPException

router = APIRouter()

# Enhanced product database
PRODUCTS = [
    {"id": 1, "name": "Laptop", "price": 999.99, "description": "High-performance laptop with 16GB RAM", "category": "electronics", "stock": 42, "rating": 4.8},
    {"id": 2, "name": "Phone", "price": 499.99, "description": "Latest smartphone with excellent camera", "category": "electronics", "stock": 128, "rating": 4.7},
    {"id": 3, "name": "Tablet", "price": 299.99, "description": "Portable tablet perfect for work and entertainment", "category": "electronics", "stock": 75, "rating": 4.6},
    {"id": 4, "name": "Headphones", "price": 149.99, "description": "Wireless headphones with noise cancellation", "category": "electronics", "stock": 200, "rating": 4.9},
    {"id": 5, "name": "Smartwatch", "price": 199.99, "description": "Track your fitness and stay connected", "category": "electronics", "stock": 95, "rating": 4.5},
    {"id": 6, "name": "Camera", "price": 649.99, "description": "Professional digital camera", "category": "electronics", "stock": 30, "rating": 4.8},
]

@router.get("/")
def get_products():
    """Get all products"""
    return PRODUCTS

@router.get("/{product_id}")
def get_product(product_id: int):
    """Get a specific product by ID"""
    for product in PRODUCTS:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")

@router.post("/")
def create_product(product: dict):
    """Create a new product"""
    try:
        new_id = max([p["id"] for p in PRODUCTS]) + 1 if PRODUCTS else 1
        new_product = {
            "id": new_id,
            "name": product.get("name"),
            "price": product.get("price"),
            "description": product.get("description", ""),
            "category": product.get("category", "general"),
            "stock": product.get("stock", 0),
            "rating": 5.0
        }
        PRODUCTS.append(new_product)
        return new_product
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
