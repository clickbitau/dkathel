import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null

  constructor() {
    // Only initialize if we have proper SMTP config
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD

    if (smtpHost && smtpUser && smtpPassword && 
        smtpHost !== 'smtp.gmail.com' && 
        smtpUser !== 'placeholder@gmail.com') {
      
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: smtpUser,
          pass: smtpPassword
        }
      })
    } else {
      console.log('Email service: Using mock mode (no real SMTP configured)')
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.log(`Mock email sent to ${options.to}: ${options.subject}`)
      return true
    }

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@dkathel.com',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      })
      
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  async sendContactForm(formData: {
    name: string
    email: string
    subject: string
    message: string
  }): Promise<boolean> {
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message.replace(/\n/g, '<br>')}</p>
    `

    return await this.sendEmail({
      to: process.env.SMTP_USER || 'admin@dkathel.com',
      subject: `Contact Form: ${formData.subject}`,
      html,
      text: `New contact form submission from ${formData.name} (${formData.email}): ${formData.message}`
    })
  }

  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      return true // Mock mode always "works"
    }

    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error('Email service connection test failed:', error)
      return false
    }
  }
}

export const emailService = new EmailService()
