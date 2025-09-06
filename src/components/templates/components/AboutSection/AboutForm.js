'use client';

import React from 'react';

export default function AboutForm({ section, onInputChange, sectionKey = 'about' }) {
  const addFeature = () => {
    const newFeatures = [...(section.features || []), { title: 'New Feature', description: 'Feature description' }];
    onInputChange(sectionKey, 'features', newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = section.features.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'features', newFeatures);
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...section.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onInputChange(sectionKey, 'features', newFeatures);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="About Us"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Your Trusted Partner"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={section.description || ''}
          onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
          rows={3}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="About description..."
        />
      </div>

      {/* Features Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Features</label>
          <button
            type="button"
            onClick={addFeature}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            + Add Feature
          </button>
        </div>
        
        <div className="space-y-2">
          {(section.features || []).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md">
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={feature.title || ''}
                  onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Feature Title"
                />
                <input
                  type="text"
                  value={feature.description || ''}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Feature Description"
                />
              </div>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          
          {(!section.features || section.features.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-2">
              No features yet. Click &quot;Add Feature&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
