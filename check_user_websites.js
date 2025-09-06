const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/micropage';

async function checkUserWebsites() {
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
    
    // Check specific user's websites
    const userId = '68ba57bf952ad0f1b3343dfc'; // From terminal logs
    const websites = await Website.find({ userId: new mongoose.Types.ObjectId(userId) });
    
    console.log(`📊 Websites for user ${userId}:`, websites.length);
    
    if (websites.length > 0) {
      console.log('📋 User websites:');
      websites.forEach((website, index) => {
        console.log(`${index + 1}. ${website.name} (ID: ${website._id})`);
        console.log(`   Created: ${website.createdAt}`);
        console.log(`   Published: ${website.isPublished}`);
        console.log('---');
      });
    }
    
    // Check all websites
    const allWebsites = await Website.find({});
    console.log(`📊 Total websites in database:`, allWebsites.length);
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
    
  } catch (error) {
    console.error('❌ MongoDB error:', error);
  }
}

checkUserWebsites();
