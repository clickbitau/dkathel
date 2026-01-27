'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  'Other': 'from-gray-600 to-slate-500'
};

export default function BrandsPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);

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
    const end = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${start}-${end}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-300 rounded mb-6 mx-auto max-w-2xl"></div>
              <div className="h-6 bg-gray-300 rounded mx-auto max-w-3xl"></div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-12 mx-auto max-w-md"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-heading">
            Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400">Partnerships</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From startups to established enterprises, I&apos;ve built lasting partnerships that drive
            innovation, security, and growth across diverse industries and scales.
          </p>
        </div>
      </section>

      {/* Industry Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-heading">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoryStats.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[category._id] || categoryColors['Other']} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>
                    {category.count}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category._id}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16 font-heading">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Partnerships</span>
          </h2>
          {companies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No companies available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company) => (
                <Card key={company._id} className="h-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
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
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    <CardDescription className="text-sm">{company.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{company.description}</p>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {formatDateRange(company.startDate, company.endDate)}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs capitalize">
                        {company.relationship}
                      </Badge>
                    </div>

                    {company.website && (
                      <div className="pt-2">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Visit Website
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8 font-heading">
            Why Partner With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven Results</h3>
              <p className="text-blue-100">Track record of delivering measurable outcomes and ROI</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🤝
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Long-term Partnership</h3>
              <p className="text-blue-100">Building lasting relationships, not just transactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                💡
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Innovation Focus</h3>
              <p className="text-blue-100">Cutting-edge solutions and forward-thinking strategies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
