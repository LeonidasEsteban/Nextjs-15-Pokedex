import { NextResponse } from 'next/server';

export function middleware(request) {
  // Agregar headers personalizados para rastrear las peticiones
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-loading', 'true');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/blog/:path*',
}