'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CertificateModal from './certificate-modal';
import { certificationTranslationsBn } from '@/data/certification-translations-bn';

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

interface CertificateMasonryGalleryProps {
    certifications: Certification[];
    messages?: Record<string, string>;
    locale?: string;
}

// Category styling
const categoryStyles: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    'Technology': { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-teal-300', border: 'border-gray-200 dark:border-gray-800', gradient: 'from-blue-500 to-cyan-500' },
    'Business': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800', gradient: 'from-emerald-500 to-teal-500' },
    'Management': { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800', gradient: 'from-purple-500 to-indigo-500' },
    'Education': { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800', gradient: 'from-amber-500 to-orange-500' },
    'Healthcare': { bg: 'bg-rose-50 dark:bg-rose-950/30', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800', gradient: 'from-rose-500 to-pink-500' },
    'Real Estate': { bg: 'bg-slate-50 dark:bg-slate-900/50', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-gray-700', gradient: 'from-gray-500 to-gray-600' },
    'Automotive': { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800', gradient: 'from-red-500 to-orange-600' },
    'Hospitality': { bg: 'bg-violet-50 dark:bg-violet-950/30', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-800', gradient: 'from-violet-500 to-purple-600' },
};

// Category translations for Bengali
const categoryTranslations: Record<string, string> = {
    'Technology': 'প্রযুক্তি',
    'Business': 'ব্যবসা',
    'Management': 'ব্যবস্থাপনা',
    'Education': 'শিক্ষা',
    'Healthcare': 'স্বাস্থ্যসেবা',
    'Real Estate': 'রিয়েল এস্টেট',
    'Automotive': 'অটোমোটিভ',
    'Hospitality': 'হসপিটালিটি',
};

const defaultStyle = { bg: 'bg-gray-50 dark:bg-gray-900/50', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-200 dark:border-gray-700', gradient: 'from-gray-500 to-slate-600' };

export default function CertificateMasonryGallery({ certifications, messages, locale = 'en' }: CertificateMasonryGalleryProps) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    // Helper to translate category
    const translateCategory = (category: string) => {
        return locale === 'bn' ? (categoryTranslations[category] || category) : category;
    };

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(certifications.map(c => c.category)));
        return cats.sort();
    }, [certifications]);

    // Filter certifications
    const filteredCerts = useMemo(() => {
        return certifications.filter(cert => {
            const matchesSearch = !search ||
                cert.name.toLowerCase().includes(search.toLowerCase()) ||
                cert.category.toLowerCase().includes(search.toLowerCase()) ||
                cert.skills?.some(s => s.toLowerCase().includes(search.toLowerCase()));
            const matchesCategory = !selectedCategory || cert.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [certifications, search, selectedCategory]);

    // Get current index for modal navigation
    const currentIndex = selectedCert ? filteredCerts.findIndex(c => c._id === selectedCert._id) : -1;

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSelectedCert(filteredCerts[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        if (currentIndex < filteredCerts.length - 1) {
            setSelectedCert(filteredCerts[currentIndex + 1]);
        }
    };

    const handleImageLoad = (id: string) => {
        setLoadedImages(prev => new Set(prev).add(id));
    };

    const getStyle = (category: string) => categoryStyles[category] || defaultStyle;

    return (
        <div className="space-y-8">
            {/* Search and Filter Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-slate-200/50 dark:border-gray-700/50"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            placeholder={messages?.search_placeholder || "Search by name, category, or skill..."}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 rounded-xl"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-slate-400" />
                            </button>
                        )}
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <Filter className="w-4 h-4 text-slate-400 hidden md:block" />
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${!selectedCategory
                                ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md'
                                : 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            {locale === 'bn' ? 'সব' : 'All'} ({certifications.length})
                        </button>
                        {categories.map(cat => {
                            const count = certifications.filter(c => c.category === cat).length;
                            const style = getStyle(cat);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                        ? `bg-gradient-to-r ${style.gradient} text-white shadow-md`
                                        : `${style.bg} ${style.text} border ${style.border} hover:shadow-sm`
                                        }`}
                                >
                                    {translateCategory(cat)} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results count */}
                {(search || selectedCategory) && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-sm text-slate-500 dark:text-slate-400"
                    >
                        {locale === 'bn'
                            ? `${certifications.length} এর মধ্যে ${filteredCerts.length}টি দেখানো হচ্ছে`
                            : `Showing ${filteredCerts.length} of ${certifications.length} certifications`
                        }
                        {selectedCategory && <span className="font-medium"> {locale === 'bn' ? `${translateCategory(selectedCategory)}-এ` : `in ${selectedCategory}`}</span>}
                    </motion.p>
                )}
            </motion.div>

            {/* Masonry Gallery */}
            {filteredCerts.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                    {filteredCerts.map((cert, index) => {
                        const style = getStyle(cert.category);
                        const isLoaded = loadedImages.has(cert._id);

                        return (
                            <motion.div
                                key={cert._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => setSelectedCert(cert)}
                            >
                                <div className={`relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 border ${style.border}`}>
                                    {/* Image container */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-50 dark:bg-slate-900">
                                        {!isLoaded && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-gray-800">
                                                <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        )}
                                        <Image
                                            src={encodeURI(cert.image)}
                                            alt={cert.name}
                                            fill
                                            className={`object-contain p-3 transition-all duration-300 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                                            onLoad={() => handleImageLoad(cert._id)}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            quality={90}
                                        />

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <span className="text-white text-sm font-medium">{locale === 'bn' ? 'বিস্তারিত দেখুন →' : 'View details →'}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        {/* Category badge */}
                                        <Badge className={`${style.bg} ${style.text} border ${style.border} mb-2 text-xs`}>
                                            {translateCategory(cert.category)}
                                        </Badge>

                                        {/* Title */}
                                        <h3 className={`font-semibold text-slate-900 dark:text-white line-clamp-2 text-sm leading-snug mb-2 group-hover:text-gray-800 dark:group-hover:text-blue-400 transition-colors ${locale === 'bn' ? 'font-body-bn' : 'font-body-en'}`}>
                                            {locale === 'bn' ? (certificationTranslationsBn[cert._id]?.name_bn ?? cert.name) : cert.name}
                                        </h3>

                                        {/* Skills preview */}
                                        {cert.skills && cert.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {cert.skills.slice(0, 2).map(skill => (
                                                    <span key={skill} className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {cert.skills.length > 2 && (
                                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                                        +{cert.skills.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-slate-200 dark:border-gray-700 max-w-md mx-auto">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                            {locale === 'bn' ? 'কোনো সার্টিফিকেশন পাওয়া যায়নি' : 'No certifications found'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">
                            {locale === 'bn' ? 'আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে দেখুন' : 'Try adjusting your search or filter criteria'}
                        </p>
                        <button
                            onClick={() => { setSearch(''); setSelectedCategory(null); }}
                            className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                        >
                            {locale === 'bn' ? 'ফিল্টার মুছুন' : 'Clear Filters'}
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Certificate Modal */}
            {selectedCert && (
                <CertificateModal
                    certification={selectedCert}
                    isOpen={!!selectedCert}
                    onClose={() => setSelectedCert(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hasPrev={currentIndex > 0}
                    hasNext={currentIndex < filteredCerts.length - 1}
                />
            )}
        </div>
    );
}
