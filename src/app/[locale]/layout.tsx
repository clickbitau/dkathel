import type { Metadata } from 'next';
import { Montserrat_Alternates } from 'next/font/google';
import localFont from 'next/font/local';
import '../global-styles.css';
import { notFound } from 'next/navigation';
import { Providers } from '../providers';
import { Layout } from '@/components/layout/layout';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

// This type matches Next.js 15+ app directory params (async)
type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

// Fonts
const montserratAlternates = Montserrat_Alternates({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat-alternates',
  display: 'swap',
});

// Local fonts
const mina = localFont({
  src: [
    {
      path: '../../fonts/Mina-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Mina-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-mina',
  display: 'swap',
});

const anekBangla = localFont({
  src: [
    {
      path: '../../fonts/AnekBangla-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/AnekBangla-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/AnekBangla-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-anek-bangla',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DKathel Portfolio',
  description: 'Personal portfolio website showcasing experience, certifications, and insights',
};

// This is the root layout for the [locale] segment
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Ensure params is resolved
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;
  
  // Validate the locale
  const validLocales = ['en', 'bn'] as const;
  if (!validLocales.includes(locale as typeof validLocales[number])) {
    notFound();
  }

  let messages;
  try {
    if (locale === 'en') {
      messages = (await import(`@/messages/en`)).default;
    } else if (locale === 'bn') {
      messages = (await import(`@/messages/bn`)).default;
    } else {
      messages = (await import(`@/messages/en`)).default;
    }
  } catch (error: unknown) {
    console.error('Failed to load messages:', error);
    // Fallback messages
    messages = {
      about: {},
      footer: {
        contact_details: "Contact Details",
        phone: "+61 481 708 800",
        copyright: "© 2024. All rights reserved",
        portfolio_description: "Personal portfolio website showcasing experience, certifications, and insights",
        experience: "Experience",
        certifications: "Certifications",
        blog: "Blog",
        contact: "Contact"
      }
    };
  }

  return (
    <html lang={locale} className={`${montserratAlternates.variable} ${anekBangla.variable} font-sans`} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Layout>
              {children}
            </Layout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
