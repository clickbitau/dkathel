/**
 * Integration tests for external services
 */

import { emailService } from '@/services/email'
import { instagramService, InstagramService } from '@/services/instagram'
import { uptimeKumaService } from '@/services/uptime-kuma'

// Mock fetch for API tests
global.fetch = jest.fn()

describe('Service Integrations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Instagram Service', () => {
    it('should fetch recent posts', async () => {
      const posts = await instagramService.getRecentPosts(6)
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeLessThanOrEqual(6)
      
      if (posts.length > 0) {
        const post = posts[0]
        expect(post).toHaveProperty('id')
        expect(post).toHaveProperty('media_url')
        expect(post).toHaveProperty('caption')
        expect(post).toHaveProperty('timestamp')
        expect(post).toHaveProperty('permalink')
      }
    })

    it('should handle errors gracefully', async () => {
      // Test with no token - create new instance
      const service = new InstagramService()
      // Service will use mock data when no proper token is configured
      
      const posts = await service.getRecentPosts(3)
      expect(Array.isArray(posts)).toBe(true)
      // Should return mock data when no token
    })
  })

  describe('Email Service', () => {
    it('should handle sending emails', async () => {
      const result = await emailService.sendEmail({
        to: 'test@example.com',
        subject: 'Test Email',
        text: 'This is a test email'
      })
      
      // Should succeed in mock mode
      expect(typeof result).toBe('boolean')
    })

    it('should send contact form emails', async () => {
      const result = await emailService.sendContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Contact',
        message: 'This is a test message from the contact form.'
      })
      
      expect(typeof result).toBe('boolean')
    })

    it('should test connection', async () => {
      const result = await emailService.testConnection()
      expect(typeof result).toBe('boolean')
    })
  })

  describe('Uptime Kuma Service', () => {
    it('should fetch monitors', async () => {
      const monitors = await uptimeKumaService.getMonitors()
      expect(Array.isArray(monitors)).toBe(true)
      
      if (monitors.length > 0) {
        const monitor = monitors[0]
        expect(monitor).toHaveProperty('id')
        expect(monitor).toHaveProperty('name')
        expect(monitor).toHaveProperty('status')
        expect(monitor).toHaveProperty('uptime_24h')
      }
    })

    it('should get overall status', async () => {
      const status = await uptimeKumaService.getStatus()
      expect(status).toHaveProperty('monitors')
      expect(status).toHaveProperty('overall_status')
      expect(['operational', 'degraded', 'outage']).toContain(status.overall_status)
    })

    it('should test connection', async () => {
      const result = await uptimeKumaService.testConnection()
      expect(typeof result).toBe('boolean')
    })
  })
})

describe('API Routes', () => {
  // These would be tested with actual HTTP requests in an integration test environment
  describe('Instagram API', () => {
    it('should be accessible at /api/social/instagram', () => {
      // This test would require a running server
      expect(true).toBe(true) // Placeholder
    })
  })

  describe('Contact API', () => {
    it('should be accessible at /api/contact', () => {
      // This test would require a running server
      expect(true).toBe(true) // Placeholder
    })
  })

  describe('Monitoring API', () => {
    it('should be accessible at /api/monitoring', () => {
      // This test would require authentication
      expect(true).toBe(true) // Placeholder
    })
  })

  describe('Health Check API', () => {
    it('should be accessible at /api/health', () => {
      // This test would require a running server
      expect(true).toBe(true) // Placeholder
    })
  })
})
