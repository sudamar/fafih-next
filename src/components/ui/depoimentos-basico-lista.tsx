interface Depoimento {
  quote: string
  author: string
  role: string
}

interface DepoimentosBasicoListaProps {
  depoimentos: Depoimento[]
}

export function DepoimentosBasicoLista({ depoimentos }: DepoimentosBasicoListaProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {depoimentos.map((depoimento) => (
        <figure
          key={depoimento.author}
          className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-lg"
        >
          <blockquote className="text-sm italic text-neutral-700">&ldquo;{depoimento.quote}&rdquo;</blockquote>
          <figcaption className="mt-6">
            <h4 className="font-display text-base font-semibold text-primary">{depoimento.author}</h4>
            <span className="text-xs uppercase tracking-wide text-secondary">{depoimento.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
