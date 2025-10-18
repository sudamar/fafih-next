import categoriasData from '@/lib/data/categoria-trabalhos.json';
import {
  User, Church, BookOpen, Heart, HeartPulse, Baby, Paintbrush,
  CloudDrizzle, PersonStanding, Sparkles, LucideIcon,
  Sun, Moon, Link2
} from 'lucide-react';

export interface CategoriaTrabalho {
  nome: string;
  icone: string;
  cor: string;
}

// Mapeamento de nomes de ícones para componentes Lucide
const iconMap: Record<string, LucideIcon> = {
  User,
  Church,
  BookOpen,
  Heart,
  HeartPulse,
  Baby,
  Paintbrush,
  CloudDrizzle,
  PersonStanding,
  Sparkles,
  Link2,
  Sun,
  Moon,
};

export function getCategorias(): CategoriaTrabalho[] {
  return categoriasData as CategoriaTrabalho[];
}

export function getCategoriaByNome(nome: string): CategoriaTrabalho | undefined {
  return categoriasData.find(cat => cat.nome === nome) as CategoriaTrabalho | undefined;
}

export function getIconeCategoria(nomeIcone: string): LucideIcon {
  return iconMap[nomeIcone] || User;
}

export function getCorCategoria(nomeCategoria: string): string {
  const categoria = getCategoriaByNome(nomeCategoria);
  return categoria?.cor || '#9ca3af';
}

// Retorna mapa de ícones por nome de categoria
export function getIconMapByCategoria(): Record<string, LucideIcon> {
  const map: Record<string, LucideIcon> = {};
  categoriasData.forEach(cat => {
    map[cat.nome] = getIconeCategoria(cat.icone);
  });
  return map;
}

// Retorna mapa de cores por nome de categoria
export function getColorMapByCategoria(): Record<string, string> {
  const map: Record<string, string> = {};
  categoriasData.forEach(cat => {
    map[cat.nome] = cat.cor;
  });
  return map;
}
