import styles from './CourseFaculty.module.css';
import { SectionTitle } from '@/components/ui/section-title';

interface Professor {
  nome: string;
  titulacao: string;
  descricao: string;
  telefone: string;
  email: string;
  foto: string;
}

interface Coordenacao {
  coordenador: string;
  descricao: string;
}

interface CourseFacultyProps {
  professores: Professor[];
  coordenacao?: Coordenacao;
}

export default function CourseFaculty({ professores, coordenacao }: CourseFacultyProps) {
  return (
    <>
      {/* Coordenação */}
      {coordenacao && coordenacao.coordenador && (
        <section className={styles.section}>
          <SectionTitle>Coordenação</SectionTitle>
          <div className={styles.coordinationCard}>
            <div className={styles.coordinationHeader}>
              <div className={styles.coordinationAvatar}>
                {coordenacao.coordenador.charAt(0)}
              </div>
              <div>
                <h4 className={styles.coordinationName}>{coordenacao.coordenador}</h4>
                <p className={styles.coordinationRole}>Coordenador(a) do Curso</p>
              </div>
            </div>
            <p className={styles.coordinationDescription}>{coordenacao.descricao}</p>
          </div>
        </section>
      )}

      {/* Corpo Docente */}
      <section className={styles.section}>
        <SectionTitle>Corpo Docente</SectionTitle>
        <div className={styles.facultyGrid}>
          {professores.map((professor, index) => (
            <div key={index} className={styles.professorCard}>
              <div className={styles.professorAvatar}>
                {professor.foto ? (
                  <img src={professor.foto} alt={professor.nome} />
                ) : (
                  <span>{professor.nome.charAt(0)}</span>
                )}
              </div>
              <div className={styles.professorInfo}>
                <h3 className={styles.professorName}>{professor.nome}</h3>
                <p className={styles.professorTitle}>{professor.titulacao}</p>
                <p className={styles.professorDescription}>{professor.descricao}</p>
                {(professor.email || professor.telefone) && (
                  <div className={styles.professorContact}>
                    {professor.email && (
                      <a href={`mailto:${professor.email}`} className={styles.contactLink}>
                        <i className="fas fa-envelope"></i>
                        {professor.email}
                      </a>
                    )}
                    {professor.telefone && (
                      <span className={styles.contactInfo}>
                        <i className="fas fa-phone"></i>
                        {professor.telefone}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
