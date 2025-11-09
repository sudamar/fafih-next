/**
 * Cliente Supabase Admin
 *
 * Cliente com permissões administrativas (service role) para operações do servidor
 * que precisam bypassar Row Level Security (RLS)
 *
 * IMPORTANTE: Este cliente deve ser usado APENAS no servidor (nunca no cliente/browser)
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Log para debug
console.log('[SupabaseAdmin] Inicializando cliente admin...')
console.log('[SupabaseAdmin] NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'DEFINIDA' : 'UNDEFINED')
console.log('[SupabaseAdmin] SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? 'DEFINIDA' : 'UNDEFINED')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('[SupabaseAdmin] ❌ Variáveis de ambiente não definidas!')
  console.error('[SupabaseAdmin] NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('[SupabaseAdmin] SUPABASE_SERVICE_KEY:', supabaseServiceKey ? 'tem valor' : 'é null/undefined')
  throw new Error('Variáveis de ambiente do Supabase Admin não configuradas')
}

console.log('[SupabaseAdmin] ✅ Variáveis de ambiente carregadas')
console.log('[SupabaseAdmin] URL:', supabaseUrl)

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

console.log('[SupabaseAdmin] ✅ Cliente admin criado com sucesso')
