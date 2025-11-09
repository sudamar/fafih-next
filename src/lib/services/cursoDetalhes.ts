import { unstable_cache, revalidateTag } from 'next/cache'
import { COURSE_CATEGORY } from '@/lib/utils/constants'
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

export const COURSE_LIST_TAG = 'courses:list'
const COURSE_DETAIL_TAG = (identifier: string) => `courses:detail:${identifier}`

const COURSE_DETAIL_SELECT = `
  id,
  slug,
  title,
  subtitle,
  short_description,
  full_description,
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

// Função genérica para processar campos que podem vir como array ou objeto
const convertToStringArray = (value: unknown, fieldName: string): string[] => {
  console.log(`[${fieldName}] Valor recebido:`, value);
  console.log(`[${fieldName}] Tipo:`, typeof value);
  console.log(`[${fieldName}] É array?`, Array.isArray(value));

  // Se já é array, processar normalmente
  if (Array.isArray(value)) {
    console.log(`[${fieldName}] ✅ É array, tamanho:`, value.length);

    const result = value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    console.log(`[${fieldName}] Resultado final:`, result.length, 'itens');
    return result;
  }

  // Se é um objeto, tentar converter para array
  if (isRecord(value)) {
    console.log(`[${fieldName}] ⚠️ É um objeto, tentando converter para array...`);

    // Pegar as chaves e ordenar numericamente
    const keys = Object.keys(value).sort((a, b) => {
      const numA = Number.parseInt(a, 10);
      const numB = Number.parseInt(b, 10);
      return numA - numB;
    });

    console.log(`[${fieldName}] Chaves encontradas:`, keys);

    // Extrair os valores na ordem correta
    const arrayFromObject = keys
      .map(key => value[key])
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    console.log(`[${fieldName}] ✅ Convertido para array:`, arrayFromObject.length, 'itens');
    return arrayFromObject;
  }

  console.log(`[${fieldName}] ❌ Não é array nem objeto válido, retornando []`);
  return [];
}

// Função específica para processar full_description que pode vir como array ou objeto
const getFullDescriptionTotal = (value: unknown): string[] => {
  return convertToStringArray(value, 'getFullDescriptionTotal');
}

// Função específica para processar objetivos que pode vir como array ou objeto
const getObjetivosTotal = (value: unknown): string[] => {
  return convertToStringArray(value, 'getObjetivosTotal');
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
  const imageUrl = parseMaybeString(row.image_url) ?? image

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
  console.log('[mapCourseCard] Raw short_description do banco:', row.short_description);
  console.log('[mapCourseCard] images:', row.image_url);
  console.log('[mapCourseCard] images:', row.video_url);
  console.log('[mapCourseCard] Tipo:', typeof row.short_description);

  const image = parseMaybeString(row.image_url)
  const rawDescription = parseMaybeString(row.short_description)

  console.log('[mapCourseCard] Depois de parseMaybeString:', rawDescription);

  const description =
    rawDescription && rawDescription.length > 250
      ? `${rawDescription.slice(0, 250).trimEnd()}...`
      : rawDescription

  console.log('[mapCourseCard] Description final:', description);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description,
    category: parseMaybeString(row.category),
    categoryLabel: parseMaybeString(row.category_label),
    image,
    price: row.price ?? null,
    modalidade: parseMaybeString(row.modalidade),
  }
}

const mapCourseDetail = (row: CourseDetailQueryRow): CourseDetail => {
  console.log('[mapCourseDetail] ====== INÍCIO MAPEAMENTO ======');

  try {
    console.log('[mapCourseDetail] Mapeando card básico...');
    const curso = mapCourseCard(row);
    console.log('[mapCourseDetail] ✅ Card mapeado:', {
      slug: curso.slug,
      title: curso.title,
      category: curso.category,
      categoryLabel: curso.categoryLabel
    });

    console.log('[mapCourseDetail] Mapeando highlights...');
    const highlights = (row.curso_highlights ?? [])
      .map(mapHighlight)
      .sort((a, b) => a.order - b.order);
    console.log('[mapCourseDetail] ✅ Highlights mapeados:', highlights.length);

    let curriculum: CourseCurriculumItem[] = [];

    console.log('[mapCourseDetail] Verificando categoria para curriculum...');
    console.log('[mapCourseDetail] Categoria do curso:', curso.category);
    console.log('[mapCourseDetail] COURSE_CATEGORY.EXTENSAO:', COURSE_CATEGORY.EXTENSAO);

    if (curso.category !== COURSE_CATEGORY.EXTENSAO) {
      console.log('[mapCourseDetail] Categoria diferente de EXTENSAO - mapeando curriculum');
      curriculum = (row.curso_curriculum ?? [])
        .map(mapCurriculumItem)
        .sort((a, b) => a.number - b.number);
      console.log('[mapCourseDetail] ✅ Curriculum mapeado:', curriculum.length, 'itens');
    } else {
      console.log('[mapCourseDetail] Categoria EXTENSAO - pulando curriculum');
      curriculum = [];
    }

    console.log('[mapCourseDetail] Parseando additional_info...');
    const additionalInfo = parseAdditionalInfo(row.additional_info);
    console.log('[mapCourseDetail] ✅ Additional info parseado');

    console.log('[mapCourseDetail] Parseando investment_details...');
    const investmentDetails = parseAdditionalInfo(row.investment_details);
    console.log('[mapCourseDetail] ✅ Investment details parseado');

    console.log('[mapCourseDetail] Processando coordenação...');
    let coordenacao =
      row.coordenador && parseMaybeString(row.coordenador.nome)
        ? {
            coordenador: row.coordenador.nome,
            descricao: row.coordenador.descricao ?? '',
            foto: row.coordenador.foto ?? null,
          }
        : undefined;
    console.log('[mapCourseDetail] Coordenador:', coordenacao ? coordenacao.coordenador : 'Nenhum');

    console.log('[mapCourseDetail] Processando professores...');
    const professores: CourseProfessor[] = [];

    for (const relation of row.curso_professores ?? []) {
      const professor = mapProfessor(relation.professor, relation.papel);
      if (!professor) {
        continue;
      }

      if (relation.papel === 'coordenador') {
        if (!coordenacao) {
          coordenacao = {
            coordenador: professor.nome,
            descricao: professor.descricao ?? '',
            foto: professor.foto ?? null,
          };
        }
        continue;
      }

      professores.push(professor);
    }
    console.log('[mapCourseDetail] ✅ Professores processados:', professores.length);

    console.log('[mapCourseDetail] Construindo objeto final...');
    console.log('[mapCourseDetail] === PROCESSANDO FULL_DESCRIPTION ===');
    console.log('[mapCourseDetail] row.full_description (raw):', row.full_description);
    console.log('[mapCourseDetail] Tipo:', typeof row.full_description);
    console.log('[mapCourseDetail] É array?', Array.isArray(row.full_description));

    const parsedFullDescription = getFullDescriptionTotal(row.full_description);
    console.log('[mapCourseDetail] Depois de getFullDescriptionTotal:', parsedFullDescription);
    console.log('[mapCourseDetail] Quantidade de itens:', parsedFullDescription.length);
    console.log('[mapCourseDetail] ========================================');

    const result = {
    ...curso,
    subtitle: parseMaybeString(row.subtitle),
    fullDescription: parsedFullDescription,
    highlights,
    justificativa: parseStringArray(row.justificativa),
    objetivos: getObjetivosTotal(row.objetivos),
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
    duration: parseMaybeString(row.duration),
    maxStudents: parseMaybeString(row.max_students),
    certificate: parseMaybeString(row.certificate),
    hero: deriveHero(row, curso.image),
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
  };

    console.log('[mapCourseDetail] ✅ Objeto final construído com sucesso');
    console.log('[mapCourseDetail] ====== FIM MAPEAMENTO ======');

    return result;
  } catch (err) {
    console.error('[mapCourseDetail] ❌ ERRO DURANTE MAPEAMENTO:');
    console.error('[mapCourseDetail] Erro:', err);
    console.error('[mapCourseDetail] Stack:', err instanceof Error ? err.stack : 'N/A');
    console.error('[mapCourseDetail] Row data:', JSON.stringify(row, null, 2));
    console.log('[mapCourseDetail] ====== FIM COM ERRO ======');
    throw err;
  }
}

const fetchCourseRows = unstable_cache(
  async (): Promise<CourseRow[]> => {
    console.log('[fetchCourseRows] ====== INÍCIO ======');
    console.log('[fetchCourseRows] Buscando todos os cursos...');

    try {
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .order('title', { ascending: true })

      if (error) {
        console.error('[fetchCourseRows] ❌ ERRO no Supabase:', error);
        console.error('[fetchCourseRows] Mensagem:', error.message);
        throw new Error(`Erro ao buscar cursos: ${error.message}`)
      }

      console.log('[fetchCourseRows] ✅ Cursos carregados:', data?.length ?? 0);
      console.log('[fetchCourseRows] ====== FIM ======');

      return data ?? []
    } catch (err) {
      console.error('[fetchCourseRows] ❌ EXCEÇÃO CAPTURADA:', err);
      console.log('[fetchCourseRows] ====== FIM COM ERRO ======');
      throw err;
    }
  },
  ['courses', 'list'],
  { tags: [COURSE_LIST_TAG] },
)

const fetchCourseDetail = (column: 'slug' | 'id', value: string) =>
  unstable_cache(
    async (): Promise<CourseDetail | null> => {
      console.log('[fetchCourseDetail] ====== INÍCIO ======');
      console.log('[fetchCourseDetail] Coluna:', column);
      console.log('[fetchCourseDetail] Valor:', value);

      try {
        let query = supabase
          .from('cursos')
          .select(COURSE_DETAIL_SELECT)

        query = query.eq(column, value)

        console.log('[fetchCourseDetail] Executando query no Supabase...');
        const { data, error } = await query.maybeSingle<CourseDetailQueryRow>()

        if (error) {
          console.error('[fetchCourseDetail] ❌ ERRO no Supabase:', error);
          console.error('[fetchCourseDetail] Mensagem:', error.message);
          console.error('[fetchCourseDetail] Detalhes:', error.details);
          console.error('[fetchCourseDetail] Hint:', error.hint);
          throw new Error(`Erro ao buscar detalhe do curso: ${error.message}`)
        }

        console.log('[fetchCourseDetail] ✅ Query executada com sucesso');
        console.log('[fetchCourseDetail] Dados retornados:', data ? 'SIM' : 'NULL');

        if (data) {
          console.log('[fetchCourseDetail] Título do curso:', data.title);
          console.log('[fetchCourseDetail] Slug do curso:', data.slug);
          console.log('[fetchCourseDetail] Categoria:', data.category);
          console.log('[fetchCourseDetail] === DADOS BRUTOS DO BANCO ===');
          console.log('[fetchCourseDetail] short_description (raw):', data.short_description);
          console.log('[fetchCourseDetail] full_description (raw):', data.full_description);
          console.log('[fetchCourseDetail] Tipo de short_description:', typeof data.short_description);
          console.log('[fetchCourseDetail] Tipo de full_description:', typeof data.full_description);
          console.log('[fetchCourseDetail] ============================');
          console.log('[fetchCourseDetail] Highlights:', data.curso_highlights?.length ?? 0);
          console.log('[fetchCourseDetail] Curriculum:', data.curso_curriculum?.length ?? 0);
          console.log('[fetchCourseDetail] Professores:', data.curso_professores?.length ?? 0);
        }

        if (!data) {
          console.log('[fetchCourseDetail] Nenhum curso encontrado com', column, '=', value);
          console.log('[fetchCourseDetail] ====== FIM ======');
          return null
        }

        console.log('[fetchCourseDetail] Iniciando mapeamento dos dados...');
        const mapped = mapCourseDetail(data);
        console.log('[fetchCourseDetail] ✅ Mapeamento concluído');
        console.log('[fetchCourseDetail] ====== FIM ======');

        return mapped;
      } catch (err) {
        console.error('[fetchCourseDetail] ❌ EXCEÇÃO CAPTURADA:');
        console.error('[fetchCourseDetail] Erro:', err);
        console.error('[fetchCourseDetail] Stack:', err instanceof Error ? err.stack : 'N/A');
        console.log('[fetchCourseDetail] ====== FIM COM ERRO ======');
        throw err;
      }
    },
    ['courses', 'detail', column, value],
    { tags: [COURSE_DETAIL_TAG(value)] },
  )()

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
  console.log('[getCourseBySlug] ====== INÍCIO ======');
  console.log('[getCourseBySlug] Slug recebido:', slug);
  console.log('[getCourseBySlug] Tipo do slug:', typeof slug);

  if (!slug) {
    console.log('[getCourseBySlug] Slug vazio ou nulo, retornando null');
    return null
  }

  console.log('[getCourseBySlug] Chamando fetchCourseDetail...');
  const result = await fetchCourseDetail('slug', slug);
  console.log('[getCourseBySlug] Resultado:', result ? `Curso encontrado: ${result.title}` : 'NULL');

  if (result) {
    console.log('[getCourseBySlug] === DADOS DEPOIS DO MAPEAMENTO ===');
    console.log('[getCourseBySlug] ID:', result.id);
    console.log('[getCourseBySlug] SLUG:', result.slug);
    console.log('[getCourseBySlug] SUBTITLE:', result.subtitle ?? 'null');
    console.log('[getCourseBySlug] DESCRIPTION (card):', result.description ?? 'null');
    console.log('[getCourseBySlug] FULL_DESCRIPTION (array):', result.fullDescription?.length ?? 0, 'itens');
    if (result.fullDescription && result.fullDescription.length > 0) {
      console.log('[getCourseBySlug] Primeiros itens:', result.fullDescription.slice(0, 2));
    }
    console.log('[getCourseBySlug] =====================================');
  }

  console.log('[getCourseBySlug] ====== FIM ======');

  return result;
}

export const getCourseById = async (id: string): Promise<CourseDetail | null> => {
  if (!id) {
    return null
  }

  return fetchCourseDetail('id', id)
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

export const revalidateCourseList = async () => {
  await revalidateTag(COURSE_LIST_TAG)
}

export const revalidateCourseDetail = async (identifier: string) => {
  if (!identifier) {
    return
  }

  await revalidateTag(COURSE_DETAIL_TAG(identifier))
}

export const getAllCourseSlugs = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('cursos')
    .select('slug')
    .order('slug', { ascending: true })

  if (error) {
    throw new Error(`Erro ao listar slugs de cursos: ${error.message}`)
  }

  return (data ?? []).map((item) => item.slug)
}
