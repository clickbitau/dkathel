'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CertificationFlipCard from '@/components/certifications/certification-flip-card';
import { motion } from 'framer-motion';
import { useMessages } from 'next-intl';

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

// Static certifications data
const staticCertifications: Certification[] = [
  {
    _id: '1',
    name: 'Advanced Diploma of Information Technology',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Comprehensive IT qualification covering system administration, networking, and software development.',
    issueDate: '2023-06-01',
    image: '/images/certifications/adv-dip-it.jpg',
    skills: ['System Administration', 'Networking', 'Software Development', 'Database Management'],
    category: 'Information Technology',
    isActive: true,
    displayOrder: 1,
    createdAt: '2023-06-01'
  },
  {
    _id: '2',
    name: 'Advanced Diploma of Business',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Advanced business management qualification covering strategic planning, operations, and leadership.',
    issueDate: '2023-06-01',
    image: '/images/certifications/adv-dip-business.jpg',
    skills: ['Business Strategy', 'Operations Management', 'Financial Planning', 'Leadership'],
    category: 'Business',
    isActive: true,
    displayOrder: 2,
    createdAt: '2023-06-01'
  },
  {
    _id: '3',
    name: 'Advanced Diploma of Leadership & Management',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Leadership and management qualification covering team leadership, strategic planning, and organizational development.',
    issueDate: '2023-06-01',
    image: '/images/certifications/adv-dip-lm.jpg',
    skills: ['Team Leadership', 'Strategic Planning', 'Organizational Development', 'Change Management'],
    category: 'Leadership',
    isActive: true,
    displayOrder: 3,
    createdAt: '2023-06-01'
  },
  {
    _id: '4',
    name: 'Bachelor of Cyber Security',
    issuer: 'Victoria University, Sydney',
    description: 'Undergraduate degree in cybersecurity covering network security, ethical hacking, and security management.',
    issueDate: '2024-08-01',
    image: '/images/certifications/bachelor-cyber.jpg',
    skills: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'Security Management'],
    category: 'Cybersecurity',
    isActive: true,
    displayOrder: 4,
    createdAt: '2024-08-01'
  },
  {
    _id: '5',
    name: 'Certificate IV in Training and Assessment (TAE40122)',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Qualification for training and assessment in vocational education and training sector.',
    issueDate: '2024-01-01',
    image: '/images/certifications/tae40122.jpg',
    skills: ['Training Delivery', 'Assessment Design', 'Competency-Based Training', 'Adult Learning'],
    category: 'Education',
    isActive: true,
    displayOrder: 5,
    createdAt: '2024-01-01'
  },
  {
    _id: '6',
    name: 'Diploma of Information Technology',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'IT qualification covering technical support, web development, and database administration.',
    issueDate: '2022-06-01',
    image: '/images/certifications/dip-it.jpg',
    skills: ['Technical Support', 'Web Development', 'Database Administration', 'System Support'],
    category: 'Information Technology',
    isActive: true,
    displayOrder: 6,
    createdAt: '2022-06-01'
  },
  {
    _id: '7',
    name: 'Certificate IV in Disability',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Qualification for providing support services to people with disability.',
    issueDate: '2022-01-01',
    image: '/images/certifications/cert-iv-disability.jpg',
    skills: ['Disability Support', 'Person-Centered Care', 'Community Services', 'Support Planning'],
    category: 'Community Services',
    isActive: true,
    displayOrder: 7,
    createdAt: '2022-01-01'
  },
  {
    _id: '8',
    name: 'Certificate IV in Ageing Support',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Qualification for providing support services to elderly individuals.',
    issueDate: '2022-01-01',
    image: '/images/certifications/cert-iv-ageing.jpg',
    skills: ['Aged Care', 'Person-Centered Care', 'Health Support', 'Community Services'],
    category: 'Community Services',
    isActive: true,
    displayOrder: 8,
    createdAt: '2022-01-01'
  },
  {
    _id: '9',
    name: 'Certificate IV in Real Estate Practice',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Qualification for real estate sales and property management.',
    issueDate: '2021-06-01',
    image: '/images/certifications/cert-iv-realestate.jpg',
    skills: ['Property Sales', 'Property Management', 'Real Estate Law', 'Client Relations'],
    category: 'Real Estate',
    isActive: true,
    displayOrder: 9,
    createdAt: '2021-06-01'
  },
  {
    _id: '10',
    name: 'Diploma of Education and Childcare',
    issuer: 'TAFE NSW / Registered Training Organization',
    description: 'Qualification for early childhood education and care.',
    issueDate: '2021-01-01',
    image: '/images/certifications/dip-education.jpg',
    skills: ['Early Childhood Education', 'Child Development', 'Curriculum Planning', 'Family Engagement'],
    category: 'Education',
    isActive: true,
    displayOrder: 10,
    createdAt: '2021-01-01'
  }
];

