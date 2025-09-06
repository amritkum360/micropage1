'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UniversalTemplate from '@/components/templates/UniversalTemplate';
import { use } from 'react';
import Link from 'next/link';

export default function PublishedWebsitePage({ params }) {
  const { getPublishedWebsite } = useAuth();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unwrap params for Next.js 15 compatibility
  const unwrappedParams = use(params);
  const websiteId = unwrappedParams.id;

  useEffect(() => {
    loadPublishedWebsite();
  }, [websiteId]);

  const loadPublishedWebsite = async () => {
    try {
      const websiteData = await getPublishedWebsite(websiteId);
      console.log('Loaded website data:', websiteData);
      console.log('Section order in published website:', websiteData.data?.sectionOrder);
      setWebsite(websiteData);
    } catch (error) {
      console.error('Failed to load published website:', error);
      setError('Website not found or not published');
    } finally {
      setLoading(false);
    }
  };

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
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Go Home
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
