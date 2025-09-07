// Script to update Dr. Amrit's website with custom domain and publish it
const mongoose = require('mongoose');

async function updateWebsite() {
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

    // Update the website
    const result = await Website.updateOne(
      { _id: '68bd6a711bb60d77afad7c97' },
      { 
        $set: { 
          isPublished: true,
          publishedUrl: 'https://dramrit.jirocash.com',
          'data.customDomain': 'hyfreefire.com',
          updatedAt: new Date()
        }
      }
    );

    console.log('📊 Update result:', result);

    if (result.modifiedCount > 0) {
      console.log('✅ Website updated successfully!');
      console.log('🌐 Published URL: https://dramrit.jirocash.com');
      console.log('🌐 Custom Domain: hyfreefire.com');
    } else {
      console.log('❌ No website found or already updated');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

updateWebsite();
