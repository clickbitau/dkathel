const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Collections in database:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:');
    console.error(error);
    process.exit(1);
  } finally {
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
  }
}

testConnection();
