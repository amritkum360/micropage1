'use client';

import React from 'react';

export default function CodeSectionTemplate({ section }) {
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

  // Function to safely render custom code
  const renderCustomCode = () => {
    if (!section.code || section.code.trim() === '') {
      return (
        <div className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Custom Code Section</h3>
            <p className="text-lg text-gray-600 mb-6">
              Add your custom HTML, CSS, and JavaScript code to create unique sections.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-mono">
                {/* Show example code */}
                {`<div class=&quot;custom-section&quot;>
  <h2>Your Custom Content</h2>
  <p>Add your HTML here...</p>
</div>

<style>
  .custom-section {
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 1rem;
  }
</style>`}
              </p>
            </div>
          </div>
        </div>
      );
    }

    try {
      // Render the custom code directly without wrapper to avoid CSS conflicts
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Code Error</h3>
            <p className="text-lg text-gray-600 mb-6">
              There&apos;s an error in your custom code. Please check the syntax and try again.
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
    <section className={`${backgroundColorClass} relative overflow-hidden`} role="region" aria-label={section.title || 'Custom Code Section'}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {renderCustomCode()}
      </div>
    </section>
  );
}
