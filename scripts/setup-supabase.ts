import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
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

const STORAGE_BUCKETS = [
    { name: 'certificates', public: true },
    { name: 'certifications', public: true },
    { name: 'partners', public: true },
    { name: 'blog', public: true },
    { name: 'profiles', public: true },
    { name: 'uploads', public: true },
]

async function createStorageBuckets() {
    console.log('📦 Creating storage buckets...')

    for (const bucket of STORAGE_BUCKETS) {
        const { error } = await supabase.storage.createBucket(bucket.name, {
            public: bucket.public,
            allowedMimeTypes: ['image/*', 'application/pdf'],
            fileSizeLimit: 10485760, // 10MB
        })

        if (error && !error.message.includes('already exists')) {
            console.error(`❌ Error creating bucket ${bucket.name}:`, error.message)
        } else {
            console.log(`✅ Bucket ${bucket.name} ready`)
        }
    }
}

async function uploadDirectory(localPath: string, bucketName: string, remotePath: string = '') {
    const fullPath = path.resolve(localPath)

    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  Directory not found: ${fullPath}`)
        return
    }

    const files = fs.readdirSync(fullPath)
    let uploadCount = 0

    for (const file of files) {
        const filePath = path.join(fullPath, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            await uploadDirectory(filePath, bucketName, path.join(remotePath, file))
        } else {
            const fileBuffer = fs.readFileSync(filePath)
            const remoteFilePath = remotePath ? `${remotePath}/${file}` : file

            // Determine content type
            const ext = path.extname(file).toLowerCase()
            const contentTypes: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.avif': 'image/avif',
                '.svg': 'image/svg+xml',
                '.pdf': 'application/pdf',
            }
            const contentType = contentTypes[ext] || 'application/octet-stream'

            const { error } = await supabase.storage
                .from(bucketName)
                .upload(remoteFilePath, fileBuffer, {
                    contentType,
                    upsert: true,
                })

            if (error) {
                console.error(`❌ Upload failed: ${remoteFilePath}`, error.message)
            } else {
                uploadCount++
            }
        }
    }

    console.log(`✅ Uploaded ${uploadCount} files to ${bucketName}${remotePath ? '/' + remotePath : ''}`)
}

async function uploadAllAssets() {
    console.log('\n🖼️  Uploading assets to Supabase storage...\n')

    const publicDir = path.resolve('public')

    // Upload certificate images
    await uploadDirectory(path.join(publicDir, 'certificates'), 'certificates')

    // Upload partner logos
    await uploadDirectory(path.join(publicDir, 'images/partners'), 'partners')

    // Upload blog images
    await uploadDirectory(path.join(publicDir, 'images/blog'), 'blog')

    // Upload profile images
    const profilesPath = path.join(publicDir, 'images')
    if (fs.existsSync(path.join(profilesPath, 'dk-profile.png'))) {
        await supabase.storage.from('profiles').upload(
            'dk-profile.png',
            fs.readFileSync(path.join(profilesPath, 'dk-profile.png')),
            { contentType: 'image/png', upsert: true }
        )
        console.log('✅ Uploaded dk-profile.png to profiles')
    }
    if (fs.existsSync(path.join(profilesPath, 'profile-hero.png'))) {
        await supabase.storage.from('profiles').upload(
            'profile-hero.png',
            fs.readFileSync(path.join(profilesPath, 'profile-hero.png')),
            { contentType: 'image/png', upsert: true }
        )
        console.log('✅ Uploaded profile-hero.png to profiles')
    }
}

function getStorageUrl(bucket: string, filePath: string): string {
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`
}

