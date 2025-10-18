import professoresData from '@/lib/data/professores.json';
import { ProfessorData } from '@/components/ui/card-professor';

const professores: ProfessorData[] = professoresData as ProfessorData[];

export function getProfessores(): ProfessorData[] {
  return professores;
}
