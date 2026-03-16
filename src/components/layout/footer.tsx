'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();

  // Detect locale from pathname
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';

  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t border-gray-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/dk-profile.png"
                  alt="DKathel Logo - Kauser Ahmed Methel"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className={`text-2xl font-bold text-slate-900 dark:text-white ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                {locale === 'bn' ? 'ডিকাথেল পোর্টফোলিও' : 'DKathel Portfolio'}
              </span>
            </Link>
            <p className={`mt-4 text-slate-600 dark:text-slate-300 max-w-md ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {t('portfolio_description')}
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{t('quick_links')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={`/${locale}/experience`} className={`text-slate-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white transition-colors ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  {t('experience')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/certifications`} className={`text-slate-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white transition-colors ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  {t('certifications')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className={`text-slate-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white transition-colors ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className={`text-slate-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white transition-colors ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-sm">
                  {locale === 'bn' ? 'অ্যাডমিন' : 'Admin'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{t('connect')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://github.com/dkathel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/dkathel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/dkathel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-logo-secondary pt-8">
          <p className={`text-center text-slate-500 dark:text-slate-400 text-sm ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
