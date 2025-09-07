// Simple test to check if middleware is working
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  headers: {
    'Host': 'amritkumar12.localhost:3000'
  }
};

console.log('🧪 Testing middleware with subdomain...');
console.log('Request headers:', options.headers);

const req = http.request(options, (res) => {
  console.log('📊 Response status:', res.statusCode);
  console.log('📋 Response headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📄 Response length:', data.length);
    if (data.includes('subdomain')) {
      console.log('✅ Middleware is working - subdomain page detected');
    } else if (data.includes('published')) {
      console.log('✅ Redirect working - published page detected');
    } else {
      console.log('❌ Middleware not working - showing home page');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request error:', e.message);
});

req.end();
