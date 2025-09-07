'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UniversalTemplate from '@/components/templates/UniversalTemplate';

export default function SubdomainPage() {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subdomain, setSubdomain] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSubdomainData = async () => {
      try {
        setLoading(true);
        
        // Get the current hostname
        const hostname = window.location.hostname;
        console.log('🌐 Current hostname:', hostname);
        
        // Extract subdomain from hostname or URL path
        let detectedSubdomain = '';
        
        // First check if subdomain is in URL path (for testing)
        const urlPath = window.location.pathname;
        if (urlPath.startsWith('/subdomain/')) {
          detectedSubdomain = urlPath.split('/')[2];
          console.log('🌐 Subdomain from URL path:', detectedSubdomain);
        } else if (hostname.includes('localhost')) {
          // For localhost: subdomain.localhost:3000
          const parts = hostname.split('.');
          if (parts.length >= 2 && parts[0] !== 'localhost') {
            detectedSubdomain = parts[0];
          }
        } else if (hostname.includes('jirocash.com')) {
          // For production: subdomain.jirocash.com
          const parts = hostname.split('.');
          if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'jirocash') {
            detectedSubdomain = parts[0];
          }
        }
        
        console.log('🌐 Detected subdomain:', detectedSubdomain);
        setSubdomain(detectedSubdomain);
        
        if (!detectedSubdomain) {
          setError('No subdomain detected');
          return;
        }
        
        // Check if this is a custom domain (not jirocash.com)
        if (!hostname.includes('jirocash.com') && !hostname.includes('localhost')) {
          console.log('🌐 Custom domain detected:', hostname);
          setError('Custom domain not configured yet');
          return;
        }
        
        // Fetch website data by subdomain
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        console.log('🔍 Fetching domain data for subdomain:', detectedSubdomain);
        
        const domainResponse = await fetch(`${backendUrl}/api/domains/subdomain/${detectedSubdomain}`);
        
        if (!domainResponse.ok) {
          if (domainResponse.status === 404) {
            setError('Subdomain not found');
          } else {
            setError('Failed to fetch domain data');
          }
          return;
        }
        
        const domainData = await domainResponse.json();
        console.log('🌐 Domain data:', domainData);
        
        if (!domainData.websiteId) {
          setError('No website associated with this subdomain');
          return;
        }
        
        // Get the published website data
        console.log('🔍 Fetching website data for ID:', domainData.websiteId);
        const websiteResponse = await fetch(`${backendUrl}/api/websites/published/${domainData.websiteId}`);
        
        if (!websiteResponse.ok) {
          setError('Failed to fetch website data');
          return;
        }
        
        const websiteData = await websiteResponse.json();
        console.log('🌐 Website data:', websiteData);
        
        if (websiteData.success && websiteData.website) {
          // Redirect to published page instead of showing the website here
          console.log('🔄 Redirecting to published page:', `/published/${domainData.websiteId}`);
          window.location.href = `/published/${domainData.websiteId}`;
          return;
        } else {
          setError('Website not found or not published');
        }
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load website');
      } finally {
        setLoading(false);
      }
    };

    fetchSubdomainData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 font-medium">Loading website...</p>
          <p className="mt-2 text-sm text-gray-500">Fetching data for {subdomain || 'subdomain'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Website Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-2">Debug Information:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'Unknown'}</p>
              <p><strong>Subdomain:</strong> {subdomain || 'None detected'}</p>
              <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Unknown'}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Website Data</h1>
          <p className="text-gray-600 mb-6">
            No website found for subdomain: <strong>{subdomain}</strong>
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Debug info - remove in production */}
      <div className="fixed top-0 left-0 bg-black text-white p-2 text-xs z-50 rounded-br-lg">
        <div>Subdomain: {subdomain}</div>
        <div>Website ID: {siteData._id}</div>
        <div>Hostname: {typeof window !== 'undefined' ? window.location.hostname : 'Unknown'}</div>
      </div>
      
      <UniversalTemplate 
        data={siteData.data} 
        sectionOrder={siteData.data?.sectionOrder}
      />
    </div>
  );
}