from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta

router = APIRouter()

# Sample orders database
ORDERS = [
    {
        "id": 1,
        "item": "Laptop",
        "status": "Delivered",
        "order_date": "2025-12-15",
        "estimated_delivery": "2025-12-20",
        "tracking": "TRK1123456",
        "total_price": 999.99
    },
    {
        "id": 2,
        "item": "Phone",
        "status": "Processing",
        "order_date": "2025-12-18",
        "estimated_delivery": "2025-12-25",
        "tracking": "TRK2123456",
        "total_price": 499.99
    },
    {
        "id": 3,
        "item": "Tablet",
        "status": "Shipped",
        "order_date": "2025-12-16",
        "estimated_delivery": "2025-12-22",
        "tracking": "TRK3123456",
        "total_price": 299.99
    },
]

@router.get("/")
def get_orders():
    """Get all orders"""
    return ORDERS

@router.get("/{order_id}")
def get_order(order_id: int):
    """Get a specific order by ID"""
    for order in ORDERS:
        if order["id"] == order_id:
            return order
    raise HTTPException(status_code=404, detail="Order not found")

@router.post("/")
def create_order(order: dict):
    """Create a new order"""
    try:
        new_id = max([o["id"] for o in ORDERS]) + 1 if ORDERS else 1
        new_order = {
            "id": new_id,
            "item": order.get("item"),
            "status": "Processing",
            "order_date": datetime.now().strftime("%Y-%m-%d"),
            "estimated_delivery": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
            "tracking": f"TRK{new_id}123456",
            "total_price": order.get("total_price", 0)
        }
        ORDERS.append(new_order)
        return new_order
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{order_id}")
def update_order_status(order_id: int, status_update: dict):
    """Update order status"""
    for order in ORDERS:
        if order["id"] == order_id:
            order["status"] = status_update.get("status", order["status"])
            return order
    raise HTTPException(status_code=404, detail="Order not found")
