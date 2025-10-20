import { unstable_cache } from 'next/cache'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export type Post = Database['public']['Tables']['posts']['Row']
export type AuthorInfo = {
  name: string
  description: string
  email: string
  phone?: string
  photo: string
}

export const POSTS_LIST_TAG = 'posts-list'
export const POST_DETAIL_TAG = 'post-detail'

/**
 * Busca todos os posts publicados ordenados por data (mais recentes primeiro)
 */
export const getAllPosts = unstable_cache(
  async (): Promise<Post[]> => {

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })

    if (error) {
      console.error('Erro ao buscar posts:', error)
      throw new Error(`Erro ao buscar posts: ${error.message}`)
    }

    return data || []
  },
  ['posts-all'],
  {
    tags: [POSTS_LIST_TAG],
    revalidate: 3600, // 1 hora
  }
)

/**
 * Busca um post específico pelo slug
 */
export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Post não encontrado
        return null
      }
      console.error(`Erro ao buscar post ${slug}:`, error)
      throw new Error(`Erro ao buscar post: ${error.message}`)
    }

    return data
  },
  ['post-by-slug'],
  {
    tags: [POST_DETAIL_TAG],
    revalidate: 3600, // 1 hora
  }
)

/**
 * Busca os posts mais recentes (limitado)
 */
export const getRecentPosts = unstable_cache(
  async (limit: number = 3): Promise<Post[]> => {

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erro ao buscar posts recentes:', error)
      throw new Error(`Erro ao buscar posts recentes: ${error.message}`)
    }

    return data || []
  },
  ['posts-recent'],
  {
    tags: [POSTS_LIST_TAG],
    revalidate: 3600, // 1 hora
  }
)
