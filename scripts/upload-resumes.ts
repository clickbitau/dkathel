import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
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

async function uploadResumes() {
    console.log('📄 Uploading resume files to Supabase...\n')

    const resumesDir = path.resolve('public/resumes')

    if (!fs.existsSync(resumesDir)) {
        console.error('❌ Resumes directory not found:', resumesDir)
        process.exit(1)
    }

    const files = fs.readdirSync(resumesDir)
    let uploadCount = 0

    for (const file of files) {
        // Skip macOS metadata files
        if (file.startsWith('._') || file.startsWith('.DS_Store')) {
            continue
        }

        const filePath = path.join(resumesDir, file)
        const stat = fs.statSync(filePath)

        if (stat.isFile() && file.toLowerCase().endsWith('.pdf')) {
            const fileBuffer = fs.readFileSync(filePath)

            const { error } = await supabase.storage
                .from('uploads')
                .upload(`resumes/${file}`, fileBuffer, {
                    contentType: 'application/pdf',
                    upsert: true,
                })

            if (error) {
                console.error(`❌ Upload failed: ${file}`, error.message)
            } else {
                console.log(`✅ Uploaded: ${file}`)
                uploadCount++
            }
        }
    }

    console.log(`\n✨ Successfully uploaded ${uploadCount} resume files to uploads/resumes/`)

    // Get public URL for executive resume
    const { data } = supabase.storage.from('uploads').getPublicUrl('resumes/executive-resume.pdf')
    console.log(`\n📎 Executive resume URL: ${data.publicUrl}`)
}

uploadResumes()
