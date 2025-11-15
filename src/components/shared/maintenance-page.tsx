import Image from 'next/image'

interface MaintenancePageProps {
  siteName?: string
}

export function MaintenancePage({ siteName = 'FAFIH' }: MaintenancePageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-center text-primary">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl bg-white/60 p-10 shadow-lg backdrop-blur">
        <Image
          src="/assets/images/manutencao_2.jpg"
          alt="Site em manutenção"
          width={420}
          height={320}
          className="h-auto w-full max-w-md"
          priority
        />
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Estamos ajustando o site</p>
          <h1 className="text-3xl font-bold text-primary">
            {siteName} está passando por uma manutenção programada para melhorar sua experiência
          </h1>
          <p className="text-base text-primary/80">
            Voltaremos em breve com tudo pronto para você. Agradecemos a compreensão e pedimos que tente acessar novamente
            nas próximas horas. 
          </p>
        </div>
      </div>
    </div>
  )
}
