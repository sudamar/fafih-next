import Link from 'next/link'
import { BookOpen, Users, FileText } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { CardDecorado } from '@/components/ui/card-decorado'

export default function IniciacaoCientificaPage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <PageTitle>Iniciação Científica</PageTitle>

          <p className="mx-auto mb-12 max-w-4xl text-center text-lg leading-relaxed text-gray-600">
            Nossos programas de iniciação científica oferecem aos alunos a oportunidade de participar de projetos de
            pesquisa inovadores, desenvolvendo habilidades científicas e de avanço do conhecimento, sob a orientação de
            nossos renomados professores e com a possibilidade de bolsas de estudos.
          </p>

          <div className="mt-12 space-y-8">
            <CardDecorado
              icon={<BookOpen className="h-6 w-6" />}
              title="Iniciação Científica"
              buttons={[
                { label: 'Edital', href: '#' },
                { label: 'Manual de Iniciação Científica', href: '#' },
              ]}
            >
              <p>O Programa Institucional de Bolsas de Iniciação Científica - PIBIC tem como objetivo criar mecanismos adicionais para estímulo à pesquisa discente, promover o fortalecimento das linhas de pesquisa da Faculdade, a integração entre graduação e pós-graduação e conceder de bolsas de estudos de Iniciação Científica, em face do orçamento estabelecido pela instituição ou da captação de recursos provenientes de parcerias com outras instituições, de acordo com os termos estabelecidos em Resolução própria.</p>
            </CardDecorado>

            <CardDecorado
              icon={<Users className="h-6 w-6" />}
              title="Iniciação à Docência"
              buttons={[
                { label: 'Edital', href: '#' },
                { label: 'Manual de Iniciação à Docência', href: '#' },
              ]}
            >
              <p>O Programa de Bolsas de Iniciação à Docência - PIBID tem como objetivo fomentar a formação docente, promover o desenvolvimento de atividades de pesquisa e de práticas de ensino inovadoras que contribuam para a melhoria do ensino, propiciando uma reflexão sobre a relação teoria-prática no processo de aprendizagem docente e conceder de bolsas de estudos de Iniciação Científica, em face do orçamento estabelecido pela instituição ou da captação de recursos provenientes de parcerias com outras instituições, de acordo com os termos estabelecidos em Resolução própria.</p>
            </CardDecorado>

            <CardDecorado
              icon={<FileText className="h-6 w-6" />}
              title="Grupos de Iniciação Científica e à Docência"
              buttons={[{ label: 'Conheça nossos grupos', href: '#' }]}
            >
              <p>Os grupos de iniciação científica e à docência têm a finalidade de assegurar a geração de conhecimento, oferecer um ambiente propício para desenvolver raciocínio científico e, sobretudo, combinar esforços para aprimorar a produção gerada por ele. Sob a liderança de um professor pesquisador com experiência na área, cada grupo tem o objetivo de conduzir a pesquisa e expandir o saber em seu determinado campo de trabalho.</p>
            </CardDecorado>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <Link
              href="/"
              className="rounded-full border-2 border-primary bg-transparent px-10 py-4 text-lg font-semibold text-primary transition hover:scale-105"
            >
              Voltar
            </Link>
            <a
              href="https://blog.ijep.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-footer-blue bg-footer-blue px-10 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:brightness-110"
            >
              Artigos
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
