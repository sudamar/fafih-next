import Link from 'next/link'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
import { ContatosSecretaria } from '@/components/shared/contatos-secretaria'
import { FocosAcademicos } from '@/components/shared/focos-academicos'
import { LinkArquivo } from '@/components/shared/link-arquivo'
import CursoCard from '@/components/domain/curso/CursoCard'
import { CardProfessor } from '@/components/ui/card-professor'
import CourseInvestmentCard from '@/components/cursos/CourseInvestmentCard'
import CourseInvestmentCardCongressos from '@/components/cursos/CourseInvestmentCardCongressos'

const mockCourse = {
  id: 1,
  category: 'especializacao',
  categoryLabel: 'Pós-Graduação',
  image: 'https://i.imgur.com/REzhmRK.jpeg',
  title: 'Psicologia Junguiana',
  description: 'Formação aprofundada com ênfase na prática clínica e compreensão simbólica.',
  price: 3890,
  modalidade: 'Presencial',
  slug: 'pos-graduacao-psicologia-junguiana',
}

const mockProfessor = {
  nome: 'Profa. Dra. Simone Magaldi',
  titulacao: 'Doutora em Ciências da Religião',
  descricao: 'Coordena programas de formação em Psicologia Junguiana e Extensão.',
  email: 'simone@fafih.edu.br',
  telefone: '(11) 5535-4695',
}

export default function DLSComponentsPage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 text-center">
          <PageTitle>Galeria de Componentes</PageTitle>
          <p className="text-base leading-relaxed text-neutral-600">
            Abaixo estão alguns dos componentes-chave definidos no Design Language System (DLS) da FAFIH. A ficha
            técnica completa está documentada em
            <Link href="/docs/DLS" className="ml-1 font-semibold text-secondary hover:text-primary">
              docs/DLS.md
            </Link>.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-12">
          {/* PageTitle */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>PageTitle</SectionTitle>
            <PageTitle>Exemplo de PageTitle</PageTitle>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Componente utilizado para títulos principais de páginas e seções hero, respeitando tipografia display e
              gradiente inferior.
            </p>
          </article>

          {/* SectionTitle */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>SectionTitle</SectionTitle>
            <SectionTitle>Exemplo de título de seção</SectionTitle>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Utilizado em blocos internos. Aplica fonte display, cor secundária e linha com gradiente institucional.
            </p>
          </article>

          {/* CursoCard */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>CursoCard</SectionTitle>
            <div className="mx-auto max-w-sm">
              <CursoCard curso={mockCourse} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Card utilizado na listagem de cursos. Combina imagem, categoria, resumo e CTA padrão.
            </p>
          </article>

          {/* CourseInvestmentCard */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>CourseInvestmentCard</SectionTitle>
            <div className="mx-auto max-w-md">
              <CourseInvestmentCard course={mockCourse} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Cartão de investimento usado em cursos de pós-graduação e extensão (quando há valores definidos).
            </p>
          </article>

          {/* CourseInvestmentCardCongressos */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>CourseInvestmentCardCongressos</SectionTitle>
            <div className="mx-auto max-w-md">
              <CourseInvestmentCardCongressos
                course={{
                  ...mockCourse,
                  category: 'congressos',
                  price: 0,
                  monthlyPrice: 'Acesso 12 meses',
                  observacoes: 'Exclusivo para ex-alunos',
                  ctaLabel: 'Adquira Agora',
                  moreInfoUrl: 'https://ijep.com.br/inscricao/aluno',
                  duration: '12 meses',
                  modalidade: 'Online',
                }}
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Variante do cartão de investimento para congressos, com selo de oferta especial e CTA externo.
            </p>
          </article>

          {/* ContatosSecretaria */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>ContatosSecretaria</SectionTitle>
            <ContatosSecretaria />
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Bloco reutilizável com telefone, WhatsApp e e-mail da secretaria acadêmica.
            </p>
          </article>

          {/* LinkArquivo */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>LinkArquivo</SectionTitle>
            <div className="space-y-4">
              <LinkArquivo
                href="/docs/exemplo-regulamento.pdf"
                titulo="Regulamento de Pós-Graduação"
                descricao="Documento base com diretrizes acadêmicas."
              />
              <LinkArquivo
                href="https://ijep.com.br/biblioteca-ijep"
                titulo="Biblioteca Virtual"
                descricao="Acesso externo à biblioteca IJEP."
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Componente utilizado para links de documentos com ícone e botão “Baixar”. Detecta automaticamente o tipo
              de arquivo conforme a extensão.
            </p>
          </article>

          {/* FocosAcademicos */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>FocosAcademicos</SectionTitle>
            <FocosAcademicos />
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Grade interativa que apresenta os focos acadêmicos institucionais. Usa `CardMoving` para animação.
            </p>
          </article>

          {/* CardProfessor */}
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>CardProfessor</SectionTitle>
            <div className="mx-auto max-w-md">
              <CardProfessor professor={mockProfessor} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Cartão de docente com foto, titularidade e contatos. Reutilizado em `CourseFaculty`.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
