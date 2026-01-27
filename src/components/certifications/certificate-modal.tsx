'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Award, ExternalLink, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface CertificateModalProps {
    certification: Certification;
    isOpen: boolean;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Category color mapping
const categoryColors: Record<string, string> = {
    'Technology': 'from-blue-500 to-cyan-500',
    'Business': 'from-emerald-500 to-teal-500',
    'Management': 'from-purple-500 to-indigo-500',
    'Education': 'from-amber-500 to-orange-500',
    'Healthcare': 'from-rose-500 to-pink-500',
    'Real Estate': 'from-gray-500 to-gray-600',
    'Automotive': 'from-red-500 to-orange-600',
    'Hospitality': 'from-violet-500 to-purple-600',
    'default': 'from-gray-500 to-slate-600'
};

export default function CertificateModal({
    certification,
    isOpen,
    onClose,
    onPrev,
    onNext,
    hasPrev = false,
    hasNext = false
}: CertificateModalProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const gradientClass = categoryColors[certification.category] || categoryColors['default'];

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
        if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                onClick={onClose}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

                {/* Navigation arrows */}
                {hasPrev && onPrev && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}
                {hasNext && onNext && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}

                {/* Modal content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-300"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                        {/* Left: Certificate Image */}
                        <div className="lg:w-3/5 relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900">
                            <div className="relative w-full h-[40vh] lg:h-full min-h-[300px]">
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                                <Image
                                    src={encodeURI(certification.image)}
                                    alt={certification.name}
                                    fill
                                    className={`object-contain p-4 lg:p-8 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="lg:w-2/5 flex flex-col overflow-y-auto">
                            {/* Header with gradient */}
                            <div className={`bg-gradient-to-r ${gradientClass} p-6 text-white`}>
                                <Badge className="bg-white/20 text-white border-white/30 mb-3">
                                    {certification.category}
                                </Badge>
                                <h2 className="text-xl lg:text-2xl font-bold leading-tight">
                                    {certification.name}
                                </h2>
                                <p className="text-white/80 mt-2 text-sm">
                                    {certification.issuer}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                                {/* Description */}
                                {certification.description && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                            Description
                                        </h3>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {certification.description}
                                        </p>
                                    </div>
                                )}

                                {/* Issue Date */}
                                <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-gray-800 rounded-xl">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${gradientClass}`}>
                                        <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Issued</p>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            {formatDate(certification.issueDate)}
                                        </p>
                                    </div>
                                </div>

                                {/* Credential ID */}
                                {certification.credentialId && (
                                    <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-gray-800 rounded-xl">
                                        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradientClass}`}>
                                            <Award className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Credential ID</p>
                                            <p className="text-sm font-mono font-medium text-slate-700 dark:text-slate-200">
                                                {certification.credentialId}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Skills */}
                                {certification.skills && certification.skills.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                                            Skills
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {certification.skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    className={`bg-gradient-to-r ${gradientClass} text-white border-0 text-xs`}
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="pt-4 space-y-3">
                                    {certification.credentialUrl && (
                                        <Button
                                            className={`w-full bg-gradient-to-r ${gradientClass} text-white border-0 hover:opacity-90`}
                                            onClick={() => window.open(certification.credentialUrl, '_blank')}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Verify Credential
                                        </Button>
                                    )}
                                    {certification.pdfUrl && (
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => window.open(encodeURI(certification.pdfUrl!), '_blank')}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download PDF
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
