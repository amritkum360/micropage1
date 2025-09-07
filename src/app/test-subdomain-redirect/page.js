'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestSubdomainRedirect() {
  const [status, setStatus] = useState('Testing...');
  const [redirectUrl, setRedirectUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const testSubdomainRedirect = async () => {
      try {
        setStatus('Fetching subdomain data...');
        
        // Test the API endpoint
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/api/domains/subdomain/amritkumar12`);
        
        if (response.ok) {
          const domainData = await response.json();
          setStatus('✅ Subdomain data found!');
          setRedirectUrl(`/published/${domainData.websiteId}`);
          
          // Auto-redirect after 2 seconds
          setTimeout(() => {
            router.push(`/published/${domainData.websiteId}`);
          }, 2000);
        } else {
          setStatus('❌ Subdomain not found');
        }
      } catch (error) {
        setStatus(`❌ Error: ${error.message}`);
      }
    };

    testSubdomainRedirect();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Subdomain Redirect Test</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <p className="text-lg mb-4">{status}</p>
          
          {redirectUrl && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Redirecting to:</p>
              <p className="font-mono text-blue-600 bg-blue-50 p-2 rounded">
                {redirectUrl}
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go to Homepage
          </button>
          
          {redirectUrl && (
            <button
              onClick={() => router.push(redirectUrl)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Published Page
            </button>
          )}
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>This simulates what should happen when you visit:</p>
          <p className="font-mono">amritkumar12.localhost:3000</p>
        </div>
      </div>
    </div>
  );
}
