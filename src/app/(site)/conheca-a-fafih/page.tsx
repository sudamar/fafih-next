import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
import { ContatosSecretaria } from '@/components/shared/contatos-secretaria'

const aboutParagraphs = [
  'A FAFIH - Faculdade de Arte, Filosofia e do Imaginário Humano é uma instituição inovadora dedicada à exploração de temas transdisciplinares que conectam arte, filosofia, psicologia, ciências da religião e o estudo da imaginação e comunicação humanas.',
  'Nossa abordagem acadêmica se dedica a uma profunda e integrada exploração da experiência humana, centrada em cinco pilares interconectados.',
  'O primeiro foco reside na Arte e na Criatividade, onde a criatividade é compreendida como a força motriz fundamental que impulsiona a cultura e a própria evolução humana. Em diálogo direto com este pilar, exploramos o Imaginário Humano, investigando o papel essencial da imaginação na construção de mitos, símbolos, narrativas complexas e identidades individuais e coletivas.',
  'Como alicerce analítico, a Filosofia e o Pensamento Crítico promovem uma rigorosa investigação de questões éticas, metafísicas e epistemológicas, fomentando um diálogo vibrante entre diferentes perspectivas.',
  'A metodologia que une essas áreas é a Transdisciplinaridade, conectando arte, filosofia, ciências sociais, ciências da religião, psicologia e tecnologias emergentes.',
  'Todos esses focos convergem para a busca de um Impacto Social relevante, destacando o papel vital das humanidades como ferramentas de transformação individual, coletiva e global.',
  'Mantida pelo IJEP - Instituto Junguiano de Ensino e Pesquisa, a FAFIH oferece cursos inovadores, combinando rigor acadêmico, transdisciplinaridade e uma visão humanizada do desenvolvimento profissional.',
  'Credenciada pelo Ministério da Educação (MEC) sob a Portaria Ministerial nº 579, de 25/06/2024 (DOU nº 122, de 27/06/2024), a FAFIH garante certificações de excelência reconhecidas nacionalmente.',
]

const visionItems = [
  'Ser reconhecida como um espaço de vanguarda na educação superior focada na transdisciplinaridade.',
  'Consolidar os programas de lato sensu.',
  'Integrar o ensino, a iniciação científica e a extensão.',
  'Promover a qualidade e inovação da gestão acadêmica e administrativa.',
  'Manter relacionamento permanente com os egressos, incentivando educação continuada, internacionalização e inserção profissional.',
  'Explorar a experiência humana por meio da integração entre artes, pensamento filosófico e imaginário.',
  'Ser ferramenta de transformação individual e coletiva, promovendo respostas criativas, éticas e sensíveis aos desafios contemporâneos.',
]

const values = [
  'Respeito ao ser humano de forma integral.',
  'Excelência intelectual e profissional.',
  'Promoção do desenvolvimento emocional e espiritual.',
  'Compromisso com o conhecimento, a aprendizagem e a transformação da sociedade.',
  'Criatividade, ética, sensibilidade, cidadania, integridade e transparência.',
  'Inovação tecnológica permanente.',
  'Transdisciplinaridade e impacto social.',
  'Valorização da cultura e da arte.',
  'Responsabilidade com o meio ambiente e promoção do desenvolvimento sustentável.',
]

const management = [
  { title: 'Diretoria Geral', name: 'Prof. Dr. Waldemar Magaldi Filho' },
  { title: 'Diretoria Acadêmica', name: 'Profa. Dra. E. Simone D. Magaldi' },
  { title: 'Secretaria Geral', name: 'Andreza Nunes de Souza' },
]

export default function ConhecaFafihPage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <PageTitle>Conheça a FAFIH</PageTitle>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Humanidades, arte, filosofia e imaginário humano caminhando juntos para formar profissionais que transformam o mundo com ética, criatividade e sensibilidade.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-10">
          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>Sobre a Instituição</SectionTitle>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>Nossa Missão</SectionTitle>
            <p className="mt-6 text-base leading-relaxed text-neutral-700">
              Promover ensino, iniciação científica e extensão de qualidade nas áreas de arte, filosofia, psicologia, ciências da religião, estudo da imaginação e comunicação humanas, formando profissionais que contribuam para o desenvolvimento de uma sociedade justa e solidária.
            </p>
          </article>

          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>Nossa Visão</SectionTitle>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-neutral-700">
              {visionItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>Nossos Valores</SectionTitle>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {values.map((value, index) => (
                <p key={index} className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-neutral-700">
                  {value}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
          <SectionTitle>Gestão Administrativa e Acadêmica</SectionTitle>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700">
            {management.map(({ title, name }) => (
              <p key={title}>
                <strong>{title}</strong>
                  <br />
                  {name}
                </p>
              ))}
              <p>
                A administração superior da FAFIH é formada pelo Conselho Superior e de Ensino, Iniciação Científica e Extensão (ConSEICE).
              </p>
            </div>
          </article>

          <ContatosSecretaria />
        </div>
      </section>
    </main>
  )
}
