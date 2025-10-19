import Image from 'next/image';
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

interface Coordenacao {
  coordenador: string
  descricao: string
  foto?: string | null
}

interface CourseFacultyProps {
  professores: Professor[];
  coordenacao?: Coordenacao;
}

export default function CourseFaculty({ professores, coordenacao }: CourseFacultyProps) {
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
      {/* Coordenação */}
      {coordenacao && coordenacao.coordenador && (
        <section className="bg-white p-8 rounded-[18px] shadow-[0_8px_20px_rgba(15,32,68,0.08)] mb-8">
          <SectionTitle>Coordenação</SectionTitle>
          <div className="flex gap-5 items-start">
            {coordenacao.foto && (
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 relative">
                <Image
                  src={coordenacao.foto}
                  alt={coordenacao.coordenador}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h4 className="m-0 mb-2 text-lg font-bold text-[#152c61]">
                {coordenacao.coordenador}
              </h4>
              <p className="m-0 text-[#42526b] leading-relaxed">
                {coordenacao.descricao}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Corpo Docente */}
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
    </>
  );
}
