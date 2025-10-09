import styles from './CourseWorkload.module.css';
import { SectionTitle } from '@/components/ui/section-title';

interface WorkloadActivity {
  descricao: string;
  carga: number;
}

interface Cargahoraria {
  texto: string[];
  atividades: WorkloadActivity[];
  observacao?: string;
}

interface CourseWorkloadProps {
  cargahoraria: Cargahoraria;
}

export default function CourseWorkload({ cargahoraria }: CourseWorkloadProps) {
  if (!cargahoraria) return null;

  return (
    <section className={styles.section}>
      <SectionTitle>Carga Horária</SectionTitle>

      {cargahoraria.texto && cargahoraria.texto.length > 0 && (
        <div className={styles.description}>
          {cargahoraria.texto.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {cargahoraria.atividades && cargahoraria.atividades.length > 0 && (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Atividade</div>
            <div className={styles.headerCellHours}>Carga Horária</div>
          </div>
          <div className={styles.tableBody}>
            {cargahoraria.atividades.map((atividade, index) => {
              const isTotal = atividade.descricao.toLowerCase().includes('total');
              return (
                <div
                  key={index}
                  className={`${styles.tableRow} ${isTotal ? styles.totalRow : ''}`}
                >
                  <div className={styles.cell}>{atividade.descricao}</div>
                  <div className={styles.cellHours}>
                    {atividade.carga}h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {cargahoraria.observacao && (
        <div className={styles.observation}>
          <strong>Observação:</strong> {cargahoraria.observacao}
        </div>
      )}
    </section>
  );
}
