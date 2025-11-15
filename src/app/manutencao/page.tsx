import { Metadata } from 'next'
import { MaintenancePage } from '@/components/shared/maintenance-page'
import { getConfiguracoesFafih } from '@/lib/config/startup'

export const metadata: Metadata = {
  title: 'Site em Manutenção | FAFIH',
  description: 'Site temporariamente em manutenção',
}

export default function Manutencao() {
  const config = getConfiguracoesFafih()
  const siteName = config?.nomeSite || 'FAFIH'

  return <MaintenancePage siteName={siteName} />
}
