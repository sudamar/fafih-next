import CursosClient from './CursosClient'
import { listCategories, listCourseCards } from '@/lib/services/courses'

export default async function CursosPage() {
  const [courses, categories] = await Promise.all([
    listCourseCards(),
    listCategories(),
  ])

  console.log('[CursosPage] Total de cursos retornados do banco:', courses.length)
  console.log('[CursosPage] Categorias retornadas do banco:', categories)
  console.log('[CursosPage] Slugs dos cursos:', courses.map(c => ({ slug: c.slug, category: c.category, categoryLabel: c.categoryLabel })))

  return <CursosClient courses={courses} categories={categories} />
}
