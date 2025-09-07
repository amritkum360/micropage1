// Test script to verify subdomain API
const fetch = require('node-fetch');

async function testSubdomainAPI() {
  try {
    console.log('🧪 Testing subdomain API...');
    
    // Test the subdomain API endpoint
    const response = await fetch('http://localhost:3001/api/websites/subdomain/dramrit');
    
    console.log('📊 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response:', {
        name: data.name,
        subdomain: data.data?.subdomain,
        isPublished: data.isPublished,
        hasData: !!data.data
      });
    } else {
      const error = await response.text();
      console.log('❌ API Error:', error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSubdomainAPI();
