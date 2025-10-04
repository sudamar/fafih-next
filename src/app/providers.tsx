'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OuvidoriaModalProvider } from '@/components/providers/ouvidoria-modal-provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <OuvidoriaModalProvider>{children}</OuvidoriaModalProvider>
    </QueryClientProvider>
  )
}
