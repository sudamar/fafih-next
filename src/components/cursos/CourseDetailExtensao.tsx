import CourseDetailHero from '@/components/cursos/CourseDetailHero';
import CourseInvestmentCard from '@/components/cursos/CourseInvestmentCard';
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
  modalidade?: string;
  duration?: string;
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

interface CourseDetailExtensaoProps {
  course: Course;
}

export default function CourseDetailExtensao({ course }: CourseDetailExtensaoProps) {
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

          {/* Informações de Acesso (para cursos online) */}
          {course.modalidade === 'Online' && (
            <section className={styles.section}>
              <SectionTitle>Modalidade e Acesso</SectionTitle>
              <div className={styles.sectionContent}>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💻</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-[#152c61]">Curso 100% Online</h4>
                      <p className="text-[#42526b]">
                        Acesso completo ao conteúdo gravado com flexibilidade para estudar no seu próprio ritmo.
                      </p>
                      {course.duration && (
                        <p className="text-[#42526b] mt-2">
                          <strong>Período de acesso:</strong> {course.duration}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Currículo/Programação */}
          {course.curriculum && course.curriculum.length > 0 && (
            <CourseCurriculum curriculum={course.curriculum} />
          )}

          {/* Avaliação */}
          {course.avaliacao && course.avaliacao.length > 0 && course.avaliacao[0] !== "Não disponível" && (
            <CourseEvaluation avaliacao={course.avaliacao} />
          )}

          {/* Carga Horária */}
          {course.cargahoraria && (
            <CourseWorkload cargahoraria={course.cargahoraria} />
          )}

          {/* Corpo Docente/Coordenação */}
          {((course.professores && course.professores.length > 0) ||
            (course.coordenacao && course.coordenacao.coordenador)) && (
            <CourseFaculty
              professores={course.professores || []}
              coordenacao={course.coordenacao}
            />
          )}

          {/* Fale com a Secretaria */}
          <section className={styles.section}>
            <SectionTitle>Fale com a Secretaria</SectionTitle>
            <div className={styles.contactSection}>
              <p className={styles.contactDescription}>
                Tem dúvidas sobre o curso? Nossa equipe está pronta para ajudar você!
              </p>
              <div className={styles.contactGrid}>
                {course.contact?.phone && (
                  <a href={`tel:${course.contact.phone}`} className={styles.contactCard}>
                    <div className={styles.contactIcon}>📞</div>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactLabel}>Telefone</div>
                      <div className={styles.contactValue}>{course.contact.phone}</div>
                    </div>
                  </a>
                )}
                {course.contact?.whatsapp && (
                  <a
                    href={`https://wa.me/${course.contact.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactCard}
                  >
                    <div className={styles.contactIcon}>💬</div>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactLabel}>WhatsApp</div>
                      <div className={styles.contactValue}>{course.contact.whatsapp}</div>
                    </div>
                  </a>
                )}
                {course.contact?.email && (
                  <a href={`mailto:${course.contact.email}`} className={styles.contactCard}>
                    <div className={styles.contactIcon}>✉️</div>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactLabel}>E-mail</div>
                      <div className={styles.contactValue}>{course.contact.email}</div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="mt-12 bg-gradient-to-r from-[#152c61] to-[#1e4088] p-8 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-lg mb-6 opacity-90">
              Inscreva-se agora e comece sua jornada de aprendizado!
            </p>
            <a
              href="https://ijep.com.br/inscricao/aluno"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#152c61] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Fazer Inscrição
            </a>
          </section>
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
