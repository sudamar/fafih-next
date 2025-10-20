import Link from 'next/link'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'

export const metadata = {
  title: 'Núcleo de Apoio Psicopedagógico | FAFIH',
  description: 'O Núcleo de Apoio Psicopedagógico (NAP) oferece suporte aos alunos da FAFIH em questões acadêmicas e emocionais.',
}

export default function NucleoApoioPsicopedagogicoPage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <PageTitle>Núcleo de Apoio Psicopedagógico (NAP)</PageTitle>

          <p className="mx-auto mb-12 max-w-4xl text-center text-lg leading-relaxed text-gray-600">
            A FAFIH conta com o Núcleo de Apoio Psicopedagógico - NAP, um espaço dedicado ao acolhimento, suporte e orientação para os estudantes, professores e colaboradores.
          </p>

          <div className="rounded-2xl bg-white p-8 shadow-lg space-y-8">

            {/* O que é o NAP */}
            <div className="space-y-4">
              <SectionTitle>O que é o NAP?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                O NAP é um serviço de apoio psicopedagógico que oferece orientação individual e em grupo para
                alunos que enfrentam dificuldades no processo de aprendizagem ou que desejam melhorar seu
                desempenho acadêmico. O atendimento é confidencial e gratuito.
              </p>
            </div>

            {/* Como o NAP pode te ajudar */}
            <div className="space-y-4">
              <SectionTitle>Como o NAP pode te ajudar?</SectionTitle>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li className="leading-relaxed">
                  <strong>Dificuldades de aprendizagem:</strong> Orientação para superar obstáculos relacionados
                  à compreensão de conteúdos, leitura, escrita e organização de estudos.
                </li>
                <li className="leading-relaxed">
                  <strong>Gestão do tempo:</strong> Estratégias para melhorar a organização e o planejamento
                  de suas atividades acadêmicas.
                </li>
                <li className="leading-relaxed">
                  <strong>Ansiedade e estresse acadêmico:</strong> Suporte para lidar com pressões relacionadas
                  a provas, trabalhos e apresentações.
                </li>
                <li className="leading-relaxed">
                  <strong>Adaptação à vida universitária:</strong> Acolhimento e orientação para facilitar a
                  transição para o ensino superior.
                </li>
                <li className="leading-relaxed">
                  <strong>Motivação e autoestima:</strong> Apoio para fortalecer a confiança e o engajamento
                  nos estudos.
                </li>
                <li className="leading-relaxed">
                  <strong>Orientação vocacional:</strong> Reflexão sobre escolhas acadêmicas e profissionais.
                </li>
                <li className="leading-relaxed">
                  <strong>Desenvolvimento de habilidades:</strong> Orientações para aprimorar técnicas de
                  estudo, memorização e concentração.
                </li>
              </ul>
            </div>

            {/* Quem pode acessar o NAP */}
            <div className="space-y-4">
              <SectionTitle>Quem pode acessar o NAP?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                Todos os alunos regularmente matriculados na FAFIH têm direito ao atendimento do NAP.
                Não é necessário estar passando por uma situação extrema para procurar ajuda – o NAP está
                disponível para qualquer momento em que você sentir necessidade de apoio.
              </p>
            </div>

            {/* Quando procurar o NAP */}
            <div className="space-y-4">
              <SectionTitle>Quando procurar o NAP?</SectionTitle>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li className="leading-relaxed">
                  Quando você perceber que está com dificuldade para acompanhar as aulas ou realizar as atividades.
                </li>
                <li className="leading-relaxed">
                  Quando sentir que a ansiedade ou o estresse estão prejudicando seus estudos.
                </li>
                <li className="leading-relaxed">
                  Quando precisar de orientação sobre como melhorar seus métodos de estudo.
                </li>
                <li className="leading-relaxed">
                  Quando estiver em dúvida sobre sua escolha de curso ou carreira.
                </li>
              </ul>
            </div>

            {/* Como funciona o atendimento */}
            <div className="space-y-4">
              <SectionTitle>Como funciona o atendimento?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                O atendimento é realizado de forma individual ou em grupo, conforme a necessidade do aluno.
                Para agendar uma sessão, basta entrar em contato com a coordenação do NAP através do e-mail
                institucional ou comparecer à secretaria. O agendamento é rápido e o atendimento é totalmente
                confidencial.
              </p>
              <p className="text-justify leading-relaxed text-gray-700">
                Lembre-se: buscar apoio é um sinal de cuidado consigo mesmo e de compromisso com seu desenvolvimento
                acadêmico e pessoal. O NAP está aqui para você!
              </p>
            </div>

          </div>

          {/* Botões de ação */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <a
              href="/assets/documentos/regulamento-nap.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-footer-blue bg-footer-blue px-10 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:brightness-110"
            >
              Regulamento do NAP
            </a>
            <Link
              href="/"
              className="rounded-full border-2 border-primary bg-transparent px-10 py-4 text-lg font-semibold text-primary transition hover:scale-105 hover:bg-primary hover:text-white"
            >
              Voltar
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
