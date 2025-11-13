import { ListaCorpoDocente } from '@/components/shared/lista-corpo-docente';
import { PageTitle } from '@/components/ui/page-title';
import styles from './page.module.css';

export default async function CorpoDocentePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PageTitle>Corpo Docente</PageTitle>
        <p className={styles.subtitle}>
          Conheça nossos professores especialistas, mestres e doutores que compõem o corpo docente do IJEP
        </p>
      </div>

      <ListaCorpoDocente detalhamento={true} />
    </div>
  );
}
