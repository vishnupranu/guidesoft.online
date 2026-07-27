'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Layout, Rocket, ChevronRight, SkipForward, User } from 'lucide-react'

const tourSteps = [
  {
    icon: Sparkles,
    title: 'Meet Your AI Assistant',
    description: 'Your personal AI builder understands what you want to create and guides you through every step. Just describe your app in plain English.',
  },
  {
    icon: Layout,
    title: 'Choose a Template',
    description: 'Browse 100+ professionally designed templates or let AI create a custom design from scratch. Every template is fully customizable.',
  },
  {
    icon: Rocket,
    title: 'Deploy Your First App',
    description: 'One click is all it takes. Your app goes live instantly with hosting, SSL, and a custom domain included.',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const next = () => {
    if (step < tourSteps.length - 1) {
      setStep((s) => s + 1)
    } else {
      setCompleted(true)
    }
  }

  const skip = () => {
    setCompleted(true)
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center space-y-6 border-zinc-200 dark:border-zinc-800">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
            <Rocket className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Time to build something amazing. Your dashboard is waiting.</p>
          </div>
          <Button className="w-full" asChild>
            <a href="/">Go to Dashboard</a>
          </Button>
        </Card>
      </div>
    )
  }

  const current = tourSteps[step]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">
              G
            </div>
            <span className="font-black text-lg tracking-tight">
              GUIDESOFT<span className="text-orange-500">.AI</span>
            </span>
          </div>
          <Progress value={((step + 1) / tourSteps.length) * 100} className="h-1.5 mb-8" />
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-500">
            <span>Step {step + 1}</span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span>{tourSteps.length}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 sm:p-10 border-zinc-200 dark:border-zinc-800 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto text-orange-600 dark:text-orange-400">
                <current.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">{current.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{current.description}</p>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <Button variant="ghost" onClick={skip} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <SkipForward className="w-4 h-4 mr-2" />
            Skip tour
          </Button>
          <Button onClick={next} className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold">
            {step === tourSteps.length - 1 ? 'Finish' : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
