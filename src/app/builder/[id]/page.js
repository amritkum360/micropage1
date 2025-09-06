'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import TemplateBuilder from '@/components/templates/TemplateBuilder';
import { use } from 'react';

export default function EditBuilderPage({ params }) {
  const { getWebsite, saveWebsite, updateWebsite, loading: authLoading, token } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const router = useRouter();

  // Unwrap params for Next.js 15 compatibility
  const unwrappedParams = use(params);
  const websiteId = unwrappedParams.id;

  useEffect(() => {
    // Only load website when authentication is ready
    if (!authLoading) {
      loadWebsite();
    }
  }, [websiteId, authLoading]);

  const loadWebsite = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check if user is authenticated
      if (!token) {
        setError('Please log in to access this page');
        await navigateWithLoader(router, '/auth');
        return;
      }
      
      const websiteData = await getWebsite(websiteId);
      setWebsite(websiteData);
      setWebsiteName(websiteData.name);
      console.log('Loaded website for editing:', websiteData);
      console.log('Set website name to:', websiteData.name);
    } catch (error) {
      console.error('Failed to load website:', error);
      if (error.message === 'Not authenticated' || error.message === 'Authentication expired') {
        setError('Please log in to access this page');
        await navigateWithLoader(router, '/auth');
      } else {
        setError('Failed to load website: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSave = async (data) => {
    console.log('Template data received for update:', data);
    // Auto-save functionality - save without showing modal
    if (websiteName.trim()) {
      await handleAutoSave(data);
    } else {
      console.log('Website name not set, skipping auto-save');
    }
  };

  const handleAutoSave = async (data) => {
    if (!websiteName.trim()) return;

    try {
      console.log('=== AUTO-SAVE DEBUG ===');
      console.log('Website ID:', websiteId);
      console.log('Website name:', websiteName);
      console.log('Data to auto-save:', data);
      console.log('Section order in data:', data.sectionOrder);
      
      const websiteData = {
        name: websiteName,
        data: data
      };

      const result = await updateWebsite(websiteId, websiteData);
      console.log('Auto-save result:', result);
      console.log('Auto-saved successfully with section order');
    } catch (error) {
      console.error('Auto-save failed:', error);
      // Don't show error to user for auto-save
    }
  };

  const handleSaveWebsite = async () => {
    if (!websiteName.trim()) {
      setError('Please enter a website name');
      return;
    }

    // Use templateData if available, otherwise use current form data from TemplateBuilder
    const dataToSave = window.currentFormData || {};

    setIsSaving(true);
    setError('');
    
    try {
      console.log('=== MANUAL UPDATE DEBUG INFO ===');
      console.log('Website ID:', websiteId);
      console.log('Website name:', websiteName);
      console.log('Window current form data:', window.currentFormData);
      console.log('Data to save:', dataToSave);
      console.log('Section order in data:', dataToSave.sectionOrder);
      console.log('Token:', localStorage.getItem('token'));
      console.log('User:', localStorage.getItem('user'));
      console.log('==========================');
      
      const websiteData = {
        name: websiteName,
        data: dataToSave
      };

      console.log('Updating website with data:', { name: websiteName, data: dataToSave });
      
      const result = await updateWebsite(websiteId, websiteData);
      console.log('Manual update result:', result);
      
      // Show success message with options
      const shouldGoToDashboard = confirm('Website updated successfully! Would you like to go back to dashboard?');
      if (shouldGoToDashboard) {
        await navigateWithLoader(router, '/dashboard');
      } else {
        // Stay on edit page to continue editing
        setShowNameModal(false);
      }
    } catch (error) {
      console.error('Failed to update website:', error);
      setError(`Failed to update website: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToDashboard = () => {
    navigateWithLoader(router, '/dashboard');
  };

  // Show loading state while authentication is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // Show error state for authentication issues
  if (error && (error.includes('log in') || error.includes('authenticated'))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Access Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigateWithLoader(router, '/auth')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

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

  if (error && !website) {
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
              onClick={handleBackToDashboard}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Edit Website</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNameModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save & Update
            </button>
            {/* <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Auto-save enabled
            </div> */}
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Website</h3>
            <div className="mb-4">
              <label htmlFor="websiteName" className="block text-sm font-medium text-gray-700 mb-2">
                Website Name
              </label>
              <input
                type="text"
                id="websiteName"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter website name"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNameModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWebsite}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Updating...' : 'Update Website'}
              </button>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> After updating, you can choose to continue editing or go back to dashboard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Template Builder */}
      <div className="pt-16">
        <TemplateBuilder
          onClose={handleBackToDashboard}
          onSave={handleTemplateSave}
          initialData={website?.data}
          isEditMode={true}
        />
      </div>
    </>
  );
}
