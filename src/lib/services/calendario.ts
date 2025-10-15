
import eventosData from '@/lib/data/eventos.json';

export interface Evento {
  titulo_evento: string;
  descricao_evento: string;
  tipo_evento: 'vestibular' | 'inicio_letivo' | 'ferias' | 'avaliacoes' | 'palestras';
  data_evento: string;
  local_evento: string;
  hora_evento: string;
  observacao_evento: string;
}

const eventos: Evento[] = eventosData as Evento[];

export function getEventos(): Evento[] {
  return eventos;
}
