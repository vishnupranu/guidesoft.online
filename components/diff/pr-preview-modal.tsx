'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { GitPullRequest, Sparkles, Check, ExternalLink, Loader2 } from 'lucide-react'

interface PRPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  repoUrl: string
  branchName: string
  taskPrompt: string
  agentName: string
}

export function PRPreviewModal({ isOpen, onClose, repoUrl, branchName, taskPrompt, agentName }: PRPreviewModalProps) {
  const [prTitle, setPrTitle] = useState(() => {
    const firstLine = taskPrompt.split('\n')[0] || 'AI Agent Code Update'
    return firstLine.length > 65 ? `${firstLine.substring(0, 62)}...` : firstLine
  })
  const [prBody, setPrBody] = useState(
    `## 🤖 AI Coding Task Summary\n\n**Task:** ${taskPrompt}\n\n**Agent:** \`${agentName}\`\n**Branch:** \`${branchName}\`\n\n- Executed in isolated Vercel Sandbox.\n- Built with Vercel Coding Agent Platform.`,
  )
  const [baseBranch, setBaseBranch] = useState('main')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdPrUrl, setCreatedPrUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleCreatePR = async () => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/github/pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl,
          branchName,
          title: prTitle,
          body: prBody,
          baseBranch,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setCreatedPrUrl(data.prUrl)
      } else {
        setErrorMessage(data.error || 'Failed to create Pull Request')
      }
    } catch (err) {
      console.error('Error creating PR:', err)
      setErrorMessage('Network error creating PR')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
            <GitPullRequest className="w-5 h-5" />
            <span>Create GitHub Pull Request</span>
          </div>
          <DialogDescription className="text-zinc-400 text-xs">
            Review and create a Pull Request from branch{' '}
            <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded">{branchName}</code>.
          </DialogDescription>
        </DialogHeader>

        {createdPrUrl ? (
          <div className="py-6 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Pull Request Created!</h3>
            <p className="text-xs text-zinc-400 max-w-md">Your changes have been submitted as a GitHub Pull Request.</p>
            <a
              href={createdPrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-colors"
            >
              <span>View Pull Request on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="space-y-4 py-2 text-xs">
            {errorMessage && (
              <div className="p-3 bg-red-950/50 border border-red-800 rounded text-red-300">{errorMessage}</div>
            )}

            <div className="space-y-1">
              <label className="text-zinc-300 font-medium">Target Base Branch</label>
              <input
                type="text"
                value={baseBranch}
                onChange={(e) => setBaseBranch(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-300 font-medium">PR Title</label>
              <input
                type="text"
                value={prTitle}
                onChange={(e) => setPrTitle(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-zinc-300 font-medium">PR Description & Summary</label>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Auto-Generated
                </span>
              </div>
              <textarea
                rows={5}
                value={prBody}
                onChange={(e) => setPrBody(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-zinc-100 outline-none focus:border-emerald-500 font-mono text-xs"
              />
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-zinc-800 pt-3">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            {createdPrUrl ? 'Close' : 'Cancel'}
          </Button>
          {!createdPrUrl && (
            <Button
              onClick={handleCreatePR}
              disabled={isSubmitting || !prTitle.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating PR...
                </>
              ) : (
                <>
                  <GitPullRequest className="w-4 h-4" />
                  Create Pull Request
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
