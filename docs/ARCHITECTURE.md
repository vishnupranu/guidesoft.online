# GUIDESOFT.AI — System Architecture

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Next.js App Router (React 19 + Tailwind CSS)                │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │  │
│  │  │ Dashboard│ │ Tasks    │ │ Repos    │ │ MCP Hub        │  │  │
│  │  │ Page     │ │ Page     │ │ Pages    │ │ Page           │  │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  Components: TaskChat, FileEditor, Terminal, etc.       │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                          │                                          │
│                     HTTP/WS │                                      │
└────────────────────────────┼────────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────────┐
│                     NEXT.JS SERVER (Vercel)                        │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  API Routes (app/api/**/route.ts)                            │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │  │
│  │  │ Auth     │ │ Tasks    │ │ GitHub   │ │ Payments       │  │  │
│  │  │ Routes   │ │ Routes   │ │ Routes   │ │ Routes         │  │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  Webhooks (Make, n8n)                                   │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                          │                                          │
│  ┌───────────────────────┼───────────────────────────────────────┐  │
│  │  Middleware Layer     │                                       │  │
│  │  ┌───────────────────┐│┌────────────────────────────────────┐│  │
│  │  │ Auth Guard        │││ Security Headers (vercel.json)     ││  │
│  │  │ Session Validation│││ Rate Limiting                      ││  │
│  │  │ Role-Based Access │││ Input Validation (Zod)             ││  │
│  │  └───────────────────┘│└────────────────────────────────────┘│  │
│  └───────────────────────┼───────────────────────────────────────┘  │
│                          │                                          │
│  ┌───────────────────────┼───────────────────────────────────────┐  │
│  │  Service Layer        │                                       │  │
│  │  ┌───────────────────┐│┌────────────────┐ ┌────────────────┐│  │
│  │  │ Auth Service      │││ Task Service   │ │ GitHub Service ││  │
│  │  │ (Session, OAuth)  │││ (Sandbox Mgmt) │ │ (Octokit)      ││  │
│  │  └───────────────────┘│└────────────────┘ └────────────────┘│  │
│  │  ┌───────────────────┐│┌────────────────┐ ┌────────────────┐│  │
│  │  │ Payment Service   │││ LLM Gateway    │ │ JWE Crypto     ││  │
│  │  └───────────────────┘│└────────────────┘ └────────────────┘│  │
│  └───────────────────────┼───────────────────────────────────────┘  │
│                          │                                          │
└──────────────────────────┼──────────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────────┐
│                     EXTERNAL SERVICES                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │ Vercel   │ │ Neon     │ │ GitHub   │ │ OpenAI / │ │ Vercel  │ │
│  │ Sandbox  │ │ Postgres │ │ API      │ │ Anthropic│ │ AI      │ │
│  │          │ │          │ │          │ │ Gemini   │ │ Gateway │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema Overview

### Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `users` | User profiles and primary OAuth accounts | `id`, `provider`, `externalId`, `accessToken` (encrypted), `role`, `email` |
| `tasks` | AI coding tasks with sandbox execution | `id`, `userId` (FK), `prompt`, `status`, `sandboxId`, `branchName`, `prUrl` |
| `connectors` | MCP server connectors per user | `id`, `userId` (FK), `name`, `type`, `baseUrl`, `env` (encrypted) |
| `accounts` | Additional linked OAuth accounts (e.g., GitHub for Vercel users) | `id`, `userId` (FK), `provider`, `externalUserId`, `accessToken` (encrypted) |
| `keys` | Per-user API keys for AI services | `id`, `userId` (FK), `provider`, `value` (encrypted) |
| `task_messages` | Chat messages within a task | `id`, `taskId` (FK), `role`, `content`, `createdAt` |
| `settings` | Per-user key-value settings | `id`, `userId` (FK), `key`, `value` |

### Relationships

```
users ──┬──< tasks (cascade delete)
        ├──< connectors (cascade delete)
        ├──< accounts (cascade delete)
        ├──< keys (cascade delete)
        └──< settings (cascade delete)

tasks ──< task_messages (cascade delete)
```

---

## Auth Flow Diagram

```
User clicks "Sign In"
        │
        ▼
┌─────────────────────┐
│  Sign-In Page       │
│  (Split Modal)      │
│  GitHub / Vercel    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     ┌──────────────────────┐
│  OAuth Redirect     │────▶│  Provider Callback    │
│  to GitHub/Vercel   │     │  /api/auth/callback/  │
└─────────────────────┘     │  (github/vercel)      │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │  upsertUser()         │
                            │  - Find or create     │
                            │    user in DB         │
                            │  - Store encrypted    │
                            │    tokens             │
                            │  - Handle identity    │
                            │    merging            │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │  Create JWE Session   │
                            │  (encrypted token)    │
                            └──────────┬───────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │  Redirect to App      │
                            │  /dashboard           │
                            └──────────────────────┘
```

