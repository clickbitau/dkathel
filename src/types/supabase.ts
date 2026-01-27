// Supabase Database Types
// Auto-generated types for database tables

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    password_hash: string
                    name: string
                    role: 'admin' | 'user'
                    avatar: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    email: string
                    password_hash: string
                    name: string
                    role?: 'admin' | 'user'
                    avatar?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    password_hash?: string
                    name?: string
                    role?: 'admin' | 'user'
                    avatar?: string | null
                    updated_at?: string
                }
            }
            certifications: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    issue_date: string
                    expiry_date: string | null
                    credential_id: string | null
                    credential_url: string | null
                    image: string
                    skills: string[]
                    category: 'IT Security' | 'Digital Marketing' | 'Education' | 'Business' | 'Technology' | 'Other'
                    is_active: boolean
                    display_order: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    issue_date: string
                    expiry_date?: string | null
                    credential_id?: string | null
                    credential_url?: string | null
                    image: string
                    skills?: string[]
                    category?: 'IT Security' | 'Digital Marketing' | 'Education' | 'Business' | 'Technology' | 'Other'
                    is_active?: boolean
                    display_order?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    name?: string
                    description?: string | null
                    issue_date?: string
                    expiry_date?: string | null
                    credential_id?: string | null
                    credential_url?: string | null
                    image?: string
                    skills?: string[]
                    category?: 'IT Security' | 'Digital Marketing' | 'Education' | 'Business' | 'Technology' | 'Other'
                    is_active?: boolean
                    display_order?: number
                    updated_at?: string
                }
            }
            experiences: {
                Row: {
                    id: string
                    title: string
                    company: string
                    location: string
                    start_date: string
                    end_date: string | null
                    current: boolean
                    description: string
                    technologies: string[]
                    achievements: string[]
                    display_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    company: string
                    location: string
                    start_date: string
                    end_date?: string | null
                    current?: boolean
                    description: string
                    technologies?: string[]
                    achievements?: string[]
                    display_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    title?: string
                    company?: string
                    location?: string
                    start_date?: string
                    end_date?: string | null
                    current?: boolean
                    description?: string
                    technologies?: string[]
                    achievements?: string[]
                    display_order?: number
                    is_active?: boolean
                    updated_at?: string
                }
            }
            companies: {
                Row: {
                    id: string
                    name: string
                    logo: string
                    website: string | null
                    description: string | null
                    category: 'Technology' | 'Education' | 'Healthcare' | 'Finance' | 'E-commerce' | 'Marketing' | 'Consulting' | 'Other'
                    relationship: 'client' | 'partner' | 'employer' | 'collaboration'
                    start_date: string | null
                    end_date: string | null
                    is_active: boolean
                    display_order: number
                    featured: boolean
                    technologies: string[]
                    achievements: string[]
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    logo: string
                    website?: string | null
                    description?: string | null
                    category?: 'Technology' | 'Education' | 'Healthcare' | 'Finance' | 'E-commerce' | 'Marketing' | 'Consulting' | 'Other'
                    relationship?: 'client' | 'partner' | 'employer' | 'collaboration'
                    start_date?: string | null
                    end_date?: string | null
                    is_active?: boolean
                    display_order?: number
                    featured?: boolean
                    technologies?: string[]
                    achievements?: string[]
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    name?: string
                    logo?: string
                    website?: string | null
                    description?: string | null
                    category?: 'Technology' | 'Education' | 'Healthcare' | 'Finance' | 'E-commerce' | 'Marketing' | 'Consulting' | 'Other'
                    relationship?: 'client' | 'partner' | 'employer' | 'collaboration'
                    start_date?: string | null
                    end_date?: string | null
                    is_active?: boolean
                    display_order?: number
                    featured?: boolean
                    technologies?: string[]
                    achievements?: string[]
                    updated_at?: string
                }
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string | null
                    featured_image: string | null
                    tags: string[]
                    status: 'draft' | 'published' | 'scheduled'
                    published_at: string | null
                    seo: Json
                    reading_time: number | null
                    views: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    content: string
                    excerpt?: string | null
                    featured_image?: string | null
                    tags?: string[]
                    status?: 'draft' | 'published' | 'scheduled'
                    published_at?: string | null
                    seo?: Json
                    reading_time?: number | null
                    views?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    title?: string
                    slug?: string
                    content?: string
                    excerpt?: string | null
                    featured_image?: string | null
                    tags?: string[]
                    status?: 'draft' | 'published' | 'scheduled'
                    published_at?: string | null
                    seo?: Json
                    reading_time?: number | null
                    views?: number
                    updated_at?: string
                }
            }
            skills: {
                Row: {
                    id: string
                    name: string
                    category: 'system-administration' | 'support-recovery' | 'web-development' | 'cybersecurity' | 'networking' | 'other'
                    proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                    description: string | null
                    icon: string | null
                    display_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    category: 'system-administration' | 'support-recovery' | 'web-development' | 'cybersecurity' | 'networking' | 'other'
                    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                    description?: string | null
                    icon?: string | null
                    display_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    name?: string
                    category?: 'system-administration' | 'support-recovery' | 'web-development' | 'cybersecurity' | 'networking' | 'other'
                    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                    description?: string | null
                    icon?: string | null
                    display_order?: number
                    is_active?: boolean
                    updated_at?: string
                }
            }
            self_hosted_apps: {
                Row: {
                    id: string
                    name: string
                    subdomain: string
                    description: string | null
                    category: 'media' | 'productivity' | 'development' | 'system' | 'other'
                    url: string
                    icon: string | null
                    status: 'active' | 'inactive' | 'maintenance'
                    is_public: boolean
                    display_order: number
                    tags: string[]
                    last_checked: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    subdomain: string
                    description?: string | null
                    category?: 'media' | 'productivity' | 'development' | 'system' | 'other'
                    url: string
                    icon?: string | null
                    status?: 'active' | 'inactive' | 'maintenance'
                    is_public?: boolean
                    display_order?: number
                    tags?: string[]
                    last_checked?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    name?: string
                    subdomain?: string
                    description?: string | null
                    category?: 'media' | 'productivity' | 'development' | 'system' | 'other'
                    url?: string
                    icon?: string | null
                    status?: 'active' | 'inactive' | 'maintenance'
                    is_public?: boolean
                    display_order?: number
                    tags?: string[]
                    last_checked?: string | null
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Convenience type exports
export type User = Database['public']['Tables']['users']['Row']
export type Certification = Database['public']['Tables']['certifications']['Row']
export type Experience = Database['public']['Tables']['experiences']['Row']
export type Company = Database['public']['Tables']['companies']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type Skill = Database['public']['Tables']['skills']['Row']
export type SelfHostedApp = Database['public']['Tables']['self_hosted_apps']['Row']

// Insert types
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type CertificationInsert = Database['public']['Tables']['certifications']['Insert']
export type ExperienceInsert = Database['public']['Tables']['experiences']['Insert']
export type CompanyInsert = Database['public']['Tables']['companies']['Insert']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type SkillInsert = Database['public']['Tables']['skills']['Insert']
export type SelfHostedAppInsert = Database['public']['Tables']['self_hosted_apps']['Insert']

// Update types
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type CertificationUpdate = Database['public']['Tables']['certifications']['Update']
export type ExperienceUpdate = Database['public']['Tables']['experiences']['Update']
export type CompanyUpdate = Database['public']['Tables']['companies']['Update']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']
export type SkillUpdate = Database['public']['Tables']['skills']['Update']
export type SelfHostedAppUpdate = Database['public']['Tables']['self_hosted_apps']['Update']
