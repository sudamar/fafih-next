import { cache } from 'react'

import type { Database } from '@/lib/supabase/types'
import { supabase } from '@/lib/supabase/client'
import type {
  CourseCard,
  CourseContact,
  CourseCurriculumItem,
  CourseDetail,
  CourseHighlight,
  CourseProfessor,
  CourseTestimonial,
  CourseWorkload,
  CourseWorkloadActivity,
} from '@/lib/features/courses/types/Course.type'

type CourseRow = Database['public']['Tables']['cursos']['Row']
type HighlightRow = Database['public']['Tables']['curso_highlights']['Row']
type CurriculumRow = Database['public']['Tables']['curso_curriculum']['Row']
type ProfessorRow = Database['public']['Tables']['professores']['Row']

type CourseDetailQueryRow = CourseRow & {
  curso_highlights: HighlightRow[] | null
  curso_curriculum: CurriculumRow[] | null
  curso_professores: Array<{
    papel: string | null
    professor: ProfessorRow | null
  }> | null
  coordenador: ProfessorRow | null
}

const COURSE_DETAIL_SELECT = `
  id,
  slug,
  title,
  subtitle,
  description,
  full_description,
  image,
  image_url,
  video_url,
  category,
  category_label,
  price,
  original_price,
  preco_matricula,
  modalidade,
  duration,
  workload,
  start_date,
  max_students,
  certificate,
  monthly_price,
  justificativa,
  objetivos,
  publico,
  investment_details,
  additional_info,
  coordenador:coordenador_id (
    id,
    nome,
    titulacao,
    foto,
    email,
    telefone,
    descricao
  ),
  curso_highlights (
    id,
    icon,
    title,
    description,
    bg_color,
    icon_color,
    ordem,
    created_at,
    updated_at,
    curso_id
  ),
  curso_curriculum (
    id,
    number,
    title,
    hours,
    ementa,
    objetivos,
    bibliography,
    created_at,
    updated_at,
    curso_id
  ),
  curso_professores (
    papel,
    professor:professor_id (
      id,
      nome,
      titulacao,
      foto,
      email,
      telefone,
      descricao
    )
  )
` as const

const cardImageOverrides: Record<string, string> = {
  'livros-negros-e-livro-vermelho': 'https://i.imgur.com/qwiCmA6.jpeg',
  'sonhando-atraves-da-arteterapia': 'https://i.imgur.com/AnnChjx.png',
  'de-aion-a-jo': 'https://i.imgur.com/REzhmRK.jpeg',
  'formacao-de-membros-analistas-junguianos': 'https://i.imgur.com/lXkjLLG.png',
  'congressos-junguianos-do-ijep': 'https://i.imgur.com/M3vP6UT.png',
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const parseStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

const parseMaybeString = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const parseObservacoes = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return parseStringArray(value)
  }

  const single = parseMaybeString(value)
  return single ? [single] : []
}

const parseWorkloadActivity = (value: unknown): CourseWorkloadActivity | null => {
  if (!isRecord(value)) {
    return null
  }

  const descricao = parseMaybeString(value.descricao) ?? ''
  const cargaValue = value.carga
  let carga: number | null = null

  if (typeof cargaValue === 'number' && Number.isFinite(cargaValue)) {
    carga = cargaValue
  } else if (typeof cargaValue === 'string') {
    const numeric = Number.parseFloat(cargaValue.replace(',', '.'))
    if (!Number.isNaN(numeric)) {
      carga = numeric
    }
  }

  if (!descricao && carga === null) {
    return null
  }

  return {
    descricao,
    carga: carga ?? 0,
  }
}

const parseWorkload = (value: unknown): CourseWorkload | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const texto = parseStringArray(value.texto)
  const atividadesRaw = Array.isArray(value.atividades) ? value.atividades : []
  const atividades = atividadesRaw
    .map((item) => parseWorkloadActivity(item))
    .filter((item): item is CourseWorkloadActivity => item !== null)

  const observacao = parseMaybeString(value.observacao) ?? undefined

  if (texto.length === 0 && atividades.length === 0 && !observacao) {
    return undefined
  }

  return {
    texto,
    atividades,
    observacao,
  }
}

const parseTestimonials = (value: unknown): CourseTestimonial[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null
      }

      const quote =
        parseMaybeString(item.quote) ??
        parseMaybeString(item.text) ??
        ''
      const author = parseMaybeString(item.author) ?? ''
      const role = parseMaybeString(item.role) ?? ''

      if (!quote && !author) {
        return null
      }

      return { quote, author, role }
    })
    .filter((item): item is CourseTestimonial => item !== null)
}

const parseContact = (value: unknown): CourseContact | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const phone = parseMaybeString(value.phone)
  const whatsapp = parseMaybeString(value.whatsapp)
  const email = parseMaybeString(value.email)

  if (!phone && !whatsapp && !email) {
    return undefined
  }

  return { phone, whatsapp, email }
}

