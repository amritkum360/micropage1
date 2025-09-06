'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TemplateBuilder from '@/components/templates/TemplateBuilder';
import { ArrowLeft, Save, Eye } from 'lucide-react';

function BuilderContent({ params }) {
  const { saveWebsite, updateWebsite, getWebsite } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const [templateData, setTemplateData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [websiteName, setWebsiteName] = useState('My Website');
  const [showNameModal, setShowNameModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [existingWebsite, setExistingWebsite] = useState(null);
  const router = useRouter();

  // Load existing website data if editing
  useEffect(() => {
    const loadExistingWebsite = async () => {
      if (params?.id) {
        setLoading(true);
        try {
          const website = await getWebsite(params.id);
          setExistingWebsite(website);
          setWebsiteName(website.name);
          setTemplateData(website.data);
          console.log('Loaded existing website:', website);
        } catch (error) {
          console.error('Failed to load website:', error);
          setError('Failed to load website data');
        } finally {
          setLoading(false);
        }
      }
    };

    loadExistingWebsite();
  }, [params?.id, getWebsite]);

  const handleTemplateSave = async (data) => {
    console.log('Template data received:', data);
    setTemplateData(data);
    setShowNameModal(true);
  };

  const handleSaveWebsite = async () => {
    if (!websiteName.trim()) {
      setError('Please enter a website name');
      return;
    }



    // Use templateData if available, otherwise use current form data from TemplateBuilder
    const dataToSave = templateData || window.currentFormData || {};

    setIsSaving(true);
    setError('');
    
    try {
      console.log('=== DEBUG INFO ===');
      console.log('Website name:', websiteName);
      console.log('Template data:', templateData);
      console.log('Window current form data:', window.currentFormData);
      console.log('Data to save:', dataToSave);
      console.log('Token:', localStorage.getItem('token'));
      console.log('User:', localStorage.getItem('user'));
      console.log('==================');
      
      const websiteData = {
        name: websiteName,
        data: dataToSave
      };

      console.log('Saving website with data:', { name: websiteName, data: dataToSave });
      
      let result;
      if (existingWebsite) {
        // Update existing website
        result = await updateWebsite(existingWebsite._id, websiteData);
        console.log('Update result:', result);
        alert('Website updated successfully!');
      } else {
        // Create new website
        result = await saveWebsite(websiteData);
        console.log('Save result:', result);
        alert('Website saved successfully!');
      }
      
      await navigateWithLoader(router, '/dashboard');
    } catch (error) {
      console.error('Failed to save website:', error);
      if (error.message.includes('Website limit reached')) {
        setError(error.message);
      } else {
        setError(`Failed to save website: ${error.message}`);
      }
    } finally {
      setIsSaving(false);
      setShowNameModal(false);
    }
  };

  const handleBackToDashboard = () => {
    if (templateData && Object.keys(templateData).length > 0) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigateWithLoader(router, '/dashboard');
      }
    } else {
      navigateWithLoader(router, '/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Website Builder
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Create amazing single-page websites with 18 customizable sections
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowNameModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Website
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Template Builder */}
      <TemplateBuilder
        onClose={handleBackToDashboard}
        onSave={handleTemplateSave}
        initialData={existingWebsite?.data}
      />

      {/* Save Website Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Save Website</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="website-name" className="block text-sm font-medium text-gray-700 mb-2">
                Website Name
              </label>
              <input
                type="text"
                id="website-name"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter website name"
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNameModal(false);
                  setError('');
                }}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWebsite}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BuilderPage() {
  return (
    <ProtectedRoute>
      <BuilderContent />
    </ProtectedRoute>
  );
}
