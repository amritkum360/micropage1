'use client';

import React, { useState } from 'react';
import { defaultUniversalData } from '../../TemplateBuilderComponents/defaultData';

export default function AISectionForm({ section, onInputChange, sectionKey, isOpen }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');

  // Auto-expand when section is opened
  React.useEffect(() => {
    if (isOpen) {
      setIsExpanded(true);
    }
  }, [isOpen]);

  const handleDescriptionChange = (e) => {
    onInputChange(sectionKey, 'description', e.target.value);
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

  const generateSectionWithAI = async () => {
    if (!section.description || section.description.trim() === '') {
      setGenerationError('Please describe what kind of section you want to create.');
      return;
    }

    setIsGenerating(true);
    setGenerationError('');

    try {
      const response = await fetch('/api/generate-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: section.description,
          sectionTitle: section.title || 'AI Generated Section'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate section');
      }

      const data = await response.json();
      
      if (data.success && data.code) {
        onInputChange(sectionKey, 'code', data.code);
        setGenerationError('');
      } else {
        throw new Error(data.error || 'Failed to generate section');
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
      setGenerationError(error.message || 'Failed to generate section. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">AI Section</h3>
        </div>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={section.visible !== false}
              onChange={handleVisibilityChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
      </div>

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
              placeholder={defaultUniversalData.aiSection.title}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* AI Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe Your Section
            </label>
            <textarea
              value={section.description || ''}
              onChange={handleDescriptionChange}
              placeholder={defaultUniversalData.aiSection.description}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Describe what kind of section you want. For example: &quot;A hero section with a gradient background, large title, subtitle, and a call-to-action button&quot;
            </p>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 font-medium mb-1">💡 AI will generate code using Tailwind CSS classes</p>
              <p className="text-xs text-blue-500">No custom CSS needed - everything uses Tailwind&apos;s utility classes!</p>
            </div>
          </div>

          {/* Generate Button */}
          <div>
            <button
              onClick={generateSectionWithAI}
              disabled={isGenerating || !section.description?.trim()}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isGenerating || !section.description?.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Generating with AI...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Generate Section with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {generationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm text-red-600 font-medium">Generation Error</span>
              </div>
              <p className="text-sm text-red-600 mt-1">{generationError}</p>
            </div>
          )}

          {/* Generated Code Display */}
          {section.code && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Code
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-mono">AI Generated HTML/CSS/JS</span>
                  <button
                    onClick={() => onInputChange(sectionKey, 'code', '')}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Clear Code
                  </button>
                </div>
                <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap font-mono">
                  {section.code}
                </pre>
              </div>
            </div>
          )}

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
                      ? 'border-blue-500 ring-2 ring-blue-200'
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

          {/* AI Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">AI Generation</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Describe your section in detail and AI will generate HTML with Tailwind CSS classes and JavaScript for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