const parseFormatoCurso = (value: unknown): CourseDetail['formato_curso'] => {
  if (!isRecord(value)) {
    return undefined
  }

  const frequencia = parseMaybeString(value.frequencia)
  const horario = parseMaybeString(value.horario)
  const periodo = parseMaybeString(value.periodo)
  const tipo = parseMaybeString(value.tipo)
  const plataforma = parseMaybeString(value.plataforma)

  let numeroEncontros: number | null = null
  if (typeof value.numero_encontros === 'number' && Number.isFinite(value.numero_encontros)) {
    numeroEncontros = value.numero_encontros
  } else if (typeof value.numero_encontros === 'string') {
    const parsed = Number.parseInt(value.numero_encontros, 10)
    if (!Number.isNaN(parsed)) {
      numeroEncontros = parsed
    }
  }

  if (!frequencia && !horario && !periodo && !tipo && !plataforma && numeroEncontros === null) {
    return undefined
  }

  return {
    frequencia,
    horario,
    periodo,
    tipo,
    plataforma,
    numero_encontros: numeroEncontros,
  }
}

const parseAdditionalInfo = (value: unknown) => {
  if (!isRecord(value)) {
    return {
      diferenciais: [] as string[],
      avaliacao: [] as string[],
      cargahoraria: undefined as CourseWorkload | undefined,
      observacoes: [] as string[],
      contact: undefined as CourseContact | undefined,
      ctaLabel: null as string | null,
      moreInfoUrl: null as string | null,
      formato_curso: undefined as CourseDetail['formato_curso'],
      testimonials: [] as CourseTestimonial[],
    }
  }

  return {
    diferenciais: parseStringArray(value.diferenciais),
    avaliacao: parseStringArray(value.avaliacao),
    cargahoraria: parseWorkload(value.cargahoraria),
    observacoes: parseObservacoes(value.observacoes),
    contact: parseContact(value.contact),
    ctaLabel: parseMaybeString(value.ctaLabel),
    moreInfoUrl: parseMaybeString(value.moreInfoUrl),
    formato_curso: parseFormatoCurso(value.formato_curso),
    testimonials: parseTestimonials(value.testimonials),
  }
}

const applyImageOverride = (slug: string, currentImage: string | null): string | null => {
  const override = cardImageOverrides[slug]
  return override ?? currentImage
}

const mapHighlight = (row: HighlightRow): CourseHighlight => ({
  id: row.id,
  icon: row.icon,
  title: row.title,
  description: row.description,
  bgColor: row.bg_color,
  iconColor: row.icon_color,
  order: row.ordem ?? 0,
})

const mapCurriculumItem = (row: CurriculumRow): CourseCurriculumItem => ({
  id: row.id,
  number: row.number,
  title: row.title,
  hours: row.hours ?? null,
  ementa: row.ementa ?? null,
  objetivos: row.objetivos ?? null,
  bibliography: parseStringArray(row.bibliography),
})

const mapProfessor = (row: ProfessorRow | null, papel: string | null): CourseProfessor | null => {
  if (!row) {
    return null
  }

  return {
    id: row.id,
    nome: row.nome,
    titulacao: row.titulacao ?? null,
    descricao: row.descricao ?? '',
    telefone: row.telefone ?? null,
    email: row.email ?? null,
    foto: row.foto ?? null,
    papel,
  }
}

const deriveHero = (row: CourseRow, image: string | null): CourseDetail['hero'] | undefined => {
  const videoUrl = parseMaybeString(row.video_url)
  const imageUrl = parseMaybeString(row.image_url) ?? parseMaybeString(row.image) ?? image

  if (videoUrl) {
    return {
      type: 'video',
      source: videoUrl,
      fallbackImage: imageUrl,
      alt: row.title,
    }
  }

  if (imageUrl) {
    return {
      type: 'image',
      source: imageUrl,
      alt: row.title,
    }
  }

  return undefined
}

const mapCourseCard = (row: CourseRow): CourseCard => {
  const baseImage = parseMaybeString(row.image_url) ?? parseMaybeString(row.image)
  const image = applyImageOverride(row.slug, baseImage)

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: parseMaybeString(row.description),
    category: parseMaybeString(row.category),
    categoryLabel: parseMaybeString(row.category_label),
    image,
    price: row.price ?? null,
    modalidade: parseMaybeString(row.modalidade),
  }
}

