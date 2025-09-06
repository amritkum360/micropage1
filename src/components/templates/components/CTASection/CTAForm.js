'use client';

import React from 'react';

export default function CtaForm({ section, onInputChange, sectionKey = 'cta' }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Ready to Get Started?"
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Join thousands of satisfied customers today"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
        <input
          type="text"
          value={section.buttonText || ''}
          onChange={(e) => onInputChange(sectionKey, 'buttonText', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Get Started Now"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Button Link</label>
        <input
          type="text"
          value={section.buttonLink || ''}
          onChange={(e) => onInputChange(sectionKey, 'buttonLink', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="#contact or https://example.com"
        />
      </div>
    </div>
  );
}
