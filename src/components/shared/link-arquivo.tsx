import Link from 'next/link'

type TipoArquivo = 'pdf' | 'doc' | 'xls' | 'txt' | 'md' | 'zip' | 'img' | 'link'

const iconMap: Record<TipoArquivo, string> = {
  pdf: '📄',
  doc: '📝',
  xls: '📊',
  txt: '📃',
  md: '🗒️',
  zip: '🗂️',
  img: '🖼️',
  link: '🔗',
}

function detectarTipo(href: string): TipoArquivo {
  const extension = href.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'pdf':
      return 'pdf'
    case 'doc':
    case 'docx':
    case 'odt':
      return 'doc'
    case 'xls':
    case 'xlsx':
    case 'ods':
      return 'xls'
    case 'txt':
      return 'txt'
    case 'md':
      return 'md'
    case 'zip':
    case 'rar':
    case '7z':
      return 'zip'
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return 'img'
    default:
      return 'link'
  }
}

interface LinkArquivoProps {
  href: string
  titulo: string
  descricao?: string
  tipo?: TipoArquivo
}

export function LinkArquivo({ href, titulo, descricao, tipo }: LinkArquivoProps) {
  const detectedTipo = tipo ?? detectarTipo(href)
  const icon = iconMap[detectedTipo]

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-2xl shadow-sm shadow-neutral-900/10">
          {icon}
        </span>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-primary">{titulo}</h3>
          {descricao && <p className="text-sm leading-relaxed text-neutral-600">{descricao}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary"
        >
          Baixar
        </Link>
      </div>
    </div>
  )
}
