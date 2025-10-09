import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/services/courses';
import CourseDetailHero from '@/components/cursos/CourseDetailHero';
import CourseInvestmentCard from '@/components/cursos/CourseInvestmentCard';
import CourseAbout from '@/components/cursos/CourseAbout';
import CourseHighlights from '@/components/cursos/CourseHighlights';
import CourseCurriculum from '@/components/cursos/CourseCurriculum';
import CourseFaculty from '@/components/cursos/CourseFaculty';
import CourseEvaluation from '@/components/cursos/CourseEvaluation';
import CourseWorkload from '@/components/cursos/CourseWorkload';
import { DepoimentosBasicoLista } from '@/components/ui/depoimentos-basico-lista';
import styles from './page.module.css';

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  // Apenas cursos de pós-graduação/especialização
  if (course.category !== 'especializacao') {
    notFound();
  }

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
            fullDescription={course.fullDescription}
            highlights={course.highlights}
          />

          {/* Justificativa */}
          {course.justificativa && course.justificativa.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Justificativa</h2>
              <div className={styles.sectionContent}>
                {course.justificativa.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* Objetivos */}
          {course.objetivos && course.objetivos.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Objetivos</h2>
              <div className={styles.sectionContent}>
                <ul className={styles.list}>
                  {course.objetivos.map((objetivo, index) => (
                    <li key={index}>{objetivo}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Público-alvo */}
          {course.publico && course.publico.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Para quem é este curso</h2>
              <div className={styles.sectionContent}>
                {course.publico.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* Currículo */}
          {course.curriculum && course.curriculum.length > 0 && (
            <CourseCurriculum curriculum={course.curriculum} />
          )}

          {/* Corpo Docente */}
          {course.professores && course.professores.length > 0 && (
            <CourseFaculty
              professores={course.professores}
              coordenacao={course.coordenacao}
            />
          )}

          {/* Avaliação */}
          {course.avaliacao && course.avaliacao.length > 0 && (
            <CourseEvaluation avaliacao={course.avaliacao} />
          )}

          {/* Carga Horária */}
          {course.cargahoraria && (
            <CourseWorkload cargahoraria={course.cargahoraria} />
          )}

          {/* Depoimentos */}
          {course.testimonials && course.testimonials.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Depoimentos de Alunos</h2>
              <DepoimentosBasicoLista
                depoimentos={course.testimonials.map((t: any) => ({
                  quote: t.text || t.quote,
                  author: t.author,
                  role: t.role
                }))}
              />
            </section>
          )}

          {/* Fale com a Secretaria */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Fale com a Secretaria</h2>
            <div className={styles.contactSection}>
              <p className={styles.contactDescription}>
                Tem dúvidas sobre o curso? Nossa equipe está pronta para ajudar você!
              </p>
              <div className={styles.contactGrid}>
                <a href={`tel:${course.contact?.phone}`} className={styles.contactCard}>
                  <div className={styles.contactIcon}>📞</div>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactLabel}>Telefone</div>
                    <div className={styles.contactValue}>{course.contact?.phone}</div>
                  </div>
                </a>
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
                <a href={`mailto:${course.contact?.email}`} className={styles.contactCard}>
                  <div className={styles.contactIcon}>✉️</div>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactLabel}>E-mail</div>
                    <div className={styles.contactValue}>{course.contact?.email}</div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Floating Investment Card - Desktop Only */}
        <aside className={styles.floatingSidebar}>
          <div className={styles.stickyCard}>
            <CourseInvestmentCard course={course} />
          </div>
        </aside>
      </div>
    </div>
  );
}
