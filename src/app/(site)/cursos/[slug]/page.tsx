import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/services/courses';
import CourseDetailPosGraduacao from '@/components/cursos/CourseDetailPosGraduacao';
import CourseDetailExtensao from '@/components/cursos/CourseDetailExtensao';
import CourseDetailCongressos from '@/components/cursos/CourseDetailCongressos';
export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  console.log('[CourseDetailPage] ====== INÍCIO ======');
  console.log('[CourseDetailPage] Params recebidos:', params);
  console.log('[CourseDetailPage] Slug:', params.slug);

  const course = await getCourseBySlug(params.slug);

  console.log('[CourseDetailPage] Curso retornado:', course ? `${course.title} (${course.slug})` : 'NULL');

  if (!course) {
    console.log('[CourseDetailPage] Curso não encontrado, redirecionando para 404');
    notFound();
  }

  console.log('[CourseDetailPage] Categoria do curso:', course.category);
  console.log('[CourseDetailPage] Tipo da categoria:', typeof course.category);

  if (course.category === 'especializacao') {
    console.log('[CourseDetailPage] ✅ Renderizando CourseDetailPosGraduacao');
    return <CourseDetailPosGraduacao course={course} />;
  }

  if (course.category === 'extensao') {
    console.log('[CourseDetailPage] ✅ Renderizando CourseDetailExtensao (extensao)');
    return <CourseDetailExtensao course={course} />;
  }

  if (course.category === 'formacao') {
    console.log('[CourseDetailPage] ✅ Renderizando CourseDetailExtensao (formacao)');
    return <CourseDetailExtensao course={course} />;
  }

  if (course.category === 'congressos') {
    console.log('[CourseDetailPage] ✅ Renderizando CourseDetailCongressos');
    return <CourseDetailCongressos course={course} />;
  }

  console.log('[CourseDetailPage] ❌ AVISO: Categoria não encontrada!');
  console.log('[CourseDetailPage] Categorias esperadas: especializacao, extensao, formacao, congressos');
  console.log('[CourseDetailPage] Categoria recebida:', JSON.stringify(course.category));
  console.log('[CourseDetailPage] Renderizando com template padrão (PosGraduacao)');
  console.log('[CourseDetailPage] ====== FIM ======');

  // Renderiza curso com categoria "não encontrada"
  const courseWithWarning = {
    ...course,
    categoryLabel: 'Categoria não encontrada'
  };

  return <CourseDetailPosGraduacao course={courseWithWarning} />;
}
