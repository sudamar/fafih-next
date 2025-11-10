import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
import { ContatosSecretaria } from '@/components/shared/contatos-secretaria'

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
              <p>
                A <strong>FAFIH - Faculdade de Arte, Filosofia e do Imaginário Humano</strong> é uma instituição inovadora dedicada à exploração de temas transdisciplinares que conectam arte, filosofia, psicologia, ciências da religião e o estudo da imaginação e comunicação humanas.
              </p>
              <p>
                Nossa abordagem acadêmica se dedica a uma profunda e integrada exploração da experiência humana, centrada em cinco pilares interconectados.
              </p>
              <p>
                O primeiro foco reside na <strong>Arte e na Criatividade</strong>, onde a criatividade é compreendida como a força motriz fundamental que impulsiona a cultura e a própria evolução humana. Em diálogo direto com este pilar, exploramos o <strong>Imaginário Humano</strong>, investigando o papel essencial da imaginação na construção de mitos, símbolos, narrativas complexas e identidades individuais e coletivas. Este campo de estudo se beneficia de uma rica interseção entre a psicologia, a antropologia, a literatura e os estudos culturais para desvendar como a realidade é moldada e interpretada.
              </p>
              <p>
                Como alicerce analítico, a <strong>Filosofia e o Pensamento Crítico</strong> promovem uma rigorosa investigação de questões éticas, metafísicas e epistemológicas. Fomentamos um diálogo vibrante e necessário entre a filosofia clássica, o pensamento contemporâneo e as diversas perspectivas não-ocidentais, buscando uma compreensão mais ampla e plural da sabedoria.
              </p>
              <p>
                A metodologia que une essas áreas é a <strong>Transdisciplinaridade</strong>. Por meio dela, desenvolvemos projetos que conectam de maneira orgânica a arte, a filosofia, as ciências sociais, as ciências da religião, a psicologia e as tecnologias emergentes. Isso inclui a exploração de novas fronteiras do conhecimento por meio de ferramentas como a realidade virtual, a arte generativa e a inteligência artificial, que abrem novas possibilidades de expressão e análise.
              </p>
              <p>
                Finalmente, todos esses focos convergem para a busca de um <strong>Impacto Social</strong> relevante. Discutimos ativamente como a arte, a filosofia e as diversas manifestações do sagrado podem oferecer respostas inovadoras aos desafios globais contemporâneos, destacando o papel vital das humanidades como ferramentas de transformação individual e coletiva. O objetivo último é promover a integração do Homo Sapiens - o "homem que sabe” - com outras dimensões essenciais do ser. Buscamos cultivar o <em>Homo Philosophicus</em>, o ser que questiona e se guia pela ética das consequências; o <em>Homo Religiosus</em>, entendido a partir da raiz latina <em>relegere</em>, que aponta para o ato de reler, cuidar e observar com atenção as práticas e saberes, em oposição a <em>religare</em>, que significa "religar"; e o <strong>Homo Ludens</strong>, conceito cunhado por Johan Huizinga para descrever o ser que joga, cria e se realiza na e através da diversidade cultural e da atividade lúdica.
              </p>
              <p>
                Mantida pelo <strong>IJEP - Instituto Junguiano de Ensino e Pesquisa</strong>, um Instituto líder e pioneiro em Psicologia Analítica de Carl Gustav Jung, seguindo os princípios do <strong>IJEP</strong>, a <strong>FAFIH</strong> oferece cursos inovadores e exclusivos, como Psicologia Junguiana, Psicossomática e Arteterapia e Expressões Criativas, combinando rigor acadêmico, transdisciplinaridade e uma visão humanizada do desenvolvimento profissional.
              </p>
              <p>
                A <strong>FAFIH</strong>, credenciada pelo Ministério da Educação (MEC) sob a Portaria Ministerial nº 579, de 25/06/2024, DOU nº 122, de 27/06/2024, garante certificados de excelência, reconhecidos nacionalmente e respaldada pela tradição em educação de ponta.
              </p>
            </div>
          </article>

          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>Nossa Missão</SectionTitle>
            <p className="mt-6 text-base leading-relaxed text-neutral-700">
              Promover ensino, iniciação científica e extensão de qualidade nas áreas de arte, filosofia, psicologia, ciências da religião, estudo da imaginação e comunicação humanas, formando profissionais cidadãos que contribuam para o desenvolvimento de uma sociedade justa e solidária.
            </p>
          </article>

          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>Nossa Visão</SectionTitle>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-neutral-700">
              <li>
                Ser reconhecida como um espaço de vanguarda na educação superior, focada na transdisciplinares entre arte, filosofia, psicologia, ciências da religião, estudo da imaginação e comunicação humanas.
              </li>
              <li>Consolidar os programas de lato sensu.</li>
              <li>Integrar o ensino, a iniciação científica e a extensão.</li>
              <li>Promover a qualidade e inovação da gestão acadêmica e administrativa;</li>
              <li>
                Manter o relacionamento permanente com os egressos, incentivando a educação continuada, proporcionando a internacionalização e o ingresso no mundo do trabalho.
              </li>
              <li>
                Explorar as profundezas da experiência humana através de uma abordagem que integra as artes, o pensamento filosófico e o vasto universo do imaginário.
              </li>
              <li>
                Ser ferramentas para a transformação individual e coletiva, capacitando nossos alunos a responderem aos complexos desafios globais com criatividade, ética e sensibilidade.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
            <SectionTitle>Nossos Valores</SectionTitle>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-neutral-700">
              <li>Respeito ao ser humano de forma integral;</li>
              <li>Excelência intelectual e profissional;</li>
              <li>Promoção do desenvolvimento emocional e espiritual;</li>
              <li>Compromisso com o conhecimento, com a aprendizagem e com a transformação da sociedade;</li>
              <li>Criatividade, ética, sensibilidade, cidadania, integridade e transparência;</li>
              <li>Inovação tecnológica permanente;</li>
              <li>Transdisciplinaridade e impacto social;</li>
              <li>Desenvolvimento e valorização da cultura e da arte;</li>
              <li>Responsabilidade com o meio ambiente e promoção do desenvolvimento sustentável.</li>
            </ul>
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
