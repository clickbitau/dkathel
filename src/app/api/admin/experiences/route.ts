import { NextRequest, NextResponse } from 'next/server'
import { getExperiences, createExperience, updateExperience } from '@/lib/db/supabase/queries'
import { getSupabaseClient } from '@/lib/supabase'
import { requireAdmin } from '@/lib/auth/utils'

export async function GET() {
  try {
    const experiences = await getExperiences({ activeOnly: true })
    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const data = await request.json()

    const experience = await createExperience({
      title: data.title,
      company: data.company,
      location: data.location,
      start_date: data.startDate,
      end_date: data.endDate || null,
      current: data.current || false,
      description: data.description,
      technologies: data.technologies || [],
      achievements: data.achievements || [],
      display_order: data.order || 0,
      is_active: data.isActive !== false,
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()

    const data = await request.json()
    const { id, ...updateData } = data

    const experience = await updateExperience(id, {
      title: updateData.title,
      company: updateData.company,
      location: updateData.location,
      start_date: updateData.startDate,
      end_date: updateData.endDate || null,
      current: updateData.current,
      description: updateData.description,
      technologies: updateData.technologies,
      achievements: updateData.achievements,
      display_order: updateData.order,
      is_active: updateData.isActive,
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 })
    }

    // Soft delete by setting isActive to false
    await updateExperience(id, { is_active: false })

    return NextResponse.json({ message: 'Experience deleted successfully' })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
