import { ReactNode } from 'react'

interface CardDecoradoProps {
  icon: ReactNode
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
}

export function CardDecorado({ icon, title, description, buttons }: CardDecoradoProps) {
  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          {icon}
        </div>
        <h2 className="font-display text-2xl font-bold text-secondary">{title}</h2>
      </div>
      <p className="mb-6 leading-relaxed text-gray-700">{description}</p>
      <div className="flex flex-wrap gap-3">
        {buttons.map((button) => (
          <a
            key={button.label}
            href={button.href}
            className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary hover:-translate-y-0.5"
          >
            {button.label}
          </a>
        ))}
      </div>
    </div>
  )
}
