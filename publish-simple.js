const mongoose = require('mongoose');

async function publishWebsite() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/micropage');
    console.log('✅ Connected to MongoDB');

    // Define Website schema
    const websiteSchema = new mongoose.Schema({
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      data: Object,
      isPublished: Boolean,
      publishedUrl: String,
      createdAt: Date,
      updatedAt: Date
    });

    const Website = mongoose.model('Website', websiteSchema);

    // Find and publish the website
    const result = await Website.updateOne(
      { 'data.subdomain': 'dramrit' },
      { 
        $set: { 
          isPublished: true,
          publishedUrl: 'https://dramrit.jirocash.com',
          updatedAt: new Date()
        }
      }
    );

    console.log('📊 Update result:', result);

    if (result.modifiedCount > 0) {
      console.log('✅ Website published successfully!');
    } else {
      console.log('❌ No website found or already published');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

publishWebsite();
