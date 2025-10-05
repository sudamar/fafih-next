import { focusAreas } from '@/lib/data/homepage'
import { CardMoving } from '@/components/ui/card-moving'

export function FocusSection() {
  return (
    <section id="focos" className="px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Nossos Focos Acadêmicos</h2>
      </div>
      <div className="mx-auto mt-16 px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {focusAreas.map((area, index) => (
            <div key={area.title} className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(16.666%-0.67rem)]">
              <CardMoving title={area.title} bullets={area.bullets} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
