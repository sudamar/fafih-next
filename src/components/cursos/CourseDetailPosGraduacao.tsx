import CourseDetailHero from '@/components/cursos/CourseDetailHero';
import CourseInvestmentCard from '@/components/cursos/CourseInvestmentCard';
import CourseAbout from '@/components/cursos/CourseAbout';
import CourseCurriculum from '@/components/cursos/CourseCurriculum';
import CourseFaculty from '@/components/cursos/CourseFaculty';
import CourseEvaluation from '@/components/cursos/CourseEvaluation';
import CourseWorkload from '@/components/cursos/CourseWorkload';
import { DepoimentosBasicoLista } from '@/components/ui/depoimentos-basico-lista';
import { SectionTitle } from '@/components/ui/section-title';
import { ContatosSecretaria } from '@/components/shared/contatos-secretaria';
import CourseDifferentialsSection from '@/components/cursos/CourseDifferentialsSection';
import styles from '@/app/(site)/cursos/[slug]/page.module.css';

interface Testimonial {
  text?: string;
  quote?: string;
  author: string;
  role: string;
}

interface Course {
  [key: string]: unknown;
  title: string;
  subtitle?: string;
  hero?: {
    type?: string;
    source?: string;
    fallbackImage?: string;
    alt?: string;
  };
  image?: string;
  categoryLabel?: string;
  duration?: string;
  modalidade?: string;
  fullDescription?: string[];
  highlights?: Array<{
    icon: string;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }>;
  justificativa?: string[];
  objetivos?: string[];
  publico?: string[];
  curriculum?: Array<{
    number: number;
    title: string;
    hours: number;
    ementa: string;
    objetivos: string;
    bibliography: string[];
  }>;
  avaliacao?: string[];
  cargahoraria?: {
    texto: string[];
    atividades: Array<{
      descricao: string;
      carga: number;
    }>;
    observacao?: string;
  };
  professores?: Array<{
    nome: string;
    titulacao: string;
    descricao: string;
    telefone?: string;
    email?: string;
    foto?: string;
  }>;
  coordenacao?: {
    coordenador: string;
    descricao: string;
    foto?: string;
  };
  testimonials?: Testimonial[];
  contact?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  diferenciais?: string[];
  category?: string;
  ctaLabel?: string;
  moreInfoUrl?: string;
  formato_curso?: {
    frequencia?: string;
    horario?: string;
    periodo?: string;
    tipo?: string;
    plataforma?: string;
    numero_encontros?: number;
  };
}

interface CourseDetailPosGraduacaoProps {
  course: Course;
}

export default function CourseDetailPosGraduacao({ course }: CourseDetailPosGraduacaoProps) {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <CourseDetailHero course={course} />

      {/* Mobile Floating Button */}
      <div className={styles.mobileFloatingButton}>
        <a
          href="https://ijep.com.br/inscricao/aluno"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inscrever-se Agora
        </a>
      </div>

      {/* Mobile Investment Card */}
      <div className={styles.mobileInvestmentCard}>
        <CourseInvestmentCard course={course} />
      </div>

      {/* Main Content Grid with Floating Card */}
      <div className={styles.contentGrid}>
        <main className={styles.mainContent}>
          {/* Sobre o Curso */}
          <CourseAbout
            fullDescription={course.fullDescription ?? []}
            highlights={course.highlights ?? []}
          />

          <CourseDifferentialsSection items={course.diferenciais} />

          {/* Justificativa */}
          {course.justificativa && course.justificativa.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>Justificativa</SectionTitle>
              <div className={styles.sectionContent}>
                {course.justificativa.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* Objetivos */}
          {course.objetivos && course.objetivos.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>Objetivos</SectionTitle>
              <div className={styles.sectionContent}>
                <ul className={styles.list}>
                  {course.objetivos.map((objetivo: string, index: number) => (
                    <li key={index}>{objetivo}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Público-alvo */}
          {course.publico && course.publico.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>Para quem é este curso</SectionTitle>
              <div className={styles.sectionContent}>
                {course.publico.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* Currículo */}
          {course.curriculum && course.curriculum.length > 0 && (
            <CourseCurriculum curriculum={course.curriculum} />
          )}

          {/* Avaliação */}
          {course.avaliacao && course.avaliacao.length > 0 && (
            <CourseEvaluation avaliacao={course.avaliacao} />
          )}

          {/* Carga Horária */}
          {course.cargahoraria && (
            <CourseWorkload cargahoraria={course.cargahoraria} />
          )}

          {/* Corpo Docente */}
          {course.professores && course.professores.length > 0 && (
            <CourseFaculty
              professores={course.professores}
              coordenacao={course.coordenacao}
            />
          )}

          {/* Depoimentos */}
          {course.testimonials && course.testimonials.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>Depoimentos de Alunos</SectionTitle>
              <DepoimentosBasicoLista
                depoimentos={course.testimonials.map((t: Testimonial) => ({
                  quote: t.text || t.quote || '',
                  author: t.author,
                  role: t.role
                }))}
              />
            </section>
          )}

          <ContatosSecretaria />
        </main>

        {/* Sidebar com Card Flutuante */}
        <aside className={styles.floatingSidebar}>
          <div className={styles.stickyCard}>
            <CourseInvestmentCard course={course} />
          </div>
        </aside>
      </div>
    </div>
  );
}
