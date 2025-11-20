import Link from 'next/link'
import { BookOpenCheck, GraduationCap, RefreshCcw, Award } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { CardDecorado } from '@/components/ui/card-decorado'

export const metadata = {
  title: 'Formas de Ingresso | FAFIH',
  description: 'Conheça todos os caminhos para ingressar na FAFIH e iniciar sua jornada acadêmica.',
}

export default function FormasDeIngressoPage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <PageTitle>Formas de Ingresso</PageTitle>

          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-neutral-600">
            Descubra os caminhos para se tornar um aluno da FAFIH e iniciar sua jornada de transformação através do conhecimento.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <CardDecorado
              icon={<BookOpenCheck className="h-6 w-6" />}
              title="Vestibular"
              buttons={[{ label: 'Saiba Mais e Inscreva-se', href: '#' }]}
            >
              <p>
                Realize uma redação e uma prova com 15 questões de Matemática e Língua Portuguesa. Uma forma clássica de avaliar suas habilidades e garantir sua vaga. Não tem taxa de inscrição e o resultado é imediato.
              </p>
            </CardDecorado>

            <CardDecorado
              icon={<GraduationCap className="h-6 w-6" />}
              title="ENEM"
              buttons={[{ label: 'Consulte as Condições', href: '#' }]}
            >
              <p>
                Utilize sua nota do Exame Nacional do Ensino Médio (ENEM) para ingressar em nossos cursos sem fazer vestibular. Uma maneira prática de aproveitar seu desempenho nessa avaliação.
              </p>
            </CardDecorado>

            <CardDecorado
              icon={<RefreshCcw className="h-6 w-6" />}
              title="Transferência Externa"
              buttons={[{ label: 'Veja o Edital', href: '#' }]}
            >
              <p>
                Já está cursando em outra instituição e deseja fazer parte da FAFIH? Solicite a transferência e continue seus estudos conosco, aproveitando as disciplinas já cursadas (sujeito à análise curricular).
              </p>
            </CardDecorado>

            <CardDecorado
              icon={<Award className="h-6 w-6" />}
              title="Portador de Diploma (Segunda Graduação)"
              buttons={[{ label: 'Inicie sua Solicitação', href: '#' }]}
            >
              <p>
                Já possui um diploma de nível superior e quer fazer uma nova graduação? Aqui, você pode ingressar em um novo curso de graduação sem a necessidade de um novo vestibular e ainda elimina as disciplinas que já estudou no curso anterior (sujeito à análise curricular e vagas).
              </p>
            </CardDecorado>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-5">
            <a
              href="#"
              className="rounded-full border-2 border-primary bg-transparent px-8 py-3 text-lg font-semibold text-primary transition hover:scale-105 hover:bg-primary hover:text-white"
            >
              Edital do Processo Seletivo
            </a>
            <a
              href="#"
              className="rounded-full border-2 border-footer-blue bg-footer-blue px-8 py-3 text-lg font-semibold text-white transition hover:scale-105 hover:brightness-110"
            >
              Inscreva-se Agora
            </a>
            <Link
              href="/#cursos"
              className="rounded-full border-2 border-neutral-400 bg-transparent px-8 py-3 text-lg font-semibold text-neutral-700 transition hover:scale-105 hover:bg-neutral-100"
            >
              Voltar
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
