import { Metadata } from 'next'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata({
  title = 'Kauser Ahmed Methel - Full Stack Developer & Tech Enthusiast',
  description = 'Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies. Sharing knowledge through blogs and building innovative solutions.',
  keywords = ['full-stack developer', 'react', 'nextjs', 'nodejs', 'typescript', 'cloud computing', 'web development'],
  canonical,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author = 'Kauser Ahmed Methel',
  section,
  tags
}: SEOProps = {}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dkathel.com'
  const fullTitle = title.includes('DKathel') ? title : `${title} | DKathel`
  
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    
    // OpenGraph
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: canonical || siteUrl,
      siteName: 'DKathel Portfolio',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`],
      creator: '@dkathel',
      site: '@dkathel',
    },
    
    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
  }

  // Add canonical URL if provided
  if (canonical) {
    metadata.alternates = {
      canonical: canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`
    }
  }

  // Add article-specific metadata
  if (ogType === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author],
      section,
      tags,
    }
  }

  return metadata
}

export function generateStructuredData({
  type = 'WebSite',
  name = 'DKathel Portfolio',
  url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dkathel.com',
  description = 'Full-stack developer portfolio and blog',
  author = 'Kauser Ahmed Methel',
  sameAs = [
    'https://linkedin.com/in/dkathel',
    'https://twitter.com/dkathel',
    'https://github.com/dkathel',
    'https://instagram.com/dkathel'
  ],
  ...additional
}: Record<string, unknown> = {}) {
  const baseStructuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    url,
    description,
  }

  switch (type) {
    case 'WebSite':
      return {
        ...baseStructuredData,
        author: {
          '@type': 'Person',
          name: author,
          sameAs
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }

    case 'Person':
      return {
        ...baseStructuredData,
        '@type': 'Person',
        name: author,
        jobTitle: 'Full Stack Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance'
        },
        sameAs,
        knowsAbout: [
          'JavaScript',
          'TypeScript',
          'React',
          'Next.js',
          'Node.js',
          'MongoDB',
          'Cloud Computing',
          'Web Development'
        ]
      }

    case 'BlogPosting':
      return {
        ...baseStructuredData,
        '@type': 'BlogPosting',
        headline: additional.title,
        datePublished: additional.publishedTime,
        dateModified: additional.modifiedTime || additional.publishedTime,
        author: {
          '@type': 'Person',
          name: author
        },
        publisher: {
          '@type': 'Organization',
          name: 'DKathel',
          logo: {
            '@type': 'ImageObject',
            url: `${url}/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': additional.url || url
        },
        image: additional.image ? {
          '@type': 'ImageObject',
          url: additional.image
        } : undefined,
        keywords: Array.isArray(additional.keywords) ? additional.keywords.join(', ') : undefined,
        wordCount: additional.wordCount,
        timeRequired: additional.readingTime ? `PT${additional.readingTime}M` : undefined
      }

    case 'Organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        founder: {
          '@type': 'Person',
          name: author
        },
        sameAs,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'professional',
          email: 'hello@dkathel.com'
        }
      }

    default:
      return baseStructuredData
  }
}

export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}
