# Next.js Frontend Architecture

## Overview
The frontend hub is built with Next.js 15+ (App Router), React 19, and Tailwind CSS. It integrates with Clerk for authentication and Supabase for real-time data.

## Core Principles
1. **Server Components by Default**: All components should be React Server Components (RSC) unless interactivity requires `"use client"`.
2. **Tailwind & Shadcn/UI**: Use the pre-configured Shadcn components for consistent design. Do not write custom CSS unless absolutely necessary.
3. **Data Fetching**: Use Server Actions for data mutations and standard fetch/SWR for data fetching.

## UI Design Guidelines (Lovable.dev / Cursor style)
- **Glassmorphism**: Use backdrop filters selectively on sidebars and floating menus.
- **Typography**: Utilize Geist and Geist Mono. Ensure high contrast.
- **Micro-interactions**: Use Framer Motion for subtle hover states and page transitions.
