import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const method = request.method
  const timestamp = new Date().toISOString()

  // Log da requisição
  console.log(`[${timestamp}] ${method} ${pathname}${search}`)

  const response = NextResponse.next()

  // Log de redirecionamentos
  const location = response.headers.get('location')
  if (location) {
    console.log(`  → Redirect to: ${location}`)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
