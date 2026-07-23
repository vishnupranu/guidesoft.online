import { test, expect } from '@playwright/test'

test.describe('Agent Orchestration & Skills Hub', () => {
  test('should display all newly added architecture skills', async ({ page }) => {
    // Navigate to the Skills page
    await page.goto('/skills', { waitUntil: 'domcontentloaded' })

    // Check that the main heading is visible
    await expect(page.getByRole('heading', { name: /Agentic Skills/i })).toBeVisible()

    // The skills we expect to find
    const expectedSkills = [
      'E2B MicroVM Code Interpreter',
      'Long-Term Vector Memory',
      'n8n & Make Workflow Connectors',
      'LiteLLM Gateway & Model Router',
      'Agent Observability',
    ]

    for (const skill of expectedSkills) {
      await expect(page.getByText(skill, { exact: false }).first()).toBeVisible()
    }
  })

  test('should ping the orchestrator API endpoint successfully', async ({ request }) => {
    const response = await request.post('/api/orchestrator', {
      data: {
        query: 'What is the speed of light?',
        requiresExecution: false,
      },
    })

    // We expect the request to either succeed (if mocked correctly)
    // or return a valid mock response indicating it worked
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty('success', true)
    expect(body).toHaveProperty('response')
    expect(body).toHaveProperty('agent')
  })

  test('should allow pinging webhook endpoints', async ({ request }) => {
    const n8nResponse = await request.post('/api/webhooks/n8n', {
      data: { trigger: 'test' },
    })
    expect(n8nResponse.status()).toBe(200)

    const makeResponse = await request.post('/api/webhooks/make', {
      data: { trigger: 'test' },
    })
    expect(makeResponse.status()).toBe(200)
  })
})