export default function CertificationsPage() {
  const messages = useMessages();
  const pathname = usePathname();
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';
  // Initialize with static data to prevent loading state
  const [certifications, setCertifications] = useState<Certification[]>(staticCertifications);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchCertifications = useCallback(async () => {
    try {
      const params = new URLSearchParams({ isActive: 'true' });
      if (search) params.append('search', search);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/certifications?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch certifications');
      }
      const data = await response.json();
      const certs = data.certifications || [];
      // Only update if API returns data
      if (certs.length > 0) {
        setCertifications(certs);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      // Apply local filtering on static data
      let filteredCerts = staticCertifications;
      if (search) {
        filteredCerts = filteredCerts.filter(c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.issuer.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (selectedCategory) {
        filteredCerts = filteredCerts.filter(c => c.category === selectedCategory);
      }
      setCertifications(filteredCerts);
    }
  }, [search, selectedCategory]);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  // Also refetch when search/category changes
  useEffect(() => {
    fetchCertifications();
  }, [search, selectedCategory]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  // Get unique categories from certifications
  const allCategories = Array.from(new Set(certifications.map(cert => cert.category)));

  if (loading) {
    return (
      <>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <div className="animate-pulse">
                <div className="h-16 bg-gray-300 rounded mb-6 mx-auto max-w-2xl"></div>
                <div className="h-6 bg-gray-300 rounded mx-auto max-w-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-12 mx-auto max-w-md"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
              {messages?.certifications?.title || 'Certifications & Achievements'}
            </h1>
            <p className={`text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {messages?.certifications?.subtitle || 'Professional certifications and continuous learning achievements'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          {certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Input
                      placeholder={messages?.certifications?.search_placeholder || "Search certifications..."}
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearch('');
                        setSelectedCategory('');
                      }}
                      className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {messages?.certifications?.clear || 'Clear'}
                    </Button>
                  </div>

                  {/* Category Filter */}
                  {allCategories.length > 1 && (
                    <div className="flex flex-wrap gap-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400 py-1 px-2 font-semibold">
                        {messages?.certifications?.filter_by_category || 'Filter by category:'}
                      </span>
                      {allCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryFilter(category)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                            }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Certifications Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <CertificationFlipCard certification={cert} />
              </motion.div>
            ))}
          </motion.div>

          {/* No certifications message */}
          {certifications.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-slate-700 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                  {search || selectedCategory ?
                    (messages?.certifications?.no_certifications_search || 'No certifications found') :
                    (messages?.certifications?.no_certifications || 'No certifications available')
                  }
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {search || selectedCategory ?
                    (messages?.certifications?.no_certifications_search || 'No certifications match your current search criteria.') :
                    (messages?.certifications?.no_certifications || 'Certifications will be displayed here once they are added.')
                  }
                </p>
                {(search || selectedCategory) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory('');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
                  >
                    {messages?.certifications?.show_all || 'Show All Certifications'}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          {certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-slate-700 max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {messages?.certifications?.cta_title || 'Interested in Working Together?'}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {messages?.certifications?.cta_subtitle || "With these certifications and continuous learning, I'm ready to help you with your next project."}
                </p>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300">
                  <Link href="/contact">
                    {messages?.certifications?.cta_button || 'Get in Touch'}
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
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
              {messages?.certifications?.hero_cta_title || 'Ready to Collaborate?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {messages?.certifications?.hero_cta_subtitle || "Let's discuss how my certifications and expertise can help bring your vision to life."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {messages?.certifications?.hero_cta_contact || 'Get in Touch'}
              </a>
              <a
                href="/experience"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {messages?.certifications?.hero_cta_experience || 'View Experience'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}