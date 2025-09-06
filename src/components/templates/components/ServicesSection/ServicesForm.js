'use client';

import React, { useRef } from 'react';

export default function ServicesForm({ section, onInputChange, sectionKey = 'services' }) {
  const fileInputRefs = useRef({});

  const addService = () => {
    const newItems = [...(section.items || []), { 
      title: 'New Service', 
      description: 'Service description', 
      icon: '🚀', 
      price: '',
      image: '',
      buttonText: 'Get Started',
      buttonLink: '#contact',
      features: []
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeService = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateService = (index, field, value) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onInputChange(sectionKey, 'items', newItems);
  };

  const addFeature = (serviceIndex) => {
    const newItems = [...section.items];
    newItems[serviceIndex].features = [...(newItems[serviceIndex].features || []), 'New Feature'];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeFeature = (serviceIndex, featureIndex) => {
    const newItems = [...section.items];
    newItems[serviceIndex].features = newItems[serviceIndex].features.filter((_, i) => i !== featureIndex);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateFeature = (serviceIndex, featureIndex, value) => {
    const newItems = [...section.items];
    newItems[serviceIndex].features[featureIndex] = value;
    onInputChange(sectionKey, 'items', newItems);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateService(index, 'image', imageUrl);
    }
  };

  const iconOptions = ['🚀', '💡', '⚡', '🎯', '🔧', '📱', '💻', '🎨', '📊', '🔒', '🌐', '📈', '🎪', '🏆', '⭐', '💎'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Services"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="What We Offer"
        />
      </div>

      {/* Services Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Services</label>
          <button
            type="button"
            onClick={addService}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Service
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((service, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Service {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
                             <div className="space-y-2">
                                   {/* Icon and Image Selection */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Icon & Image Options</label>
                    
                    {/* Icon Selection */}
                    <div className="mb-3">
                      <label className="block text-xs text-gray-600 mb-1">Select Icon</label>
                      <div className="grid grid-cols-8 gap-1">
                        {iconOptions.map((icon, iconIndex) => (
                          <button
                            key={iconIndex}
                            type="button"
                            onClick={() => updateService(index, 'icon', icon)}
                            className={`w-8 h-8 text-lg rounded border-2 transition-colors ${
                              service.icon === icon 
                                ? 'border-indigo-500 bg-indigo-100' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Image Upload */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Choose Product Image (Optional)</label>
                      <div className="flex items-center space-x-2">
                        <input
                          ref={(el) => fileInputRefs.current[`image-${index}`] = el}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[`image-${index}`]?.click()}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Choose Image
                        </button>
                        {service.image && (
                          <span className="text-xs text-gray-600 truncate">
                            {service.image.includes('blob:') ? 'Image selected' : 'Image uploaded'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                {/* Service Title */}
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Service Title"
                />

                {/* Service Description */}
                <textarea
                  value={service.description || ''}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Service Description"
                />

                                                   {/* Service Price */}
                  <input
                    type="text"
                    value={service.price || ''}
                    onChange={(e) => updateService(index, 'price', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Price (e.g., $99, Free, Contact Us)"
                  />

                                     {/* Button Text */}
                   <input
                     type="text"
                     value={service.buttonText || 'Get Started'}
                     onChange={(e) => updateService(index, 'buttonText', e.target.value)}
                     className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                     placeholder="Button Text (e.g., Get Started, Call Now, Learn More)"
                   />

                   {/* Button Link */}
                   <input
                     type="text"
                     value={service.buttonLink || '#contact'}
                     onChange={(e) => updateService(index, 'buttonLink', e.target.value)}
                     className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                     placeholder="Button Link (e.g., #contact, /services, https://example.com)"
                   />

                                   

                 {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-gray-600">Features</label>
                    <button
                      type="button"
                      onClick={() => addFeature(index)}
                      className="px-1 py-0.5 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-1">
                    {(service.features || []).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Feature description"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index, featureIndex)}
                          className="px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No services yet. Click &quot;Add Service&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
