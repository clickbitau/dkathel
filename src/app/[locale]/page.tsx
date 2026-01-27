import { Hero } from "@/components/hero";
import { BrandCollaborations } from "@/components/brand-collaborations";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { getMessages } from 'next-intl/server';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <>
      <Hero />
      <BrandCollaborations messages={messages} locale={locale} />
      <ExperienceTimeline messages={messages} />

      {/* Ready to Collaborate Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {messages?.homepage?.ready_to_collaborate?.title || 'Ready to Collaborate?'}
            </h2>
            <p className={`text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {messages?.homepage?.ready_to_collaborate?.description || "Let's discuss how we can work together to achieve your business objectives and create innovative solutions."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {messages?.homepage?.ready_to_collaborate?.get_in_touch || 'Get in Touch'}
              </a>
              <a
                href={locale === 'en' ? '/about' : `/${locale}/about`}
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {messages?.homepage?.ready_to_collaborate?.learn_more || 'Learn More'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}