#!/usr/bin/env bash
# =============================================================================
# guidesoft.online — Environment & OAuth Key Setup Script
# =============================================================================
# This script helps you generate the keys and URLs needed for OAuth and
# dokkel deployment. Run it and follow the instructions.
# =============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; }

echo ""
echo "============================================"
echo "  guidesoft.online — Setup Helper"
echo "============================================"
echo ""

# ---------------------------------------------------------------------------
# 1. Generate ENCRYPTION_KEY and JWE_SECRET
# ---------------------------------------------------------------------------
info "Generating encryption keys..."
ENCRYPTION_KEY=$(openssl rand -hex 32)
JWE_SECRET=$(openssl rand -hex 32)
ok "ENCRYPTION_KEY=$ENCRYPTION_KEY"
ok "JWE_SECRET=$JWE_SECRET"

# ---------------------------------------------------------------------------
# 2. GitHub OAuth App URL
# ---------------------------------------------------------------------------
echo ""
info "GitHub OAuth App Setup"
echo "----------------------------------------"
echo "1. Go to: ${GREEN}https://github.com/settings/developers${NC}"
echo "2. Click 'New OAuth App'"
echo "3. Fill in:"
echo "   - Application name: guidesoft.online"
echo "   - Homepage URL: https://guidesoft.online"
echo "   - Authorization callback URL: https://guidesoft.online/api/auth/github/callback"
echo "4. Click 'Register application'"
echo "5. Copy the Client ID → set NEXT_PUBLIC_GITHUB_CLIENT_ID"
echo "6. Click 'Generate a new client secret' → copy and set GITHUB_CLIENT_SECRET"
echo ""
echo "GitHub OAuth App URL:"
echo "  ${GREEN}https://github.com/settings/developers${NC}"

# ---------------------------------------------------------------------------
# 3. Google OAuth Setup URL
# ---------------------------------------------------------------------------
echo ""
info "Google OAuth Setup"
echo "----------------------------------------"
echo "1. Go to: ${GREEN}https://console.cloud.google.com/apis/credentials${NC}"
echo "2. Click 'Create Credentials' → 'OAuth client ID'"
echo "3. Configure consent screen first (if prompted)"
echo "4. Application type: Web application"
echo "5. Name: guidesoft.online"
echo "6. Authorized redirect URIs:"
echo "   - https://guidesoft.online/api/auth/google/callback"
echo "   - http://localhost:3000/api/auth/google/callback"
echo "7. Click 'Create'"
echo "8. Copy the Client ID → set NEXT_PUBLIC_GOOGLE_CLIENT_ID"
echo "9. Copy the Client Secret → set GOOGLE_CLIENT_SECRET"
echo ""
echo "Google Cloud Console URL:"
echo "  ${GREEN}https://console.cloud.google.com/apis/credentials${NC}"

# ---------------------------------------------------------------------------
# 4. Razorpay Setup URL
# ---------------------------------------------------------------------------
echo ""
info "Razorpay Setup"
echo "----------------------------------------"
echo "1. Go to: ${GREEN}https://dashboard.razorpay.com/#/app/developer/create${NC}"
echo "2. Create a new account or log in"
echo "3. Copy the Key ID → set NEXT_PUBLIC_RAZORPAY_KEY_ID"
echo "4. Copy the Key Secret → set RAZORPAY_KEY_SECRET"
echo ""
echo "Razorpay URL:"
echo "  ${GREEN}https://dashboard.razorpay.com/#/app/developer/create${NC}"

# ---------------------------------------------------------------------------
# 5. Vercel Sandbox Tokens
# ---------------------------------------------------------------------------
echo ""
info "Vercel Sandbox Tokens"
echo "----------------------------------------"
echo "1. Go to: ${GREEN}https://vercel.com/settings/tokens${NC}"
echo "2. Click 'Create Token'"
echo "3. Copy the token → set SANDBOX_VERCEL_TOKEN"
echo ""
echo "Team ID: Find at ${GREEN}https://vercel.com/team/${NC} (URL slug)"
echo "Project ID: Find in project Settings → General → Project ID"
echo ""

# ---------------------------------------------------------------------------
# 6. GitHub Personal Access Token (for git operations)
# ---------------------------------------------------------------------------
echo ""
info "GitHub Personal Access Token (PAT)"
echo "----------------------------------------"
echo "1. Go to: ${GREEN}https://github.com/settings/tokens${NC}"
echo "2. Click 'Fine-grained tokens' (recommended) or 'Generate new token'"
echo "3. Select scopes: repo, read:org, write:packages"
echo "4. Generate and copy the token"
echo "5. Store securely — this is NOT the same as the OAuth client secret"
echo ""
echo "GitHub PAT URL:"
echo "  ${GREEN}https://github.com/settings/tokens${NC}"

# ---------------------------------------------------------------------------
# 7. Dokkel Deployment Checklist
# ---------------------------------------------------------------------------
echo ""
info "Dokkel Deployment Checklist"
echo "----------------------------------------"
echo "The following files are already configured for dokkel:"
echo "  ✓ Dockerfile          — Multi-stage build with standalone output"
echo "  ✓ .dockerignore       — Excludes node_modules, .git, etc."
echo "  ✓ next.config.ts      — output: 'standalone'"
echo "  ✓ .gitignore          — Excludes .env* files from git"
echo ""
echo "To deploy to dokkel:"
echo "  1. Push your code to GitHub (do NOT include .env files)"
echo "  2. Go to your dokkel dashboard"
echo "  3. Create a new service / app"
echo "  4. Connect your GitHub repository"
echo "  5. Set these environment variables in dokkel:"
echo "     - POSTGRES_URL"
echo "     - ENCRYPTION_KEY"
echo "     - JWE_SECRET"
echo "     - NEXT_PUBLIC_AUTH_PROVIDERS"
echo "     - NEXT_PUBLIC_GITHUB_CLIENT_ID"
echo "     - GITHUB_CLIENT_SECRET"
echo "     - NEXT_PUBLIC_GOOGLE_CLIENT_ID (if using Google OAuth)"
echo "     - GOOGLE_CLIENT_SECRET (if using Google OAuth)"
echo "     - SANDBOX_VERCEL_TOKEN"
echo "     - SANDBOX_VERCEL_TEAM_ID"
echo "     - SANDBOX_VERCEL_PROJECT_ID"
echo "     - NEXT_PUBLIC_RAZORPAY_KEY_ID"
echo "     - RAZORPAY_KEY_SECRET"
echo "  6. Dojkel will automatically build using the Dockerfile"
echo "  7. The app will be available at the dokkel URL"
echo ""

# ---------------------------------------------------------------------------
# 8. Write .env.local with generated secrets
# ---------------------------------------------------------------------------
echo ""
info "Updating .env.local with generated secrets..."
ENV_LOCAL="/workspace/oauth-google-100576622820892311548/sessions/agent_79482caf-18ff-4643-88b6-6f44e4620230/.env.local"

# Update encryption keys in .env.local
sed -i "s/^ENCRYPTION_KEY=.*/ENCRYPTION_KEY=$ENCRYPTION_KEY/" "$ENV_LOCAL"
sed -i "s/^JWE_SECRET=.*/JWE_SECRET=$JWE_SECRET/" "$ENV_LOCAL"

ok "Updated .env.local with generated encryption keys"

echo ""
echo "============================================"
echo "  Setup complete! Next steps:"
echo "============================================"
echo "  1. Edit .env.local with remaining OAuth credentials"
echo "  2. Never commit .env or .env.local to git"
echo "  3. Push code to GitHub (without .env files)"
echo "  4. Deploy to dokkel using your repo"
echo ""