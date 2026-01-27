import { NextRequest, NextResponse } from 'next/server'
import { getCertifications } from '@/lib/db/supabase/queries'

// Transform Supabase format (snake_case) to frontend format (camelCase)
function transformCertification(cert: Record<string, unknown>) {
  return {
    _id: cert.id,
    name: cert.name,
    issuer: 'TAFE NSW / Registered Training Organization',
    description: cert.description,
    issueDate: cert.issue_date,
    expiryDate: cert.expiry_date,
    credentialId: cert.credential_id,
    credentialUrl: cert.credential_url,
    image: cert.image,
    pdfUrl: cert.pdf_url,
    skills: cert.skills || [],
    category: cert.category,
    isActive: cert.is_active,
    displayOrder: cert.display_order,
    createdAt: cert.created_at,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined

    const rawCertifications = await getCertifications({
      category,
      search,
      activeOnly: true,
    })

    // Transform to frontend format
    const certifications = rawCertifications.map(transformCertification)

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
