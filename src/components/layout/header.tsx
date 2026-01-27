'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detect locale from pathname
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';

  // Add locale prefix to ALL navigation links (both en and bn)
  const localizedNavigation = NAVIGATION.map(item => ({
    ...item,
    href: `/${locale}${item.href}`
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between h-20" aria-label="Global">
          {/* Left side - Navigation items */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
            <div className="flex">
              {localizedNavigation.filter(item =>
                ['/about', '/experience', '/brands', '/blog'].includes(item.href.replace(/^\/(en|bn)/, ''))
              ).map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 text-[1.2rem] leading-6 font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 relative group ${index > 0 ? 'ml-2' : ''}`}
                >
                  {typeof item.name === 'object' ? item.name[locale as keyof typeof item.name] : item.name}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-gray-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex-shrink-0 mx-12">
            <Link href={`/${locale}`} className="block">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/dk-profile.png"
                  alt="DKathel - Kauser Ahmed Methel"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Right side - Navigation items and controls */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-start">
            <div className="flex items-center">
              {NAVIGATION.filter(item =>
                ['/certifications'].includes(item.href)
              ).map((item, index) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`px-4 py-2.5 text-[1.2rem] leading-6 font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 relative group ${index > 0 ? 'ml-2' : ''}`}
                >
                  {typeof item.name === 'object' ? item.name[locale as keyof typeof item.name] : item.name}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-gray-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              ))}
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-slate-200 dark:border-gray-700 h-10">
                <LanguageSwitcher />
                <ThemeToggle />
                <Link href={`/${locale}/contact`}>
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-gray-700 to-gray-900 text-white border-0 hover:from-gray-800 hover:to-black shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap px-6 py-2.5 text-[1.1rem]"
                  >
                    {locale === 'en' ? 'Contact Me' : 'যোগাযোগ করুন'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button
              type="button"
              variant="ghost"
              className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-200/20 dark:ring-slate-700/20">
            <div className="flex items-center justify-between">
              <Link href={locale === 'en' ? '/' : `/${locale}`} className="-m-1.5 p-1.5 flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 p-0.5">
                  <Image
                    src="/images/dk-profile.png"
                    alt="DKathel Logo - Kauser Ahmed Methel"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className={`text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                  DKathel
                </span>
              </Link>
              <Button
                type="button"
                variant="ghost"
                className="-m-2.5 rounded-xl p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-slate-200/20 dark:divide-slate-700/20">
                {localizedNavigation.map((item) => (
                  <div key={item.href} className="flow-root">
                    <Link
                      href={item.href}
                      className="-m-2 block p-4 text-lg font-medium text-gray-900 dark:text-gray-100"
                    >
                      {typeof item.name === 'object' ? item.name[locale as keyof typeof item.name] : item.name}
                    </Link>
                  </div>
                ))}
                <div className="py-6">
                  <Link href={`/${locale}/contact`}>
                    <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white border-0 hover:from-gray-800 hover:to-black">
                      {locale === 'en' ? 'Contact Me' : 'যোগাযোগ করুন'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
