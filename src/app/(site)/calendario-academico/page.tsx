import { Metadata } from 'next';
import { CalendarioClient } from './calendario-client';

export const metadata: Metadata = {
  title: 'Calendário Acadêmico',
};

export default function CalendarioAcademicoPage() {
  return <CalendarioClient />;
}
