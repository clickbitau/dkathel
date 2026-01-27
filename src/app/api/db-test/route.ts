import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
  try {
    const client = getSupabaseClient(true)

    // Test connection by running a simple query
    const { data, error } = await client.from('certifications').select('id').limit(1)

    if (error) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to connect to Supabase', error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase Connected',
      database: 'PostgreSQL (Supabase)',
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { status: 'error', message: 'Failed to connect to Supabase', error: errorMessage },
      { status: 500 }
    )
  }
}
