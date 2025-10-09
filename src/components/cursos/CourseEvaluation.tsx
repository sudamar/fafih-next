import styles from './CourseEvaluation.module.css';

interface CourseEvaluationProps {
  avaliacao: string[];
}

export default function CourseEvaluation({ avaliacao }: CourseEvaluationProps) {
  if (!avaliacao || avaliacao.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Sistema de Avaliação</h2>
      <div className={styles.content}>
        {avaliacao.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
