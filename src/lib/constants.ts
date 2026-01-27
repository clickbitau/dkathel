export const SITE_CONFIG = {
  name: 'DKathel Portfolio',
  description: 'Personal portfolio website showcasing experience, certifications, and insights',
  url: 'https://dkathel.com',
  ogImage: 'https://dkathel.com/og.jpg',
  links: {
    github: 'https://github.com/dkathel',
    linkedin: 'https://linkedin.com/in/dkathel',
    twitter: 'https://twitter.com/dkathel',
  },
} as const;

export const NAVIGATION = [
  { name: { en: 'About', bn: 'সম্পর্কে' }, href: '/about' },
  { name: { en: 'Experience', bn: 'অভিজ্ঞতা' }, href: '/experience' },
  { name: { en: 'Brands', bn: 'ব্র্যান্ডসমূহ' }, href: '/brands' },
  { name: { en: 'Entrepreneur', bn: 'উদ্যোক্তা' }, href: '/entrepreneur' },
  { name: { en: 'Certifications', bn: 'সার্টিফিকেশন' }, href: '/certifications' },
  { name: { en: 'Blog', bn: 'ব্লগ' }, href: '/blog' },
  { name: { en: 'Contact', bn: 'যোগাযোগ করুন' }, href: '/contact' },
] as const;
