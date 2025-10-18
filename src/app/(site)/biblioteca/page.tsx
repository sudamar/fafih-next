'use client'

import { useState, useMemo } from 'react';
import { getTrabalhos, allTags, Trabalho, Tag } from '@/lib/services/biblioteca';
import { PageTitle } from '@/components/ui/page-title';
import { SectionTitle } from '@/components/ui/section-title';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User, Users, Church, BookOpen, Heart, HeartPulse, Baby, Paintbrush,
  CloudDrizzle, CircleUser, Sparkles, LucideIcon, Search, Calendar
} from 'lucide-react';

const tagIcons: Record<Tag, LucideIcon> = {
  masculinidade: User,
  feminilidade: User,
  religiao: Church,
  mitologia: BookOpen,
  sexualidade: Heart,
  paternidade: Users,
  maternidade: Users,
  adoecimento: HeartPulse,
  infância: Baby,
  artes: Paintbrush,
  luto: CloudDrizzle,
  individuação: CircleUser,
  misticismo: Sparkles,
  relacionamentos: Users,
};

const tagColors: Record<Tag, string> = {
  masculinidade: 'bg-blue-500',
  feminilidade: 'bg-pink-500',
  religiao: 'bg-purple-500',
  mitologia: 'bg-yellow-500',
  sexualidade: 'bg-red-500',
  paternidade: 'bg-blue-700',
  maternidade: 'bg-pink-700',
  adoecimento: 'bg-red-700',
  infância: 'bg-green-500',
  artes: 'bg-orange-500',
  luto: 'bg-gray-500',
  individuação: 'bg-indigo-500',
  misticismo: 'bg-teal-500',
  relacionamentos: 'bg-cyan-500',
};

function TrabalhoCard({ trabalho }: { trabalho: Trabalho }) {
  const publicationDate = new Date(trabalho.data_publicacao);
  const formattedDate = new Date(publicationDate.valueOf() + publicationDate.getTimezoneOffset() * 60 * 1000).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const primaryTag = trabalho.tags[0];
  const Icon = tagIcons[primaryTag];
  const accentColor = tagColors[primaryTag] || 'bg-neutral-400';

  return (
    <article className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
      <div className="p-6 flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className={`${accentColor} p-3 rounded-xl`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-primary leading-snug min-h-[3.5rem]">
              {trabalho.titulo}
            </h3>
          </div>
        </div>

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
          {trabalho.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <a
        href={trabalho.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-secondary px-6 py-4 font-bold text-white text-center transition hover:bg-primary"
      >
        Visualizar Trabalho
      </a>
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

    return filtered;
  }, [trabalhos, searchText, selectedTag, selectedDateRange]);

  return (
    <main className="bg-background">
      <PageTitle
        title="Biblioteca de Produções Acadêmicas"
        subtitle="Explore trabalhos científicos, artigos e pesquisas produzidos por nossa comunidade acadêmica"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Filtros */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg shadow-neutral-900/5 p-6 sticky top-4">
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
                    {allTags.map((tag) => {
                      const Icon = tagIcons[tag];
                      return (
                        <Button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          variant={selectedTag === tag ? 'default' : 'outline'}
                          size="sm"
                          className="justify-start"
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {tag}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Área de conteúdo */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <SectionTitle title="Trabalhos Publicados" />
              <p className="text-sm text-neutral-600">
                <span className="font-bold text-primary">{filteredTrabalhos.length}</span> {filteredTrabalhos.length === 1 ? 'trabalho encontrado' : 'trabalhos encontrados'}
              </p>
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
