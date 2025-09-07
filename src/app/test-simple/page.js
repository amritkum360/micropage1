'use client';

import { useEffect, useState } from 'react';

export default function TestSimple() {
  const [result, setResult] = useState('Testing...');

  useEffect(() => {
    const testDirect = async () => {
      try {
        // Direct test of the API
        const response = await fetch('/api/subdomain-redirect?host=amritkumar12.localhost:3000');
        
        if (response.redirected) {
          setResult(`✅ Redirect working! Redirected to: ${response.url}`);
        } else {
          const data = await response.json();
          setResult(`❌ No redirect: ${JSON.stringify(data)}`);
        }
      } catch (error) {
        setResult(`❌ Error: ${error.message}`);
      }
    };

    testDirect();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4">Simple Test</h1>
        <p className="text-gray-700">{result}</p>
        
        <div className="mt-6 space-y-2">
          <a 
            href="/api/subdomain-redirect?host=amritkumar12.localhost:3000" 
            className="block bg-blue-500 text-white p-2 rounded text-center"
            target="_blank"
          >
            Test Direct API
          </a>
          
          <a 
            href="http://amritkumar12.localhost:3000" 
            className="block bg-green-500 text-white p-2 rounded text-center"
            target="_blank"
          >
            Test Subdomain (if hosts file configured)
          </a>
        </div>
      </div>
    </div>
  );
}
