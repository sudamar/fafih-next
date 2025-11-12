import CourseDetailHero from '@/components/cursos/CourseDetailHero'
import CourseInvestmentCardCongressos from '@/components/cursos/CourseInvestmentCardCongressos'
import CourseAbout from '@/components/cursos/CourseAbout'
import CourseCurriculum from '@/components/cursos/CourseCurriculum'
import CourseFaculty from '@/components/cursos/CourseFaculty'
import CourseEvaluation from '@/components/cursos/CourseEvaluation'
import CourseWorkload from '@/components/cursos/CourseWorkload'
import { SectionTitle } from '@/components/ui/section-title'
import CourseDifferentialsSection from '@/components/cursos/CourseDifferentialsSection'
import styles from '@/app/(site)/cursos/[slug]/page.module.css'
import type { CourseDetail } from '@/lib/features/courses/types/Course.type'
import { CourseJustificativa } from '@/components/cursos/CourseJustificativa'
import { CourseObjetivos } from '@/components/cursos/CourseObjetivos'
import { CoursePublicoAlvo } from '@/components/cursos/CoursePublicoAlvo'

interface CourseDetailCongressosProps {
  course: CourseDetail
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

          <CourseJustificativa justificativa={course.justificativa} title="Por que participar" />

          <CourseObjetivos objetivos={course.objetivos} title="O que você vai aprender" />

          <CoursePublicoAlvo publico={course.publico} title="Para quem é" />

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
