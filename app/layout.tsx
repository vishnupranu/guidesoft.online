import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import { AppLayoutWrapper } from '@/components/app-layout-wrapper'
import { SessionProvider } from '@/components/auth/session-provider'
import { JotaiProvider } from '@/components/providers/jotai-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { APP_NAME, VERSION } from '@/lib/constants'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — AI Coding Platform`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'AI-powered autonomous multi-agent coding platform for building, refactoring, testing, and deploying applications with Vercel Sandbox, GitHub integration, and user authentication.',
  keywords: [
    'AI coding',
    'AI agents',
    'coding platform',
    'Vercel Sandbox',
    'GitHub integration',
    'Claude Code',
    'OpenAI Codex',
    'GitHub Copilot',
    'Cursor CLI',
    'Google Gemini',
    'opencode',
    'autonomous development',
    'multi-agent AI',
    'software development',
    'AI pair programmer',
  ],
  authors: [{ name: 'GUIDESOFT' }],
  creator: 'GUIDESOFT',
  publisher: 'GUIDESOFT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://guidesoft.online'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guidesoft.online',
    siteName: APP_NAME,
    title: `${APP_NAME} — AI Coding Platform`,
    description:
      'AI-powered autonomous multi-agent coding platform for building, refactoring, testing, and deploying applications with Vercel Sandbox and GitHub integration.',
    images: [
      {
        url: '/guidesoft-full-logo-light.png',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} — AI Coding Platform`,
    description:
      'AI-powered autonomous multi-agent coding platform for building, refactoring, testing, and deploying applications with Vercel Sandbox and GitHub integration.',
    images: ['/guidesoft-full-logo-light.png'],
    creator: '@guidesoft',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/guidesoft-logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/guidesoft-logo.png',
    apple: '/guidesoft-logo.png',
  },
}

import { CopyProtect } from '@/components/security/copy-protect'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}>
        <CopyProtect />
        <JotaiProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SessionProvider />
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
            <Toaster />
          </ThemeProvider>
        </JotaiProvider>
        <Analytics />
        <SpeedInsights />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
