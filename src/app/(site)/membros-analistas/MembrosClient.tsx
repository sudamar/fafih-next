'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CardProfessor } from '@/components/ui/card-professor'
import { PageTitle } from '@/components/ui/page-title'
import type { MembroAnalista } from '@/lib/services/membros-analistas'

const MembrosAnalistasContent = ({ membros }: { membros: MembroAnalista[] }) => {
  const searchParams = useSearchParams()
  const tipoParam = searchParams.get('tipo')

  const [activeTipoFilter, setActiveTipoFilter] = useState(tipoParam || 'all')

  useEffect(() => {
    if (tipoParam) setActiveTipoFilter(tipoParam)
  }, [tipoParam])

  const tipoOptions = useMemo(() => {
    const tipos = membros.reduce((acc, membro) => {
      acc[membro.tipo] = (acc[membro.tipo] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return [
      { id: 'all', label: 'Todos', count: membros.length },
      ...Object.entries(tipos).map(([tipo, count]) => ({
        id: tipo,
        label: tipo,
        count
      }))
    ]
  }, [membros])

  const filteredMembros = useMemo(() => {
    return activeTipoFilter === 'all'
      ? membros
      : membros.filter(membro => membro.tipo === activeTipoFilter)
  }, [activeTipoFilter, membros])

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

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 mt-12">
          {tipoOptions.map(option => (
            <button
              key={option.id}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
                activeTipoFilter === option.id
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
              onClick={() => setActiveTipoFilter(option.id)}
            >
              {option.label}
              <span className="ml-1.5 sm:ml-2 bg-gray-100 text-gray-700 rounded-full px-1.5 sm:px-2 text-xs">
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Lista de Membros */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
          {filteredMembros.map((membro) => (
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

        {/* Mensagem quando não há resultados */}
        {filteredMembros.length === 0 && (
          <div className="mx-auto mt-8 max-w-5xl text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-2xl font-semibold text-gray-700">Nenhum membro encontrado</p>
            <p className="text-gray-500 mt-2">Tente ajustar seus filtros.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default function MembrosClient({ membros }: { membros: MembroAnalista[] }) {
  return (
    <Suspense
      fallback={(
        <main className="bg-background">
          <section className="px-6 py-16 md:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center text-gray-600">
              Carregando membros analistas...
            </div>
          </section>
        </main>
      )}
    >
      <MembrosAnalistasContent membros={membros} />
    </Suspense>
  )
}
