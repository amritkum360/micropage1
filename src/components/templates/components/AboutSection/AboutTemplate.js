'use client';

import React from 'react';

export default function AboutTemplate({ section }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4" style={{ background: `linear-gradient(135deg, var(--primary-color, #3B82F6) / 5%, var(--secondary-color, #8B5CF6) / 5%, var(--accent-color, #F59E0B) / 5%)` }} role="region" aria-label="About Us" id='about'>
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-block p-2 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'var(--primary-color, #3B82F6) / 20%' }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center theme-primary-bg">
                <span className="text-white text-lg sm:text-xl font-bold">ℹ</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              {section.title}
            </h3>
            {section.subtitle && (
              <div className="inline-block px-4 sm:px-6 py-2 text-white rounded-full text-base sm:text-lg font-semibold mb-4 sm:mb-6 theme-gradient">
                {section.subtitle}
              </div>
            )}
            {section.description && (
              <div className="max-w-3xl mx-auto px-4">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  {section.description}
                </p>
              </div>
            )}
          </div>

          {/* Features Section */}
          {section.features && section.features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {section.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 mx-auto theme-gradient">
                    <span className="text-white text-lg sm:text-2xl font-bold">✓</span>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{feature.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Section (if no features) */}
          {(!section.features || section.features.length === 0) && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 theme-gradient">
                  <span className="text-white text-2xl sm:text-3xl font-bold">★</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Why Choose Us?</h4>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  We are dedicated to providing exceptional service and innovative solutions to meet your needs.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
