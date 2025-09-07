'use client';

import { useEffect, useState } from 'react';
import UniversalTemplate from '@/components/templates/UniversalTemplate';

export default function TestAmritkumarsPage() {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        console.log('🧪 Testing amritkumars subdomain...');
        
        // Try to get website data by subdomain
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/api/domains/subdomain/amritkumars`);
        
        if (response.ok) {
          const domainData = await response.json();
          console.log('🧪 Domain data:', domainData);
          
          if (domainData.websiteId) {
            // Get the published website data
            const websiteResponse = await fetch(`${backendUrl}/api/websites/published/${domainData.websiteId}`);
            if (websiteResponse.ok) {
              const websiteData = await websiteResponse.json();
              console.log('🧪 Website data:', websiteData);
              
              if (websiteData.success && websiteData.website) {
                setSiteData(websiteData.website);
                return;
              }
            }
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
  }, []);

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
            No website found for amritkumars subdomain
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Debug info */}
      <div className="fixed top-0 left-0 bg-black text-white p-2 text-xs z-50">
        🧪 Test Page | Website ID: {siteData._id} | Name: {siteData.name}
      </div>
      
      <UniversalTemplate 
        data={siteData.data} 
        sectionOrder={siteData.data?.sectionOrder}
      />
    </div>
  );
}
