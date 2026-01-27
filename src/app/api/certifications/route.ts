import { NextRequest, NextResponse } from 'next/server'
import { getCertifications } from '@/lib/db/supabase/queries'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined

    const certifications = await getCertifications({
      category,
      search,
      activeOnly: true,
    })

    return NextResponse.json({
      success: true,
      certifications,
      count: certifications.length,
    })
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
