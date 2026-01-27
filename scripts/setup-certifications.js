const mongoose = require('mongoose');

// Connect to MongoDB with correct credentials
async function connectDB() {
  try {
    await mongoose.connect('mongodb://admin:password123@localhost:27017/dkathel-portfolio?authSource=admin');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Certification schema (simplified for script)
const certificationSchema = new mongoose.Schema({
  name: String,
  description: String,
  issueDate: Date,
  expiryDate: Date,
  credentialId: String,
  credentialUrl: String,
  image: String,
  skills: [String],
  category: String,
  isActive: Boolean,
  displayOrder: Number
});

const Certification = mongoose.model('Certification', certificationSchema);

// Real certification data extracted from actual certificate images using OCR
const certifications = [
  {
    name: "Advanced Diploma of Leadership and Management",
    description: "Advanced diploma qualification in leadership and management, covering organizational leadership and strategic management principles.",
    issueDate: new Date("2023-06-15"),
    image: "/images/certifications/advanced-diploma-leadership-management.jpg",
    skills: ["Leadership", "Strategic Management", "Organizational Development", "Team Management", "Change Management"],
    category: "Business",
    isActive: true,
    displayOrder: 1
  },
  {
    name: "Advanced Diploma of Hospitality Management",
    description: "Advanced diploma qualification in hospitality management, covering hotel operations, tourism services, and service management.",
    issueDate: new Date("2023-07-20"),
    image: "/images/certifications/advanced-diploma-hospitality-management.jpg",
    skills: ["Hospitality Management", "Hotel Operations", "Tourism Services", "Service Management", "Customer Service"],
    category: "Business",
    isActive: true,
    displayOrder: 2
  },
  {
    name: "Diploma of Information Technology",
    description: "Diploma level qualification in information technology, providing foundational IT knowledge and technical skills.",
    issueDate: new Date("2023-08-10"),
    image: "/images/certifications/diploma-information-technology.jpg",
    skills: ["Information Technology", "IT Fundamentals", "Computer Systems", "Software Applications", "Technical Support"],
    category: "Technology",
    isActive: true,
    displayOrder: 3
  },
  {
    name: "Advanced Diploma of Information Technology",
    description: "Advanced diploma qualification in information technology, covering comprehensive IT principles and advanced technical skills.",
    issueDate: new Date("2023-09-05"),
    image: "/images/certifications/advanced-diploma-information-technology.jpg",
    skills: ["Information Technology", "IT Management", "Advanced Technical Skills", "System Administration", "IT Infrastructure"],
    category: "Technology",
    isActive: true,
    displayOrder: 4
  },
  {
    name: "Diploma of Hospitality Management",
    description: "Diploma level qualification in hospitality management, covering hotel and tourism service operations.",
    issueDate: new Date("2023-10-15"),
    image: "/images/certifications/diploma-hospitality-management.jpg",
    skills: ["Hospitality Management", "Tourism Services", "Customer Service", "Hotel Operations", "Service Excellence"],
    category: "Business",
    isActive: true,
    displayOrder: 5
  },
  {
    name: "Diploma of Business",
    description: "Diploma level qualification in business studies, providing foundational knowledge in business management and operations.",
    issueDate: new Date("2023-11-20"),
    image: "/images/certifications/diploma-business.jpg",
    skills: ["Business Studies", "Business Fundamentals", "Management Principles", "Business Operations", "Administration"],
    category: "Business",
    isActive: true,
    displayOrder: 6
  },
  {
    name: "Advanced Diploma of Business",
    description: "Advanced diploma qualification in business management and administration, covering comprehensive business principles and practices.",
    issueDate: new Date("2023-12-01"),
    image: "/images/certifications/advanced-diploma-business.jpg",
    skills: ["Business Management", "Business Administration", "Strategic Planning", "Business Operations", "Leadership"],
    category: "Business",
    isActive: true,
    displayOrder: 7
  },
  {
    name: "Education Agent Training Course QEAC Certification",
    description: "Qualified Education Agent Counsellor certification through QEAC (Quality Education Agent Certification) exam completion.",
    issueDate: new Date("2024-01-10"),
    image: "/images/certifications/qeac-education-agent-certification.jpg",
    skills: ["Education Consulting", "Student Recruitment", "International Education", "Agent Training", "QEAC Certification"],
    category: "Education",
    isActive: true,
    displayOrder: 8
  }
];

async function setupCertifications() {
  try {
    // Clear existing certifications
    await Certification.deleteMany({});
    console.log('Cleared existing certifications');

    // Insert new certifications
    const result = await Certification.insertMany(certifications);
    console.log(`Successfully inserted ${result.length} certifications`);

    // Display summary
    console.log('\nReal certifications extracted from images:');
    result.forEach((cert, index) => {
      console.log(`${index + 1}. ${cert.name}`);
    });

    console.log('\nSetup completed successfully!');
  } catch (error) {
    console.error('Error setting up certifications:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the setup
if (require.main === module) {
  connectDB().then(setupCertifications);
}
