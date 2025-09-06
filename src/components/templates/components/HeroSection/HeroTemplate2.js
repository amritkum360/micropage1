'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroTemplate2({ section }) {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden" style={{ background: `linear-gradient(135deg, #f9fafb, var(--primary-color, #3B82F6) / 10%)` }} role="banner" aria-label="Hero Section">
      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Content on the left */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {section.title}
                {section.subtitle && (
                  <span className="theme-primary block mt-2 sm:mt-3">{section.subtitle}</span>
                )}
              </h2>
              {section.description && (
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {section.description}
                </p>
              )}
              {section.ctaButtons && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  {section.ctaButtons.map((button, index) => (
                    <a
                      key={index}
                      href={button.link}
                      className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 min-h-[48px] sm:min-h-[52px] ${
                        button.primary 
                          ? 'text-white hover:shadow-lg' 
                          : 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-gray-200/50 border-2 border-gray-200'
                      }`}
                      style={button.primary ? { backgroundColor: 'var(--primary-color, #3B82F6)' } : {}}
                    >
                      <span>{button.text}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Image on the right */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              {section.backgroundImage ? (
                <div className="relative">
                  <div 
                    className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl"
                    style={{ 
                      borderRadius: section.imageBorderRadius ? `${section.imageBorderRadius}%` : '50%'
                    }}
                  >
                    <Image
                      src={section.backgroundImage}
                      alt="Hero Image"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100" style={{display: 'none'}}>
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl md:text-6xl mb-2">👤</div>
                        <div className="text-xs sm:text-sm">Profile Image</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full opacity-50 theme-primary-bg"></div>
                  <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full opacity-50 theme-secondary-bg"></div>
                </div>
              ) : (
                <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center shadow-2xl theme-gradient">
                  <div className="text-center text-gray-500 px-4">
                    <div className="text-6xl sm:text-7xl md:text-8xl mb-3 sm:mb-4">👤</div>
                    <div className="text-base sm:text-lg font-medium">Add Profile Image</div>
                    <div className="text-xs sm:text-sm">Upload your photo here</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
