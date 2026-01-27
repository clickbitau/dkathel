import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables!')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const BUCKETS = ['certificates', 'certifications', 'partners', 'blog', 'profiles', 'uploads']

async function cleanupBucket(bucketName: string) {
    console.log(`\n🧹 Cleaning up bucket: ${bucketName}`)

    const { data: files, error } = await supabase.storage.from(bucketName).list('', {
        limit: 1000,
    })

    if (error) {
        console.error(`❌ Error listing files in ${bucketName}:`, error.message)
        return
    }

    if (!files || files.length === 0) {
        console.log(`   No files in bucket`)
        return
    }

    // Find junk files (macOS metadata files starting with ._ or ._)
    const junkFiles = files.filter(file =>
        file.name.startsWith('._') ||
        file.name.startsWith('.DS_Store') ||
        (file.metadata?.size && file.metadata.size < 500) // Very small files likely junk
    )

    if (junkFiles.length === 0) {
        console.log(`   ✅ No junk files found`)
        return
    }

    console.log(`   Found ${junkFiles.length} junk files to remove`)

    for (const file of junkFiles) {
        const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove([file.name])

        if (deleteError) {
            console.error(`   ❌ Failed to delete ${file.name}:`, deleteError.message)
        } else {
            console.log(`   🗑️  Deleted: ${file.name}`)
        }
    }
}

async function main() {
    console.log('🧹 Storage Cleanup Script')
    console.log('========================')
    console.log(`📍 Supabase URL: ${supabaseUrl}\n`)

    for (const bucket of BUCKETS) {
        await cleanupBucket(bucket)
    }

    console.log('\n✨ Cleanup complete!')
}

main().catch(console.error)