async function seedCertifications() {
    console.log('\n📜 Seeding certifications...\n')

    const certifications = [
        {
            name: 'Advanced Diploma of Business',
            description: 'Comprehensive business management qualification covering strategic leadership, operations, and organizational development.',
            issue_date: '2023-06-15',
            category: 'Business',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Adv Dip of Business_Page_1_Image_0001.jpg'),
            skills: ['Leadership', 'Strategic Planning', 'Business Operations', 'Financial Management'],
            is_active: true,
            display_order: 1,
        },
        {
            name: 'Advanced Diploma of IT',
            description: 'Advanced information technology qualification covering software development, systems administration, and IT project management.',
            issue_date: '2023-05-20',
            category: 'Technology',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Adv Dip of IT_Page_1_Image_0001.jpg'),
            skills: ['Software Development', 'Systems Administration', 'IT Project Management', 'Database Management'],
            is_active: true,
            display_order: 2,
        },
        {
            name: 'Advanced Diploma of Leadership & Management',
            description: 'Leadership and management qualification focusing on team leadership, organizational change, and strategic planning.',
            issue_date: '2023-04-10',
            category: 'Management',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Adv Dip of L&M_Page_1_Image_0001.jpg'),
            skills: ['Team Leadership', 'Organizational Change', 'Strategic Management', 'Performance Management'],
            is_active: true,
            display_order: 3,
        },
        {
            name: 'Diploma of Business',
            description: 'Business qualification covering fundamental business operations, marketing, and administration.',
            issue_date: '2022-12-01',
            category: 'Business',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Dip of Business_Page_1_Image_0001.jpg'),
            skills: ['Business Administration', 'Marketing', 'Customer Service', 'Office Management'],
            is_active: true,
            display_order: 4,
        },
        {
            name: 'Diploma of IT',
            description: 'Information technology qualification covering network administration, web development, and IT support.',
            issue_date: '2022-10-15',
            category: 'Technology',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Dip of IT_Page_1_Image_0001.jpg'),
            skills: ['Network Administration', 'Web Development', 'IT Support', 'Cybersecurity Basics'],
            is_active: true,
            display_order: 5,
        },
        {
            name: 'Diploma of Leadership & Management',
            description: 'Leadership qualification covering team management, operational planning, and workplace communication.',
            issue_date: '2022-08-20',
            category: 'Management',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Dip of L&M_Page_1_Image_0001.jpg'),
            skills: ['Team Management', 'Operational Planning', 'Workplace Communication', 'Conflict Resolution'],
            is_active: true,
            display_order: 6,
        },
        {
            name: 'Diploma of Education and Childcare',
            description: 'Education qualification covering early childhood education, child development, and learning program design.',
            issue_date: '2022-06-01',
            category: 'Education',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Dip of Education and Childcare_Page_1_Image_0001.jpg'),
            skills: ['Early Childhood Education', 'Child Development', 'Curriculum Design', 'Child Safety'],
            is_active: true,
            display_order: 7,
        },
        {
            name: 'Certificate IV in Training and Assessment (TAE40122)',
            description: 'Qualification for training and assessing in a vocational education setting.',
            issue_date: '2023-08-15',
            category: 'Education',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel_TAE40122_Page_1.jpg'),
            skills: ['Training Delivery', 'Assessment Design', 'Vocational Education', 'Learning Support'],
            is_active: true,
            display_order: 8,
        },
        {
            name: 'Certificate IV in Ageing Support',
            description: 'Qualification for providing support to older people in residential and community care settings.',
            issue_date: '2022-03-10',
            category: 'Healthcare',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Cert IV in Ageing Support_Page_1_Image_0001.jpg'),
            skills: ['Aged Care', 'Personal Care', 'Health Support', 'Case Management'],
            is_active: true,
            display_order: 9,
        },
        {
            name: 'Certificate IV in Disability',
            description: 'Qualification for providing support to people with disabilities in various settings.',
            issue_date: '2022-04-20',
            category: 'Healthcare',
            image: getStorageUrl('certificates', 'Kauser Ahmed Methel Cert IV in Disability_Page_1_Image_0001.jpg'),
            skills: ['Disability Support', 'Community Access', 'Independence Skills', 'Person-Centered Care'],
            is_active: true,
            display_order: 10,
        },
        {
            name: 'Certificate IV in Real Estate Practice',
            description: 'Real estate qualification covering property management, sales, and agency operations.',
            issue_date: '2021-11-15',
            category: 'Real Estate',
            image: getStorageUrl('certificates', 'Kauser A M Cert IV in Real Estate Prac_Page_1_Image_0001.jpg'),
            skills: ['Property Management', 'Real Estate Sales', 'Property Law', 'Client Relations'],
            is_active: true,
            display_order: 11,
        },
        {
            name: 'Certificate III in Light Vehicle Mechanical Technology',
            description: 'Automotive qualification covering vehicle maintenance, diagnostics, and repairs.',
            issue_date: '2020-09-01',
            category: 'Automotive',
            image: getStorageUrl('certificates', 'Kauser A M Cert III in Light Vehicle Mech Tech_Page_1_Image_0001.jpg'),
            skills: ['Vehicle Maintenance', 'Automotive Diagnostics', 'Engine Repair', 'Safety Standards'],
            is_active: true,
            display_order: 12,
        },
        {
            name: 'QEAC Registration',
            description: 'Qualified Education Agent Counsellor registration for international education services.',
            issue_date: '2023-01-01',
            category: 'Education',
            image: getStorageUrl('certificates', 'PIER QEAC.jpeg'),
            credential_id: 'QEAC-5432',
            skills: ['International Education', 'Student Counselling', 'Visa Guidance', 'Education Marketing'],
            is_active: true,
            display_order: 13,
        },
    ]

    for (const cert of certifications) {
        const { error } = await supabase.from('certifications').upsert(cert, {
            onConflict: 'name',
        })

        if (error) {
            console.error(`❌ Error inserting ${cert.name}:`, error.message)
        } else {
            console.log(`✅ ${cert.name}`)
        }
    }
}

