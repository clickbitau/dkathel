'use client';

import { motion, MotionProps } from '@/lib/motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedIcons } from '@/components/ui/animated-icon';

const experiences = [
  {
    id: 'clickbit',
    company: 'ClickBIT',
    logo: '/images/partners/clickbit.png',
    role: {
      en: 'Founder & Creative Director',
      bn: 'প্রতিষ্ঠাতা ও ক্রিয়েটিভ ডিরেক্টর'
    },
    period: {
      en: '2023 - Present',
      bn: '২০২৩ - বর্তমান'
    },
    status: {
      en: 'Current',
      bn: 'বর্তমান'
    },
    type: {
      en: 'Entrepreneurship',
      bn: 'উদ্যোক্তা'
    },
    location: {
      en: 'Australia',
      bn: 'অস্ট্রেলিয়া'
    },
    description: {
      en: 'Founded and lead a creative digital agency specializing in performance-driven marketing campaigns, brand transformation, and digital innovation. Driving business growth through strategic creativity and data-driven results.',
      bn: 'একটি সৃজনশীল ডিজিটাল এজেন্সি প্রতিষ্ঠা ও নেতৃত্ব দিচ্ছি, যা পারফরম্যান্স-ভিত্তিক মার্কেটিং ক্যাম্পেইন, ব্র্যান্ড রূপান্তর এবং ডিজিটাল উদ্ভাবনে বিশেষজ্ঞ। কৌশলগত সৃজনশীলতা এবং ডেটা-নির্ভর ফলাফলের মাধ্যমে ব্যবসার বৃদ্ধি ঘটাচ্ছি।'
    },
    achievements: {
      en: [
        'Established agency from concept to operational success',
        'Developed comprehensive digital marketing strategies',
        'Delivered measurable ROI improvements for client campaigns',
        'Built collaborative partnerships with industry leaders'
      ],
      bn: [
        'শূন্য থেকে পূর্ণাঙ্গ এজেন্সি পরিচালনা পর্যন্ত গড়ে তোলা',
        'ব্যাপক ডিজিটাল মার্কেটিং কৌশল তৈরি',
        'ক্লায়েন্ট ক্যাম্পেইনে পরিমাপযোগ্য ROI বৃদ্ধি',
        'শিল্পের শীর্ষ নেতাদের সাথে সহযোগিতা গড়ে তোলা'
      ]
    },
    technologies: {
      en: ['Digital Marketing', 'Creative Strategy', 'Brand Development', 'Performance Analytics'],
      bn: ['ডিজিটাল মার্কেটিং', 'সৃজনশীল কৌশল', 'ব্র্যান্ড বিকাশ', 'পারফরম্যান্স অ্যানালিটিক্স']
    },
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 'trionix',
    company: 'Trionix IT',
    logo: '/images/partners/trionix.png',
    role: {
      en: 'IT Support Consultant',
      bn: 'আইটি সাপোর্ট কনসালট্যান্ট'
    },
    period: {
      en: '2023 - Jan 2025',
      bn: '২০২৩ - জানুয়ারি ২০২৫'
    },
    status: {
      en: 'Completed',
      bn: 'সমাপ্ত'
    },
    type: {
      en: 'IT Support',
      bn: 'আইটি সাপোর্ট'
    },
    location: {
      en: 'Multi-location',
      bn: 'একাধিক জায়গা'
    },
    description: {
      en: 'Conducting thorough assessments of client networks and developing customized IT strategies aligned with business objectives. Evaluating emerging technologies and providing comprehensive technical support.',
      bn: 'ক্লায়েন্টদের নেটওয়ার্কের পুঙ্খানুপুঙ্খ মূল্যায়ন এবং ব্যবসায়িক উদ্দেশ্যের সাথে সামঞ্জস্যপূর্ণ কাস্টমাইজড আইটি কৌশল তৈরি। উদীয়মান প্রযুক্তির মূল্যায়ন এবং ব্যাপক প্রযুক্তিগত সহায়তা প্রদান।'
    },
    achievements: {
      en: [
        'Conducted network assessments to identify improvement opportunities',
        'Developed customized IT strategies for client business objectives',
        'Maintained detailed project records for accurate reporting',
        'Collaborated with teams to implement efficient IT solutions'
      ],
      bn: [
        'উন্নতির সুযোগ চিহ্নিত করার জন্য নেটওয়ার্ক মূল্যায়ন পরিচালনা',
        'ক্লায়েন্ট ব্যবসার উদ্দেশ্যের জন্য কাস্টমাইজড আইটি কৌশল তৈরি',
        'সঠিক রিপোর্টিংয়ের জন্য বিস্তারিত প্রকল্প রেকর্ড রক্ষণাবেক্ষণ',
        'দক্ষ আইটি সমাধান বাস্তবায়নের জন্য দলগুলির সাথে সহযোগিতা'
      ]
    },
    technologies: {
      en: ['Active Directory', 'Ticketing Systems', 'Desktop Support', 'Network Monitoring'],
      bn: ['অ্যাক্টিভ ডাইরেক্টরি', 'টিকিটিং সিস্টেম', 'ডেস্কটপ সাপোর্ট', 'নেটওয়ার্ক মনিটরিং']
    },
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'avrior',
    company: 'Avrior Consulting',
    logo: '/images/partners/avrior-consulting.png',
    role: {
      en: 'IT Consultant',
      bn: 'আইটি পরামর্শদাতা'
    },
    period: {
      en: '2021 - 2023',
      bn: '২০২১ - ২০২৩'
    },
    status: {
      en: 'Completed',
      bn: 'সমাপ্ত'
    },
    type: {
      en: 'Consulting',
      bn: 'পরামর্শক'
    },
    location: {
      en: 'Sydney, NSW',
      bn: 'সিডনি, NSW'
    },
    description: {
      en: 'Provided IT consulting services focusing on system maintenance, technology planning, and troubleshooting support. Reduced downtime through proactive issue resolution and helped businesses align technology with growth projections.',
      bn: 'সিস্টেম রক্ষণাবেক্ষণ, প্রযুক্তি পরিকল্পনা এবং সমস্যা সমাধান সহায়তার উপর ফোকাস করে আইটি পরামর্শ সেবা প্রদান। সক্রিয় সমস্যা সমাধানের মাধ্যমে ডাউনটাইম হ্রাস এবং ব্যবসার প্রযুক্তি বৃদ্ধির প্রক্ষেপণের সাথে সামঞ্জস্য রাখতে সহায়তা।'
    },
    achievements: {
      en: [
        'Reduced downtime by proactively addressing potential issues',
        'Increased client satisfaction through effective troubleshooting',
        'Made recommendations and performed technology upgrades',
        'Provided training sessions on new technologies and best practices',
        'Streamlined workflow processes for improved efficiency'
      ],
      bn: [
        'সম্ভাব্য সমস্যা সক্রিয়ভাবে সমাধান করে ডাউনটাইম হ্রাস',
        'কার্যকর সমস্যা সমাধানের মাধ্যমে ক্লায়েন্ট সন্তুষ্টি বৃদ্ধি',
        'প্রযুক্তি আপগ্রেডের জন্য সুপারিশ ও পারফরম করা',
        'নতুন প্রযুক্তি ও সেরা অনুশীলনের উপর প্রশিক্ষণ প্রদান',
        'উন্নত দক্ষতার জন্য কর্মপ্রবাহ প্রক্রিয়া সুগম করা'
      ]
    },
    technologies: {
      en: ['System Maintenance', 'Technology Planning', 'Troubleshooting', 'Client Support'],
      bn: ['সিস্টেম রক্ষণাবেক্ষণ', 'প্রযুক্তি পরিকল্পনা', 'সমস্যা সমাধান', 'ক্লায়েন্ট সাপোর্ট']
    },
    color: 'from-green-600 to-teal-500'
  }
];

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

