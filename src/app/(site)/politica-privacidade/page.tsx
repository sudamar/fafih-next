'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 rounded-lg bg-white shadow-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex w-full items-center justify-between bg-transparent px-6 py-6 text-left text-lg font-bold text-primary transition hover:bg-gray-50"
      >
        <span className="pr-8">{title}</span>
        <span
          className={`absolute right-6 text-3xl transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ${
          isOpen ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6">
          <div className="prose prose-sm sm:prose max-w-none text-justify text-gray-600">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function PoliticaPrivacidadePage() {
  return (
    <main className="bg-background">
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-6 sm:p-8 md:p-12 shadow-lg">
            <PageTitle>Política de Privacidade</PageTitle>

            <div className="mb-8 sm:mb-12 space-y-4 text-justify text-gray-700 leading-relaxed">
              <p>
                Nós, da FAFIH, acreditamos a confiança é a base para relações sólidas. Por isso, temos o
                compromisso de agir de maneira íntegra e ética na realização de todas as nossas atividades. Este
                compromisso abrange o uso consciente e responsável dos dados pessoais dos nossos alunos,
                colaboradores e demais públicos com os quais nos relacionamos.
              </p>
              <p>
                Atribuímos grande importância à sua privacidade, portanto adotamos todas as medidas necessárias
                para preservá-la. Visando a assegurar um tratamento seguro e responsável dos seus dados pessoais,
                elaboramos esta Política de Privacidade (&quot;Política&quot;), por meio da qual esclarecemos como e quais
                dados são tratados pela FAFIH e quais medidas adotamos para protegê-los e assegurar a sua
                privacidade.
              </p>
              <p>
                A aplicação desta Política contempla todas as atividades realizadas pela FAFIH que envolvam o
                tratamento on-line ou off-line de dados pessoais, contemplando acessos e/ou utilização dos
                serviços, plataformas virtuais de aprendizagem, redes sociais (Twitter, Facebook, Instagram,
                LinkedIn, Youtube, etc.), websites, aplicativos, produtos e demais recursos ofertados pela
                Instituição.
              </p>
              <p>
                Caso tenha qualquer dúvida ou questionamento sobre esta Política de Privacidade ou sobre as
                operações de tratamento que envolvem os seus dados pessoais, ou ainda caso tenha conhecimento ou
                suspeita de que seus dados foram utilizados de forma indevida, você pode entrar em contato por meio
                do nosso Canal de Privacidade.
              </p>
              <p className="text-sm italic text-gray-600">Data da última atualização: 12/09/2025.</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <AccordionItem title="1. Termos e definições">
                <p>
                  A seguir, enumeramos algumas definições e siglas para facilitar o entendimento da presente
                  Política:
                </p>
                <ul className="space-y-2 pl-5 list-disc">
                  <li>
                    <strong>Adolescente:</strong> É toda pessoa física entre 12 (doze) e 18 (dezoito) anos de
                    idade, de acordo com o Estatuto da Criança e do Adolescente (&quot;ECA&quot;);
                  </li>
                  <li>
                    <strong>Aluno:</strong> Indivíduo matriculado na FAFIH;
                  </li>
                  <li>
                    <strong>Candidato:</strong> Indivíduo que tenha interesse em se matricular na FAFIH;
                  </li>
                  <li>
                    <strong>Compartilhamento:</strong> Toda a comunicação, difusão, transferência internacional,
                    interconexão de dados pessoais ou tratamento compartilhado de bancos de dados pessoais por
                    órgãos e entidades públicos no cumprimento de suas competências legais, ou entre esses e entes
                    privados, reciprocamente, com autorização específica, para uma ou mais modalidades de
                    tratamento permitidas por esses entes públicos, ou entre entes privados;
                  </li>
                  <li>
                    <strong>Consentimento do titular:</strong> É a manifestação livre, informada e inequívoca pela
                    qual o titular concorda com o tratamento de seus dados pessoais para uma finalidade
                    determinada;
                  </li>
                  <li>
                    <strong>Controlador:</strong> Pessoa natural ou jurídica, de direito público ou privado, a quem
                    competem as decisões referentes ao tratamento de dados pessoais;
                  </li>
                  <li>
                    <strong>Cookies:</strong> São arquivos de texto que registram as atividades do usuário. O
                    objetivo é deixar a navegação mais fácil, rápida e prática, configurando algumas informações de
                    forma automática. A ideia é que você não precise ficar digitando a mesma informação várias
                    vezes, além disso, possui uma função analítica de salvar dados sobre o comportamento do usuário
                    no navegador.
                  </li>
                  <li>
                    <strong>Criança:</strong> É toda pessoa física com até 12 (doze) anos incompletos, de acordo
                    com o Estatuto da Criança e do Adolescente (&quot;ECA&quot;);
                  </li>
                  <li>
                    <strong>Dado pessoal:</strong> Toda a informação que possa identificar a pessoa, de forma
                    direta ou indireta, como por exemplo: nome, número do RG, CPF, data de nascimento, foto,
                    telefone, geolocalização, entre outros;
                  </li>
                  <li>
                    <strong>Dado pessoal sensível:</strong> dado pessoal sobre origem racial ou étnica, convicção
                    religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso,
                    filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico,
                    quando vinculado a uma pessoa natural;
                  </li>
                  <li>
                    <strong>Eliminação dos dados:</strong> Exclusão de dado ou de conjunto de dados armazenados em
                    repositório de dados, independentemente do procedimento empregado;
                  </li>
                  <li>
                    <strong>Encarregado pelo tratamento de dados pessoais (DPO - Data Protection Officer):</strong>{' '}
                    Pessoa indicada pelo controlador e operador para atuar como canal de comunicação entre o
                    controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD);
                  </li>
                  <li>
                    <strong>Pais/responsáveis:</strong> Pessoa responsável pela guarda da criança ou adolescente;
                  </li>
                  <li>
                    <strong>Operador:</strong> Pessoa natural ou jurídica, de direito público ou privado, que
                    realiza o tratamento de dados pessoais em nome do controlador;
                  </li>
                  <li>
                    <strong>Terceiros:</strong> Pessoa física ou jurídica, que peste serviços ou atue em nome da
                    FAFIH visando a auxiliar no desempenho de suas atividades. Pode ser considerado um Terceiro:
                    parceiros de negócios, fornecedores, consultores, terceirizados ou prestadores de serviços em
                    geral.
                  </li>
                  <li>
                    <strong>Titular de dados pessoais:</strong> Indivíduo a quem se refere algum dado pessoal, que
                    seja objeto de tratamento;
                  </li>
                  <li>
                    <strong>Transferência internacional de dados:</strong> Transferência de dados pessoais para
                    país estrangeiro ou organismo internacional do qual o país seja membro; e
                  </li>
                  <li>
                    <strong>Tratamento de dados pessoais:</strong> Toda operação realizada com dados pessoais, como
                    as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução,
                    transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou
                    controle da informação, modificação, comunicação, transferência, difusão ou extração;
                  </li>
                </ul>
              </AccordionItem>

              <AccordionItem title="2. Quem é o responsável pelo tratamento dos seus dados pessoais (Controlador)?">
                <p>
                  O INSTITUTO JUNGUIANO DE ENSINO E PESQUISA LTDA., Sociedade Empresária Limitada, inscrita no CNPJ
                  nº 12.439.791/0001-30, com sede na Alameda Jauaperi, 1713 - Moema, São Paulo - SP, 04523-016, é a
                  pessoa jurídica responsável pelas decisões sobre o tratamento dos seus dados pessoais.
                </p>
                <p>
                  Para apoiar no cumprimento de suas obrigações e na gestão do seu programa de privacidade, a FAFIH
                  nomeou a Sra. Andreza Nunes de Souza como encarregada pela Proteção de Dados Pessoais.
                </p>
                <p>
                  Esclarecemos que, nos termos da Lei Geral de Proteção de Dados Pessoais (Lei n. 13.709/18 ou
                  &quot;LGPD&quot;), a FAFIH é responsável pelas atividades de tratamento de dados pessoais que realizar e/ou
                  delegar no contexto da sua operação, mas não pelas atividades de tratamento realizadas diretamente
                  pela nossa rede de Polos Parceiros.
                </p>
                <p>
                  Conforme será detalhado na presente Política de Privacidade, os seus dados pessoais poderão ser
                  compartilhados entre a FAFIH e seus Polos parceiros para fins relacionados à comercialização de
                  nossos produtos, prestação de serviços, atendimento ao cliente e operação de aplicações on-line ou
                  off-line relacionadas aos nossos serviços educacionais, hipóteses em que as Partes poderão atuar em
                  regime de controladoria conjunta ou singular.
                </p>
                <p>
                  A FAFIH compartilha e dissemina boas práticas relacionadas ao tratamento de dados pessoais com toda
                  a sua rede de Polos parceiros. Contudo, destacamos que, os Polos parceiros, enquanto controladores
                  independentes, poderão tratar os seus dados pessoais de forma autônoma e for para finalidades
                  distintas das descritas acima. Em tais circunstâncias a FAFIH não é responsável e não tem qualquer
                  ingerência e/ou participação nas atividades de tratamento realizadas.
                </p>
              </AccordionItem>

              <AccordionItem title="3. Como e quais dados coletamos sobre você">
                <p>
                  Nós coletamos informações sobre você por meio das diversas interações realizadas conosco ou com
                  terceiros que atuam em nosso nome, por meio de documentos, formulários, plataformas e canais de
                  comunicação, sejam on-line ou off-line, conforme descrito a seguir:
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">3.1. Dados de visitação/navegação</h4>
                <p>
                  Ao acessar nossos sites e aplicações, poderemos coletar, além de seus dados de cadastro, dados de
                  navegação por meio do uso de cookies e/ou tecnologias similares que permitem reconhecer seu
                  navegador ou dispositivo e nos informam onde (geolocalização), como e quando as nossas páginas e
                  recursos são visitados e quantas pessoas os acessam.
                </p>
                <p>
                  A FAFIH usa cookies e/ou tecnologias similares para autenticar usuários; lembrar preferências e
                  configurações de usuários; determinar a popularidade de um conteúdo; divulgar e medir a eficácia de
                  campanhas de marketing; e analisar tendências e interesses das pessoas que interagem com os nossos
                  serviços e plataformas.
                </p>
                <p>
                  Você possui autonomia para restringir, recusar ou desabilitar o uso de cookies por meio das
                  configurações do seu navegador. Contudo, ao fazer isso, algumas áreas do nosso site podem não
                  funcionar corretamente, o que poderá impedir que você se beneficie de alguns de nossos recursos.
                </p>
                <p>
                  Para informações mais detalhadas sobre o assunto, acesse nossa Política de cookies disponível no
                  rodapé de nossas páginas institucionais.
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">3.2. Dados para marketing e propaganda</h4>
                <p>
                  Ao acessar nossas plataformas, sites e aplicações e interagir com os nossos materiais e conteúdos,
                  poderemos coletar informações que você decida compartilhar conosco, como por exemplo, nome completo,
                  CPF, telefone, endereço de e-mail, grau de escolaridade, estado, cidade e interesses educacionais.
                </p>
                <p>
                  Tais dados são coletados por meio do preenchimento de formulários de inscrição e solicitação de
                  informações e valores, comentários, inscrição em promoções, buscas, entre outros. Também poderão ser
                  coletados dados por meio de páginas de redes sociais atreladas as nossas marcas, formulários físicos
                  ou outros formatos, decorrentes de cadastros e pesquisas de interesse realizadas em eventos, locais
                  públicos ou instituições privadas que autorizem a divulgação dos nossos serviços.
                </p>
                <p>
                  Os dados coletados podem ser analisados de forma cruzada, de modo a possibilitar melhor compreensão
                  do seu perfil e direcionamento de conteúdos, produtos e serviços que sejam de seu interesse.
                  Asseguramos, no entanto, que esse cruzamento não é feito para fins discriminatórios e que todos os
                  direitos e liberdades individuais serão garantidos.
                </p>
                <p>
                  Ao criar um cadastro em nossos websites, fique atento pois você é o responsável por manter o sigilo
                  dos dados da sua conta e senha, devendo mantê-las sob sua guarda e controle, incluindo, mas não
                  limitado, a restrição de acesso ao seu computador, celular, dispositivo móvel e/ou conta. Na
                  hipótese de comprometimento do seu sigilo, acesse o nosso Canal de Privacidade.
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">3.3. Dados relacionados a processos seletivos</h4>
                <p>
                  Para viabilizar a inscrição e participação em processos seletivos conduzidos pela FAFIH (ex.:
                  vestibulares, obtenção de bolsas de estudos e descontos, bolsas de pesquisa, extensão e monitoria,
                  entre outros), será necessária a coleta de dados pessoais dos candidatos, tais como: Nome, CPF, RG,
                  RA, e-mail e telefone.
                </p>
                <p>
                  Tais dados são coletados por meio do preenchimento de formulários de inscrição, que podem ser
                  físicos ou eletrônicos, e a sua coleta e utilização seguem os termos previstos nos respectivos
                  editais de cada processo seletivo.
                </p>
                <p>
                  Também podemos coletar seus dados por meio de formulários de candidatura para processos seletivos
                  para atuação profissional na FAFIH, tais como: Nome completo, CPF, data de nascimento, e-mail e
                  telefone, grau de escolaridade e histórico profissional.
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">
                  3.4. Dados para matrícula e prestação de serviços educacionais
                </h4>
                <p>
                  Para adquirir nossos produtos, precisaremos coletar alguns dados pessoais necessários para execução
                  do contrato, prestação adequada dos serviços e cumprimento da legislação e regulamentação aplicável,
                  como por exemplo: dados de identificação (nome completo, data de nascimento, gênero, CPF, RG,
                  filiação); dados de contato (e-mail e telefone); cópia de documentos; dados de localização (país,
                  estado, cidade, endereço residencial); dados profissionais (cargo e nome da empresa em que você
                  trabalha); dados educacionais (grau de escolaridade, nome do curso, nome da instituição de ensino);
                  dados de faturamento (nome, CPF, endereço, cartão de crédito), entre outros.
                </p>
                <p>
                  Também poderemos coletar dados sensíveis, como religião, origem étnico/racial, dados médicos,
                  deficiências físicas ou cognitivas, visando cumprir obrigações legais ou regulatórias, e/ou assegurar
                  o seu acesso a direitos e a prestação adequada dos serviços contratados, por qualquer uma das partes.
                </p>
                <p>
                  Ao acessar os sistemas, plataformas e ambientes de aprendizagem disponibilizados para a devida
                  prestação de serviços, tais como Área do Aluno e AVA, serão coletados dados como: nome, RA, data,
                  horário, IP de acesso e conteúdo de usuários (ex.: comentários, interações por voz e imagem).
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">
                  3.5. Dados para utilização dos serviços abertos à comunidade
                </h4>
                <p>
                  Caso você tenha interesse em utilizar algum dos nossos serviços abertos à comunidade, como assessoria
                  jurídica e/ou contábil, assistência médica e psicológica, será necessária a coleta, diretamente do
                  titular ou responsável, de alguns dados pessoais necessários para a prestação do serviço escolhido.
                </p>
                <p>
                  Os dados coletados dependerão do serviço contratado, podendo incluir dados cadastrais (Nome, CPF, RG,
                  Data de nascimento, endereço, telefone) e dados sensíveis de saúde, tais como: exames e histórico
                  médico. Esses dados serão tratados tão somente para a prestação dos serviços oferecidos e para fins
                  de prática e desenvolvimento acadêmico de nossos alunos.
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">
                  3.6. Sistemas de monitoramento e controle de acesso
                </h4>
                <p>
                  Ao visitar e frequentar as dependências da FAFIH, podemos gravar a sua imagem por meio do nosso
                  sistema de monitoramento interno. Poderão ser coletados ainda dados pessoais para providenciar o seu
                  registro de visitante e/ou suas credenciais de acesso, de forma a manter um ambiente acadêmico e de
                  trabalho seguros.
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">
                  3.7. Participação em eventos organizados ou apoiados pela FAFIH
                </h4>
                <p>
                  Caso você participe de algum evento organizado ou apoiado pela FAFIH, serão coletados os dados
                  necessários para confirmar a sua inscrição (como nome, e-mail, telefone, dados de geolocalização e
                  interesses educacionais) e/ou registrar sua presença.
                </p>
                <p>
                  Os seus dados de contato coletados em nossos eventos poderão ser utilizados por nossos times
                  comerciais e de marketing com o intuito de enviar para você conteúdos e novidades a respeito de
                  temáticas relacionadas ao evento ou que possam ser do seu interesse. Também poderemos compartilhar
                  tais dados com patrocinadores ou apoiadores do evento, mediante coleta do seu consentimento.
                </p>

                <h4 className="font-bold text-secondary mt-6 mb-2">3.8. Por meio de terceiros</h4>
                <p>
                  Alguns dos seus dados pessoais também podem ser coletados por meio de fontes disponíveis ao público,
                  prestadores de serviço, órgãos governamentais e parceiros comerciais, como, por exemplo, Polos
                  parceiros de ensino à distância, plataformas de recrutamento e bancos de currículos, empresas de
                  marketing e captação, bureaus de informações, sites de descontos e/ou bolsas de estudos e programas
                  educacionais do Ministério da Educação (PROUNI e FIES).
                </p>
                <p>
                  A FAFIH, por meio de Terceiros, poderá utilizar de medidas de higienização e enriquecimento de dados,
                  de modo a assegurar o acesso a dados corretos e atualizados que permitam a devida prestação de
                  serviços e/ou execução da relação contratual firmada com o titular, como, por exemplo, para
                  confirmação dos dados de matrícula, recebimento de documentos obrigatórios ou cobrança de débitos.
                </p>
                <p>
                  Parte das formas de coleta de dados pessoais indicada nos itens acima pode ser realizada com base no
                  seu consentimento, situações nas quais a FAFIH não possui outra hipótese legal para realizar o
                  tratamento. Em tais casos a recusa de consentimento pode acarretar a impossibilidade de acesso, total
                  ou parcial, a serviços oferecidos pela Companhia.
                </p>
                <p>
                  Destacamos que você pode obter informações sobre as atividades de tratamento para as quais forneceu
                  consentimento, bem como solicitar a sua revogação por meio dos canais indicados no item 7 desta
                  Política.
                </p>
              </AccordionItem>

              <AccordionItem title="4. Para qual finalidade tratamos os seus dados">
                <p>
                  Todos os tratamentos de dados pessoais realizados pela FAFIH estão amparados pelas bases legais
                  previstas na Lei 13.709/2018 (LGPD), principalmente no que se refere a execução contratual,
                  cumprimento de obrigação legal/regulatória, exercício regular de direitos, legítimo interesse e
                  consentimento.
                </p>
                <p>Seus dados são tratados para viabilizar:</p>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    4.1. A execução de atividades preliminares a execução do contrato e/ou formalização e execução do
                    contrato de prestação dos nossos serviços, contemplando as especificidades de acordos comerciais;
                  </li>
                  <li>
                    4.2. A prestação de serviços ofertados à comunidade, principalmente por meio de nossas
                    clínicas-escola e núcleos de práticas jurídicas ou contábeis.
                  </li>
                  <li>
                    4.3. Inscrição e seleção em processos seletivos, acadêmicos e profissionais, inclusive no que se
                    refere ao cumprimento de obrigações legais/regulatórias e/ou políticas internas relativas à
                    diversidade e inclusão, momentos em que podem ser adotadas ferramentas que realizam decisões
                    automatizadas;
                  </li>
                  <li>
                    4.4. Cadastro adequado de usuários nos sistemas e plataformas utilizados para a prestação dos
                    serviços contratados;
                  </li>
                  <li>4.5. O faturamento, processamento e gestão de pagamentos, e realização de cobranças de débitos;</li>
                  <li>
                    4.6. Realização de análises e procedimentos com o objetivo de (i) atualizar e melhorar o cadastro
                    dos usuários, assegurando assim a qualidade dos dados e (ii) possibilitar a prevenção de fraudes na
                    contratação e faturamento de nossos serviços, de acordo com nosso legítimo interesse.
                  </li>
                  <li>
                    4.7. A divulgação e oferta de serviços, promoções e condições especiais que possam ser do seu
                    interesse e customização de ações de publicidade;
                  </li>
                  <li>
                    4.8. Realizar pesquisas e análises estatísticas que permitam, por exemplo, a adequada avaliação de
                    oferta x demanda por região geográfica, a identificação e correção de falhas em nossos serviços e o
                    aprimoramento contínuo dos nossos serviços.
                  </li>
                  <li>
                    4.9. O envio de comunicações sobre temáticas relevantes relacionadas a prestação de nossos serviços,
                    como por exemplo, alterações no calendário acadêmico, eventos internos, alertas sobre prazos ou
                    riscos relevantes, entre outros;
                  </li>
                  <li>
                    4.10. O envio de comunicações de marketing e propaganda relacionadas aos nossos produtos e serviços
                    e condições comerciais, tais como valores de mensalidades, campanhas de desconto, oferta de novos
                    cursos, entre outros;
                  </li>
                  <li>
                    4.11. Cumprimento de obrigações e determinações legais, judiciais, regulatórias ou administrativas e
                    ofícios de autoridades competentes;
                  </li>
                  <li>
                    4.12. Monitorar atividades e tendências de uso, assim como mensurar o nível de interação e
                    engajamento em relação aos nossos serviços e plataformas, com o objetivo de melhorar a experiência
                    de nossos usuários;
                  </li>
                  <li>
                    4.13. Viabilizar o controle e gestão de acessos, físico e lógico, bem como a videovigilância de
                    alguns dos nossos espaços, de modo a assegurar a segurança dos nossos sistemas e ativos, segurança
                    patrimonial e proteção à integridade física das pessoas que circulam em nossas dependências.
                  </li>
                </ul>
                <p>
                  Destacamos que para atingir algumas das finalidades indicadas acima a FAFIH pode contar com o apoio
                  de parceiros e prestadores de serviços, com os quais compartilhará os dados estritamente necessários
                  para o atingimento da finalidade almejada e adotando os cuidados necessários, conforme indicado no
                  item 8 desta Política.
                </p>
              </AccordionItem>

              <AccordionItem title="5. Como tratamos dados sensíveis e de menores de idade">
                <p>
                  Dados pessoais sensíveis são tratados pela FAFIH exclusivamente para as finalidades para as quais tais
                  dados sejam estritamente necessários. Em tais casos, conforme previsto na Lei 13.709, adotamos medidas
                  mais restritivas de acesso e aplicamos controles de segurança suficientes para a proteção dos dados.
                </p>
                <p>
                  Do mesmo modo, compreendemos a importância da proteção dos dados pessoais de menores de idade. Por
                  isso, todos os dados coletados relacionados a tais públicos são obtidos e tratados com o objetivo de
                  atender ao melhor interesse do menor e com restrição de acesso aos profissionais e parceiros que
                  efetivamente precisem acessá-los para a execução de suas atividades.
                </p>
                <p>
                  Em casos de adolescentes com mais de 16 (dezesseis) anos, os dados poderão ser fornecidos diretamente
                  pelo titular, com exceção das atividades de tratamento que necessitem da autorização de um
                  representante legal (ex.: execução de contrato). Dados de crianças e adolescentes menores de 16
                  (dezesseis) anos deverão ser fornecidos diretamente pelos respectivos responsáveis/representantes legais.
                </p>
                <p>
                  Deste modo, solicitamos que menores de 16 (dezesseis) anos, não utilizem as nossas plataformas sem o
                  acompanhamento ou consentimento dos seus pais ou responsáveis.
                </p>
                <p>
                  Os representantes legais também serão plenamente responsáveis no caso de acesso aos sites e plataformas
                  da FAFIH por parte de crianças e adolescentes, sem a devida obtenção de autorização prévia. Cabe a eles
                  a integral responsabilidade pela fiscalização das atividades e conduta dos respectivos menores sob sua
                  tutela, bem como ciência da integralidade dos presentes Termos.
                </p>
              </AccordionItem>

              <AccordionItem title="6. Como tratamos dados pessoais de colaboradores">
                <p>
                  Adotamos o mesmo nível de cuidado no tratamento de dados pessoais de nossos colaboradores, apenas
                  coletando e tratando dados mínimos necessários a finalidades específicas e que possuam bases legais
                  legítimas.
                </p>
                <p>
                  Caso você seja um dos nossos colaboradores, você pode obter mais detalhes sobre como tratamos os seus
                  dados acessando a nossa Política Administrativa de Privacidade.
                </p>
              </AccordionItem>

              <AccordionItem title="7. Como você pode fazer a gestão e acompanhamento dos seus dados">
                <p>
                  Conhecemos e respeitamos todos os direitos dos titulares de dados pessoais com os quais interagimos, os
                  quais podem ser exercidos preferencialmente por meio do Canal de Privacidade.
                </p>
                <p>
                  Informamos que para o exercício de alguns dos direitos descritos abaixo, a FAFIH poderá solicitar a
                  autenticação de sua identidade, visando assegurar que nenhuma informação será compartilhada com pessoas
                  não autorizadas e que nenhuma ação será executada sem a sua ciência e autorização.
                </p>
                <p>Por meio dos canais indicados acima você poderá realizar:</p>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    <strong>7.1. Consulta aos dados:</strong> Você pode solicitar, por meio dos nossos canais de
                    atendimento, a relação dos dados pessoais de sua titularidade que tratamos.
                  </li>
                  <li>
                    <strong>7.2. Correção de dados:</strong> Você pode, a qualquer momento, solicitar a
                    correção/alteração dos seus dados pessoais quando estiverem incompletos, incorretos ou
                    desatualizados. Caso você seja aluno ou ex-aluno você também pode realizar algumas correções e
                    atualizações de forma autônoma na Área do aluno, ou solicitar tais ajustes junto a Secretaria
                    Acadêmica ou Áreas Administrativas pertinentes, quando se tratar de colaboradores ou terceiros.
                  </li>
                  <li>
                    <strong>7.3. Manifestação de oposição:</strong> você pode se opor a determinadas operações de
                    tratamento envolvendo seus dados ou restringir o uso para determinadas finalidades, assim como
                    solicitar a revisão de decisões automatizadas.
                  </li>
                  <li>
                    <strong>7.4. Descadastramento ou cancelamento do envio de comunicações e propagandas:</strong> você
                    pode solicitar a retirada dos seus contatos de todas as nossas bases de disparo ou de listas
                    específicas, de modo a cessar o recebimento de comunicações que não sejam do seu interesse.
                  </li>
                </ul>
                <p>
                  Destacamos que, caso você preencha qualquer formulário e manifeste novamente seu interesse em entrar em
                  contato ou receber informações e materiais da FAFIH, ficará caracterizada a reinserção do seu contato
                  em nossas bases. Portanto, a requisição do cancelamento deve ser registrada novamente, se for do seu
                  interesse, sempre que houver uma nova interação conosco.
                </p>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    <strong>7.5. Gestão ou revogação de consentimento:</strong> Para os casos em que o tratamento dos
                    seus dados ocorrer com base no seu consentimento, você pode gerenciar o consentimento que forneceu ou
                    mesmo solicitar a revogação dos consentimentos fornecidos.
                  </li>
                  <li>
                    <strong>7.6. Eliminação de dados:</strong> Você pode, a qualquer momento, solicitar a exclusão, total
                    ou parcial, dos seus dados pessoais por meio do cancelamento da sua matrícula ou de outros cadastros
                    e inscrições que tenha realizado.
                  </li>
                </ul>
                <p>
                  Contudo, ressaltamos que, mesmo após a solicitação de exclusão, a FAFIH poderá manter parte dos seus
                  dados pessoais para o cumprimento das seguintes finalidades: (a) processos judiciais, administrativos e
                  arbitrais (pelo prazo necessário), (b) cumprimento de obrigação legal e/ou regulatória ou (c) exercício
                  regular de direitos, como, por exemplo, fazer valer os direitos da FAFIH com base no contrato de
                  prestação de serviços.
                </p>
                <p>
                  Ressaltamos que poderá haver situações em que a FAFIH, por motivos legítimos, deixará de atender a uma
                  solicitação de exercício de direitos, como por exemplo, (i) quando o fornecimento de informações e
                  documentos puder violar segredos comerciais ou direitos de propriedade intelectual da FAFIH; (ii) quando
                  houver outra base legal que obrigue ou legitime a retenção de dados por parte da FAFIH, como por exemplo
                  o cumprimento de obrigações legais/regulatórias e a defesa da Companhia em processos de natureza
                  judicial, administrativa ou arbitral. ou (iii) quando a solicitação estiver fora das atribuições da
                  FAFIH.
                </p>
                <p>
                  Ainda, destacamos que algumas solicitações poderão não ser respondidas de forma imediata. Em tais casos,
                  o titular poderá acompanhar a evolução de sua solicitação por meio dos canais indicados no início deste
                  item, havendo o compromisso da FAFIH em fornecer retorno em um prazo razoável e em conformidade com a
                  legislação aplicável.
                </p>
              </AccordionItem>

              <AccordionItem title="8. Com quem compartilhamos os seus dados">
                <p>
                  Os seus dados são compartilhados em algumas situações, respeitada a sua privacidade e proteção de dados,
                  bem como os princípios e diretrizes previstos na LGPD.
                </p>
                <p>Listamos abaixo algumas hipóteses em que os seus dados podem ser compartilhados:</p>
                <ul className="list-none pl-0 space-y-2">
                  <li>
                    8.1. Entre Instituições parceiras da FAFIH, nos limites das finalidades descritas nesta Política;
                  </li>
                  <li>
                    8.2. Com Autoridades judiciais, administrativas e governamentais: Para cumprimento de determinações ou
                    obrigações legais e regulatórias, fiscalizações e avaliações, concessão de bolsas e financiamento
                    estudantil, entre outros. Ou ainda para defesa dos direitos da Companhia ante processos judiciais ou
                    administrativos;
                  </li>
                  <li>
                    8.3. Com nossa Rede de Polos Parceiros: Para viabilizar a divulgação de nossos produtos e serviços,
                    execução de atividades pré-contratuais, concretização de matrículas e prestação dos serviços
                    educacionais contratados, incluindo o atendimento de demandas administrativas e acadêmicas;
                  </li>
                  <li>
                    8.4. Com Instituições financeiras, Provedores de meios de pagamento, Integradores de meios de
                    pagamento e Empresas de cartões de crédito: Para processar o pagamento referente aos serviços
                    educacionais e administrativos adquiridos;
                  </li>
                  <li>
                    8.5. Com parceiros de negócios para viabilizar parcerias comerciais ou convênios que possibilitem
                    acesso a produtos diferenciados ou a execução de atividades acadêmicas necessárias à formação de
                    nossos alunos (ex.: estágios obrigatórios, intercâmbios, cerimônia de colação de grau e formatura).
                  </li>
                  <li>
                    8.6. Com prestadores de serviços que tratam dados pessoais em nome da FAFIH, de modo a desempenhar
                    determinadas funções como: fornecimento/licenciamento de plataformas de aprendizagem e tecnologia
                    educacional; cobranças e negociação de pendências financeiras; fornecimento de seguro de vida e saúde;
                    recrutamento de profissionais; ações de marketing e comunicação; gestão e controle de acesso físico;
                    serviços de armazenamento em nuvem; auditoria externa; entre outros.
                  </li>
                </ul>
                <p>
                  A FAFIH apenas utiliza serviços e tecnologias oferecidos por Terceiros confiáveis e que demonstrem
                  seguir padrões de segurança adequados e suficientes. Para tanto, todos os Terceiros com os quais
                  compartilhamos dados pessoais são submetidos a um processo de avaliação e a um processo de assinatura de
                  cláusulas e acordos de confidencialidade e privacidade.
                </p>
                <p>
                  Em hipótese alguma, a FAFIH vende ou transfere dados pessoais a qualquer Terceiro, visando a obtenção de
                  vantagem financeira ou de forma contrária a esta Política ou a Lei Geral de Proteção de Dados (LGPD).
                </p>
              </AccordionItem>

              <AccordionItem title="9. Transferência internacional de dados">
                <p>
                  A FAFIH está sediada no Brasil, contudo, em algumas situações podemos compartilhar os seus dados
                  pessoais com Terceiros que se encontram fora do Brasil, como é o caso de prestadores de serviço de
                  armazenamento em nuvem e parceiros comerciais com atuação internacional, os quais poderão atuar como
                  Operadores ou em regime de controladoria conjunta.
                </p>
                <p>
                  Ressaltamos que, independentemente do local de tratamento/armazenamento, nós adotamos as medidas
                  técnicas e administrativas necessárias para garantir a segurança, confidencialidade e privacidade dos
                  seus dados, tais como a aplicação de avaliação de privacidade e segurança da informação, bem como a
                  adoção de cláusulas contratuais específicas para assegurar tratamento em conformidade com a LGPD ou
                  legislações equivalentes.
                </p>
              </AccordionItem>

              <AccordionItem title="10. Período de armazenamento dos dados">
                <p>
                  Seus dados pessoais serão mantidos pela FAFIH apenas pelo tempo necessário para o cumprimento das
                  finalidades para as quais eles foram coletados, respeitando sempre o período de retenção de dados
                  previsto na legislação aplicável.
                </p>
                <p>
                  Ressaltamos também que caso seja solicitada a exclusão ou anonimização de dados pessoais, isso apenas
                  será possível para dados cujo armazenamento não seja determinado por lei, autoridade regulatória,
                  execução contratual ou outras hipóteses que justifiquem o armazenamento dos dados.
                </p>
              </AccordionItem>

              <AccordionItem title="11. Medidas de segurança que adotamos">
                <p>
                  Com o objetivo de preservar a sua privacidade e proteger seus dados pessoais, a FAFIH adota boas
                  práticas de segurança da informação e atua na implementação de melhorias contínuas que possibilitem a
                  proteção dos dados que coletamos. Dentre tais medidas, adotamos controles de acesso e níveis de
                  permissionamento, múltiplos fatores de autenticação, aplicação de técnicas de codificação e criptografia
                  de dados em trânsito e repouso, monitoramento de incidentes.
                </p>
                <p>
                  Esperamos que toda a nossa cadeia de valor compartilhe do mesmo nível de segurança que buscamos, por
                  isso adotamos o processo de avaliação dos terceiros que venham a tratar dados pessoais em nome ou favor
                  da FAFIH.
                </p>
                <p>
                  Além disso, capacitamos periodicamente nossos colaboradores sobre boas práticas de cibersegurança e
                  privacidade, bem como contamos com equipes específicas preparadas para detectar e responder
                  adequadamente, caso seja identificado algum incidente que possa comprometer a segurança dos seus dados.
                </p>
                <p>
                  Apesar dos cuidados e esforços mencionados, não é possível garantir que nossos serviços e sistemas são
                  invioláveis. Por isso, também contamos com a sua colaboração para proteger adequadamente suas senhas de
                  acesso e limitar o acesso de terceiros aos seus dispositivos, contas e dados pessoais. A FAFIH não será
                  responsável pelo uso ilegal e não autorizado de seus dados pessoais, que sejam decorrentes do uso
                  indevido ou desvio das suas credenciais de acesso.
                </p>
              </AccordionItem>

              <AccordionItem title="12. Atualizações desta Política">
                <p>
                  Estamos sempre buscando melhorar nossos serviços e políticas e, portanto, esta Política de Privacidade
                  poderá passar por atualizações. Por isso, antes de acessar uma de nossas plataformas ou usar nossos
                  serviços consulte nossa Política no site da FAFIH, a qual conterá a data de sua última alteração.
                </p>
              </AccordionItem>
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="/"
                className="inline-block rounded-full border-2 border-primary bg-transparent px-8 py-3 font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                ← Voltar
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
