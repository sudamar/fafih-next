import { testimonials } from '@/lib/data/homepage'

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-background px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Depoimentos</h2>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-lg"
            >
              <blockquote className="text-sm italic text-neutral-700">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-6">
                <h4 className="font-display text-base font-semibold text-primary">{testimonial.author}</h4>
                <span className="text-xs uppercase tracking-wide text-secondary">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
