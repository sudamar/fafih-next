import type { Metadata } from 'next'
import { Lato, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lato' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'FAFIH — Faculdade de Artes, Filosofia e do Imaginário Humano',
  description:
    'Portal institucional da FAFIH com informações sobre cursos, professores, notícias e iniciativas acadêmicas.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${lato.variable} ${montserrat.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
