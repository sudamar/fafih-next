import { HeroSlider } from '@/components/domain/home/hero-slider'
import { ConhecaSection } from '@/components/domain/home/conheca-section'
import { FocosAcademicos } from '@/components/shared/focos-academicos'
import { CoursesSection } from '@/components/domain/home/courses-section'
import { TestimonialsSection } from '@/components/domain/home/testimonials-section'
import { NewsSection } from '@/components/domain/home/news-section'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <ConhecaSection />
      <FocosAcademicos />
      <CoursesSection />
      <TestimonialsSection />
      <NewsSection />
    </div>
  )
}
