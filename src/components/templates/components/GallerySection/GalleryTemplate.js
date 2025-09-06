'use client';

import React from 'react';
import { getImageSrc } from '@/utils/imageUtils';

export default function GalleryTemplate({ section }) {
  // Debug logging
  console.log('🖼️ GalleryTemplate - Images data:', section.images);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50" role="region" aria-label="Gallery" id='gallery'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-2 mb-4">
              <span className="text-6xl">🎨</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="w-32 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, var(--primary-color, #3B82F6), var(--secondary-color, #8B5CF6))' }}></div>
            {section.subtitle && (
              <p className="text-xl text-gray-600 theme-primary">{section.subtitle}</p>
            )}
          </div>
          {section.images && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {section.images.map((image, index) => {
                const imageSrc = getImageSrc(image.image);
                console.log(`🖼️ GalleryTemplate - Image ${index} source:`, imageSrc);
                
                return (
                  <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 border-2 border-transparent hover:border-opacity-20" style={{ borderColor: 'var(--primary-color, #3B82F6)' }}>
                    {imageSrc ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={image.title || 'Gallery image'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center theme-gradient" style={{display: 'none'}}>
                          <span className="text-4xl">🖼️</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center theme-gradient">
                        <span className="text-4xl">🖼️</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-800 theme-primary">{image.title}</h3>
                        <span className="text-2xl">✨</span>
                      </div>
                      {image.description && (
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{image.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
