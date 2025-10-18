import data from '@/lib/data/biblioteca.json';

export type Tag = 'masculinidade' | 'feminilidade' | 'religiao' | 'mitologia' | 'sexualidade' | 'paternidade' | 'maternidade' | 'adoecimento' | 'infância' | 'artes' | 'luto' | 'individuação' | 'misticismo' | 'relacionamentos';

export interface Trabalho {
  titulo: string;
  autor: string;
  data_publicacao: string;
  link: string;
  tags: Tag[];
}

export function getTrabalhos(): Trabalho[] {
  return data;
}

export const allTags: Tag[] = [
  'masculinidade', 'feminilidade', 'religiao', 'mitologia', 'sexualidade', 
  'paternidade', 'maternidade', 'adoecimento', 'infância', 'artes', 
  'luto', 'individuação', 'misticismo', 'relacionamentos'
];
