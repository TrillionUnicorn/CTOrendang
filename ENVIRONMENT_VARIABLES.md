# Environment Variables Documentation

Complete guide to all environment variables used in CTOrendang.

---

## 🔐 Required Variables

### Database
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```
- **Description**: PostgreSQL connection string
- **Format**: `postgresql://[user]:[password]@[host]:[port]/[database]`
- **Provider**: Railway, Supabase, or any PostgreSQL host
- **Required**: Yes

### Session
```env
SESSION_SECRET="your-super-secret-session-key-min-32-chars"
```
- **Description**: Secret key for session encryption
- **Format**: Random string (minimum 32 characters)
- **Generate**: `openssl rand -base64 32`
- **Required**: Yes

---

## 🤖 AI Services (Required for AI Features)

### OpenAI
```env
OPENAI_API_KEY="sk-..."
```
- **Description**: OpenAI API key for GPT-4
- **Get Key**: https://platform.openai.com/api-keys
- **Required**: Yes (for project analysis)

### Pinecone
```env
PINECONE_API_KEY="..."
PINECONE_ENVIRONMENT="us-west1-gcp"
PINECONE_INDEX_NAME="ctorendang"
```
- **Description**: Pinecone vector database for CTO matching
- **Get Key**: https://www.pinecone.io/
- **Required**: Yes (for CTO matching)

---

## 💳 Payment Processing (Required for Subscriptions)

### Stripe
```env
STRIPE_SECRET_KEY="sk_test_..." # or sk_live_...
STRIPE_PUBLISHABLE_KEY="pk_test_..." # or pk_live_...
STRIPE_WEBHOOK_SECRET="whsec_..."
```
- **Description**: Stripe payment processing
- **Get Keys**: https://dashboard.stripe.com/apikeys
- **Webhook**: https://dashboard.stripe.com/webhooks
- **Required**: Yes (for payments)

---

## 📧 Email Service (Required for Notifications)

### Resend
```env
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@ctorendang.com"
```
- **Description**: Email service for notifications
- **Get Key**: https://resend.com/api-keys
- **Domain**: Must verify domain in Resend
- **Required**: Yes (for emails)

---

## 📦 File Storage (Optional)

### Cloudflare R2
```env
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_BUCKET_NAME="ctorendang-uploads"
```
- **Description**: S3-compatible object storage
- **Get Keys**: https://dash.cloudflare.com/
- **Required**: No (falls back to local storage)

---

## 🔐 OAuth Providers (Optional)

### Google OAuth
```env
GOOGLE_CLIENT_ID="...apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."
GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback/google"
```
- **Description**: Google OAuth login
- **Get Keys**: https://console.cloud.google.com/apis/credentials
- **Required**: No (but recommended)

### GitHub OAuth
```env
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GITHUB_REDIRECT_URI="http://localhost:5173/auth/callback/github"
```
- **Description**: GitHub OAuth login
- **Get Keys**: https://github.com/settings/developers
- **Required**: No (but recommended)

---

## 📊 Monitoring (Optional)

### Sentry
```env
SENTRY_DSN="https://...@sentry.io/..."
SENTRY_ORG="your-org"
SENTRY_PROJECT="ctorendang"
SENTRY_AUTH_TOKEN="..."
```
- **Description**: Error tracking and monitoring
- **Get Keys**: https://sentry.io/
- **Required**: No (but recommended for production)

---

## 🌐 Application Settings

### Public URL
```env
PUBLIC_URL="http://localhost:5173"
```
- **Description**: Base URL of the application
- **Development**: `http://localhost:5173`
- **Production**: `https://ctorendang.com`
- **Required**: Yes

### Node Environment
```env
NODE_ENV="development"
```
- **Description**: Application environment
- **Values**: `development`, `production`, `test`
- **Required**: Yes

---

## 🎛️ Feature Flags (Optional)

```env
PUBLIC_ENABLE_AI_ANALYSIS=true
PUBLIC_ENABLE_CTO_MARKETPLACE=true
PUBLIC_ENABLE_WAITLIST=false
```
- **Description**: Toggle features on/off
- **Values**: `true` or `false`
- **Required**: No (defaults to true)

---

## 📝 Example .env File

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ctorendang"

# Session
SESSION_SECRET="your-super-secret-session-key-min-32-chars"

# AI Services
OPENAI_API_KEY="sk-..."
PINECONE_API_KEY="..."
PINECONE_ENVIRONMENT="us-west1-gcp"
PINECONE_INDEX_NAME="ctorendang"

# Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@ctorendang.com"

# OAuth (Optional)
GOOGLE_CLIENT_ID="...apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."
GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback/google"

GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GITHUB_REDIRECT_URI="http://localhost:5173/auth/callback/github"

# Storage (Optional)
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_BUCKET_NAME="ctorendang-uploads"

# Monitoring (Optional)
SENTRY_DSN="https://...@sentry.io/..."

# Application
PUBLIC_URL="http://localhost:5173"
NODE_ENV="development"

# Feature Flags
PUBLIC_ENABLE_AI_ANALYSIS=true
PUBLIC_ENABLE_CTO_MARKETPLACE=true
PUBLIC_ENABLE_WAITLIST=false
```

---

## 🔒 Security Best Practices

1. **Never commit .env files** - Always in .gitignore
2. **Use different keys** for development and production
3. **Rotate secrets regularly** - Especially after team changes
4. **Use environment-specific values** - Different for dev/staging/prod
5. **Limit access** - Only give keys to those who need them
6. **Use secret managers** - Consider AWS Secrets Manager, Vault, etc.

---

## 📞 Getting Help

If you need help setting up environment variables:
1. Check the [QUICKSTART.md](QUICKSTART.md) guide
2. See [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md) for production setup
3. Open an issue on GitHub

---

**Last Updated**: October 15, 2025

