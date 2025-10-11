import Image from 'next/image';
import styles from './CourseDetailHero.module.css';

interface CourseHero {
  type?: string;
  source?: string;
  fallbackImage?: string;
  alt?: string;
}

interface Course {
  hero?: CourseHero;
  image?: string;
  title: string;
  subtitle?: string;
  categoryLabel?: string;
  duration?: string;
  modalidade?: string;
}

interface CourseDetailHeroProps {
  course: Course;
}

export default function CourseDetailHero({ course }: CourseDetailHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Media + Title */}
          <div className={styles.mediaWrapper}>
            <div className={styles.media}>
              {course.hero?.type === 'video' ? (
                <video
                  className={styles.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  poster={course.hero.fallbackImage}
                >
                  <source src={course.hero.source} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={course.hero?.source || course.image || ''}
                  alt={course.hero?.alt || course.title}
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
