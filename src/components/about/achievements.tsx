'use client';

import { motion, MotionProps } from '@/lib/motion';
import { usePathname } from 'next/navigation';
import { Code, TrendingUp, GraduationCap, type LucideIcon } from 'lucide-react';

// Helper function to convert English numerals to Bengali
const toBengaliNumeral = (str: string): string => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliNumerals[parseInt(digit)]);
};


interface AchievementItem {
  metric: string;
  description: string;
}

interface AchievementCategory {
  category: string;
  icon: LucideIcon;
  color: string;
  items: AchievementItem[];
}

interface AchievementsProps {
  translations: {
    title: string;
    subtitle: string;
    categories: {
      technical: {
        title: string;
        items: AchievementItem[];
      };
      business: {
        title: string;
        items: AchievementItem[];
      };
      education: {
        title: string;
        items: AchievementItem[];
      };
    };
  };
}

const getAchievements = (translations: AchievementsProps['translations']): AchievementCategory[] => [
  {
    category: translations.categories.technical.title,
    icon: Code,
    color: 'from-blue-500 to-cyan-400',
    items: translations.categories.technical.items
  },
  {
    category: translations.categories.business.title,
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    items: translations.categories.business.items
  },
  {
    category: translations.categories.education.title,
    icon: GraduationCap,
    color: 'from-yellow-500 to-orange-500',
    items: translations.categories.education.items
  }
];

const AchievementCard = ({ achievement, index, locale }: { achievement: AchievementCategory, index: number, locale: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
    <div className="relative h-full bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800">
      {/* Icon with enhanced design */}
      <div className="relative mb-8">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto bg-gradient-to-br ${achievement.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <achievement.icon size={32} />
        </div>
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${achievement.color} opacity-80`}></div>
      </div>

      <h3 className={`text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
        {achievement.category}
      </h3>

      <div className="space-y-5">
        {achievement.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-start p-5 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-slate-700 dark:group-hover:to-slate-800 transition-all duration-300 border border-gray-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-blue-700"
          >
            <div className={`w-20 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex-shrink-0 mr-4 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {locale === 'bn' ? toBengaliNumeral(item.metric) : item.metric}
            </div>
            <div className={`flex-1 text-slate-600 dark:text-slate-300 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {item.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export function Achievements({ translations }: AchievementsProps) {
  const achievements = getAchievements(translations);
  const pathname = usePathname();
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
            {translations.title}
          </h2>
          <p className={`text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
            {translations.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
