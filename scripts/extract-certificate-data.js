const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

// Function to extract data from PDF
async function extractPDFData(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    // Extract key information from the text
    const text = data.text;
    
    // Common patterns to extract
    const patterns = {
      name: /(?:This is to certify that|Certificate awarded to|Name:)\s*([A-Za-z\s]+?)(?:\n|$)/i,
      qualification: /(?:Certificate|Diploma|Advanced Diploma|Certificate IV|Certificate III)\s+(?:in\s+)?([A-Za-z\s&,]+?)(?:\n|$)/i,
      issuer: /(?:Issued by|Awarded by|Institution:)\s*([A-Za-z\s&,]+?)(?:\n|$)/i,
      date: /(?:Date of Issue|Issued|Awarded|Date:)\s*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{2,4}|[A-Za-z]+\s+[0-9]{1,2},?\s+[0-9]{4})/i,
      certificateNumber: /(?:Certificate Number|Cert No|Number:)\s*([A-Za-z0-9\-\/]+)/i,
      providerNumber: /(?:Provider Number|RTO Number)\s*([0-9]+)/i
    };
    
    const extracted = {};
    
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match) {
        extracted[key] = match[1].trim();
      }
    }
    
    return {
      text: text,
      extracted: extracted,
      pageCount: data.numpages
    };
  } catch (error) {
    console.error(`Error reading PDF ${pdfPath}:`, error.message);
    return null;
  }
}

// Function to process all PDFs
async function processAllPDFs() {
  const pdfDirs = [
    'public/pdf certs/Certificates Copy 2/Kauser Ahmed Methel',
    'public/pdf certs/Certificates Copy 2/CPE Kauser A M'
  ];
  
  const results = [];
  
  for (const dir of pdfDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
      
      for (const pdfFile of pdfFiles) {
        const pdfPath = path.join(dir, pdfFile);
        console.log(`Processing: ${pdfFile}`);
        
        const data = await extractPDFData(pdfPath);
        if (data) {
          results.push({
            filename: pdfFile,
            path: pdfPath,
            data: data
          });
        }
      }
    }
  }
  
  return results;
}

// Function to map extracted data to certificate information
function mapToCertificateData(pdfResults) {
  const certificates = [];
  
  for (const result of pdfResults) {
    const { filename, data } = result;
    const { extracted, text } = data;
    
    // Determine category based on qualification
    let category = 'Other';
    if (text.toLowerCase().includes('information technology') || text.toLowerCase().includes('it')) {
      category = 'IT Security';
    } else if (text.toLowerCase().includes('business') || text.toLowerCase().includes('management')) {
      category = 'Business';
    } else if (text.toLowerCase().includes('education') || text.toLowerCase().includes('training') || text.toLowerCase().includes('teaching')) {
      category = 'Education';
    } else if (text.toLowerCase().includes('hospitality') || text.toLowerCase().includes('cookery') || text.toLowerCase().includes('kitchen')) {
      category = 'Business';
    } else if (text.toLowerCase().includes('automotive') || text.toLowerCase().includes('vehicle') || text.toLowerCase().includes('mechanical')) {
      category = 'Technology';
    } else if (text.toLowerCase().includes('real estate')) {
      category = 'Business';
    } else if (text.toLowerCase().includes('disability') || text.toLowerCase().includes('ageing') || text.toLowerCase().includes('support')) {
      category = 'Education';
    }
    
    // Extract skills based on qualification
    const skills = [];
    if (text.toLowerCase().includes('training and assessment')) {
      skills.push('Training Delivery', 'Assessment', 'Curriculum Development', 'Educational Leadership');
    } else if (text.toLowerCase().includes('information technology')) {
      skills.push('Information Technology', 'IT Management', 'Technical Support', 'Systems Administration');
    } else if (text.toLowerCase().includes('business')) {
      skills.push('Business Management', 'Strategic Planning', 'Leadership', 'Operations');
    } else if (text.toLowerCase().includes('hospitality')) {
      skills.push('Hospitality Management', 'Customer Service', 'Operations', 'Leadership');
    } else if (text.toLowerCase().includes('cookery')) {
      skills.push('Commercial Cooking', 'Kitchen Management', 'Food Safety', 'Menu Planning');
    } else if (text.toLowerCase().includes('automotive')) {
      skills.push('Automotive Repair', 'Diagnostics', 'Mechanical Systems', 'Vehicle Maintenance');
    } else if (text.toLowerCase().includes('real estate')) {
      skills.push('Real Estate', 'Property Management', 'Sales', 'Legal Compliance');
    } else if (text.toLowerCase().includes('disability') || text.toLowerCase().includes('ageing')) {
      skills.push('Support Services', 'Person-Centered Care', 'Community Services', 'Health Care');
    }
    
    // Find corresponding image file
    const imageName = filename.replace('.pdf', '').replace('.PDF', '');
    const imageFiles = fs.readdirSync('public/certificates/');
    const matchingImage = imageFiles.find(img => 
      img.includes(imageName) && img.includes('Page_1_Image_0001')
    );
    
    const certificate = {
      name: extracted.qualification || filename.replace('.pdf', '').replace('.PDF', ''),
      description: `Professional qualification in ${extracted.qualification || 'specialized field'}, demonstrating expertise and competency in the relevant area.`,
      issuer: extracted.issuer || 'Professional Institution',
      issueDate: extracted.date || '2020-01-01',
      certificateNumber: extracted.certificateNumber || '',
      providerNumber: extracted.providerNumber || '',
      image: matchingImage ? `/certificates/${matchingImage}` : '',
      pdfUrl: `/pdf certs/Certificates Copy 2/${result.path.includes('CPE Kauser A M') ? 'CPE Kauser A M' : 'Kauser Ahmed Methel'}/${filename}`,
      skills: skills,
      category: category,
      isActive: true,
      displayOrder: certificates.length + 1
    };
    
    certificates.push(certificate);
  }
  
  return certificates;
}

// Main execution
async function main() {
  console.log('Extracting data from PDFs...');
  const pdfResults = await processAllPDFs();
  
  console.log('\nExtracted data:');
  pdfResults.forEach(result => {
    console.log(`\n--- ${result.filename} ---`);
    console.log('Extracted:', result.data.extracted);
  });
  
  console.log('\nMapping to certificate data...');
  const certificates = mapToCertificateData(pdfResults);
  
  console.log('\nCertificate data:');
  certificates.forEach(cert => {
    console.log(`\n--- ${cert.name} ---`);
    console.log('Issuer:', cert.issuer);
    console.log('Date:', cert.issueDate);
    console.log('Category:', cert.category);
    console.log('Skills:', cert.skills);
    console.log('Image:', cert.image);
    console.log('PDF:', cert.pdfUrl);
  });
  
  // Save to file for review
  fs.writeFileSync('extracted-certificates.json', JSON.stringify(certificates, null, 2));
  console.log('\nData saved to extracted-certificates.json');
}

main().catch(console.error);
