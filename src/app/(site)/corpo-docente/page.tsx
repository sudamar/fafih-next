import { getProfessores } from '@/lib/services/professores';
import { CardProfessor } from '@/components/ui/card-professor';
import { PageTitle } from '@/components/ui/page-title';
import styles from './page.module.css';

export default async function CorpoDocentePage() {
  const professores = await getProfessores();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PageTitle>Corpo Docente</PageTitle>
        <p className={styles.subtitle}>
          Conheça nossos professores especialistas, mestres e doutores que compõem o corpo docente do IJEP
        </p>
      </div>

      <div className={styles.grid}>
        {professores.map((professor, index) => (
          <CardProfessor key={index} professor={professor} />
        ))}
      </div>
    </div>
  );
}
