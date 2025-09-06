'use client';

import React, { useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';

export default function HeroForm({ section, onInputChange, sectionKey = 'hero' }) {
  const fileInputRef = useRef(null);
  const { token } = useAuth();

  // Template selection handler
  const handleTemplateChange = (templateNumber) => {
    onInputChange(sectionKey, 'template', templateNumber);
  };

  const handleBackgroundImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!token) {
          alert('Please login to upload images');
          return;
        }

        console.log('🚀 Starting background image upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        });

        // Clear any existing background image data first
        onInputChange(sectionKey, 'backgroundImage', '');

        // Show loading state
        const loadingData = {
          loading: true,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
        onInputChange(sectionKey, 'backgroundImage', loadingData);

        // Upload image to server
        const imageData = await uploadImageToServer(file, token, 5);
        console.log('✅ Background image upload successful:', imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }
        
        onInputChange(sectionKey, 'backgroundImage', imageData);
        
        // Verify the data was set
        console.log('🔍 Background image data after setting:', imageData);
        
      } catch (error) {
        console.error('❌ Background image upload failed:', error);
        alert(error.message);
        // Remove loading state on error
        onInputChange(sectionKey, 'backgroundImage', '');
      }
    }
  };

  const removeBackgroundImage = () => {
    onInputChange(sectionKey, 'backgroundImage', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
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

  // Get image metadata for display
  const backgroundImageMetadata = getImageMetadata(section.backgroundImage);

  return (
    <div className="space-y-3">
      {/* Template Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Hero Template</label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handleTemplateChange(1)}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              (section.template || 1) === 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Template 1
            <div className="text-xs opacity-75 mt-1">Full-width background</div>
          </button>
          <button
            type="button"
            onClick={() => handleTemplateChange(2)}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              (section.template || 1) === 2
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Template 2
            <div className="text-xs opacity-75 mt-1">Image right, content left</div>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Welcome to Our Business"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Professional Solutions"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={section.description || ''}
          onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
          rows={2}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Hero description..."
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Background Image</label>
        <div className="space-y-2">
          {/* File Upload Option */}
          <div>
            <label className="block text-xs text-gray-600 mb-2">Upload background image from your device:</label>
            
            {/* Custom Upload Button */}
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                disabled={section.backgroundImage?.loading}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg transition-all duration-200 cursor-pointer group ${
                  section.backgroundImage?.loading 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                    : 'bg-purple-50 hover:bg-purple-100 hover:border-purple-400'
                }`}
              >
                {section.backgroundImage?.loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium text-gray-600">Uploading...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-purple-500 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700">
                      Choose Background Image
                    </span>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Supported formats: JPG, PNG, GIF, WebP • Max size: 5MB • Recommended size: 1920x1080px
            </p>
          </div>
          
          {/* Preview and Remove Button */}
          {isImageUploaded(section.backgroundImage) && !section.backgroundImage?.loading && (
            <div className="mt-3">
              <label className="block text-xs text-gray-600 mb-2">Background Image Preview:</label>
              <div className="w-full h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <img
                  src={getImageSrc(section.backgroundImage)} 
                  alt="Background preview" 
                  className="w-full h-full object-cover"
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
                    {section.backgroundImage?.isServerImage ? '✓ Background image uploaded to server' : '✓ Background image uploaded successfully'}
                  </span>
                  {backgroundImageMetadata && (
                    <span className="text-xs text-gray-500">
                      {backgroundImageMetadata.fileName} ({(backgroundImageMetadata.fileSize / 1024).toFixed(1)}KB)
                    </span>
                  )}
                </div>
                <button
                  onClick={removeBackgroundImage}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background Image Transparency (for Template 1) */}
      {(section.template || 1) === 1 && section.backgroundImage && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Background Overlay: {section.backgroundOpacity || 40}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={section.backgroundOpacity || 40}
            onChange={(e) => onInputChange(sectionKey, 'backgroundOpacity', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Transparent (0%)</span>
            <span>Medium (40%)</span>
            <span>Dark (100%)</span>
          </div>
        </div>
      )}

      {/* Image Border Radius (for Template 2) */}
      {(section.template || 1) === 2 && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Image Border Radius: {section.imageBorderRadius || 50}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={section.imageBorderRadius || 50}
            onChange={(e) => onInputChange(sectionKey, 'imageBorderRadius', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Square (0%)</span>
            <span>Round (50%)</span>
            <span>Oval (100%)</span>
          </div>
        </div>
      )}

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
