export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  imageUrl: string
  align?: 'center' | 'bottom'
}

export interface FocusArea {
  title: string
  bullets: string[]
}

export interface NewsItem {
  title: string
  href: string
}

export interface FooterLinkGroup {
  title: string
  links: Array<{
    label: string
    href: string
    external?: boolean
    description?: string
  }>
}

export interface ContactInfoItem {
  type: 'email' | 'phone' | 'link'
  label: string
  href: string
}

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'youtube' | 'tiktok'
  href: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Faculdade de Artes, Filosofia e do Imaginário Humano',
    subtitle: 'Conhecimento para a alma, sabedoria para o mundo',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2728&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'A Medida de Todas as Coisas',
    subtitle: 'Explorando a intersecção entre arte, ciência e a condição humana, do clássico ao contemporâneo.',
    imageUrl: 'https://i.imgur.com/72SS1Xx.jpeg',
  },
  {
    id: 3,
    title: 'CURSOS DE PÓS-GRADUAÇÃO QUE FORMAM ESPECIALISTAS',
    subtitle: 'Matrículas abertas em Brasília - São Paulo - Rio de Janeiro',
    imageUrl: 'https://i.imgur.com/MwiLTFz.png',
    align: 'bottom',
  },
  {
    id: 4,
    title: 'FORMAÇÃO DE MEMBROS ANALISTAS DO IJEP',
    subtitle: 'Exclusivo para nossos Ex-Alunos do curso de Psicologia Junguiana',
    imageUrl: 'https://i.imgur.com/8hHb16K.png',
    align: 'bottom',
  },
]

export const conhecaFafihContent = {
  paragraphs: [
    'A FAFIH - Faculdade de Arte, Filosofia e do Imaginário Humano é uma instituição inovadora dedicada à exploração de temas transdisciplinares que conectam arte, filosofia, psicologia, ciências da religião e o estudo da imaginação e comunicação humanas.',
    'Nossa abordagem acadêmica se dedica a uma profunda e integrada exploração da experiência humana, centrada nos cinco focos acadêmicos interconectados.',
    'Mantida pelo IJEP - Instituto Junguiano de Ensino e Pesquisa, um Instituto líder e pioneiro em Psicologia Analítica de Carl Gustav Jung, seguindo os princípios do IJEP, a FAFIH oferece cursos inovadores e exclusivos, como Psicologia Junguiana, Psicossomática e Arteterapia e Expressões Criativas, combinando rigor acadêmico, transdisciplinaridade e uma visão humanizada do desenvolvimento profissional.',
    'A FAFIH, credenciada pelo Ministério da Educação (MEC) sob a Portaria Ministerial nº 579, de 25/06/2024, DOU nº 122, de 27/06/2024, garante certificados de excelência, reconhecidos nacionalmente e respaldada pela tradição em educação de ponta.',
  ],
  cta: {
    label: 'Saiba Mais',
    href: '/conheca-a-fafih',
  },
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Arte e Criatividade',
    bullets: ['Estudo da criatividade como força motriz da cultura e da evolução humana.'],
  },
  {
    title: 'Filosofia e Pensamento Crítico',
    bullets: [
      'Investigação de questões éticas, metafísicas e epistemológicas, promovendo diálogos entre a filosofia clássica, contemporânea e perspectivas não-ocidentais.',
    ],
  },
  {
    title: 'Imaginário Humano',
    bullets: [
      'Exploração do papel da imaginação na construção de mitos, símbolos, narrativas e identidades.',
      'Interseção entre psicologia, antropologia, literatura e estudos culturais.',
    ],
  },
  {
    title: 'Transdisciplinaridade',
    bullets: [
      'Projetos que conectam arte, filosofia, ciências sociais, ciências da religião, psicologia e tecnologia, incluindo realidade virtual, arte generativa e IA.',
    ],
  },
  {
    title: 'Impacto Social',
    bullets: [
      'Discussão sobre como a arte, a filosofia e as religiões podem responder a desafios globais, destacando as humanidades como ferramentas de transformação individual e coletiva.',
      'Promoção da integração do Homo Sapiens com o Homo Philosophicus (ética das consequências), Homo Religiosus (relegere e não religare) e Homo Ludens (aquele que se diverte na diversidade).',
    ],
  },
]


