import { requireRole } from '@/lib/auth/rbac'

export default async function WorkflowLayout({ children }: { children: React.ReactNode }) {
  await requireRole('paid_user')
  return <>{children}</>
}
