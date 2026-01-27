'use client';

import { motion } from '@/lib/motion';
import { useState, useEffect } from 'react';
import { Globe, Shield, Settings, Lightbulb, Palette, Briefcase, TrendingUp, Rocket } from 'lucide-react';

// Helper function to convert English numerals to Bengali
const toBengaliNumeral = (str: string): string => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliNumerals[parseInt(digit)]);
};

interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}

// Icon and color mapping for each company
const companyStyles: Record<string, { icon: typeof Briefcase; color: string }> = {
  'ClickBIT': { icon: Rocket, color: 'from-yellow-500 to-orange-400' },

  'Trionix IT': { icon: Lightbulb, color: 'from-green-500 to-emerald-400' },
  'Avrior Consulting': { icon: Settings, color: 'from-blue-500 to-cyan-400' },
};

interface StoryTimelineProps {
  translations: {
    journeyTitle: string;
    journeyContent: string;
    trionixTitle: string;
    trionixContent: string;
    educationTitle: string;
    educationContent: string;
    passionTitle: string;
    passionContent: string;
    personalTitle: string;
    personalContent: string;
    sectionTitle: string;
    sectionSubtitle: string;
    australiaTitle: string;
    australiaRole: string;
    australiaContent: string;
    clickbitTitle: string;
    clickbitRole: string;
    clickbitContent: string;
    trionixRole: string;
    educationRole: string;
    avriorTitle?: string;
    avriorRole?: string;
    avriorContent?: string;
  };
  locale?: string;
}

interface TimelineItem {
  year: string;
  title: string;
  role: string;
  description: string;
  icon: typeof Briefcase;
  color: string;
}

export function StoryTimeline({ translations, locale = 'en' }: StoryTimelineProps) {
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

  const formatPeriod = (startDate: string, endDate: string | null, current: boolean): string => {
    const start = new Date(startDate);
    const startYear = start.getFullYear();
    if (current) return `${startYear}-Present`;
    if (endDate) {
      const end = new Date(endDate);
      return `${startYear}-${end.getFullYear()}`;
    }
    return `${startYear}`;
  };

  // Static life milestone - moving to Australia
  const lifeMilestones: TimelineItem[] = [
    {
      year: '2019',
      title: translations.australiaTitle,
      role: translations.australiaRole,
      description: translations.australiaContent,
      icon: Globe,
      color: 'from-purple-500 to-pink-400'
    },
    {
      year: '2020-2024',
      title: translations.educationTitle,
      role: translations.educationRole,
      description: translations.educationContent,
      icon: Shield,
      color: 'from-red-500 to-pink-500'
    }
  ];

  // Convert experiences from database to timeline items
  const experienceItems: TimelineItem[] = experiences.map((exp) => {
    const style = companyStyles[exp.company] || { icon: Briefcase, color: 'from-gray-500 to-gray-600' };
    return {
      year: formatPeriod(exp.startDate, exp.endDate, exp.current),
      title: `${exp.title} at ${exp.company}`,
      role: exp.title,
      description: exp.description,
      icon: style.icon,
      color: style.color
    };
  });

  // Combine and sort by year (life milestones first, then career experiences)
  const timelineItems = [...lifeMilestones, ...experienceItems];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
            {translations.sectionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
          {translations.sectionTitle}
        </h2>
        <p className={`text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
          {translations.sectionSubtitle}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto mt-12">
        <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-gray-600 to-teal-500 -translate-x-1/2"></div>
        {timelineItems.map((item, index: number) => (
          <div
            key={index}
            className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
          >
            {/* Content */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'} ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`inline-block px-4 py-2 mb-3 text-sm font-semibold rounded-full bg-gradient-to-r ${item.color} text-white whitespace-nowrap ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                  {locale === 'bn' ? toBengaliNumeral(item.year) : item.year}
                </div>
                <h3 className={`text-xl font-bold text-slate-800 dark:text-white mb-2 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>{item.title}</h3>
                <p className={`font-medium text-teal-600 dark:text-teal-400 mb-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{item.role}</p>
                <p className={`text-slate-600 dark:text-slate-400 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{item.description}</p>
              </motion.div>
            </div>

            {/* Icon */}
            <div className="w-2/12 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-lg`}
              >
                <item.icon size={24} />
              </motion.div>
            </div>

            {/* Empty space for alignment */}
            <div className="w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
