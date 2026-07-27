export function validateEnv(): void {
  const requiredVars: string[] = []
  const missingVars: string[] = []

  requiredVars.push('DATABASE_URL')
  requiredVars.push('JWE_SECRET')
  requiredVars.push('ENCRYPTION_KEY')

  const hasVercelClientId = !!process.env.NEXT_PUBLIC_VERCEL_CLIENT_ID
  const hasGithubClientId = !!process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

  if (!hasVercelClientId && !hasGithubClientId) {
    missingVars.push('NEXT_PUBLIC_VERCEL_CLIENT_ID or NEXT_PUBLIC_GITHUB_CLIENT_ID')
  }

  for (const vars of requiredVars) {
    if (!process.env[vars as keyof typeof process.env]) {
      missingVars.push(vars)
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
        'Please ensure all critical environment variables are set before starting the server.',
    )
  }
}