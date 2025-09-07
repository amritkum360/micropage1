'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UniversalTemplate from '@/components/templates/UniversalTemplate';

export default function CatchAllPage() {
  const params = useParams();
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get the current hostname
        const hostname = window.location.hostname;
        console.log('🌐 Current hostname:', hostname);
        
        // Check if this is a custom domain (not jirocash.com)
        if (!hostname.includes('jirocash.com') && !hostname.includes('localhost')) {
          console.log('🌐 Custom domain detected:', hostname);
          
          // Try to get site by domain - we'll implement this later
          // For now, just show error
          setError('Custom domain not configured yet');
          return;
        }
        
        // If not a custom domain, check if it's a subdomain
        let subdomain = hostname.split('.')[0];
        
        // If we're on localhost and no subdomain detected, try to get it from URL path
        if (hostname === 'localhost' && params.subdomain) {
          subdomain = params.subdomain;
          console.log('🌐 Subdomain from URL path:', subdomain);
        }
        
        if (subdomain && subdomain !== 'www' && subdomain !== 'jirocash' && subdomain !== 'localhost') {
          console.log('🌐 Subdomain detected:', subdomain);
          
          // Try to get website data by subdomain
          try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(`${backendUrl}/api/domains/subdomain/${subdomain}`);
            
            if (response.ok) {
              const domainData = await response.json();
              console.log('🌐 Domain data:', domainData);
              
              if (domainData.websiteId) {
                // Get the published website data
                const websiteResponse = await fetch(`${backendUrl}/api/websites/published/${domainData.websiteId}`);
                if (websiteResponse.ok) {
                  const websiteData = await websiteResponse.json();
                  console.log('🌐 Website data:', websiteData);
                  
                  if (websiteData.success && websiteData.website) {
                    setSiteData(websiteData.website);
                    return;
                  }
                }
              }
            }
          } catch (apiError) {
            console.error('API Error:', apiError);
          }
        }
        
        setError('Website not found');
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load website');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Website Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Hostname: {typeof window !== 'undefined' ? window.location.hostname : 'Unknown'}
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              Subdomain: {typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Website Not Found</h1>
          <p className="text-gray-600">
            No website found for this domain
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Debug info - remove in production */}
      <div className="fixed top-0 left-0 bg-black text-white p-2 text-xs z-50">
        Hostname: {typeof window !== 'undefined' ? window.location.hostname : 'Unknown'} | 
        Website ID: {siteData._id}
      </div>
      
      <UniversalTemplate 
        data={siteData.data} 
        sectionOrder={siteData.data?.sectionOrder}
      />
    </div>
  );
}
