import { requireRole } from '@/lib/auth/rbac'

export default async function SkillsLayout({ children }: { children: React.ReactNode }) {
  await requireRole('admin')
  return <>{children}</>
}
