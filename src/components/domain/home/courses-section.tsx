import CursosClient from '@/app/(site)/cursos/CursosClient'
import type { CourseCard } from '@/lib/features/courses/types/Course.type'
import { listCourseCards } from '@/lib/services/courses'

interface HomeCategory {
  id: string
  label: string
  count: number
}

const buildHomeCategories = (courses: CourseCard[]): HomeCategory[] => {
  const map = new Map<string, { label: string; count: number }>()

  courses.forEach((course) => {
    const id = course.category ?? 'outros'
    const label = course.categoryLabel ?? course.category ?? 'Outros'

    const current = map.get(id) ?? { label, count: 0 }
    current.count += 1
    current.label = label
    map.set(id, current)
  })

  return Array.from(map.entries())
    .map(([id, info]) => ({
      id,
      label: info.label,
      count: info.count,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

export async function CoursesSection() {
  const courses = await listCourseCards()
  const categories = buildHomeCategories(courses)
  const previewCourses = courses.slice(0, 8)

  return (
    <section id="cursos" className="px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title text-center">Nossos Cursos</h2>
        <p className="mt-4 text-center text-sm text-neutral-600">
          Explore a seleção dos cursos da FAFIH. Use os filtros para encontrar a formação ideal e clique em “Ver
          detalhes” para acessar a página completa de cada curso.
        </p>

        <div className="mt-10">
          <CursosClient courses={previewCourses} categories={categories} />
        </div>
      </div>
    </section>
  )
}
