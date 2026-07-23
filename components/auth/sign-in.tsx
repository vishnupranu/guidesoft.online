'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { redirectToSignIn } from '@/lib/session/redirect-to-sign-in'
import { GitHubIcon } from '@/components/icons/github-icon'
import { getEnabledAuthProviders } from '@/lib/auth/providers'
import { ShieldCheck, Cpu, Layers, Server, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

export function SignIn() {
  const [showDialog, setShowDialog] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
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
    <>
      <div className="flex items-center gap-1.5">
        <Button
          onClick={() => {
            setAuthMode('signin')
            setShowDialog(true)
          }}
          variant="ghost"
          className="text-zinc-300 hover:text-white font-medium text-xs px-3 h-8"
        >
          Sign in
        </Button>
        <Button
          onClick={() => {
            setAuthMode('signup')
            setShowDialog(true)
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 h-8 gap-1.5 shadow-md shadow-emerald-950/40"
        >
          <span>Sign up</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl shadow-2xl">
          <DialogTitle className="sr-only">
            {authMode === 'signin' ? 'Sign in to GUIDESOFT.AI' : 'Create a GUIDESOFT.AI Account'}
          </DialogTitle>

          {/* Split Left and Right Auth Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
            {/* Left Hero Panel */}
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/40 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/80">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <img src="/guidesoft-logo.png" alt="Logo" className="h-12 w-12 object-contain" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {authMode === 'signin' ? 'Welcome Back to AI Studio' : 'Build Full-Stack Apps with AI'}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {authMode === 'signin'
                      ? 'Sign in to manage your active sandboxes, repositories, and AI agent tasks.'
                      : 'Create your account to start generating React, Next.js, and Node.js applications with autonomous agents.'}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span>Multi-Agent CLI Engine Orchestration</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span>Interactive Live Shell & Dev Servers</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                      <Server className="w-4 h-4" />
                    </div>
                    <span>Model Context Protocol (MCP) Integration</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AES-256 Encrypted Session
                </span>
                <span>v2.0 Universal Auth</span>
              </div>
            </div>

            {/* Right Authentication Side */}
            <div className="p-8 flex flex-col justify-between bg-zinc-950">
              <div className="space-y-6">
                {/* Mode Switcher Tabs */}
                <div className="flex rounded-lg bg-zinc-900 p-1 border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      authMode === 'signin' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      authMode === 'signup' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    {authMode === 'signin' ? 'Sign In to Continue' : 'Create Your Account'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {authMode === 'signin'
                      ? 'Select your preferred OAuth provider to sign in.'
                      : 'Select your preferred OAuth provider to create your account.'}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {hasGitHub && (
                    <Button
                      onClick={handleGitHubSignIn}
                      disabled={loadingVercel || loadingGitHub}
                      className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 justify-start px-4 gap-3 text-xs font-semibold"
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
                      className="w-full h-11 bg-white hover:bg-zinc-100 text-black justify-start px-4 gap-3 text-xs font-semibold"
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

                <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Universal Permissions Active
                  </span>
                  <p className="text-[10px] text-zinc-400">
                    Each user uses isolated API credentials and OAuth tokens. Repositories are accessed securely per
                    session.
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-zinc-500 text-center pt-4">
                By signing in, you agree to GUIDESOFT.AI terms of service and security policies.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