---

## Task Processing Flow

```
User creates task
        │
        ▼
┌─────────────────────┐
│  POST /api/tasks    │
│  - Validate input   │
│  - Create task in DB │
│  - Generate branch  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Create Vercel      │
│  Sandbox            │
│  - Clone repo       │
│  - Install deps     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Start AI Agent     │
│  - Select agent     │
│  - Send prompt      │
│  - Stream response  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Agent executes     │
│  - Edit files       │
│  - Run commands     │
│  - Install packages │
│  - Run tests        │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     ┌──────────────────────┐
│  Commit & Push      │────▶│  Create PR (optional) │
│  to AI branch       │     │  to main branch       │
└─────────┬───────────┘     └──────────────────────┘
          │
          ▼
┌─────────────────────┐
│  Update task status │
│  - completed/err    │
│  - Store preview URL│
│  - Cleanup sandbox  │
└─────────────────────┘
```

---

## API Routes Table

| Route | Method | Description | Auth Required |
|-------|--------|-------------|---------------|
| `/api/auth/signin/github` | GET | Initiate GitHub OAuth flow | No |
| `/api/auth/signin/vercel` | GET | Initiate Vercel OAuth flow | No |
| `/api/auth/signin/google` | GET | Initiate Google OAuth flow | No |
| `/api/auth/callback/vercel` | GET | Vercel OAuth callback | No |
| `/api/auth/github/callback` | GET | GitHub OAuth callback | No |
| `/api/auth/info` | GET | Get current user session info | Yes |
| `/api/auth/signout` | GET | Sign out and clear session | Yes |
| `/api/auth/github/signin` | GET | GitHub sign-in redirect | No |
| `/api/auth/github/callback` | GET | GitHub OAuth callback | No |
| `/api/auth/github/status` | GET | Check GitHub connection status | Yes |
| `/api/auth/github/disconnect` | POST | Disconnect GitHub account | Yes |
| `/api/auth/rate-limit` | GET | Check rate limit status | Yes |
| `/api/tasks` | GET | List user's tasks | Yes |
| `/api/tasks` | POST | Create a new task | Yes |
| `/api/tasks/[taskId]` | GET | Get task details | Yes |
| `/api/tasks/[taskId]` | PATCH | Update task status | Yes |
| `/api/tasks/[taskId]/stop-sandbox` | POST | Stop sandbox for task | Yes |
| `/api/tasks/[taskId]/start-sandbox` | POST | Start sandbox for task | Yes |
| `/api/tasks/[taskId]/messages` | GET | Get task messages | Yes |
| `/api/tasks/[taskId]/files` | GET | List task files | Yes |
| `/api/tasks/[taskId]/file-content` | GET | Get file content | Yes |
| `/api/tasks/[taskId]/save-file` | POST | Save file content | Yes |
| `/api/tasks/[taskId]/create-file` | POST | Create new file | Yes |
| `/api/tasks/[taskId]/delete-file` | POST | Delete file | Yes |
| `/api/tasks/[taskId]/diff` | GET | Get file diff | Yes |
| `/api/tasks/[taskId]/terminal` | GET/WS | Terminal session | Yes |
| `/api/tasks/[taskId]/continue` | POST | Continue task execution | Yes |
| `/api/tasks/[taskId]/autocomplete` | POST | Get code autocomplete | Yes |
| `/api/tasks/[taskId]/lsp` | POST | LSP request | Yes |
| `/api/tasks/[taskId]/create-folder` | POST | Create folder | Yes |
| `/api/tasks/[taskId]/project-files` | GET | Get project file tree | Yes |
| `/api/tasks/[taskId]/sync-changes` | POST | Sync local changes | Yes |
| `/api/tasks/[taskId]/reset-changes` | POST | Reset file changes | Yes |
| `/api/tasks/[taskId]/discard-file-changes` | POST | Discard file changes | Yes |
| `/api/tasks/[taskId]/pr` | POST | Create PR for task | Yes |
| `/api/tasks/[taskId]/pr-comments` | GET | Get PR comments | Yes |
| `/api/tasks/[taskId]/sync-pr` | POST | Sync PR with branch | Yes |
| `/api/tasks/[taskId]/close-pr` | POST | Close PR | Yes |
| `/api/tasks/[taskId]/merge-pr` | POST | Merge PR | Yes |
| `/api/tasks/[taskId]/reopen-pr` | POST | Reopen PR | Yes |
| `/api/tasks/[taskId]/deployment` | GET | Get deployment info | Yes |
| `/api/tasks/[taskId]/check-runs` | GET | Get CI check runs | Yes |
| `/api/tasks/[taskId]/clear-logs` | POST | Clear task logs | Yes |
| `/api/repos/[owner]/[repo]/commits` | GET | Get repo commits | Yes |
| `/api/repos/[owner]/[repo]/issues` | GET | Get repo issues | Yes |
| `/api/repos/[owner]/[repo]/pull-requests` | GET | Get repo PRs | Yes |
| `/api/repos/[owner]/[repo]/pull-requests/[pr_number]/close` | POST | Close PR | Yes |
| `/api/repos/[owner]/[repo]/pull-requests/[pr_number]/check-task` | GET | Check PR task status | Yes |
| `/api/github/repos` | GET | List user's GitHub repos | Yes |
| `/api/github/repos/create` | POST | Create new GitHub repo | Yes |
| `/api/github/user` | GET | Get GitHub user info | Yes |
| `/api/github/user-repos` | GET | Get user repos | Yes |
| `/api/github/orgs` | GET | Get GitHub orgs | Yes |
| `/api/github/pr` | POST | Create PR via GitHub API | Yes |
| `/api/github/verify-repo` | POST | Verify repo access | Yes |
| `/api/connectors` | GET/POST | Manage MCP connectors | Yes |
| `/api/api-keys` | GET/POST | Manage API keys | Yes |
| `/api/api-keys/check` | GET | Check API key status | Yes |
| `/api/payments/create-order` | POST | Create payment order | Yes |
| `/api/payments/verify` | POST | Verify payment | Yes |
| `/api/webhooks` | POST | Generic webhook handler | No |
| `/api/webhooks/make` | POST | Make.com webhook | No |
| `/api/webhooks/n8n` | POST | n8n webhook | No |
| `/api/vercel/teams` | GET | Get Vercel teams | Yes |
| `/api/orchestrator` | POST | AI orchestrator endpoint | Yes |
| `/api/github-stars` | GET | Get GitHub stars | No |
| `/api/contact-admin` | POST | Contact admin form | No |
| `/api/health` | GET | Health check endpoint | No |

