'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const codeLines = [
  { text: 'const app = describe("SaaS dashboard")', color: 'text-sky-400' },
  { text: 'app.add(Auth, Payments, Analytics)', color: 'text-emerald-400' },
  { text: 'app.style("modern & minimal")', color: 'text-purple-400' },
  { text: 'app.deploy()', color: 'text-amber-400' },
  { text: '// Your app is live ✨', color: 'text-zinc-500' },
]

export function HeroAnimation() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])

  useEffect(() => {
    let currentLine = 0
    let currentText = ''
    let charIndex = 0
    const typingSpeed = 50
    const linePause = 1200

    const typeNextChar = () => {
      if (currentLine >= codeLines.length) {
        setTimeout(() => {
          setDisplayedLines([])
          currentLine = 0
          currentText = ''
          charIndex = 0
          requestAnimationFrame(typeNextChar)
        }, 3000)
        return
      }

      const line = codeLines[currentLine]

      if (charIndex < line.text.length) {
        currentText += line.text[charIndex]
        setDisplayedLines([currentText])
        charIndex++
        setTimeout(typeNextChar, typingSpeed)
      } else {
        setDisplayedLines((prev) => [...prev, currentText])
        currentLine++
        currentText = ''
        charIndex = 0
        setTimeout(typeNextChar, linePause)
      }
    }

    const timeout = setTimeout(typeNextChar, 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-[#1e1e2e] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-[#181825]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500 ml-2 font-mono">guidesoft.ai</span>
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed min-h-[240px]">
          {displayedLines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={codeLines[idx]?.color || 'text-zinc-400'}
            >
              {idx === displayedLines.length - 1 && (
                <span className="inline-block w-2 h-4 bg-emerald-400/80 ml-0.5 animate-pulse" />
              )}
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
