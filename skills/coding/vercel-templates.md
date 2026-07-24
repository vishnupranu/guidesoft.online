---
name: Vercel Templates Integration
description: Instructions for the agent on how to clone, initialize, and use Vercel Next.js templates based on user requests.
---

# Vercel Templates Integration

When the user asks to clone, initialize, or use a Vercel template (e.g. from `vercel.com/templates` or via a large template search URL), you must use the `create-next-app` CLI with the `--example` flag to scaffold the project for them.

## Cloning a Template

1. If the user provides a specific Vercel template name (e.g., `api-routes`, `blog-starter`) or a GitHub repository URL, you should run:
   ```bash
   npx -y create-next-app@latest my-app --example <example-name-or-github-url>
   ```

2. If the user provides a Vercel Templates search URL (e.g., `https://vercel.com/templates/...`) with multiple filters, you should **ask the user** which specific template from the search results they want to clone, OR if they want you to build a custom Next.js application that combines the tech stack described in those filters (e.g., Next.js + Tailwind + Supabase + Clerk). 
   
3. **Important Flags:**
   - Always use `-y` to auto-confirm `npx` installation.
   - Use `--yes` if you want `create-next-app` to use defaults and avoid interactive prompts.

## Example Workflows

### Scenario 1: User asks for a specific template
**User:** "Clone the vercel commerce template"
**Agent Action:**
```bash
npx -y create-next-app@latest my-commerce-app --example https://github.com/vercel/commerce
```

### Scenario 2: User pastes a large Vercel Template search URL
**User:** "I want to clone https://vercel.com/templates/next.js?search=cms&type=ai..."
**Agent Action:**
Acknowledge the vast number of filters. Explain that Vercel Templates contains hundreds of boilerplates matching those filters. Ask the user if they have a specific template in mind (like `nextjs-ai-chatbot` or `nextjs-commerce`), or offer to initialize a blank Next.js app and manually integrate the requested technologies (e.g., AI, Authentication, Database, CMS).

## Post-Clone Steps
After successfully cloning a template:
1. Navigate into the new directory: `cd <app-name>`
2. Read the `README.md` to understand required environment variables.
3. Help the user set up their `.env.local` file (e.g. asking for API keys).
4. Run `npm install` or `pnpm install`.
5. Start the dev server `npm run dev` to verify the template works.
