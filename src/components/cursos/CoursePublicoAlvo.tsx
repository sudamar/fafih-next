import styles from '@/app/(site)/cursos/[slug]/page.module.css'
import { SectionTitle } from '@/components/ui/section-title'

interface CoursePublicoAlvoProps {
  publico?: string[]
  title?: string
}

export function CoursePublicoAlvo({ publico, title = 'Para quem é este curso' }: CoursePublicoAlvoProps) {
  if (!publico || publico.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      <div className={`${styles.sectionContent} ${styles.richList}`}>
        {publico.map((paragraph, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>
    </section>
  )
}
