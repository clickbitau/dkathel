import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { createBlogPost } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const offset = (page - 1) * limit

    const client = getSupabaseClient(true)
    let query = client
      .from('blog_posts')
      .select('id, title, slug, status, published_at, created_at, views, tags', { count: 'exact' })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
    }

    const { data: posts, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    const total = count || 0

    return NextResponse.json({
      posts: posts || [],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching admin blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Generate slug if not provided
    let slug = data.slug || generateSlug(data.title)

    // Check if slug already exists
    const client = getSupabaseClient(true)
    const { data: existingPost } = await client
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingPost) {
      slug = `${slug}-${Date.now()}`
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(data.content)

    // Set publish date for published posts
    const publishedAt = data.status === 'published' && !data.publishedAt
      ? new Date().toISOString()
      : data.publishedAt

    // Ensure proper SEO metadata
    const seo = {
      title: data.seo?.title || data.title,
      description: data.seo?.description || data.excerpt || data.title,
      keywords: data.seo?.keywords || data.tags || [],
      ogImage: data.seo?.ogImage || null,
      canonicalUrl: data.seo?.canonicalUrl || null,
    }

    const blogPost = await createBlogPost({
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      featured_image: data.featuredImage,
      tags: data.tags || [],
      status: data.status || 'draft',
      published_at: publishedAt,
      seo,
      reading_time: readingTime,
      views: 0,
    })

    return NextResponse.json(
      { post: blogPost, message: 'Blog post created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
