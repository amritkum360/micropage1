'use client';

import React from 'react';

export default function AISectionTemplate({ section }) {
  if (!section || section.visible === false) return null;

  const getBackgroundColorClass = (color) => {
    const colors = {
      'white': 'bg-white',
      'gray-50': 'bg-gradient-to-br from-gray-50 to-gray-100',
      'blue-50': 'bg-gradient-to-br from-blue-50 to-blue-100',
      'green-50': 'bg-gradient-to-br from-green-50 to-green-100',
      'purple-50': 'bg-gradient-to-br from-purple-50 to-purple-100',
      'yellow-50': 'bg-gradient-to-br from-yellow-50 to-yellow-100'
    };
    return colors[color] || 'bg-white';
  };

  const backgroundColorClass = getBackgroundColorClass(section.backgroundColor);

  // Function to safely render AI-generated code
  const renderAIGeneratedCode = () => {
    if (!section.code || section.code.trim() === '') {
      return (
        <div className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Generated Section</h3>
            <p className="text-lg text-gray-600 mb-6">
              {section.description || 'Describe your section and let AI generate the code for you.'}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-600 mb-2">
                <strong>Example:</strong> "A hero section with gradient background, large title, and CTA button"
              </p>
              <p className="text-xs text-blue-500">
                AI will generate HTML with Tailwind CSS classes like: bg-gradient-to-r, text-4xl, px-6, py-3, etc.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>Description:</strong> {section.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    try {
      // Render the AI-generated code directly
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: section.code }}
          style={{
            fontSize: 'inherit',
            lineHeight: 'inherit',
            fontFamily: 'inherit'
          }}
        />
      );
    } catch (error) {
      return (
        <div className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Generation Error</h3>
            <p className="text-lg text-gray-600 mb-6">
              There's an error in the AI-generated code. Please try generating again.
            </p>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-sm text-red-600 font-mono">
                Error: {error.message}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <section className={`${backgroundColorClass} relative overflow-hidden`} role="region" aria-label={section.title || 'AI Generated Section'}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/10 to-cyan-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200/10 to-blue-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {renderAIGeneratedCode()}
      </div>
    </section>
  );
}
