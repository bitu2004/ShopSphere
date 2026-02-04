from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
import re

router = APIRouter()

# In-memory user database (in production, use actual database)
USERS = {}

class User(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

def validate_password(password: str) -> bool:
    """Validate password strength"""
    if len(password) < 6:
        return False
    return True

def validate_username(username: str) -> bool:
    """Validate username format"""
    if len(username) < 3 or len(username) > 20:
        return False
    return bool(re.match("^[a-zA-Z0-9_]+$", username))

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

@router.post("/register")
def register(user: User):
    """Register a new user"""
    # Validation
    if not validate_username(user.username):
        raise HTTPException(status_code=400, detail="Username must be 3-20 characters and contain only letters, numbers, and underscores")
    
    if not validate_email(user.email):
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    if not validate_password(user.password):
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    
    if user.username in USERS:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Check if email already used
    for existing_user in USERS.values():
        if existing_user["email"] == user.email:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    USERS[user.username] = {
        "username": user.username,
        "email": user.email,
        "password": user.password,  # In production, hash this!
        "created_at": str(datetime.now())
    }
    return {"message": "User registered successfully", "username": user.username, "email": user.email}

@router.post("/login")
def login(credentials: LoginRequest):
    """Login user"""
    user = USERS.get(credentials.username)
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {
        "message": "Login successful",
        "username": user["username"],
        "email": user["email"],
        "token": f"token_{user['username']}_{str(datetime.now())}",
        "success": True
    }

@router.get("/profile/{username}")
def get_profile(username: str):
    """Get user profile"""
    user = USERS.get(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "username": user["username"],
        "email": user["email"],
        "created_at": user["created_at"]
    }

@router.post("/logout")
def logout():
    """Logout user"""
    return {"message": "Logged out successfully"}
