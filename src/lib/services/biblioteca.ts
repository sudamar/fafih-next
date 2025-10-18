import data from '@/lib/data/trabalhos.json';

export type Tag = string;

export interface Trabalho {
  titulo: string;
  autor: string;
  data_publicacao: string;
  link: string;
  tags: Tag[];
  resumo?: string;
  nota?: number;
  slug: string;
  visitantes: number;
  baixados: number;
}

export function getTrabalhos(): Trabalho[] {
  return data as Trabalho[];
}

export function getTrabalhoBySlug(slug: string): Trabalho | undefined {
  return data.find(trabalho => trabalho.slug === slug) as Trabalho | undefined;
}

// Extrai todas as tags únicas dos trabalhos e ordena alfabeticamente
export function getAllTags(): Tag[] {
  const tagsSet = new Set<Tag>();

  data.forEach((trabalho) => {
    trabalho.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
}

export const allTags: Tag[] = getAllTags();
