import CourseDetailHero from '@/components/cursos/CourseDetailHero'
import CourseInvestmentCard from '@/components/cursos/CourseInvestmentCard'
import CourseAbout from '@/components/cursos/CourseAbout'
import CourseCurriculum from '@/components/cursos/CourseCurriculum'
import CourseFaculty from '@/components/cursos/CourseFaculty'
import CourseEvaluation from '@/components/cursos/CourseEvaluation'
import CourseWorkload from '@/components/cursos/CourseWorkload'
import CourseCoordenacao from '@/components/cursos/CourseCoordenacao'
import CourseCorpoDocente from '@/components/cursos/CourseCorpoDocente'
import { DepoimentosBasicoLista } from '@/components/ui/depoimentos-basico-lista'
import { SectionTitle } from '@/components/ui/section-title'
import { ContatosSecretaria } from '@/components/shared/contatos-secretaria'
import CourseDifferentialsSection from '@/components/cursos/CourseDifferentialsSection'
import { CourseJustificativa } from '@/components/cursos/CourseJustificativa'
import { CourseObjetivos } from '@/components/cursos/CourseObjetivos'
import { CoursePublicoAlvo } from '@/components/cursos/CoursePublicoAlvo'
import { CourseCardSobreJung } from '@/components/cursos/CourseCardSobreJung'
import styles from '@/app/(site)/cursos/[slug]/page.module.css'
import type { CourseDetail } from '@/lib/features/courses/types/Course.type'

interface CourseDetailPosGraduacaoProps {
  course: CourseDetail
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

          <CourseJustificativa justificativa={course.justificativa} />

          <CourseObjetivos objetivos={course.objetivos} />

          <CoursePublicoAlvo publico={course.publico} />

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

          {/* Coordenação - apenas para cursos de especialização */}
          {course.category === 'especializacao' && course.coordenacao && (
            <CourseCoordenacao coordenacao={course.coordenacao} />
          )}

          {/* Corpo Docente - apenas para cursos de especialização */}
          {course.category === 'especializacao' && (
            <CourseCorpoDocente
              ids={[]}
              detalhamento={false}
              maxDescricao={100}
            />
          )}

          {/* Corpo Docente - para outros cursos */}
          {course.category !== 'especializacao' && course.professores.length > 0 && (
            <CourseFaculty
              professores={course.professores}
            />
          )}

          {/* Depoimentos */}
          {course.testimonials && course.testimonials.length > 0 && (
            <section className={styles.section}>
              <SectionTitle>Depoimentos de Alunos</SectionTitle>
              <DepoimentosBasicoLista
                depoimentos={course.testimonials.map((testimonial) => ({
                  quote: testimonial.quote,
                  author: testimonial.author,
                  role: testimonial.role,
                }))}
              />
            </section>
          )}

          {course.category === 'especializacao' && <CourseCardSobreJung />}

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
