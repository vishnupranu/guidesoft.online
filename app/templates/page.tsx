'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Layout, Code2, Globe, Database, Smartphone, Bot, ChevronRight } from 'lucide-react'

const categories = ['All', 'SaaS', 'E-commerce', 'Portfolio', 'Blog', 'Dashboard', 'Mobile', 'AI Tool']

const templates = [
  { id: 1, name: 'SaaS Dashboard', category: 'SaaS', desc: 'Full-featured SaaS platform with auth, billing, and analytics.', tech: ['Next.js', 'Tailwind', 'Stripe'], icon: Layout, color: 'from-sky-500 to-blue-600' },
  { id: 2, name: 'Modern E-commerce', category: 'E-commerce', desc: 'Beautiful online store with product grid, cart, and checkout.', tech: ['Next.js', 'Tailwind', 'Razorpay'], icon: Globe, color: 'from-emerald-500 to-teal-600' },
  { id: 3, name: 'Developer Portfolio', category: 'Portfolio', desc: 'Minimal portfolio with dark mode and smooth animations.', tech: ['Next.js', 'Tailwind', 'Framer Motion'], icon: Code2, color: 'from-purple-500 to-indigo-600' },
  { id: 4, name: 'Analytics Dashboard', category: 'Dashboard', desc: 'Real-time analytics with charts, metrics, and reports.', tech: ['Next.js', 'Recharts', 'Tailwind'], icon: Database, color: 'from-orange-500 to-amber-600' },
  { id: 5, name: 'AI Chat Interface', category: 'AI Tool', desc: 'Beautiful chat UI with streaming responses and history.', tech: ['Next.js', 'AI SDK', 'Tailwind'], icon: Bot, color: 'from-pink-500 to-rose-600' },
  { id: 6, name: 'Blog Starter', category: 'Blog', desc: 'Clean, fast blog with MDX support and SEO built in.', tech: ['Next.js', 'MDX', 'Tailwind'], icon: Globe, color: 'from-cyan-500 to-blue-600' },
  { id: 7, name: 'Mobile App Shell', category: 'Mobile', desc: 'Cross-platform mobile app with bottom nav and gestures.', tech: ['React Native', 'Expo', 'NativeWind'], icon: Smartphone, color: 'from-violet-500 to-purple-600' },
  { id: 8, name: 'AI Tool Builder', category: 'AI Tool', desc: 'Rapidly build and deploy AI-powered tools and utilities.', tech: ['Next.js', 'Vercel AI', 'Tailwind'], icon: Bot, color: 'from-fuchsia-500 to-pink-600' },
]

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = templates.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">
            Templates
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Start with a template
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            Browse our collection of professionally designed app templates. Each one is fully customizable and ready to deploy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              <div className={`h-40 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <template.icon className="w-12 h-12 text-white/90" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{template.name}</h3>
                  <Badge variant="outline" className="text-xs">{template.category}</Badge>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{template.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {template.tech.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <button className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5">
                  Use Template
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
            No templates found. Try a different search or category.
          </div>
        )}
      </div>
    </div>
  )
}
