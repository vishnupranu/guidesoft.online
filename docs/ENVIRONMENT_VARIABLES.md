# Environment Variables Reference

This document provides a complete reference for all environment variables used by GUIDESOFT.AI.

---

## Required Environment Variables

These variables **must** be set for the application to function correctly.

### App Infrastructure

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `POSTGRES_URL` | string | PostgreSQL connection string. Automatically provided when deploying to Vercel via the Neon integration, or set manually for local development. | `postgres://user:pass@host:5432/db` |
| `SANDBOX_VERCEL_TOKEN` | string | Vercel API token used for creating and managing sandboxes. | `vercel_api_token_abc123` |
| `SANDBOX_VERCEL_TEAM_ID` | string | Vercel team ID for sandbox creation. | `team_abc123` |
| `SANDBOX_VERCEL_PROJECT_ID` | string | Vercel project ID for sandbox creation. | `prj_abc123` |
| `JWE_SECRET` | string | Base64-encoded secret for encrypting and decrypting session tokens. Generate with: `openssl rand -base64 32` | `a1b2c3d4e5f6...` |
| `ENCRYPTION_KEY` | string | 32-byte hex string for encrypting user API keys and tokens at rest. Generate with: `openssl rand -hex 32` | `a1b2c3d4e5f6...` |
| `NEXT_PUBLIC_AUTH_PROVIDERS` | string | Comma-separated list of enabled authentication providers. Must include at least one. | `github` or `vercel` or `github,vercel` |

### Authentication Providers (At Least One Required)

#### GitHub OAuth (if `github` is in `NEXT_PUBLIC_AUTH_PROVIDERS`)

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | string | GitHub OAuth app client ID (exposed to the browser). | `Ov23liabc123` |
| `GITHUB_CLIENT_SECRET` | string | GitHub OAuth app client secret (server-side only). | `ghs_abc123...` |

#### Vercel OAuth (if `vercel` is in `NEXT_PUBLIC_AUTH_PROVIDERS`)

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `NEXT_PUBLIC_VERCEL_CLIENT_ID` | string | Vercel OAuth app client ID (exposed to the browser). | `abc123` |
| `VERCEL_CLIENT_SECRET` | string | Vercel OAuth app client secret (server-side only). | `abc123...` |

---

## Optional Environment Variables

These variables enhance functionality but are not strictly required. Users can provide their own API keys in their profile settings, which take precedence over global values.

### AI Provider API Keys

| Variable | Type | Description | Default |
|----------|------|-------------|---------|
| `ANTHROPIC_API_KEY` | string | Anthropic API key for Claude agent. Users can override in their profile. | — |
| `OPENAI_API_KEY` | string | OpenAI API key for Codex and OpenCode agents. Users can override in their profile. | — |
| `GEMINI_API_KEY` | string | Google Gemini API key for Gemini agent. Users can override in their profile. | — |
| `CURSOR_API_KEY` | string | Cursor API key for Cursor agent. Users can override in their profile. | — |
| `AI_GATEWAY_API_KEY` | string | AI Gateway API key for branch name generation and Codex execution. Users can override in their profile. | — |

### GitHub Integration

| Variable | Type | Description | Default |
|----------|------|-------------|---------|
| `NPM_TOKEN` | string | npm token for installing private npm packages in sandboxes. | — |

### Configuration Defaults

| Variable | Type | Description | Default |
|----------|------|-------------|---------|
| `MAX_SANDBOX_DURATION` | string | Default maximum sandbox duration in minutes. | `300` (5 hours) |
| `MAX_MESSAGES_PER_DAY` | string | Maximum number of tasks + follow-up messages per user per day. | `5` |

---

## Example `.env.local` File

```bash
# ============================================
# GUIDESOFT.AI Environment Variables
# ============================================

# --- Required: App Infrastructure ---
POSTGRES_URL=postgres://user:password@localhost:5432/guidesoft
SANDBOX_VERCEL_TOKEN=vercel_api_token_your_token_here
SANDBOX_VERCEL_TEAM_ID=your_team_id_here
SANDBOX_VERCEL_PROJECT_ID=your_project_id_here
JWE_SECRET=base64_encoded_secret_here
ENCRYPTION_KEY=32_byte_hex_string_here

# --- Required: Authentication ---
# Choose at least one provider: github, vercel, or both
NEXT_PUBLIC_AUTH_PROVIDERS=github

# --- GitHub OAuth (required if github is enabled) ---
NEXT_PUBLIC_GITHUB_CLIENT_ID=Ov23li_your_github_client_id
GITHUB_CLIENT_SECRET=ghs_your_github_client_secret

# --- Vercel OAuth (required if vercel is enabled) ---
# NEXT_PUBLIC_VERCEL_CLIENT_ID=your_vercel_client_id
# VERCEL_CLIENT_SECRET=your_vercel_client_secret

# --- Optional: AI Provider API Keys ---
# These are fallback keys for all users. Users can override in their profile.
# ANTHROPIC_API_KEY=sk-ant-your_key_here
# OPENAI_API_KEY=sk-your_openai_key_here
# GEMINI_API_KEY=your_gemini_key_here
# CURSOR_API_KEY=cur_your_cursor_key_here
# AI_GATEWAY_API_KEY=your_ai_gateway_key_here

# --- Optional: GitHub Integration ---
# NPM_TOKEN=npm_your_token_here

# --- Optional: Configuration Defaults ---
# MAX_SANDBOX_DURATION=300
# MAX_MESSAGES_PER_DAY=5
```

---

## Security Notes

- **Never commit `.env` files** to version control. The `.env.example` file is safe to commit.
- **Server-side only variables** (`SANDBOX_VERCEL_TOKEN`, `GITHUB_CLIENT_SECRET`, etc.) must never be exposed to the client.
- **Client-safe variables** must be prefixed with `NEXT_PUBLIC_` and should only contain non-sensitive values.
- **Rotate API keys** regularly and follow the principle of least privilege.
- **Encryption keys** (`JWE_SECRET`, `ENCRYPTION_KEY`) should be generated using cryptographically secure random generators.