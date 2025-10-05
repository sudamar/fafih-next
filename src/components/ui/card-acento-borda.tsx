import { cn } from '@/lib/utils'

interface CardAcentoBordaProps {
  children: React.ReactNode
  className?: string
}

export function CardAcentoBorda({ children, className }: CardAcentoBordaProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-900/10 bg-white p-7 shadow-lg border-l-4 border-l-secondary',
        className
      )}
    >
      {children}
    </div>
  )
}
