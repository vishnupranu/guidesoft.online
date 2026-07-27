'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { redirectToSignIn } from '@/lib/session/redirect-to-sign-in'
import { GitHubIcon } from '@/components/icons/github-icon'
import { GoogleIcon } from '@/components/icons/google-icon'
import { getEnabledAuthProviders } from '@/lib/auth/providers'
import { Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignInPage() {
  const [loadingVercel, setLoadingVercel] = useState(false)
  const [loadingGitHub, setLoadingGitHub] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [email, setEmail] = useState('')

  const { github: hasGitHub, vercel: hasVercel, google: hasGoogle } = getEnabledAuthProviders()

  const handleVercelSignIn = async () => {
    setLoadingVercel(true)
    await redirectToSignIn()
  }

  const handleGitHubSignIn = () => {
    setLoadingGitHub(true)
    window.location.href = '/api/auth/signin/github'
  }

  const handleGoogleSignIn = () => {
    setLoadingGoogle(true)
    window.location.href = '/api/auth/signin/google'
  }

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Email/password auth coming soon. For now, please use Google or GitHub.')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
              G
            </div>
            <span className="font-black text-xl tracking-tight">
              GUIDESOFT<span className="text-orange-500">.AI</span>
            </span>
          </a>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Sign in to continue building with AI
          </p>
        </div>

        <Card className="p-8 border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="space-y-4">
            {hasGitHub && (
              <Button
                onClick={handleGitHubSignIn}
                disabled={loadingVercel || loadingGitHub || loadingGoogle}
                variant="outline"
                className="w-full h-12 justify-start gap-3 text-sm font-semibold border-zinc-200 dark:border-zinc-700"
              >
                {loadingGitHub ? (
                  <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                ) : (
                  <GitHubIcon className="h-5 w-5" />
                )}
                Continue with GitHub
              </Button>
            )}

            {hasGoogle && (
              <Button
                onClick={handleGoogleSignIn}
                disabled={loadingVercel || loadingGitHub || loadingGoogle}
                variant="outline"
                className="w-full h-12 justify-start gap-3 text-sm font-semibold border-zinc-200 dark:border-zinc-700"
              >
                {loadingGoogle ? (
                  <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                ) : (
                  <GoogleIcon className="h-5 w-5" />
                )}
                Continue with Google
              </Button>
            )}

            {hasVercel && (
              <Button
                onClick={handleVercelSignIn}
                disabled={loadingVercel || loadingGitHub || loadingGoogle}
                variant="outline"
                className="w-full h-12 justify-start gap-3 text-sm font-semibold border-zinc-200 dark:border-zinc-700"
              >
                {loadingVercel ? (
                  <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                ) : (
                  <svg viewBox="0 0 76 65" className="h-5 w-5 fill-current">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                )}
                Continue with Vercel
              </Button>
            )}
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-zinc-950 px-3 text-zinc-500">or</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800"
            />
            <Button type="submit" variant="secondary" className="w-full h-12 font-semibold">
              Continue with email
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Don&apos;t have an account?{' '}
            <a href="/auth/signin" className="text-orange-500 hover:text-orange-600 font-semibold">
              Sign up
            </a>
          </p>
        </Card>

        <p className="text-center text-xs text-zinc-400 mt-6">
          Protected by GUIDESOFT.AI Security
        </p>
      </motion.div>
    </div>
  )
}
