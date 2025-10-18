import { getTrabalhoBySlug, getTrabalhos } from '@/lib/services/biblioteca';
import { getIconMapByCategoria, getColorMapByCategoria } from '@/lib/services/categorias-trabalho';
import { PageTitle } from '@/components/ui/page-title';
import { SectionTitle } from '@/components/ui/section-title';
import { notFound } from 'next/navigation';
import {
  User, Calendar, Star, ExternalLink, ArrowLeft, Download, Eye
} from 'lucide-react';
import Link from 'next/link';

// Carrega mapas de ícones e cores das categorias
const tagIconsMap = getIconMapByCategoria();
const tagHexColors = getColorMapByCategoria();

export async function generateStaticParams() {
  const trabalhos = getTrabalhos();
  return trabalhos.map((trabalho) => ({
    slug: trabalho.slug,
  }));
}

export default function TrabalhoDetalhesPage({ params }: { params: { slug: string } }) {
  const trabalho = getTrabalhoBySlug(params.slug);

  if (!trabalho) {
    notFound();
  }

  const publicationDate = new Date(trabalho.data_publicacao);
  const formattedDate = new Date(
    publicationDate.valueOf() + publicationDate.getTimezoneOffset() * 60 * 1000
  ).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <PageTitle>Visualizar Trabalho</PageTitle>
          <p className="mt-4 text-lg text-neutral-700 max-w-3xl mx-auto">
            Detalhes completos da publicação acadêmica
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Título da Publicação */}
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
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-8">
              <SectionTitle>Resumo</SectionTitle>
              <p className="mt-4 text-neutral-700 leading-relaxed text-lg">
                {trabalho.resumo || 'Resumo não disponível para este trabalho.'}
              </p>
            </div>

            {/* Nota */}
            {trabalho.nota !== undefined ? (
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-6 sticky top-4 space-y-6">
              <h3 className="font-display text-xl font-bold text-primary">
                Acesso ao Trabalho
              </h3>

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
                      href={trabalho.link}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
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
                    <dd className="font-semibold text-neutral-900">{formattedDate}</dd>
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
                    <dd className="font-bold text-lg text-primary">{trabalho.visitantes.toLocaleString('pt-BR')}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-500 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Downloads
                    </dt>
                    <dd className="font-bold text-lg text-primary">{trabalho.baixados.toLocaleString('pt-BR')}</dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h4 className="font-semibold text-neutral-700 mb-3">Categorias</h4>
                <div className="flex flex-wrap gap-2">
                  {trabalho.tags.map(tag => {
                    const hexColor = tagHexColors[tag] || '#9ca3af';
                    const TagIcon = tagIconsMap[tag] || User;
                    return (
                      <span
                        key={tag}
                        className="text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                        style={{ backgroundColor: hexColor }}
                      >
                        <TagIcon className="h-3.5 w-3.5" />
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Voltar no final */}
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
  );
}
