'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CursoCard from '@/components/domain/curso/CursoCard'
import { listCourseCards, listCategories } from '@/lib/services/courseCatalog'
import { PageTitle } from '@/components/ui/page-title'

const EscolhaCursosContent = () => {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter')
  const [activeFilter, setActiveFilter] = useState(filterParam || 'all')

  useEffect(() => {
    if (filterParam) {
      setActiveFilter(filterParam)
    }
  }, [filterParam])

  const coursesData = useMemo(() => listCourseCards(), [])
  const categories = useMemo(() => {
    const cats = listCategories();
    return [
      { id: 'all', label: 'Todos os Cursos', count: coursesData.length },
      ...cats
    ];
  }, [coursesData])

  const filteredCourses = useMemo(() => {
    return activeFilter === 'all'
      ? coursesData
      : coursesData.filter(course => course.category === activeFilter)
  }, [activeFilter, coursesData])

  return (
    <section className="bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <PageTitle>Nossos Cursos</PageTitle>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-3 sm:mt-4">
            Encontre a formação ideal para impulsionar sua carreira e expandir seus conhecimentos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
                activeFilter === category.id
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
              {category.count !== undefined && (
                <span className="ml-1.5 sm:ml-2 bg-gray-100 text-gray-700 rounded-full px-1.5 sm:px-2 text-xs">
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCourses.map(course => (
            <CursoCard key={course.id} curso={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-10 sm:py-12 bg-white rounded-lg shadow-sm mt-6 sm:mt-8">
            <p className="text-xl sm:text-2xl font-semibold text-gray-700">Nenhum curso encontrado</p>
            <p className="text-gray-500 mt-2">Tente ajustar seus filtros.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default function CursosPage() {
  return (
    <Suspense
      fallback={(
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center text-gray-600">
            Carregando cursos...
          </div>
        </section>
      )}
    >
      <EscolhaCursosContent />
    </Suspense>
  )
}
