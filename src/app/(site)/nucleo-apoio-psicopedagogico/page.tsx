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
                O Núcleo de Apoio Psicopedagógico (NAP) da FAFIH tem como objetivo a promoção, por meio de orientação e aconselhamento psicopedagógico, do bem-estar dos relacionamentos interpessoais e institucionais dos membros da comunidade acadêmica. O foco do núcleo é apoiar os estudantes em sua adaptação à vida universitária, promover saúde mental e bem-estar e contribuir para a melhoria do processo de ensino-aprendizagem, visando ao desenvolvimento integral do aluno.
              </p>
            </div>

            {/* Como o NAP pode te ajudar */}
            <div className="space-y-4">
              <SectionTitle>Como o NAP pode te ajudar?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                No NAP, a comunidade acadêmica encontra uma equipe qualificada e preparada para apoiar em diversos aspectos. Destacam-se dentre as diversas funções do NAP:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li className="leading-relaxed">Oferecer suporte pedagógico e psicopedagógico às práticas acadêmicas, auxiliando no desenvolvimento cognitivo dos estudantes.</li>
                <li className="leading-relaxed">Auxiliar os estudantes na integração ao contexto educacional e na superação de desafios, como a adaptação ao novo ambiente social acadêmico.</li>
                <li className="leading-relaxed">
                  Elaborar planos de orientação de estudos individualizados para estudantes que precisam de apoio na organização do tempo e no desenvolvimento de estratégias de aprendizagem (gestão do tempo, hábitos de estudo, técnicas de aprendizagem).
                </li>
                <li className="leading-relaxed">
                  Promover palestras, rodas de conversa e oficinas sobre temas relevantes para o desenvolvimento intelectual e emocional dos estudantes.
                </li>
                <li className="leading-relaxed">
                  Realizar atendimento psicológico emergencial e intervenções breves, através de aconselhamento, identificando as urgências subjetivas e propiciando reflexão para um posicionamento pessoal mais adequado.
                </li>
                <li className="leading-relaxed">
                  Atuar como mediador na resolução de eventuais conflitos entre aluno e aluno, aluno e professor, ou aluno e coordenação.
                </li>
                <li className="leading-relaxed">
                  Assessorar professores e coordenadores, identificando entraves no processo de ensino-aprendizagem e sugerindo estratégias psicopedagógicas para sua superação.
                </li>
              </ul>
            </div>

            {/* Quem pode acessar o NAP */}
            <div className="space-y-4">
              <SectionTitle>Quem pode acessar o NAP?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                O NAP é um serviço voltado para os estudantes da graduação e pós-graduação, além de oferecer suporte aos coordenadores, professores e corpo técnico-administrativo da comunidade FAFIH.
              </p>
            </div>

            {/* Quando procurar o NAP */}
            <div className="space-y-4">
              <SectionTitle>Quando procurar o NAP?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">Se você está enfrentando dificuldades como:</p>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li className="leading-relaxed">Adaptação ao ambiente acadêmico ou sentimento de não pertencimento;</li>
                <li className="leading-relaxed">Ansiedade intensa, desmotivação, estresse ou crises emocionais;</li>
                <li className="leading-relaxed">Problemas relacionados ao aprendizado, concentração e organização;</li>
                <li className="leading-relaxed">Necessidade de acolhimento, escuta qualificada ou orientação em momentos de crise.</li>
              </ul>
              <p className="text-justify leading-relaxed text-gray-700">Estamos prontos para te ouvir e ajudar.</p>
            </div>

            {/* Como funciona o atendimento */}
            <div className="space-y-4">
              <SectionTitle>Como funciona o atendimento?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                Os atendimentos do NAP são realizados de forma individual ou em grupo, com total sigilo e respeito. O agendamento pode ser feito diretamente pelo estudante, professor ou colaborador através do e-mail de contato do núcleo. É importante ressaltar que o NAP não realiza atendimento clínico contínuo (psicoterapia), mas oferece aconselhamento e, se necessário, realiza o encaminhamento para serviços especializados.
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