---

## Component Hierarchy

```
RootLayout
├── ThemeProvider
│   ├── SessionProvider
│   │   ├── JotaiProvider
│   │   │   ├── AppLayoutWrapper
│   │   │   │   ├── SharedHeader
│   │   │   │   │   ├── Navigation
│   │   │   │   │   ├── UserMenu
│   │   │   │   │   └── ThemeToggle
│   │   │   │   ├── Sidebar
│   │   │   │   │   ├── TaskList
│   │   │   │   │   ├── TaskItem
│   │   │   │   │   └── ConnectorsList
│   │   │   │   ├── MainContent
│   │   │   │   │   ├── DashboardPage
│   │   │   │   │   ├── TasksPage
│   │   │   │   │   │   ├── TaskListClient
│   │   │   │   │   │   └── TaskForm
│   │   │   │   │   ├── TaskDetailPage
│   │   │   │   │   │   ├── TaskChat
│   │   │   │   │   │   ├── TaskSidebar
│   │   │   │   │   │   ├── Terminal
│   │   │   │   │   │   ├── FileEditor
│   │   │   │   │   │   ├── FileBrowser
│   │   │   │   │   │   └── PRCheckStatus
│   │   │   │   │   ├── ReposPage
│   │   │   │   │   │   ├── RepoLayout
│   │   │   │   │   │   │   ├── RepoCommits
│   │   │   │   │   │   │   ├── RepoIssues
│   │   │   │   │   │   │   └── RepoPullRequests
│   │   │   │   │   │   └── RepoPageClient
│   │   │   │   │   ├── WorkflowsPage
│   │   │   │   │   ├── MCPHubPage
│   │   │   │   │   ├── AgentsPage
│   │   │   │   │   ├── MarketplacePage
│   │   │   │   │   └── SkillsPage
│   │   │   │   └── AuthComponents
│   │   │   │       ├── SignIn
│   │   │   │       ├── SignOut
│   │   │   │       └── UserProfile
│   │   │   ├── JotaiProvider
│   │   │   │   ├── Atom: session
│   │   │   │   ├── Atom: task
│   │   │   │   ├── Atom: agentSelection
│   │   │   │   ├── Atom: newlyCreatedRepo
│   │   │   │   ├── Atom: multiRepo
│   │   │   │   ├── Atom: githubConnection
│   │   │   │   ├── Atom: githubCache
│   │   │   │   └── Atom: connectorDialog
│   │   │   └── Toaster (sonner)
│   │   └── CopyProtect
├── Analytics (Vercel)
├── SpeedInsights (Vercel)
└── Razorpay Checkout Script
```