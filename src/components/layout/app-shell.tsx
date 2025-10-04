import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-950">
      <main className="flex-1">{children}</main>
    </div>
  )
}
