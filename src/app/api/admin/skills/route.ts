import { NextRequest, NextResponse } from 'next/server'
import { getSkills, createSkill, updateSkill } from '@/lib/db/supabase/queries'
import { requireAdmin } from '@/lib/auth/utils'

export async function GET() {
  try {
    const skills = await getSkills({ activeOnly: true })
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const data = await request.json()

    const skill = await createSkill({
      name: data.name,
      category: data.category,
      proficiency: data.proficiency || 'intermediate',
      description: data.description,
      icon: data.icon,
      display_order: data.order || 0,
      is_active: data.isActive !== false,
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()

    const data = await request.json()
    const { id, ...updateData } = data

    const skill = await updateSkill(id, {
      name: updateData.name,
      category: updateData.category,
      proficiency: updateData.proficiency,
      description: updateData.description,
      icon: updateData.icon,
      display_order: updateData.order,
      is_active: updateData.isActive,
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 })
    }

    // Soft delete by setting isActive to false
    await updateSkill(id, { is_active: false })

    return NextResponse.json({ message: 'Skill deleted successfully' })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
