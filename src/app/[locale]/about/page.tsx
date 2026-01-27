import { getTranslations } from 'next-intl/server';
import { StoryTimeline } from '@/components/about/story-timeline';
import { Achievements } from '@/components/about/achievements';
import { motion } from 'framer-motion';

async function getSkills() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/skills`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return {};
  }
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const skills = await getSkills();

  const translations = {
    title: t('title'),
    welcome: t('welcome'),
    intro: t('intro'),
    journeyTitle: t('journeyTitle'),
    journeyContent: t('journeyContent'),
    trionixTitle: t('trionixTitle'),
    trionixContent: t('trionixContent'),
    educationTitle: t('educationTitle'),
    educationContent: t('educationContent'),
    passionTitle: t('passionTitle'),
    passionContent: t('passionContent'),
    personalTitle: t('personalTitle'),
    personalContent: t('personalContent'),
    australiaTitle: t('australiaTitle'),
    australiaRole: t('australiaRole'),
    australiaContent: t('australiaContent'),
    clickbitTitle: t('clickbitTitle'),
    clickbitRole: t('clickbitRole'),
    clickbitContent: t('clickbitContent'),
    trionixRole: t('trionixRole'),
    educationRole: t('educationRole'),
    avriorTitle: t('avriorTitle'),
    avriorRole: t('avriorRole'),
    avriorContent: t('avriorContent'),
    sectionTitle: t('sectionTitle'),
    sectionSubtitle: t('sectionSubtitle'),
    achievements: {
      title: t('achievements.title'),
      subtitle: t('achievements.subtitle'),
      categories: {
        technical: {
          title: t('achievements.categories.technical.title'),
          items: [
            { metric: '6+', description: t('achievements.categories.technical.item_descriptions.0') },
            { metric: '20+', description: t('achievements.categories.technical.item_descriptions.1') },
            { metric: '98%', description: t('achievements.categories.technical.item_descriptions.2') }
          ]
        },
        business: {
          title: t('achievements.categories.business.title'),
          items: [
            { metric: '2023', description: t('achievements.categories.business.item_descriptions.0') },
            { metric: '2021', description: t('achievements.categories.business.item_descriptions.1') },
            { metric: '8+', description: t('achievements.categories.business.item_descriptions.2') }
          ]
        },
        education: {
          title: t('achievements.categories.education.title'),
          items: [
            { metric: '2024', description: t('achievements.categories.education.item_descriptions.0') },
            { metric: '2023', description: t('achievements.categories.education.item_descriptions.1') },
            { metric: '100%', description: t('achievements.categories.education.item_descriptions.2') }
          ]
        }
      }
    },
    skillsTitle: t('skills_title'),
    skillsSubtitle: t('skills_subtitle'),
    ctaReadyTitle: t('cta_ready_title'),
    ctaReadySubtitle: t('cta_ready_subtitle'),
    ctaGetInTouch: t('cta_get_in_touch'),
    ctaViewExperience: t('cta_view_experience')
  };

  const getCategoryDisplayName = (category: string) => {
    return category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Montserrat Alternates', system-ui, sans-serif" }}>
            {translations.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Mina', sans-serif" }}>
            {translations.welcome}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {translations.intro}
            </h2>
            <div className={`space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              <p>{translations.journeyContent}</p>
              <p>{translations.trionixContent}</p>
              <p>{translations.educationContent}</p>
              <p>{translations.passionContent}</p>
              <p>{translations.personalContent}</p>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <StoryTimeline translations={translations} locale={locale} />
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Achievements translations={translations.achievements} />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {translations.skillsTitle}
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {translations.skillsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, categorySkills]: [string, any], index) => (
              <div
                key={category}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                    {getCategoryDisplayName(category)}
                  </h3>
                  <div className="space-y-4">
                    {categorySkills.map((skill: any) => (
                      <div key={skill.id} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold text-gray-900 dark:text-white ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{skill.name}</span>
                          <span className={`text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 px-3 py-1 rounded-full capitalize ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                            {skill.proficiency}
                          </span>
                        </div>
                        {skill.description && (
                          <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className={`text-4xl sm:text-5xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {translations.ctaReadyTitle}
            </h2>
            <p className={`text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {translations.ctaReadySubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className={`bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
              >
                {translations.ctaGetInTouch}
              </a>
              <a
                href={`/${locale}/experience`}
                className={`bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
              >
                {translations.ctaViewExperience}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
