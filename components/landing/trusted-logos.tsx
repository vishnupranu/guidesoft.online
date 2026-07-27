'use client'

import { motion } from 'framer-motion'

const logos = [
  'Stripe', 'Notion', 'Figma', 'Vercel', 'Linear', 'Supabase', 'Resend', 'Clerk',
]

export function TrustedLogos() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-10">
          Trusted by 50,000+ founders and developers worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((name, idx) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="text-xl font-bold text-zinc-400 hover:text-zinc-200 transition-colors cursor-default select-none"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
