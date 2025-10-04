import { focusAreas } from '@/lib/data/homepage'

export function FocusSection() {
  return (
    <section id="focos" className="px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Nossos Focos Acadêmicos</h2>
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {focusAreas.map((area) => (
            <div key={area.title} className="focus-card">
              <div className="focus-card-inner">
                <div className="focus-card-face focus-card-front">
                  <h3 className="text-xl font-display font-semibold text-primary">{area.title}</h3>
                </div>
                <div className="focus-card-face focus-card-back">
                  <ul className="space-y-2">
                    {area.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
