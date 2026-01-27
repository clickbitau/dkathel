/**
 * Setup script to create the first admin user
 * Run with: node scripts/setup-admin.js
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require('mongoose')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcryptjs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

// Simple User model for this script
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function createAdminUser() {
  try {
    // Connect to database
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required')
    }
    
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email)
      return
    }

    // Create admin user
    const adminData = {
      email: 'admin@dkathel.com',
      name: 'Admin User',
      password: 'admin123', // Change this!
      role: 'admin'
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 12)
    
    const adminUser = new User({
      email: adminData.email,
      passwordHash: hashedPassword,
      name: adminData.name,
      role: adminData.role
    })

    await adminUser.save()
    console.log('✅ Admin user created successfully!')
    console.log('Email:', adminData.email)
    console.log('Password:', adminData.password)
    console.log('⚠️  Please change the password after first login!')

  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

createAdminUser()
