'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'

interface FAQItem {
  question: string
  answer: string | string[]
}

const faqData: FAQItem[] = [
  {
    question: 'Como faço para me inscrever em um curso?',
    answer: 'Para se inscrever em um curso da FAFIH, acesse nosso Portal do Aluno através do botão "Inscreva-se" no topo da página ou visite diretamente https://ijep.com.br/inscricao/aluno. Preencha o formulário com seus dados pessoais e escolha o curso desejado.',
  },
  {
    question: 'Quais são as formas de ingresso disponíveis?',
    answer: [
      'Processo Seletivo (Vestibular)',
      'ENEM (Exame Nacional do Ensino Médio)',
      'Transferência de outra instituição',
      'Portador de diploma de graduação',
      'Reopção de curso',
    ],
  },
  {
    question: 'A FAFIH oferece bolsas de estudo?',
    answer: 'Sim! A FAFIH oferece diversos programas de bolsas e descontos. Entre em contato com nossa secretaria para conhecer as opções disponíveis e verificar sua elegibilidade.',
  },
  {
    question: 'Como funciona o sistema de avaliação?',
    answer: 'O sistema de avaliação da FAFIH é composto por avaliações contínuas, trabalhos acadêmicos, participação em aulas e provas. Cada disciplina possui critérios específicos detalhados no plano de ensino apresentado pelo professor.',
  },
  {
    question: 'Posso trancar minha matrícula?',
    answer: 'Sim, é possível solicitar o trancamento de matrícula por até 2 semestres consecutivos ou alternados, de acordo com o regulamento acadêmico. O pedido deve ser feito na secretaria dentro dos prazos estabelecidos no calendário acadêmico.',
  },
  {
    question: 'Como consulto meu diploma?',
    answer: 'Você pode consultar diplomas emitidos pela FAFIH através da nossa página de Consulta de Diplomas. Utilize o número de registro, RG, CPF ou código de validação para realizar a busca.',
  },
  {
    question: 'A biblioteca está aberta para a comunidade?',
    answer: 'Sim, a biblioteca FAFIH oferece serviços para a comunidade. Consulte os horários de funcionamento e as condições de acesso no nosso site ou entre em contato diretamente com a biblioteca.',
  },
  {
    question: 'Como entro em contato com a ouvidoria?',
    answer: 'A ouvidoria da FAFIH está disponível através do formulário no menu Contato > Ouvidoria. Você pode enviar elogios, sugestões, reclamações ou denúncias de forma anônima ou identificada.',
  },
]

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
            {faqData.map((item, index) => {
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
                      {Array.isArray(item.answer) ? (
                        <ul className="list-none space-y-1 pl-0">
                          {item.answer.map((point, i) => (
                            <li key={i} className="text-[0.95rem] before:mr-2 before:content-['•']">
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[0.95rem]">{item.answer}</p>
                      )}
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
