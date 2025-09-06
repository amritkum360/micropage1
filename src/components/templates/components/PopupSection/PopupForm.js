'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';

export default function PopupForm({ section, onInputChange, sectionKey = 'popup' }) {
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

        console.log('🚀 Starting popup image upload:', {
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
        console.log('✅ Popup image upload successful:', imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }

        // Update with final image data
        onInputChange(sectionKey, 'image', imageData);
        console.log('✅ Popup image data updated successfully');

      } catch (error) {
        console.error('❌ Popup image upload failed:', error);
        alert('Failed to upload image. Please try again.');
        // Clear loading state on error
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

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Basic Settings</h3>
        <div className="space-y-4">
          {/* Popup ID */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Popup ID</label>
            <input
              type="text"
              value={section.popupId || ''}
              onChange={(e) => onInputChange(sectionKey, 'popupId', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., contact-popup, pricing-popup"
            />
            <p className="text-xs text-gray-500 mt-1">Use this ID in button href=&quot;#contact-popup&quot; to trigger this popup</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Content</h3>
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Popup Title</label>
            <input
              type="text"
              value={section.title || ''}
              onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter popup title"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={section.subtitle || ''}
              onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter popup subtitle"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={section.description || ''}
              onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter popup description"
            />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Media</h3>
        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Popup Image</label>
        <div className="space-y-2">
          {section.image && !section.image.loading && (
            <div className="relative">
              <Image
                src={getImageSrc(section.image)}
                alt="Popup preview"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
          
          {section.image && section.image.loading && (
            <div className="w-full h-32 bg-gray-100 rounded-lg border flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-xs text-gray-600">Uploading...</p>
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id={`popup-image-${sectionKey}`}
          />
          <label
            htmlFor={`popup-image-${sectionKey}`}
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-center"
          >
            {section.image ? 'Change Image' : 'Upload Image'}
          </label>
        </div>
      </div>

          {/* YouTube Video */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">YouTube Video (Optional)</label>
            <input
              type="text"
              value={section.youtubeVideo || ''}
              onChange={(e) => onInputChange(sectionKey, 'youtubeVideo', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter full YouTube URL or just the video ID. This will replace the image if provided.
            </p>
          </div>
        </div>
      </div>

      {/* Button Settings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Buttons</h3>
          <button
            type="button"
            onClick={() => {
              const currentButtons = section.buttons || [];
              const newButton = {
                id: `button_${Date.now()}`,
                text: '',
                link: '',
                style: 'primary'
              };
              onInputChange(sectionKey, 'buttons', [...currentButtons, newButton]);
            }}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Button
          </button>
        </div>
        
        <div className="space-y-4">
          {(section.buttons || []).map((button, index) => (
            <div key={button.id || index} className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-600">Button {index + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const currentButtons = section.buttons || [];
                    const updatedButtons = currentButtons.filter((_, i) => i !== index);
                    onInputChange(sectionKey, 'buttons', updatedButtons);
                  }}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Button Text */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={button.text || ''}
                    onChange={(e) => {
                      const currentButtons = section.buttons || [];
                      const updatedButtons = [...currentButtons];
                      updatedButtons[index] = { ...updatedButtons[index], text: e.target.value };
                      onInputChange(sectionKey, 'buttons', updatedButtons);
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Get Started, Learn More, Contact Us"
                  />
                </div>

                {/* Button Link */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={button.link || ''}
                    onChange={(e) => {
                      const currentButtons = section.buttons || [];
                      const updatedButtons = [...currentButtons];
                      updatedButtons[index] = { ...updatedButtons[index], link: e.target.value };
                      onInputChange(sectionKey, 'buttons', updatedButtons);
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., https://example.com, mailto:email@example.com"
                  />
                </div>

                {/* Button Style */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Button Style</label>
                  <select
                    value={button.style || 'primary'}
                    onChange={(e) => {
                      const currentButtons = section.buttons || [];
                      const updatedButtons = [...currentButtons];
                      updatedButtons[index] = { ...updatedButtons[index], style: e.target.value };
                      onInputChange(sectionKey, 'buttons', updatedButtons);
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="primary">Primary (Blue)</option>
                    <option value="secondary">Secondary (Gray)</option>
                    <option value="success">Success (Green)</option>
                    <option value="warning">Warning (Yellow)</option>
                    <option value="danger">Danger (Red)</option>
                    <option value="outline">Outline</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          
          {(!section.buttons || section.buttons.length === 0) && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No buttons added yet. Click &quot;Add Button&quot; to create your first button.
            </div>
          )}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Advanced Settings</h3>
        <div className="space-y-4">
          {/* Popup Size */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Popup Size</label>
            <select
              value={section.size || 'medium'}
              onChange={(e) => onInputChange(sectionKey, 'size', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="fullscreen">Fullscreen</option>
            </select>
          </div>

          {/* Close Button */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`show-close-${sectionKey}`}
              checked={section.showCloseButton !== false}
              onChange={(e) => onInputChange(sectionKey, 'showCloseButton', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`show-close-${sectionKey}`} className="text-xs text-gray-700">
              Show close button (×)
            </label>
          </div>

          {/* Backdrop Close */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`backdrop-close-${sectionKey}`}
              checked={section.closeOnBackdropClick !== false}
              onChange={(e) => onInputChange(sectionKey, 'closeOnBackdropClick', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`backdrop-close-${sectionKey}`} className="text-xs text-gray-700">
              Close when clicking outside popup
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
