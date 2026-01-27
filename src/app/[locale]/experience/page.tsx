'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

// Helper function to convert English numerals to Bengali
const toBengaliNumeral = (str: string): string => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliNumerals[parseInt(digit)]);
};

// Locale-specific experience data
const getExperiences = (locale: string) => {
  if (locale === 'bn') {
    return [
      {
        id: '1',
        title: 'প্রতিষ্ঠাতা এবং সিইও',
        company: 'ক্লিকবিট',
        location: 'সিডনি, এনএসডব্লিউ, অস্ট্রেলিয়া',
        startDate: '2024-01-01',
        endDate: null,
        current: true,
        description: 'অস্ট্রেলিয়া জুড়ে স্টার্টআপ এবং ছোট ব্যবসার জন্য ওয়েব ডেভেলপমেন্ট, মোবাইল অ্যাপস, ক্লাউড সমাধান, আইটি সাপোর্ট এবং ডিজিটাল মার্কেটিং সেবা প্রদানকারী একটি পূর্ণ-সেবা ডিজিটাল এজেন্সির নেতৃত্ব দিচ্ছি।',
        achievements: [
          'ওয়েব ডেভ, মোবাইল অ্যাপস, ক্লাউড, আইটি সাপোর্ট, ডিজিটাল মার্কেটিং, UI/UX সহ ব্যাপক সেবা তৈরি করেছি',
          'ক্লায়েন্টদের জন্য কাস্টম সফ্টওয়্যার সমাধান এবং ই-কমার্স প্ল্যাটফর্ম তৈরি করেছি',
          'ছোট ব্যবসার জন্য ডিজিটাল রূপান্তর কৌশল বাস্তবায়ন করেছি',
          'ব্র্যান্ড পরিচয় তৈরি করেছি এবং সামাজিক প্ল্যাটফর্মের মাধ্যমে লিড জেনারেশন চালিয়েছি'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'AWS', 'Azure', 'WordPress', 'Shopify', 'Google Ads', 'Meta Ads']
      },
      {
        id: '2',
        title: 'আইটি সাপোর্ট কনসালট্যান্ট',
        company: 'স্ব-কর্মসংস্থান',
        location: 'সিডনি, এনএসডব্লিউ, অস্ট্রেলিয়া',
        startDate: '2022-06-01',
        endDate: null,
        current: true,
        description: 'আইটি সাপোর্ট পরামর্শ সেবা প্রদান করছি, ক্লায়েন্টদের নেটওয়ার্ক মূল্যায়ন, আইটি কৌশল এবং সিস্টেম রক্ষণাবেক্ষণে সাহায্য করছি। ব্যবসায়িক উদ্দেশ্যের সাথে সামঞ্জস্যপূর্ণ কাস্টমাইজড আইটি সমাধান তৈরি করছি।',
        achievements: [
          'নেটওয়ার্ক মূল্যায়ন এবং সিকিউরিটি অডিট পরিচালনা করেছি',
          'ব্যবসায়িক লক্ষ্যের সাথে সামঞ্জস্যপূর্ণ আইটি কৌশল তৈরি করেছি',
          'সিস্টেম রক্ষণাবেক্ষণ এবং অবকাঠামো সমাধান বাস্তবায়ন করেছি',
          'কর্মীদের জন্য প্রযুক্তিগত সহায়তা এবং প্রশিক্ষণ প্রদান করেছি'
        ],
        technologies: ['Windows Server', 'Active Directory', 'Microsoft 365', 'Azure', 'নেটওয়ার্কিং', 'সাইবারসিকিউরিটি']
      },
      {
        id: '3',
        title: 'মার্কেটিং প্রধান',
        company: 'বিএস গ্লোবাল এডুকেশন',
        location: 'সিডনি, এনএসডব্লিউ, অস্ট্রেলিয়া',
        startDate: '2021-03-01',
        endDate: '2022-05-01',
        current: false,
        description: 'উদ্ভাবনী মার্কেটিং কৌশল এবং শক্তিশালী ছাত্র সম্পর্কের মাধ্যমে শিক্ষা শিল্পে কোম্পানির খ্যাতি বৃদ্ধি করেছি। ছাত্র পরামর্শ এবং লক্ষ্যভিত্তিক প্রচারণার উপর ফোকাস করেছি।',
        achievements: [
          'শিক্ষা সেবার জন্য মার্কেটিং কৌশল তৈরি এবং কার্যকর করেছি',
          'সম্ভাব্য ছাত্রদের সাথে শক্তিশালী সম্পর্ক তৈরি করেছি',
          'তালিকাভুক্তি বাড়ানো লক্ষ্যভিত্তিক প্রচারণা তৈরি করেছি',
          'শিক্ষা পরামর্শে বিশ্বস্ত নেতা হিসেবে ব্র্যান্ড প্রতিষ্ঠা করেছি'
        ],
        technologies: ['Google Analytics', 'CRM সিস্টেম', 'ইমেইল মার্কেটিং', 'সোশ্যাল মিডিয়া মার্কেটিং', 'কন্টেন্ট কৌশল']
      },
      {
        id: '4',
        title: 'সিইও',
        company: 'ট্রায়োনিক্স আইটি',
        location: 'সিডনি, এনএসডব্লিউ, অস্ট্রেলিয়া',
        startDate: '2020-01-01',
        endDate: '2023-12-01',
        current: false,
        description: 'ছোট থেকে মাঝারি ব্যবসার জন্য বিশেষায়িত আইটি এবং ডিজিটাল মার্কেটিং সমাধান প্রদানকারী একটি ক্রমবর্ধমান সিডনি-ভিত্তিক প্রযুক্তি কোম্পানির নেতৃত্ব দিয়েছি। প্রতিযোগিতামূলক মূল্যে উচ্চ-মূল্যের সেবা প্রদান করেছি।',
        achievements: [
          'কোম্পানির অপারেশন স্কেল করেছি এবং ক্লায়েন্ট বেস ২০০% বৃদ্ধি করেছি',
          'অত্যাধুনিক আইটি সমাধান এবং ডিজিটাল মার্কেটিং সেবা প্রদান করেছি',
          'শিল্প নেতাদের সাথে কৌশলগত অংশীদারিত্ব স্থাপন করেছি',
          '২০+ পেশাদারের একটি দল তৈরি এবং পরামর্শ দিয়েছি'
        ],
        technologies: ['ক্লাউড অবকাঠামো', 'SaaS সমাধান', 'ডিজিটাল মার্কেটিং', 'প্রজেক্ট ম্যানেজমেন্ট', 'ব্যবসায়িক কৌশল']
      }
    ];
  }

  // English (default)
  return [
    {
      id: '1',
      title: 'Founder & CEO',
      company: 'ClickBit',
      location: 'Sydney, NSW, Australia',
      startDate: '2024-01-01',
      endDate: null,
      current: true,
      description: 'Leading a full-service digital agency providing web development, mobile apps, cloud solutions, IT support, and digital marketing services for startups and small businesses across Australia.',
      achievements: [
        'Built comprehensive service offering: Web Dev, Mobile Apps, Cloud, IT Support, Digital Marketing, UI/UX',
        'Developed custom software solutions and e-commerce platforms for clients',
        'Implemented digital transformation strategies for small businesses',
        'Created brand identities and drove lead generation through social platforms'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'AWS', 'Azure', 'WordPress', 'Shopify', 'Google Ads', 'Meta Ads']
    },
    {
      id: '2',
      title: 'IT Support Consultant',
      company: 'Self-Employed',
      location: 'Sydney, NSW, Australia',
      startDate: '2022-06-01',
      endDate: null,
      current: true,
      description: 'Providing IT support consulting services, helping clients with network assessments, IT strategies, and system maintenance. Developing customized IT solutions aligned with business objectives.',
      achievements: [
        'Conducted network assessments and security audits',
        'Developed IT strategies aligned with business goals',
        'Implemented system maintenance and infrastructure solutions',
        'Provided technical support and training for staff'
      ],
      technologies: ['Windows Server', 'Active Directory', 'Microsoft 365', 'Azure', 'Networking', 'Cybersecurity']
    },
    {
      id: '3',
      title: 'Head of Marketing',
      company: 'BS Global Education',
      location: 'Sydney, NSW, Australia',
      startDate: '2021-03-01',
      endDate: '2022-05-01',
      current: false,
      description: 'Enhanced company reputation in the education industry through innovative marketing strategies and strong student relationships. Focused on student consultation and targeted campaigns.',
      achievements: [
        'Developed and executed marketing strategies for educational services',
        'Built strong relationships with prospective students',
        'Created targeted campaigns that increased enrollment',
        'Established brand as a trusted leader in education consulting'
      ],
      technologies: ['Google Analytics', 'CRM Systems', 'Email Marketing', 'Social Media Marketing', 'Content Strategy']
    },
    {
      id: '4',
      title: 'CEO',
      company: 'Trionix IT',
      location: 'Sydney, NSW, Australia',
      startDate: '2020-01-01',
      endDate: '2023-12-01',
      current: false,
      description: 'Led a growing Sydney-based technology company providing specialized IT and digital marketing solutions for small to medium businesses. Delivered competitive pricing and high-value services.',
      achievements: [
        'Scaled company operations and expanded client base by 200%',
        'Delivered cutting-edge IT solutions and digital marketing services',
        'Established strategic partnerships with industry leaders',
        'Built and mentored a team of 20+ professionals'
      ],
      technologies: ['Cloud Infrastructure', 'SaaS Solutions', 'Digital Marketing', 'Project Management', 'Business Strategy']
    }
  ];
};

