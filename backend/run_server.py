#!/usr/bin/env python
"""
Backend Server Launcher
Run this to start the FastAPI server
"""
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    from main import app
    import uvicorn
    
    print("🚀 Starting ShopSphere Backend Server...")
    print("📍 API will be available at: http://localhost:8000")
    print("📚 Swagger Docs: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop the server\n")
    
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        log_level="info"
    )
