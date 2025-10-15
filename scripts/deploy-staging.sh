#!/bin/bash
# Staging Deployment Script
# Run with: bash scripts/deploy-staging.sh

set -e

echo "🚀 CTOrendang - Staging Deployment"
echo "===================================="
echo ""

GREEN='\033[0;32m'
NC='\033[0m'

# Run tests
echo "🧪 Running tests..."
bun run test
echo -e "${GREEN}✅ Tests passed${NC}"
echo ""

# Build
echo "📦 Building..."
bun run build
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Deploy to Vercel staging
echo "🚀 Deploying to staging..."
vercel
echo -e "${GREEN}✅ Deployment successful${NC}"
echo ""

echo "===================================="
echo -e "${GREEN}🎉 Staging Deployment Complete!${NC}"
echo "===================================="
echo ""

