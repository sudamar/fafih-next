import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { MaintenancePage } from '@/components/shared/maintenance-page'
import { supabase } from '@/lib/supabase/client'

export const metadata: Metadata = {
  title: 'Site em Manutenção | FAFIH',
  description: 'Site temporariamente em manutenção',
}

async function checkMaintenanceStatus() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('manutencao, nome_site')
      .order('id', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error('[Manutencao] Erro ao verificar status:', error)
      return { isMaintenanceMode: false, siteName: 'FAFIH' }
    }

    return {
      isMaintenanceMode: data?.manutencao === true,
      siteName: data?.nome_site || 'FAFIH',
    }
  } catch (err) {
    console.error('[Manutencao] Exceção ao verificar status:', err)
    return { isMaintenanceMode: false, siteName: 'FAFIH' }
  }
}

export default async function Manutencao() {
  const { isMaintenanceMode, siteName } = await checkMaintenanceStatus()

  // Se manutenção está desativada, redirecionar para home
  if (!isMaintenanceMode) {
    redirect('/')
  }

  return <MaintenancePage siteName={siteName} />
}
