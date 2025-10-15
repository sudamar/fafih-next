import { PageTitle } from '@/components/ui/page-title'
import { CardProfessor } from '@/components/ui/card-professor'

type Tipo = 'Analista em Formação' | 'Analista Didata' | 'Analista Didata em Formação' | 'Membro Analista'
type Modalidade = 'Online' | 'Presencial'

type MembroAnalista = {
  nome: string
  tipo: Tipo
  modalidade: Modalidade
  atendimento: 'Individual' | 'Grupo' | 'Ambos'
  cidade?: string
  estado?: string
  descricao?: string
  telefone?: string
  email?: string
  foto?: string
}

const membros: MembroAnalista[] = [
  {
    nome: 'Ana Paula Zaidan Maluf',
    tipo: 'Analista em Formação',
    modalidade: 'Presencial',
    atendimento: 'Individual',
    cidade: 'São Paulo',
    estado: 'SP',
    descricao:
      'Psicóloga atuante em psicoterapia individual com enfoque junguiano e processos criativos.',
    telefone: '(11) 94123-0102',
    email: 'anapaulazm@yahoo.com.br',
  },
  {
    nome: 'Ajax Perez Salvador',
    tipo: 'Analista em Formação',
    modalidade: 'Online',
    atendimento: 'Ambos',
    cidade: 'São Paulo',
    estado: 'SP',
    descricao:
      'Psiquiatra e psicoterapeuta analista didata do IJEP. Atendimento individual e supervisão clínica.',
    telefone: '(11) 91365-9560',
    email: 'apersal@uol.com.br',
  },
  {
    nome: 'Ercília Simone Dalvio Magaldi',
    tipo: 'Analista Didata em Formação',
    modalidade: 'Presencial',
    atendimento: 'Grupo',
    cidade: 'São Paulo',
    estado: 'SP',
    descricao: 'Analista junguiana, especialista em psicossomática e processos simbólicos.',
    telefone: '(11) 5535-4695',
    email: 'simonemagaldi@ijep.com.br',
  },
  {
    nome: 'José Luiz Balestrini Junior',
    tipo: 'Analista Didata em Formação',
    modalidade: 'Online',
    atendimento: 'Individual',
    cidade: 'São Paulo',
    estado: 'SP',
    descricao: 'Psicólogo e analista junguiano, atendimento online e supervisão clínica.',
    telefone: '(11) 98207-7766',
    email: 'balestrini@lungfu.com.br',
  },
  {
    nome: 'Ivone Ferreira',
    tipo: 'Membro Analista',
    modalidade: 'Presencial',
    atendimento: 'Individual',
    cidade: 'São Paulo',
    estado: 'SP',
    descricao: 'Atendimento em consultório no Campo Belo com enfoque junguiano.',
    telefone: '(11) 5031-6203',
    email: 'ivone@nucleoivoneferreira.com.br',
  },
]

export default function MembrosAnalistasPage() {
  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <PageTitle>Membros Analistas</PageTitle>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Conheça o corpo de analistas do IJEP, profissionais qualificados,
            especialistas pós-graduados pela FAFIH, dedicados à prática clínica e
            ao contínuo aprofundamento de sua formação em psicologia analítica e suas vertentes.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {membros.map((membro) => (
            <CardProfessor
              key={membro.nome}
              professor={{
                nome: membro.nome,
                titulacao: membro.tipo,
                descricao: `${membro.descricao ?? ''} ${membro.cidade ? `Cidade: ${membro.cidade}` : ''}`.trim(),
                telefone: membro.telefone,
                email: membro.email,
                foto: membro.foto,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
