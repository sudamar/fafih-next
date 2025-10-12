import { CardMoving } from '@/components/ui/card-moving'

const FOCOS = [
  {
    title: 'Arte e Criatividade',
    bullets: [
      'A criatividade como força motriz da cultura e da evolução humana.',
      'Produção artística como linguagem fundamental para o desenvolvimento integral.',
    ],
  },
  {
    title: 'Filosofia e Pensamento Crítico',
    bullets: [
      'Investigação ética, metafísica e epistemológica sob múltiplas perspectivas.',
      'Diálogos entre tradições clássicas, contemporâneas e não-ocidentais.',
    ],
  },
  {
    title: 'Imaginário Humano',
    bullets: [
      'Estudo de mitos, símbolos e narrativas que moldam identidades individuais e coletivas.',
      'Conexões entre psicologia, antropologia, literatura e estudos culturais.',
    ],
  },
  {
    title: 'Religiosidades e Espiritualidades',
    bullets: [
      'Análise do sagrado como experiência humana plural.',
      'Reflexões sobre práticas, saberes e impactos sociais das religiões.',
    ],
  },
  {
    title: 'Impacto Social',
    bullets: [
      'Projetos que respondem aos desafios globais com ética e sensibilidade.',
      'Transformação individual e coletiva a partir das humanidades.',
    ],
  },
]

export function FocosAcademicos() {
  return (
    <section id="focos" className="px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Nossos Focos Acadêmicos</h2>
      </div>
      <div className="mx-auto mt-16 px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {FOCOS.map((area, index) => (
            <div
              key={area.title}
              className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(16.666%-0.67rem)]"
            >
              <CardMoving title={area.title} bullets={area.bullets} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
