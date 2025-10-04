import type { ReactNode } from 'react'

interface PageHeadingProps {
  title: string
  subtitle?: ReactNode
}

export function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <header className="space-y-2 text-center">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle ? <p className="text-sm text-neutral-500">{subtitle}</p> : null}
    </header>
  )
}
