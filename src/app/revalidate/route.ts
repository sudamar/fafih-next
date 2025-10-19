import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

import {
  COURSE_LIST_TAG,
  getAllCourseSlugs,
  revalidateCourseDetail,
  revalidateCourseList,
} from '@/lib/services/courseCatalog'
import { MEMBROS_LIST_TAG } from '@/lib/services/membros-analistas'

export async function GET() {
  try {
    // Revalidar lista de cursos
    await revalidateCourseList()
    const slugs = await getAllCourseSlugs()

    const detailResults: Array<{ slug: string; revalidated: boolean; error?: string }> = []

    // Revalidar detalhes de cada curso
    for (const slug of slugs) {
      try {
        await revalidateCourseDetail(slug)
        detailResults.push({ slug, revalidated: true })
      } catch (detailError) {
        const errorMessage = detailError instanceof Error ? detailError.message : 'Erro desconhecido'
        detailResults.push({ slug, revalidated: false, error: errorMessage })
      }
    }

    // Revalidar membros analistas
    await revalidateTag(MEMBROS_LIST_TAG)

    // Revalidar páginas importantes
    revalidatePath('/')
    revalidatePath('/cursos')
    revalidatePath('/membros-analistas')
    revalidatePath('/biblioteca')
    revalidatePath('/corpo-docente')
    revalidatePath('/calendario-academico')

    return NextResponse.json({
      message: 'Revalidação executada com sucesso',
      revalidated: {
        courses: {
          list: true,
          details: detailResults,
        },
        membrosAnalistas: true,
        paths: [
          '/',
          '/cursos',
          '/membros-analistas',
          '/biblioteca',
          '/corpo-docente',
          '/calendario-academico',
        ],
      },
      tags: [COURSE_LIST_TAG, MEMBROS_LIST_TAG],
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json(
      {
        message: 'Falha na revalidação',
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
