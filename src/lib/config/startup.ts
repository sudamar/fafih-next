import { revalidateTag } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const CONF_SISTEMA_TAG = 'config:sistema'

export interface ConfiguracoesFafih {
  id: number
  manutencao: boolean
  drmSocial: boolean
  nomeSite: string
  logAtivo: boolean
  dataTimeServerIniciado: string | null
}

let globalConfig: ConfiguracoesFafih | null = null

/**
 * Carrega as configurações do sistema do banco de dados diretamente (sem cache)
 */
async function fetchSettingsDirect(): Promise<ConfiguracoesFafih | null> {
  console.log('[Startup] ====== CARREGANDO CONFIGURAÇÕES DO SISTEMA ======')
  console.log('[Startup] Verificando variáveis de ambiente...')
  console.log('[Startup] NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'DEFINIDA' : 'NÃO DEFINIDA')
  console.log('[Startup] SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? 'DEFINIDA' : 'NÃO DEFINIDA')

  try {
    console.log('[Startup] Executando query na tabela settings...')

    // Buscar configurações (última linha da tabela)
    const { data, error, count } = await supabaseAdmin
      .from('settings')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false })
      .limit(1)

    console.log('[Startup] Query executada')
    console.log('[Startup] Error:', error)
    console.log('[Startup] Data:', data)
    console.log('[Startup] Count:', count)
    console.log('[Startup] Data é array?', Array.isArray(data))
    console.log('[Startup] Data.length:', data?.length)

    if (error) {
      console.error('[Startup] ❌ Erro ao buscar configurações:', error)
      console.error('[Startup] Error code:', error.code)
      console.error('[Startup] Error message:', error.message)
      console.error('[Startup] Error details:', error.details)
      return null
    }

    if (!data || data.length === 0) {
      console.log('[Startup] ⚠️ Nenhuma configuração encontrada no banco')
      console.log('[Startup] Total de registros na tabela (count):', count)
      return null
    }

    // Pegar o primeiro registro (que é o de maior ID devido ao order)
    const record = data[0]

    console.log('[Startup] ✅ Configurações carregadas com sucesso')
    console.log('[Startup] ID do registro:', record.id)
    console.log('[Startup] Nome do site:', record.nome_site)
    console.log('[Startup] Modo manutenção:', record.manutencao ? 'ATIVO' : 'inativo')
    console.log('[Startup] DRM Social:', record.drmsocial ? 'ATIVO' : 'inativo')
    console.log('[Startup] Logs:', record.log_ativo ? 'ATIVO' : 'inativo')

    // Mapear para o formato do sistema
    const config: ConfiguracoesFafih = {
      id: record.id,
      manutencao: record.manutencao ?? false,
      drmSocial: record.drmsocial ?? false,
      nomeSite: record.nome_site ?? 'Site Fafih',
      logAtivo: record.log_ativo ?? false,
      dataTimeServerIniciado: record.data_time_server_iniciado,
    }

    return config
  } catch (err) {
    console.error('[Startup] ❌ Exceção ao carregar configurações:', err)
    return null
  }
}

/**
 * Atualiza o timestamp de quando o servidor foi iniciado
 */
async function updateServerStartTime(settingsId: number): Promise<void> {
  console.log('[Startup] Atualizando timestamp de início do servidor...')
  console.log('[Startup] ID do registro de configurações:', settingsId)

  try {
    const now = new Date().toISOString()

    const { error } = await supabaseAdmin
      .from('settings')
      .update({ data_time_server_iniciado: now })
      .eq('id', settingsId)

    if (error) {
      console.error('[Startup] ❌ Erro ao atualizar timestamp:', error)
      return
    }

    console.log('[Startup] ✅ Timestamp atualizado:', now)
  } catch (err) {
    console.error('[Startup] ❌ Exceção ao atualizar timestamp:', err)
  }
}

/**
 * Função principal de startup do sistema
 * - Carrega configurações do banco
 * - Atualiza timestamp de início usando o ID carregado
 * - Armazena em cache global
 */
export async function Startup(): Promise<ConfiguracoesFafih | null> {
  console.log('[Startup] ========================================')
  console.log('[Startup] 🚀 INICIANDO SISTEMA FAFIH')
  console.log('[Startup] ========================================')

  try {
    // 1. Primeiro: Carregar configurações diretamente do banco
    console.log('[Startup] Passo 1: Carregando configurações...')
    const config = await fetchSettingsDirect()

    if (config) {
      // Armazenar em cache global
      globalConfig = config
      console.log('[Startup] ✅ Configurações armazenadas em cache global')

      // 2. Segundo: Atualizar timestamp usando o ID carregado
      console.log('[Startup] Passo 2: Atualizando timestamp de início...')
      await updateServerStartTime(config.id)
    } else {
      console.log('[Startup] ⚠️ Usando configurações padrão')
      globalConfig = {
        id: 0,
        manutencao: false,
        drmSocial: false,
        nomeSite: 'Site Fafih',
        logAtivo: false,
        dataTimeServerIniciado: null,
      }
    }

    console.log('[Startup] ========================================')
    console.log('[Startup] ✅ SISTEMA INICIADO COM SUCESSO')
    console.log('[Startup] ========================================')

    return globalConfig
  } catch (err) {
    console.error('[Startup] ❌ ERRO FATAL AO INICIAR SISTEMA:', err)
    return null
  }
}

/**
 * Retorna as configurações do sistema em cache
 */
export function getConfiguracoesFafih(): ConfiguracoesFafih | null {
  return globalConfig
}

/**
 * Imprime logs apenas se a configuração logAtivo estiver habilitada
 *
 * @param messages - Mensagens para imprimir no console
 *
 * @example
 * imprimeLogs('[MeuModulo]', 'Iniciando processamento...')
 * imprimeLogs('[MeuModulo]', 'Valor:', valor, 'Status:', status)
 *
 * @remarks
 * Apenas imprime se logAtivo === true (explicitamente verdadeiro).
 * Valores null, undefined, false, ou qualquer outro valor não imprimem logs.
 */
export function imprimeLogs(...messages: unknown[]): void {
  if (globalConfig?.logAtivo === true) {
    console.log(...messages)
  }
}

/**
 * Revalida as configurações do sistema (chamado via /revalidate endpoint)
 */
export async function revalidateConfiguracoesFafih(): Promise<void> {
  console.log('[Startup] Revalidando configurações do sistema...')

  try {
    // Recarregar configurações do banco
    const config = await fetchSettingsDirect()

    if (config) {
      globalConfig = config
      console.log('[Startup] ✅ Configurações revalidadas com sucesso')
    } else {
      console.log('[Startup] ⚠️ Falha ao revalidar, mantendo configurações atuais')
    }

    // Invalidar cache do Next.js (apenas se estiver dentro de uma requisição)
    if (typeof revalidateTag === 'function') {
      try {
        revalidateTag(CONF_SISTEMA_TAG)
      } catch {
        // Ignorar erro se não estiver em contexto de requisição
        console.log('[Startup] Cache tag não disponível no contexto atual')
      }
    }
  } catch (err) {
    console.error('[Startup] ❌ Erro ao revalidar configurações:', err)
  }
}
