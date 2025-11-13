import { SectionTitle } from '@/components/ui/section-title';
import { CardProfessor, ProfessorData } from '@/components/ui/card-professor';

interface Professor {
  nome: string
  titulacao?: string | null
  descricao?: string | null
  telefone?: string | null
  email?: string | null
  foto?: string | null
  lattes?: string | null
}

interface CourseFacultyProps {
  professores: Professor[];
}

export default function CourseFaculty({ professores }: CourseFacultyProps) {
  const normalizedProfessores: ProfessorData[] = professores.map((professor) => ({
    nome: professor.nome,
    titulacao: professor.titulacao ?? 'Professor(a) convidado(a)',
    descricao: professor.descricao ?? 'Detalhes sobre a experiência profissional serão adicionados em breve.',
    telefone: professor.telefone ?? undefined,
    email: professor.email ?? undefined,
    foto: professor.foto ?? undefined,
    lattes: professor.lattes ?? undefined,
  }))

  return (
    <>
      {/* Corpo Docente */}
       {normalizedProfessores.length > 0 && (
      <section className="bg-white p-8 rounded-[18px] shadow-[0_8px_20px_rgba(15,32,68,0.08)]">
        <SectionTitle>Corpo Docente</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 items-stretch">
          {normalizedProfessores.map((professor, index) => (
            <CardProfessor
              key={index}
              professor={professor}
            />
          ))}
        </div>
      </section>
      )}
    </>
  );
}
