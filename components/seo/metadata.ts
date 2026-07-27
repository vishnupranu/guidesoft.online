import type { Metadata } from 'next'
import { APP_NAME, VERSION } from '@/lib/constants'

interface SeoMetadata {
  title?: string
  description?: string
  keywords?: string[]
  path?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  type?: string
}

export function generateMetadata({
  title,
  description,
  keywords,
  path,
  image,
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  type = 'website',
}: SeoMetadata): Metadata {
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — AI Coding Platform`
  const baseUrl = 'https://guidesoft.online'
  const url = path ? `${baseUrl}${path}` : baseUrl
  const ogImage = image || '/guidesoft-full-logo-light.png'
  const ogImageAlt = imageAlt || APP_NAME

  return {
    title: fullTitle,
    description:
      description ||
      'AI-powered autonomous multi-agent coding platform for building, refactoring, testing, and deploying applications with Vercel Sandbox and GitHub integration.',
    keywords: keywords || [
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
    metadataBase: new URL(baseUrl),
    openGraph: {
      type,
      locale: 'en_US',
      url,
      siteName: APP_NAME,
      title: fullTitle,
      description:
        description ||
        'AI-powered autonomous multi-agent coding platform for building, refactoring, testing, and deploying applications with Vercel Sandbox and GitHub integration.',
      images: [
        {
          url: ogImage,
          width: imageWidth,
          height: imageHeight,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description:
        description ||
        'AI-powered autonomous multi-agent coding platform for building, refactoring, testing, and deploying applications with Vercel Sandbox and GitHub integration.',
      images: [ogImage],
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
    alternates: {
      canonical: url,
    },
  }
}