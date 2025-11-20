import { supabase } from '@/lib/supabase/client'

import CourseCurriculumClient, {
  CurriculumItem,
} from './CourseCurriculumClient'

interface CourseCurriculumWrapperProps {
  courseId: string
}

export default async function CourseCurriculumWrapper({ courseId }: CourseCurriculumWrapperProps) {
  const { data, error } = await supabase
    .from('curso_curriculum')
    .select('*')
    .eq('curso_id', courseId)
    .order('number', { ascending: true })

  if (error) {
    console.error('Erro ao carregar currículo do curso:', error)
    return null
  }

  if (!data || data.length === 0) {
    return null
  }

  const curriculum: CurriculumItem[] = data.map((item) => ({
    number: item.number,
    title: item.title,
    hours: item.hours ?? null,
    ementa: item.ementa ?? null,
    objetivos: item.objetivos ?? null,
    bibliography: Array.isArray(item.bibliography)
      ? item.bibliography.filter((entry): entry is string => typeof entry === 'string')
      : [],
  }))

  return <CourseCurriculumClient curriculum={curriculum} />
}
