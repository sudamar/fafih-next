import { SectionTitle } from '@/components/ui/section-title';
import styles from './CourseDescriptionCard.module.css';

interface CourseDescriptionCardProps {
  description?: string;
}

export default function CourseDescriptionCard({ description }: CourseDescriptionCardProps) {
  if (!description) return null;

  return (
    <section className={styles.descriptionSection}>
      <SectionTitle>Sobre o Curso</SectionTitle>
      <div className={styles.descriptionCard}>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    </section>
  );
}
