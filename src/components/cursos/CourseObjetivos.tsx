import styles from '@/app/(site)/cursos/[slug]/page.module.css'
import { SectionTitle } from '@/components/ui/section-title'

interface CourseObjetivosProps {
  objetivos?: string[]
  title?: string
}

export function CourseObjetivos({ objetivos, title = 'Objetivos' }: CourseObjetivosProps) {
  if (!objetivos || objetivos.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      <div className={`${styles.sectionContent} ${styles.richList}`}>
        {objetivos.map((objetivo, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: objetivo }} />
        ))}
      </div>
    </section>
  )
}
