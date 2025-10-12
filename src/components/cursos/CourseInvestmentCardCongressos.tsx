"use client";

import Image from 'next/image';
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
  ctaLabel?: string;
  observacoes?: string[] | string;
  moreInfoUrl?: string;
}

interface CourseInvestmentCardCongressosProps {
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

export default function CourseInvestmentCardCongressos({ course }: CourseInvestmentCardCongressosProps) {
  const router = useRouter();
  const priceValue = typeof course.price === 'number' ? course.price : null;
  const hasPrice = priceValue !== null && priceValue > 0;
  const price = hasPrice ? formatCurrency(priceValue) : null;
  const originalPrice = hasPrice && typeof course.originalPrice === 'number' && course.originalPrice > 0
    ? formatCurrency(course.originalPrice)
    : null;
  const monthlyPriceInfo = hasPrice ? course.monthlyPrice : null;
  const moreInfoHref = normalizeString(course.moreInfoUrl) || 'https://ijep.com.br/inscricao/aluno';
  const primaryCtaLabel = normalizeString(course.ctaLabel) || 'Adquira Agora';

  const observationText = (() => {
    const rawObservacoes = course.observacoes;
    if (Array.isArray(rawObservacoes)) {
      for (const item of rawObservacoes) {
        const normalized = normalizeString(item);
        if (normalized) {
          return normalized;
        }
      }
      return null;
    }

    const single = normalizeString(rawObservacoes);
    return single ? single : null;
  })();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/cursos');
  };

  return (
    <div className={styles.card}>
      {price && (
        <div className={styles.priceBox}>
          <div className={styles.priceLabel}>Investimento</div>
          <div className={styles.price}>{price}</div>
          {monthlyPriceInfo && (
            <div className={styles.installments}>{monthlyPriceInfo}</div>
          )}
        </div>
      )}

      {!hasPrice && (
        <div className={styles.priceBox}>
          <div className={styles.priceLabel}>Investimento</div>
          <a
            href={moreInfoHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.specialOfferBadge}
          >
            <Image
              src="/assets/images/oferta-especial.svg"
              alt="Oferta especial"
              width={148}
              height={46}
              priority={false}
            />
          </a>
        </div>
      )}

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
        {course.duration && (
          <li>
            <span className={styles.listIcon}>⏱️</span>
            <div className={styles.listContent}>
              <strong>Duração:</strong> {course.duration}
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
            <span className={styles.listIcon}>📘</span>
            <div className={styles.listContent}>
              <strong>Carga Horária:</strong> {course.workload}
            </div>
          </li>
        )}
      </ul>

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
