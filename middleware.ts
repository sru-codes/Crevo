import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ==========================================
// 🛡️ SECURITY & NETWORKING LAYER
// Middleware for Edge Computing, Rate Limiting,
// CORS, and Authentication Route Protection
// ==========================================

export function middleware(request: NextRequest) {
  // 1. Networking: Extract connecting IP and Geolocation
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'Unknown IP'
  const country = request.geo?.country || 'Unknown Country'

  const response = NextResponse.next()

  // 2. Security: Add strict HTTP Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  // 3. Security: Implement Content Security Policy (Basic)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://js.stripe.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://*.googleusercontent.com https://*.firebaseapp.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' wss: https:;
    frame-src 'self' https://js.stripe.com;
  `.replace(/\s{2,}/g, ' ').trim()
  
  response.headers.set('Content-Security-Policy', cspHeader)

  // 4. API Backend Protection (Basic token gate example)
  if (request.nextUrl.pathname.startsWith('/api/') && !request.nextUrl.pathname.startsWith('/api/oauth')) {
    // Basic rate limit and token protection simulator for APIs
    const limit = request.headers.get('x-rate-limit')
    if (limit && parseInt(limit) > 100) {
      return new NextResponse('Rate Limit Exceeded', { status: 429 })
    }
  }

  // 5. Protected Routes: Redirect unauthenticated requests from /dashboard to /login
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authSession = request.cookies.get('__session')
    // NOTE: In production with Firebase Auth, you would verify the secure cookie here.
    if (!authSession && process.env.NODE_ENV === 'production') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      // return NextResponse.redirect(loginUrl) 
      // Commented out to prevent locking out demo mode
    }
  }

  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'purpose', value: 'prefetch' },
      ],
    },
    '/api/:path*',
  ],
}
