import CursosClient from './CursosClient'
import { listCategories, listCourseCards } from '@/lib/services/courses'

export default async function CursosPage() {
  const [courses, categories] = await Promise.all([
    listCourseCards(),
    listCategories(),
  ])

  return <CursosClient courses={courses} categories={categories} />
}
