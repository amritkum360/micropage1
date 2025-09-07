'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestSubdomainPage() {
  const [subdomain, setSubdomain] = useState('dramrit');

  const testSubdomain = () => {
    if (typeof window !== 'undefined') {
      // For localhost testing
      if (window.location.hostname === 'localhost') {
        window.open(`http://${subdomain}.localhost:3000`, '_blank');
      } else {
        // For production
        window.open(`https://${subdomain}.jirocash.com`, '_blank');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Multi-Tenant System Test
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Test Subdomain Access
              </h2>
              
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  placeholder="Enter subdomain"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={testSubdomain}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Test Subdomain
                </button>
              </div>
              
              <p className="text-gray-600 text-sm">
                This will open: <strong>{subdomain}.jirocash.com</strong>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Available Test Subdomains
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Dr. Amrit Kumar</h3>
                  <p className="text-gray-600 text-sm mb-3">Medical professional website</p>
                  <button
                    onClick={() => {
                      setSubdomain('dramrit');
                      testSubdomain();
                    }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    dramrit.jirocash.com →
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Test Website</h3>
                  <p className="text-gray-600 text-sm mb-3">Generic test website</p>
                  <button
                    onClick={() => {
                      setSubdomain('test');
                      testSubdomain();
                    }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    test.jirocash.com →
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Fallback URLs
              </h2>
              
              <div className="space-y-2">
                <div>
                  <Link
                    href="/published/68bd6a711bb60d77afad7c97"
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    /published/68bd6a711bb60d77afad7c97 →
                  </Link>
                  <p className="text-gray-600 text-xs">Direct access to Dr. Amrits website</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                System Status
              </h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-green-800 font-medium">Multi-Tenant System Active</p>
                    <p className="text-green-600 text-sm">
                      Subdomain routing and fallback URLs are working
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
