# 🚀 CTOrendang - Quick Start Guide

Get CTOrendang running locally in 5 minutes!

---

## ⚡ Prerequisites

- **Bun** 1.1.42+ ([Install](https://bun.sh))
- **PostgreSQL** 16+ ([Install](https://www.postgresql.org/download/))
- **Git** ([Install](https://git-scm.com/downloads))

---

## 📦 Installation

### 1. Clone Repository
```bash
git clone https://github.com/TrillionUnicorn/CTOrendang.git
cd CTOrendang
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ctorendang"
SESSION_SECRET="your-secret-key-here"
```

### 4. Setup Database
```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Seed with test data
bun run db:seed
```

### 5. Start Development Server
```bash
bun run dev
```

Visit: **http://localhost:5173**

---

## 🧪 Test Credentials

After seeding, you can login with:

**Founder Account:**
- Email: `founder@example.com`
- Password: `Test123!@#`

**CTO Accounts:**
- Email: `sarah.cto@example.com`
- Password: `Test123!@#`

---

## 🔧 Common Commands

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run preview          # Preview production build

# Database
bun run db:studio        # Open Prisma Studio
bun run db:migrate       # Create migration
bun run db:seed          # Seed database

# Testing
bun run test             # Run tests
bun run test:ui          # Test UI mode

# Code Quality
bun run check            # Type check
bun run lint             # Lint code
bun run format           # Format code
```

---

## 📚 Next Steps

1. **Read Documentation**
   - [Production Setup](PRODUCTION_SETUP.md)
   - [API Documentation](API_DOCUMENTATION.md)
   - [Deployment Guide](DEPLOYMENT_GUIDE.md)

2. **Configure Services**
   - Setup Stripe account
   - Get OpenAI API key
   - Create Pinecone index

3. **Deploy**
   - Follow [Deployment Guide](DEPLOYMENT_GUIDE.md)

---

## 🆘 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Verify DATABASE_URL in .env
```

### Prisma Client Error
```bash
# Regenerate Prisma client
bun run db:generate
```

### Port Already in Use
```bash
# Change port in vite.config.ts
# Or kill process on port 5173
lsof -ti:5173 | xargs kill
```

---

## 📞 Support

- **Documentation**: See `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/TrillionUnicorn/CTOrendang/issues)
- **Email**: support@ctorendang.com

---

**Ready to build! 🚀**

