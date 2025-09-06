'use client';

import React from 'react';

export default function FaqForm({ section, onInputChange, sectionKey = 'faq' }) {
  const addFAQ = () => {
    const newItems = [...(section.items || []), {
      question: 'New Question',
      answer: 'Answer to the question...'
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeFAQ = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateFAQ = (index, field, value) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onInputChange(sectionKey, 'items', newItems);
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
          placeholder="Frequently Asked Questions"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Common Questions & Answers"
        />
      </div>

      {/* FAQ Items Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">FAQ Items</label>
          <button
            type="button"
            onClick={addFAQ}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add FAQ
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((faq, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">FAQ {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFAQ(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Question */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question || ''}
                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="What is your question?"
                  />
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Answer</label>
                  <textarea
                    value={faq.answer || ''}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Provide a detailed answer to the question..."
                  />
                </div>
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No FAQ items yet. Click &quot;Add FAQ&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