// Helper type for translated fields
type TranslatedField<T> = {
  en: T;
  bn: T;
} | T;

// Helper function to get the correct translation
const getTranslation = <T,>(field: TranslatedField<T>, locale: 'en' | 'bn'): T => {
  if (typeof field === 'object' && field !== null && 'en' in field && 'bn' in field) {
    return field[locale];
  }
  return field as T;
};

export function ExperienceTimeline({ messages }: ExperienceTimelineProps) {
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Detect locale from pathname
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en' as const;
  
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-blue-100/30 dark:from-slate-800/30 dark:to-blue-900/30"></div>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
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
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-white rounded-full p-2 flex-shrink-0 mt-1">
                          {experience.logo && (
                            <img src={experience.logo} alt={experience.company} className="w-full h-full object-contain" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-2">
                            <h3 className={`text-2xl font-bold text-primary dark:text-white flex-1 min-w-0 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>{experience.company}</h3>
                            <Badge className={`bg-gradient-to-r ${experience.color} text-white border-0 flex-shrink-0 text-sm font-medium px-3 py-1 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                              {getTranslation(experience.status, locale)}
                            </Badge>
                          </div>
                          <p className={`text-lg font-semibold text-secondary mb-1 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                            {getTranslation(experience.role, locale)}
                          </p>
                          <p className={`text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                            {getTranslation(experience.period, locale)} • {getTranslation(experience.location, locale)}
                          </p>
                        </div>
                      </div>

                      <p className={`text-secondary mb-4 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                        {getTranslation(experience.description, locale)}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getTranslation(experience.technologies, locale).map((tech: string, techIndex: number) => (
                          <Badge key={techIndex} variant="outline" className={`text-xs border-logo-secondary text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="space-y-2 mb-6">
                        {getTranslation(experience.achievements, locale).map((achievement: string, achievementIndex: number) => (
                          <div key={achievementIndex} className="flex items-start gap-2">
                            <AnimatedIcons.CheckCircle size={12} className="text-green-500 mt-1 flex-shrink-0" />
                            <p className={`text-sm text-secondary ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{achievement}</p>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Button 
                        variant="outline" 
                        className={`w-full border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
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
            <Button size="lg" className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl transform transition-all hover:scale-105 flex items-center gap-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              <AnimatedIcons.Users size={20} />
              {locale === 'bn' ? 'চলুন একসাথে কাজ করি' : "Let's Work Together"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
