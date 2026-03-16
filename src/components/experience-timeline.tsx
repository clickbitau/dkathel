'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedIcons } from '@/components/ui/animated-icon';
import { experienceTranslationsBn } from '@/data/experience-translations-bn';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  messages: {
    homepage?: {
      career_journey?: {
        title?: string;
        description?: string;
      };
    };
    [key: string]: unknown;
  };
}

// Color gradient for each experience card
const colors = [
  'from-purple-600 to-pink-500',
  'from-blue-600 to-cyan-500',
  'from-green-600 to-teal-500',
  'from-yellow-500 to-orange-400',
  'from-red-500 to-pink-500',
];

export function ExperienceTimeline({ messages }: ExperienceTimelineProps) {
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en' as const;

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

  const formatPeriod = (startDate: string, endDate: string | null, current: boolean) => {
    const start = new Date(startDate);
    const startYear = start.getFullYear();
    const startMonth = start.toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', { month: 'short' });

    if (current) {
      return locale === 'bn' ? `${startYear} - বর্তমান` : `${startYear} - Present`;
    }

    if (endDate) {
      const end = new Date(endDate);
      const endYear = end.getFullYear();
      return `${startYear} - ${endYear}`;
    }

    return `${startYear}`;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {locale === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
          </p>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-blue-100/30 dark:from-gray-800/30 dark:to-blue-900/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary dark:text-white mb-6 font-heading">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-blue-400 dark:to-purple-400">
              {messages.homepage?.career_journey?.title || 'Career Journey'}
            </span>
          </h2>
          <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
            {messages.homepage?.career_journey?.description || 'A chronological journey through the milestones and transformative experiences that shaped my career.'}
          </p>
        </motion.div>

        {/* Floating Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 h-full rounded-full"></div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {experiences.map((experience, index) => {
              const color = colors[index % colors.length];
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-gray-600 to-teal-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-2">
                            <h3 className={`text-2xl font-bold text-primary dark:text-white flex-1 min-w-0 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                              {locale === 'bn' ? (experienceTranslationsBn[experience.id]?.company_bn ?? experience.company) : experience.company}
                            </h3>
                            <Badge className={`bg-gradient-to-r ${color} text-white border-0 flex-shrink-0 text-sm font-medium px-3 py-1 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                              {experience.current ? (locale === 'bn' ? 'বর্তমান' : 'Current') : (locale === 'bn' ? 'সমাপ্ত' : 'Completed')}
                            </Badge>
                          </div>
                          <p className={`text-lg font-semibold text-secondary mb-1 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                            {locale === 'bn' ? (experienceTranslationsBn[experience.id]?.title_bn ?? experience.title) : experience.title}
                          </p>
                          <p className={`text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                            {formatPeriod(experience.startDate, experience.endDate, experience.current)} • {locale === 'bn' ? (experienceTranslationsBn[experience.id]?.location_bn ?? experience.location) : experience.location}
                          </p>
                        </div>
                      </div>

                      <p className={`text-secondary mb-4 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                        {locale === 'bn' ? (experienceTranslationsBn[experience.id]?.description_bn ?? experience.description) : experience.description}
                      </p>

                      {/* Technologies */}
                      {experience.technologies && experience.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {experience.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                            <Badge key={techIndex} variant="outline" className={`text-xs border-logo-secondary text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                              {tech}
                            </Badge>
                          ))}
                          {experience.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs border-logo-secondary text-secondary">
                              +{experience.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Achievements */}
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {(locale === 'bn'
                            ? (experienceTranslationsBn[experience.id]?.achievements_bn ?? experience.achievements)
                            : experience.achievements
                          ).slice(0, 3).map((achievement: string, achievementIndex: number) => (
                            <div key={achievementIndex} className="flex items-start gap-2">
                              <AnimatedIcons.CheckCircle size={12} className="text-green-500 mt-1 flex-shrink-0" />
                              <p className={`text-sm text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{achievement}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        className={`w-full border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-gray-800 dark:text-gray-200 hover:text-gray-800 dark:hover:text-blue-300 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
                        onClick={() => setActiveExperience(activeExperience === experience.id ? null : experience.id)}
                      >
                        {activeExperience === experience.id
                          ? locale === 'bn' ? 'কম দেখান' : 'Show Less'
                          : locale === 'bn' ? 'আরও জানুন' : 'Learn More'}
                      </Button>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href={locale === 'en' ? '/contact' : `/${locale}/contact`}>
            <Button size="lg" className={`bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl transform transition-all hover:scale-105 flex items-center gap-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              <AnimatedIcons.Users size={20} />
              {locale === 'bn' ? 'চলুন একসাথে কাজ করি' : "Let's Work Together"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