// Locale-specific skills data
const getSkills = (locale: string): Record<string, Array<{ id: string; name: string; proficiency: string; description: string }>> => {
  if (locale === 'bn') {
    return {
      'ওয়েব ডেভেলপমেন্ট': [
        { id: '1', name: 'React এবং Next.js', proficiency: 'বিশেষজ্ঞ', description: 'React ইকোসিস্টেম দিয়ে আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি' },
        { id: '2', name: 'Node.js', proficiency: 'উন্নত', description: 'ব্যাকএন্ড ডেভেলপমেন্ট এবং API তৈরি' },
        { id: '3', name: 'TypeScript', proficiency: 'উন্নত', description: 'টাইপ-সেফ JavaScript ডেভেলপমেন্ট' },
        { id: '4', name: 'WordPress এবং Shopify', proficiency: 'বিশেষজ্ঞ', description: 'ই-কমার্স এবং CMS সমাধান' }
      ],
      'ক্লাউড সমাধান': [
        { id: '5', name: 'AWS', proficiency: 'উন্নত', description: 'ক্লাউড অবকাঠামো এবং সেবা' },
        { id: '6', name: 'Azure', proficiency: 'উন্নত', description: 'মাইক্রোসফট ক্লাউড প্ল্যাটফর্ম' },
        { id: '7', name: 'DevOps', proficiency: 'মধ্যবর্তী', description: 'CI/CD পাইপলাইন এবং অটোমেশন' }
      ],
      'আইটি সাপোর্ট': [
        { id: '8', name: 'নেটওয়ার্ক অ্যাডমিনিস্ট্রেশন', proficiency: 'বিশেষজ্ঞ', description: 'অবকাঠামো এবং নেটওয়ার্ক ম্যানেজমেন্ট' },
        { id: '9', name: 'সাইবারসিকিউরিটি', proficiency: 'উন্নত', description: 'সিকিউরিটি অডিট এবং সেরা অনুশীলন' },
        { id: '10', name: 'সিস্টেম রক্ষণাবেক্ষণ', proficiency: 'বিশেষজ্ঞ', description: 'হার্ডওয়্যার এবং সফ্টওয়্যার সমস্যা সমাধান' }
      ],
      'ডিজিটাল মার্কেটিং': [
        { id: '11', name: 'SEO এবং SEM', proficiency: 'বিশেষজ্ঞ', description: 'সার্চ ইঞ্জিন অপ্টিমাইজেশন এবং মার্কেটিং' },
        { id: '12', name: 'সোশ্যাল মিডিয়া মার্কেটিং', proficiency: 'বিশেষজ্ঞ', description: 'ব্র্যান্ড বিল্ডিং এবং এনগেজমেন্ট' },
        { id: '13', name: 'Google এবং Meta Ads', proficiency: 'উন্নত', description: 'পেইড বিজ্ঞাপন প্রচারণা' }
      ],
      'মোবাইল ডেভেলপমেন্ট': [
        { id: '14', name: 'React Native', proficiency: 'মধ্যবর্তী', description: 'ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপস' },
        { id: '15', name: 'iOS এবং Android', proficiency: 'মধ্যবর্তী', description: 'নেটিভ মোবাইল ডেভেলপমেন্ট' }
      ]
    };
  }

  // English (default)
  return {
    'Web Development': [
      { id: '1', name: 'React & Next.js', proficiency: 'expert', description: 'Building modern web applications with React ecosystem' },
      { id: '2', name: 'Node.js', proficiency: 'advanced', description: 'Backend development and API creation' },
      { id: '3', name: 'TypeScript', proficiency: 'advanced', description: 'Type-safe JavaScript development' },
      { id: '4', name: 'WordPress & Shopify', proficiency: 'expert', description: 'E-commerce and CMS solutions' }
    ],
    'Cloud Solutions': [
      { id: '5', name: 'AWS', proficiency: 'advanced', description: 'Cloud infrastructure and services' },
      { id: '6', name: 'Azure', proficiency: 'advanced', description: 'Microsoft cloud platform' },
      { id: '7', name: 'DevOps', proficiency: 'intermediate', description: 'CI/CD pipelines and automation' }
    ],
    'IT Support': [
      { id: '8', name: 'Network Administration', proficiency: 'expert', description: 'Infrastructure and network management' },
      { id: '9', name: 'Cybersecurity', proficiency: 'advanced', description: 'Security audits and best practices' },
      { id: '10', name: 'System Maintenance', proficiency: 'expert', description: 'Hardware and software troubleshooting' }
    ],
    'Digital Marketing': [
      { id: '11', name: 'SEO & SEM', proficiency: 'expert', description: 'Search engine optimization and marketing' },
      { id: '12', name: 'Social Media Marketing', proficiency: 'expert', description: 'Brand building and engagement' },
      { id: '13', name: 'Google & Meta Ads', proficiency: 'advanced', description: 'Paid advertising campaigns' }
    ],
    'Mobile Development': [
      { id: '14', name: 'React Native', proficiency: 'intermediate', description: 'Cross-platform mobile apps' },
      { id: '15', name: 'iOS & Android', proficiency: 'intermediate', description: 'Native mobile development' }
    ]
  };
};

