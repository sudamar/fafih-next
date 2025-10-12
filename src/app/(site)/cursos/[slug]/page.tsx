import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/services/courses';
import CourseDetailPosGraduacao from '@/components/cursos/CourseDetailPosGraduacao';
import CourseDetailExtensao from '@/components/cursos/CourseDetailExtensao';
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

  notFound();
}
