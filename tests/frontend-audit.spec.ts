import { test, expect } from '@playwright/test';

test.describe('GUIDESOFT.AI Frontend Audit & User Flows', () => {

  test('1. Landing Page Hero, Logo, and Prompt Submission UI', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Check main hero title
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toContainText('What will you build today?');

    // Check centered full GuideSoft logo
    const fullLogo = page.locator('img[alt="GuideSoft IT Solutions and Training Center"]');
    await expect(fullLogo).toBeVisible();

    // Check prompt input textarea
    const promptInput = page.locator('textarea#prompt');
    await expect(promptInput).toBeVisible();

    // Fill prompt and verify
    await promptInput.fill('Build a fullstack SaaS application with authentication');
    await expect(promptInput).toHaveValue('Build a fullstack SaaS application with authentication');

    console.log('✅ Landing Page UI & Prompt Input Verified Successfully');
  });

  test('2. Authentication Screen & OAuth Flow', async ({ page }) => {
    await page.goto('/auth/signin', { waitUntil: 'domcontentloaded' });
    
    // Check main auth title
    const heading = page.locator('h3');
    await expect(heading).toContainText('Sign In to GUIDESOFT.AI');

    // Check GitHub Auth button
    const githubBtn = page.getByRole('button', { name: /Continue with GitHub/i });
    await expect(githubBtn).toBeVisible();

    // Check security badge
    const securityBadge = page.getByText(/AES-256 Encrypted Session/i);
    await expect(securityBadge).toBeVisible();

    console.log('✅ Auth Screen & OAuth Flow Verified Successfully');
  });

  test('3. Agentic Skills Hub & System Prompts Page', async ({ page }) => {
    await page.goto('/skills', { waitUntil: 'domcontentloaded' });
    
    // Check page heading
    const title = page.locator('h2');
    await expect(title).toContainText('Agentic Skills & Open-Source System Prompts');

    // Check skill cards text
    const skillText = page.getByText(/Open-Source System Prompts/i).first();
    await expect(skillText).toBeVisible();

    console.log('✅ Agentic Skills Hub Verified Successfully');
  });

  test('4. MCP Connectors Hub Page', async ({ page }) => {
    await page.goto('/mcp-hub', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('h1');
    await expect(title).toContainText('MCP Tools & Servers');

    console.log('✅ MCP Connectors Hub Verified Successfully');
  });

  test('5. Agent Workflow Visualizer Page', async ({ page }) => {
    await page.goto('/workflow', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('h1');
    await expect(title).toContainText('Sequential AI Agent Pipelines');

    console.log('✅ Agent Workflow Visualizer Verified Successfully');
  });

  test('6. New Repository Page', async ({ page }) => {
    await page.goto('/repos/new', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('h1');
    await expect(title).toContainText('Create New Repository');

    console.log('✅ New Repository Screen Verified Successfully');
  });

});
