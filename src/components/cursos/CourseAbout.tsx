import styles from './CourseAbout.module.css';
import { PageTitle } from '@/components/ui/page-title';

interface CourseAboutProps {
  fullDescription: string[];
  highlights: Array<{
    icon: string;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }>;
}

export default function CourseAbout({ fullDescription, highlights }: CourseAboutProps) {
  return (
    <section className={styles.section}>
      <PageTitle>Sobre o Curso</PageTitle>

      <div className={styles.description}>
        {fullDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {highlights && highlights.length > 0 && (
        <div className={styles.highlights}>
          {highlights.map((highlight, index) => (
            <div key={index} className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <i className={highlight.icon}></i>
              </div>
              <div className={styles.highlightContent}>
                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                <p className={styles.highlightDescription}>{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
