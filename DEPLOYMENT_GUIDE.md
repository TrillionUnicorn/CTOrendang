# CTOrendang - Production Deployment Guide

**Last Updated**: October 14, 2024  
**Status**: Production-Ready  
**Architecture**: Vercel + Railway + Cloudflare

---

## 🎯 DEPLOYMENT ARCHITECTURE

### Infrastructure:
- **Frontend/API**: Vercel (Serverless)
- **Database**: Railway (PostgreSQL 16)
- **File Storage**: Cloudflare R2
- **Email**: Resend
- **Payments**: Stripe
- **AI**: OpenAI + Pinecone
- **Monitoring**: Sentry

---

## 📋 ENVIRONMENT VARIABLES

### Required Variables:
```env
# Database
DATABASE_URL=postgresql://...

# Auth
SESSION_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# AI
OPENAI_API_KEY=...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...

# Payments
STRIPE_SECRET_KEY=...
PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Email
RESEND_API_KEY=...

# Storage
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...

# Monitoring
SENTRY_DSN=...

# App
PUBLIC_URL=https://ctorendang.com
NODE_ENV=production
```

---

## 🚀 DEPLOYMENT STEPS

### 1. Vercel Deployment
```bash
# Install CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Database Setup (Railway)
```bash
# Run migrations
bun run db:push

# Seed data
bun run db:seed
```

### 3. Configure Webhooks
- Stripe: `https://ctorendang.com/api/webhooks/stripe`

---

## 🧪 POST-DEPLOYMENT

### Smoke Tests:
```bash
curl https://ctorendang.com
curl https://ctorendang.com/api/health
```

### Monitor:
- Vercel Dashboard
- Sentry Errors
- Railway Metrics

---

**Status**: Ready to deploy ✅

