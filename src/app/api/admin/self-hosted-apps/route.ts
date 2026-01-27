import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { getSelfHostedApps, createSelfHostedApp } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'

// GET /api/admin/self-hosted-apps - Get all self-hosted apps
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const isPublic = searchParams.get('isPublic')

    const client = getSupabaseClient(true)
    let query = client.from('self_hosted_apps').select('*')

    if (search) {
      query = query.or(`name.ilike.%${search}%,subdomain.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (isPublic !== null && isPublic !== undefined && isPublic !== '') {
      query = query.eq('is_public', isPublic === 'true')
    }

    const { data: apps, error } = await query.order('display_order').order('name')

    if (error) throw error

    return NextResponse.json({ apps: apps || [] })
  } catch (error) {
    console.error('Error fetching self-hosted apps:', error)
    return NextResponse.json({ error: 'Failed to fetch self-hosted apps' }, { status: 500 })
  }
}

// POST /api/admin/self-hosted-apps - Create new self-hosted app
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { name, subdomain, description, category, url, icon, status, isPublic, displayOrder, tags } = body

    // Validate required fields
    if (!name || !subdomain || !url) {
      return NextResponse.json(
        { error: 'Name, subdomain, and URL are required' },
        { status: 400 }
      )
    }

    // Check if subdomain already exists
    const client = getSupabaseClient(true)
    const { data: existingApp } = await client
      .from('self_hosted_apps')
      .select('id')
      .eq('subdomain', subdomain.toLowerCase())
      .single()

    if (existingApp) {
      return NextResponse.json(
        { error: 'App with this subdomain already exists' },
        { status: 400 }
      )
    }

    // Create app
    const app = await createSelfHostedApp({
      name,
      subdomain: subdomain.toLowerCase(),
      description,
      category: category || 'other',
      url,
      icon,
      status: status || 'active',
      is_public: isPublic || false,
      display_order: displayOrder || 0,
      tags: tags || [],
    })

    return NextResponse.json(
      { app, message: 'Self-hosted app created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating self-hosted app:', error)
    return NextResponse.json({ error: 'Failed to create self-hosted app' }, { status: 500 })
  }
}
