/**
 * Arquivo de instrumentação do Next.js
 * Este arquivo é executado UMA ÚNICA VEZ quando o servidor é iniciado
 * Documentação: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

import { Startup } from '@/lib/config/startup'

export async function register() {
  // Executar apenas no ambiente Node.js (servidor)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[Instrumentation] Executando no servidor Node.js')
    await Startup()
  }
}
