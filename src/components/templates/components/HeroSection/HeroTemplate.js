'use client';

import React from 'react';
import { getImageSrc } from '@/utils/imageUtils';

export default function HeroTemplate({ section }) {
  // Get background image source for display
  const backgroundImageSrc = getImageSrc(section.backgroundImage);
  
  // Debug logging
  console.log('🖼️ HeroTemplate - Background image data:', section.backgroundImage);
  console.log('🖼️ HeroTemplate - Resolved background image source:', backgroundImageSrc);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden" role="banner" aria-label="Hero Section">
      {backgroundImageSrc && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImageSrc})` }}
        />
      )}
      <div 
        className={`absolute inset-0 ${backgroundImageSrc ? 'bg-black' : 'theme-gradient opacity-20'}`}
        style={backgroundImageSrc ? { opacity: `${section.backgroundOpacity || 40}%` } : {}}
      ></div>
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
            {section.title}
            {section.subtitle && (
              <span className="theme-accent block mt-2 sm:mt-3">{section.subtitle}</span>
            )}
          </h2>
          {section.description && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
          {section.ctaButtons && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
              {section.ctaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.link}
                  className={`w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3 md:py-4 rounded-full font-bold text-base sm:text-lg md:text-xl transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2 md:space-x-3 min-h-[48px] sm:min-h-[52px] ${
                    button.primary 
                      ? 'text-white hover:opacity-90 hover:shadow-lg' 
                      : 'bg-white text-gray-800 hover:bg-gray-100 hover:shadow-white/50'
                  }`}
                  style={button.primary ? { backgroundColor: 'var(--primary-color, #3B82F6)' } : {}}
                >
                  <span>{button.text}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
