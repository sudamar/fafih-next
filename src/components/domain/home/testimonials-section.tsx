import { DepoimentosBasicoLista } from '@/components/ui/depoimentos-basico-lista'
import { DepoimentosService } from '@/lib/features/depoimentos/services/depoimentos.service'

export function TestimonialsSection() {
  const depoimentos = DepoimentosService.getAll()

  return (
    <section id="depoimentos" className="bg-background px-6 py-20 lg:px-8 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Depoimentos</h2>
        <DepoimentosBasicoLista depoimentos={depoimentos} />
      </div>
    </section>
  )
}
