
export interface CourseCard {
  id: string
  slug: string
  title: string
  description: string | null
  category: string | null
  categoryLabel: string | null
  image: string  | null
  price: number | null
  modalidade: string | null
}

export type Course = CourseCard

export interface CourseHighlight {
  id: string
  icon: string
  title: string
  description: string
  bgColor?: string | null
  iconColor?: string | null
  order: number
}

export interface CourseCurriculumItem {
  id: string
  number: number
  title: string
  hours: string | null
  ementa: string | null
  objetivos: string | null
  bibliography: string[]
}

export interface CourseProfessor {
  id: string
  nome: string
  titulacao: string | null
  descricao: string | null
  telefone?: string | null
  email?: string | null
  foto?: string | null
  papel?: string | null
}

export interface CourseTestimonial {
  quote: string
  author: string
  role: string
}

export interface CourseWorkloadActivity {
  descricao: string
  carga: number
}

export interface CourseWorkload {
  texto: string[]
  atividades: CourseWorkloadActivity[]
  observacao?: string
}

export interface CourseContact {
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
}

export interface CourseHero {
  type: 'video' | 'image'
  source: string
  fallbackImage?: string | null
  alt: string
}

export interface CourseDetail extends CourseCard {
  subtitle: string | null
  fullDescription: string[]
  highlights: CourseHighlight[]
  justificativa: string[]
  objetivos: string[]
  publico: string[]
  curriculum: CourseCurriculumItem[]
  avaliacao: string[]
  cargahoraria?: CourseWorkload
  professores: CourseProfessor[]
  coordenacao?: {
    coordenador: string
    descricao: string
    foto?: string | null
  }
  contact?: CourseContact
  monthlyPrice: string | null
  precoMatricula: number | null
  originalPrice: number | null
  startDate: string | null
  duration: string | null
  maxStudents: string | null
  certificate: string | null
  hero?: CourseHero
  videoUrl: string | null
  diferenciais: string[]
  observacoes: string[]
  ctaLabel?: string | null
  moreInfoUrl?: string | null
  formato_curso?: {
    frequencia?: string | null
    horario?: string | null
    periodo?: string | null
    tipo?: string | null
    plataforma?: string | null
    numero_encontros?: number | null
  }
  testimonials: CourseTestimonial[]
  workload: string | null
  alerta_vagas: number | null
}
