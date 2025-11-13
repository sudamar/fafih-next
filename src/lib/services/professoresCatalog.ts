import { unstable_cache, revalidateTag } from 'next/cache'
import type { Database } from '@/lib/supabase/types'
import { supabase } from '@/lib/supabase/client'
import type { ProfessorData } from '@/components/ui/card-professor'

type ProfessorRow = Database['public']['Tables']['professores']['Row']

export const PROFESSORES_LIST_TAG = 'professores:list'

const mapProfessor = (row: ProfessorRow): ProfessorData => ({
  nome: row.nome,
  titulacao: row.titulacao ?? '',
  descricao: row.descricao ?? '',
  foto: row.foto ?? undefined,
  email: row.email ?? undefined,
  telefone: row.telefone ?? undefined,
  // Ignorando link_professor conforme solicitado
})

const fetchProfessoresRows = unstable_cache(
  async (): Promise<ProfessorRow[]> => {
    const { data, error } = await supabase
      .from('professores')
      .select('*')
      .order('nome', { ascending: true })

    if (error) {
      throw new Error(`Erro ao buscar professores: ${error.message}`)
    }

    return data ?? []
  },
  ['professores', 'list'],
  { tags: [PROFESSORES_LIST_TAG] },
)

export const listProfessores = async (): Promise<ProfessorData[]> => {
  const rows = await fetchProfessoresRows()
  return rows.map(mapProfessor)
}

export const getProfessores = async (): Promise<ProfessorData[]> => listProfessores()

export const getProfessoresByIds = async (ids: string[]): Promise<ProfessorData[]> => {
  if (!ids || ids.length === 0) {
    return listProfessores()
  }

  const { data, error } = await supabase
    .from('professores')
    .select('*')
    .in('id', ids)
    .order('nome', { ascending: true })

  if (error) {
    throw new Error(`Erro ao buscar professores por IDs: ${error.message}`)
  }

  return (data ?? []).map(mapProfessor)
}

export const revalidateProfessoresList = async () => {
  await revalidateTag(PROFESSORES_LIST_TAG)
}
