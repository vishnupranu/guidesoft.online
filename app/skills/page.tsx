'use client'

import { SkillsManager } from '@/components/skills/skills-manager'

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground text-lg">
            Manage and configure the skills available to your AI agents.
          </p>
        </div>
        <SkillsManager />
      </div>
    </div>
  )
}
