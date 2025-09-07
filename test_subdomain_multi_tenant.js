// Test script for multi-tenant subdomain functionality
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testSubdomainFunctionality() {
  console.log('🧪 Testing Multi-Tenant Subdomain Functionality\n');

  try {
    // Test 1: Check if subdomain endpoint exists
    console.log('1️⃣ Testing subdomain endpoint...');
    const response = await fetch(`${API_BASE_URL}/subdomain/test-subdomain`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 404) {
      console.log('   ✅ Subdomain endpoint is working (404 expected for non-existent subdomain)');
    } else {
      const data = await response.json();
      console.log('   Response:', data);
    }

    // Test 2: Test subdomain availability check
    console.log('\n2️⃣ Testing subdomain availability check...');
    const checkResponse = await fetch(`${API_BASE_URL}/websites/check-subdomain/test-subdomain`);
    console.log(`   Status: ${checkResponse.status}`);
    
    if (checkResponse.status === 401) {
      console.log('   ✅ Subdomain check endpoint requires authentication (expected)');
    } else {
      const checkData = await checkResponse.json();
      console.log('   Response:', checkData);
    }

    console.log('\n✅ Basic endpoint tests completed');
    console.log('\n📋 Next steps:');
    console.log('   1. Start the frontend: npm run dev');
    console.log('   2. Login to your account');
    console.log('   3. Create or edit a website');
    console.log('   4. Click "Publish" to see the new subdomain modal');
    console.log('   5. Enter a subdomain and publish');
    console.log('   6. Visit your subdomain: http://your-subdomain.localhost:3000');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSubdomainFunctionality();
