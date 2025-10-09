import styles from './CourseEvaluation.module.css';
import { SectionTitle } from '@/components/ui/section-title';

interface CourseEvaluationProps {
  avaliacao: string[];
}

export default function CourseEvaluation({ avaliacao }: CourseEvaluationProps) {
  if (!avaliacao || avaliacao.length === 0) return null;

  return (
    <section className={styles.section}>
      <SectionTitle>Sistema de Avaliação</SectionTitle>
      <div className={styles.content}>
        {avaliacao.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
