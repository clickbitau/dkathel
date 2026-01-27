import { z } from 'zod'

// Authentication validations
export const loginSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  name: z.string().min(2, 'Name must be at least 2 characters').trim()
})

// Blog post validations
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').trim(),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt must be less than 300 characters').trim(),
  featuredImage: z.string().url('Must be a valid URL').optional(),
  tags: z.array(z.string().trim().toLowerCase()).max(10, 'Maximum 10 tags allowed'),
  status: z.enum(['draft', 'published', 'archived']),
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').optional(),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').optional(),
})

export const updateBlogPostSchema = blogPostSchema.partial()

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Invalid email address').toLowerCase(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim()
})

// Query parameter validations
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const blogFiltersSchema = z.object({
  status: z.enum(['draft', 'published', 'archived']).optional(),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim())).optional(),
  search: z.string().trim().optional(),
  author: z.string().optional()
})

// Type exports for use in components
export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type BlogPostData = z.infer<typeof blogPostSchema>
export type ContactData = z.infer<typeof contactSchema>
export type PaginationParams = z.infer<typeof paginationSchema>
export type BlogFilters = z.infer<typeof blogFiltersSchema>
