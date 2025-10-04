'use client'

import { useEffect, useMemo, useState } from 'react'
import { heroSlides } from '@/lib/data/homepage'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTO_INTERVAL = 7000

export function HeroSlider() {
  const slides = useMemo(() => heroSlides, [])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const handle = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, AUTO_INTERVAL)

    return () => clearInterval(handle)
  }, [slides.length])

  function goTo(index: number) {
    setActiveIndex(index)
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  function goPrev() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  return (
    <section id="hero" className="relative scroll-mt-32 overflow-hidden">
      <div className="relative w-full" style={{ minHeight: '85vh' }}>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col items-center bg-cover bg-center text-center transition-opacity duration-700 ease-in-out ${
                slide.align === 'bottom' ? 'justify-end pb-16 md:pb-24' : 'justify-center'
              } ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              style={{
                backgroundImage: `linear-gradient(rgba(10, 35, 66, 0.55), rgba(10, 35, 66, 0.55)), url(${slide.imageUrl})`,
              }}
            >
              <div className="mx-auto max-w-4xl px-6 text-white">
                <h1 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg text-white/90 md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      {slides.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6">
            <button
              type="button"
              onClick={goPrev}
              className="pointer-events-auto rounded-full bg-white/80 p-3 text-primary shadow-lg transition hover:bg-white"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="pointer-events-auto rounded-full bg-white/80 p-3 text-primary shadow-lg transition hover:bg-white"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-3 w-3 rounded-full transition ${
                    isActive ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ir para o slide ${index + 1}`}
                />
              )
            })}
          </div>
        </>
      ) : null}
    </section>
  )
}
