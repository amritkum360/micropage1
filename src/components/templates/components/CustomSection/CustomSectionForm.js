'use client';

import React from 'react';
import CustomSectionForm1 from './CustomSectionForm1';
import CustomSectionForm2 from './CustomSectionForm2';
import CustomSectionForm3 from './CustomSectionForm3';
import CustomSectionForm4 from './CustomSectionForm4';

export default function CustomSectionForm({ section, onInputChange, sectionKey, isOpen }) {
  // Template selection handler
  const handleTemplateChange = (templateNumber) => {
    onInputChange(sectionKey, 'template', templateNumber);
  };

  const template = section.template || 1;

  return (
    <div className="space-y-3">
      {/* Template Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Custom Section Template</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleTemplateChange(1)}
            className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              template === 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Template 1
            <div className="text-xs opacity-75 mt-1">Image left, content right</div>
          </button>
          <button
            type="button"
            onClick={() => handleTemplateChange(2)}
            className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              template === 2
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Template 2
            <div className="text-xs opacity-75 mt-1">Image right, content left</div>
          </button>
          <button
            type="button"
            onClick={() => handleTemplateChange(3)}
            className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              template === 3
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Template 3
            <div className="text-xs opacity-75 mt-1">Centered banner style</div>
          </button>
          <button
            type="button"
            onClick={() => handleTemplateChange(4)}
            className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
              template === 4
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Template 4
            <div className="text-xs opacity-75 mt-1">Content creation</div>
          </button>
        </div>
      </div>

      {/* Render the appropriate form based on template */}
      {template === 1 && (
        <CustomSectionForm1 
          section={section} 
          onInputChange={onInputChange} 
          sectionKey={sectionKey} 
          isOpen={isOpen} 
        />
      )}
      {template === 2 && (
        <CustomSectionForm2 
          section={section} 
          onInputChange={onInputChange} 
          sectionKey={sectionKey} 
          isOpen={isOpen} 
        />
      )}
      {template === 3 && (
        <CustomSectionForm3 
          section={section} 
          onInputChange={onInputChange} 
          sectionKey={sectionKey} 
          isOpen={isOpen} 
        />
      )}
      {template === 4 && (
        <CustomSectionForm4 
          section={section} 
          onInputChange={onInputChange} 
          sectionKey={sectionKey} 
          isOpen={isOpen} 
        />
      )}
    </div>
  );
}