export const newsList: NewsItem[] = [
  {
    title: 'Cursos de Psicologia Junguiana; Arteterapia e Psicossomática',
    href: 'noticia-cursos.html',
  },
  {
    title: 'Carta aberta do coordenador dos cursos da FAFIH aos alunos e interessados',
    href: 'noticia-carta-aberta.html',
  },
  {
    title: 'Dúvidas Frequentes - Perguntas e Respostas - Informações a respeito dos Cursos',
    href: 'noticia-duvidas-frequentes.html',
  },
]

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Institucional',
    links: [
      { label: 'Conheça a FAFIH', href: '/conheca-a-fafih' },
      { label: 'Conheça o IJEP', href: 'https://ijep.com.br/', external: true },
      { label: 'Focos Acadêmicos', href: 'index.html#focos' },
      { label: 'Iniciação Científica', href: 'iniciacao-cientifica.html' },
      { label: 'Extensão', href: 'extensao.html' },
      { label: 'Notícias', href: '/#noticias' },
      { label: 'Comissão Própria de Avaliação', href: '/cpa' },
      { label: 'Calendário Acadêmico', href: '/calendario-academico' },
      { label: 'Biblioteca', href: '/biblioteca' },
      { label: 'Consultar Diploma', href: 'consultar-diploma.html' },
      { label: 'Design System', href: '/dls/components' },
      { label: 'Política de Privacidade', href: 'politica-privacidade.html' },
      { label: 'Política de Cookies', href: '#', description: 'Página em construção' },
    ],
  },
  {
    title: 'Cursos',
    links: [
      { label: 'Todos', href: '/cursos' },
      { label: 'Graduação', href: 'index.html?filter=graduacao#cursos' },
      { label: 'Pós-graduação', href: 'index.html?filter=especializacao#cursos' },
      { label: 'Curta e Média Duração', href: 'index.html?filter=extensao#cursos' },
      { label: 'Eventos', href: 'index.html?filter=eventos#cursos' },
      { label: 'Formas de Ingresso', href: 'formas-de-ingresso.html' },
      { label: 'Regulamentos', href: '/regulamentos' },
      { label: 'Polos', href: 'polos.html' },
    ],
  },
  {
    title: 'Comunidade Acadêmica',
    links: [
      { label: 'Portal do Aluno', href: 'https://ijep.com.br/login-aluno', external: true },
      { label: 'Núcleo de Apoio Psicopedagógico', href: '/nucleo-apoio-psicopedagogico' },
      { label: 'Egresso', href: 'https://ijep.com.br/login-aluno', external: true },
      { label: 'Corpo Docente', href: '/corpo-docente' },
      { label: 'Membros Analistas', href: '/membros-analistas' },
      { label: 'Núcleo de Apoio e Desenvolvimento Docente', href: '/nucleo-apoio-docente' },
      { label: 'Portal do Docente', href: 'portal-do-docente.html' },
      { label: 'Serviços para a Comunidade', href: '/servicos-comunidade' },
    ],
  },
]

export const footerContact: ContactInfoItem[] = [
  { type: 'email', label: 'contato@fafih.edu.br', href: 'mailto:contato@fafih.edu.br' },
  { type: 'phone', label: '(11) 3456-7890', href: 'tel:+551134567890' },
  { type: 'link', label: 'Ouvidoria', href: '/ouvidoria' },
  { type: 'link', label: 'Perguntas Frequentes', href: 'perguntas-frequentes.html' },
]

export const footerSocials: SocialLink[] = [
  { platform: 'linkedin', href: 'https://linkedin.com' },
  { platform: 'instagram', href: 'https://instagram.com' },
  { platform: 'youtube', href: 'https://youtube.com' },
  { platform: 'tiktok', href: 'https://tiktok.com' },
]

export const footerBottomText: string[] = [
  'Credenciada EaD pela Portaria Ministerial nº 579, de 25/06/2024, DOU nº 122, de 27/06/2024, seção 1, p. 63.',
  'Mantida pelo IJEP - Instituto Junguiano de Ensino e Pesquisa',
  'Página atualizada em 12 de setembro de 2025.',
  '© 2025 FAFIH - Faculdade de Artes, Filosofia e do Imaginário Humano. Todos os direitos reservados.',
]
