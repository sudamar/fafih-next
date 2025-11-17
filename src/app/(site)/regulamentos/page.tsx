import type { Metadata } from 'next'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
import { LinkArquivo } from '@/components/shared/link-arquivo'

export const metadata: Metadata = {
  title: 'Regulamentos | FAFIH',
  description:
    'Acesse os principais regulamentos, políticas e normativos acadêmicos da FAFIH para estudantes, docentes e comunidade acadêmica.',
}

const regulatoryGroups = [
  {
    title: 'Políticas Institucionais',
    description:
    'Compromissos institucionais com inclusão, acessibilidade e atendimento à comunidade acadêmica.',
    items: [
      {
        label: 'Política de Acessibilidade e Inclusão',
        detail: 'Princípios e ações para garantir acessibilidade física, pedagógica e digital.',
        href: '/docs/politica-acessibilidade.pdf',
        tipo: "pdf"
      },
      {
        label: 'Política de Apoio Psicopedagógico',
        detail: 'Diretrizes para acolhimento, apoio e suporte aos estudantes.',
        href: '/docs/politica-apoio-psicopedagogico.pdf',
        tipo: "pdf"
      },
      {
        label: 'Código de Ética e Conduta',
        detail: 'Regras de convivência, princípios éticos e procedimentos disciplinares.',
        href: '/docs/codigo-etica.pdf',
        tipo: "pdf"
      },
    ],
  },
  {
    title: 'Normativos Complementares',
    description:
    'Procedimentos específicos para serviços à comunidade e documentação institucional.',
    items: [
      {
        label: 'Manual de Serviços para a Comunidade',
        detail: 'Apresenta os serviços disponibilizados ao público externo e formas de acesso.',
        href: '/docs/manual-servicos.pdf',
        tipo: "pdf"
      },
      {
        label: 'Política de Privacidade e Proteção de Dados',
        detail: 'Normas de tratamento, uso e proteção de dados pessoais segundo a LGPD.',
        href: '/docs/politica-privacidade.pdf',
        tipo: "pdf"
      },
      {
        label: 'Fluxo de Solicitação de Documentos Acadêmicos',
        detail: 'Procedimentos para solicitações de histórico, declarações e diplomas.',
        href: '/docs/fluxo-documentos.pdf',
        tipo: "pdf"
      },
    ],
  },
]

export default function RegulamentosPage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <PageTitle>Regulamentos Institucionais</PageTitle>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Nesta página você encontra os principais documentos que orientam o funcionamento acadêmico e administrativo
            da FAFIH. Conheça as diretrizes que garantem qualidade, transparência e compromisso com a comunidade
            acadêmica.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8">
          {regulatoryGroups.map((group) => (
            <article key={group.title} className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
              <SectionTitle>{group.title}</SectionTitle>
              <p className="text-sm leading-relaxed text-neutral-600">{group.description}</p>

              <div className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <LinkArquivo
                    key={item.label}
                    href={item.href}
                    titulo={item.label}
                    descricao={item.detail}
                    tipo={item.tipo as 'pdf' | 'txt' | 'xls' | 'doc' | 'md' | 'zip' | 'img' | 'link'}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-secondary px-6 py-10 text-white shadow-lg shadow-neutral-900/10 sm:px-10">
          <SectionTitle className="text-white">Precisa de um documento específico?</SectionTitle>
          <p className="text-base leading-relaxed text-white/90">
            Caso o documento desejado não esteja listado, entre em contato com a Secretaria Acadêmica pelo e-mail
            <strong> contato@fafih.edu.br</strong> ou pelo telefone <strong>(11) 3456-7890</strong>. Nossa equipe está
            disponível para auxiliar e encaminhar solicitações personalizadas.
          </p>
        </div>
      </section>
    </main>
  )
}
