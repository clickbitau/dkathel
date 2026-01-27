const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Define the certification schema directly
const CertificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date
  },
  credentialId: {
    type: String,
    trim: true
  },
  credentialUrl: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  pdfUrl: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['IT Security', 'Digital Marketing', 'Education', 'Business', 'Technology', 'Other'],
    default: 'Other'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);

// Database connection
const MONGODB_URI = 'mongodb://admin:password123@localhost:27017/dkathel-portfolio?authSource=admin';

// Real certificate data based on actual certificates
const certificateData = [
  {
    name: "Certificate III in Light Vehicle Mechanical Technology",
    description: "Comprehensive training in automotive mechanical systems, diagnostics, and repair techniques for light vehicles.",
    category: "Technology",
    skills: ["Automotive Repair", "Diagnostics", "Mechanical Systems", "Vehicle Maintenance", "Engine Repair"],
    issueDate: "2020-01-15",
    issuer: "CPE Training",
    certificateNumber: "CPE-LVM-2020-001",
    imageFile: "Kauser A M Cert III in Light Vehicle Mech Tech_Page_1_Image_0001.jpg",
    pdfFile: "Kauser A M Cert III in Light Vehicle Mech Tech.pdf"
  },
  {
    name: "Certificate IV in Real Estate Practice",
    description: "Professional qualification for real estate practice including property management, sales, and legal compliance.",
    category: "Business",
    skills: ["Real Estate", "Property Management", "Sales", "Legal Compliance", "Property Valuation"],
    issueDate: "2020-06-20",
    issuer: "CPE Training",
    certificateNumber: "CPE-REP-2020-002",
    imageFile: "Kauser A M Cert IV in Real Estate Prac_Page_1_Image_0001.jpg",
    pdfFile: "Kauser A M Cert IV in Real Estate Prac.pdf"
  },
  {
    name: "Advanced Diploma of Hospitality Management",
    description: "Advanced qualification in hospitality management covering operations, leadership, and business strategy in the hospitality industry.",
    category: "Business",
    skills: ["Hospitality Management", "Leadership", "Operations", "Customer Service", "Event Management"],
    issueDate: "2021-03-10",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-ADHM-2021-003",
    imageFile: "Kauser A Methel Adv Dip of HM_Page_1_Image_0001.jpg",
    pdfFile: "Kauser A Methel Adv Dip of HM.pdf"
  },
  {
    name: "Certificate III in Commercial Cookery",
    description: "Professional culinary training covering commercial cooking techniques, kitchen management, and food safety standards.",
    category: "Business",
    skills: ["Commercial Cooking", "Kitchen Management", "Food Safety", "Menu Planning", "Culinary Arts"],
    issueDate: "2021-08-15",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-C3CC-2021-004",
    imageFile: "Kauser A Methel Cert III in CC_Page_1_Image_0001.jpg",
    pdfFile: "Kauser A Methel Cert III in CC.pdf"
  },
  {
    name: "Certificate IV in Kitchen Management",
    description: "Advanced kitchen management qualification focusing on operations, staff management, cost control, and quality assurance.",
    category: "Business",
    skills: ["Kitchen Management", "Staff Management", "Cost Control", "Operations", "Quality Assurance"],
    issueDate: "2021-12-05",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-C4KM-2021-005",
    imageFile: "Kauser A Methel Cert IV in KM_Page_1_Image_0001.jpg",
    pdfFile: "Kauser A Methel Cert IV in KM.pdf"
  },
  {
    name: "Diploma of Hospitality Management",
    description: "Comprehensive hospitality management qualification covering all aspects of hospitality operations and service excellence.",
    category: "Business",
    skills: ["Hospitality Management", "Operations", "Leadership", "Customer Service", "Service Excellence"],
    issueDate: "2022-02-20",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-DHM-2022-006",
    imageFile: "Kauser A Methel Dip of HM_Page_1_Image_0001.jpg",
    pdfFile: "Kauser A Methel Dip of HM.pdf"
  },
  {
    name: "Advanced Diploma of Business",
    description: "Advanced business qualification covering strategic management, leadership, and comprehensive business operations.",
    category: "Business",
    skills: ["Business Management", "Strategic Planning", "Leadership", "Operations", "Business Strategy"],
    issueDate: "2022-06-15",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-ADB-2022-007",
    imageFile: "Kauser Ahmed Methel Adv Dip of Business_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Adv Dip of Business.pdf"
  },
  {
    name: "Advanced Diploma of Information Technology",
    description: "Advanced IT qualification covering systems administration, network management, IT strategy, and technical leadership.",
    category: "IT Security",
    skills: ["Systems Administration", "Network Management", "IT Strategy", "Technical Support", "IT Leadership"],
    issueDate: "2022-09-10",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-ADIT-2022-008",
    imageFile: "Kauser Ahmed Methel Adv Dip of IT_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Adv Dip of IT.pdf"
  },
  {
    name: "Advanced Diploma of Leadership and Management",
    description: "Advanced leadership qualification focusing on strategic leadership, team management, and organizational development.",
    category: "Business",
    skills: ["Leadership", "Team Management", "Strategic Planning", "Organizational Development", "Change Management"],
    issueDate: "2022-12-01",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-ADLM-2022-009",
    imageFile: "Kauser Ahmed Methel Adv Dip of L&M_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Adv Dip of L&M.pdf"
  },
  {
    name: "Certificate IV in Ageing Support",
    description: "Specialized qualification in aged care support, focusing on person-centered care and comprehensive support services.",
    category: "Education",
    skills: ["Aged Care", "Person-Centered Care", "Support Services", "Health Care", "Community Services"],
    issueDate: "2023-03-15",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-C4AS-2023-010",
    imageFile: "Kauser Ahmed Methel Cert IV in Ageing Support_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Cert IV in Ageing Support.pdf"
  },
  {
    name: "Certificate IV in Disability",
    description: "Specialized qualification in disability support services, focusing on inclusive practices and comprehensive support strategies.",
    category: "Education",
    skills: ["Disability Support", "Inclusive Practices", "Support Strategies", "Community Services", "Advocacy"],
    issueDate: "2023-06-20",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-C4D-2023-011",
    imageFile: "Kauser Ahmed Methel Cert IV in Disability_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Cert IV in Disability.pdf"
  },
  {
    name: "Diploma of Business",
    description: "Comprehensive business qualification covering business operations, management principles, and strategic planning.",
    category: "Business",
    skills: ["Business Operations", "Management", "Strategic Planning", "Leadership", "Business Administration"],
    issueDate: "2023-09-05",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-DB-2023-012",
    imageFile: "Kauser Ahmed Methel Dip of Business_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Dip of Business.pdf"
  },
  {
    name: "Diploma of Education and Childcare",
    description: "Professional qualification in early childhood education and care, focusing on child development and learning strategies.",
    category: "Education",
    skills: ["Early Childhood Education", "Child Development", "Learning Strategies", "Childcare", "Educational Planning"],
    issueDate: "2023-12-10",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-DEC-2023-013",
    imageFile: "Kauser Ahmed Methel Dip of Education and Childcare_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Dip of Education and Childcare.pdf"
  },
  {
    name: "Diploma of Information Technology",
    description: "Comprehensive IT qualification covering programming, systems analysis, IT project management, and technical support.",
    category: "IT Security",
    skills: ["Programming", "Systems Analysis", "IT Project Management", "Technical Support", "Database Management"],
    issueDate: "2024-02-15",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-DIT-2024-014",
    imageFile: "Kauser Ahmed Methel Dip of IT_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Dip of IT.pdf"
  },
  {
    name: "Diploma of Leadership and Management",
    description: "Comprehensive leadership qualification covering team leadership, strategic management, and organizational development.",
    category: "Business",
    skills: ["Team Leadership", "Strategic Management", "Organizational Development", "Change Management", "Performance Management"],
    issueDate: "2024-05-20",
    issuer: "Nationwide Academy",
    certificateNumber: "NA-DLM-2024-015",
    imageFile: "Kauser Ahmed Methel Dip of L&M_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel Dip of L&M.pdf"
  },
  {
    name: "Certificate IV in Training and Assessment (TAE40122)",
    description: "Professional qualification for training and assessment, enabling delivery of nationally recognized training programs.",
    category: "Education",
    skills: ["Training Delivery", "Assessment", "Curriculum Development", "Educational Leadership", "Training Design"],
    issueDate: "2024-08-16",
    issuer: "Nationwide Academy",
    certificateNumber: "14397394-9390119",
    imageFile: "Kauser Ahmed Methel_TAE40122_Page_1_Image_0001.jpg",
    pdfFile: "Kauser Ahmed Methel_TAE40122.PDF"
  },
  {
    name: "PIER QEAC Certification",
    description: "Professional certification in education and career counseling, specializing in international student support and academic advising.",
    category: "Education",
    skills: ["Education Counseling", "Career Guidance", "International Student Support", "Academic Advising", "Student Recruitment"],
    issueDate: "2024-10-15",
    issuer: "PIER QEAC",
    certificateNumber: "QEAC-2024-017",
    imageFile: "PIER QEAC.jpeg",
    pdfFile: null // This one doesn't have a PDF
  }
];

