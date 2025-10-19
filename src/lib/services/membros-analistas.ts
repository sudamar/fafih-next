import { unstable_cache } from 'next/cache'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type MembroAnalistaRow = Database['public']['Tables']['membros_analistas']['Row']

export type MembroAnalista = {
  id: string
  nome: string
  tipo: 'Analista em Formação' | 'Analista Didata' | 'Analista Didata em Formação' | 'Membro Analista'
  atendimento: 'Individual' | 'Grupo' | 'Ambos'
  cidade?: string
  estado?: string
  descricao?: string
  telefone?: string
  email?: string
  foto?: string
}

export const MEMBROS_LIST_TAG = 'membros:list'

const mapMembroAnalista = (row: MembroAnalistaRow): MembroAnalista => ({
  id: row.id,
  nome: row.nome,
  tipo: row.tipo as MembroAnalista['tipo'],
  atendimento: row.atendimento as MembroAnalista['atendimento'],
  cidade: row.cidade ?? undefined,
  estado: row.estado ?? undefined,
  descricao: row.descricao ?? undefined,
  telefone: row.telefone ?? undefined,
  email: row.email ?? undefined,
  foto: row.foto ?? undefined,
})

const fetchMembrosRows = unstable_cache(
  async (): Promise<MembroAnalistaRow[]> => {
    const { data, error } = await supabase
      .from('membros_analistas')
      .select('*')
      .order('nome', { ascending: true })

    if (error) {
      throw new Error(`Erro ao buscar membros analistas: ${error.message}`)
    }

    return data ?? []
  },
  ['membros-analistas', 'list'],
  { tags: [MEMBROS_LIST_TAG] },
)

export const listMembrosAnalistas = async (): Promise<MembroAnalista[]> => {
  const rows = await fetchMembrosRows()
  return rows.map(mapMembroAnalista)
}

export const getMembrosAnalistas = async (): Promise<MembroAnalista[]> => {
  return listMembrosAnalistas()
}

export const getMembrosAnalistasByTipo = async (tipo: MembroAnalista['tipo']): Promise<MembroAnalista[]> => {
  const membros = await listMembrosAnalistas()
  return membros.filter(m => m.tipo === tipo)
}

export const getMembrosAnalistasByEstado = async (estado: string): Promise<MembroAnalista[]> => {
  const membros = await listMembrosAnalistas()
  return membros.filter(m => m.estado === estado)
}
