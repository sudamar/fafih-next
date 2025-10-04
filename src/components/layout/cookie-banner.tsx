'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cookieConsentFafih'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    let consentGiven = false

    try {
      consentGiven = localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      consentGiven = false
    }

    setHasConsented(consentGiven)

    if (!consentGiven) {
      const timeout = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timeout)
    }

    return () => undefined
  }, [])

  function handleAccept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Ignora ambientes em que o localStorage não esteja disponível.
    }

    setHasConsented(true)
    setVisible(false)
  }

  if (!visible || hasConsented) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[3000] flex flex-wrap items-center gap-4 bg-primary/95 px-6 py-4 text-white shadow-lg">
      <p className="flex-1 text-sm leading-relaxed">
        Este site utiliza cookies para garantir que você obtenha a melhor experiência de navegação. Ao continuar, você
        concorda com nossa{' '}
        <a href="#" className="font-semibold text-secondary-light underline">
          Política de Cookies
        </a>
        .
      </p>
      <button
        type="button"
        onClick={handleAccept}
        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary transition hover:bg-neutral-100"
      >
        Aceitar
      </button>
    </div>
  )
}
