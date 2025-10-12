'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useOuvidoriaModal } from '@/components/providers/ouvidoria-modal-provider'

interface NavChild {
  label: string
  href?: string
  external?: boolean
  action?: 'ouvidoria'
}

interface NavItem {
  label: string
  href: string
  external?: boolean
  children?: NavChild[]
}

const navItems: NavItem[] = [
  {
    label: 'Início',
    href: '/',
  },
  {
    label: 'Institucional',
    href: '#conheca-fafih',
    children: [
      { label: 'Conheça a FAFIH', href: 'conheca-fafih.html' },
      { label: 'Focos Acadêmicos', href: '#focos' },
      { label: 'Corpo Docente', href: '/corpo-docente' },
      { label: 'Calendário Acadêmico', href: 'calendario-academico.html' },
      { label: 'Biblioteca', href: 'https://ijep.com.br/biblioteca-ijep', external: true },
      { label: 'Egressos', href: 'https://ijep.com.br/login-aluno', external: true },
      { label: 'Serviços para a Comunidade', href: 'servicos-comunidade.html' },
      { label: 'Notícias', href: '#noticias' },
      { label: 'Mantenedora', href: 'https://ijep.com.br/', external: true },
    ],
  },
  {
    label: 'Cursos',
    href: '#cursos',
    children: [
      { label: 'Todos', href: '/cursos' },
      { label: 'Graduação', href: '/cursos?filter=graduacao' },
      { label: 'Pós-Graduação', href: '/cursos?filter=especializacao' },
      { label: 'Extensão', href: '/cursos?filter=extensao' },
      { label: 'Eventos', href: '/cursos?filter=eventos' },
      { label: 'Formas de Ingresso', href: 'formas-de-ingresso.html' },
      { label: 'Regulamentos', href: 'regulamentos.html' },
      { label: 'Polos', href: '/polos' },
    ],
  },
  {
    label: 'Iniciação Científica',
    href: '/iniciacao-cientifica',
  },
  {
    label: 'Extensão',
    href: '/extensao',
  },
  {
    label: 'Portal do Aluno',
    href: 'https://ijep.com.br/login-aluno',
    external: true,
  },
  {
    label: 'Contato',
    href: '#contato',
    children: [
      { label: 'Ouvidoria', href: '/ouvidoria' },
      { label: 'Perguntas Frequentes', href: '/faq' },
      { label: 'Consulta de Diplomas', href: '/consulte-diploma' },
    ],
  },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { open: openOuvidoria } = useOuvidoriaModal()

  function toggleDropdown(label: string) {
    setActiveDropdown((current) => (current === label ? null : label))
  }

  function handleChildClick(child: NavChild) {
    if (child.action === 'ouvidoria') {
      openOuvidoria()
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-card-bg shadow-header header-gradient-border">
      <div className="mx-auto flex w-full max-w-[1280px] flex-nowrap items-center justify-between gap-4 px-6 py-2 md:px-8">
        <div className="flex flex-none items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="https://i.imgur.com/2wUar6U.png"
              alt="Logo FAFIH"
              width={140}
              height={70}
              className="h-[70px] w-auto"
              priority
            />
            <span className="hidden text-[0.81rem] font-display font-bold uppercase leading-tight text-primary sm:block">
              Faculdade de Artes,
              <br />
              Filosofia e do
              <br />
              Imaginário Humano
            </span>
          </Link>
        </div>

        <nav className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-5">
            {navItems.map((item) => {
              const hasDropdown = Boolean(item.children && item.children.length)

              const itemContent = (
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-[0.855rem] font-semibold text-primary transition hover:text-secondary"
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                  {hasDropdown ? <ChevronDown className="h-4 w-4" /> : null}
                </a>
              )

              return (
                <li key={item.label} className="group relative">
                  {itemContent}

                  {hasDropdown ? (
                    <div className="invisible absolute left-0 top-full w-60 rounded-lg border-t-4 border-primary bg-white pt-5 pb-3 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                      <ul className="space-y-2">
                        {item.children?.map((child) => {
                          if (child.action === 'ouvidoria') {
                            return (
                              <li key={child.label}>
                                <button
                                  type="button"
                                  className="w-full px-5 py-2 text-left text-[0.81rem] font-semibold text-primary transition hover:bg-neutral-100"
                                  onClick={() => openOuvidoria()}
                                >
                                  {child.label}
                                </button>
                              </li>
                            )
                          }

                          if (!child.href) {
                            return null
                          }

                          return (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="block px-5 py-2 text-[0.81rem] font-semibold text-primary transition hover:bg-neutral-100"
                                {...(child.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              >
                                {child.label}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden flex-none items-center justify-end gap-4 lg:flex">
          <a
            href="https://ijep.com.br/inscricao/aluno"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-footer-blue px-6 py-2 text-[0.81rem] font-semibold text-white transition hover:bg-blue-600"
          >
            Inscreva-se
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-primary/10 p-2 text-primary lg:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-neutral-200 bg-card-bg shadow-lg lg:hidden">
          <nav className="px-6 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const hasDropdown = Boolean(item.children && item.children.length)

                return (
                  <li key={item.label} className="border-b border-neutral-200 pb-2 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        className="py-2 text-[0.9rem] font-semibold text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {item.label}
                      </a>

                      {hasDropdown ? (
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.label)}
                          className="rounded-full p-2 text-primary"
                          aria-label={`Alternar ${item.label}`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          />
                        </button>
                      ) : null}
                    </div>

                    {hasDropdown && activeDropdown === item.label ? (
                      <ul className="mt-2 space-y-2 rounded-lg bg-neutral-100 p-3">
                        {item.children?.map((child) => {
                          if (child.action === 'ouvidoria') {
                            return (
                              <li key={child.label}>
                                <button
                                  type="button"
                                  className="w-full text-left text-[0.81rem] font-semibold text-primary"
                                  onClick={() => handleChildClick(child)}
                                >
                                  {child.label}
                                </button>
                              </li>
                            )
                          }

                          if (!child.href) {
                            return null
                          }

                          return (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="block text-[0.81rem] font-semibold text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                                {...(child.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              >
                                {child.label}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <div className="mt-4">
              <a
                href="https://ijep.com.br/inscricao/aluno"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-footer-blue px-6 py-3 text-[0.81rem] font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscreva-se
              </a>
            </div>
          </nav>
        </div>
      ) : null}

    </header>
  )
}
