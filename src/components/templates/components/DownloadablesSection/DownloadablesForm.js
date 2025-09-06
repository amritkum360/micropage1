'use client';

import React from 'react';

export default function DownloadablesForm({ section, onInputChange, sectionKey = 'downloadables' }) {

  const addItem = () => {
    const newItems = [...(section.items || []), {
      title: 'New Downloadable',
      description: 'Description of the downloadable item...',
      type: 'PDF',
      file: ''
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeItem = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onInputChange(sectionKey, 'items', newItems);
  };

  const handleUrlInput = (index, url) => {
    updateItem(index, 'file', url);
    // Auto-detect file type from URL extension
    if (url) {
      const urlParts = url.split('.');
      const extension = urlParts[urlParts.length - 1]?.toUpperCase();
      if (extension && typeOptions.includes(extension)) {
        updateItem(index, 'type', extension);
      }
    }
  };

  const typeOptions = [
    'PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 
    'ZIP', 'RAR', 'TXT', 'CSV', 'JPG', 'PNG', 'MP4', 'MP3'
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Free Downloads"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Resources & Materials"
        />
      </div>

      {/* Downloadable Items Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Downloadable Items</label>
          <button
            type="button"
            onClick={addItem}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Item
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((item, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Item {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Item Title */}
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateItem(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Downloadable Item Title"
                />

                {/* Item Description */}
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Description of the downloadable item..."
                />

                {/* File URL Input */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">File URL</label>
                  <input
                    type="url"
                    value={item.file || ''}
                    onChange={(e) => handleUrlInput(index, e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="https://example.com/file.pdf"
                  />
                </div>

                {/* File Type */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">File Type</label>
                  <select
                    value={item.type || 'PDF'}
                    onChange={(e) => updateItem(index, 'type', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No downloadable items yet. Click &quot;Add Item&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
