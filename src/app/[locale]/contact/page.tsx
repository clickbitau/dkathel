import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { getMessages } from 'next-intl/server';

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
          >
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {messages?.contact?.title || 'Get in Touch'}
            </h1>
            <p className={`text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {messages?.contact?.subtitle || "Let's discuss opportunities, collaborations, or just chat about technology"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {messages?.contact?.form_title || 'Send a Message'}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {messages?.contact?.name_label || 'Name'}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={messages?.contact?.name_placeholder || "Your name"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {messages?.contact?.email_label || 'Email'}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={messages?.contact?.email_placeholder || "your@email.com"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {messages?.contact?.message_label || 'Message'}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full rounded-xl border border-gray-300 dark:border-slate-600 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder={messages?.contact?.message_placeholder || "Your message..."}
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                    {messages?.contact?.send_button || 'Send Message'}
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
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {messages?.contact?.connect_title || "Let's Connect"}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white">
                      📧
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">{messages?.contact?.email || 'dkathel@dkathel.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center text-white">
                      💼
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                      <p className="text-gray-600 dark:text-gray-400">{messages?.contact?.linkedin || 'linkedin.com/in/dkathel'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white">
                      🐙
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
                      <p className="text-gray-600 dark:text-gray-400">{messages?.contact?.github || 'github.com/dkathel'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {messages?.contact?.services_title || 'What I Offer'}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{messages?.contact?.service_it || 'IT Support & Consulting'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{messages?.contact?.service_web || 'Web Development'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{messages?.contact?.service_marketing || 'Digital Marketing'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{messages?.contact?.service_project || 'Project Management'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{messages?.contact?.service_strategy || 'Business Strategy'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-heading">
              {messages?.contact?.cta_title || 'Ready to Start a Project?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {messages?.contact?.cta_subtitle || "Let's discuss how we can work together to achieve your goals and create something amazing."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={locale === 'en' ? '/about' : `/${locale}/about`}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {messages?.contact?.cta_about || 'Learn More About Me'}
              </a>
              <a
                href={locale === 'en' ? '/experience' : `/${locale}/experience`}
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {messages?.contact?.cta_experience || 'View My Experience'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
