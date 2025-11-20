import { NextRequest, NextResponse } from 'next/server'

import {
  getTrabalhoBySlug,
  incrementTrabalhoBaixados,
} from '@/lib/services/biblioteca'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const trabalho = await getTrabalhoBySlug(params.slug)

  if (!trabalho || !trabalho.link || trabalho.link === '#') {
    return NextResponse.redirect(new URL(`/biblioteca/${params.slug}`, request.url))
  }

  try {
    await incrementTrabalhoBaixados(trabalho.id)
  } catch (error) {
    console.error('Não foi possível registrar o download do trabalho:', error)
  }
  return NextResponse.redirect(trabalho.link)
}
