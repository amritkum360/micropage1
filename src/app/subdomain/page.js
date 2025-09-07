'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import UniversalTemplate from '@/components/templates/UniversalTemplate';
import Link from 'next/link';

function SubdomainContent() {
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  // API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const loadSubdomainWebsite = useCallback(async () => {
    try {
      console.log('🌐 Loading subdomain website...');
      
      // Get subdomain from URL params (set by middleware)
      const subdomain = searchParams.get('subdomain');
      
      if (!subdomain) {
        throw new Error('No subdomain provided');
      }
      
      console.log('🔍 Detected subdomain:', subdomain);
      
      // Skip if it's the main domain
      if (subdomain === 'www' || subdomain === 'api' || subdomain === 'localhost' || subdomain === '127' || subdomain === '0') {
        throw new Error('Main domain access');
      }
      
      // Fetch website data from API
      const response = await fetch(`${API_BASE_URL}/subdomain/${subdomain}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Website not found');
      }
      
      const data = await response.json();
      console.log('✅ Loaded subdomain website data:', data);
      
      setWebsite(data);
    } catch (error) {
      console.error('❌ Failed to load subdomain website:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchParams, API_BASE_URL]);

  useEffect(() => {
    loadSubdomainWebsite();
  }, [loadSubdomainWebsite]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Website Not Found</h3>
          <p className="text-gray-600">{error}</p>
          <div className="mt-6">
            <Link
              href="https://jirocash.com"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Go to Main Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!website || !website.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Content</h3>
          <p className="text-gray-600">This website has no content to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <UniversalTemplate 
        data={website.data} 
        sectionOrder={website.data?.sectionOrder}
      />
    </div>
  );
}

export default function SubdomainPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    }>
      <SubdomainContent />
    </Suspense>
  );
}
