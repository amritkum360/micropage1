/**
 * Check backend environment variables
 */

// Simulate backend environment
process.env.VERCEL_API_TOKEN = 'YdibGoolFjxmtEAvQtERbjGS';
process.env.VERCEL_PROJECT_ID = 'prj_hJubliY3ZTaF4ubAGsP6GtBJ1f9s';

console.log('🔍 Checking Backend Environment Variables...\n');

console.log('VERCEL_API_TOKEN:', process.env.VERCEL_API_TOKEN ? '✅ Set' : '❌ Not set');
console.log('VERCEL_PROJECT_ID:', process.env.VERCEL_PROJECT_ID ? '✅ Set' : '❌ Not set');

if (process.env.VERCEL_API_TOKEN && process.env.VERCEL_PROJECT_ID) {
  console.log('\n✅ Environment variables are set');
  
  // Test Vercel service
  try {
    const vercelService = require('./src/services/vercelService');
    const config = vercelService.getConfigStatus();
    console.log('\n📊 Vercel Service Config:', config);
    
    if (config.isConfigured) {
      console.log('\n🎯 Vercel integration is ready!');
      console.log('\n📋 To test:');
      console.log('1. Start backend server with these environment variables');
      console.log('2. Add custom domain through frontend');
      console.log('3. Check backend logs for Vercel integration messages');
    }
  } catch (error) {
    console.error('❌ Vercel service error:', error.message);
  }
} else {
  console.log('\n❌ Environment variables not set');
}
