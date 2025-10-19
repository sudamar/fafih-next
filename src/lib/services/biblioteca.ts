import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export type Tag = string

type TrabalhoViewRow = Database['public']['Views']['trabalhos_com_categorias']['Row']

export interface TrabalhoCategoria {
  nome: string
  cor: string | null
  icone: string | null
}

export interface Trabalho {
  id: string
  slug: string
  titulo: string
  autor: string
  data_publicacao: string
  link: string | null
  resumo: string | null
  nota: number | null
  visitantes: number
  baixados: number
  categorias: Tag[]
  categoriasDetalhes: TrabalhoCategoria[]
  tags: Tag[]
}

const ensureString = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }

  return fallback
}

const mapRowToTrabalho = (row: TrabalhoViewRow): Trabalho => {
  if (!row?.id || !row?.slug || !row?.titulo || !row?.autor) {
    throw new Error('Registro inválido retornado pela view trabalhos_com_categorias')
  }

  const categorias = Array.isArray(row.categorias) ? row.categorias.filter((item): item is string => typeof item === 'string') : []
  const cores = Array.isArray(row.categorias_cores) ? row.categorias_cores : []
  const icones = Array.isArray(row.categorias_icones) ? row.categorias_icones : []

  const categoriasDetalhes: TrabalhoCategoria[] = categorias.map((nome, index) => ({
    nome,
    cor: typeof cores[index] === 'string' ? cores[index] : null,
    icone: typeof icones[index] === 'string' ? icones[index] : null,
  }))

  return {
    id: row.id,
    slug: row.slug,
    titulo: row.titulo,
    autor: row.autor,
    data_publicacao: ensureString(row.data_publicacao, new Date().toISOString()),
    link: row.link ?? null,
    resumo: row.resumo ?? null,
    nota: row.nota ?? null,
    visitantes: row.visitantes ?? 0,
    baixados: row.baixados ?? 0,
    categorias,
    categoriasDetalhes,
    tags: categorias,
  }
}

export async function listTrabalhos(): Promise<Trabalho[]> {
  const { data, error } = await supabase
    .from('trabalhos_com_categorias')
    .select('*')
    .order('data_publicacao', { ascending: false })
    .order('titulo', { ascending: true })

  if (error) {
    throw new Error(`Erro ao listar trabalhos: ${error.message}`)
  }

  return (data ?? []).map(mapRowToTrabalho)
}

export async function getTrabalhoBySlug(slug: string): Promise<Trabalho | null> {
  const { data, error } = await supabase
    .from('trabalhos_com_categorias')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw new Error(`Erro ao buscar trabalho: ${error.message}`)
  }

  if (!data) {
    return null
  }

  return mapRowToTrabalho(data)
}

export async function incrementTrabalhoVisitantes(trabalhoId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_trabalho_visitantes', {
    trabalho_uuid: trabalhoId,
  })

  if (error) {
    throw new Error(`Erro ao incrementar visitantes: ${error.message}`)
  }
}

export async function incrementTrabalhoBaixados(trabalhoId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_trabalho_baixados', {
    trabalho_uuid: trabalhoId,
  })

  if (error) {
    throw new Error(`Erro ao incrementar downloads: ${error.message}`)
  }
}

export async function listTrabalhoSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('trabalhos')
    .select('slug')
    .order('slug')

  if (error) {
    throw new Error(`Erro ao listar slugs de trabalhos: ${error.message}`)
  }

  return (data ?? []).map((item) => item.slug)
}