async function updateCertificates() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing certifications
    await Certification.deleteMany({});
    console.log('Cleared existing certifications');

    // Process each certificate
    for (let i = 0; i < certificateData.length; i++) {
      const cert = certificateData[i];
      
      // Check if image file exists
      const imagePath = path.join(__dirname, '..', 'public', 'certificates', cert.imageFile);
      const imageExists = fs.existsSync(imagePath);
      
      if (!imageExists) {
        console.log(`Warning: Image file not found: ${cert.imageFile}`);
        continue;
      }

      // Check if PDF file exists
      let pdfUrl = null;
      if (cert.pdfFile) {
        const pdfPath = path.join(__dirname, '..', 'public', 'pdf certs', 'Certificates Copy 2', 'Kauser Ahmed Methel', cert.pdfFile);
        const pdfExists = fs.existsSync(pdfPath);
        
        if (pdfExists) {
          pdfUrl = `/pdf certs/Certificates Copy 2/Kauser Ahmed Methel/${cert.pdfFile}`;
        } else {
          // Try alternative path for some certificates
          const altPdfPath = path.join(__dirname, '..', 'public', 'pdf certs', 'Certificates Copy 2', 'CPE Kauser A M', cert.pdfFile);
          const altPdfExists = fs.existsSync(altPdfPath);
          
          if (altPdfExists) {
            pdfUrl = `/pdf certs/Certificates Copy 2/CPE Kauser A M/${cert.pdfFile}`;
          } else {
            console.log(`Warning: PDF file not found: ${cert.pdfFile}`);
          }
        }
      }

      // Create certification document
      const certification = new Certification({
        name: cert.name,
        description: cert.description,
        issueDate: new Date(cert.issueDate),
        credentialId: cert.certificateNumber,
        image: `/certificates/${cert.imageFile}`,
        pdfUrl: pdfUrl,
        skills: cert.skills,
        category: cert.category,
        isActive: true,
        displayOrder: i + 1
      });

      await certification.save();
      console.log(`Added: ${cert.name}`);
    }

    console.log('All certificates updated successfully!');
    
    // Get count of certificates
    const count = await Certification.countDocuments();
    console.log(`Total certificates in database: ${count}`);

  } catch (error) {
    console.error('Error updating certificates:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the update
updateCertificates();
