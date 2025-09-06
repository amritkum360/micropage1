'use client';

import React, { useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';

export default function HeaderForm({ section, onInputChange, sectionKey = 'header' }) {
  const fileInputRef = useRef(null);
  const { token } = useAuth();

  const addMenuItem = () => {
    const newNavigation = [...(section.navigation || []), { name: 'New Menu', link: '#new' }];
    onInputChange(sectionKey, 'navigation', newNavigation);
  };

  const removeMenuItem = (index) => {
    const newNavigation = section.navigation.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'navigation', newNavigation);
  };

  const updateMenuItem = (index, field, value) => {
    const newNavigation = [...section.navigation];
    newNavigation[index] = { ...newNavigation[index], [field]: value };
    onInputChange(sectionKey, 'navigation', newNavigation);
  };

  const addCTAButton = () => {
    const newCTAButtons = [...(section.ctaButtons || []), { text: 'New Button', link: '#new', primary: false }];
    onInputChange(sectionKey, 'ctaButtons', newCTAButtons);
  };

  const removeCTAButton = (index) => {
    const newCTAButtons = section.ctaButtons.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'ctaButtons', newCTAButtons);
  };

  const updateCTAButton = (index, field, value) => {
    const newCTAButtons = [...section.ctaButtons];
    newCTAButtons[index] = { ...newCTAButtons[index], [field]: value };
    onInputChange(sectionKey, 'ctaButtons', newCTAButtons);
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!token) {
          alert('Please login to upload images');
          return;
        }

        console.log('🚀 Starting logo upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        });

        // Clear any existing logo data first
        onInputChange(sectionKey, 'logo', '');

        // Show loading state
        const loadingData = {
          loading: true,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
        onInputChange(sectionKey, 'logo', loadingData);

        // Upload image to server
        const logoData = await uploadImageToServer(file, token, 5);
        console.log('✅ Upload successful, logo data:', logoData);
        
        // Verify the data structure
        if (!logoData.url) {
          throw new Error('Server response missing image URL');
        }
        
        onInputChange(sectionKey, 'logo', logoData);
        
        // Verify the data was set
        console.log('🔍 Logo data after setting:', logoData);
        
      } catch (error) {
        console.error('❌ Upload failed:', error);
        alert(error.message);
        // Remove loading state on error
        onInputChange(sectionKey, 'logo', '');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Get image metadata for display
  const logoMetadata = getImageMetadata(section.logo);

  return (
    <div className="space-y-4">
      {/* Logo Section */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Logo</label>
        <div className="space-y-2">
          {/* File Upload Option */}
          <div>
            <label className="block text-xs text-gray-600 mb-2">Upload logo from your device:</label>
            
            {/* Custom Upload Button */}
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                disabled={section.logo?.loading}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg transition-all duration-200 cursor-pointer group ${
                  section.logo?.loading 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                    : 'bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
                }`}
              >
                {section.logo?.loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium text-gray-600">Uploading...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-blue-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      Choose Logo File
                    </span>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Supported formats: JPG, PNG, GIF, SVG • Max size: 5MB • Recommended size: 200x60px
            </p>
          </div>
          
          {/* Preview */}
          {isImageUploaded(section.logo) && !section.logo?.loading && (
            <div className="mt-3">
              <label className="block text-xs text-gray-600 mb-2">Logo Preview:</label>
              <div className="w-24 h-14 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <img
                  src={getImageSrc(section.logo)} 
                  alt="Logo preview" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-50" style={{display: 'none'}}>
                  Invalid Image
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-green-600 font-medium">
                    {section.logo?.isServerImage ? '✓ Logo uploaded to server' : '✓ Logo uploaded successfully'}
                  </span>
                  {logoMetadata && (
                    <span className="text-xs text-gray-500">
                      {logoMetadata.fileName} ({(logoMetadata.fileSize / 1024).toFixed(1)}KB)
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onInputChange(sectionKey, 'logo', '')}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Navigation Menu</label>
          <button
            type="button"
            onClick={addMenuItem}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            + Add Menu Item
          </button>
        </div>
        
        <div className="space-y-2">
          {(section.navigation || []).map((item, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md">
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Menu Name"
                />
                <input
                  type="text"
                  value={item.link || ''}
                  onChange={(e) => updateMenuItem(index, 'link', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Link (e.g., #about, /contact)"
                />
              </div>
              <button
                type="button"
                onClick={() => removeMenuItem(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          
          {(!section.navigation || section.navigation.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-2">
              No menu items yet. Click &quot;Add Menu Item&quot; to get started.
            </div>
          )}
        </div>
      </div>

      {/* CTA Buttons Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">CTA Buttons</label>
          <button
            type="button"
            onClick={addCTAButton}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            + Add CTA Button
          </button>
        </div>
        
        <div className="space-y-2">
          {(section.ctaButtons || []).map((button, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md">
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={button.text || ''}
                  onChange={(e) => updateCTAButton(index, 'text', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Button Text (e.g., Get Started)"
                />
                <input
                  type="text"
                  value={button.link || ''}
                  onChange={(e) => updateCTAButton(index, 'link', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Button Link (e.g., #contact, /signup)"
                />
                <div className="flex items-center space-x-2">
                  <label className="text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={button.primary || false}
                      onChange={(e) => updateCTAButton(index, 'primary', e.target.checked)}
                      className="mr-1"
                    />
                    Primary Button
                  </label>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeCTAButton(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          
          {(!section.ctaButtons || section.ctaButtons.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-2">
              No CTA buttons yet. Click &quot;Add CTA Button&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
