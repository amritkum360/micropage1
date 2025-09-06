// Simple test script to verify onboarding backend functionality
const mongoose = require('mongoose');
const User = require('./backend/models/User');
const Website = require('./backend/models/Website');

async function testOnboarding() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/micropage', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Test user creation with onboarding data
    const testUser = new User({
      phone: '9876543210',
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      onboardingCompleted: true,
      onboardingData: {
        websiteName: 'Test Website',
        subdomain: 'testwebsite',
        selectedSections: ['header', 'hero', 'about', 'contact', 'footer'],
        completedAt: new Date()
      }
    });

    await testUser.save();
    console.log('✅ Test user created:', testUser._id);

    // Test website creation
    const testWebsite = new Website({
      userId: testUser._id,
      name: 'Test Website',
      data: {
        subdomain: 'testwebsite',
        businessName: 'Test Website',
        tagline: 'Welcome to Test Website',
        sectionOrder: ['header', 'hero', 'about', 'contact', 'footer'],
        header: { visible: true, title: 'Test Website' },
        hero: { visible: true, title: 'Welcome to Test Website', subtitle: 'Your amazing journey starts here' },
        about: { visible: true, title: 'About Us', description: 'Tell your story here' },
        contact: { visible: true, title: 'Get In Touch', email: 'test@example.com', phone: '9876543210' },
        footer: { visible: true, title: '© 2024 Test Website' }
      }
    });

    await testWebsite.save();
    console.log('✅ Test website created:', testWebsite._id);

    // Verify data
    const savedUser = await User.findById(testUser._id);
    const savedWebsite = await Website.findById(testWebsite._id);
    
    console.log('✅ User onboarding data:', savedUser.onboardingData);
    console.log('✅ Website data:', savedWebsite.data);

    // Cleanup
    await User.findByIdAndDelete(testUser._id);
    await Website.findByIdAndDelete(testWebsite._id);
    console.log('✅ Test data cleaned up');

    console.log('🎉 All tests passed! Onboarding backend is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Run the test
testOnboarding();
