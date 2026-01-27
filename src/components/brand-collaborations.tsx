'use client';

import { motion, MotionProps } from '@/lib/motion';
import Image from 'next/image';

const partnerLogos = [
  // Education & Training
  { src: '/images/partners/logo-2.png', alt: 'PACIFIC CERTIFY', name: 'PACIFIC CERTIFY' },
  { src: '/images/partners/01-5.png', alt: 'B Training', name: 'B Training' },
  { src: '/images/partners/pleasant-education.png', alt: 'Pleasant Education', name: 'Pleasant Education' },
  { src: '/images/partners/royal-city-education.png', alt: 'Royal City Education', name: 'Royal City Education' },
  { src: '/images/partners/vxc.png', alt: 'VXC', name: 'VXC' },
  { src: '/images/partners/oc.png', alt: 'Outback Consulting', name: 'Outback Consulting' },

  // Technology & IT
  { src: '/images/partners/trionix.png', alt: 'Trionix IT', name: 'Trionix IT' },
  { src: '/images/partners/Click_Bit_Logo_Vec.png', alt: 'ClickBIT', name: 'ClickBIT' },
  { src: '/images/partners/bsf.png', alt: 'BS Foundation', name: 'BS Foundation' },
  { src: '/images/partners/bs-group.png', alt: 'BS Group', name: 'BS Group' },

  // Business & Consulting
  { src: '/images/partners/avrior-consulting.png', alt: 'Avrior Consulting', name: 'Avrior Consulting' },
  { src: '/images/partners/abci.png', alt: 'ABCI', name: 'ABCI' },
  { src: '/images/partners/mie.png', alt: 'MIE', name: 'MIE' },

  // Education Partners
  { src: '/images/partners/edu-vet.png', alt: 'Edu VET', name: 'Edu VET' },
  { src: '/images/partners/edu-wise.png', alt: 'Edu Wise', name: 'Edu Wise' },
  { src: '/images/partners/la.png', alt: 'LA Education', name: 'LA Education' },

  // Additional Partners
  { src: '/images/partners/logo-2-1.png', alt: 'Partner', name: 'Partner' },
  { src: '/images/partners/logo01.png', alt: 'Partner', name: 'Partner' },
  { src: '/images/partners/logo2.png', alt: 'Partner', name: 'Partner' },
  { src: '/images/partners/q-logo.png', alt: 'Q Logo', name: 'Q Logo' },
  { src: '/images/partners/23t.png', alt: '23T', name: '23T' }
];

interface Messages {
  homepage?: {
    brand_collaborations?: {
      title?: string;
      description?: string;
    };
  };
  [key: string]: unknown;
}

interface BrandCollaborationsProps {
  messages: Messages;
  locale?: string;
}

export function BrandCollaborations({ messages, locale = 'en' }: BrandCollaborationsProps) {
  const isBengali = locale === 'bn';

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 to-gray-100/30 dark:from-teal-900/30 dark:to-gray-900/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary dark:text-white mb-6">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-400 ${isBengali ? 'font-heading-bn' : 'font-heading-en'}`}>
              {messages.homepage?.brand_collaborations?.title}
            </span>
          </h2>
          <p className={`text-xl text-secondary max-w-3xl mx-auto leading-relaxed ${isBengali ? 'font-body-bn' : 'font-body-en'}`}>
            {messages.homepage?.brand_collaborations?.description}
          </p>
        </motion.div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={partner.src}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 border border-gray-200 dark:border-gray-700">
                <div className="aspect-square relative flex items-center justify-center">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={120}
                    className="object-contain w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:brightness-110 dark:brightness-110"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
