import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/certificates') ||
    pathname.startsWith('/pdf certs') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the default locale is in the pathname
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return NextResponse.next();
  }

  // Check if the Bengali locale is in the pathname
  if (pathname.startsWith('/bn/') || pathname === '/bn') {
    return NextResponse.next();
  }

  // Redirect root to /en
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  // For any other path, redirect to /en/path
  return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|certificates|pdf certs|uploads|images).*)',
  ],
};
