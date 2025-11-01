import { unstable_cache, revalidateTag } from 'next/cache'
import type { Database } from '@/lib/supabase/types'
import { supabase } from '@/lib/supabase/client'
import type { Polo, PoloHighlight, PolosData } from '@/lib/types/polos'

type PoloRow = Database['public']['Tables']['polos']['Row']

export const POLOS_LIST_TAG = 'polos:list'

const mapPolo = (row: PoloRow): Polo => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  address: row.address,
  phone: row.phone,
  email: row.email,
  coordinator: row.coordinator,
  mapUrl: row.map_url,
})

const fetchPolosRows = unstable_cache(
  async (): Promise<PoloRow[]> => {
    const { data, error } = await supabase
      .from('polos')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      throw new Error(`Erro ao buscar polos: ${error.message}`)
    }

    return data ?? []
  },
  ['polos', 'list'],
  { tags: [POLOS_LIST_TAG] },
)

export const listPolos = async (): Promise<Polo[]> => {
  const rows = await fetchPolosRows()
  return rows.map(mapPolo)
}

export const getAllPolos = async (): Promise<Polo[]> => listPolos()

export const getPoloBySlug = async (slug: string): Promise<Polo | null> => {
  if (!slug) {
    return null
  }

  const { data, error } = await supabase
    .from('polos')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw new Error(`Erro ao buscar polo: ${error.message}`)
  }

  if (!data) {
    return null
  }

  return mapPolo(data)
}

export const getPoloById = async (id: string): Promise<Polo | null> => {
  if (!id) {
    return null
  }

  const { data, error } = await supabase
    .from('polos')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`Erro ao buscar polo: ${error.message}`)
  }

  if (!data) {
    return null
  }

  return mapPolo(data)
}


export const getPolosContent = async (): Promise<PolosData> => {
  const locations = await listPolos()

  return {
    locations,
  }
}

export const revalidatePolosList = async () => {
  await revalidateTag(POLOS_LIST_TAG)
}
