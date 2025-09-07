'use client';

import { useState, useEffect, useCallback } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import UniversalTemplate from '@/components/templates/UniversalTemplate';
import Link from 'next/link';

export default function CustomDomainPage({ params }) {
  const router = useRouter();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Unwrap params for Next.js 15 compatibility
  const unwrappedParams = use(params);
  const domain = unwrappedParams.domain;

  console.log('🌐 Custom Domain Page - Domain:', domain);

  const loadWebsiteByDomain = useCallback(async () => {
    try {
      console.log('🔍 Loading website for custom domain:', domain);
      
      // Call API to get website by custom domain
      const response = await fetch(`/api/websites/custom-domain/${encodeURIComponent(domain)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          console.log('❌ Website not found for custom domain:', domain);
          setNotFound(true);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const websiteData = await response.json();
      console.log('✅ Loaded website data:', websiteData);
      
      if (!websiteData || !websiteData.data) {
        console.log('❌ No website data found');
        setNotFound(true);
        return;
      }

      setWebsite(websiteData);
    } catch (error) {
      console.error('❌ Failed to load website by custom domain:', error);
      setError('Failed to load website');
    } finally {
      setLoading(false);
    }
  }, [domain]);

  useEffect(() => {
    if (domain) {
      loadWebsiteByDomain();
    }
  }, [loadWebsiteByDomain, domain]);

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Website</h3>
          <p className="text-gray-600">{error}</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Website Not Found</h3>
          <p className="text-gray-600 mb-4">
            The website for <strong>{domain}</strong> could not be found.
          </p>
          <div className="space-y-3">
            <div>
              <Link
                href="https://jirocash.com"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Go to Main Site
              </Link>
            </div>
            <div>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No content state
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

  // Render the website
  return (
    <div className="min-h-screen">
      <UniversalTemplate 
        data={website.data} 
        sectionOrder={website.data?.sectionOrder}
      />
    </div>
  );
}