async function seedCompanies() {
    console.log('\n🏢 Seeding companies...\n')

    const companies = [
        {
            name: 'Click Bit',
            description: 'Technology solutions and digital services company',
            logo: getStorageUrl('partners', 'Click_Bit_Logo_Vec.png'),
            website: 'https://clickbit.com.au',
            category: 'Technology',
            relationship: 'Founded',
            featured: true,
            is_active: true,
            display_order: 1,
        },
        {
            name: 'ABCI',
            description: 'Australian Business Consulting International',
            logo: getStorageUrl('partners', 'abci.png'),
            website: 'https://abci.com.au',
            category: 'Consulting',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 2,
        },
        {
            name: 'BS Group',
            description: 'Business services and consulting group',
            logo: getStorageUrl('partners', 'bs-group.png'),
            website: 'https://bsgroup.com.au',
            category: 'Business',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 3,
        },
        {
            name: 'Avrior Consulting',
            description: 'Strategic business consulting services',
            logo: getStorageUrl('partners', 'avrior-consulting.png'),
            website: 'https://avrior.com.au',
            category: 'Consulting',
            relationship: 'Partner',
            featured: false,
            is_active: true,
            display_order: 4,
        },
        {
            name: 'EduWise',
            description: 'Education and training services',
            logo: getStorageUrl('partners', 'edu-wise.png'),
            website: 'https://eduwise.com.au',
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 5,
        },
        {
            name: 'EduVet',
            description: 'Vocational education and training provider',
            logo: getStorageUrl('partners', 'edu-vet.png'),
            website: 'https://eduvet.com.au',
            category: 'Education',
            relationship: 'Partner',
            featured: false,
            is_active: true,
            display_order: 6,
        },
        {
            name: 'Pleasant Education',
            description: 'Educational services and consulting',
            logo: getStorageUrl('partners', 'pleasant-education.png'),
            website: 'https://pleasanteducation.com.au',
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 7,
        },
        {
            name: 'Royal City Education',
            description: 'International education services',
            logo: getStorageUrl('partners', 'royal-city-education.png'),
            website: 'https://royalcityeducation.com.au',
            category: 'Education',
            relationship: 'Partner',
            featured: true,
            is_active: true,
            display_order: 8,
        },
        {
            name: 'Trionix',
            description: 'Technology and innovation solutions',
            logo: getStorageUrl('partners', 'trionix.png'),
            website: 'https://trionix.com.au',
            category: 'Technology',
            relationship: 'Partner',
            featured: false,
            is_active: true,
            display_order: 9,
        },
        {
            name: 'MIE',
            description: 'Migration and international education',
            logo: getStorageUrl('partners', 'mie.png'),
            website: 'https://mie.com.au',
            category: 'Education',
            relationship: 'Partner',
            featured: false,
            is_active: true,
            display_order: 10,
        },
    ]

    for (const company of companies) {
        const { error } = await supabase.from('companies').upsert(company, {
            onConflict: 'name',
        })

        if (error) {
            console.error(`❌ Error inserting ${company.name}:`, error.message)
        } else {
            console.log(`✅ ${company.name}`)
        }
    }
}

