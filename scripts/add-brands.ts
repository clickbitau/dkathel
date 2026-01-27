import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables!')
    console.error('   Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

function getStorageUrl(bucket: string, filePath: string): string {
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`
}

async function seedNewBrands() {
    console.log('🏢 Adding new brand partners to database...\n')

    const newCompanies = [
        {
            name: 'TB Training',
            description: 'Professional training and vocational education provider',
            logo: getStorageUrl('partners', '01-5.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 11,
        },
        {
            name: 'Outback Consulting',
            description: 'Australian business consulting with Indigenous focus',
            logo: getStorageUrl('partners', '23t.png'),
            category: 'Consulting',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 12,
        },
        {
            name: 'Licence Assist',
            description: 'Licensing and compliance consulting services',
            logo: getStorageUrl('partners', 'la.png'),
            category: 'Consulting',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 13,
        },
        {
            name: 'EDU Energy',
            description: 'Education and training for the energy sector',
            logo: getStorageUrl('partners', 'logo-2-1.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 14,
        },
        {
            name: 'Pacific Certify',
            description: 'Certification and accreditation services',
            logo: getStorageUrl('partners', 'logo-2.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 15,
        },
        {
            name: 'Pacific Skill Education',
            description: 'Vocational skills training and professional development',
            logo: getStorageUrl('partners', 'logo01.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 16,
        },
        {
            name: 'BS Education Global',
            description: 'Global education services and student placement',
            logo: getStorageUrl('partners', 'logo2.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 17,
        },
        {
            name: 'BSF Professionals',
            description: 'Professional services and business consulting',
            logo: getStorageUrl('partners', 'bsf.png'),
            category: 'Consulting',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 18,
        },
        {
            name: 'Oceania EDU',
            description: 'International education services across Oceania',
            logo: getStorageUrl('partners', 'oc.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 19,
        },
        {
            name: 'Quantum Training',
            description: 'Advanced training and professional development solutions',
            logo: getStorageUrl('partners', 'q-logo.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 20,
        },
        {
            name: 'Visionary College',
            description: 'Higher education and vocational training institution',
            logo: getStorageUrl('partners', 'vxc.png'),
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 21,
        },
    ]

    let successCount = 0
    let errorCount = 0

    for (const company of newCompanies) {
        const { error } = await supabase.from('companies').upsert(company, {
            onConflict: 'name',
        })

        if (error) {
            console.error(`❌ Error inserting ${company.name}:`, error.message)
            errorCount++
        } else {
            console.log(`✅ ${company.name}`)
            successCount++
        }
    }

    console.log(`\n📊 Summary: ${successCount} added, ${errorCount} errors`)
}

seedNewBrands()
    .then(() => {
        console.log('\n✨ Brand seeding complete!')
        process.exit(0)
    })
    .catch((error) => {
        console.error('❌ Seeding failed:', error)
        process.exit(1)
    })
