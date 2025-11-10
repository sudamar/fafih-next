import { NextResponse } from 'next/server'
import { saveOuvidoriaManifestacao, type IdentificacaoTipo } from '@/lib/services/ouvidoriaService'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      identificacao,
      nome,
      email,
      telefone,
      vinculo,
      tipoManifestacao,
      assunto,
      mensagem,
    } = body ?? {}

    if (!identificacao || !['identificado', 'anonimo'].includes(identificacao)) {
      return NextResponse.json({ error: 'Tipo de identificação inválido.' }, { status: 400 })
    }

    if (!tipoManifestacao || !assunto || !mensagem) {
      return NextResponse.json({ error: 'Tipo de manifestação, assunto e mensagem são obrigatórios.' }, { status: 400 })
    }

    const record = await saveOuvidoriaManifestacao({
      identificacao: identificacao as IdentificacaoTipo,
      nome,
      email,
      telefone,
      vinculo,
      tipoManifestacao,
      assunto,
      mensagem,
    })

    return NextResponse.json(
      {
        success: true,
        protocolo: record.id,
        created_at: record.created_at,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[API][Ouvidoria] Erro ao processar manifestação:', error)
    const message = error instanceof Error ? error.message : 'Erro interno ao registrar manifestação.'
    const status = message.startsWith('Não foi possível') ? 502 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
