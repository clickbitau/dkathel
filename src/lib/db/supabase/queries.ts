import { getSupabaseClient } from '@/lib/supabase'
import type {
    Certification,
    CertificationInsert,
    CertificationUpdate,
    Experience,
    ExperienceInsert,
    ExperienceUpdate,
    Company,
    CompanyInsert,
    CompanyUpdate,
    BlogPost,
    BlogPostInsert,
    BlogPostUpdate,
    Skill,
    SkillInsert,
    SkillUpdate,
    SelfHostedApp,
    SelfHostedAppInsert,
    SelfHostedAppUpdate,
    User,
    UserInsert,
    UserUpdate,
} from '@/types/supabase'

// =====================
// CERTIFICATIONS
// =====================
export async function getCertifications(options?: {
    category?: string
    search?: string
    activeOnly?: boolean
}): Promise<Certification[]> {
    const client = getSupabaseClient(true)
    let query = client.from('certifications').select('*')

    if (options?.activeOnly !== false) {
        query = query.eq('is_active', true)
    }
    if (options?.category) {
        query = query.eq('category', options.category)
    }
    if (options?.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
    }

    const { data, error } = await query.order('display_order').order('issue_date', { ascending: false })

    if (error) throw error
    return (data || []) as Certification[]
}

export async function getCertificationById(id: string): Promise<Certification | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('certifications').select('*').eq('id', id).single()
    if (error) return null
    return data as Certification
}

export async function createCertification(data: CertificationInsert): Promise<Certification> {
    const client = getSupabaseClient(true)
    const { data: cert, error } = await client.from('certifications').insert(data).select().single()
    if (error) throw error
    return cert as Certification
}

export async function updateCertification(id: string, data: CertificationUpdate): Promise<Certification> {
    const client = getSupabaseClient(true)
    const { data: cert, error } = await client.from('certifications').update(data).eq('id', id).select().single()
    if (error) throw error
    return cert as Certification
}

export async function deleteCertification(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.from('certifications').delete().eq('id', id)
    if (error) throw error
}

// =====================
// EXPERIENCES
// =====================
export async function getExperiences(options?: {
    activeOnly?: boolean
    currentOnly?: boolean
}): Promise<Experience[]> {
    const client = getSupabaseClient(true)
    let query = client.from('experiences').select('*')

    if (options?.activeOnly !== false) {
        query = query.eq('is_active', true)
    }
    if (options?.currentOnly) {
        query = query.eq('current', true)
    }

    const { data, error } = await query.order('display_order').order('start_date', { ascending: false })

    if (error) throw error
    return (data || []) as Experience[]
}

export async function getExperienceById(id: string): Promise<Experience | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('experiences').select('*').eq('id', id).single()
    if (error) return null
    return data as Experience
}

export async function createExperience(data: ExperienceInsert): Promise<Experience> {
    const client = getSupabaseClient(true)
    const { data: exp, error } = await client.from('experiences').insert(data).select().single()
    if (error) throw error
    return exp as Experience
}

export async function updateExperience(id: string, data: ExperienceUpdate): Promise<Experience> {
    const client = getSupabaseClient(true)
    const { data: exp, error } = await client.from('experiences').update(data).eq('id', id).select().single()
    if (error) throw error
    return exp as Experience
}

export async function deleteExperience(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.from('experiences').delete().eq('id', id)
    if (error) throw error
}

// =====================
// COMPANIES
// =====================
export async function getCompanies(options?: {
    category?: string
    relationship?: string
    featured?: boolean
    activeOnly?: boolean
}): Promise<Company[]> {
    const client = getSupabaseClient(true)
    let query = client.from('companies').select('*')

    if (options?.activeOnly !== false) {
        query = query.eq('is_active', true)
    }
    if (options?.category) {
        query = query.eq('category', options.category)
    }
    if (options?.relationship) {
        query = query.eq('relationship', options.relationship)
    }
    if (options?.featured !== undefined) {
        query = query.eq('featured', options.featured)
    }

    const { data, error } = await query.order('display_order')

    if (error) throw error
    return (data || []) as Company[]
}

export async function getCompanyById(id: string): Promise<Company | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('companies').select('*').eq('id', id).single()
    if (error) return null
    return data as Company
}

export async function createCompany(data: CompanyInsert): Promise<Company> {
    const client = getSupabaseClient(true)
    const { data: company, error } = await client.from('companies').insert(data).select().single()
    if (error) throw error
    return company as Company
}

export async function updateCompany(id: string, data: CompanyUpdate): Promise<Company> {
    const client = getSupabaseClient(true)
    const { data: company, error } = await client.from('companies').update(data).eq('id', id).select().single()
    if (error) throw error
    return company as Company
}

export async function deleteCompany(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.from('companies').delete().eq('id', id)
    if (error) throw error
}

// =====================
// BLOG POSTS
// =====================
export async function getBlogPosts(options?: {
    status?: 'draft' | 'published' | 'scheduled'
    tag?: string
    search?: string
    limit?: number
}): Promise<BlogPost[]> {
    const client = getSupabaseClient(true)
    let query = client.from('blog_posts').select('*')

    if (options?.status) {
        query = query.eq('status', options.status)
    }
    if (options?.tag) {
        query = query.contains('tags', [options.tag])
    }
    if (options?.search) {
        query = query.or(`title.ilike.%${options.search}%,content.ilike.%${options.search}%,excerpt.ilike.%${options.search}%`)
    }
    if (options?.limit) {
        query = query.limit(options.limit)
    }

    const { data, error } = await query.order('published_at', { ascending: false })

    if (error) throw error
    return (data || []) as BlogPost[]
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('blog_posts').select('*').eq('slug', slug).single()
    if (error) return null
    return data as BlogPost
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('blog_posts').select('*').eq('id', id).single()
    if (error) return null
    return data as BlogPost
}

