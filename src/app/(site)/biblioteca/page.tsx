import BibliotecaClient from './BibliotecaClient'

import type { Trabalho } from '@/lib/services/biblioteca'
import { listTrabalhos } from '@/lib/services/biblioteca'

export const dynamic = 'force-dynamic'

type TagMetadataMap = Record<string, { color?: string | null; icon?: string | null }>

const buildTagMetadata = (trabalhos: Trabalho[]): TagMetadataMap => {
  const metadata: TagMetadataMap = {}

  trabalhos.forEach((trabalho) => {
    trabalho.categoriasDetalhes.forEach((categoria) => {
      if (!metadata[categoria.nome]) {
        metadata[categoria.nome] = {
          color: categoria.cor ?? undefined,
          icon: categoria.icone ?? undefined,
        }
      }
    })
  })

  return metadata
}

export default async function BibliotecaPage() {
  try {
    const trabalhos = await listTrabalhos()
    const tagMetadata = buildTagMetadata(trabalhos)
    const initialTags = Object.keys(tagMetadata).sort((a, b) => a.localeCompare(b))

    return (
      <BibliotecaClient
        initialTrabalhos={trabalhos}
        initialTags={initialTags}
        tagMetadata={tagMetadata}
      />
    )
  } catch (error) {
    console.error('Não foi possível carregar a biblioteca:', error)
    return (
      <BibliotecaClient
        initialTrabalhos={[]}
        initialTags={[]}
        tagMetadata={{}}
      />
    )
  }
}
