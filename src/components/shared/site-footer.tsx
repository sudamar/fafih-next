'use client'

import Image from 'next/image'
import { Mail, Phone, Linkedin, Instagram, Youtube, CirclePlay, ArrowUpRight, LucideIcon } from 'lucide-react'
import {
  footerBottomText,
  footerContact,
  footerLinkGroups,
  footerSocials,
} from '@/lib/data/homepage'
import { useOuvidoriaModal } from '@/components/providers/ouvidoria-modal-provider'

const socialIconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: CirclePlay,
}

export function SiteFooter() {
  const { open: openOuvidoria } = useOuvidoriaModal()

  return (
    <footer id="contato" className="bg-footer-blue text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-1 flex-col gap-6 md:max-w-xs">
          <Image
            src="https://i.imgur.com/ywaVFnj.png"
            alt="Logo FAFIH"
            width={180}
            height={80}
            className="h-20 w-auto"
          />
          <div className="rounded-lg bg-white/10 p-4 text-sm leading-relaxed">
            <p>
              Credenciada EaD pela Portaria Ministerial nº 579, de 25/06/2024, DOU nº 122, de 27/06/2024, seção 1, p. 63.
            </p>
            <p className="mt-2">Mantida pelo IJEP - Instituto Junguiano de Ensino e Pesquisa</p>
          </div>
        </div>

        <div className="grid flex-[2] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerLinkGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="text-lg font-semibold uppercase tracking-wide">{group.title}</h4>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => {
                  if (link.label === 'Política de Cookies' && link.href === '#') {
                    return (
                      <li key={link.label} className="opacity-70">
                        <span title={link.description}>Política de Cookies</span>
                      </li>
                    )
                  }

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1 transition hover:text-white"
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                        {link.external ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-6 md:max-w-xs">
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wide">Contato</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {footerContact.map((item) => {
                if (item.type === 'link' && item.label.toLowerCase() === 'ouvidoria') {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-left transition hover:text-white"
                        onClick={openOuvidoria}
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                }

                if (item.type === 'link') {
                  return (
                    <li key={item.label}>
                      <a href={item.href} className="transition hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  )
                }

                if (item.type === 'email') {
                  return (
                    <li key={item.label} className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" />
                      <a href={item.href} className="transition hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  )
                }

                if (item.type === 'phone') {
                  return (
                    <li key={item.label} className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <a href={item.href} className="transition hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  )
                }

                return null
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wide">Redes sociais</h4>
            <div className="mt-4 flex items-center gap-3">
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
          </div>

          <div className="rounded-lg bg-white p-4">
            <a
              href="#"
              target="_blank"
              className="flex items-center justify-center"
              rel="noopener noreferrer"
            >
              <Image
                src="https://i.imgur.com/i7LTAu5.png"
                alt="Consulte aqui o cadastro da instituição no e-MEC"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-white/80">
          {footerBottomText.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </footer>
  )
}
