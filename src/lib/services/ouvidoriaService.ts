import { supabaseAdmin } from '@/lib/supabase/admin'

export type IdentificacaoTipo = 'identificado' | 'anonimo'

export interface OuvidoriaPayload {
  identificacao: IdentificacaoTipo
  nome?: string | null
  email?: string | null
  telefone?: string | null
  vinculo?: string | null
  tipoManifestacao: string
  assunto: string
  mensagem: string
}

function normalizeField(value?: string | null) {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length ? trimmed : null
}

export async function saveOuvidoriaManifestacao(payload: OuvidoriaPayload) {
  const { identificacao, nome, email, telefone, vinculo, tipoManifestacao, assunto, mensagem } = payload

  const insertPayload = {
    identificacao_tipo: identificacao,
    nome_completo: normalizeField(nome),
    email: normalizeField(email),
    telefone: normalizeField(telefone),
    vinculo: normalizeField(vinculo),
    tipo_manifestacao: tipoManifestacao,
    assunto,
    mensagem,
  }

  const { data, error } = await supabaseAdmin
    .from('ouvidoria')
    .insert(insertPayload)
    .select('id, created_at')
    .single()

  if (error) {
    console.error('[OuvidoriaService] Erro ao salvar manifestação:', error)
    throw new Error('Não foi possível registrar sua manifestação. Tente novamente em instantes.')
  }

  return data
}
