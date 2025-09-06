'use client';

import React from 'react';

export default function TestimonialsForm({ section, onInputChange, sectionKey = 'testimonials' }) {

  const addTestimonial = () => {
    const newItems = [...(section.items || []), {
      name: 'New Client',
      role: 'Customer',
      company: 'Company Name',
      text: 'Great service and excellent results!',
      rating: 5
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeTestimonial = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateTestimonial = (index, field, value) => {
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
          placeholder="What Our Clients Say"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Customer Reviews"
        />
      </div>

      {/* Testimonials Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Testimonials</label>
          <button
            type="button"
            onClick={addTestimonial}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Testimonial
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((testimonial, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Testimonial {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Client Name */}
                <input
                  type="text"
                  value={testimonial.name || ''}
                  onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Client Name"
                />

                {/* Client Role */}
                <input
                  type="text"
                  value={testimonial.role || ''}
                  onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Role (e.g., CEO, Manager, Customer)"
                />

                {/* Company */}
                <input
                  type="text"
                  value={testimonial.company || ''}
                  onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Company Name"
                />

                {/* Rating */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Rating</label>
                  <select
                    value={testimonial.rating || 5}
                    onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>

                                 {/* Testimonial Text */}
                 <textarea
                   value={testimonial.text || ''}
                   onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                   rows={3}
                   className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                   placeholder="Client testimonial text..."
                 />
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No testimonials yet. Click &quot;Add Testimonial&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
