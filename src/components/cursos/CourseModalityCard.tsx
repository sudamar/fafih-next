import { SectionTitle } from '@/components/ui/section-title';
import styles from './CourseModalityCard.module.css';

interface CourseModalityCardProps {
  modalidade?: string;
}

export default function CourseModalityCard({ modalidade }: CourseModalityCardProps) {
  if (!modalidade) return null;

  return (
    <section className={styles.modalitySection}>
      <SectionTitle>Modalidade</SectionTitle>
      <div className={styles.modalityCard}>
        <div className={styles.iconWrapper}>
          <i className={`fas ${modalidade.toLowerCase() === 'presencial' ? 'fa-building' : 'fa-laptop'}`}></i>
        </div>
        <div className={styles.modalityContent}>
          <h3 className={styles.modalityTitle}>{modalidade}</h3>
          <p className={styles.modalityDescription}>
            {modalidade.toLowerCase() === 'presencial'
              ? 'Aulas presenciais com interação direta com professores e colegas'
              : modalidade.toLowerCase() === 'online'
              ? 'Aulas online ao vivo com interação em tempo real'
              : 'Formato flexível combinando atividades presenciais e online'}
          </p>
        </div>
      </div>
    </section>
  );
}
