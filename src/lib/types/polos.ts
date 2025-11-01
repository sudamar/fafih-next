export interface Polo {
  id: string
  slug: string
  name: string
  address: string | null
  phone: string | null
  email: string | null
  coordinator: string | null
  mapUrl: string | null
}

export interface PoloHighlight {
  title: string
  description: string
}

export interface PolosData {
  locations: Polo[]
  highlights: PoloHighlight[]
}
