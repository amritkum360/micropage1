'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Save, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function TopBar({ onSave, isEditMode = false, formData = {}, onSubdomainFocus, onSubdomainChange, checkSubdomain }) {
  console.log('TopBar - Component rendered with:', { isEditMode, formData: formData?.subdomain, windowData: window.currentFormData?.subdomain });
  const [showSubdomainTip, setShowSubdomainTip] = useState(false);
  const [subdomain, setSubdomain] = useState(
    (formData?.subdomain && typeof formData.subdomain === 'string') ? formData.subdomain : 
    (window.currentFormData?.subdomain && typeof window.currentFormData.subdomain === 'string') ? window.currentFormData.subdomain : ''
  );
  const [subdomainError, setSubdomainError] = useState('');
  const [isSubdomainHighlighted, setIsSubdomainHighlighted] = useState(false);
  const [subdomainStatus, setSubdomainStatus] = useState(null); // 'checking', 'available', 'unavailable', 'invalid'
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const subdomainInputRef = useRef(null);
  
  // Hide tip when subdomain is provided
  React.useEffect(() => {
    const currentSubdomain = formData?.subdomain || window.currentFormData?.subdomain;
    console.log('TopBar - useEffect triggered, formData.subdomain:', formData?.subdomain);
    console.log('TopBar - useEffect triggered, window.currentFormData.subdomain:', window.currentFormData?.subdomain);
    console.log('TopBar - useEffect triggered, currentSubdomain:', currentSubdomain);
    
    if (currentSubdomain && typeof currentSubdomain === 'string' && currentSubdomain.trim()) {
      console.log('TopBar - hiding tip, subdomain is valid');
      setShowSubdomainTip(false);
    }
  }, [formData?.subdomain]);

  // Sync subdomain state with formData
  useEffect(() => {
    const currentSubdomain = formData?.subdomain || window.currentFormData?.subdomain;
    if (currentSubdomain && typeof currentSubdomain === 'string' && currentSubdomain !== subdomain) {
      console.log('TopBar - Syncing subdomain from formData:', currentSubdomain);
      setSubdomain(currentSubdomain);
    }
  }, [formData?.subdomain, window.currentFormData?.subdomain]);

  // Debounced subdomain check
  const checkSubdomainAvailability = useCallback(async (subdomainValue) => {
    if (!subdomainValue || subdomainValue.length < 3) {
      setSubdomainStatus(null);
      return;
    }

    // Basic validation
    if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]?$/.test(subdomainValue)) {
      setSubdomainStatus('invalid');
      return;
    }

    // In edit mode, if subdomain hasn't changed, still check availability
    // but mark as available if it's the same as the original
    if (isEditMode && formData?.subdomain === subdomainValue) {
      setSubdomainStatus('available');
      // Still call the API to ensure it's actually available
    }

    setIsCheckingSubdomain(true);
    setSubdomainStatus('checking');

    try {
      if (checkSubdomain) {
        console.log('Calling checkSubdomain with:', subdomainValue);
        const result = await checkSubdomain(subdomainValue);
        console.log('Subdomain check result:', result);
        
        if (result && typeof result.available === 'boolean') {
          setSubdomainStatus(result.available ? 'available' : 'unavailable');
        } else {
          console.log('Invalid result format:', result);
          setSubdomainStatus('error');
        }
      } else {
        console.log('checkSubdomain function not available');
        setSubdomainStatus('error');
      }
    } catch (error) {
      console.error('Error checking subdomain:', error);
      setSubdomainStatus('error');
    } finally {
      setIsCheckingSubdomain(false);
    }
  }, [checkSubdomain, isEditMode, formData?.subdomain]);

  // Debounce subdomain check
  useEffect(() => {
    console.log('TopBar - Subdomain check effect triggered, subdomain:', subdomain);
    const timeoutId = setTimeout(() => {
      if (subdomain && subdomain.length >= 3) {
        console.log('TopBar - Triggering subdomain availability check for:', subdomain);
        checkSubdomainAvailability(subdomain);
      } else {
        console.log('TopBar - Subdomain too short or empty, clearing status');
        setSubdomainStatus(null);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [subdomain, checkSubdomainAvailability]);

  // Initialize subdomain status for edit mode
  useEffect(() => {
    if (isEditMode && formData?.subdomain && subdomain === formData.subdomain) {
      console.log('TopBar - Setting subdomain as available in edit mode:', formData.subdomain);
      setSubdomainStatus('available');
    }
  }, [isEditMode, formData?.subdomain, subdomain]);

  const validateSubdomain = () => {
    if (!subdomain.trim()) {
      setSubdomainError('Subdomain is required');
      return false;
    }
    if (subdomain.length < 3) {
      setSubdomainError('Subdomain must be at least 3 characters');
      return false;
    }
    if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]?$/.test(subdomain)) {
      setSubdomainError('Subdomain can only contain lowercase letters, numbers, and hyphens. Cannot start or end with hyphen.');
      return false;
    }
    setSubdomainError('');
    return true;
  };

  const handleSubdomainChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    console.log('TopBar - handleSubdomainChange called with value:', value);
    setSubdomain(value);
    
    // Update formData with new subdomain value
    if (window.currentFormData) {
      window.currentFormData.subdomain = value;
      console.log('TopBar - updated window.currentFormData.subdomain:', window.currentFormData.subdomain);
    }
    
    // Trigger form data update through parent component
    if (onSubdomainChange) {
      onSubdomainChange(value);
      console.log('TopBar - called onSubdomainChange with value:', value);
    }
    
    // Clear any existing errors
    if (subdomainError) {
      setSubdomainError('');
    }
    
    // Clear status if subdomain is empty or too short
    if (!value || value.length < 3) {
      setSubdomainStatus(null);
    }
  };

  const focusSubdomain = () => {
    if (subdomainInputRef.current) {
      subdomainInputRef.current.focus();
      setIsSubdomainHighlighted(true);
      
      // Remove highlight after 5 seconds
      setTimeout(() => {
        setIsSubdomainHighlighted(false);
      }, 5000);
    }
  };

  // Set focus function for parent to use
  useEffect(() => {
    if (onSubdomainFocus) {
      onSubdomainFocus(() => focusSubdomain);
    }
  }, [onSubdomainFocus]);

  const handleSave = async () => {
    // Check if subdomain is valid
    if (!validateSubdomain()) {
      console.log('Subdomain validation failed');
      focusSubdomain();
      return;
    }
    
    console.log('Subdomain is valid, calling onSave');
    
    // Set loading state
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      // Use the most up-to-date formData
      const updatedFormData = {
        ...formData,
        subdomain: subdomain
      };
      
      // Call the save function
      await onSave(updatedFormData);
      
      // Show success state
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Save failed:', error);
      // Error handling can be added here if needed
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Live Preview</h1>
          {/* <p className="text-sm text-gray-600">Universal template with 18 customizable sections</p> */}
        </div>
        <div className="flex items-start space-x-2 relative">
          {/* Subdomain Input */}
          <div className="flex flex-col space-y-1">
            {/* <label className="text-xs font-medium text-gray-700 mb-1">
              Subdomain
            </label> */}
            <div className="flex items-center">
              <input
                ref={subdomainInputRef}
                type="text"
                value={subdomain}
                onChange={handleSubdomainChange}
                className={`px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-300 w-26 ${
                  subdomainError ? 'border-red-500 bg-red-50' : 
                  isSubdomainHighlighted ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-200' : 
                  'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter a Subdomain"
                required
              />
              <div className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-600 font-medium">
                .jirocash.com
              </div>
            </div>
            {subdomainError && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {subdomainError}
              </div>
            )}
            
            {/* Live Subdomain Status */}
            {subdomain && subdomain.length >= 3 && (
              <div className="flex items-center text-xs mt-1">
                {subdomainStatus === 'checking' && (
                  <div className="flex items-center text-blue-600">
                    <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                    Checking availability...
                  </div>
                )}
                {subdomainStatus === 'available' && (
                  <div className="flex items-center text-green-600">
                    <Check className="w-3 h-3 mr-1" />
                    ✅ Available
                  </div>
                )}
                {subdomainStatus === 'unavailable' && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    ❌ Already taken
                  </div>
                )}
                {subdomainStatus === 'invalid' && (
                  <div className="flex items-center text-orange-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    ⚠️ Invalid format
                  </div>
                )}
                {subdomainStatus === 'error' && (
                  <div className="flex items-center text-gray-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    🔄 Check failed
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Save Button with Loading and Success States */}
          <div className="relative">
            <button 
              onClick={handleSave}
              disabled={
                isSaving || 
                (subdomain && subdomain.length >= 3 && (subdomainStatus === 'unavailable' || subdomainStatus === 'invalid' || subdomainStatus === 'checking' || isCheckingSubdomain))
              }
              className={`inline-flex items-center px-6 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold shadow-sm transform ${
                isSaving
                  ? 'bg-blue-500 text-white cursor-not-allowed'
                  : subdomain && subdomain.length >= 3 && (subdomainStatus === 'unavailable' || subdomainStatus === 'invalid' || subdomainStatus === 'checking' || isCheckingSubdomain)
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : saveSuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md hover:scale-105'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEditMode ? 'Updating...' : 'Publishing...'}
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {isEditMode ? 'Updated!' : 'Published!'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {subdomain && subdomain.length >= 3 && subdomainStatus === 'unavailable' ? 'Subdomain Taken' :
                   subdomain && subdomain.length >= 3 && subdomainStatus === 'invalid' ? 'Invalid Subdomain' :
                   subdomain && subdomain.length >= 3 && (subdomainStatus === 'checking' || isCheckingSubdomain) ? 'Checking...' :
                   isEditMode ? 'Update & Publish' : 'Save & Publish'}
                </>
              )}
            </button>
            
            {/* Success Message */}
            {saveSuccess && (
              <div className="absolute top-full right-0 mt-2 p-3 bg-green-50 border border-green-200 rounded-md shadow-lg z-50 min-w-64 animate-in slide-in-from-top-2">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  <div>
                    <p className="text-green-800 text-xs font-medium">
                      {isEditMode ? 'Website Updated Successfully!' : 'Website Published Successfully!'}
                    </p>
                    <p className="text-green-600 text-xs mt-1">
                      Your changes have been saved and are now live.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
                      {/* {isEditMode && (
              <div className="flex items-center text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Auto-save enabled
              </div>
            )} */}
          
          {/* Subdomain Required Tip */}
          {showSubdomainTip && (
            <div className="absolute top-full right-0 mt-2 p-3 bg-red-50 border border-red-200 rounded-md shadow-lg z-50 min-w-64">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-red-700 text-xs font-medium">
                      Subdomain Required
                    </p>
                    <p className="text-red-600 text-xs mt-1">
                      Please enter a subdomain in the sidebar to save your website
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSubdomainTip(false)}
                  className="text-red-400 hover:text-red-600 transition-colors ml-2 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
          </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
