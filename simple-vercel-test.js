/**
 * Simple Vercel test
 */

console.log('🧪 Simple Vercel Test...\n');

try {
  // Set environment variables
  process.env.VERCEL_API_TOKEN = 'YdibGoolFjxmtEAvQtERbjGS';
  process.env.VERCEL_PROJECT_ID = 'prj_hJubliY3ZTaF4ubAGsP6GtBJ1f9s';
  
  console.log('Environment variables set');
  console.log('Token:', process.env.VERCEL_API_TOKEN ? 'Set' : 'Not set');
  console.log('Project ID:', process.env.VERCEL_PROJECT_ID ? 'Set' : 'Not set');
  
  // Import service
  const vercelService = require('./src/services/vercelService');
  console.log('✅ Vercel service imported');
  
  // Test configuration
  const config = vercelService.getConfigStatus();
  console.log('Configuration:', config);
  
  if (config.isConfigured) {
    console.log('✅ Vercel is configured and ready!');
    console.log('\n🎯 Now you can:');
    console.log('1. Start backend server with environment variables');
    console.log('2. Add custom domains through frontend');
    console.log('3. Domains will be automatically added to Vercel');
  } else {
    console.log('❌ Vercel not configured');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
