# Dokploy Deployment Guide

This guide covers deploying GUIDESOFT.ONLINE to Dokploy with zero failures.

## Prerequisites

- A running Dokploy instance
- PostgreSQL database (Neon, Supabase, or self-hosted)
- Vercel account (for Sandbox and AI Gateway features)
- GitHub OAuth app configured
- Node.js 20+ environment variables ready

## Step 1: Prepare Environment Variables

Copy `.env.example` to your Dokploy environment configuration and fill in all values:

```bash
cp .env.example .env.local
```

### Required Variables

| Variable | Description | Get From |
|----------|-------------|----------|
| `POSTGRES_URL` | PostgreSQL connection string | Neon/Supabase dashboard |
| `JWE_SECRET` | Session encryption key | `openssl rand -base64 32` |
| `ENCRYPTION_KEY` | Data encryption key | `openssl rand -hex 32` |
| `SANDBOX_VERCEL_TOKEN` | Vercel API token | Vercel dashboard > Tokens |
| `SANDBOX_VERCEL_TEAM_ID` | Vercel team ID | Vercel dashboard > Settings |
| `SANDBOX_VERCEL_PROJECT_ID` | Vercel project ID | Vercel project settings |
| `NEXT_PUBLIC_AUTH_PROVIDERS` | Comma-separated providers | `github,vercel` |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | GitHub OAuth client ID | GitHub Developer Settings |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | GitHub Developer Settings |
| `NEXT_PUBLIC_VERCEL_CLIENT_ID` | Vercel OAuth client ID | Vercel Integrations |
| `VERCEL_CLIENT_SECRET` | Vercel OAuth client secret | Vercel Integrations |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Claude agent API key | - |
| `AI_GATEWAY_API_KEY` | AI Gateway API key | - |
| `CURSOR_API_KEY` | Cursor agent API key | - |
| `GEMINI_API_KEY` | Google Gemini API key | - |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `NPM_TOKEN` | Private npm access | - |
| `MAX_SANDBOX_DURATION` | Sandbox timeout (minutes) | `300` |
| `MAX_MESSAGES_PER_DAY` | Daily message limit | `5` |
| `WEBHOOK_API_KEY` | Webhook authentication key | - |
| `FASTAPI_URL` | Celery task queue URL | `http://localhost:8000` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | - |

## Step 2: Connect Dokploy to Your Repository

1. Open your Dokploy dashboard
2. Navigate to **Projects** > **Add New Project**
3. Select **GitHub** as the source provider
4. Choose the `guidesoft.online` repository
5. Dokploy will auto-detect the `dokploy.yaml` file

## Step 3: Configure Deployment

### Dokploy YAML Configuration

The `dokploy.yaml` file at the project root defines the deployment:

```yaml
name: guidesoft-online

services:
  - name: guidesoft-online
    type: dockerfile
    dockerfilePath: Dockerfile
    buildContext: .
    ports:
      - 3000:3000
    env:
      - POSTGRES_URL
      - SANDBOX_VERCEL_TOKEN
      - SANDBOX_VERCEL_TEAM_ID
      - SANDBOX_VERCEL_PROJECT_ID
      - JWE_SECRET
      - ENCRYPTION_KEY
      - NEXT_PUBLIC_AUTH_PROVIDERS
      - NEXT_PUBLIC_GITHUB_CLIENT_ID
      - GITHUB_CLIENT_SECRET
      - NEXT_PUBLIC_VERCEL_CLIENT_ID
      - VERCEL_CLIENT_SECRET
      - ANTHROPIC_API_KEY
      - AI_GATEWAY_API_KEY
      - CURSOR_API_KEY
      - GEMINI_API_KEY
      - OPENAI_API_KEY
      - NPM_TOKEN
      - MAX_SANDBOX_DURATION
      - MAX_MESSAGES_PER_DAY
      - WEBHOOK_API_KEY
      - FASTAPI_URL
      - NEXT_PUBLIC_GOOGLE_CLIENT_ID
      - GOOGLE_CLIENT_SECRET
    healthCheck:
      path: /api/auth/info
      port: 3000
      method: GET
      interval: 30
      timeout: 10
      retries: 3
    restart: always
    deploy:
      replicas: 1
      resources:
        cpu: 1
        memory: 2Gi
```

### Key Settings

- **Dockerfile path**: Points to the root `Dockerfile`
- **Build context**: `.` (project root)
- **Port mapping**: `3000:3000` (Next.js default)
- **Health check**: Hits `/api/auth/info` to verify the app is running
- **Restart policy**: `always` ensures the container restarts on failure
- **Resources**: 1 CPU, 2GB RAM minimum

## Step 4: Set Environment Variables in Dokploy

