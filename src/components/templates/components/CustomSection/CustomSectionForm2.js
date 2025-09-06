'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';
import { defaultUniversalData } from '../../TemplateBuilderComponents/defaultData';

export default function CustomSectionForm2({ section, onInputChange, sectionKey, isOpen }) {
  const fileInputRef = useRef(null);
  const { token } = useAuth();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!token) {
          alert('Please login to upload images');
          return;
        }

        console.log('🚀 Starting custom section image upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        });

        // Clear any existing image data first
        onInputChange(sectionKey, 'image', '');

        // Show loading state
        const loadingData = {
          loading: true,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
        onInputChange(sectionKey, 'image', loadingData);

        // Upload image to server
        const imageData = await uploadImageToServer(file, token, 5);
        console.log('✅ Custom section image upload successful:', imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }
        
        onInputChange(sectionKey, 'image', imageData);
        
        // Verify the data was set
        console.log('🔍 Custom section image data after setting:', imageData);
        
      } catch (error) {
        console.error('❌ Custom section image upload failed:', error);
        alert(error.message);
        // Remove loading state on error
        onInputChange(sectionKey, 'image', '');
      }
    }
  };

  const removeImage = () => {
    onInputChange(sectionKey, 'image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Get image metadata for display
  const imageMetadata = getImageMetadata(section.image);

  return (
    <div className="space-y-3">
      {/* Template 2 Specific Settings */}
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <h3 className="text-sm font-semibold text-green-800 mb-2">Template 2: Image Right, Content Left</h3>
        <p className="text-xs text-green-600">Alternative side-by-side layout with content on the left. Great for storytelling and process explanations.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder={defaultUniversalData.customSection.title}
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder={defaultUniversalData.customSection.subtitle}
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={section.description || ''}
          onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
          rows={3}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder={defaultUniversalData.customSection.description}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Section Image</label>
        <div className="space-y-2">
          {/* File Upload Option */}
          <div>
            <label className="block text-xs text-gray-600 mb-2">Upload image from your device:</label>
            
            {/* Custom Upload Button */}
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                disabled={section.image?.loading}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-green-300 rounded-lg transition-all duration-200 cursor-pointer group ${
                  section.image?.loading 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                    : 'bg-green-50 hover:bg-green-100 hover:border-green-400'
                }`}
              >
                {section.image?.loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium text-gray-600">Uploading...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-green-500 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-green-600 group-hover:text-green-700">
                      Choose Section Image
                    </span>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Supported formats: JPG, PNG, GIF, WebP • Max size: 5MB • Recommended size: 800x600px
            </p>
          </div>
          
          {/* Preview and Remove Button */}
          {isImageUploaded(section.image) && !section.image?.loading && (
            <div className="mt-3">
              <label className="block text-xs text-gray-600 mb-2">Image Preview:</label>
              <div className="w-full h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <Image
                  src={getImageSrc(section.image)} 
                  alt="Section preview" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                    {section.image?.isServerImage ? '✓ Image uploaded to server' : '✓ Image uploaded successfully'}
                  </span>
                  {imageMetadata && (
                    <span className="text-xs text-gray-500">
                      {imageMetadata.fileName} ({(imageMetadata.fileSize / 1024).toFixed(1)}KB)
                    </span>
                  )}
                </div>
                <button
                  onClick={removeImage}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Border Radius */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Image Border Radius: {section.imageBorderRadius || 8}px
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={section.imageBorderRadius || 8}
          onChange={(e) => onInputChange(sectionKey, 'imageBorderRadius', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Sharp (0px)</span>
          <span>Rounded (8px)</span>
          <span>Very Round (50px)</span>
        </div>
      </div>

      {/* Button Configuration */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Button Settings</h3>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={section.buttonText || ''}
            onChange={(e) => onInputChange(sectionKey, 'buttonText', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="e.g., Learn More, Get Started, Contact Us"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Button Link</label>
          <input
            type="text"
            value={section.buttonLink || ''}
            onChange={(e) => onInputChange(sectionKey, 'buttonLink', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="e.g., https://example.com, /contact, #section"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Button Style</label>
          <select
            value={section.buttonStyle || 'primary'}
            onChange={(e) => onInputChange(sectionKey, 'buttonStyle', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="primary">Primary (Gradient)</option>
            <option value="secondary">Secondary (Filled)</option>
            <option value="outline">Outline</option>
          </select>
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
        <select
          value={section.backgroundColor || 'white'}
          onChange={(e) => onInputChange(sectionKey, 'backgroundColor', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="white">White</option>
          <option value="gray-50">Light Gray</option>
          <option value="blue-50">Light Blue</option>
          <option value="green-50">Light Green</option>
          <option value="purple-50">Light Purple</option>
          <option value="yellow-50">Light Yellow</option>
        </select>
      </div>
    </div>
  );
}
