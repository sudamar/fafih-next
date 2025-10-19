"use client";

import { useRouter } from 'next/navigation';
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
  ctaLabel?: string;
  observacoes?: string[] | string;
  moreInfoUrl?: string;
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
  const router = useRouter();
  const isExtensionCourse = course.category === 'extensao';
  const isCursoFormacaoAnalista = course.category === 'formacao';
  const priceValue = typeof course.price === 'number' ? course.price : null;
  const hasPrice = priceValue !== null && priceValue > 0;
  const price = hasPrice ? formatCurrency(priceValue) : null;
  const originalPrice = hasPrice && typeof course.originalPrice === 'number' && course.originalPrice > 0
    ? formatCurrency(course.originalPrice)
    : null;
  const monthlyPriceInfo = hasPrice ? course.monthlyPrice : null;
  const showContactTag = isExtensionCourse && !hasPrice;
  const primaryCtaLabel = normalizeString(course.ctaLabel) || 'Inscrever-se Agora';
  const moreInfoHref = normalizeString(course.moreInfoUrl) || 'https://ijep.com.br/inscricao/aluno';
  const observationText = isExtensionCourse
    ? (() => {
        const rawObservations = course.observacoes;
        if (Array.isArray(rawObservations)) {
          for (const item of rawObservations) {
            const normalized = normalizeString(item);
            if (normalized) {
              return normalized;
            }
          }
          return null;
        }

        const single = normalizeString(rawObservations);
        return single ? single : null;
      })()
    : null;
  const extensionFormat = isExtensionCourse
    ? normalizeString((() => {
        const parts: string[] = [];
        const formatInfo = course.formato_curso;
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

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/cursos');
  };

  return (
    <div className={styles.card}>
      {/* Preço Principal */}
      {price && (
        <div className={styles.priceBox}>
          <div className={styles.priceLabel}>Investimento</div>
          <div className={styles.price}>{price}</div>
          {monthlyPriceInfo && (
            <div className={styles.installments}>{monthlyPriceInfo}</div>
          )}
        </div>
      )}
      {(showContactTag || isCursoFormacaoAnalista) && (
        <div className={styles.priceBox}>
          <div className={styles.priceLabel}>Investimento</div>
          {isCursoFormacaoAnalista ? (
            <div className={styles.statusTag}>Consulte-nos</div>
          ) : (
            <div className={styles.statusTag}>Vagas encerradas</div>
          )}
        </div>
      )}

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
        {originalPrice && price && (
          <li>
            <span className={styles.listIcon}>💰</span>
            <div className={styles.listContent}>
              <strong>De:</strong> <s>{originalPrice}</s> <strong>por {price}</strong>
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
        {observationText && (
          <li>
            <span className={styles.listIcon}>📋</span>
            <div className={styles.listContent}>
              <strong>Observação:</strong>{' '}{observationText}
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
        <button type="button" className={styles.backButton} onClick={handleBack}>
          Voltar
        </button>
        <a
          href={moreInfoHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryButton}
        >
          {primaryCtaLabel}
        </a>
        <button className={styles.secondaryButton}>
          Download da Ementa
        </button>
      </div>
    </div>
  );
}
