import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  process.exit(1)
}

// Read schema file
const schemaPath = path.join(__dirname, 'supabase-schema.sql')
const schema = fs.readFileSync(schemaPath, 'utf-8')

// Extract project ID from URL
const projectId = supabaseUrl.replace('https://', '').replace('.supabase.co', '')

async function runSQL() {
  console.log('🚀 Running database schema via Supabase Management API...\n')
  console.log(`📍 Project ID: ${projectId}`)

  // Split schema into individual statements
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`📄 Found ${statements.length} SQL statements\n`)

  let success = 0
  let failed = 0

  for (let i = 0; i < statements.length; i++) {
    const sql = statements[i] + ';'

    try {
      // Use the SQL endpoint from supabase-js internal API
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ query: sql }),
      })

      if (response.ok) {
        success++
        process.stdout.write('✓')
      } else {
        failed++
        process.stdout.write('✗')
      }
    } catch (err) {
      failed++
      process.stdout.write('✗')
    }
  }

  console.log(`\n\n📊 Results: ${success} succeeded, ${failed} failed`)

  if (failed > 0) {
    console.log('\n⚠️  The Supabase REST API does not support DDL statements.')
    console.log('   You need to run the schema manually.\n')
    console.log('📋 Options:')
    console.log('   1. Supabase Dashboard → SQL Editor → paste contents of scripts/supabase-schema.sql')
    console.log('   2. Use Supabase CLI: npx supabase db push')
    console.log('   3. Use psql with your database password (not service key)')
  }
}

runSQL().catch(console.error)
