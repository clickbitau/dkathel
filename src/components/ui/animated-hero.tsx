'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AnimatedHeroProps {
    title: string;
    subtitle?: string;
    badge?: string;
    stats?: Array<{
        value: string | number;
        label: string;
        icon?: React.ReactNode;
    }>;
    children?: React.ReactNode;
}

export default function AnimatedHero({ title, subtitle, badge, stats, children }: AnimatedHeroProps) {
    return (
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
                    {badge && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/90 text-sm font-medium">{badge}</span>
                        </motion.div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Montserrat Alternates', system-ui, sans-serif" }}>
                        {title}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10" style={{ fontFamily: "'Mina', sans-serif" }}>
                            {subtitle}
                        </p>
                    )}

                    {/* Stats */}
                    {stats && stats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20">
                                    {stat.icon ? (
                                        <div className="flex items-center gap-2">
                                            {stat.icon}
                                            <span className="text-xl font-bold text-white">{stat.value}</span>
                                        </div>
                                    ) : (
                                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    )}
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Additional children */}
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
