# 🚀 CTOrendang Deployment Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [VPS Deployment](#vps-deployment)
- [Monitoring & Logging](#monitoring--logging)
- [Security Checklist](#security-checklist)

---

## Prerequisites

### Required Software
- **Docker** 24+ or **Podman** 4+
- **Node.js** 20+ (for local builds)
- **Git** for version control
- **SSL Certificate** (Let's Encrypt recommended)

### Recommended VPS Specs
- **CPU**: 2+ cores
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 20GB SSD minimum
- **OS**: Ubuntu 22.04 LTS or Debian 12

---

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/TrillionUnicorn/CTOrendang.git
cd CTOrendang
```

### 2. Configure Environment Variables
```bash
# Copy example environment file
cp .env.example .env

# Edit environment variables
nano .env
```

**Required Variables:**
```env
NODE_ENV=production
PORT=3000
PUBLIC_APP_URL=https://ctorendang.com
```

**Optional Variables (for future features):**
```env
# AI Integration
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/ctorendang
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Payment
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

---

## Docker Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Docker CLI

```bash
# Build image
docker build -t ctorendang:latest .

# Run container
docker run -d \
  --name ctorendang \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  ctorendang:latest

# View logs
docker logs -f ctorendang

# Stop container
docker stop ctorendang
docker rm ctorendang
```

### Option 3: Podman

```bash
# Build image
podman build -t ctorendang:latest .

# Run container
podman run -d \
  --name ctorendang \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  ctorendang:latest
```

---

## VPS Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Create app directory
sudo mkdir -p /opt/ctorendang
cd /opt/ctorendang
```

### 2. Deploy Application

```bash
# Clone repository
git clone https://github.com/TrillionUnicorn/CTOrendang.git .

# Configure environment
cp .env.example .env
nano .env

# Build and start
docker-compose up -d
```

### 3. Setup Reverse Proxy (Nginx)

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/ctorendang
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name ctorendang.com www.ctorendang.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ctorendang /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 4. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d ctorendang.com -d www.ctorendang.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

### 5. Setup Firewall

```bash
# Configure UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## Monitoring & Logging

### 1. Application Logs

```bash
# Docker logs
docker-compose logs -f ctorendang

# Follow specific service
docker-compose logs -f --tail=100 ctorendang
```

### 2. System Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop nethogs -y

# Monitor resources
htop

# Monitor disk I/O
sudo iotop

# Monitor network
sudo nethogs
```

### 3. Health Checks

```bash
# Check application health
curl http://localhost:3000/health

# Check from external
curl https://ctorendang.com/health
```

---

## Security Checklist

### Application Security
- [ ] Environment variables properly configured
- [ ] No secrets in code or version control
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] CORS properly configured

### Server Security
- [ ] Firewall configured (UFW/iptables)
- [ ] SSH key-based authentication only
- [ ] Fail2ban installed and configured
- [ ] Regular security updates enabled
- [ ] Non-root user for application
- [ ] Docker containers run as non-root

### Monitoring
- [ ] Application logs configured
- [ ] Error tracking setup (Sentry recommended)
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Backup strategy implemented

---

## Backup & Recovery

### Database Backup (when implemented)
```bash
# Backup PostgreSQL
docker exec ctorendang-db pg_dump -U postgres ctorendang > backup.sql

# Restore
docker exec -i ctorendang-db psql -U postgres ctorendang < backup.sql
```

### Application Backup
```bash
# Backup configuration
tar -czf ctorendang-backup-$(date +%Y%m%d).tar.gz \
  .env \
  docker-compose.yml \
  /opt/ctorendang/data
```

---

## Troubleshooting

### Application Won't Start
```bash
# Check logs
docker-compose logs ctorendang

# Check container status
docker-compose ps

# Restart services
docker-compose restart
```

### High Memory Usage
```bash
# Check container stats
docker stats

# Restart container
docker-compose restart ctorendang
```

### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

---

## Scaling & Performance

### Horizontal Scaling
```bash
# Scale to multiple instances
docker-compose up -d --scale ctorendang=3

# Use load balancer (Nginx, HAProxy, Traefik)
```

### Performance Optimization
- Enable Nginx caching
- Use CDN for static assets (Cloudflare, AWS CloudFront)
- Implement Redis caching (when backend is added)
- Enable gzip compression
- Optimize images and assets

---

## Support

For deployment issues:
- **Email**: hello@ctorendang.com
- **GitHub Issues**: https://github.com/TrillionUnicorn/CTOrendang/issues
- **Discord**: https://discord.gg/ctorendang

---

**Last Updated**: 2024-10-14

