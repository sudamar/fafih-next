import { ListaCorpoDocente } from '@/components/shared/lista-corpo-docente'
import { SectionTitle } from '@/components/ui/section-title'

interface CourseCorpoDocenteProps {
  /**
   * Lista de IDs de professores a serem exibidos.
   * Se vazio ou undefined, exibe todos os professores.
   */
  ids?: string[]

  /**
   * Define o nível de detalhamento dos dados exibidos.
   * - true: mostra todos os dados (nome, titulação, descrição, email, telefone, lattes)
   * - false: mostra apenas foto, nome e titulação
   * @default false
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

export default async function CourseCorpoDocente({
  ids = [],
  detalhamento = false,
  maxDescricao,
  mostrarNome = true,
  mostrarEmail = true,
}: CourseCorpoDocenteProps) {
  return (
    <section className="bg-white p-8 rounded-[18px] shadow-[0_8px_20px_rgba(15,32,68,0.08)]">
      <SectionTitle>Corpo Docente</SectionTitle>
      <ListaCorpoDocente
        ids={ids}
        detalhamento={detalhamento}
        maxDescricao={maxDescricao}
        mostrarNome={mostrarNome}
        mostrarEmail={mostrarEmail}
      />
    </section>
  )
}
