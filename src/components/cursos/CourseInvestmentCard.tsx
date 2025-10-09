import styles from './CourseInvestmentCard.module.css';

interface CourseInvestmentCardProps {
  course: any;
}

const formatCurrency = (value: number | null | undefined): string | null => {
  if (value === null || value === undefined) return null;
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function CourseInvestmentCard({ course }: CourseInvestmentCardProps) {
  const price = formatCurrency(course.price);
  const originalPrice = formatCurrency(course.originalPrice);
  const enrollmentPrice = formatCurrency(course.precoMatricula);

  return (
    <div className={styles.card}>
      {/* Badge */}
      <div className={styles.badge}>
        <span className={styles.badgeText}>Inscrições Abertas</span>
      </div>

      {/* Preço Principal */}
      {price && (
        <div className={styles.priceBox}>
          <div className={styles.priceLabel}>Investimento</div>
          <div className={styles.price}>{price}</div>
          {course.monthlyPrice && (
            <div className={styles.installments}>{course.monthlyPrice}</div>
          )}
        </div>
      )}

      {/* Informações */}
      {/* <div className={styles.info}>
        <div className={styles.infoRow}>
          <span className={styles.label}>{course.categoryLabel}</span>
          <span className={styles.divider}>•</span>
          <span className={styles.label}>{course.modalidade}</span>
        </div>
      </div> */}

      {/* Lista de detalhes */}
      <ul className={styles.list}>
        {course.startDate && (
          <li>
            <span className={styles.listIcon}>📅</span>
            <div className={styles.listContent}>
              <strong>Início:</strong> {course.startDate}
            </div>
          </li>
        )}
        {originalPrice && (
          <li>
            <span className={styles.listIcon}>💰</span>
            <div className={styles.listContent}>
              <strong>De:</strong> <s>{originalPrice}</s> <strong>por {price}</strong>
            </div>
          </li>
        )}
        {course.duration && (
          <li>
            <span className={styles.listIcon}>📅</span>
            <div className={styles.listContent}>
              <strong>Duração:</strong> {course.duration}
            </div>
          </li>
        )}
        {course.modalidade && (
          <li>
            <span className={styles.listIcon}>📍</span>
            <div className={styles.listContent}>
              <strong>Modalidade:</strong> {course.modalidade}
            </div>
          </li>
        )}
        {/* {course.certificate && (
          <li>
            <span className={styles.listIcon}>🎓</span>
            <div className={styles.listContent}>
              <strong>Certificação:</strong> {course.certificate}
            </div>
          </li>
        )} */}
        {course.workload && (
          <li>
            <span className={styles.listIcon}>⏱️</span>
            <div className={styles.listContent}>
              <strong>Carga Horária:</strong> {course.workload}
            </div>
          </li>
        )}
      </ul>

      {/* CTAs */}
      <div className={styles.actions}>
        <a
          href="https://ijep.com.br/inscricao/aluno"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryButton}
        >
          Inscrever-se Agora
        </a>
        <button className={styles.secondaryButton}>
          Download da Ementa
        </button>
      </div>
    </div>
  );
}
