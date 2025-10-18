import data from '@/lib/data/iniciacao-cientifica.json';

export interface IniciacaoProgram {
  title: string;
  description: string;
  actions: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface IniciacaoPageAction {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  external?: boolean;
}

export function getIniciacaoIntro() {
  return data.intro;
}

export function getIniciacaoPrograms(): IniciacaoProgram[] {
  return data.programs;
}

export function getIniciacaoPageActions(): IniciacaoPageAction[] {
  return data.pageActions as IniciacaoPageAction[];
}
