'use client';

import React from 'react';
import Image from 'next/image';
import { getImageSrc } from '@/utils/imageUtils';

export default function CustomSectionTemplate1({ section }) {
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

  return (
    <section className={`py-20 px-4 ${backgroundColorClass} relative overflow-hidden`} role="region" aria-label={section.title}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 theme-gradient opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Template 1: Image Left, Content Right */}
            {/* Image */}
            <div className="order-1 lg:order-1">
              <div className="relative group">
                {/* Decorative frame */}
                <div className="absolute -inset-4 theme-gradient opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                <div 
                  className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105"
                  style={{ borderRadius: `${section.imageBorderRadius || 16}px` }}
                >
                  {section.image ? (
                    <Image
                      src={getImageSrc(section.image)}
                      alt={section.title || 'Custom section image'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white flex items-center justify-center relative">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-gray-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 right-8 w-6 h-6 border-2 border-gray-400 rounded-full animate-pulse delay-300"></div>
                        <div className="absolute bottom-8 left-12 w-4 h-4 border-2 border-gray-400 rounded-full animate-pulse delay-700"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-gray-400 rounded-full animate-pulse delay-1000"></div>
                      </div>
                      
                      <div className="text-center text-gray-500 relative z-10">
                        <div className="w-20 h-20 mx-auto mb-6 theme-primary-bg-light rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-10 h-10 theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Image</h3>
                        <p className="text-sm text-gray-500">Click to add a stunning custom image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay gradient for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-2 lg:order-2">
              <div className="space-y-8">
                {/* Title with decorative element */}
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-16 theme-gradient rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent leading-tight">
                    {section.title || 'Your Custom Section Title'}
                  </h2>
                </div>
                
                {/* Subtitle with accent */}
                <div className="relative">
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                    {section.subtitle || 'Add your subtitle here'}
                  </p>
                  <div className="absolute -bottom-2 left-0 w-16 h-1 theme-gradient rounded-full"></div>
                </div>
                
                {/* Description with enhanced typography */}
                <div className="relative">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                    {section.description || 'This is where you can add your custom content. Describe your services, showcase your work, or tell your story. The possibilities are endless with this flexible section.'}
                  </p>
                </div>

                {/* Button */}
                {section.buttonText && (
                  <div className="pt-6">
                    <a
                      href={section.buttonLink || '#'}
                      target={section.buttonLink?.startsWith('http') ? '_blank' : '_self'}
                      rel={section.buttonLink?.startsWith('http') ? 'noopener noreferrer' : ''}
                      className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                        section.buttonStyle === 'primary'
                          ? 'theme-gradient text-white hover:opacity-90'
                          : section.buttonStyle === 'secondary'
                          ? 'bg-white theme-primary border-2 border-current hover:theme-primary-bg-light'
                          : section.buttonStyle === 'outline'
                          ? 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          : 'theme-gradient text-white hover:opacity-90'
                      }`}
                    >
                      {section.buttonText}
                      <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Decorative elements */}
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-1 theme-gradient rounded-full"></div>
                  <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="w-4 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
