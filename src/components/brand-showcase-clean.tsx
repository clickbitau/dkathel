'use client';

import { motion, MotionProps } from '@/lib/motion';
import { Card } from '@/components/ui/card';
import { AnimatedIcons } from '@/components/ui/animated-icon';
import { usePathname } from 'next/navigation';

const brands = [
  {
    name: 'Trionix IT',
    category: 'IT Operations',
    years: '2023-2025',
    description: 'Led end-to-end operations, cross-team management, DevOps, security, and reliability initiatives.',
    impact: 'Zero-downtime deployment',
    icon: AnimatedIcons.ITShield,
    color: 'from-blue-600 to-cyan-500'
  },
  {
    name: 'ClickBIT',
    category: 'Digital Agency',
    years: '2025-Present',
    description: 'Founded creative agency focusing on content production, growth strategies, and measurable results.',
    impact: '400% growth achieved',
    icon: AnimatedIcons.DigitalAgency,
    color: 'from-purple-600 to-pink-500'
  },
  {
    name: 'B Training',
    category: 'Education Tech',
    years: '2024-2025',
    description: 'Developed custom LMS, mindset training programs, and community-building strategies.',
    impact: '10k+ learners trained',
    icon: AnimatedIcons.Education,
    color: 'from-green-600 to-teal-500'
  }
];

export function BrandShowcaseClean() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
            Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Collaborations</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
            From startups to Fortune 500 companies, I&apos;ve built lasting partnerships that drive
            innovation, security, and growth across diverse industries and scales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => {
            const IconComponent = brand.icon;
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                  <div className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${brand.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-500`}>
                      <IconComponent size={40} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{brand.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{brand.description}</p>

                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${brand.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                      {brand.impact}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
