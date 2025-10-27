/**
 * Constantes globais da aplicação FAFIH
 */

/**
 * Categorias de cursos disponíveis
 */
export const COURSE_CATEGORY = {
  ESPECIALIZACAO: 'especializacao',
  EXTENSAO: 'extensao',
  FORMACAO: 'formacao',
  CONGRESSOS: 'congressos',
} as const

/**
 * Type helper para garantir tipagem das categorias
 */
export type CourseCategory = typeof COURSE_CATEGORY[keyof typeof COURSE_CATEGORY]

/**
 * Lista de categorias que devem exibir currículo completo
 */
export const CATEGORIES_WITH_CURRICULUM = [
  COURSE_CATEGORY.ESPECIALIZACAO,
  COURSE_CATEGORY.EXTENSAO,
  COURSE_CATEGORY.FORMACAO,
] as const

/**
 * Lista de categorias que NÃO devem exibir currículo
 */
export const CATEGORIES_WITHOUT_CURRICULUM = [
  COURSE_CATEGORY.CONGRESSOS,
] as const
