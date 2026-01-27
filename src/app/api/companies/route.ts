import { NextRequest, NextResponse } from 'next/server'
import { getCompanies } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const relationship = searchParams.get('relationship')
    const featured = searchParams.get('featured')
    const isActive = searchParams.get('isActive') || 'true'

    const companies = await getCompanies({
      category: category && category !== 'all' ? category : undefined,
      relationship: relationship && relationship !== 'all' ? relationship : undefined,
      featured: featured === 'true' ? true : undefined,
      activeOnly: isActive === 'true',
    })

    // Get category stats using Supabase
    const client = getSupabaseClient(true)
    const { data: allCompanies } = await client
      .from('companies')
      .select('category')
      .eq('is_active', true) as { data: { category: string }[] | null }

    // Calculate category stats manually
    const categoryStatsMap = (allCompanies || []).reduce(
      (acc, company) => {
        acc[company.category] = (acc[company.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const categoryStats = Object.entries(categoryStatsMap)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => b.count - a.count)

    return NextResponse.json({
      companies,
      categoryStats,
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}
