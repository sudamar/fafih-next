import { PageHeading } from '@/components/ui/page-heading'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl space-y-8">
        <PageHeading title="FAFIH" subtitle="Portal institucional em construção" />
        <p className="text-sm text-neutral-500">
          Esta estrutura foi preparada para receber páginas, componentes reutilizáveis e assets públicos de forma
          organizada. Inicie adicionando suas seções em <code>src/components</code> e reutilize-as nos grupos de rotas
          dentro de <code>src/app</code>.
        </p>
      </div>
    </div>
  )
}