export async function createBlogPost(data: BlogPostInsert): Promise<BlogPost> {
    const client = getSupabaseClient(true)
    const { data: post, error } = await client.from('blog_posts').insert(data).select().single()
    if (error) throw error
    return post as BlogPost
}

export async function updateBlogPost(id: string, data: BlogPostUpdate): Promise<BlogPost> {
    const client = getSupabaseClient(true)
    const { data: post, error } = await client.from('blog_posts').update(data).eq('id', id).select().single()
    if (error) throw error
    return post as BlogPost
}

export async function deleteBlogPost(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.from('blog_posts').delete().eq('id', id)
    if (error) throw error
}

export async function incrementBlogPostViews(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.rpc('increment_blog_views', { post_id: id })
    if (error) {
        // Fallback: manually increment if RPC doesn't exist
        const post = await getBlogPostById(id)
        if (post) {
            await updateBlogPost(id, { views: (post.views || 0) + 1 })
        }
    }
}

// =====================
// SKILLS
// =====================
export async function getSkills(options?: {
    category?: string
    activeOnly?: boolean
}): Promise<Skill[]> {
    const client = getSupabaseClient(true)
    let query = client.from('skills').select('*')

    if (options?.activeOnly !== false) {
        query = query.eq('is_active', true)
    }
    if (options?.category) {
        query = query.eq('category', options.category)
    }

    const { data, error } = await query.order('category').order('display_order')

    if (error) throw error
    return (data || []) as Skill[]
}

export async function getSkillById(id: string): Promise<Skill | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('skills').select('*').eq('id', id).single()
    if (error) return null
    return data as Skill
}

export async function createSkill(data: SkillInsert): Promise<Skill> {
    const client = getSupabaseClient(true)
    const { data: skill, error } = await client.from('skills').insert(data).select().single()
    if (error) throw error
    return skill as Skill
}

export async function updateSkill(id: string, data: SkillUpdate): Promise<Skill> {
    const client = getSupabaseClient(true)
    const { data: skill, error } = await client.from('skills').update(data).eq('id', id).select().single()
    if (error) throw error
    return skill as Skill
}

export async function deleteSkill(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.from('skills').delete().eq('id', id)
    if (error) throw error
}

// =====================
// SELF-HOSTED APPS
// =====================
export async function getSelfHostedApps(options?: {
    category?: string
    status?: 'active' | 'inactive' | 'maintenance'
    publicOnly?: boolean
}): Promise<SelfHostedApp[]> {
    const client = getSupabaseClient(true)
    let query = client.from('self_hosted_apps').select('*')

    if (options?.publicOnly) {
        query = query.eq('is_public', true)
    }
    if (options?.category) {
        query = query.eq('category', options.category)
    }
    if (options?.status) {
        query = query.eq('status', options.status)
    }

    const { data, error } = await query.order('display_order')

    if (error) throw error
    return (data || []) as SelfHostedApp[]
}

export async function getSelfHostedAppById(id: string): Promise<SelfHostedApp | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('self_hosted_apps').select('*').eq('id', id).single()
    if (error) return null
    return data as SelfHostedApp
}

export async function createSelfHostedApp(data: SelfHostedAppInsert): Promise<SelfHostedApp> {
    const client = getSupabaseClient(true)
    const { data: app, error } = await client.from('self_hosted_apps').insert(data).select().single()
    if (error) throw error
    return app as SelfHostedApp
}

export async function updateSelfHostedApp(id: string, data: SelfHostedAppUpdate): Promise<SelfHostedApp> {
    const client = getSupabaseClient(true)
    const { data: app, error } = await client.from('self_hosted_apps').update(data).eq('id', id).select().single()
    if (error) throw error
    return app as SelfHostedApp
}

export async function deleteSelfHostedApp(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.from('self_hosted_apps').delete().eq('id', id)
    if (error) throw error
}

// =====================
// USERS
// =====================
export async function getUserByEmail(email: string): Promise<User | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('users').select('*').eq('email', email.toLowerCase()).single()
    if (error) return null
    return data as User
}

export async function getUserById(id: string): Promise<User | null> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('users').select('*').eq('id', id).single()
    if (error) return null
    return data as User
}

export async function getUsers(): Promise<User[]> {
    const client = getSupabaseClient(true)
    const { data, error } = await client.from('users').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return (data || []) as User[]
}

export async function createUser(data: UserInsert): Promise<User> {
    const client = getSupabaseClient(true)
    const insertData = {
        ...data,
        email: data.email.toLowerCase(),
    }
    const { data: user, error } = await client.from('users').insert(insertData).select().single()
    if (error) throw error
    return user as User
}

export async function updateUser(id: string, data: UserUpdate): Promise<User> {
    const client = getSupabaseClient(true)
    const updateData = data.email ? { ...data, email: data.email.toLowerCase() } : data
    const { data: user, error } = await client.from('users').update(updateData).eq('id', id).select().single()
    if (error) throw error
    return user as User
}

export async function deleteUser(id: string): Promise<void> {
    const client = getSupabaseClient(true)
    const { error } = await client.from('users').delete().eq('id', id)
    if (error) throw error
}
