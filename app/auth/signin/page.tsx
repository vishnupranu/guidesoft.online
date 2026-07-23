'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { redirectToSignIn } from '@/lib/session/redirect-to-sign-in'
import { GitHubIcon } from '@/components/icons/github-icon'
import { getEnabledAuthProviders } from '@/lib/auth/providers'
import { ShieldCheck, Cpu, Layers, Server, CheckCircle2, ArrowRight } from 'lucide-react'

export default function SignInPage() {
  const [loadingVercel, setLoadingVercel] = useState(false)
  const [loadingGitHub, setLoadingGitHub] = useState(false)

  const { github: hasGitHub, vercel: hasVercel } = getEnabledAuthProviders()

  const handleVercelSignIn = async () => {
    setLoadingVercel(true)
    await redirectToSignIn()
  }

  const handleGitHubSignIn = () => {
    setLoadingGitHub(true)
    window.location.href = '/api/auth/signin/github'
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Brand & Hero Showcase */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/40 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/80">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/guidesoft-logo.png" alt="Logo" className="h-12 w-12 object-contain" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white leading-snug">
                AI Coding Sandboxes & Multi-Agent Workflows
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect your GitHub repositories and run Claude Code, OpenAI Codex, Cursor CLI, and Gemini in secure,
                isolated sandboxes.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span>Multi-Agent CLI Engine Orchestration</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                  <Layers className="w-4 h-4" />
                </div>
                <span>Interactive Live Shell & Sandbox Dev Servers</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                  <Server className="w-4 h-4" />
                </div>
                <span>Model Context Protocol (MCP) Server Hub</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> AES-256 Encrypted Session
            </span>
            <span>Universal Security</span>
          </div>
        </div>

        {/* Right Side: Sign-In OAuth Buttons */}
        <div className="p-8 md:p-12 flex flex-col justify-between bg-zinc-950">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Sign In to GUIDESOFT.AI</h3>
              <p className="text-xs text-zinc-400">
                Authenticate with your OAuth provider to access your repositories and tasks.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {hasGitHub && (
                <Button
                  onClick={handleGitHubSignIn}
                  disabled={loadingVercel || loadingGitHub}
                  className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 justify-start px-4 gap-3 text-sm font-semibold shadow-md"
                >
                  {loadingGitHub ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                      Connecting to GitHub...
                    </span>
                  ) : (
                    <>
                      <GitHubIcon className="h-5 w-5" />
                      <span>Continue with GitHub</span>
                    </>
                  )}
                </Button>
              )}

              {hasVercel && (
                <Button
                  onClick={handleVercelSignIn}
                  disabled={loadingVercel || loadingGitHub}
                  className="w-full h-12 bg-white hover:bg-zinc-100 text-black justify-start px-4 gap-3 text-sm font-semibold shadow-md"
                >
                  {loadingVercel ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      Connecting to Vercel...
                    </span>
                  ) : (
                    <>
                      <svg viewBox="0 0 76 65" className="h-4 w-4 fill-current">
                        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                      </svg>
                      <span>Continue with Vercel</span>
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-1">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Universal Permission Control
              </span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                User API keys and repository tokens are encrypted per user. Authentication handles user identity and
                permissions universally.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 text-center pt-6">
            Protected by GUIDESOFT.AI Security and Vercel Sandbox Isolation.
          </p>
        </div>
      </div>
    </div>
  )
}
