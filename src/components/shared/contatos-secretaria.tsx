import { SectionTitle } from '@/components/ui/section-title'

const CONTACTS = [
  {
    label: 'Telefone',
    value: '(11) 3456-7890',
    href: 'tel:+551134567890',
    icon: '📞',
  },
  {
    label: 'WhatsApp',
    value: '(11) 99999-8888',
    href: 'https://wa.me/5511999998888',
    icon: '💬',
  },
  {
    label: 'E-mail',
    value: 'contato@fafih.edu.br',
    href: 'mailto:contato@fafih.edu.br',
    icon: '✉️',
  },
]

export function ContatosSecretaria() {
  return (
    <section className="rounded-3xl bg-white px-6 py-10 shadow-lg shadow-neutral-900/5 sm:px-10">
      <SectionTitle>Fale com a Secretaria</SectionTitle>

      <p className="mt-4 text-center text-base text-neutral-600">
        Tem dúvidas? Nossa secretaria está pronta para ajudar você!
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTACTS.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-4 rounded-xl border border-primary/15 bg-primary/5 p-4 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-2xl shadow-md shadow-neutral-900/10">
              {contact.icon}
            </span>
            <span className="flex flex-col gap-1 text-sm font-semibold text-primary">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                {contact.label}
              </span>
              {contact.value}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
