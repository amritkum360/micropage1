'use client';

import React from 'react';

export default function CustomSectionTemplate3({ section }) {
  if (!section || section.visible === false) return null;

  const getGradientClass = (gradientStyle) => {
    const gradients = {
      'indigo-pink': 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600',
      'blue-purple': 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600',
      'green-blue': 'bg-gradient-to-br from-green-600 via-teal-600 to-blue-600',
      'purple-pink': 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
      'slate-gray': 'bg-gradient-to-br from-slate-700 via-gray-700 to-slate-800',
      'theme': 'theme-gradient'
    };
    return gradients[gradientStyle] || 'theme-gradient';
  };

  const getBannerHeight = (height) => {
    const heights = {
      'small': 'h-80',
      'medium': 'h-96',
      'large': 'h-[500px]',
      'extra-large': 'h-[600px]'
    };
    return heights[height] || 'h-96';
  };

  const gradientClass = getGradientClass(section.gradientStyle);
  const bannerHeight = getBannerHeight(section.bannerHeight);

  return (
    <section className={`${bannerHeight} ${gradientClass} relative overflow-hidden flex items-center justify-center`} role="region" aria-label={section.title}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div className="space-y-8">
          {/* Title */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl">
              {section.title || 'Welcome to Your Platform'}
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-white/80 to-white/40 rounded-full"></div>
          </div>
          
          {/* Subtitle */}
          <div className="relative">
            <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              {section.subtitle || 'Find everything you need to get started and succeed'}
            </p>
          </div>
          
          {/* Description */}
          <div className="relative">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-4xl mx-auto drop-shadow-lg">
              {section.description || 'This is where you can add your custom content. Describe your services, showcase your work, or tell your story. The possibilities are endless with this flexible section.'}
            </p>
          </div>

          {/* Multiple Buttons */}
          {(section.buttons && section.buttons.length > 0) && (
            <div className="pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {section.buttons.map((button, index) => (
                  <a
                    key={button.id || index}
                    href={button.link || '#'}
                    target={button.link?.startsWith('http') ? '_blank' : '_self'}
                    rel={button.link?.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm ${
                      button.style === 'primary'
                        ? 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50'
                        : button.style === 'secondary'
                        ? 'bg-white text-gray-800 border-2 border-white hover:bg-gray-100'
                        : button.style === 'outline'
                        ? 'bg-transparent text-white border-2 border-white/50 hover:bg-white/10 hover:border-white/70'
                        : 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50'
                    }`}
                  >
                    {button.text}
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Fallback for single button (backward compatibility) */}
          {(!section.buttons || section.buttons.length === 0) && section.buttonText && (
            <div className="pt-8">
              <a
                href={section.buttonLink || '#'}
                target={section.buttonLink?.startsWith('http') ? '_blank' : '_self'}
                rel={section.buttonLink?.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`inline-flex items-center px-10 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm ${
                  section.buttonStyle === 'primary'
                    ? 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50'
                    : section.buttonStyle === 'secondary'
                    ? 'bg-white text-gray-800 border-2 border-white hover:bg-gray-100'
                    : section.buttonStyle === 'outline'
                    ? 'bg-transparent text-white border-2 border-white/50 hover:bg-white/10 hover:border-white/70'
                    : 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50'
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
          <div className="flex items-center justify-center space-x-4 pt-8">
            <div className="w-16 h-1 bg-white/60 rounded-full"></div>
            <div className="w-12 h-1 bg-white/40 rounded-full"></div>
            <div className="w-8 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
