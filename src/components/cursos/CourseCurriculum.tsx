'use client';

import { useState } from 'react';
import styles from './CourseCurriculum.module.css';
import { SectionTitle } from '@/components/ui/section-title';
import { getObjetivosHtml } from '@/lib/utils/html-utils';

interface CurriculumItem {
  number: number
  title: string
  hours: string | null
  ementa: string | null
  objetivos: string | null
  bibliography: string[]
}

interface CourseCurriculumProps {
  curriculum: CurriculumItem[];
}

export default function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  const formatHours = (value: string | null): string | null => {
    if (!value) {
      return null
    }

    const raw = value.trim()
    if (!raw) {
      return null
    }

    const numeric = Number.parseFloat(raw.replace(',', '.'))
    if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
      return `${numeric}h`
    }

    return raw
  }

  return (
    <section className={styles.section}>
      <SectionTitle>Currículo do Curso</SectionTitle>

      <div className={styles.curriculumList}>
        {curriculum.map((item, index) => {
          const isOpen = openItems.includes(index);
          const formattedHours = formatHours(item.hours)

          return (
            <div key={index} className={styles.curriculumItem}>
              <button
                className={styles.curriculumHeader}
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <div className={styles.headerLeft}>
                  <span className={styles.moduleNumber}>Módulo {item.number}</span>
                  <h3 className={styles.moduleTitle}>{item.title}</h3>
                </div>
                <div className={styles.headerRight}>
                  {formattedHours && (
                    <span className={styles.hours}>{formattedHours}</span>
                  )}
                  <span className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}>
                    +
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className={styles.curriculumContent}>
                  {item.ementa && (
                    <div className={styles.contentBlock}>
                      <h4 className={styles.contentTitle}>Ementa</h4>
                      <p className={styles.contentText}>{item.ementa}</p>
                    </div>
                  )}

                  {item.objetivos && (
                    <div className={styles.contentBlock}>
                      <h4 className={styles.contentTitle}>Objetivos</h4>
                      <div
                        className={styles.contentText}
                        dangerouslySetInnerHTML={{ __html: getObjetivosHtml(item.objetivos) }}
                      />
                    </div>
                  )}

                  {item.bibliography && item.bibliography.length > 0 && (
                    <div className={styles.contentBlock}>
                      <h4 className={styles.contentTitle}>Bibliografia</h4>
                      <ul className={styles.bibliography}>
                        {item.bibliography.map((book, idx) => (
                          <li key={idx}>{book}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
