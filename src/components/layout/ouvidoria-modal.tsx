'use client'

import { FormEvent } from 'react'
import { useOuvidoriaModal } from '@/components/providers/ouvidoria-modal-provider'

export function OuvidoriaModal() {
  const { isOpen, close } = useOuvidoriaModal()

  if (!isOpen) {
    return null
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    close()
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 px-4 py-6"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-6 top-6 text-2xl font-bold text-neutral-400 transition hover:text-neutral-700"
          aria-label="Fechar ouvidoria"
          onClick={close}
        >
          &times;
        </button>

        <h2 className="mb-6 font-display text-2xl text-primary">Canal da Ouvidoria</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ouvidoria-nome" className="mb-2 block font-semibold text-neutral-700">
              Nome Completo
            </label>
            <input
              id="ouvidoria-nome"
              name="nome"
              type="text"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <div>
            <label htmlFor="ouvidoria-email" className="mb-2 block font-semibold text-neutral-700">
              E-mail para Contato
            </label>
            <input
              id="ouvidoria-email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <div>
            <label htmlFor="ouvidoria-telefone" className="mb-2 block font-semibold text-neutral-700">
              Telefone/WhatsApp
            </label>
            <input
              id="ouvidoria-telefone"
              name="telefone"
              type="tel"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <div>
            <label htmlFor="ouvidoria-assunto" className="mb-2 block font-semibold text-neutral-700">
              Assunto
            </label>
            <select
              id="ouvidoria-assunto"
              name="assunto"
              required
              defaultValue=""
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
            >
              <option value="" disabled>
                Selecione o motivo do contato...
              </option>
              <option value="sugestao">Sugestão</option>
              <option value="elogio">Elogio</option>
              <option value="reclamacao">Reclamação</option>
              <option value="denuncia">Denúncia</option>
            </select>
          </div>

          <div>
            <label htmlFor="ouvidoria-mensagem" className="mb-2 block font-semibold text-neutral-700">
              Mensagem
            </label>
            <textarea
              id="ouvidoria-mensagem"
              name="mensagem"
              required
              rows={5}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <p className="text-center text-sm text-neutral-600">
            A resposta da sua manifestação será enviada para o e-mail informado.
          </p>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-primary/90"
          >
            Enviar Manifestação
          </button>
        </form>
      </div>
    </div>
  )
}
