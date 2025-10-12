import { redirect } from 'next/navigation';

export default function LegacyExtensionCoursePage({ params }: { params: { slug: string } }) {
  redirect(`/cursos/${params.slug}`);
}
