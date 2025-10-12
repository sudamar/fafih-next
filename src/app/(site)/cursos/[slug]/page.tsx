import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/services/courses';
import CourseDetailPosGraduacao from '@/components/cursos/CourseDetailPosGraduacao';
import CourseDetailExtensao from '@/components/cursos/CourseDetailExtensao';
import CourseDetailCongressos from '@/components/cursos/CourseDetailCongressos';
export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  if (course.category === 'especializacao') {
    return <CourseDetailPosGraduacao course={course} />;
  }

  if (course.category === 'extensao') {
    return <CourseDetailExtensao course={course} />;
  }

  if (course.category === 'congressos') {
    return <CourseDetailCongressos course={course} />;
  }

  notFound();
}
