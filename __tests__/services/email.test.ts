import { EmailService } from '@/services/email'

describe('EmailService', () => {
  let emailService: EmailService

  beforeEach(() => {
    emailService = new EmailService()
  })

  it('should create EmailService instance', () => {
    expect(emailService).toBeInstanceOf(EmailService)
  })

  it('should handle mock mode when no SMTP configured', async () => {
    const result = await emailService.sendEmail({
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'Test message'
    })
    
    expect(result).toBe(true)
  })

  it('should format contact form email correctly', async () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Contact',
      message: 'This is a test message'
    }

    const result = await emailService.sendContactForm(formData)
    expect(result).toBe(true)
  })

  it('should test connection successfully in mock mode', async () => {
    const result = await emailService.testConnection()
    expect(result).toBe(true)
  })
})
