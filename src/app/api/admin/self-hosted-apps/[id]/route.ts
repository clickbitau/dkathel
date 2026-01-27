import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { getSelfHostedAppById, updateSelfHostedApp, deleteSelfHostedApp } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'

// GET /api/admin/self-hosted-apps/[id] - Get specific app
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { id } = await params
    const app = await getSelfHostedAppById(id)
    if (!app) {
      return NextResponse.json({ error: 'Self-hosted app not found' }, { status: 404 })
    }

    return NextResponse.json({ app })
  } catch (error) {
    console.error('Error fetching self-hosted app:', error)
    return NextResponse.json({ error: 'Failed to fetch self-hosted app' }, { status: 500 })
  }
}

// PUT /api/admin/self-hosted-apps/[id] - Update app
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { name, subdomain, description, category, url, icon, status, isPublic, displayOrder, tags } = body

    const existingApp = await getSelfHostedAppById(id)
    if (!existingApp) {
      return NextResponse.json({ error: 'Self-hosted app not found' }, { status: 404 })
    }

    // Check if subdomain is already taken by another app
    if (subdomain) {
      const client = getSupabaseClient(true)
      const { data: subdomainApp } = await client
        .from('self_hosted_apps')
        .select('id')
        .eq('subdomain', subdomain.toLowerCase())
        .neq('id', id)
        .single()

      if (subdomainApp) {
        return NextResponse.json({ error: 'Subdomain already taken by another app' }, { status: 400 })
      }
    }

    const app = await updateSelfHostedApp(id, {
      name,
      subdomain: subdomain?.toLowerCase(),
      description,
      category,
      url,
      icon,
      status,
      is_public: isPublic,
      display_order: displayOrder,
      tags,
    })

    return NextResponse.json({
      app,
      message: 'Self-hosted app updated successfully',
    })
  } catch (error) {
    console.error('Error updating self-hosted app:', error)
    return NextResponse.json({ error: 'Failed to update self-hosted app' }, { status: 500 })
  }
}

// DELETE /api/admin/self-hosted-apps/[id] - Delete app
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { id } = await params
    const app = await getSelfHostedAppById(id)
    if (!app) {
      return NextResponse.json({ error: 'Self-hosted app not found' }, { status: 404 })
    }

    await deleteSelfHostedApp(id)

    return NextResponse.json({ message: 'Self-hosted app deleted successfully' })
  } catch (error) {
    console.error('Error deleting self-hosted app:', error)
    return NextResponse.json({ error: 'Failed to delete self-hosted app' }, { status: 500 })
  }
}
