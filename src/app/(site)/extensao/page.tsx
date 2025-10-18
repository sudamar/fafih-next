'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'

import { TabNavegacao } from '@/components/ui/tab-navegacao';

export default function ExtensaoPage() {
  const [activeTab, setActiveTab] = useState('apresentacao')

  const tabs = [
    { id: 'apresentacao', label: 'Apresentação' },
    { id: 'programas', label: 'Programas' },
    { id: 'atividades', label: 'Atividades Extensionistas' },
    { id: 'jornada', label: 'Jornada da Extensão' },
    { id: 'editais', label: 'Editais' },
    { id: 'regulamentacao', label: 'Regulamentação' },
    { id: 'faq', label: 'FAQ' }, 
  ]

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <PageTitle>Extensão Universitária</PageTitle>

          <p className="mx-auto mb-12 max-w-4xl text-center text-lg leading-relaxed text-gray-600">
            A Curricularização da Extensão é um processo orgânico e dinâmico. Ocorre quando a Faculdade oferece
            importantes serviços à população, realizando a integração entre teoria e prática.
          </p>

          <TabNavegacao tabs={tabs} onTabChange={setActiveTab} initialTab="apresentacao" />

          {/* Tab Content */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            {activeTab === 'apresentacao' && <ApresentacaoTab />}
            {activeTab === 'programas' && <ProgramasTab />}
            {activeTab === 'atividades' && <AtividadesTab />}
            {activeTab === 'jornada' && <JornadaTab />}
            {activeTab === 'editais' && <EditaisTab />}
            {activeTab === 'regulamentacao' && <RegulamentacaoTab />}
            {activeTab === 'faq' && <FAQTab />}
          </div>

          {/* Page Actions */}
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


// Apresentação Tab
function ApresentacaoTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>Seja bem-vindo à Extensão</SectionTitle>

      <p className="leading-relaxed text-gray-700">
        A Curricularização da Extensão é um processo orgânico e dinâmico. Ocorre pela vontade de mudar o mundo
        por meio da Educação, o transformando em um lugar melhor para todos. Mais do que o cumprimento da legislação,
        a curricularização da extensão mudou o modelo da Educação Superior.
      </p>

      <p className="leading-relaxed text-gray-700">
        Entendendo as demandas da comunidade, podemos nos conectar com elas e realizar ações efetivas, contribuindo
        com uma transformação positiva da sociedade, tendo como protagonista o estudante.
      </p>

      <h3 className="mt-8 font-display text-xl font-bold text-secondary">Definição Legal</h3>

      <blockquote className="border-l-4 border-secondary pl-6 italic text-gray-600">
        A Extensão na Educação Superior Brasileira é a atividade que se integra à matriz curricular e à organização
        da pesquisa, constituindo-se em processo interdisciplinar, político educacional, cultural, científico,
        tecnológico, que promove a interação transformadora entre as instituições de ensino superior e os outros
        setores da sociedade, por meio da produção e da aplicação do conhecimento, em articulação permanente com
        o ensino e a pesquisa. (RESOLUÇÃO MEC Nº 7, DE 18 DE DEZEMBRO DE 2018)
      </blockquote>

      <h3 className="mt-8 font-display text-xl font-bold text-secondary">O Papel da Extensão na FAFIH</h3>

      <p className="leading-relaxed text-gray-700">
        Toda Instituição de Ensino Superior deve ter os três pilares da educação: Ensino, Pesquisa e Extensão.
        As atividades de extensão da FAFIH tem por objetivo ampliar a formação acadêmica, possibilitando experiências
        práticas que desenvolvam a consciência social, política, cultural e ambiental dos estudantes e de toda a
        comunidade acadêmica, bem como assegurar a sua com o Ensino e a Iniciação Científica, baseando-se nas
        necessidades e interesses reais da Sociedade.
      </p>

      <h3 className="mt-8 font-display text-xl font-bold text-secondary">Pilares a extensão universitária?</h3>

      <ul className="ml-6 space-y-2 list-disc text-gray-700">
        <li>Atuar como um dos pilares da educação superior e articular com o ensino e a pesquisa, conforme previsto na Constituição Federal.</li>
        <li>Aplicar na prática o conhecimento produzido na faculdade para a sociedade, realizando a conexão entre a academia e o mundo exterior em situações reais.</li>
        <li>Promover a formação integral do estudante como cidadão crítico, ético e responsável.</li>
        <li>Oferecer ao corpo docente a oportunidade de validar a teoria na prática e atualizar seu o conteúdo didático, quando necessário.</li>
        <li>Levar o conhecimento acadêmico, recursos da faculdade e serviços especializados para a população.</li>
        <li>Incluir projetos sociais, cursos, oficinas, eventos prestação de serviços à comunidade em diversas áreas.</li>
        <li>Atuar na solução de problemas reais e contribuir para o desenvolvimento econômico, social e cultural do entorno.</li>
        <li>Interagir com a sociedade como um processo educativo, cultural e científico.</li>
        <li>Proporcionar que toda a comunidade acadêmica aprenda com as experiências e saberes locais.</li>
        <li>Ter na matriz curricular dos cursos de graduação a dedicação de, no mínimo, dez por cento (10%) do total da carga horária curricular, conforme previsto na Resolução nº 7, de 18 de dezembro de 2018.</li>
      </ul>
    </div>
  )
}

