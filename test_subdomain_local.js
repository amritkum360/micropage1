const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Domain = require('./backend/models/Domain');
const Website = require('./backend/models/Website');
const User = require('./backend/models/User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/micropage');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test subdomain functionality
const testSubdomain = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Testing subdomain functionality...');
    
    // Find the domain we know exists
    const domain = await Domain.findOne({ subdomain: 'amritkumar12' });
    
    if (!domain) {
      console.log('❌ Domain not found for amritkumar12');
      return;
    }
    
    console.log('✅ Found domain:', {
      subdomain: domain.subdomain,
      websiteId: domain.websiteId,
      name: domain.name,
      isPublished: domain.isPublished
    });
    
    // Test website lookup
    const website = await Website.findOne({
      _id: domain.websiteId,
      isPublished: true
    });
    
    if (!website) {
      console.log('❌ Website not found or not published');
      return;
    }
    
    console.log('✅ Found website:', {
      id: website._id,
      name: website.name,
      isPublished: website.isPublished,
      hasData: !!website.data
    });
    
    console.log('\n🎉 Subdomain test PASSED!');
    console.log('📋 Test URLs:');
    console.log(`   Local: http://amritkumar12.localhost:3000`);
    console.log(`   Production: https://amritkumar12.jirocash.com`);
    
    console.log('\n📝 To test locally:');
    console.log('1. Add this line to your hosts file:');
    console.log('   127.0.0.1 amritkumar12.localhost');
    console.log('2. Visit: http://amritkumar12.localhost:3000');
    
  } catch (error) {
    console.error('❌ Test error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the test
testSubdomain();
