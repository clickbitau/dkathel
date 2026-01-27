const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

async function setupSkills() {
  const skillSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['system-administration', 'support-recovery', 'web-development', 'cybersecurity', 'networking', 'other']
    },
    proficiency: { 
      type: String, 
      required: true, 
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate'
    },
    description: { type: String, trim: true },
    icon: { type: String, trim: true },
    order: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true }
  }, { timestamps: true });

  const Skill = mongoose.model('Skill', skillSchema);

  const skills = [
    // System Administration
    {
      name: 'Active Directory Management',
      category: 'system-administration',
      proficiency: 'advanced',
      description: 'User and group management, policy configuration',
      order: 1
    },
    {
      name: 'Email Administration',
      category: 'system-administration',
      proficiency: 'advanced',
      description: 'Exchange/Office 365 management and troubleshooting',
      order: 2
    },
    {
      name: 'Storage Management',
      category: 'system-administration',
      proficiency: 'intermediate',
      description: 'File server management and backup systems',
      order: 3
    },
    {
      name: 'Network Monitoring',
      category: 'system-administration',
      proficiency: 'intermediate',
      description: 'Network performance monitoring and alerting',
      order: 4
    },
    
    // Support & Recovery
    {
      name: 'Desktop Support',
      category: 'support-recovery',
      proficiency: 'expert',
      description: 'Hardware and software troubleshooting',
      order: 1
    },
    {
      name: 'Data Recovery',
      category: 'support-recovery',
      proficiency: 'advanced',
      description: 'File recovery and system restoration',
      order: 2
    },
    {
      name: 'Ticketing System Proficiency',
      category: 'support-recovery',
      proficiency: 'advanced',
      description: 'ServiceNow, Jira, and other ITSM tools',
      order: 3
    },
    {
      name: 'Operating Systems Expertise',
      category: 'support-recovery',
      proficiency: 'expert',
      description: 'Windows, macOS, and Linux support',
      order: 4
    },
    
    // Web Development
    {
      name: 'Custom Web Development',
      category: 'web-development',
      proficiency: 'intermediate',
      description: 'React, Next.js, and modern web technologies',
      order: 1
    },
    {
      name: 'E-commerce Platforms',
      category: 'web-development',
      proficiency: 'intermediate',
      description: 'Shopify, WooCommerce, and custom solutions',
      order: 2
    },
    {
      name: 'Digital Marketing',
      category: 'web-development',
      proficiency: 'intermediate',
      description: 'SEO, PPC, and social media marketing',
      order: 3
    },
    {
      name: 'SEO & PPC',
      category: 'web-development',
      proficiency: 'intermediate',
      description: 'Search engine optimization and paid advertising',
      order: 4
    },
    
    // Cybersecurity
    {
      name: 'Network Security',
      category: 'cybersecurity',
      proficiency: 'intermediate',
      description: 'Firewall configuration and security monitoring',
      order: 1
    },
    {
      name: 'Security Auditing',
      category: 'cybersecurity',
      proficiency: 'intermediate',
      description: 'Vulnerability assessment and penetration testing',
      order: 2
    },
    {
      name: 'Incident Response',
      category: 'cybersecurity',
      proficiency: 'intermediate',
      description: 'Security incident handling and recovery',
      order: 3
    },
    
    // Networking
    {
      name: 'Network Configuration',
      category: 'networking',
      proficiency: 'intermediate',
      description: 'Router and switch configuration',
      order: 1
    },
    {
      name: 'VPN Management',
      category: 'networking',
      proficiency: 'intermediate',
      description: 'Virtual private network setup and maintenance',
      order: 2
    },
    {
      name: 'Wireless Networking',
      category: 'networking',
      proficiency: 'intermediate',
      description: 'Wi-Fi infrastructure and security',
      order: 3
    }
  ];

  try {
    // Clear existing skills
    await Skill.deleteMany({});
    console.log('Cleared existing skills');

    // Insert new skills
    const createdSkills = await Skill.insertMany(skills);
    console.log(`Created ${createdSkills.length} skills`);
  } catch (error) {
    console.error('Error setting up skills:', error);
  }
}

async function setupExperiences() {
  const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true },
    technologies: [{ type: String, trim: true }],
    achievements: [{ type: String, trim: true }],
    order: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true }
  }, { timestamps: true });

  const Experience = mongoose.model('Experience', experienceSchema);

  const experiences = [
    {
      title: 'IT Support Consultant',
      company: 'Trionix IT',
      location: 'Sydney, NSW',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2025-01-01'),
      current: false,
      description: 'Conducted thorough assessments of existing client networks to identify areas for improvement. Developed customized IT strategies for clients to align technology solutions with business objectives.',
      technologies: ['Active Directory', 'Office 365', 'Network Monitoring', 'Ticketing Systems'],
      achievements: [
        'Maintained detailed records of completed projects for accurate reporting',
        'Evaluated emerging technologies for potential implementation',
        'Collaborated with cross-functional teams to develop IT solutions',
        'Reduced downtime through proactive system maintenance'
      ],
      order: 1
    },
    {
      title: 'IT Consultant',
      company: 'Avrior Consulting',
      location: 'Sydney, NSW',
      startDate: new Date('2021-11-01'),
      endDate: new Date('2023-09-01'),
      current: false,
      description: 'Provided comprehensive IT consulting services to various businesses, focusing on system optimization and technology planning aligned with growth projections.',
      technologies: ['System Administration', 'Network Security', 'Data Recovery', 'ITSM Tools'],
      achievements: [
        'Reduced downtime by proactively addressing potential issues',
        'Increased client satisfaction through effective troubleshooting',
        'Made recommendations and performed upgrades for technology planning',
        'Provided training sessions on new technologies and best practices',
        'Streamlined workflow processes for more efficient resource use'
      ],
      order: 2
    },
    {
      title: 'Founder & Managing Director',
      company: 'ClickBit',
      location: 'Sydney, NSW',
      startDate: new Date('2023-01-01'),
      endDate: null,
      current: true,
      description: 'Founded ClickBit, a creative content and digital marketing agency focused on storytelling, brand strategy, and impactful online presence for modern businesses.',
      technologies: ['React', 'Next.js', 'Shopify', 'SEO', 'Digital Marketing'],
      achievements: [
        'Developing comprehensive digital marketing strategies',
        'Creating custom web development solutions',
        'Building e-commerce platforms for small and medium businesses',
        'Providing SEO, PPC, and social media management services'
      ],
      order: 3
    }
  ];

  try {
    // Clear existing experiences
    await Experience.deleteMany({});
    console.log('Cleared existing experiences');

    // Insert new experiences
    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`Created ${createdExperiences.length} experiences`);
  } catch (error) {
    console.error('Error setting up experiences:', error);
  }
}

async function main() {
  await connectToDatabase();
  
  console.log('Setting up skills...');
  await setupSkills();
  
  console.log('Setting up experiences...');
  await setupExperiences();
  
  console.log('Setup completed successfully!');
  process.exit(0);
}

main().catch(console.error);
