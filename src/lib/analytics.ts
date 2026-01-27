// Google Analytics 4 integration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Blog-specific tracking
export const trackBlogView = (slug: string, title: string) => {
  event({
    action: 'view_blog_post',
    category: 'Blog',
    label: `${title} (${slug})`
  })
}

export const trackBlogShare = (slug: string, platform: string) => {
  event({
    action: 'share_blog_post',
    category: 'Social',
    label: `${slug} on ${platform}`
  })
}

export const trackContactForm = (type: 'submit' | 'success' | 'error') => {
  event({
    action: `contact_form_${type}`,
    category: 'Contact',
    label: type
  })
}

export const trackDownload = (filename: string) => {
  event({
    action: 'download',
    category: 'Downloads',
    label: filename
  })
}

export const trackOutboundLink = (url: string, context?: string) => {
  event({
    action: 'click_outbound_link',
    category: 'Outbound Links',
    label: `${url}${context ? ` (${context})` : ''}`
  })
}

// Performance tracking
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Basic performance tracking
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation && navigation.loadEventEnd > 0) {
      // Track page load time
      const loadTime = navigation.loadEventEnd - navigation.fetchStart
      event({
        action: 'page_load_time',
        category: 'Performance',
        value: Math.round(loadTime)
      })
      
      // Track DOM content loaded
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
      event({
        action: 'dom_content_loaded',
        category: 'Performance',
        value: Math.round(domContentLoaded)
      })
    }
  }
}

// Error tracking
export const trackError = (error: Error, context?: string) => {
  event({
    action: 'javascript_error',
    category: 'Errors',
    label: `${error.message}${context ? ` (${context})` : ''}`
  })
  
  // Send to external error tracking service if configured
  if (process.env.NODE_ENV === 'production') {
    console.error('Tracked error:', error, { context })
  }
}

// Search tracking
export const trackSearch = (query: string, results: number) => {
  event({
    action: 'search',
    category: 'Site Search',
    label: query,
    value: results
  })
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}
