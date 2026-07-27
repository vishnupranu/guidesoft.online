# GUIDESOFT.AI

> AI-powered autonomous coding platform for building, refactoring, testing, and deploying applications through natural language.

[![GitHub Repository](https://img.shields.io/badge/GitHub-vishnupranu%2Fguidesoft.online-blue?logo=github)](https://github.com/vishnupranu/guidesoft.online)
[![Vercel Live](https://img.shields.io/badge/Vercel-guidesoft.online-brightgreen?logo=vercel)](https://guidesoft.online)

---

## Overview

GUIDESOFT.AI is an advanced autonomous multi-agent AI coding platform. It allows users to build, refactor, test, and deploy applications by chatting with AI agents powered by top cloud and local AI models, all within isolated Vercel Sandbox environments.

---

## Features

- **Multi-Agent Coding Engine**
  - Claude Code CLI (`claude-3-7-sonnet`, `claude-3-5-sonnet`)
  - OpenAI Codex CLI (`gpt-4o`, `gpt-4.5-turbo`, `o3-mini`, `o1`)
  - GitHub Copilot CLI
  - Cursor CLI (`cursor-fast`, `cursor-small`)
  - Google Gemini CLI (`gemini-2.0-flash`, `gemini-1.5-pro`)
  - OpenSource & Local Models (Ollama & OpenRouter): DeepSeek R1, Qwen 2.5 Coder, Llama 3.3, Mistral NeMo, Codestral
- **Vercel Sandbox Execution**: Isolated cloud environments for building, running tests, and spinning up dev servers.
- **GitHub Integration**: Authenticate with GitHub, connect repositories, create branches, commit code, and manage Pull Requests.
- **Agentic Skills Hub**: Built-in open-source system prompts, MCP tool connectors, and skill workflows.
- **Split Auth Modal**: Seamless Sign In / Sign Up toggling with split-screen branding.
- **User Authentication**: Secure OAuth with GitHub, Vercel, and Google providers.
- **Per-User API Keys**: Users can manage their own API keys for Anthropic, OpenAI, Cursor, Gemini, and AI Gateway.
- **MCP Server Support**: Connect custom MCP servers to extend Claude Code with additional tools.
- **Task Management**: Create, monitor, and manage AI coding tasks with real-time logs and progress tracking.
- **Sandbox Keep-Alive**: Keep sandboxes alive after task completion for iterative development.
- **AI Branch Name Generation**: Automatic descriptive Git branch names using AI SDK 5 and Vercel AI Gateway.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS |
| **UI Components** | shadcn/ui, Radix UI primitives |
| **Database** | PostgreSQL with Drizzle ORM |
| **AI SDK** | AI SDK 5 with Vercel AI Gateway |
| **AI Agents** | Claude Code, OpenAI Codex CLI, GitHub Copilot CLI, Cursor CLI, Google Gemini CLI, opencode |
| **Sandbox** | Vercel Sandbox |
| **Authentication** | NextAuth.js (OAuth with GitHub/Vercel/Google) |
| **Encryption** | JWE (JSON Web Encryption) for session tokens, per-user encryption for API keys |
| **Payments** | Razorpay |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL database

### Installation

1. Clone the repository

```bash
git clone https://github.com/vishnupranu/guidesoft.online.git
cd guidesoft.online
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

Create a `.env.local` file with your values (see [Environment Variables](docs/ENVIRONMENT_VARIABLES.md) for details).

4. Set up the database

```bash
pnpm db:generate
pnpm db:push
```

5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

See [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md) for a complete list of all environment variables.

### Quick Reference

#### Required

- `POSTGRES_URL` - PostgreSQL connection string
- `SANDBOX_VERCEL_TOKEN` - Vercel API token for sandbox creation
- `SANDBOX_VERCEL_TEAM_ID` - Vercel team ID
- `SANDBOX_VERCEL_PROJECT_ID` - Vercel project ID
- `JWE_SECRET` - Base64-encoded secret for session encryption
- `ENCRYPTION_KEY` - 32-byte hex string for encrypting user API keys
- `NEXT_PUBLIC_AUTH_PROVIDERS` - Comma-separated list of enabled auth providers

#### Optional

- `ANTHROPIC_API_KEY` - Anthropic API key for Claude agent
- `OPENAI_API_KEY` - OpenAI API key for Codex and OpenCode agents
- `GEMINI_API_KEY` - Google Gemini API key
- `CURSOR_API_KEY` - Cursor API key
- `AI_GATEWAY_API_KEY` - AI Gateway API key for branch name generation
- `NEXT_PUBLIC_GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret
- `NEXT_PUBLIC_VERCEL_CLIENT_ID` - Vercel OAuth client ID
- `VERCEL_CLIENT_SECRET` - Vercel OAuth client secret
- `NPM_TOKEN` - For private npm packages
- `MAX_SANDBOX_DURATION` - Default sandbox duration in minutes (default: `300`)
- `MAX_MESSAGES_PER_DAY` - Max tasks + follow-ups per user per day (default: `5`)

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Add all required environment variables in the Vercel dashboard
4. Deploy

### Environment-Specific Configuration

- **Development**: Use `.env.local` with `NEXT_PUBLIC_AUTH_PROVIDERS=github`
- **Production**: Set all required variables in Vercel project settings and configure OAuth callback URLs for your production domain

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run quality checks:

```bash
pnpm format
pnpm type-check
pnpm lint
```

5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull request

### Code Quality

- All code must pass `pnpm format`, `pnpm type-check`, and `pnpm lint`
- Follow the existing code conventions and patterns
- Write descriptive commit messages
- No dynamic values in log statements (use static strings only)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Production Links

- **Live Web App**: [https://guidesoft.online](https://guidesoft.online)
- **Vercel Production**: [https://guidesoft.online-inky-beta.vercel.app](https://guidesoft.online-inky-beta.vercel.app)
- **GitHub Repository**: [https://github.com/vishnupranu/guidesoft.online](https://github.com/vishnupranu/guidesoft.online)