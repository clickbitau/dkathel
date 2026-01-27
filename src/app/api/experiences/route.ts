import { NextResponse } from 'next/server'
import { getExperiences } from '@/lib/db/supabase/queries'

export async function GET() {
  try {
    const experiences = await getExperiences({ activeOnly: true })

    const formattedExperiences = experiences.map((exp) => ({
      id: exp.id,
      title: exp.title,
      company: exp.company,
      location: exp.location,
      startDate: exp.start_date,
      endDate: exp.end_date,
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities,
      technologies: exp.technologies,
      achievements: exp.achievements,
      skills: exp.skills,
    }))

    return NextResponse.json(formattedExperiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}
