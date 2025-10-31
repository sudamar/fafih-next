import { getPolosContent } from '@/lib/services/polos'
import { PageTitle } from '@/components/ui/page-title'
import { CardAcentoBorda } from '@/components/ui/card-acento-borda'
import { MapPin, Phone, Mail, User, ExternalLink } from 'lucide-react'

export default function PolosPage() {
  const { locations, highlights } = getPolosContent()

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <PageTitle>Polos de Ensino</PageTitle>

          <p className="mx-auto mb-16 max-w-4xl text-center text-lg leading-relaxed text-gray-600">
            A FAFIH expandiu sua presença para melhor atender estudantes em diferentes regiões, oferecendo
            ensino de qualidade através de uma rede de polos estrategicamente localizados. Cada polo mantém
            os mesmos padrões de excelência acadêmica da sede.
          </p>

          {/* Grid de Polos */}
          <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((polo) => (
              <CardAcentoBorda key={polo.id} className="flex flex-col">
                <div className="flex-1">
                  <h3 className="mb-4 text-xl font-bold text-primary">{polo.name}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                      <span>{polo.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="h-4 w-4 flex-shrink-0 text-secondary" />
                      <span>{polo.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="h-4 w-4 flex-shrink-0 text-secondary" />
                      <a
                        href={`mailto:${polo.email}`}
                        className="hover:text-primary hover:underline"
                      >
                        {polo.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <User className="h-4 w-4 flex-shrink-0 text-secondary" />
                      <span>{polo.coordinator}</span>
                    </div>
                  </div>

                </div>

                <a
                  href={polo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-primary/90"
                >
                  Ver no mapa
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardAcentoBorda>
            ))}
          </div>

          {/* Informações Gerais */}
          <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <h3 className="mb-8 text-center text-2xl font-bold text-primary">
              Informações Gerais sobre os Polos
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 transition hover:shadow-md"
                >
                  <h4 className="mb-3 text-base font-bold text-secondary">{highlight.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-600">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA de volta */}
          <div className="mt-12 flex justify-center">
            <a
              href="/"
              className="rounded-full border-2 border-primary bg-transparent px-10 py-3 font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              Voltar ao Início
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
