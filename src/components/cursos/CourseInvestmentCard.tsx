import styles from './CourseInvestmentCard.module.css';

interface Course {
  price?: number;
  originalPrice?: number;
  precoMatricula?: number;
  monthlyPrice?: string;
  categoryLabel?: string;
  modalidade?: string;
  startDate?: string;
  duration?: string;
  workload?: string;
  category?: string;
  formato_curso?: {
    frequencia?: string;
    horario?: string;
    periodo?: string;
    tipo?: string;
    plataforma?: string;
    numero_encontros?: number;
  };
}

interface CourseInvestmentCardProps {
  course: Course;
}

const formatCurrency = (value: number | null | undefined): string | null => {
  if (value === null || value === undefined) return null;
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const normalizeString = (value?: string | null): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export default function CourseInvestmentCard({ course }: CourseInvestmentCardProps) {
  const price = formatCurrency(course.price);
  const originalPrice = formatCurrency(course.originalPrice);
  const isExtensionCourse = course.category === 'extensao';
  const extensionFormat = isExtensionCourse
    ? normalizeString((() => {
        const parts: string[] = [];
        const formatInfo = course.formato_curso;
        console.log("Formato INFO", formatInfo);

        const frequencia = normalizeString(formatInfo?.frequencia);
        if (frequencia) {
          parts.push(frequencia);
        }

        const horario = normalizeString(formatInfo?.horario);
        if (horario) {
          const horarioWithPrefix = horario.toLowerCase().startsWith('de ')
            ? horario
            : `de ${horario}`;
          parts.push(horarioWithPrefix);
        }

        const periodo = normalizeString(formatInfo?.periodo);
        if (periodo) {
          parts.push(periodo);
        }

        const durationFallback = normalizeString(course.duration);
        if (parts.length === 0 && durationFallback) {
          parts.push(durationFallback);
        }

        return parts.join(', ');
      })())
    : null;
  const rawDuration = normalizeString(course.duration);
  const durationLabel = isExtensionCourse ? 'Formato' : 'Duração';
  const durationValue = isExtensionCourse ? extensionFormat : rawDuration;

  return (
    <div className={styles.card}>
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

      {/* Lista de detalhes */}
      <ul className={styles.list}>
        {originalPrice && (
          <li>
            <span className={styles.listIcon}>💰</span>
            <div className={styles.listContent}>
              <strong>De:</strong> <s>{originalPrice}</s> <strong>por {price}</strong>
            </div>
          </li>
        )}
        {course.startDate && (
          <li>
            <span className={styles.listIcon}>📅</span>
            <div className={styles.listContent}>
              <strong>Início:</strong> {course.startDate}
            </div>
          </li>
        )}
        {durationValue && (
          <li>
            <span className={styles.listIcon}>📅</span>
            <div className={styles.listContent}>
              <strong>{durationLabel}:</strong> {durationValue}
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
