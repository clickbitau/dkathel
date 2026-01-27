import { NextRequest, NextResponse } from 'next/server'
import { getSelfHostedApps } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const publicOnly = searchParams.get('public') === 'true'

    const apps = await getSelfHostedApps({
      category: category && category !== 'all' ? category : undefined,
      status: 'active',
      publicOnly,
    })

    // Get category stats using Supabase
    const client = getSupabaseClient(true)
    const { data: allApps } = await client
      .from('self_hosted_apps')
      .select('category')
      .eq('status', 'active')
      .eq('is_public', true) as { data: { category: string }[] | null }

    // Calculate category stats manually
    const categoryStatsMap = (allApps || []).reduce(
      (acc, app) => {
        acc[app.category] = (acc[app.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const categoryStats = Object.entries(categoryStatsMap)
      .map(([_id, count]) => ({ _id, count }))
      .sort((a, b) => b.count - a.count)

    return NextResponse.json({
      apps,
      categoryStats,
      total: apps.length,
    })
  } catch (error) {
    console.error('Error fetching self-hosted apps:', error)
    return NextResponse.json(
      { error: 'Failed to fetch self-hosted apps' },
      { status: 500 }
    )
  }
}
