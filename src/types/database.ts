// Database type definitions (legacy - kept for compatibility)
// Main types are now in src/types/supabase.ts

// Blog related types
export interface BlogPostData {
  title: string
  content: string
  excerpt: string
  slug: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  featuredImage?: string
  metaTitle?: string
  metaDescription?: string
}

export interface BlogPostFilters {
  status?: 'draft' | 'published' | 'archived'
  tags?: string[]
  author?: string
  search?: string
}

export interface PaginationOptions {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// User related types
export interface UserData {
  email: string
  name: string
  role: 'admin' | 'user'
}

export interface CreateUserData extends UserData {
  password: string
}