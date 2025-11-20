import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cache simples para evitar muitas queries
let maintenanceCache: { value: boolean; timestamp: number } | null = null
const CACHE_TTL = 30000 // 30 segundos

async function checkMaintenanceMode(): Promise<boolean> {
  // Verificar cache
  const now = Date.now()
  if (maintenanceCache && now - maintenanceCache.timestamp < CACHE_TTL) {
    return maintenanceCache.value
  }

  try {
    // Usar fetch direto (compatível com Edge Runtime)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/settings?select=manutencao&order=id.desc&limit=1`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
      }
    )

    if (!response.ok) {
      console.error('[Middleware] Erro ao buscar configuração:', response.status)
      return false
    }

    const data = await response.json()
    const isMaintenanceMode = data[0]?.manutencao === true

    // Atualizar cache
    maintenanceCache = {
      value: isMaintenanceMode,
      timestamp: now,
    }

    return isMaintenanceMode
  } catch (err) {
    console.error('[Middleware] Exceção ao verificar manutenção:', err)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acesso à página de manutenção e assets estáticos
  if (
    pathname === '/manutencao' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/')
  ) {
    return NextResponse.next()
  }

  // Verificar configuração de manutenção
  const isMaintenanceMode = await checkMaintenanceMode()

  if (isMaintenanceMode) {
    return NextResponse.redirect(new URL('/manutencao', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (public assets)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
  ],
}
