import Link from 'next/link'
import type { IniciacaoProgram } from '@/lib/data/iniciacao-cientifica'
import type { Route } from 'next'

interface ProgramCardProps {
  program: IniciacaoProgram
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-2xl bg-card-bg p-8 shadow-lg">
      <div>
        <h2 className="font-display text-2xl font-semibold text-secondary">{program.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">{program.description}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-3">
        {program.actions.map((action) => {
          const className =
            'inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

          if (action.href.startsWith('http') || action.external) {
            return (
              <a
                key={action.label}
                href={action.href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {action.label}
              </a>
            )
          }

          if (action.href.startsWith('#')) {
            return (
              <a key={action.label} href={action.href} className={className}>
                {action.label}
              </a>
            )
          }

          return (
            <Link key={action.label} href={action.href as Route} className={className}>
              {action.label}
            </Link>
          )
        })}
      </div>
    </article>
  )
}
