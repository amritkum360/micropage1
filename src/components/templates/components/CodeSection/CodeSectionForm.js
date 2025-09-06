'use client';

import React, { useState } from 'react';
import { defaultUniversalData } from '../../TemplateBuilderComponents/defaultData';

export default function CodeSectionForm({ section, onInputChange, sectionKey, isOpen }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand when section is opened
  React.useEffect(() => {
    if (isOpen) {
      setIsExpanded(true);
    }
  }, [isOpen]);

  const handleCodeChange = (e) => {
    onInputChange(sectionKey, 'code', e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    onInputChange(sectionKey, 'backgroundColor', e.target.value);
  };

  const handleVisibilityChange = (e) => {
    onInputChange(sectionKey, 'visible', e.target.checked);
  };

  const handleTitleChange = (e) => {
    onInputChange(sectionKey, 'title', e.target.value);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
      {/* Header */}
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Code Section</h3>
        </div>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={section.visible !== false}
              onChange={handleVisibilityChange}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span>Visible</span>
          </label>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg 
              className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div> */}

      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-gray-200">
          {/* Section Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={section.title || ''}
              onChange={handleTitleChange}
              placeholder={defaultUniversalData.codeSection.title}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Background Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['white', 'gray-50', 'blue-50', 'green-50', 'purple-50', 'yellow-50'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleBackgroundColorChange({ target: { value: color } })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    section.backgroundColor === color
                      ? 'border-purple-500 ring-2 ring-purple-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-6 rounded ${
                    color === 'white' ? 'bg-white border border-gray-200' :
                    color === 'gray-50' ? 'bg-gray-50' :
                    color === 'blue-50' ? 'bg-blue-50' :
                    color === 'green-50' ? 'bg-green-50' :
                    color === 'purple-50' ? 'bg-purple-50' :
                    'bg-yellow-50'
                  }`}></div>
                  <span className="text-xs text-gray-600 mt-1 block capitalize">{color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Code (HTML/CSS/JS)
            </label>
            <div className="relative">
              <textarea
                value={section.code || ''}
                onChange={handleCodeChange}
                placeholder={defaultUniversalData.codeSection.code}
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono text-sm resize-none"
                style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
              />
              <div className="absolute top-2 right-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                HTML/CSS/JS
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Write your custom HTML, CSS, and JavaScript code here. The section will render based on your code.
            </p>
          </div>

          {/* Code Preview Toggle */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Code Preview</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your custom code will be rendered in the preview area. Make sure your HTML is properly structured.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
