'use client';

import { useState } from 'react';
import styles from './CourseCurriculum.module.css';

interface CurriculumItem {
  number: number;
  title: string;
  hours: number;
  ementa: string;
  objetivos: string;
  bibliography: string[];
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

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Currículo do Curso</h2>

      <div className={styles.curriculumList}>
        {curriculum.map((item, index) => {
          const isOpen = openItems.includes(index);

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
                  <span className={styles.hours}>{item.hours}h</span>
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
                      <p className={styles.contentText}>{item.objetivos}</p>
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
