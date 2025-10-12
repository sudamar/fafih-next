import CourseDetailHero from '@/components/cursos/CourseDetailHero';
import CourseInvestmentCardCongressos from '@/components/cursos/CourseInvestmentCardCongressos';
import CourseAbout from '@/components/cursos/CourseAbout';
import CourseCurriculum from '@/components/cursos/CourseCurriculum';
import CourseFaculty from '@/components/cursos/CourseFaculty';
import CourseEvaluation from '@/components/cursos/CourseEvaluation';
import CourseWorkload from '@/components/cursos/CourseWorkload';
import { SectionTitle } from '@/components/ui/section-title';
import CourseDifferentialsSection from '@/components/cursos/CourseDifferentialsSection';
import styles from '@/app/(site)/cursos/[slug]/page.module.css';

interface Course {
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
  contact?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  price?: number;
  originalPrice?: number;
  precoMatricula?: number;
  monthlyPrice?: string;
  startDate?: string;
  workload?: string;
  category?: string;
  diferenciais?: string[];
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

interface CourseDetailCongressosProps {
  course: Course;
}

export default function CourseDetailCongressos({ course }: CourseDetailCongressosProps) {
  return (
    <div className={styles.pageContainer}>
      <CourseDetailHero course={course} />

      <div className={styles.mobileFloatingButton}>
        <a
          href={course.moreInfoUrl || 'https://ijep.com.br/inscricao/aluno'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {course.ctaLabel || 'Adquira Agora'}
        </a>
      </div>

      <div className={styles.mobileInvestmentCard}>
        <CourseInvestmentCardCongressos course={course} />
      </div>

      <div className={styles.contentGrid}>
        <main className={styles.mainContent}>
          <CourseAbout
            fullDescription={course.fullDescription ?? []}
            highlights={course.highlights ?? []}
          />

          <CourseDifferentialsSection items={course.diferenciais} />

          {course.justificativa && course.justificativa.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>Por que participar</SectionTitle>
              <div className={styles.sectionContent}>
                {course.justificativa.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {course.objetivos && course.objetivos.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>O que você vai aprender</SectionTitle>
              <div className={styles.sectionContent}>
                <ul className={styles.list}>
                  {course.objetivos.map((objetivo: string, index: number) => (
                    <li key={index}>{objetivo}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {course.publico && course.publico.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>Para quem é</SectionTitle>
              <div className={styles.sectionContent}>
                {course.publico.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {course.curriculum && course.curriculum.length > 0 && (
            <CourseCurriculum curriculum={course.curriculum} />
          )}

          {course.avaliacao && course.avaliacao.length > 0 && course.avaliacao[0] !== 'Não disponível' && (
            <CourseEvaluation avaliacao={course.avaliacao} />
          )}

          {course.cargahoraria && (
            <CourseWorkload cargahoraria={course.cargahoraria} />
          )}

          {((course.professores && course.professores.length > 0) ||
            (course.coordenacao && course.coordenacao.coordenador)) && (
            <CourseFaculty
              professores={course.professores || []}
              coordenacao={course.coordenacao}
            />
          )}

          <section className={styles.section}>
            <SectionTitle>Garanta seu acesso</SectionTitle>
            <div className="flex flex-col gap-4 text-[#42526b]">
              <p>
                Tenha 12 meses de acesso às gravações dos congressos para estudar quando quiser e rever as aulas quantas vezes precisar.
              </p>
              <p>
                O conteúdo é ministrado por psicoterapeutas especialistas e analistas junguianos experientes, oferecendo uma jornada completa de aprofundamento.
              </p>
            </div>
          </section>
        </main>

        <aside className={styles.floatingSidebar}>
          <div className={styles.stickyCard}>
            <CourseInvestmentCardCongressos course={course} />
          </div>
        </aside>
      </div>
    </div>
  );
}