1. In Dokploy, go to your project settings
2. Navigate to **Environment Variables**
3. Add each variable from `.env.example` with its value
4. **Do NOT commit `.env.local`** — Dokploy manages env vars separately

## Step 5: Deploy

1. Click **Deploy** in Dokploy
2. Monitor the build logs for any errors
3. The health check will verify the app is responding
4. Once healthy, your app is live at the assigned Dokploy URL

## Step 6: Post-Deployment Setup

### Database Migration

Run database migrations after the first successful deploy:

```bash
# In Dokploy, go to your project's terminal/execute tab
pnpm db:generate
pnpm db:push
```

Or add a post-deploy script to your `dokploy.yaml`:

```yaml
commands:
  postDeploy:
    - pnpm db:generate
    - pnpm db:push
```

### OAuth Callback URLs

Update your OAuth app configurations with the production Dokploy URL:

**GitHub OAuth App:**
- Homepage URL: `https://your-dokploy-url.com`
- Authorization callback URL: `https://your-dokploy-url.com/api/auth/github/callback`

**Vercel OAuth App:**
- Redirect URL: `https://your-dokploy-url.com/api/auth/callback/vercel`

**Google OAuth App (if used):**
- Authorized redirect URI: `https://your-dokploy-url.com/api/auth/google/callback`

## Step 7: Verify All Routers and Webhooks

### Router Health Check

After deployment, verify all routes are working:

| Route | Endpoint | Purpose |
|-------|----------|---------|
| Auth | `/api/auth/info` | Session info |
| Auth | `/api/auth/signin/github` | GitHub sign-in |
| Auth | `/api/auth/signin/vercel` | Vercel sign-in |
| Auth | `/api/auth/signout` | Sign out |
| Auth | `/api/auth/callback/vercel` | Vercel OAuth callback |
| Auth | `/api/auth/github/callback` | GitHub OAuth callback |
| Tasks | `/api/tasks` | Task CRUD |
| Repos | `/api/repos/[owner]/[repo]/commits` | Git commits |
| Repos | `/api/repos/[owner]/[repo]/issues` | GitHub issues |
| Repos | `/api/repos/[owner]/[repo]/pull-requests` | Pull requests |
| Sandbox | `/api/sandboxes` | Sandbox management |
| Vercel | `/api/vercel/teams` | Vercel teams |
| Webhooks | `/api/webhooks` | Generic webhook endpoint |
| Webhooks | `/api/webhooks/make` | Make.com webhook |
| Webhooks | `/api/webhooks/n8n` | n8n webhook |
| Payments | `/api/payments/create-order` | Razorpay order |
| Payments | `/api/payments/verify` | Payment verification |
| Orchestrator | `/api/orchestrator` | AI task orchestration |
| GitHub | `/api/github/user` | GitHub user info |
| GitHub | `/api/github/repos` | Repository management |
| GitHub | `/api/github-stars` | Starred repos |

### Webhook Setup

For external integrations (Make.com, n8n):

1. Go to the webhook provider's dashboard
2. Set the URL to `https://your-dokploy-url.com/api/webhooks/make` or `/api/webhooks/n8n`
3. Add the `x-api-key` header with your `WEBHOOK_API_KEY` value
4. Test the webhook by triggering a sample event

## Troubleshooting

### Build Fails

- Check that `pnpm-lock.yaml` is committed to git
- Ensure `node_modules` is in `.dockerignore`
- Verify all dependencies are listed in `package.json`

### App Crashes After Deploy

- Check `POSTGRES_URL` is set correctly
- Verify `JWE_SECRET` and `ENCRYPTION_KEY` are defined
- Ensure all required OAuth credentials are present
- Check Dokploy logs for error messages

### Auth Redirect Loop

- Verify `NEXT_PUBLIC_AUTH_PROVIDERS` is set
- Check OAuth callback URLs match your Dokploy domain exactly
- Ensure `JWE_SECRET` is a valid base64 string

### Webhooks Return 401

- Verify `WEBHOOK_API_KEY` is set in environment variables
- Check that the `x-api-key` header is sent with the webhook request

### Sandbox Creation Fails

- Verify `SANDBOX_VERCEL_TOKEN`, `SANDBOX_VERCEL_TEAM_ID`, and `SANDBOX_VERCEL_PROJECT_ID` are correct
- Ensure the Vercel API token has the `sandbox` scope

## Scaling

For high-availability deployments, update `dokploy.yaml`:

```yaml
deploy:
  replicas: 3
  resources:
    cpu: 2
    memory: 4Gi
```

## Rollback

To rollback to the previous deployment in Dokploy:

1. Go to **Deployments** in the Dokploy dashboard
2. Select the previous successful deployment
3. Click **Rollback**
4. The previous version will be redeployed automatically