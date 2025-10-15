'use client'

import { useState, useMemo } from 'react';
import { getEventos, Evento } from '@/lib/services/calendario';
import { PageTitle } from '@/components/ui/page-title';
import {
  FileText,
  School,
  Plane,
  ClipboardCheck,
  Presentation,
  Calendar as CalendarIcon,
  MapPin, 
  Clock,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<Evento['tipo_evento'], LucideIcon> = {
  vestibular: FileText,
  inicio_letivo: School,
  ferias: Plane,
  avaliacoes: ClipboardCheck,
  palestras: Presentation,
};

const filterOptions = [
  { id: 'todos', label: 'Todos' },
  { id: 'vestibular', label: 'Vestibular' },
  { id: 'inicio_letivo', label: 'Início Letivo' },
  { id: 'ferias', label: 'Férias' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'palestras', label: 'Palestras' },
] as const;

const meses = [
  { value: 1, label: 'Janeiro' }, { value: 2, label: 'Fevereiro' }, { value: 3, label: 'Março' }, 
  { value: 4, label: 'Abril' }, { value: 5, label: 'Maio' }, { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' }, { value: 8, label: 'Agosto' }, { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' }, { value: 11, label: 'Novembro' }, { value: 12, label: 'Dezembro' },
];

function EventoCard({ evento }: { evento: Evento }) {
  const Icone = iconMap[evento.tipo_evento] || CalendarIcon;
  const eventDate = new Date(evento.data_evento);
  const adjustedDate = new Date(eventDate.valueOf() + eventDate.getTimezoneOffset() * 60 * 1000);

  const formattedDate = adjustedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-card-bg rounded-3xl shadow-card p-6 flex flex-col gap-4 transition hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="bg-secondary-light p-3 rounded-full">
          <Icone className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-primary">{evento.titulo_evento}</h3>
      </div>
      <p className="text-neutral-700">{evento.descricao_evento}</p>
      <div className="border-t border-secondary-light pt-4 mt-auto flex flex-col gap-3 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-secondary" />
          <span>{formattedDate}</span>
        </div>
        {evento.local_evento && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" />
            <span>{evento.local_evento}</span>
          </div>
        )}
        {evento.hora_evento && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span>{evento.hora_evento}</span>
          </div>
        )}
      </div>
      {evento.observacao_evento && (
        <p className="text-xs text-neutral-500 mt-2"><em>Obs: {evento.observacao_evento}</em></p>
      )}
    </div>
  );
}

export function CalendarioClient() {
  const [eventos] = useState<Evento[]>(getEventos());
  const [activeFilter, setActiveFilter] = useState<typeof filterOptions[number]['id']>('todos');
  const [startDate, setStartDate] = useState<{ month?: number, year?: number }>({});
  const [endDate, setEndDate] = useState<{ month?: number, year?: number }>({});

  const availableYears = useMemo(() => {
    const years = new Set(eventos.map(e => new Date(e.data_evento).getFullYear()));
    return Array.from(years).sort();
  }, [eventos]);

  const filteredEventos = eventos
    .filter(evento => {
      if (activeFilter === 'todos') return true;
      return evento.tipo_evento === activeFilter;
    })
    .filter(evento => {
      const eventDate = new Date(evento.data_evento);
      if (startDate.year && startDate.month) {
        const startFilterDate = new Date(startDate.year, startDate.month - 1, 1);
        if (eventDate < startFilterDate) return false;
      }
      if (endDate.year && endDate.month) {
        const endFilterDate = new Date(endDate.year, endDate.month - 1, 1);
        // Move to the end of the month
        endFilterDate.setMonth(endFilterDate.getMonth() + 1);
        endFilterDate.setDate(endFilterDate.getDate() - 1);
        if (eventDate > endFilterDate) return false;
      }
      return true;
    });

  return (
    <main>
      <section className="px-6 py-16 md:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <PageTitle>Calendário Acadêmico</PageTitle>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          Humanidades, arte, filosofia e imaginário humano caminhando juntos para formar profissionais que transformam o mundo com ética, criatividade e sensibilidade.
        </p>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {filterOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-full px-6 py-3 font-bold text-sm transition-all ${
                activeFilter === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-secondary hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-8 p-4 bg-gray-100 rounded-lg flex flex-wrap justify-center items-center gap-4">
            <span className="font-semibold">Filtrar por data:</span>
            <div className="flex items-center gap-2">
                <select onChange={(e) => setStartDate(prev => ({ ...prev, month: parseInt(e.target.value) }))} className="p-2 border rounded">
                    <option value="">Mês Início</option>
                    {meses.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select onChange={(e) => setStartDate(prev => ({ ...prev, year: parseInt(e.target.value) }))} className="p-2 border rounded">
                    <option value="">Ano Início</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            <span className="font-semibold">até</span>
            <div className="flex items-center gap-2">
                <select onChange={(e) => setEndDate(prev => ({ ...prev, month: parseInt(e.target.value) }))} className="p-2 border rounded">
                    <option value="">Mês Fim</option>
                    {meses.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select onChange={(e) => setEndDate(prev => ({ ...prev, year: parseInt(e.target.value) }))} className="p-2 border rounded">
                    <option value="">Ano Fim</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEventos.map((evento) => (
            <EventoCard key={evento.titulo_evento} evento={evento} />
          ))}
        </div>
      </div>
      </section>
    </main>
  );
}
