import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/services/courses';
import { imprimeLogs } from '@/lib/config/startup';
import CourseDetailPosGraduacao from '@/components/cursos/CourseDetailPosGraduacao';
import CourseDetailExtensao from '@/components/cursos/CourseDetailExtensao';
import CourseDetailCongressos from '@/components/cursos/CourseDetailCongressos';
export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  imprimeLogs('[CourseDetailPage] ====== INÍCIO ======');
  imprimeLogs('[CourseDetailPage] Params recebidos:', params);
  imprimeLogs('[CourseDetailPage] Slug:', params.slug);

  const course = await getCourseBySlug(params.slug);

  imprimeLogs('[CourseDetailPage] Curso retornado:', course ? `${course.title} (${course.slug})` : 'NULL');

  if (!course) {
    imprimeLogs('[CourseDetailPage] Curso não encontrado, redirecionando para 404');
    notFound();
  }

  imprimeLogs('[CourseDetailPage] Categoria do curso:', course.category);
  imprimeLogs('[CourseDetailPage] Tipo da categoria:', typeof course.category);

  switch (course.category) {
    case 'especializacao':
      imprimeLogs('[CourseDetailPage] ✅ Renderizando CourseDetailPosGraduacao');
      return <CourseDetailPosGraduacao course={course} />;

    case 'extensao':
      imprimeLogs('[CourseDetailPage] ✅ Renderizando CourseDetailExtensao (extensao)');
      return <CourseDetailExtensao course={course} />;

    case 'formacao':
      imprimeLogs('[CourseDetailPage] ✅ Renderizando CourseDetailExtensao (formacao)');
      return <CourseDetailExtensao course={course} />;

    case 'congressos':
      imprimeLogs('[CourseDetailPage] ✅ Renderizando CourseDetailCongressos');
      return <CourseDetailCongressos course={course} />;

    case 'graduacao':
      imprimeLogs('[CourseDetailPage] ✅ Renderizando CourseDetailPosGraduacao (graduacao)');
      return <CourseDetailPosGraduacao course={course} />;

    default:
      imprimeLogs('[CourseDetailPage] ❌ AVISO: Categoria não encontrada!');
      imprimeLogs('[CourseDetailPage] Categorias esperadas: especializacao, extensao, formacao, congressos, graduacao');
      imprimeLogs('[CourseDetailPage] Categoria recebida:', JSON.stringify(course.category));
      imprimeLogs('[CourseDetailPage] Renderizando com template padrão (PosGraduacao)');
      imprimeLogs('[CourseDetailPage] ====== FIM ======');

      // Renderiza curso com categoria "não encontrada"
      const courseWithWarning = {
        ...course,
        categoryLabel: 'Categoria não encontrada'
      };

      return <CourseDetailPosGraduacao course={courseWithWarning} />;
  }
}
