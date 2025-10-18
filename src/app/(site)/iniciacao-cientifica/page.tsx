import Link from 'next/link';
import { BookOpen, Users, FileText } from 'lucide-react';
import { PageTitle } from '@/components/ui/page-title';
import { CardDecorado } from '@/components/ui/card-decorado';
import { 
  getIniciacaoIntro, 
  getIniciacaoPrograms, 
  getIniciacaoPageActions 
} from '@/lib/services/iniciacao-cientifica';

const icons = {
  'Iniciação Científica': <BookOpen className="h-6 w-6" />,
  'Iniciação à Docência': <Users className="h-6 w-6" />,
  'Grupos de Iniciação Científica e à Docência': <FileText className="h-6 w-6" />
};

export default function IniciacaoCientificaPage() {
  const intro = getIniciacaoIntro();
  const programs = getIniciacaoPrograms();
  const pageActions = getIniciacaoPageActions();

  return (
    <main className="bg-background">
      <section className="px-6 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <PageTitle>{intro.title}</PageTitle>

          <p className="mx-auto mb-12 max-w-4xl text-center text-lg leading-relaxed text-gray-600">
            {intro.description}
          </p>

          <div className="mt-12 space-y-8">
            {programs.map(program => (
              <CardDecorado
                key={program.title}
                icon={icons[program.title as keyof typeof icons]}
                title={program.title}
                buttons={program.actions}
              >
                <p>{program.description}</p>
              </CardDecorado>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {pageActions.map(action => {
              if (action.external) {
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border-2 px-10 py-4 text-lg font-semibold transition hover:scale-105 ${action.variant === 'primary' ? 'border-footer-blue bg-footer-blue text-white hover:brightness-110' : 'border-primary bg-transparent text-primary hover:bg-primary hover:text-white'}`}>
                    {action.label}
                  </a>
                )
              }
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`rounded-full border-2 px-10 py-4 text-lg font-semibold transition hover:scale-105 ${action.variant === 'primary' ? 'border-footer-blue bg-footer-blue text-white hover:brightness-110' : 'border-primary bg-transparent text-primary hover:bg-primary hover:text-white'}`}>
                  {action.label}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
