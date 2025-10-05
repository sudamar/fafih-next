import polosData from '@/lib/data/polos.json'
import type { PolosData, Polo, PoloHighlight } from '@/lib/types/polos'

export const getPolosContent = (): PolosData => {
  return polosData as PolosData
}

export const getAllPolos = (): Polo[] => {
  return polosData.locations as Polo[]
}

export const getPoloById = (id: string): Polo | null => {
  const polo = polosData.locations.find((p) => p.id === id)
  return polo ? (polo as Polo) : null
}

export const getPoloHighlights = (): PoloHighlight[] => {
  return polosData.highlights as PoloHighlight[]
}
