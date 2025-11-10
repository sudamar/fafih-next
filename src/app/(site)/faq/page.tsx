'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index]
    )
  }

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <PageTitle>Perguntas Frequentes</PageTitle>

          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-gray-600">
            Encontre respostas para as dúvidas mais comuns sobre a FAFIH, nossos cursos, processos e serviços.
          </p>

          {/* FAQ Container - max-w-[900px] mx-auto */}
          <div className="mx-auto max-w-[900px]">
            {[
              {
                question: 'Quais são os pré-requisitos para os cursos de Pós-Graduação?',
                answer:
                  'Para ingressar em nossos cursos de Pós-Graduação Lato Sensu (Especialização), é necessário possuir diploma de conclusão de um curso de graduação reconhecido pelo MEC. Para alguns cursos específicos, como Arteterapia, recomendamos ter cursado nossa introdução à Psicologia Junguiana caso não tenha essa base.',
              },
              {
                question: 'Os cursos EAD são totalmente online?',
                answer:
                  'Sim, nossos cursos na modalidade EAD são 100% online, com aulas síncronas (ao vivo), permitindo a interação em tempo real com professores e colegas. As aulas também são gravadas e disponibilizadas para que os alunos possam assistir posteriormente.',
              },
              {
                question: 'Como funciona o processo de matrícula?',
                answer:
                  'O processo de matrícula pode ser iniciado através do nosso site, clicando no botão &ldquo;Inscreva-se&rdquo;. Você será direcionado para o portal de inscrição, onde preencherá seus dados, enviará os documentos necessários e efetuará o pagamento da taxa de matrícula para garantir sua vaga.',
              },
              {
                question: 'A FAFIH oferece bolsas de estudo?',
                answer:
                  'A FAFIH possui uma política de descontos e convênios. Recomendamos entrar em contato com nossa secretaria acadêmica através do e-mail contato@fafih.edu.br para verificar as condições e os programas de desconto disponíveis no momento.',
              },
              {
                question: 'Qual a diferença entre os cursos de Pós-Graduação e os de Curta Duração?',
                answer:
                  'Os cursos de Pós-Graduação (Especialização) possuem uma carga horária maior (mínimo de 360 horas), são voltados para a formação de especialistas em uma determinada área e conferem o título de especialista. Já os cursos de Curta Duração (Extensão) são mais focados em temas específicos, possuem carga horária menor e conferem um certificado de participação ou atualização profissional.',
              },
            ].map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div
                  key={index}
                  className="mb-4 rounded-lg bg-white shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="relative flex w-full items-center justify-between bg-transparent px-6 py-6 text-left text-lg font-bold text-primary transition hover:bg-gray-50"
                  >
                    <span className="pr-8">{item.question}</span>
                    <span
                      className={`absolute right-6 text-3xl transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-[1000px]' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-600">
                      <p className="text-[0.95rem]">{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 rounded-2xl bg-white p-8 text-center shadow-lg">
            <SectionTitle as="h2" className="mb-4">
              Não encontrou o que procurava?
            </SectionTitle>
            <p className="mb-6 text-gray-600">
              Entre em contato conosco através da ouvidoria ou consulte outras seções do site.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/ouvidoria"
                className="rounded-full bg-primary px-8 py-3 font-bold text-white shadow-md transition hover:bg-primary/90"
              >
                Fale com a Ouvidoria
              </a>
              <a
                href="/"
                className="rounded-full border-2 border-primary bg-transparent px-8 py-3 font-bold text-primary shadow-md transition hover:bg-primary hover:text-white"
              >
                Voltar ao Início
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