const mapCourseDetail = (row: CourseDetailQueryRow): CourseDetail => {
  const card = mapCourseCard(row)
  const highlights = (row.curso_highlights ?? [])
    .map(mapHighlight)
    .sort((a, b) => a.order - b.order)
  const curriculum = (row.curso_curriculum ?? [])
    .map(mapCurriculumItem)
    .sort((a, b) => a.number - b.number)

  const additionalInfo = parseAdditionalInfo(row.additional_info)
  const investmentDetails = parseAdditionalInfo(row.investment_details)

  let coordenacao =
    row.coordenador && parseMaybeString(row.coordenador.nome)
      ? {
          coordenador: row.coordenador.nome,
          descricao: row.coordenador.descricao ?? '',
          foto: row.coordenador.foto ?? null,
        }
      : undefined

  const professores: CourseProfessor[] = []

  for (const relation of row.curso_professores ?? []) {
    const professor = mapProfessor(relation.professor, relation.papel)
    if (!professor) {
      continue
    }

    if (relation.papel === 'coordenador') {
      if (!coordenacao) {
        coordenacao = {
          coordenador: professor.nome,
          descricao: professor.descricao ?? '',
          foto: professor.foto ?? null,
        }
      }
      continue
    }

    professores.push(professor)
  }

  return {
    ...card,
    subtitle: parseMaybeString(row.subtitle),
    fullDescription: parseStringArray(row.full_description),
    highlights,
    justificativa: parseStringArray(row.justificativa),
    objetivos: parseStringArray(row.objetivos),
    publico: parseStringArray(row.publico),
    curriculum,
    avaliacao: additionalInfo.avaliacao.length > 0 ? additionalInfo.avaliacao : investmentDetails.avaliacao,
    cargahoraria: additionalInfo.cargahoraria ?? investmentDetails.cargahoraria,
    professores,
    coordenacao,
    contact: additionalInfo.contact ?? investmentDetails.contact,
    monthlyPrice: parseMaybeString(row.monthly_price),
    precoMatricula: row.preco_matricula ?? null,
    originalPrice: row.original_price ?? null,
    startDate: parseMaybeString(row.start_date),
    maxStudents: parseMaybeString(row.max_students),
    certificate: parseMaybeString(row.certificate),
    hero: deriveHero(row, card.image),
    videoUrl: parseMaybeString(row.video_url),
    diferenciais: additionalInfo.diferenciais.length > 0 ? additionalInfo.diferenciais : investmentDetails.diferenciais,
    observacoes: Array.from(
      new Set([
        ...additionalInfo.observacoes,
        ...investmentDetails.observacoes,
      ]),
    ),
    ctaLabel: additionalInfo.ctaLabel ?? investmentDetails.ctaLabel,
    moreInfoUrl: additionalInfo.moreInfoUrl ?? investmentDetails.moreInfoUrl,
    formato_curso: additionalInfo.formato_curso ?? investmentDetails.formato_curso,
    testimonials: additionalInfo.testimonials.length > 0 ? additionalInfo.testimonials : investmentDetails.testimonials,
    workload: parseMaybeString(row.workload),
  }
}

const fetchCourseRows = cache(async (): Promise<CourseRow[]> => {
  const { data, error } = await supabase
    .from('cursos')
    .select('*')
    .order('title', { ascending: true })

  if (error) {
    throw new Error(`Erro ao buscar cursos: ${error.message}`)
  }

  return data ?? []
})

const fetchCourseDetail = async (filters: Record<string, string>): Promise<CourseDetail | null> => {
  let query = supabase
    .from('cursos')
    .select<CourseDetailQueryRow>(COURSE_DETAIL_SELECT)

  for (const [column, value] of Object.entries(filters)) {
    query = query.eq(column, value)
  }

  const { data, error } = await query.maybeSingle()

  if (error) {
    throw new Error(`Erro ao buscar detalhe do curso: ${error.message}`)
  }

  if (!data) {
    return null
  }

  return mapCourseDetail(data)
}

const buildCategories = (courses: CourseCard[]) => {
  const map = new Map<string, { label: string; count: number }>()

  courses.forEach((course) => {
    const id = course.category ?? 'outros'
    const label = course.categoryLabel ?? course.category ?? 'Outros'
    const current = map.get(id) ?? { label, count: 0 }
    current.label = label
    current.count += 1
    map.set(id, current)
  })

  return Array.from(map.entries())
    .map(([id, value]) => ({
      id,
      label: value.label,
      count: value.count,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

export const listCourseCards = async (): Promise<CourseCard[]> => {
  const rows = await fetchCourseRows()
  return rows.map(mapCourseCard)
}

export const getAllCourses = async (): Promise<CourseCard[]> => listCourseCards()

export const listCategories = async () => {
  const courses = await listCourseCards()
  return buildCategories(courses)
}

export const getCourseStats = async () => {
  const courses = await listCourseCards()
  const categories = buildCategories(courses)

  return {
    totalCourses: courses.length,
    totalCategories: categories.length,
  }
}

export const getCourseBySlug = async (slug: string): Promise<CourseDetail | null> => {
  if (!slug) {
    return null
  }

  return fetchCourseDetail({ slug })
}

export const getCourseById = async (id: string): Promise<CourseDetail | null> => {
  if (!id) {
    return null
  }

  return fetchCourseDetail({ id })
}

export const getCourseDetails = async (
  identifier: string,
  { fallback = true }: { fallback?: boolean } = {},
): Promise<CourseDetail | null> => {
  if (!identifier) {
    if (!fallback) {
      return null
    }

    const courses = await listCourseCards()
    const firstSlug = courses[0]?.slug
    return firstSlug ? getCourseBySlug(firstSlug) : null
  }

  const bySlug = await getCourseBySlug(identifier)
  if (bySlug) {
    return bySlug
  }

  const byId = await getCourseById(identifier)
  if (byId) {
    return byId
  }

  if (!fallback) {
    return null
  }

  const courses = await listCourseCards()
  const firstSlug = courses[0]?.slug
  return firstSlug ? getCourseBySlug(firstSlug) : null
}
