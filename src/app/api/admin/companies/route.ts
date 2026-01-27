import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { getCompanies, createCompany } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const relationship = searchParams.get('relationship') || undefined
    const isActive = searchParams.get('isActive')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const client = getSupabaseClient(true)
    let query = client.from('companies').select('*')

    if (category) query = query.eq('category', category)
    if (relationship) query = query.eq('relationship', relationship)
    if (isActive !== null) query = query.eq('is_active', isActive === 'true')
    if (featured !== null) query = query.eq('featured', featured === 'true')
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data: companies, error } = await query
      .order('featured', { ascending: false })
      .order('display_order')
      .order('name')

    if (error) throw error

    return NextResponse.json({
      success: true,
      companies: companies || [],
      count: companies?.length || 0,
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const company = await createCompany({
      name: data.name,
      logo: data.logo,
      website: data.website,
      description: data.description,
      category: data.category || 'Other',
      relationship: data.relationship || 'client',
      start_date: data.startDate || null,
      end_date: data.endDate || null,
      is_active: data.isActive !== false,
      display_order: data.displayOrder || 0,
      featured: data.featured || false,
      technologies: data.technologies || [],
      achievements: data.achievements || [],
    })

    return NextResponse.json({
      success: true,
      company,
      message: 'Company created successfully',
    })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
  }
}
