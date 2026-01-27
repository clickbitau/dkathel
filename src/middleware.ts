import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'bn'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames, exclude images, static files, login, admin, certificates, and PDFs
  matcher: ['/', '/((?!_next/static|_next/image|favicon.ico|api|images|login|admin|certificates|pdf|uploads).*)', '/(en|bn)/:path*']
};
