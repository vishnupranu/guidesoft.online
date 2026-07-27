'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl transition-all hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
