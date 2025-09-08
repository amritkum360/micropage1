console.log('Testing imports...');

try {
  console.log('1. Testing basic require...');
  const path = require('path');
  console.log('✅ Path module imported');

  console.log('2. Testing Vercel service...');
  const vercelService = require('./src/services/vercelService');
  console.log('✅ Vercel service imported');
  console.log('Service type:', typeof vercelService);
  console.log('Service methods:', Object.getOwnPropertyNames(vercelService));

} catch (error) {
  console.error('❌ Import error:', error.message);
  console.error('Stack:', error.stack);
}
