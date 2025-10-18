'use client'

import { useState, useMemo } from 'react';
import { getTrabalhos, allTags, Trabalho, Tag } from '@/lib/services/biblioteca';
import { getIconMapByCategoria, getColorMapByCategoria } from '@/lib/services/categorias-trabalho';
import { PageTitle } from '@/components/ui/page-title';
import { SectionTitle } from '@/components/ui/section-title';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, BookOpen, User, Eye, ChevronDown, ChevronUp } from 'lucide-react';

// Carrega mapas de ícones e cores das categorias
const tagIcons = getIconMapByCategoria();
const tagHexColors = getColorMapByCategoria();

function TrabalhoCard({ trabalho }: { trabalho: Trabalho }) {
  const publicationDate = new Date(trabalho.data_publicacao);
  const formattedDate = new Date(publicationDate.valueOf() + publicationDate.getTimezoneOffset() * 60 * 1000).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
      <div className="p-6 flex-1">
        <h3 className="font-display text-lg font-bold text-primary leading-snug mb-4 min-h-[3.5rem]">
          {trabalho.titulo}
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-neutral-700 font-semibold">
            {trabalho.autor}
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {trabalho.tags.map(tag => {
            const hexColor = tagHexColors[tag] || '#9ca3af';
            const TagIcon = tagIcons[tag] || User;
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

      <div className="p-6 pt-0">
        <a
          href={`/biblioteca/${trabalho.slug}`}
          className="block w-full py-3 rounded-lg font-bold text-sm text-white text-center no-underline bg-gradient-to-r from-[#6A0DAD] to-[#2C678F] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
        >
          Saiba Mais
        </a>
      </div>
    </article>
  );
}

const dateRanges = {
  all: 'Todos os períodos',
  '3m': 'Últimos 3 meses',
  '6m': 'Últimos 6 meses',
  '1y': 'Último ano',
  '2y': 'Últimos 2 anos',
};

export default function BibliotecaPage() {
  const [trabalhos] = useState<Trabalho[]>(getTrabalhos());
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [sortByMostVisited, setSortByMostVisited] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Calcula quantas vezes cada tag aparece
  const tagCounts = useMemo(() => {
    const counts: Record<Tag, number> = {} as Record<Tag, number>;
    trabalhos.forEach(t => {
      t.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [trabalhos]);

  // Ordena tags por quantidade de uso
  const sortedTags = useMemo(() => {
    return allTags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
  }, [tagCounts]);

  // Top 5 categorias mais usadas
  const topCategories = useMemo(() => sortedTags.slice(0, 5), [sortedTags]);
  const remainingCategories = useMemo(() => sortedTags.slice(5), [sortedTags]);

  const filteredTrabalhos = useMemo(() => {
    let filtered = trabalhos;

    if (searchText) {
      filtered = filtered.filter(t =>
        t.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
        t.autor.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(t => t.tags.includes(selectedTag));
    }

    if (selectedDateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();

      if (selectedDateRange === '3m') startDate.setMonth(now.getMonth() - 3);
      if (selectedDateRange === '6m') startDate.setMonth(now.getMonth() - 6);
      if (selectedDateRange === '1y') startDate.setFullYear(now.getFullYear() - 1);
      if (selectedDateRange === '2y') startDate.setFullYear(now.getFullYear() - 2);

      filtered = filtered.filter(t => new Date(t.data_publicacao) >= startDate);
    }

    if (sortByMostVisited) {
      filtered = [...filtered].sort((a, b) => b.visitantes - a.visitantes);
    }

    return filtered;
  }, [trabalhos, searchText, selectedTag, selectedDateRange, sortByMostVisited]);

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <PageTitle>Biblioteca de Produções Acadêmicas</PageTitle>
          <p className="mt-4 text-lg text-neutral-700 max-w-3xl mx-auto">
            Explore trabalhos científicos, artigos e pesquisas produzidos por nossa comunidade acadêmica nas áreas de Psicologia Analítica, Arteterapia e Humanidades
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Contador de resultados */}
        <div className="mb-6">
          <p className="text-sm text-neutral-600">
            <span className="font-bold text-primary text-lg">{filteredTrabalhos.length}</span> {filteredTrabalhos.length === 1 ? 'trabalho encontrado' : 'trabalhos encontrados'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Filtros */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-6 sticky top-4 mb-12">
              <h3 className="font-display text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Filtros
              </h3>

              <div className="space-y-6">
                {/* Busca por texto */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Buscar
                  </label>
                  <Input
                    type="text"
                    placeholder="Título ou autor..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Filtro por período */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Período
                  </label>
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary transition"
                  >
                    {Object.entries(dateRanges).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                {/* Ordenação por mais vistos */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Ordenação
                  </label>
                  <button
                    onClick={() => setSortByMostVisited(!sortByMostVisited)}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition border ${
                      sortByMostVisited
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                    Mais Vistos
                  </button>
                </div>

                {/* Filtro por categorias */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Categorias
                  </label>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => setSelectedTag(null)}
                      variant={!selectedTag ? 'default' : 'outline'}
                      size="sm"
                      className="justify-start"
                    >
                      Todas
                    </Button>
                    {topCategories.map((tag) => {
                      const Icon = tagIcons[tag];
                      const hexColor = tagHexColors[tag] || '#9ca3af';
                      const isSelected = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(isSelected ? null : tag)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition border-l-4 ${
                            isSelected
                              ? 'bg-neutral-100 text-neutral-900'
                              : 'border-transparent bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                          style={isSelected ? { borderLeftColor: hexColor } : {}}
                        >
                          <Icon className="h-4 w-4" />
                          {tag}
                        </button>
                      );
                    })}
                    {showAllCategories && remainingCategories.map((tag) => {
                      const Icon = tagIcons[tag];
                      const hexColor = tagHexColors[tag] || '#9ca3af';
                      const isSelected = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(isSelected ? null : tag)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition border-l-4 ${
                            isSelected
                              ? 'bg-neutral-100 text-neutral-900'
                              : 'border-transparent bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                          style={isSelected ? { borderLeftColor: hexColor } : {}}
                        >
                          <Icon className="h-4 w-4" />
                          {tag}
                        </button>
                      );
                    })}
                    {remainingCategories.length > 0 && (
                      <button
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-neutral-50 transition"
                      >
                        {showAllCategories ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            Ver Menos
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Ver Todas
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Área de conteúdo */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <SectionTitle>Trabalhos Publicados</SectionTitle>
            </div>

            {filteredTrabalhos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTrabalhos.map(trabalho => (
                  <TrabalhoCard key={trabalho.titulo} trabalho={trabalho} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-12 text-center">
                <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600 font-medium">
                  Nenhum trabalho encontrado com os filtros selecionados.
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  Tente ajustar os filtros ou limpar a busca.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
