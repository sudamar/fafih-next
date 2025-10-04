'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { courseFilters, courses } from '@/lib/data/homepage'

type CourseCategory = (typeof courseFilters)[number]['value']

export function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState<CourseCategory>('all')

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'all') return courses
    return courses.filter((course) => course.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="cursos" className="px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Nossos Cursos</h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {courseFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter.value
                  ? 'border-secondary bg-secondary text-white'
                  : 'border-secondary/40 text-secondary hover:bg-secondary/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <article
              key={course.title}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-card-bg shadow-lg transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1280px) 280px, (min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <span className="inline-block rounded-md bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                  {course.badge}
                </span>
                <h3 className="font-display text-lg font-semibold text-primary">{course.title}</h3>
                <p className="flex-1 text-sm text-neutral-600">{course.description}</p>
                <div>
                  <a
                    href={course.href}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#6A0DAD,_#2C678F)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Saiba Mais
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