// Programas Tab
function ProgramasTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>Nossos Programas</SectionTitle>

      <p className="leading-relaxed text-gray-700">
        Os Programas de Extensão reúnem, a médio e longo prazo, projetos e ações integradas com objetivos comuns,
        alinhados às linhas de ensino e pesquisa da FAFIH. Abrangem iniciativas socioeducativas em saúde, educação,
        comunicação, cultura, empreendedorismo, meio ambiente e outras áreas, visando à formação integral dos
        estudantes e ao atendimento à comunidade. Promovem a convergência entre ensino, pesquisa e extensão,
        evitando ações meramente assistencialistas.
      </p>

      <h3 className="mt-8 font-display text-xl font-bold text-secondary">
        Conheça alguns dos nossos Programas Institucionais de Extensão:
      </h3>

      <p className="italic text-gray-600">(Em breve, a lista de programas será disponibilizada).</p>
    </div>
  )
}

interface Activity {
  name: string
  startDate: string
  endDate: string
  modality: string
  hours: string
  area: string
  description: string
}

// Atividades Tab
function AtividadesTab() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  const activities = [
    {
      name: 'Oficinas de Arte e Saúde Mental',
      startDate: '01/03/2025',
      endDate: '15/05/2025',
      modality: 'Oficina',
      hours: '40h',
      area: 'Psicologia Analítica',
      description: 'Promover o bem-estar emocional em comunidades locais através de oficinas de arteterapia.',
    },
    {
      name: 'Círculos de Leitura Filosófica',
      startDate: '15/02/2025',
      endDate: '30/04/2025',
      modality: 'Evento',
      hours: '30h',
      area: 'Filosofia',
      description: 'Estimular o pensamento crítico e o diálogo filosófico com a comunidade externa por meio de encontros de leitura.',
    },
  ]

  return (
    <div className="space-y-6">
      <SectionTitle>Projetos de Extensão</SectionTitle>

      <p className="leading-relaxed text-gray-700">
        Consulte abaixo a lista de projetos de extensão disponíveis. Clique no nome do projeto para ver mais
        detalhes e informações sobre como participar.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-display text-primary">Nome do Projeto</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-display text-primary">Data de Início</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-display text-primary">Data de Conclusão</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-display text-primary">Modalidade</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-display text-primary">Carga Horária</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="font-bold text-secondary hover:underline"
                  >
                    {activity.name}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-3">{activity.startDate}</td>
                <td className="border border-gray-300 px-4 py-3">{activity.endDate}</td>
                <td className="border border-gray-300 px-4 py-3">{activity.modality}</td>
                <td className="border border-gray-300 px-4 py-3">{activity.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="relative mx-4 w-full max-w-3xl rounded-xl bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute right-4 top-4 text-3xl text-gray-400 hover:text-black"
            >
              &times;
            </button>

            <h2 className="mb-6 font-display text-2xl font-bold text-primary">{selectedActivity.name}</h2>

            <h3 className="mb-3 font-display text-lg font-semibold text-secondary">Identificação</h3>
            <p className="mb-6 text-gray-700">
              <strong>Atividade Extensionista:</strong> {selectedActivity.name}<br />
              <strong>Modalidade:</strong> {selectedActivity.modality}<br />
              <strong>Área de Conhecimento:</strong> {selectedActivity.area}
            </p>

            <h3 className="mb-3 font-display text-lg font-semibold text-secondary">Informações Gerais da Atividade</h3>
            <p className="text-gray-700">{selectedActivity.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Jornada Tab
function JornadaTab() {
  const steps = [
    {
      title: 'Início',
      description: 'Acesse em seu AVA, na aba EXTENSÃO, as atividades disponíveis para realização.',
      svgPath: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z',
    },
    {
      title: 'Escolha da Atividade',
      description: '1. Selecione a atividade de extensão que deseja participar.\n2. Faça a leitura completa da atividade.\n3. Busque um local na comunidade para realizá-la.',
      svgPath: 'M17.73 12.01c.2-.2.2-.51 0-.71l-1.42-1.42c-.2-.2-.51-.2-.71 0l-1.06 1.06-2.83-2.83 1.06-1.06c.2-.2.2-.51 0-.71L11.34 4.9c-.2-.2-.51-.2-.71 0L9.58 6.06 6.75 3.22 3.22 6.75l2.83 2.83L4.9 11.34c-.2.2-.2.51 0 .71l1.42 1.42c.2.2.51.2.71 0l1.06-1.06 2.83 2.83-1.06 1.06c-.2.2-.2.51 0 .71l1.42 1.42c.2.2.51.2.71 0l1.06-1.06 2.83 2.83 3.54-3.54-2.83-2.83 1.07-1.06zM6.59 9.17l-1.42-1.42L6.25 6.7l1.42 1.42L6.59 9.17zm7.07 7.07-1.42 1.42L13.25 19.3l1.42-1.42 1.08-1.07z',
    },
    {
      title: 'Documentação',
      description: 'Os documentos necessários para realizar a atividade de extensão encontram-se disponíveis na aba "Regulamentação" nesta página.',
      svgPath: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
    },
    {
      title: 'Desenvolvimento',
      description: 'Uma vez que você aderiu à atividade, ela ficará disponível em "minhas atividades". Após a realização, você fará a submissão das evidências na etapa "Comprovação".',
      svgPath: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    },
    {
      title: 'Avaliação da Comunidade',
      description: 'Após o preenchimento do questionário, será disponibilizado um link para avaliação da comunidade. Encaminhe este link para o responsável do local onde a atividade foi realizada, para que possa fazer a avaliação sobre sua atuação e o impacto social do trabalho realizado.',
      svgPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    },
    {
      title: 'Avaliação e Encerramento',
      description: 'Aguarde a validação das evidências. Ao final da jornada, você terá acesso ao certificado ou declaração de conclusão, com a creditação da carga horária de extensão.',
      svgPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    },
  ]

  return (
    <div className="space-y-6">
      <SectionTitle>Jornada do Estudante na Extensão</SectionTitle>

      <div className="relative mx-auto max-w-5xl py-12">
        {/* Timeline vertical line - centralizada */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#c5d4e2] -translate-x-1/2" />

        {steps.map((step, index) => (
          <div key={index} className="relative mb-20 last:mb-0 flex items-center justify-center">
            {/* Icon Circle - sempre centralizado */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-primary border-[5px] border-white shadow-lg">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-white">
                <path d={step.svgPath} />
              </svg>
            </div>

            {/* Content - alternado (odd steps: right side, even steps: left side) */}
            <div className={`flex w-full ${index % 2 === 0 ? 'justify-end pr-[calc(50%+60px)]' : 'justify-start pl-[calc(50%+60px)]'}`}>
              <div className={`max-w-md ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <h4 className="mb-3 font-display text-xl font-bold text-secondary">{step.title}</h4>
                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Editais Tab
function EditaisTab() {
  const editais = [
    { title: 'Edital 001/2025 - Projetos de Extensão', link: '#' },
    { title: 'Edital 002/2025 - Programas Contínuos', link: '#' },
  ]

  return (
    <div className="space-y-6">
      <SectionTitle>Editais de Extensão</SectionTitle>

      <p className="leading-relaxed text-gray-700">
        Fique atento aos editais para submissão de novos projetos de extensão e oportunidades de participação.
      </p>

      <div className="space-y-4">
        {editais.map((edital, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <span className="font-bold text-gray-800">{edital.title}</span>
            <a
              href={edital.link}
              className="inline-block rounded-full bg-secondary px-6 py-2 font-bold text-white transition hover:bg-primary"
            >
              Visualizar PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

// Regulamentação Tab
function RegulamentacaoTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>Regulamentação e Documentos</SectionTitle>

      <h3 className="mt-8 font-display text-xl font-bold text-secondary">Documentos Legais</h3>
      <p className="leading-relaxed text-gray-700">
        Consulte aqui, os documentos legais que regulamentam a extensão universitária.
      </p>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <span className="font-bold text-gray-800">
            RESOLUÇÃO Nº 7, DE 18 DE DEZEMBRO DE 2018 - Diretrizes para Extensão na Educação Superior
          </span>
          <a
            href="https://portal.mec.gov.br/index.php?option=com_docman&view=download&alias=105102-rces007-18&Itemid=30192"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-secondary px-6 py-2 font-bold text-white transition hover:bg-primary"
          >
            Acessar PDF
          </a>
        </div>
      </div>

      <h3 className="mt-8 font-display text-xl font-bold text-secondary">Documentos Institucionais</h3>
      <p className="leading-relaxed text-gray-700">
        Consulte aqui, os documentos para o desenvolvimento das atividades extensionistas.
      </p>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <span className="font-bold text-gray-800">FICHA DE FREQUÊNCIA</span>
          <a
            href="#"
            className="inline-block rounded-full bg-secondary px-6 py-2 font-bold text-white transition hover:bg-primary"
          >
            Acessar PDF
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <span className="font-bold text-gray-800">TERMO DE CESSÃO DE USO DE IMAGEM</span>
          <a
            href="#"
            className="inline-block rounded-full bg-secondary px-6 py-2 font-bold text-white transition hover:bg-primary"
          >
            Acessar PDF
          </a>
        </div>
      </div>
    </div>
  )
}

// FAQ Tab
function FAQTab() {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set())

  const toggleQuestion = (index: number) => {
    const newOpen = new Set(openQuestions)
    if (newOpen.has(index)) {
      newOpen.delete(index)
    } else {
      newOpen.add(index)
    }
    setOpenQuestions(newOpen)
  }

  const faqSections = [
    {
      title: '1. Conceitos e Normativas',
      questions: [
        {
          q: '1.1. Qual é o conceito de extensão curricular?',
          a: 'A extensão integra a matriz curricular com atividades e projetos que vão além do currículo formal, ampliando oportunidades de aprendizagem e envolvimento estudantil. Complementa a formação com experiências enriquecedoras e desenvolve competências acadêmicas e socioemocionais, como colaboração, liderança, resiliência, pensamento crítico e ética. Seu objetivo central é levar conhecimento e habilidades técnicas da instituição à comunidade, atendendo suas demandas.',
        },
        {
          q: '1.2. Qual é a norma do Ministério da Educação que estabelece as diretrizes da curricularização da extensão?',
          a: 'Resolução nº 7, de 18 de dezembro de 2018, que estabelece as Diretrizes para a Extensão na Educação Superior Brasileira.',
        },
        {
          q: '1.3. Qual é a carga horária da extensão curricular na matriz dos cursos?',
          a: 'As atividades de extensão são componentes curriculares obrigatórios e devem computar 10% do total da carga horária curricular dos cursos de graduação.',
        },
      ],
    },
    {
      title: '2. Avaliação das Atividades de Extensão',
      questions: [
        {
          q: '2.1. As evidências das atividades desenvolvidas serão avaliadas? Vale nota?',
          a: 'As evidências do desenvolvimento da atividade de extensão serão validadas, assegurando que as informações e documentação apresentada sejam válidas, sem atribuição de nota.',
        },
      ],
    },
  ]

  let questionIndex = 0

  return (
    <div className="space-y-6">
      <SectionTitle>FAQ | Curricularização da Extensão</SectionTitle>

      {faqSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <h3 className="font-display text-lg font-bold text-secondary">{section.title}</h3>

          {section.questions.map((item) => {
            const currentIndex = questionIndex++
            const isOpen = openQuestions.has(currentIndex)

            return (
              <div key={currentIndex} className="rounded-lg bg-white shadow-md">
                <button
                  onClick={() => toggleQuestion(currentIndex)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-primary hover:bg-gray-50"
                >
                  <span>{item.q}</span>
                  <span className={`text-3xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-gray-700">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
