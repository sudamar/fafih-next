import { SectionTitle } from '@/components/ui/section-title';
import styles from '@/app/(site)/cursos/[slug]/page.module.css';

interface CourseDifferentialsSectionProps {
  items?: string[] | null;
}

const normalizeItems = (items?: string[] | null): string[] => {
  if (!items) {
    return [];
  }

  return items
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0)
    .map((item) => item.replace(/^-\s+/, ''));
};

export default function CourseDifferentialsSection({ items }: CourseDifferentialsSectionProps) {
  const normalizedItems = normalizeItems(items);

  if (normalizedItems.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <SectionTitle>Diferenciais</SectionTitle>
      <div className={styles.sectionContent}>
        <ul className={styles.list}>
          {normalizedItems.map((item, index) => (
            <li key={`differential-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
