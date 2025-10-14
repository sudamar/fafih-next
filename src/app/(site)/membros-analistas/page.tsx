'use client'

import { useMemo, useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
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

const tiposDisponiveis: Tipo[] = [
  'Analista em Formação',
  'Analista Didata em Formação',
  'Analista Didata',
  'Membro Analista',
]

const modalidadesDisponiveis: Modalidade[] = ['Online', 'Presencial']

export default function MembrosAnalistasPage() {
  const [filtroTipo, setFiltroTipo] = useState<'Todos' | Tipo>('Todos')
  const [filtroModalidade, setFiltroModalidade] = useState<'Todas' | Modalidade>('Todas')

  const membrosFiltrados = useMemo(() => {
    return membros.filter((membro) => {
      const matchTipo = filtroTipo === 'Todos' || membro.tipo === filtroTipo
      const matchModalidade = filtroModalidade === 'Todas' || membro.modalidade === filtroModalidade
      return matchTipo && matchModalidade
    })
  }, [filtroTipo, filtroModalidade])

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <PageTitle>Membros Analistas</PageTitle>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Conheça os profissionais vinculados ao IJEP disponíveis para psicoterapia, orientação profissional e
            supervisão clínica. Utilize os filtros para localizar o membro ideal.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap gap-3 rounded-3xl bg-white px-6 py-6 shadow-lg shadow-neutral-900/5">
          <div className="flex min-w-[220px] flex-1 flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Categoria</label>
            <select
              value={filtroTipo}
              onChange={(event) => setFiltroTipo(event.target.value as typeof filtroTipo)}
              className="rounded-xl border border-primary/20 bg-white px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none"
            >
              <option value="Todos">Todos</option>
              {tiposDisponiveis.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-w-[220px] flex-1 flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Modalidade</label>
            <select
              value={filtroModalidade}
              onChange={(event) => setFiltroModalidade(event.target.value as typeof filtroModalidade)}
              className="rounded-xl border border-primary/20 bg-white px-4 py-2 text-sm text-neutral-700 focus:border-primary focus:outline-none"
            >
              <option value="Todas">Todas</option>
              {modalidadesDisponiveis.map((modalidade) => (
                <option key={modalidade} value={modalidade}>
                  {modalidade}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {membrosFiltrados.map((membro) => (
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

        {membrosFiltrados.length === 0 && (
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white px-6 py-10 text-center shadow-lg shadow-neutral-900/5">
            <SectionTitle className="text-primary">Nenhum membro encontrado</SectionTitle>
            <p className="text-sm leading-relaxed text-neutral-600">
              Ajuste os filtros para visualizar outros profissionais ou entre em contato com a secretaria para receber
              orientação personalizada.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
