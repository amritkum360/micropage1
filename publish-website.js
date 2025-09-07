// Script to publish Dr. Amrit's website
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/micropage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Website = mongoose.model('Website', new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  data: Object,
  isPublished: Boolean,
  publishedUrl: String,
  createdAt: Date,
  updatedAt: Date
}));

async function publishWebsite() {
  try {
    console.log('🔍 Looking for Dr. Amrit\'s website...');
    
    // Find the website by subdomain
    const website = await Website.findOne({
      'data.subdomain': 'dramrit'
    });

    if (!website) {
      console.log('❌ Website not found');
      return;
    }

    console.log('📊 Found website:', {
      name: website.name,
      subdomain: website.data.subdomain,
      isPublished: website.isPublished
    });

    // Publish the website
    website.isPublished = true;
    website.publishedUrl = `https://${website.data.subdomain}.jirocash.com`;
    website.updatedAt = new Date();

    await website.save();

    console.log('✅ Website published successfully!');
    console.log('🌐 Published URL:', website.publishedUrl);
    console.log('🔗 Subdomain URL:', `https://${website.data.subdomain}.jirocash.com`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

publishWebsite();
