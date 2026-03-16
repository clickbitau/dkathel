'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useMessages } from 'next-intl';

// Interface for contact messages
interface ContactMessages {
  title?: string;
  subtitle?: string;
  form_title?: string;
  name_label?: string;
  name_placeholder?: string;
  email_label?: string;
  email_placeholder?: string;
  message_label?: string;
  message_placeholder?: string;
  send_button?: string;
  connect_title?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  services_title?: string;
  service_it?: string;
  service_web?: string;
  service_marketing?: string;
  service_project?: string;
  service_strategy?: string;
  cta_title?: string;
  cta_subtitle?: string;
  cta_about?: string;
  cta_experience?: string;
}

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;
  const messages = useMessages() as Record<string, unknown>;
  const contact = (messages?.contact || {}) as ContactMessages;

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {contact.title || 'Get in Touch'}
            </h1>
            <p className={`text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {contact.subtitle || "Let's discuss opportunities, collaborations, or just chat about technology"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {contact.form_title || 'Send a Message'}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {contact.name_label || 'Name'}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={contact.name_placeholder || "Your name"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {contact.email_label || 'Email'}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={contact.email_placeholder || "your@email.com"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {contact.message_label || 'Message'}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder={contact.message_placeholder || "Your message..."}
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white hover:from-gray-900 hover:to-black px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                    {contact.send_button || 'Send Message'}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {contact.connect_title || "Let's Connect"}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-white">
                      📧
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">{contact.email || 'dkathel@dkathel.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center text-white">
                      💼
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                      <p className="text-gray-600 dark:text-gray-400">{contact.linkedin || 'linkedin.com/in/dkathel'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center text-white">
                      🐙
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
                      <p className="text-gray-600 dark:text-gray-400">{contact.github || 'github.com/dkathel'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {contact.services_title || 'What I Offer'}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-teal-600 dark:text-teal-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{contact.service_it || 'IT Support & Consulting'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-teal-600 dark:text-teal-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{contact.service_web || 'Web Development'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-teal-600 dark:text-teal-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{contact.service_marketing || 'Digital Marketing'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-teal-600 dark:text-teal-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{contact.service_project || 'Project Management'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-teal-600 dark:text-teal-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{contact.service_strategy || 'Business Strategy'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-heading">
              {contact.cta_title || 'Ready to Start a Project?'}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {contact.cta_subtitle || "Let's discuss how we can work together to achieve your goals and create something amazing."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={locale === 'en' ? '/about' : `/${locale}/about`}
                className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {contact.cta_about || 'Learn More About Me'}
              </a>
              <a
                href={locale === 'en' ? '/experience' : `/${locale}/experience`}
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                {contact.cta_experience || 'View My Experience'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
