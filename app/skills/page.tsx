'use client'

import { SkillsManager } from '@/components/skills/skills-manager'

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <SkillsManager />
      </div>
    </div>
  )
}
