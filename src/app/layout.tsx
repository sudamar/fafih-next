import type { Metadata } from 'next'
import { Lato, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { MaintenancePage } from '@/components/shared/maintenance-page'
import { getConfiguracoesFafih } from '@/lib/config/startup'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lato' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'FAFIH — Faculdade de Artes, Filosofia e do Imaginário Humano',
  description:
    'Portal institucional da FAFIH com informações sobre cursos, professores, notícias e iniciativas acadêmicas.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/assets/images/logo-fundo-azul.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon-32x32.png' },
      { rel: 'icon', url: '/favicon-16x16.png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getConfiguracoesFafih()
  const manutencaoAtiva = (() => {
    const flag = config?.manutencao as boolean | string | null | undefined

    if (flag === true) return true
    if (flag === false || flag === null || flag === undefined) return false

    if (typeof flag === 'string') {
      return flag.trim().toLowerCase() === 'true'
    }

    return Boolean(flag)
  })()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${lato.variable} ${montserrat.variable} font-sans`}>
        {manutencaoAtiva ? <MaintenancePage siteName={config?.nomeSite} /> : <Providers>{children}</Providers>}
      </body>
    </html>
  )
}