// Get localized labels
const getLabels = (locale: string) => {
  if (locale === 'bn') {
    return {
      keyAchievements: 'প্রধান সাফল্য',
      technologiesTools: 'প্রযুক্তি ও সরঞ্জাম',
      present: 'বর্তমান'
    };
  }
  return {
    keyAchievements: 'Key Achievements',
    technologiesTools: 'Technologies & Tools',
    present: 'Present'
  };
};

export default function ExperiencePage() {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const t = useTranslations('experience');

  const experiences = getExperiences(locale);
  const skills = getSkills(locale);
  const labels = getLabels(locale);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

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
              {t('title')}
            </h1>
            <p className={`text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                        {experience.title}
                      </h2>
                      <p className={`text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                        {experience.company}
                      </p>
                      <p className={`text-gray-600 dark:text-gray-400 mb-2 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                        📍 {experience.location}
                      </p>
                      <p className={`text-sm text-gray-500 dark:text-gray-400 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-full inline-block ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                        📅 {formatDate(experience.startDate)} - {experience.current ? labels.present : formatDate(experience.endDate!)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed text-lg ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                      {experience.description}
                    </p>

                    {experience.achievements && experience.achievements.length > 0 && (
                      <div>
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                          {labels.keyAchievements}
                        </h3>
                        <ul className="space-y-3">
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <span className="text-blue-600 dark:text-blue-400 text-lg">•</span>
                              <span className={`text-gray-700 dark:text-gray-300 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {experience.technologies && experience.technologies.length > 0 && (
                      <div>
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                          {labels.technologiesTools}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {experience.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-16">
              <h2 className={`text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                {t('skills_title')}
              </h2>
              <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                {t('skills_subtitle')}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, categorySkills], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                      <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-4 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-600">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`font-semibold text-gray-900 dark:text-white text-sm ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{skill.name}</span>
                              <span className={`text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full capitalize ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                                {skill.proficiency}
                              </span>
                            </div>
                            {skill.description && (
                              <p className={`text-xs text-gray-600 dark:text-gray-400 leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                                {skill.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className={`text-4xl sm:text-5xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
              {t('cta_title')}
            </h2>
            <p className={`text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className={`bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
              >
                {t('cta_contact')}
              </a>
              <a
                href={`/${locale}/certifications`}
                className={`bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}
              >
                {t('cta_certifications')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
