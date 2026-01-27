'use client';

import { motion, MotionProps } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedIcons } from '@/components/ui/animated-icon';
import { useState, useEffect } from 'react';

interface Stats {
  yearsOfExperience: string;
  successRate: string;
  specialties: string;
  projects: string;
}

export function Hero() {
  const pathname = usePathname();
  const [stats, setStats] = useState<Stats>({
    yearsOfExperience: '6+',
    successRate: '98%',
    specialties: '20+',
    projects: '8+'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // Detect locale from pathname
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';

  // Convert English digits to Bengali numerals
  const toBengaliNumbers = (str: string): string => {
    if (locale !== 'bn') return str;
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)]);
  };

  const t = (key: string): string => {
    // Simple translation helper that returns only strings
    const translations: Record<string, string> = {
      // Hero section
      'hero.name': locale === 'bn' ? 'কাউসার আহমেদ মিথেল' : 'Kauser Ahmed Methel',
      'hero.title': locale === 'bn' ? 'আইটি সাপোর্ট কনসালট্যান্ট এবং ক্লিকবিটের প্রতিষ্ঠাতা' : 'IT Support Consultant & Founder of ClickBit',
      'hero.description': locale === 'bn'
        ? 'ব্যবসার প্রবৃদ্ধি এবং প্রযুক্তির প্রতি আবেগ নিয়ে বাংলাদেশ থেকে অস্ট্রেলিয়ায়। আইটি সাপোর্ট, ওয়েব ডেভেলপমেন্ট এবং সৃজনশীল ডিজিটাল মার্কেটিং সলিউশনে বিশেষজ্ঞ।'
        : 'Passionate about business and technology, from Bangladesh to Australia. Specializing in IT support, web development, and creative digital marketing solutions that help businesses grow.',

      // Job titles
      'hero.job_titles.it_support': locale === 'bn' ? 'আইটি সাপোর্ট স্পেশালিস্ট' : 'IT Support Specialist',
      'hero.job_titles.entrepreneur': locale === 'bn' ? 'উদ্যোক্তা' : 'Entrepreneur',
      'hero.job_titles.cyber_security': locale === 'bn' ? 'সাইবার সিকিউরিটি গ্রাজুয়েট' : 'Cyber Security Graduate',

      // Location
      'hero.location': locale === 'bn' ? 'অস্ট্রেলিয়া' : 'Australia',

      // Call to action
      'hero.cta.contact': locale === 'bn' ? 'যোগাযোগ করুন' : 'Contact Me',
      'hero.cta.view_work': locale === 'bn' ? 'আমার কাজ দেখুন' : 'View My Work',

      // Stats - apply Bengali numeral conversion
      'hero.stats.years': locale === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience',
      'hero.stats.transformations': locale === 'bn' ? 'সফল রূপান্তর' : 'Transformations',
      'hero.stats.specialties': locale === 'bn' ? 'মূল বিশেষ দক্ষতা' : 'Core Specialties',
      'hero.stats.success_rate': locale === 'bn' ? 'সাফল্যের হার' : 'Success Rate',
      '10+': toBengaliNumbers(stats.yearsOfExperience),
      '50+': toBengaliNumbers(stats.specialties),
      '3': toBengaliNumbers(stats.projects),
      '100%': toBengaliNumbers(stats.successRate)
    };
    return translations[key] || key;
  };

  return (
    <section className="relative min-h-[65vh] overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 py-10">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 dark:bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-400/20 dark:bg-gray-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/20 dark:bg-teal-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[65vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            {/* Name & Roles Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-white mb-4 leading-tight ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                <span className="block">{t('hero.name')}</span>
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-teal-500 to-gray-800 dark:from-gray-300 dark:via-teal-400 dark:to-gray-400 ${locale === 'bn' ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl lg:text-4xl'
                  } mt-2`}>
                  {t('hero.title')}
                </span>
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className={`bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700/50 text-sm px-4 py-2 flex items-center gap-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  <AnimatedIcons.Security size={16} />
                  {t('hero.job_titles.it_support')}
                </Badge>
                <Badge className={`bg-gray-200 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600/50 text-sm px-4 py-2 flex items-center gap-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  <AnimatedIcons.Marketing size={16} />
                  {t('hero.job_titles.entrepreneur')}
                </Badge>
                <Badge className={`bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 border-teal-200 dark:border-teal-700/50 text-sm px-4 py-2 flex items-center gap-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  <AnimatedIcons.EducationConsulting size={16} />
                  {t('hero.job_titles.cyber_security')}
                </Badge>
              </div>

              <p className={`text-secondary text-lg mb-4 flex items-center gap-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                <AnimatedIcons.Location size={20} className="text-teal-600 dark:text-teal-400" />
                {t('hero.location')}
              </p>

              <p className={`text-xl text-secondary font-light leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                {t('hero.description')}
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={locale === 'en' ? '/contact' : `/${locale}/contact`}>
                <Button size="lg" className={`bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  {t('hero.cta.contact')}
                </Button>
              </Link>
              <Link href={locale === 'en' ? '/about' : `/${locale}/about`}>
                <Button variant="outline" size="lg" className={`bg-white/10 dark:bg-white/10 backdrop-blur-md border-2 border-gray-400/30 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 hover:border-gray-500 dark:hover:border-white/30 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  {t('hero.cta.view_work')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Portrait & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            {/* Professional Portrait */}
            <div className="relative mx-auto w-[34.56rem] h-[34.56rem] -mt-10 -mb-10">
              <img
                src="/images/profile-hero.png"
                alt="Kauser Ahmed Methel - Professional Portrait"
                className="w-full h-full object-contain"
              />
              {/* Creative accent elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full animate-pulse shadow-lg animation-delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-gradient-to-br from-teal-300 to-teal-500 rounded-full animate-bounce animation-delay-2000"></div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/50">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="space-y-2">
                  <div className={`text-3xl font-bold text-primary dark:text-white ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                    {t('10+')}
                  </div>
                  <div className={`text-sm text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{t('hero.stats.years')}</div>
                </div>
                <div className="space-y-2">
                  <div className={`text-3xl font-bold text-primary dark:text-white ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                    {t('50+')}
                  </div>
                  <div className={`text-sm text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{t('hero.stats.transformations')}</div>
                </div>
                <div className="space-y-2">
                  <div className={`text-3xl font-bold text-primary dark:text-white ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                    {t('3')}
                  </div>
                  <div className={`text-sm text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{t('hero.stats.specialties')}</div>
                </div>
                <div className="space-y-2">
                  <div className={`text-3xl font-bold text-primary dark:text-white ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                    {t('100%')}
                  </div>
                  <div className={`text-sm text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{t('hero.stats.success_rate')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
