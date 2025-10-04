import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/shared/site-header'
import { SiteFooter } from '@/components/shared/site-footer'
import { CookieBanner } from '@/components/layout/cookie-banner'
import { OuvidoriaModal } from '@/components/layout/ouvidoria-modal'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-neutral-900">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
      <OuvidoriaModal />
    </div>
  )
}
