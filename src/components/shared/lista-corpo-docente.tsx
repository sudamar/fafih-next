import { getProfessores, getProfessoresByIds } from '@/lib/services/professores'
import { CardProfessor, ProfessorData } from '@/components/ui/card-professor'
import styles from './lista-corpo-docente.module.css'

interface ListaCorpoDocenteProps {
  /**
   * Lista de IDs de professores a serem exibidos.
   * Se vazio ou undefined, exibe todos os professores.
   */
  ids?: string[]

  /**
   * Define o nível de detalhamento dos dados exibidos.
   * - true: mostra todos os dados (nome, titulação, descrição, email, telefone, lattes)
   * - false: mostra apenas foto, nome e titulação
   */
  detalhamento?: boolean

  /**
   * Limite de caracteres para a descrição.
   * Se undefined, exibe a descrição completa.
   * Se um número, limita e adiciona "..." ao final.
   */
  maxDescricao?: number

  /**
   * Controla se o nome do professor é exibido.
   * @default true
   */
  mostrarNome?: boolean

  /**
   * Controla se o email do professor é exibido.
   * @default true (quando detalhamento=true)
   */
  mostrarEmail?: boolean
}

export async function ListaCorpoDocente({
  ids = [],
  detalhamento = true,
  maxDescricao,
  mostrarNome = true,
  mostrarEmail = true,
}: ListaCorpoDocenteProps) {
  // Busca os professores
  let professores: ProfessorData[] = [];

  if (ids.length === 0) {
    professores = await getProfessores();
  } else {
    professores = await getProfessoresByIds(ids)
  }

  // Processa os dados de acordo com os parâmetros
  const professoresProcessados: ProfessorData[] = professores.map((professor) => {
    const professorProcessado: ProfessorData = {
      nome: mostrarNome ? professor.nome : '',
      titulacao: professor.titulacao,
      descricao: '',
      foto: professor.foto,
    }

    // Se detalhamento = true, inclui todos os dados
    if (detalhamento) {
      // Email só é incluído se mostrarEmail for true
      if (mostrarEmail) {
        professorProcessado.email = professor.email
      }
      professorProcessado.telefone = professor.telefone
      professorProcessado.lattes = professor.lattes

      // Processa a descrição de acordo com maxDescricao
      if (professor.descricao) {
        if (maxDescricao && professor.descricao.length > maxDescricao) {
          professorProcessado.descricao = `${professor.descricao.slice(0, maxDescricao).trim()}...`
        } else {
          professorProcessado.descricao = professor.descricao
        }
      }
    }

    return professorProcessado
  })

  return (
    <div className={styles.grid}>
      {professoresProcessados.map((professor, index) => (
        <CardProfessor key={index} professor={professor} />
      ))}
    </div>
  )
}
