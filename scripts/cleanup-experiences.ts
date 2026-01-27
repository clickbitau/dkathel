import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// IDs to delete (duplicates/old entries)
const idsToDelete = [
    '26ed3dd8-b66b-4688-8bbb-ac6eeb6cb95f', // Click Bit (old duplicate)
    '8cd2be67-c5ab-4a5a-8c2d-e5f6a7b8c9d0', // Independent (wrong entry)
    'bd4b6382-d6bc-4b6b-9d3e-f6a7b8c9d0e1'  // Various RTOs (wrong entry)
]

async function cleanup() {
    console.log('🧹 Cleaning up duplicate experiences...\n')

    // First, list all current experiences
    const { data: before, error: listError } = await supabase
        .from('experiences')
        .select('id, company, title')
        .order('display_order')

    if (listError) {
        console.error('Error listing experiences:', listError)
        return
    }

    console.log('Current experiences:')
    before?.forEach(exp => {
        console.log(`  - ${exp.id.slice(0, 8)}... ${exp.company} (${exp.title})`)
    })
    console.log()

    // Delete duplicates by company name pattern
    const duplicateCompanies = ['Click Bit', 'Independent', 'Various RTOs']

    for (const company of duplicateCompanies) {
        const { error } = await supabase
            .from('experiences')
            .delete()
            .eq('company', company)

        if (error) {
            console.log(`❌ Failed to delete "${company}":`, error.message)
        } else {
            console.log(`✅ Deleted "${company}"`)
        }
    }

    // Verify remaining
    const { data: after } = await supabase
        .from('experiences')
        .select('id, company, title')
        .order('display_order')

    console.log('\nRemaining experiences:')
    after?.forEach(exp => {
        console.log(`  ✓ ${exp.company} - ${exp.title}`)
    })

    console.log(`\n✅ Cleanup complete! ${after?.length || 0} experiences remaining.`)
}

cleanup().catch(console.error)
