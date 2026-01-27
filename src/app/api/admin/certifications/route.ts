import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { getCertifications, createCertification } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const isActive = searchParams.get('isActive')
    const search = searchParams.get('search') || undefined

    // For admin, we might want to show all (active and inactive)
    const client = getSupabaseClient(true)
    let query = client.from('certifications').select('*')

    if (category) query = query.eq('category', category)
    if (isActive !== null) query = query.eq('is_active', isActive === 'true')
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data: certifications, error } = await query
      .order('display_order')
      .order('issue_date', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      success: true,
      certifications: certifications || [],
      count: certifications?.length || 0,
    })
  } catch (error) {
    console.error('Error fetching certifications:', error)
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

    const certification = await createCertification({
      name: data.name,
      description: data.description,
      issue_date: data.issueDate,
      expiry_date: data.expiryDate || null,
      credential_id: data.credentialId,
      credential_url: data.credentialUrl,
      image: data.image,
      skills: data.skills || [],
      category: data.category || 'Other',
      is_active: data.isActive !== false,
      display_order: data.displayOrder || 0,
    })

    return NextResponse.json({
      success: true,
      certification,
      message: 'Certification created successfully',
    })
  } catch (error) {
    console.error('Error creating certification:', error)
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
  }
}
