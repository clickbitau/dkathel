import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Accurate experience data from resume
const experiences = [
    {
        title: 'Founder & Chief Technology Officer',
        company: 'ClickBIT',
        location: 'Sydney, NSW, Australia',
        start_date: '2020-01-01',
        end_date: null,
        current: true,
        description: 'Created a technology consultancy serving a broad client base across SMEs and large enterprises, delivering robust infrastructure solutions through efficient virtualization, containerized environments, and resilient storage systems.',
        responsibilities: [
            'Architect and maintain enterprise server infrastructure using Proxmox virtualization, supporting 50+ client systems',
            'Lead full-stack development creating custom CRM systems, e-commerce platforms, and web applications using React, Node.js, PHP',
            'Implement robust cybersecurity protocols including automated backup solutions achieving 99.9% uptime',
            'Manage containerized applications using Docker, reducing deployment time by 60%',
            'Direct complex infrastructure projects including network configuration for industrial clients'
        ],
        achievements: [
            'Built enterprise server infrastructure supporting 1000+ concurrent users',
            'Developed multiple full-stack web applications serving diverse client requirements',
            'Implemented security frameworks preventing 100% of attempted system breaches',
            'Achieved 99.9% uptime across all managed client systems'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'PHP', 'Docker', 'Proxmox', 'MongoDB', 'SQL', 'AWS'],
        skills: ['Enterprise Infrastructure', 'Full-Stack Development', 'Cybersecurity', 'Business Development'],
        display_order: 1,
        is_active: true
    },
    {
        title: 'Operations Manager',
        company: 'Trionix IT Solutions',
        location: 'Sydney, NSW, Australia',
        start_date: '2023-09-01',
        end_date: '2025-01-01',
        current: false,
        description: 'Directed comprehensive operations strategy for established IT consultancy managing diverse client portfolio and service delivery excellence.',
        responsibilities: [
            'Led project portfolio management coordinating multiple concurrent technical projects',
            'Managed client relationship development including technical consultations and solution architecture',
            'Supervised documentation systems maintaining detailed project records for compliance',
            'Coordinated cross-functional teams ensuring efficient resource allocation'
        ],
        achievements: [
            'Managed inventory tracking and logistics for 30+ client installations',
            'Maintained project documentation with 99% accuracy',
            'Implemented operational improvements streamlining service delivery'
        ],
        technologies: ['Project Management', 'IT Consulting', 'Technical Documentation', 'Client Relations'],
        skills: ['Operations Management', 'Project Coordination', 'Team Leadership', 'Client Management'],
        display_order: 2,
        is_active: true
    },
    {
        title: 'Business Operations Director',
        company: 'Avrior Consulting',
        location: 'Sydney, NSW, Australia',
        start_date: '2021-11-01',
        end_date: '2023-09-01',
        current: false,
        description: 'Progressive career advancement from Administrative Assistant to Operations Director. Led strategic marketing, financial operations, and business process optimization.',
        responsibilities: [
            'Managed $30,000 monthly digital marketing budget across Google Ads, Facebook, LinkedIn',
            'Led marketing automation implementation using CRM systems for campaign optimization',
            'Managed payroll processing for 50+ employees with compliance excellence',
            'Developed content marketing strategies including SEO and brand positioning'
        ],
        achievements: [
            'Generated substantial revenue growth through data-driven marketing campaigns',
            'Improved operational efficiency by 35% through process implementation',
            'Advanced through 4 roles demonstrating exceptional adaptability'
        ],
        technologies: ['Google Ads', 'Facebook Ads', 'CRM Systems', 'Financial Operations', 'Marketing Automation'],
        skills: ['Digital Marketing', 'Financial Management', 'Operations Leadership', 'Strategic Planning'],
        display_order: 3,
        is_active: true
    }
]

async function updateExperiences() {
    console.log('📝 Updating experiences with accurate resume data...\n')

    // First, delete all existing experiences
    const { error: deleteError } = await supabase
        .from('experiences')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (deleteError) {
        console.log('Note: Delete error (may be empty table):', deleteError.message)
    }

    // Insert new experiences
    for (const exp of experiences) {
        const { error } = await supabase
            .from('experiences')
            .insert(exp)

        if (error) {
            console.log(`❌ Failed to insert ${exp.company}:`, error.message)
        } else {
            console.log(`✅ Inserted: ${exp.title} at ${exp.company}`)
        }
    }

    // Verify
    const { data } = await supabase
        .from('experiences')
        .select('title, company, start_date, end_date, current')
        .order('display_order')

    console.log('\n📋 Final experiences:')
    data?.forEach(exp => {
        const period = exp.current ? `${exp.start_date.slice(0, 4)} - Present` : `${exp.start_date.slice(0, 4)} - ${exp.end_date?.slice(0, 4)}`
        console.log(`  ✓ ${exp.title} at ${exp.company} (${period})`)
    })

    console.log('\n✅ Update complete!')
}

updateExperiences().catch(console.error)