async function seedSkills() {
    console.log('\n🛠️  Seeding skills...\n')

    const skills = [
        // Technology Skills
        { name: 'JavaScript', category: 'Technology', proficiency: 'expert', icon: 'code', is_active: true, display_order: 1 },
        { name: 'TypeScript', category: 'Technology', proficiency: 'expert', icon: 'code', is_active: true, display_order: 2 },
        { name: 'React', category: 'Technology', proficiency: 'expert', icon: 'react', is_active: true, display_order: 3 },
        { name: 'Next.js', category: 'Technology', proficiency: 'expert', icon: 'nextjs', is_active: true, display_order: 4 },
        { name: 'Node.js', category: 'Technology', proficiency: 'advanced', icon: 'nodejs', is_active: true, display_order: 5 },
        { name: 'Python', category: 'Technology', proficiency: 'advanced', icon: 'python', is_active: true, display_order: 6 },
        { name: 'SQL', category: 'Technology', proficiency: 'advanced', icon: 'database', is_active: true, display_order: 7 },
        { name: 'Docker', category: 'Technology', proficiency: 'intermediate', icon: 'docker', is_active: true, display_order: 8 },

        // Business Skills
        { name: 'Project Management', category: 'Business', proficiency: 'expert', icon: 'briefcase', is_active: true, display_order: 9 },
        { name: 'Strategic Planning', category: 'Business', proficiency: 'expert', icon: 'chart', is_active: true, display_order: 10 },
        { name: 'Team Leadership', category: 'Business', proficiency: 'expert', icon: 'users', is_active: true, display_order: 11 },
        { name: 'Business Development', category: 'Business', proficiency: 'advanced', icon: 'trending-up', is_active: true, display_order: 12 },

        // Education Skills
        { name: 'Training & Development', category: 'Education', proficiency: 'expert', icon: 'book', is_active: true, display_order: 13 },
        { name: 'Curriculum Design', category: 'Education', proficiency: 'advanced', icon: 'edit', is_active: true, display_order: 14 },
        { name: 'Student Assessment', category: 'Education', proficiency: 'expert', icon: 'clipboard', is_active: true, display_order: 15 },
        { name: 'Education Consulting', category: 'Education', proficiency: 'expert', icon: 'users', is_active: true, display_order: 16 },
    ]

    for (const skill of skills) {
        const { error } = await supabase.from('skills').upsert(skill, {
            onConflict: 'name',
        })

        if (error) {
            console.error(`❌ Error inserting ${skill.name}:`, error.message)
        } else {
            console.log(`✅ ${skill.name}`)
        }
    }
}

