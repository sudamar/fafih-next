import Image from 'next/image'
import { SectionTitle } from '@/components/ui/section-title'

interface Coordenacao {
  coordenador: string
  descricao: string
  foto?: string | null
}

interface CourseCoordenacaoProps {
  coordenacao: Coordenacao
}

export default function CourseCoordenacao({ coordenacao }: CourseCoordenacaoProps) {
  if (!coordenacao || !coordenacao.coordenador) {
    return null
  }

  return (
    <section className="bg-white p-8 rounded-[18px] shadow-[0_8px_20px_rgba(15,32,68,0.08)]">
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
  )
}
