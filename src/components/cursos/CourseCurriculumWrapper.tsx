import { supabase } from '@/lib/supabase/client';
import CourseCurriculumClient from './CourseCurriculumClient';

interface CourseCurriculumWrapperProps {
  courseId: string;
}

export default async function CourseCurriculumWrapper({ courseId }: CourseCurriculumWrapperProps) {
  // Buscar curriculum do Supabase
  const { data: curriculum } = await supabase
    .from('curso_curriculum')
    .select('*')
    .eq('curso_id', courseId)
    .order('number');

  if (!curriculum || curriculum.length === 0) {
    return null;
  }

  return <CourseCurriculumClient curriculum={curriculum} />;
}
