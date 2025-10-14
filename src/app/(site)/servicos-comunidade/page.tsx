import type { Metadata } from 'next'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
import { ContatosSecretaria } from '@/components/shared/contatos-secretaria'

export const metadata: Metadata = {
  title: 'Serviços para a Comunidade | FAFIH',
  description:
    'Conheça as iniciativas de extensão e serviços oferecidos pela FAFIH para a comunidade acadêmica e para o público externo.',
}

const offerings = [
  {
    title: 'Atendimentos Psicológicos e Psicopedagógicos',
    description:
      'Projetos acompanhados por docentes e profissionais do IJEP que oferecem acolhimento, orientação vocacional e apoio psicopedagógico.',
  },
  {
    title: 'Cursos e Oficinas Abertas',
    description:
      'Encontros temáticos, jornadas culturais e oficinas de curta duração voltadas à comunidade interessada em arte, filosofia e imaginário humano.',
  },
  {
    title: 'Eventos e Congressos',
    description:
      'Seminários, congressos e mesas redondas com especialistas nacionais e internacionais em psicologia analítica e humanidades.',
  },
  {
    title: 'Programas Sociais',
    description:
      'Parcerias com organizações públicas e privadas para levar práticas de escuta, criatividade e transformação social a diferentes territórios.',
  },
]

const participationSteps = [
  'Acompanhe a agenda oficial de eventos e editais divulgada no portal.',
  'Inscreva-se nas atividades de interesse utilizando os formulários disponibilizados em cada ação.',
  'Em caso de dúvidas, entre em contato com a Secretaria Acadêmica para receber orientações personalizadas.',
]

export default function ServicosComunidadePage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <PageTitle>Serviços para a Comunidade</PageTitle>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            A extensão universitária é uma forma de aproximar a FAFIH da sociedade, promovendo ações educativas,
            culturais e sociais. Conheça as iniciativas disponíveis e participe das atividades que fortalecem o vínculo
            entre academia e comunidade.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
          {offerings.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-3xl border border-primary/10 bg-primary/5 px-6 py-6 text-left shadow-lg shadow-neutral-900/5 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10"
            >
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
          <SectionTitle>Como participar</SectionTitle>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-neutral-700">
            {participationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-neutral-600">
            Informações detalhadas sobre cada serviço (datas, inscrições e requisitos) serão atualizadas nesta página à
            medida que novos projetos forem lançados.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ContatosSecretaria />
        </div>
      </section>
    </main>
  )
}
