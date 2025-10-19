import styles from './CourseAbout.module.css'
import { PageTitle } from '@/components/ui/page-title'

interface CourseHighlight {
  icon?: string | null
  title?: string | null
  description?: string | null
}

interface CourseAboutProps {
  fullDescription: string[]
  highlights: CourseHighlight[]
}

export default function CourseAbout({ fullDescription, highlights }: CourseAboutProps) {
  const sanitizedHighlights: Array<{ icon: string; title: string; description: string }> = (highlights?.length ? highlights : [
    {
      icon: 'fas fa-star',
      title: 'Diferencial',
      description: 'Mais detalhes em breve.',
    },
  ]).map((highlight) => ({
    icon: highlight.icon ?? 'fas fa-star',
    title: highlight.title ?? 'Diferencial',
    description: highlight.description ?? 'Mais detalhes em breve.',
  }))

  return (
    <section className={styles.section}>
      <PageTitle>Sobre o Curso</PageTitle>

      <div className={styles.description}>
        {fullDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {sanitizedHighlights.length > 0 && (
        <div className={styles.highlights}>
          {sanitizedHighlights.map((highlight, index) => (
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
  )
}
