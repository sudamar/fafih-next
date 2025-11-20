import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Download, Eye, ExternalLink, Star } from 'lucide-react'

import { PageTitle } from '@/components/ui/page-title'
import { SectionTitle } from '@/components/ui/section-title'
import { getTrabalhoBySlug, incrementTrabalhoVisitantes } from '@/lib/services/biblioteca'
import { resolveCategoriaIcon } from '@/lib/services/categorias-trabalho'

export const dynamic = 'force-dynamic'

const formatDate = (value: string) => {
  const date = new Date(value)
  const adjusted = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000)
  return adjusted.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function TrabalhoDetalhesPage({ params }: { params: { slug: string } }) {
  let trabalho: Awaited<ReturnType<typeof getTrabalhoBySlug>>
  try {
    trabalho = await getTrabalhoBySlug(params.slug)
  } catch (error) {
    console.error('Não foi possível carregar o trabalho:', error)
    notFound()
  }

  if (!trabalho) {
    notFound()
  }

  try {
    await incrementTrabalhoVisitantes(trabalho.id)
  } catch (error) {
    console.error('Não foi possível registrar a visualização do trabalho:', error)
  }
  const visitantesAtualizados = trabalho.visitantes + 1
  const dataPublicacaoFormatada = formatDate(trabalho.data_publicacao)

  return (
    <main className="bg-background">
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <PageTitle>Visualizar Trabalho</PageTitle>
          <p className="mt-4 text-lg text-neutral-700 max-w-3xl mx-auto">
            Detalhes completos da publicação acadêmica
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-8">
              <SectionTitle>Título da Publicação</SectionTitle>
              <h2 className="mt-4 font-display text-2xl font-bold text-primary leading-snug">
                {trabalho.titulo}
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-neutral-700">
                <p className="text-base font-semibold">Por: {trabalho.autor}</p>
                <span className="text-neutral-400">•</span>
                <p className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  {dataPublicacaoFormatada}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-8">
              <SectionTitle>Resumo</SectionTitle>
              <p className="mt-4 text-neutral-700 leading-relaxed text-lg">
                {trabalho.resumo || 'Resumo não disponível para este trabalho.'}
              </p>
            </div>

            {trabalho.nota !== null ? (
              <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-8">
                <SectionTitle>Avaliação</SectionTitle>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                    <span className="text-4xl font-bold text-primary">{trabalho.nota.toFixed(1)}</span>
                    <span className="text-xl text-neutral-500">/10</span>
                  </div>
                </div>
                <p className="mt-4 text-neutral-600">
                  Avaliação do trabalho acadêmico pela banca examinadora.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-8">
                <SectionTitle>Avaliação</SectionTitle>
                <p className="mt-4 text-neutral-600">
                  Este trabalho ainda não possui nota de avaliação disponível.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-6 sticky top-4 space-y-6">
              <h3 className="font-display text-xl font-bold text-primary">Acesso ao Trabalho</h3>

              <div className="space-y-3">
                {trabalho.link && trabalho.link !== '#' ? (
                  <>
                    <a
                      href={trabalho.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-secondary px-6 py-4 rounded-xl font-bold text-white transition hover:bg-primary"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Visualizar Trabalho
                    </a>
                    <a
                      href={`/biblioteca/${trabalho.slug}/download`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary px-6 py-4 rounded-xl font-bold text-white transition hover:bg-secondary"
                    >
                      <Download className="h-5 w-5" />
                      Download
                    </a>
                  </>
                ) : (
                  <div className="bg-neutral-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-neutral-600">
                      Link para o trabalho completo não disponível.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h4 className="font-semibold text-neutral-700 mb-3">Informações</h4>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-neutral-500">Autor(a)</dt>
                    <dd className="font-semibold text-neutral-900">{trabalho.autor}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500">Data de Publicação</dt>
                    <dd className="font-semibold text-neutral-900">{dataPublicacaoFormatada}</dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h4 className="font-semibold text-neutral-700 mb-3">Estatísticas</h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-500 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Visitantes
                    </dt>
                    <dd className="font-bold text-lg text-primary">
                      {visitantesAtualizados.toLocaleString('pt-BR')}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-500 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Downloads
                    </dt>
                    <dd className="font-bold text-lg text-primary">
                      {trabalho.baixados.toLocaleString('pt-BR')}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h4 className="font-semibold text-neutral-700 mb-3">Categorias</h4>
                <div className="flex flex-wrap gap-2">
                  {trabalho.categoriasDetalhes.length > 0 ? (
                    trabalho.categoriasDetalhes.map((categoria) => {
                      const Icon = resolveCategoriaIcon(categoria.icone)
                      const color = categoria.cor || '#9ca3af'
                      return (
                        <span
                          key={categoria.nome}
                          className="text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                          style={{ backgroundColor: color }}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {categoria.nome}
                        </span>
                      )
                    })
                  ) : (
                    <span className="text-sm text-neutral-500">
                      Nenhuma categoria associada a este trabalho.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition font-semibold text-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para Biblioteca
          </Link>
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  return []
}
