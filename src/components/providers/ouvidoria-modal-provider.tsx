'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface OuvidoriaModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const OuvidoriaModalContext = createContext<OuvidoriaModalContextValue | undefined>(undefined)

export function OuvidoriaModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo<OuvidoriaModalContextValue>(
    () => ({ isOpen, open, close }),
    [isOpen, open, close]
  )

  return <OuvidoriaModalContext.Provider value={value}>{children}</OuvidoriaModalContext.Provider>
}

export function useOuvidoriaModal() {
  const context = useContext(OuvidoriaModalContext)
  if (!context) {
    throw new Error('useOuvidoriaModal must be used within a OuvidoriaModalProvider')
  }
  return context
}
