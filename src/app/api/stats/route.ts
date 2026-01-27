import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
  try {
    const client = getSupabaseClient(true)

    // Get counts from Supabase
    const [skillsResult, companiesResult] = await Promise.all([
      client.from('skills').select('id', { count: 'exact', head: true }).eq('is_active', true),
      client.from('companies').select('id', { count: 'exact', head: true }).eq('is_active', true),
    ])

    const activeSkills = skillsResult.count || 0
    const activeCompanies = companiesResult.count || 0

    return NextResponse.json({
      stats: {
        yearsOfExperience: '6+',
        successRate: '98%',
        specialties: activeSkills > 0 ? `${activeSkills}+` : '20+',
        projects: activeCompanies > 0 ? `${activeCompanies}+` : '8+',
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
