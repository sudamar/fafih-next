import styles from '@/app/(site)/cursos/[slug]/page.module.css'
import { SectionTitle } from '@/components/ui/section-title'

interface CourseJustificativaProps {
  justificativa?: string[]
  title?: string
}

export function CourseJustificativa({ justificativa, title = 'Justificativa' }: CourseJustificativaProps) {
  if (!justificativa || justificativa.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      <div className={`${styles.sectionContent} ${styles.richList}`}>
        {justificativa.map((paragraph: string, index: number) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>
    </section>
  )
}
