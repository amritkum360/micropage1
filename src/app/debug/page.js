'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const info = {
      hostname: window.location.hostname,
      href: window.location.href,
      pathname: window.location.pathname,
      search: window.location.search,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    
    setDebugInfo(info);
    console.log('🔍 Debug Info:', info);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🐛 Debug Information</h1>
      
      <h2>Current URL Info:</h2>
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      
      <h2>Test Links:</h2>
      <ul>
        <li><a href="http://localhost:3000">Main Site</a></li>
        <li><a href="http://amritkumars.localhost:3000">Subdomain Test</a></li>
        <li><a href="http://localhost:3000/debug">This Debug Page</a></li>
      </ul>
      
      <h2>API Tests:</h2>
      <button onClick={async () => {
        try {
          const response = await fetch('http://localhost:5000/api/subdomain/amritkumars');
          const data = await response.json();
          console.log('API Response:', data);
          alert('Check console for API response');
        } catch (error) {
          console.error('API Error:', error);
          alert('API Error: ' + error.message);
        }
      }}>
        Test Backend API
      </button>
    </div>
  );
}
