import type { IniciacaoProgram } from '@/lib/services/iniciacao-cientifica'
import { ProgramCard } from '@/components/domain/iniciacao-cientifica/program-card'

interface ProgramsGridProps {
  programs: IniciacaoProgram[]
}

export function ProgramsGrid({ programs }: ProgramsGridProps) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {programs.map((program) => (
        <ProgramCard key={program.title} program={program} />
      ))}
    </div>
  )
}
