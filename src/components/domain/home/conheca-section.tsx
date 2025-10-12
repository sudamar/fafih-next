export function ConhecaSection() {
  const paragraphs = [
    'A FAFIH - Faculdade de Arte, Filosofia e do Imaginário Humano é uma instituição inovadora dedicada à exploração de temas transdisciplinares que conectam arte, filosofia, psicologia, ciências da religião e o estudo da imaginação e comunicação humanas.',
    'Nossa abordagem acadêmica promove uma compreensão ampla da experiência humana ao integrar saberes de diferentes áreas, sempre sob um olhar crítico, sensível e ético, alinhado às demandas do mundo contemporâneo.',
    'Mantida pelo IJEP - Instituto Junguiano de Ensino e Pesquisa, a FAFIH foi credenciada pelo MEC (Portaria nº 579, de 25/06/2024) e oferece cursos que unem excelência acadêmica, impacto social e desenvolvimento integral.',
  ]

  return (
    <section id="conheca-fafih" className="bg-background px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-4xl text-neutral-700">
        <h2 className="section-title mb-12">Conheça a FAFIH</h2>
        <div className="space-y-6 text-justify text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <center>
          <a
            href="/conheca-a-fafih"
            className="mt-10 inline-flex rounded-full bg-secondary px-8 py-3 font-semibold text-white transition hover:bg-primary"
          >
            Saiba Mais
          </a>
        </center>
      </div>
    </section>
  )
}
