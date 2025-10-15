#!/bin/bash
# Production Deployment Script
# Run with: bash scripts/deploy-production.sh

set -e  # Exit on error

echo "🚀 CTOrendang - Production Deployment"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're on main branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo -e "${RED}❌ Error: Must be on main branch to deploy to production${NC}"
    echo "Current branch: $BRANCH"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}❌ Error: You have uncommitted changes${NC}"
    git status -s
    exit 1
fi

echo -e "${GREEN}✅ Git checks passed${NC}"
echo ""

# Run tests
echo "🧪 Running tests..."
bun run test || {
    echo -e "${RED}❌ Tests failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Tests passed${NC}"
echo ""

# Type check
echo "🔍 Type checking..."
bun run check || {
    echo -e "${RED}❌ Type check failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Type check passed${NC}"
echo ""

# Lint
echo "🔍 Linting..."
bun run lint || {
    echo -e "${RED}❌ Lint failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Lint passed${NC}"
echo ""

# Build
echo "📦 Building..."
bun run build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Backup database
echo "💾 Creating database backup..."
bun run db:backup || {
    echo -e "${YELLOW}⚠️  Database backup failed (continuing anyway)${NC}"
}
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod || {
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Deployment successful${NC}"
echo ""

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
sleep 10

# Health check
echo "🏥 Running health check..."
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://ctorendang.com/api/health)

if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed (HTTP $HEALTH_RESPONSE)${NC}"
    exit 1
fi

echo ""
echo "======================================"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "======================================"
echo ""
echo "Production URL: https://ctorendang.com"
echo "Admin Dashboard: https://ctorendang.com/admin"
echo "API Health: https://ctorendang.com/api/health"
echo ""
echo "Next steps:"
echo "1. Monitor Sentry for errors"
echo "2. Check Vercel analytics"
echo "3. Monitor user signups"
echo ""

