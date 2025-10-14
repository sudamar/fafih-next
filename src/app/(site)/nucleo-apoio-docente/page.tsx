import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'

export default function NucleoApoioDocentePage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <PageTitle>Núcleo de Apoio e Desenvolvimento Docente (NADD)</PageTitle>

          <div className="rounded-2xl bg-white p-8 shadow-lg space-y-8">
            <div>
              <SectionTitle>O que é o NADD?</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                O Núcleo de Apoio e Desenvolvimento Docente (NADD) da FAFIH é um setor responsável por oferecer
                suporte didático-pedagógico ao corpo docente, visando ao aprimoramento contínuo da qualidade do
                processo de ensino-aprendizagem. Sua atuação é fundamental para fortalecer as práticas pedagógicas,
                promover a inovação e valorizar os professores da instituição.
              </p>
            </div>

            <div>
              <SectionTitle>Missão e Princípios</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700 mb-4">
                A missão do NADD é promover o desenvolvimento docente por meio de ações formativas para o
                fortalecimento de um processo de ensino-aprendizagem inovador, eficaz e humanizado. O núcleo se
                orienta pelos seguintes princípios:
              </p>
              <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
                <li className="text-justify">
                  Aprimoramento constante das práticas pedagógicas em resposta às transformações sociais e culturais.
                </li>
                <li className="text-justify">
                  Criação de espaços para diálogo, reflexão e compartilhamento de experiências entre os pares.
                </li>
                <li className="text-justify">
                  Compromisso com a manutenção de um corpo docente qualificado e alinhado à missão e aos valores da FAFIH.
                </li>
                <li className="text-justify">
                  Valorização do professor, entendendo que sua satisfação e desenvolvimento se refletem diretamente
                  na qualidade da formação dos alunos.
                </li>
              </ul>
            </div>

            <div>
              <SectionTitle>Objetivos</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700 mb-4">
                O NADD tem como principais objetivos:
              </p>
              <ul className="list-disc list-outside pl-6 space-y-2 text-gray-700">
                <li className="text-justify">
                  Oferecer apoio didático-pedagógico para aprimorar as práticas docentes.
                </li>
                <li className="text-justify">
                  Promover a formação continuada dos professores por meio de cursos, palestras, seminários e workshops.
                </li>
                <li className="text-justify">
                  Estimular a reflexão crítica sobre a prática docente e seu impacto nos processos formativos.
                </li>
                <li className="text-justify">
                  Diagnosticar e definir metas para ações formativas voltadas ao desenvolvimento docente.
                </li>
                <li className="text-justify">
                  Apoiar a implementação de metodologias inovadoras e novas tecnologias educacionais.
                </li>
                <li className="text-justify">
                  Fortalecer a comunicação e a integração entre os docentes, incentivando a troca de saberes e a
                  interdisciplinaridade.
                </li>
                <li className="text-justify">
                  Fomentar a produção de conhecimento interno, valorizando os trabalhos científicos e os lançamentos
                  de livros de professores.
                </li>
                <li className="text-justify">
                  Incentivar a participação dos professores em eventos externos, como cursos, congressos e seminários.
                </li>
              </ul>
            </div>

            <div>
              <SectionTitle>Atuação</SectionTitle>
              <p className="text-justify leading-relaxed text-gray-700">
                Para cumprir sua missão, o NADD desenvolve programas de formação para professores em todas as fases
                da carreira, proporcionando espaços de capacitação e conscientização sobre a profissionalização
                docente. As atividades incluem assessoria na elaboração de planos de ensino, organização de eventos
                acadêmicos e articulação com outros setores para apoiar os docentes em seus desafios cotidianos.
                O atendimento é exclusivo para os professores da instituição.
              </p>
            </div>
          </div>

          {/* Botão Voltar */}
          <div className="mt-12 flex justify-center">
            <a
              href="/"
              className="inline-block rounded-full border-2 border-primary bg-transparent px-8 py-3 font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              Voltar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
