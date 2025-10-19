import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

import {
  COURSE_LIST_TAG,
  getAllCourseSlugs,
  revalidateCourseDetail,
  revalidateCourseList,
} from '@/lib/services/courseCatalog'

export async function GET() {
  try {
    await revalidateCourseList()
    const slugs = await getAllCourseSlugs()

    const detailResults: Array<{ slug: string; revalidated: boolean; error?: string }> = []

    for (const slug of slugs) {
      try {
        await revalidateCourseDetail(slug)
        detailResults.push({ slug, revalidated: true })
      } catch (detailError) {
        const errorMessage = detailError instanceof Error ? detailError.message : 'Erro desconhecido'
        detailResults.push({ slug, revalidated: false, error: errorMessage })
      }
    }

    revalidatePath('/cursos')

    return NextResponse.json({
      message: 'Revalidação executada',
      tags: [COURSE_LIST_TAG],
      details: detailResults,
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
