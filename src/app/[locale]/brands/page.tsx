'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useMessages } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { companyTranslationsBn } from '@/data/company-translations-bn';

interface Company {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category: string;
  relationship: 'client' | 'partner' | 'employer' | 'collaboration';
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  displayOrder: number;
  featured: boolean;
  technologies?: string[];
  achievements?: string[];
  createdAt: string;
}

interface CategoryStat {
  _id: string;
  count: number;
}

const categoryColors: Record<string, string> = {
  'Technology': 'from-blue-600 to-cyan-500',
  'Education': 'from-green-600 to-teal-500',
  'Digital Marketing': 'from-purple-600 to-pink-500',
  'Consulting': 'from-orange-600 to-red-500',
  'Healthcare': 'from-emerald-600 to-green-500',
  'Finance': 'from-yellow-600 to-orange-500',
  'E-commerce': 'from-indigo-600 to-purple-500',
  'Business': 'from-amber-600 to-yellow-500',
  'Other': 'from-gray-600 to-slate-500'
};

// Category translations
const categoryTranslations: Record<string, { en: string; bn: string }> = {
  'Technology': { en: 'Technology', bn: 'প্রযুক্তি' },
  'Education': { en: 'Education', bn: 'শিক্ষা' },
  'Digital Marketing': { en: 'Digital Marketing', bn: 'ডিজিটাল মার্কেটিং' },
  'Consulting': { en: 'Consulting', bn: 'পরামর্শ' },
  'Healthcare': { en: 'Healthcare', bn: 'স্বাস্থ্যসেবা' },
  'Finance': { en: 'Finance', bn: 'অর্থ' },
  'E-commerce': { en: 'E-commerce', bn: 'ই-কমার্স' },
  'Business': { en: 'Business', bn: 'ব্যবসা' },
  'Other': { en: 'Other', bn: 'অন্যান্য' }
};

// Relationship translations
const relationshipTranslations: Record<string, { en: string; bn: string }> = {
  'client': { en: 'Client', bn: 'ক্লায়েন্ট' },
  'partner': { en: 'Partner', bn: 'অংশীদার' },
  'employer': { en: 'Employer', bn: 'নিয়োগকর্তা' },
  'collaboration': { en: 'Collaboration', bn: 'সহযোগিতা' },
  'founded': { en: 'Founded', bn: 'প্রতিষ্ঠাতা' }
};

export default function BrandsPage() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en';
  const messages = useMessages() as Record<string, any>;
  const brands = messages?.brands || {};

  const [companies, setCompanies] = useState<Company[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Helper to translate category
  const translateCategory = (category: string) => {
    return categoryTranslations[category]?.[locale as 'en' | 'bn'] || category;
  };

  // Helper to translate relationship
  const translateRelationship = (relationship: string) => {
    return relationshipTranslations[relationship.toLowerCase()]?.[locale as 'en' | 'bn'] || relationship;
  };

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await fetch('/api/companies?isActive=true');
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      const data = await response.json();
      setCompanies(data.companies || []);
      setCategoryStats(data.categoryStats || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
      setCategoryStats([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate) return '';
    const start = new Date(startDate).getFullYear();
    const endText = locale === 'bn' ? 'বর্তমান' : 'Present';
    const end = endDate ? new Date(endDate).getFullYear() : endText;
    return `${start}-${end}`;
  };

  if (loading) {
    return (
      <>
        <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-700 rounded mb-6 mx-auto max-w-2xl"></div>
              <div className="h-6 bg-gray-700 rounded mx-auto max-w-3xl"></div>
            </div>
          </div>
        </div>
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-12 mx-auto max-w-md"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
            {brands.title || 'Brand'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-gray-300 to-teal-400">{brands.title_highlight || 'Partnerships'}</span>
          </h1>
          <p className={`text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
            {brands.subtitle || 'From startups to established enterprises, building lasting partnerships that drive innovation and growth.'}
          </p>
        </div>
      </section>

      {/* Industry Categories */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-heading">
            {brands.industries_title || 'Industries We Serve'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoryStats.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[category._id] || categoryColors['Other']} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>
                    {category.count}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{translateCategory(category._id)}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 font-heading">
            {brands.featured_title || 'Featured'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-400">{brands.featured_highlight || 'Partnerships'}</span>
          </h2>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === 'all' ? 'bg-gradient-to-r from-gray-800 to-teal-600 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              {brands.all_categories || 'All'} ({companies.length})
            </button>
            {categoryStats.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat._id ? 'bg-gradient-to-r from-gray-800 to-teal-600 text-white shadow-lg scale-105' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                {translateCategory(cat._id)} ({cat.count})
              </button>
            ))}
          </div>

          {companies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{brands.no_companies || 'No companies available at the moment.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {companies.filter((c) => selectedCategory === 'all' || c.category === selectedCategory).map((company) => (
                <Card key={company._id} className="h-full hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 relative">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-gray-600">
                            {company.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <CardTitle className={`text-xl ${locale === 'bn' ? 'font-heading-bn' : 'font-heading-en'}`}>
                      {locale === 'bn' ? (companyTranslationsBn[company._id]?.name_bn ?? company.name) : company.name}
                    </CardTitle>
                    <CardDescription className={`text-sm ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>{translateCategory(company.category)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                      {locale === 'bn' ? (companyTranslationsBn[company._id]?.description_bn ?? company.description) : company.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {formatDateRange(company.startDate, company.endDate)}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-gray-600 to-teal-500 text-white text-xs capitalize">
                        {translateRelationship(company.relationship)}
                      </Badge>
                    </div>

                    {company.website && (
                      <div className="pt-2">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-gray-800 text-sm underline"
                        >
                          {brands.visit_website || 'Visit Website'}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8 font-heading">
            {brands.why_partner_title || 'Why Partner With Us?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{brands.proven_results || 'Proven Results'}</h3>
              <p className="text-gray-300">{brands.proven_results_desc || 'Track record of delivering measurable outcomes and ROI'}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🤝
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{brands.long_term || 'Long-term Partnership'}</h3>
              <p className="text-gray-300">{brands.long_term_desc || 'Building lasting relationships, not just transactions'}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                💡
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{brands.innovation || 'Innovation Focus'}</h3>
              <p className="text-gray-300">{brands.innovation_desc || 'Cutting-edge solutions and forward-thinking strategies'}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
