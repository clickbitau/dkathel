'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Helper function to convert English numerals to Bengali
const toBengaliNumeral = (str: string): string => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliNumerals[parseInt(digit)]);
};

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities?: string[];
  achievements: string[];
  technologies: string[];
  skills?: string[];
}

// Get localized labels
const getLabels = (locale: string) => {
  if (locale === 'bn') {
    return {
      keyAchievements: 'প্রধান সাফল্য',
      technologiesTools: 'প্রযুক্তি ও সরঞ্জাম',
      present: 'বর্তমান',
      loading: 'লোড হচ্ছে...',
      noExperiences: 'কোনো অভিজ্ঞতা পাওয়া যায়নি'
    };
  }
  return {
    keyAchievements: 'Key Achievements',
    technologiesTools: 'Technologies & Tools',
    present: 'Present',
    loading: 'Loading experiences...',
    noExperiences: 'No experiences found'
  };
};

export default function ExperiencePage() {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const t = useTranslations('experience');
  const labels = getLabels(locale);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch('/api/experiences');
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    const formatted = new Date(dateString).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
    return locale === 'bn' ? toBengaliNumeral(formatted) : formatted;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Wave shape at bottom */}
        <div className="absolute -bottom-1 left-0 right-0 overflow-hidden">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" className="fill-gray-50 dark:fill-gray-900" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Montserrat Alternates', system-ui, sans-serif" }}>
              {t('title')}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Mina', sans-serif" }}>
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Experience Timeline */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className={`text-xl text-gray-600 dark:text-gray-400 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                {labels.loading}
              </p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20">
              <p className={`text-xl text-gray-600 dark:text-gray-400 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                {labels.noExperiences}
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                          {experience.title}
                        </h2>
                        <p className={`text-lg text-teal-600 dark:text-teal-400 font-semibold mb-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                          {experience.company}
                        </p>
                        <p className={`text-gray-600 dark:text-gray-400 mb-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                          📍 {experience.location}
                        </p>
                        <p className={`text-sm text-gray-500 dark:text-gray-400 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-full inline-block ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                          📅 {formatDate(experience.startDate)} - {experience.current ? labels.present : formatDate(experience.endDate!)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className={`text-gray-700 dark:text-gray-300 leading-relaxed text-lg ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                        {experience.description}
                      </p>

                      {experience.achievements && experience.achievements.length > 0 && (
                        <div>
                          <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                            {labels.keyAchievements}
                          </h3>
                          <ul className="space-y-3">
                            {experience.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <span className="text-teal-600 dark:text-teal-400 text-lg">•</span>
                                <span className={`text-gray-700 dark:text-gray-300 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {experience.technologies && experience.technologies.length > 0 && (
                        <div>
                          <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                            {labels.technologiesTools}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {experience.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-800/30 dark:to-gray-700/30 dark:text-teal-300 border border-gray-200 dark:border-gray-800 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Technical Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {locale === 'bn' ? 'প্রযুক্তিগত দক্ষতা' : 'Technical Expertise'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: locale === 'bn' ? 'ইনফ্রাস্ট্রাকচার ও সিকিউরিটি' : 'Infrastructure & Security',
                  skills: locale === 'bn'
                    ? ['Proxmox ভার্চুয়ালাইজেশন', 'Docker কন্টেইনার', 'ZFS স্টোরেজ', 'ফায়ারওয়াল ও VPN', 'সাইবার সিকিউরিটি']
                    : ['Proxmox Virtualization', 'Docker Containers', 'ZFS Storage', 'Firewall & VPN', 'Cybersecurity']
                },
                {
                  title: locale === 'bn' ? 'ডেভেলপমেন্ট' : 'Development',
                  skills: locale === 'bn'
                    ? ['React ও Next.js', 'Node.js', 'PHP', 'MongoDB ও SQL', 'Git ও CI/CD']
                    : ['React & Next.js', 'Node.js', 'PHP', 'MongoDB & SQL', 'Git & CI/CD']
                },
                {
                  title: locale === 'bn' ? 'ব্যবসায়িক সিস্টেম' : 'Business Systems',
                  skills: locale === 'bn'
                    ? ['CRM ডেভেলপমেন্ট', 'ই-কমার্স প্ল্যাটফর্ম', 'মার্কেটিং অটোমেশন', 'ওয়েব হোস্টিং']
                    : ['CRM Development', 'E-commerce Platforms', 'Marketing Automation', 'Web Hosting']
                }
              ].map((area, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                    {area.title}
                  </h3>
                  <ul className="space-y-2">
                    {area.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        <span className={`text-gray-600 dark:text-gray-400 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Qualifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {locale === 'bn' ? 'শিক্ষা ও যোগ্যতা' : 'Education & Qualifications'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: locale === 'bn' ? 'ব্যাচেলর অফ সাইবার সিকিউরিটি' : 'Bachelor of Cyber Security', institution: 'Victoria University', year: '2024' },
                { title: locale === 'bn' ? 'গ্রাজুয়েট ডিপ্লোমা অফ ম্যানেজমেন্ট' : 'Graduate Diploma of Management', institution: 'Sandhurst Institute', year: '2022' },
                { title: locale === 'bn' ? 'অ্যাডভান্সড ডিপ্লোমা অফ IT' : 'Advanced Diploma of IT', institution: 'Sandhurst Institute', year: '2022' },
                { title: locale === 'bn' ? 'অ্যাডভান্সড ডিপ্লোমা অফ লিডারশিপ' : 'Advanced Diploma of Leadership', institution: 'SBTC', year: '2022' },
                { title: locale === 'bn' ? 'সার্টিফিকেট IV ট্রেনিং' : 'Certificate IV in Training', institution: 'Nationwide Academy', year: '2024' }
              ].map((qual, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-teal-500">🎓</span>
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{qual.year}</span>
                  </div>
                  <h4 className={`font-semibold text-gray-900 dark:text-white text-sm mb-1 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{qual.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{qual.institution}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '50+', label: locale === 'bn' ? 'সক্রিয় ক্লায়েন্ট' : 'Active Clients' },
                { value: '99%+', label: locale === 'bn' ? 'সিস্টেম আপটাইম' : 'System Uptime' },
                { value: '20+', label: locale === 'bn' ? 'সার্টিফিকেশন' : 'Certifications' },
                { value: '$30K', label: locale === 'bn' ? 'মাসিক বাজেট পরিচালিত' : 'Monthly Budget Managed' }
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-2">{stat.value}</div>
                  <div className={`text-gray-300 text-sm ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className={`text-4xl sm:text-5xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {t('cta_title')}
            </h2>
            <p className={`text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className={`bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
              >
                {t('cta_contact')}
              </a>
              <a
                href={`/${locale}/certifications`}
                className={`bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
              >
                {t('cta_certifications')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
