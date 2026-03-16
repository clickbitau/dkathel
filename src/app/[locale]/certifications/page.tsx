'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMessages } from 'next-intl';
import { Award, Sparkles, ArrowRight } from 'lucide-react';
import CertificateMasonryGallery from '@/components/certifications/certificate-masonry-gallery';

interface Certification {
  _id: string;
  name: string;
  issuer: string;
  description?: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  pdfUrl?: string;
  skills: string[];
  category: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

export default function CertificationsPage() {
  const messages = useMessages();
  const pathname = usePathname();
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertifications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/certifications');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCertifications(data.certifications || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      setCertifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  // Calculate stats
  const categories = Array.from(new Set(certifications.map(c => c.category)));
  const totalCerts = certifications.length;

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">{locale === 'bn' ? 'পেশাদার যোগ্যতা' : 'Professional Qualifications'}</span>
            </motion.div>

            {/* Title */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {messages?.certifications?.title || 'Certifications & Achievements'}
            </h1>

            <p className={`text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {messages?.certifications?.subtitle || 'Professional certifications demonstrating expertise across multiple domains'}
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-4xl font-bold text-white mb-1">{totalCerts}</div>
                <div className="text-gray-400 text-sm">{locale === 'bn' ? 'সার্টিফিকেশন' : 'Certifications'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-4xl font-bold text-white mb-1">{categories.length}</div>
                <div className="text-gray-400 text-sm">{locale === 'bn' ? 'বিশেষজ্ঞতা' : 'Specializations'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">{locale === 'bn' ? 'যাচাইকৃত' : 'Verified'}</span>
                </div>
                <div className="text-gray-400 text-sm">{locale === 'bn' ? 'সকল যোগ্যতা' : 'All Credentials'}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-8">
              {/* Loading skeleton for filter bar */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <div className="animate-pulse flex gap-4">
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl flex-1" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-full w-24" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-full w-24" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-full w-24" />
                </div>
              </div>

              {/* Loading skeleton for gallery */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="break-inside-avoid animate-pulse">
                    <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden">
                      <div className="aspect-[4/3] bg-slate-300 dark:bg-slate-600" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/3" />
                        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded" />
                        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <CertificateMasonryGallery
              certifications={certifications}
              locale={locale}
              messages={{
                search_placeholder: messages?.certifications?.search_placeholder || "Search certifications...",
              }}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl sm:text-5xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {messages?.certifications?.hero_cta_title || 'Ready to Collaborate?'}
            </h2>
            <p className={`text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {messages?.certifications?.hero_cta_subtitle || "Let's discuss how my expertise and qualifications can help bring your vision to life."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {messages?.certifications?.hero_cta_contact || 'Get in Touch'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/experience`}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white/50 px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                {messages?.certifications?.hero_cta_experience || 'View Experience'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}