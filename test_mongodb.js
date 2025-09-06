const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/micropage';

async function testMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Check websites collection
    const Website = mongoose.model('Website', new mongoose.Schema({
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      data: Object,
      isPublished: Boolean,
      publishedUrl: String,
      createdAt: Date,
      updatedAt: Date
    }));
    
    const websites = await Website.find({});
    console.log('📊 Total websites in database:', websites.length);
    
    if (websites.length > 0) {
      console.log('📋 Recent websites:');
      websites.slice(-5).forEach((website, index) => {
        console.log(`${index + 1}. ${website.name} (ID: ${website._id})`);
        console.log(`   User ID: ${website.userId}`);
        console.log(`   Created: ${website.createdAt}`);
        console.log(`   Published: ${website.isPublished}`);
        console.log('---');
      });
    }
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
    
  } catch (error) {
    console.error('❌ MongoDB error:', error);
  }
}

testMongoDB();
