# Setup Coding Agent Template

**Description:** Guide for setting up the coding-agent-template from Vercel Labs.
**Category:** Coding / Boilerplate Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vercel-labs/coding-agent-template.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd coding-agent-template
   ```
3. **Install dependencies:**
   ```bash
   pnpm install
   ```
4. **Environment Variables:**
   Set up `.env.local` with required variables based on `.env.example`.
5. **Database Setup:**
   Run database migrations using Drizzle:
   ```bash
   pnpm db:push
   ```
6. **Start Development Server:**
   ```bash
   pnpm dev
   ```

*Note: This is not a separate app, it runs directly as a unified Next.js setup.*
