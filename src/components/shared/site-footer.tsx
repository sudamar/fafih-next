'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Mail, Phone, Linkedin, Instagram, Youtube, CirclePlay, LucideIcon } from 'lucide-react'
import {
  footerContact,
  footerLinkGroups,
  footerSocials,
} from '@/lib/data/homepage'

const socialIconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: CirclePlay,
}

export function SiteFooter() {
  const [updatedDate, setUpdatedDate] = useState('')

  useEffect(() => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const currentYear = today.getFullYear()

    let semesterStartMonth
    let semesterStartYear = currentYear

    if (currentMonth >= 2 && currentMonth <= 7) {
      semesterStartMonth = 2
    } else {
      semesterStartMonth = 8
      if (currentMonth === 1) {
        semesterStartYear = currentYear - 1
      }
    }

    const generatedDate = new Date(semesterStartYear, semesterStartMonth - 1, 1)
    const formattedDate = generatedDate.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    setUpdatedDate(formattedDate)
  }, [])

  return (
    <footer id="contato" className="bg-footer-blue text-white">
      {/* Footer Top - Grid de 5 colunas */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Coluna 1: Logo */}
          <div className="lg:col-span-1 pr-10 relative h-24 -ml-[65px]">
            <Image
              src="/assets/images/logo-fundo-azul.png"
              alt="Logo FAFIH no rodapé"
              width={225}
              height={113}
              className="scale-[1.54] origin-left mr-5"
            />
          </div>

          {/* Coluna 2: Institucional */}
          <div className="lg:col-span-1">
            <h4 className="text-base font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              {footerLinkGroups
                .find((group) => group.title === 'Institucional')
                ?.links.map((link) => (
                  <li key={link.label}>
                    {link.label === 'Política de Cookies' && link.href === '#' ? (
                      <span className="opacity-70" title={link.description}>
                        {link.label}
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        className="transition hover:text-white/90"
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Coluna 3: Cursos */}
          <div className="lg:col-span-1">
            <h4 className="text-base font-semibold mb-4">Cursos</h4>
            <ul className="space-y-2 text-sm">
              {footerLinkGroups
                .find((group) => group.title === 'Cursos')
                ?.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition hover:text-white/90"
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Coluna 4: Comunidade Acadêmica */}
          <div className="lg:col-span-1">
            <h4 className="text-base font-semibold mb-4">Comunidade Acadêmica</h4>
            <ul className="space-y-2 text-sm">
              {footerLinkGroups
                .find((group) => group.title === 'Comunidade Acadêmica')
                ?.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition hover:text-white/90"
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Coluna 5: Contato + Redes Sociais */}
          <div className="lg:col-span-1">
            <h4 className="text-base font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm mb-6">
              {footerContact.map((item) => {
                if (item.type === 'email') {
                  return (
                    <li key={item.label} className="flex items-start gap-2">
                      <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                      <a href={item.href} className="transition hover:text-white/90 break-all">
                        {item.label}
                      </a>
                    </li>
                  )
                }

                if (item.type === 'phone') {
                  return (
                    <li key={item.label} className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <a href={item.href} className="transition hover:text-white/90">
                        {item.label}
                      </a>
                    </li>
                  )
                }

                if (item.type === 'link') {
                  return (
                    <li key={item.label}>
                      <a href={item.href} className="transition hover:text-white/90">
                        {item.label}
                      </a>
                    </li>
                  )
                }

                return null
              })}
            </ul>

            {/* Redes Sociais */}
            <div className="flex items-center gap-3 mb-6">
              {footerSocials.map((social) => {
                const Icon = socialIconMap[social.platform]
                if (!Icon) return null

                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                    aria-label={social.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            {/* Selo e-MEC embaixo das redes sociais */}
            <div>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/images/imagem-valida-mec-fafih.png"
                  alt="Consulte aqui o cadastro da FAFIH no e-MEC"
                  width={208}
                  height={104}
                  className="h-auto w-auto max-h-26"
                />
              </a>
            </div>
          </div>

          {/* Coluna 6: Vazia (removida) */}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-white/80 space-y-1">
          <p>Credenciada EaD pela Portaria Ministerial nº 579, de 25/06/2024, DOU nº 122, de 27/06/2024, seção 1, p. 63.</p>
          <p>Mantida pelo IJEP - Instituto Junguiano de Ensino e Pesquisa</p>
          {updatedDate && <p>Página atualizada em {updatedDate}.</p>}
          <p>© {new Date().getFullYear()} FAFIH - Faculdade de Artes, Filosofia e do Imaginário Humano. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
