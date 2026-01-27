export const locales = ['en', 'bn'] as const;
export const defaultLocale = 'en' as const;

export const localePrefix = 'always'; // Always include the locale in the URL

export const pathnames = {
  // If you have paths that should be the same across all locales, define them here
  '/': '/',
  '/about': '/about',
  '/experience': '/experience',
  '/certifications': '/certifications',
  '/blog': '/blog',
  '/contact': '/contact',
  '/brands': '/brands',
  '/entrepreneur': '/entrepreneur',
} as const;

export type AppPathnames = keyof typeof pathnames;
