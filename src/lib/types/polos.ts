export interface Polo {
  id: string
  name: string
  address: string
  phone: string
  email: string
  coordinator: string
  mapUrl: string
  courses: string[]
}

export interface PoloHighlight {
  title: string
  description: string
}

export interface PolosData {
  locations: Polo[]
  highlights: PoloHighlight[]
}
