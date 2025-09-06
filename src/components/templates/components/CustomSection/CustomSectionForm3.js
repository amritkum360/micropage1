'use client';

import React from 'react';
import { defaultUniversalData } from '../../TemplateBuilderComponents/defaultData';

export default function CustomSectionForm3({ section, onInputChange, sectionKey, isOpen }) {

  return (
    <div className="space-y-3">
      {/* Template 3 Specific Settings */}
      <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
        <h3 className="text-sm font-semibold text-indigo-800 mb-2">Template 3: Centered Banner Style</h3>
        <p className="text-xs text-indigo-600">Perfect for hero sections and call-to-action banners. Clean centered layout with gradient background and prominent text.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder={defaultUniversalData.customSection.title}
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder={defaultUniversalData.customSection.subtitle}
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={section.description || ''}
          onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
          rows={3}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder={defaultUniversalData.customSection.description}
        />
      </div>

      {/* Banner Style Settings */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200">
        <h4 className="text-sm font-semibold text-indigo-800 mb-2">Banner Style Options</h4>
        <p className="text-xs text-indigo-600 mb-3">This template creates a beautiful banner-style section with gradient background and centered content.</p>
        
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Banner Height</label>
            <select
              value={section.bannerHeight || 'medium'}
              onChange={(e) => onInputChange(sectionKey, 'bannerHeight', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="small">Small (300px)</option>
              <option value="medium">Medium (400px)</option>
              <option value="large">Large (500px)</option>
              <option value="extra-large">Extra Large (600px)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Gradient Style</label>
            <select
              value={section.gradientStyle || 'theme'}
              onChange={(e) => onInputChange(sectionKey, 'gradientStyle', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                                   <option value="theme">Theme Colors</option>
                     <option value="indigo-pink">Indigo to Pink</option>
                     <option value="blue-purple">Blue to Purple</option>
                     <option value="green-blue">Green to Blue</option>
                     <option value="purple-pink">Purple to Pink</option>
                     <option value="slate-gray">Slate to Gray</option>
            </select>
          </div>
        </div>
      </div>

      {/* Multiple Buttons Configuration */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Button Settings</h3>
          <button
            type="button"
            onClick={() => {
              const currentButtons = section.buttons || [];
              const newButton = {
                id: Date.now(),
                text: 'New Button',
                link: '#',
                style: 'primary'
              };
              onInputChange(sectionKey, 'buttons', [...currentButtons, newButton]);
            }}
            className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition-colors"
          >
            + Add Button
          </button>
        </div>

        {/* Buttons List */}
        <div className="space-y-3">
          {(section.buttons || []).map((button, index) => (
            <div key={button.id || index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Button {index + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const currentButtons = section.buttons || [];
                    const updatedButtons = currentButtons.filter((_, i) => i !== index);
                    onInputChange(sectionKey, 'buttons', updatedButtons);
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={button.text || ''}
                    onChange={(e) => {
                      const currentButtons = section.buttons || [];
                      const updatedButtons = currentButtons.map((b, i) => 
                        i === index ? { ...b, text: e.target.value } : b
                      );
                      onInputChange(sectionKey, 'buttons', updatedButtons);
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., Get Started, Learn More"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={button.link || ''}
                    onChange={(e) => {
                      const currentButtons = section.buttons || [];
                      const updatedButtons = currentButtons.map((b, i) => 
                        i === index ? { ...b, link: e.target.value } : b
                      );
                      onInputChange(sectionKey, 'buttons', updatedButtons);
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., https://example.com, /contact, #section"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Button Style</label>
                  <select
                    value={button.style || 'primary'}
                    onChange={(e) => {
                      const currentButtons = section.buttons || [];
                      const updatedButtons = currentButtons.map((b, i) => 
                        i === index ? { ...b, style: e.target.value } : b
                      );
                      onInputChange(sectionKey, 'buttons', updatedButtons);
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="primary">Primary (Glassmorphism)</option>
                    <option value="secondary">Secondary (Solid White)</option>
                    <option value="outline">Outline (Transparent)</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback for single button (backward compatibility) */}
        {(!section.buttons || section.buttons.length === 0) && (
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-700 mb-2">No buttons added yet. Click "Add Button" above to create your first button.</p>
          </div>
        )}
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
        <select
          value={section.backgroundColor || 'white'}
          onChange={(e) => onInputChange(sectionKey, 'backgroundColor', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
