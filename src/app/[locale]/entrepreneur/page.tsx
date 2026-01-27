'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

// Helper function to convert English numerals to Bengali
const toBengaliNumeral = (str: string): string => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliNumerals[parseInt(digit)]);
};

export default function EntrepreneurPage() {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const t = useTranslations('entrepreneur');

  // Locale-specific achievements for phases
  const getPhaseAchievements = (phase: string) => {
    if (locale === 'bn') {
      const achievements: Record<string, string[]> = {
        foundation: [
          'ডিজিটাল মার্কেটিংয়ে বাজারের সুযোগ চিহ্নিত করেছি',
          'মূল ব্যবসায়িক দক্ষতা বিকাশ করেছি',
          'প্রাথমিক পেশাদার নেটওয়ার্ক তৈরি করেছি',
          'ব্যবসায়িক মডেল ক্যানভাস তৈরি করেছি'
        ],
        launch: [
          'ক্লিকবিট ডিজিটাল এজেন্সি প্রতিষ্ঠা করেছি',
          'বি ট্রেনিং LMS প্ল্যাটফর্ম তৈরি করেছি',
          '$১M+ বার্ষিক আয়ের মাইলফলক অর্জন করেছি',
          '২০+ পেশাদারের দল তৈরি করেছি'
        ],
        scale: [
          'অস্ট্রেলিয়া জুড়ে সেবা সম্প্রসারণ করছি',
          'আন্তর্জাতিক বাজারে প্রবেশের অনুসন্ধান',
          '৫০০+ উদ্যোক্তাদের পরামর্শ দিচ্ছি',
          'শিল্প নেতাদের সাথে কৌশলগত অংশীদারিত্ব'
        ]
      };
      return achievements[phase] || [];
    }

    const achievements: Record<string, string[]> = {
      foundation: [
        'Identified market opportunities in digital marketing',
        'Developed core business competencies',
        'Built initial professional network',
        'Created business model canvas'
      ],
      launch: [
        'Founded ClickBIT digital agency',
        'Developed B Training LMS platform',
        'Achieved $1M+ ARR milestone',
        'Built team of 20+ professionals'
      ],
      scale: [
        'Expanding service offerings across Australia',
        'International market entry exploration',
        'Mentoring 500+ entrepreneurs',
        'Strategic partnerships with industry leaders'
      ]
    };
    return achievements[phase] || [];
  };

  // Locale-specific features for services
  const getServiceFeatures = (service: string) => {
    if (locale === 'bn') {
      const features: Record<string, string[]> = {
        strategy: [
          'বাজার বিশ্লেষণ এবং পজিশনিং',
          'ব্যবসায়িক মডেল উন্নয়ন',
          'আর্থিক পরিকল্পনা এবং প্রজেকশন',
          'বৃদ্ধি কৌশল রোডম্যাপ'
        ],
        mindset: [
          'সাফল্যের মানসিকতা উন্নয়ন',
          'নেতৃত্ব দক্ষতা বিকাশ',
          'দল পরিচালনা কৌশল',
          'পারফরম্যান্স অপ্টিমাইজেশন'
        ],
        technology: [
          'LMS প্ল্যাটফর্ম উন্নয়ন',
          'অটোমেশন কৌশল',
          'ডিজিটাল রূপান্তর',
          'প্রযুক্তি স্ট্যাক অপ্টিমাইজেশন'
        ]
      };
      return features[service] || [];
    }

    const features: Record<string, string[]> = {
      strategy: [
        'Market analysis & positioning',
        'Business model development',
        'Financial planning & projections',
        'Growth strategy roadmap'
      ],
      mindset: [
        'Success mindset development',
        'Leadership skill building',
        'Team management strategies',
        'Performance optimization'
      ],
      technology: [
        'LMS platform development',
        'Automation strategies',
        'Digital transformation',
        'Technology stack optimization'
      ]
    };
    return features[service] || [];
  };

  const startCoachingLabel = locale === 'bn' ? 'কোচিং শুরু করুন' : 'Start Coaching';

  const entrepreneurialJourney = [
    {
      phase: t('phases.foundation.phase'),
      phaseKey: 'foundation',
      year: '2023-2024',
      title: t('phases.foundation.title'),
      description: t('phases.foundation.description'),
      achievements: getPhaseAchievements('foundation'),
      icon: '🏗️',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      phase: t('phases.launch.phase'),
      phaseKey: 'launch',
      year: '2024-2025',
      title: t('phases.launch.title'),
      description: t('phases.launch.description'),
      achievements: getPhaseAchievements('launch'),
      icon: '🚀',
      color: 'from-purple-600 to-pink-500'
    },
    {
      phase: t('phases.scale.phase'),
      phaseKey: 'scale',
      year: '2025-2026',
      title: t('phases.scale.title'),
      description: t('phases.scale.description'),
      achievements: getPhaseAchievements('scale'),
      icon: '📈',
      color: 'from-green-600 to-teal-500'
    }
  ];

  const coachingServices = [
    {
      title: t('services.strategy.title'),
      description: t('services.strategy.description'),
      duration: t('services.strategy.duration'),
      price: t('services.strategy.price'),
      features: getServiceFeatures('strategy')
    },
    {
      title: t('services.mindset.title'),
      description: t('services.mindset.description'),
      duration: t('services.mindset.duration'),
      price: t('services.mindset.price'),
      features: getServiceFeatures('mindset')
    },
    {
      title: t('services.technology.title'),
      description: t('services.technology.description'),
      duration: t('services.technology.duration'),
      price: t('services.technology.price'),
      features: getServiceFeatures('technology')
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
          >
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {t('title')}
            </h1>
            <p className={`text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
              {t('journey_title')}
            </h2>
          </motion.div>

          <div className="space-y-12">
            {entrepreneurialJourney.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="w-full md:w-1/2 p-4 md:p-8">
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center text-3xl`}>
                          {phase.icon}
                        </div>
                        <div>
                          <Badge className={`bg-gradient-to-r ${phase.color} text-white`}>
                            {phase.phase}
                          </Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{phase.year}</p>
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-heading">{phase.title}</CardTitle>
                      <CardDescription className="text-base">{phase.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {phase.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:flex w-1/2 justify-center">
                  <div className="w-1 h-32 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Services */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
              {t('coaching_title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coachingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{service.price}</div>
                      <Badge variant="outline">{service.duration}</Badge>
                    </div>

                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <Link href={locale === 'en' ? '/contact' : `/${locale}/contact`} className="block">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        {startCoachingLabel}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
              {t('metrics_title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                $1M+
              </div>
              <p className="text-gray-600 dark:text-gray-400">{t('metrics.revenue')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                500+
              </div>
              <p className="text-gray-600 dark:text-gray-400">{t('metrics.mentored')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                20+
              </div>
              <p className="text-gray-600 dark:text-gray-400">{t('metrics.team')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                95%
              </div>
              <p className="text-gray-600 dark:text-gray-400">{t('metrics.success_rate')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-heading">
              {t('cta_title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={locale === 'en' ? '/contact' : `/${locale}/contact`}>
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  {t('cta_consultation')}
                </Button>
              </Link>
              <Link href={locale === 'en' ? '/experience' : `/${locale}/experience`}>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                  {t('cta_experience')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
