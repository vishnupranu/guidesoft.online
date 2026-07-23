import { NextResponse } from 'next/server'
import { createPullRequest } from '@/lib/github/client'
import { getServerSession } from '@/lib/session/get-server-session'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { repoUrl, branchName, title, body: prBody, baseBranch = 'main' } = body

    if (!repoUrl || !branchName || !title) {
      return NextResponse.json({ error: 'Missing required parameters: repoUrl, branchName, title' }, { status: 400 })
    }

    const result = await createPullRequest({
      repoUrl,
      branchName,
      title,
      body: prBody,
      baseBranch,
    })

    if (result.success) {
      return NextResponse.json({ success: true, prUrl: result.prUrl, prNumber: result.prNumber })
    } else {
      return NextResponse.json({ error: result.error || 'Failed to create PR' }, { status: 400 })
    }
  } catch (error) {
    console.error('API Error in /api/github/pr:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
