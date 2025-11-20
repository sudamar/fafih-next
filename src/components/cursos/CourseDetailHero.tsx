import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import styles from './CourseDetailHero.module.css'

interface CourseHero {
  type?: string
  source?: string | null
  fallbackImage?: string | null
  alt?: string | null
}

interface Course {
  hero?: CourseHero
  image?: string | StaticImageData | null
  title: string
  subtitle?: string | null
  categoryLabel?: string | null
  duration?: string | null
  modalidade?: string | null
}

interface CourseDetailHeroProps {
  course: Course
}

export default function CourseDetailHero({ course }: CourseDetailHeroProps) {
  const posterImage = (() => {
    if (typeof course.hero?.fallbackImage === 'string' && course.hero.fallbackImage.trim()) {
      return course.hero.fallbackImage
    }
    if (typeof course.image === 'string' && course.image.trim()) {
      return course.image
    }
    return '/assets/images/foto-fallback-generica.jpg'
  })()

  const heroImage: string | StaticImageData =
    course.hero?.source ?? course.image ?? '/assets/images/foto-fallback-generica.jpg'

  const mediaAlt = course.hero?.alt || course.title

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Media + Title */}
          <div className={styles.mediaWrapper}>
            <div className={styles.media}>
              {course.hero?.type === 'video' && course.hero?.source ? (
                <video
                  className={styles.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  poster={posterImage}
                >
                  <source src={course.hero.source} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={heroImage}
                  alt={mediaAlt}
                  className={styles.image}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              )}

              {/* Badges sobre a imagem */}
              <div className={styles.mediaBadges}>
                <span className={`${styles.badge} ${styles.badgePrimary}`}>
                  {course.categoryLabel}
                </span>
                <span className={`${styles.badge} ${styles.badgeSecondary}`}>
                  {course.duration}
                </span>
                <span className={`${styles.badge} ${styles.badgeTertiary}`}>
                  {course.modalidade}
                </span>
              </div>

              {/* Título dentro do vídeo */}
              <div className={styles.titleOverlay}>
                <h1 className={styles.title}>{course.title}</h1>
                {course.subtitle && (
                  <p className={styles.subtitle}>{course.subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Placeholder for floating card */}
          <div className={styles.cardPlaceholder}></div>
        </div>
      </div>
    </section>
  );
}
