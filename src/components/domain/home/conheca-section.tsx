import { conhecaFafihContent } from '@/lib/data/homepage'

export function ConhecaSection() {
  return (
    <section id="conheca-fafih" className="bg-background px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-4xl text-neutral-700">
        <h2 className="section-title mb-12">Conheça a FAFIH</h2>
        <div className="space-y-6 text-justify text-base">
          {conhecaFafihContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <a
          href={conhecaFafihContent.cta.href}
          className="mt-10 inline-flex rounded-full bg-secondary px-8 py-3 font-semibold text-white transition hover:bg-primary"
        >
          {conhecaFafihContent.cta.label}
        </a>
      </div>
    </section>
  )
}
