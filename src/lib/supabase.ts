import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Environment validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL not defined - database features will be disabled')
}

if (!supabaseAnonKey) {
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY not defined - database features will be disabled')
}

// Client-side Supabase client (uses anon key, respects RLS)
// Using untyped client for flexibility - types are enforced in query layer
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Server-side Supabase client (uses service role key, bypasses RLS)
// Only use in API routes and server components
export const supabaseAdmin: SupabaseClient | null = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
    : null

// Helper to get either admin or regular client
export function getSupabaseClient(useAdmin = false): SupabaseClient {
    if (useAdmin) {
        if (!supabaseAdmin) {
            throw new Error('Supabase admin client not configured. Check SUPABASE_SERVICE_ROLE_KEY.')
        }
        return supabaseAdmin
    }

    if (!supabase) {
        throw new Error('Supabase client not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
    }
    return supabase
}

// Type-safe table names
export const TABLES = {
    users: 'users',
    certifications: 'certifications',
    experiences: 'experiences',
    companies: 'companies',
    blog_posts: 'blog_posts',
    skills: 'skills',
    self_hosted_apps: 'self_hosted_apps',
} as const