async function seedExperiences() {
    console.log('\n💼 Seeding experiences...\n')

    const experiences = [
        {
            title: 'Founder & CEO',
            company: 'Click Bit',
            location: 'Sydney, Australia',
            start_date: '2020-01-01',
            current: true,
            description: 'Leading technology solutions company providing digital services, web development, and IT consulting to businesses across Australia.',
            responsibilities: [
                'Strategic business development and company growth',
                'Technology solutions architecture and implementation',
                'Client relationship management',
                'Team leadership and talent development',
            ],
            achievements: [
                'Grew company from startup to established business',
                'Delivered 50+ successful technology projects',
                'Built a team of 10+ professionals',
            ],
            skills: ['Leadership', 'Business Development', 'Technology Strategy', 'Client Management'],
            is_active: true,
            display_order: 1,
        },
        {
            title: 'Education Consultant',
            company: 'Independent',
            location: 'Sydney, Australia',
            start_date: '2019-06-01',
            current: true,
            description: 'Providing education consulting services for international students and registered training organizations.',
            responsibilities: [
                'Student counselling and course guidance',
                'RTO compliance and quality assurance',
                'Training and assessment services',
                'Education marketing and recruitment',
            ],
            achievements: [
                'Helped 500+ students achieve their education goals',
                'Achieved QEAC certification',
                'Partnered with 20+ education providers',
            ],
            skills: ['Education Consulting', 'Student Counselling', 'RTO Compliance', 'International Education'],
            is_active: true,
            display_order: 2,
        },
        {
            title: 'Trainer & Assessor',
            company: 'Various RTOs',
            location: 'Sydney, Australia',
            start_date: '2021-01-01',
            current: true,
            description: 'Delivering training and assessment in business, leadership, and IT qualifications across multiple registered training organizations.',
            responsibilities: [
                'Training delivery for certificate and diploma qualifications',
                'Student assessment and feedback',
                'Curriculum development and validation',
                'Learning resource creation',
            ],
            achievements: [
                'Trained 200+ students in business qualifications',
                'Developed assessment resources for 10+ units',
                'Achieved excellent student satisfaction ratings',
            ],
            skills: ['Training Delivery', 'Assessment', 'Curriculum Development', 'Vocational Education'],
            is_active: true,
            display_order: 3,
        },
    ]

    for (const exp of experiences) {
        const { error } = await supabase.from('experiences').upsert(exp, {
            onConflict: 'title,company',
        })

        if (error) {
            console.error(`❌ Error inserting ${exp.title} at ${exp.company}:`, error.message)
        } else {
            console.log(`✅ ${exp.title} at ${exp.company}`)
        }
    }
}

async function seedAdminUser() {
    console.log('\n👤 Seeding admin user...\n')

    const bcrypt = require('bcryptjs')
    const passwordHash = await bcrypt.hash('admin123', 12)

    const { error } = await supabase.from('users').upsert({
        email: 'admin@dkathel.com',
        name: 'Kauser Ahmed Methel',
        password_hash: passwordHash,
        role: 'admin',
        avatar: getStorageUrl('profiles', 'dk-profile.png'),
    }, {
        onConflict: 'email',
    })

    if (error) {
        console.error('❌ Error creating admin user:', error.message)
    } else {
        console.log('✅ Admin user created (email: admin@dkathel.com, password: admin123)')
    }
}

async function main() {
    console.log('🚀 Starting Supabase setup...\n')
    console.log(`📍 Supabase URL: ${supabaseUrl}\n`)

    try {
        await createStorageBuckets()
        await uploadAllAssets()
        await seedCertifications()
        await seedCompanies()
        await seedSkills()
        await seedExperiences()
        await seedAdminUser()

        console.log('\n✨ Supabase setup complete!')
        console.log('\n📋 Summary:')
        console.log('   - Storage buckets created: certificates, certifications, partners, blog, profiles, uploads')
        console.log('   - Certificate images uploaded')
        console.log('   - Partner logos uploaded')
        console.log('   - Profile images uploaded')
        console.log('   - Database seeded with certifications, companies, skills, experiences')
        console.log('   - Admin user created')
        console.log('\n🔐 Admin login:')
        console.log('   Email: admin@dkathel.com')
        console.log('   Password: admin123')
    } catch (error) {
        console.error('❌ Setup failed:', error)
        process.exit(1)
    }
}

main()
