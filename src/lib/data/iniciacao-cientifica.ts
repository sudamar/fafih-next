export interface IniciacaoProgram {
  title: string
  description: string
  actions: Array<{
    label: string
    href: string
    external?: boolean
  }>
}

export interface IniciacaoPageAction {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  external?: boolean
}

export const iniciacaoIntro = {
  title: 'Iniciação Científica',
  description:
    'Nossos programas de iniciação científica oferecem aos alunos a oportunidade de participar de projetos de pesquisa inovadores, desenvolvendo habilidades científicas e de avanço do conhecimento, sob a orientação de nossos renomados professores e com a possibilidade de bolsas de estudos.',
}

export const iniciacaoPrograms: IniciacaoProgram[] = [
  {
    title: 'Iniciação Científica',
    description:
      'O Programa Institucional de Bolsas de Iniciação Científica - PIBIC tem como objetivo criar mecanismos adicionais para estímulo à pesquisa discente, promover o fortalecimento das linhas de pesquisa da Faculdade, a integração entre graduação e pós-graduação e conceder de bolsas de estudos de Iniciação Científica, em face do orçamento estabelecido pela instituição ou da captação de recursos provenientes de parcerias com outras instituições, de acordo com os termos estabelecidos em Resolução própria.',
    actions: [
      { label: 'Edital', href: '#' },
      { label: 'Manual de Iniciação Científica', href: '#' },
    ],
  },
  {
    title: 'Iniciação à Docência',
    description:
      'O Programa de Bolsas de Iniciação à Docência - PIBID tem como objetivo fomentar a formação docente, promover o desenvolvimento de atividades de pesquisa e de práticas de ensino inovadoras que contribuam para a melhoria do ensino, propiciando uma reflexão sobre a relação teoria-prática no processo de aprendizagem docente e conceder de bolsas de estudos de Iniciação Científica, em face do orçamento estabelecido pela instituição ou da captação de recursos provenientes de parcerias com outras instituições, de acordo com os termos estabelecidos em Resolução própria.',
    actions: [
      { label: 'Edital', href: '#' },
      { label: 'Manual de Iniciação à Docência', href: '#' },
    ],
  },
  {
    title: 'Grupos de Iniciação Científica e à Docência',
    description:
      'Os grupos de iniciação científica e à docência têm a finalidade de assegurar a geração de conhecimento, oferecer um ambiente propício para desenvolver raciocínio científico e, sobretudo, combinar esforços para aprimorar a produção gerada por ele. Sob a liderança de um professor pesquisador com experiência na área, cada grupo tem o objetivo de conduzir a pesquisa e expandir o saber em seu determinado campo de trabalho.',
    actions: [{ label: 'Conheça nossos grupos', href: '#' }],
  },
]

export const iniciacaoPageActions: IniciacaoPageAction[] = [
  { label: 'Voltar', href: '/', variant: 'secondary' },
  {
    label: 'Artigos',
    href: 'https://blog.ijep.com.br/',
    variant: 'primary',
    external: true,
  },
]
