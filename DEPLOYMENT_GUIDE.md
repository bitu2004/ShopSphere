# 🚀 ShopSphere - Server Deployment Guide

## Deploy Your Website to Production

This guide will help you deploy ShopSphere to a live server so anyone can access it online.

---

## 📋 Prerequisites

- A server or hosting account
- SSH access to your server
- Domain name (optional but recommended)
- Basic terminal/command line knowledge

---

## 🌐 Option 1: Deploy to Heroku (Easiest)

### Step 1: Create Heroku Account
1. Go to [heroku.com](https://heroku.com)
2. Sign up for free account
3. Install Heroku CLI

### Step 2: Prepare Backend for Heroku

Create `backend/Procfile`:
```
web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

Add to `backend/requirements.txt`:
```bash
pip install gunicorn
```

### Step 3: Deploy Backend
```bash
cd backend
heroku create your-app-name-api
git push heroku main
```

### Step 4: Deploy Frontend

Create `frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-app-name-api.herokuapp.com
```

### Step 5: Deploy to Vercel (Best for Next.js)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## 🖥️ Option 2: Deploy to DigitalOcean (Best Value)

### Step 1: Create Droplet
1. Create account at [digitalocean.com](https://digitalocean.com)
2. Create new Droplet (Ubuntu 22.04, 4GB RAM)
3. SSH into your droplet

### Step 2: Setup Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt install -y python3 python3-pip python3-venv

# Install nginx
sudo apt install -y nginx

# Install git
sudo apt install -y git
```

### Step 3: Clone Repository
```bash
git clone https://github.com/your-repo/ShopSphere.git
cd ShopSphere
```

### Step 4: Setup Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `backend/gunicorn.conf.py`:
```python
import multiprocessing

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
```

Start backend:
```bash
gunicorn -c gunicorn.conf.py main:app &
```

### Step 5: Setup Frontend
```bash
cd ../frontend
npm install
npm run build
```

### Step 6: Configure Nginx
Create `/etc/nginx/sites-available/shopsphere`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/shopsphere /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: Start Frontend
```bash
cd frontend
npm start &
```

### Step 8: Setup SSL (Free)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## ☁️ Option 3: Deploy to AWS (Most Flexible)

### Step 1: Create EC2 Instance
1. Go to AWS Console
2. Launch new EC2 instance (Ubuntu 22.04)
3. Choose t2.medium (1GB RAM minimum)
4. Create security group with:
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
   - Port 22 (SSH)
5. Download `.pem` key file

### Step 2: Connect to Instance
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-instance-ip
```

### Step 3: Follow DigitalOcean Steps 2-8
(Same process as DigitalOcean above)

### Step 4: Setup Auto-start (Optional)
Create `/etc/systemd/system/shopsphere-backend.service`:
```ini
[Unit]
Description=ShopSphere Backend
After=network.target

[Service]
Type=notify
User=ubuntu
WorkingDirectory=/home/ubuntu/ShopSphere/backend
ExecStart=/home/ubuntu/ShopSphere/backend/venv/bin/gunicorn -c gunicorn.conf.py main:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable:
```bash
sudo systemctl daemon-reload
sudo systemctl enable shopsphere-backend
sudo systemctl start shopsphere-backend
```

---

## 📊 Option 4: Deploy with Docker

### Step 1: Create Dockerfiles

`backend/Dockerfile`:
```dockerfile
FROM python:3.9

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

`frontend/Dockerfile`:
```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "start"]
```

### Step 2: Create Docker Compose

`docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - API_PORT=8000

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
```

### Step 3: Deploy
```bash
docker-compose up -d
```

---

## 🔒 Security Checklist

Before going live:
- [ ] Set strong passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall
- [ ] Set environment variables
- [ ] Disable debug mode
- [ ] Set up monitoring
- [ ] Enable automatic backups
- [ ] Configure logging
- [ ] Set up rate limiting
- [ ] Use strong database passwords

---

## 📈 Performance Optimization

### Frontend
```bash
# Build for production
npm run build

# Enable compression
npm i compression
```

### Backend
```python
# Add to main.py
from fastapi.middleware.gzip import GZIPMiddleware
app.add_middleware(GZIPMiddleware, minimum_size=1000)
```

### Server
```bash
# Enable gzip in nginx
gzip on;
gzip_types text/plain text/css application/json;
gzip_min_length 1000;
```

---

## 🔍 Monitoring & Maintenance

### Check Backend Status
```bash
curl https://your-domain.com/health
```

### View Logs
```bash
# Backend logs
journalctl -u shopsphere-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Monitor Resources
```bash
top
df -h
free -h
```

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process using port
sudo lsof -i :8000

# Kill process
sudo kill -9 <PID>
```

### Permission Denied
```bash
# Fix ownership
sudo chown -R $USER:$USER /path/to/shopsphere
```

### Dependencies Missing
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

### CORS Errors
Ensure backend has CORS enabled in `main.py`

---

## 📞 Support & Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Heroku Docs](https://devcenter.heroku.com/)
- [DigitalOcean Docs](https://docs.digitalocean.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)

---

## 🎯 Deployment Checklist

- [ ] Backend running on production server
- [ ] Frontend built and deployed
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Database connected (if applicable)
- [ ] Environment variables set
- [ ] Error logging enabled
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Team notified of deployment

---

## 🎉 Success!

Your ShopSphere is now live! 🚀

Monitor your deployment and enjoy your live e-commerce platform!
