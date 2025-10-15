#!/bin/bash
# Production Database Migration Script
# Run with: bash scripts/migrate-production.sh

set -e

echo "🗄️  CTOrendang - Production Database Migration"
echo "=============================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ Error: DATABASE_URL not set${NC}"
    echo "Please set DATABASE_URL environment variable"
    exit 1
fi

echo -e "${YELLOW}⚠️  WARNING: This will modify the production database${NC}"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Migration cancelled"
    exit 0
fi

# Backup database first
echo ""
echo "💾 Creating backup..."
bun run db:backup || {
    echo -e "${RED}❌ Backup failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Backup created${NC}"
echo ""

# Run migrations
echo "🔄 Running migrations..."
bun run db:push || {
    echo -e "${RED}❌ Migration failed${NC}"
    echo "Database backup is available in backups/ directory"
    exit 1
}
echo -e "${GREEN}✅ Migrations complete${NC}"
echo ""

# Verify database
echo "🔍 Verifying database..."
bun run db:generate
echo -e "${GREEN}✅ Database verified${NC}"
echo ""

echo "=============================================="
echo -e "${GREEN}🎉 Migration Complete!${NC}"
echo "=============================================="
echo ""

