'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DebugSubdomainPage() {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const info = {
      host: window.location.host,
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      parts: window.location.hostname.split('.'),
      isLocalhost: window.location.hostname.includes('localhost'),
      isProduction: window.location.hostname.includes('jirocash.com'),
    };
    
    setDebugInfo(info);
  }, []);

  const testSubdomainAPI = async () => {
    try {
      const response = await fetch('/api/websites/subdomain/dramrit');
      const data = await response.json();
      console.log('API Response:', data);
      alert(`API Status: ${response.status}\nData: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('API Error:', error);
      alert(`API Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Subdomain Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(debugInfo).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="ml-2 text-gray-900">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Subdomain Analysis</h2>
          <div className="space-y-2">
            <p><strong>Expected subdomain:</strong> dramrit</p>
            <p><strong>Detected subdomain:</strong> {debugInfo.parts?.[0] || 'None'}</p>
            <p><strong>Should show subdomain site:</strong> {
              debugInfo.isProduction ? 
                (debugInfo.parts?.length >= 3 && debugInfo.parts[0] !== 'www' && debugInfo.parts[0] !== 'jirocash') :
                (debugInfo.parts?.length >= 2 && debugInfo.parts[0] !== 'localhost')
            }</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-4">
            <button
              onClick={testSubdomainAPI}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Test Subdomain API
            </button>
            
            <div>
              <Link
                href="/subdomain/dramrit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md inline-block"
              >
                Direct Subdomain Page
              </Link>
            </div>
            
            <div>
              <Link
                href="/"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md inline-block"
              >
                Main Site
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Production Setup Checklist</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>✅ DNS: Add wildcard A record (*.jirocash.com → Your Server IP)</li>
            <li>✅ Backend: Ensure backend server is running on production</li>
            <li>✅ Environment: Set NEXT_PUBLIC_API_URL to production backend URL</li>
            <li>✅ Database: Ensure website is published in production database</li>
            <li>✅ SSL: Ensure HTTPS is working for subdomains</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
