import Image from "next/image";

interface HeroSectionProps {
  translations: {
    title: string;
    welcome: string;
    intro: string;
  };
}

export function AboutHeroSection({ translations }: HeroSectionProps) {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              {translations.welcome}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300">
              {translations.title}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {translations.intro}
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div className="lg:w-1/2 relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-gray-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <Image
                  src="/220425397_4245704658849837_2571234162176359243_n-mv0D3M7O76SL5X9x.avif"
                  alt="Kauser Ahmed Methel"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
