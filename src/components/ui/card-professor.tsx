import Image from 'next/image';
import styles from './card-professor.module.css';

export interface ProfessorData {
  nome: string;
  titulacao: string;
  descricao: string;
  foto?: string;
  email?: string;
  telefone?: string;
  lattes?: string;
}

interface CardProfessorProps {
  professor: ProfessorData;
}

export function CardProfessor({ professor }: CardProfessorProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {/* Foto do Professor */}
        <div className={styles.avatar}>
          {professor.foto ? (
            <Image
              src={professor.foto}
              alt={professor.nome}
              width={80}
              height={80}
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarFallback}>
              {professor.nome.charAt(0)}
            </span>
          )}
        </div>

        {/* Informações */}
        <div className={styles.info}>
          <h3 className={styles.name}>{professor.nome}</h3>
          {professor.titulacao && (
            <p className={styles.title}>{professor.titulacao}</p>
          )}
          {professor.descricao && (
            <p className={styles.description}>{professor.descricao}</p>
          )}
        </div>
      </div>

      {/* Contatos no rodapé */}
      {(professor.email || professor.telefone || professor.lattes) && (
        <div className={styles.footer}>
          {professor.email && (
            <a
              href={`mailto:${professor.email}`}
              className={styles.contact}
              title="Email"
            >
              <i className="fas fa-envelope"></i>
              <span>{professor.email}</span>
            </a>
          )}
          {professor.telefone && (
            <a
              href={`tel:${professor.telefone.replace(/\D/g, '')}`}
              className={styles.contact}
              title="Telefone"
            >
              <i className="fas fa-phone"></i>
              <span>{professor.telefone}</span>
            </a>
          )}
          {professor.lattes && (
            <a
              href={professor.lattes}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contact}
              title="Currículo Lattes"
            >
              <i className="fas fa-graduation-cap"></i>
              <span>Lattes</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
