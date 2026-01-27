import { NextResponse } from 'next/server'
import { getSkills } from '@/lib/db/supabase/queries'

export async function GET() {
  try {
    const skills = await getSkills({ activeOnly: true })

    // Group skills by category
    const groupedSkills = skills.reduce(
      (acc, skill) => {
        const category = skill.category
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push({
          id: skill.id,
          name: skill.name,
          proficiency: skill.proficiency,
          description: skill.description,
          icon: skill.icon,
        })
        return acc
      },
      {} as Record<string, Array<{ id: string; name: string; proficiency: string; description: string | null; icon: string | null }>>
    )

    return NextResponse.json(groupedSkills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}
