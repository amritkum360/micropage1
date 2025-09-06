'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getImageSrc } from '@/utils/imageUtils';

export default function HeaderTemplate({ section, businessName, tagline }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Get logo source for display
  const logoSrc = getImageSrc(section.logo);
  
  // Debug logging
  console.log('🖼️ HeaderTemplate - Logo data:', section.logo);
  console.log('🖼️ HeaderTemplate - Resolved logo source:', logoSrc);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-xl sticky top-0 z-40" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Business Name */}
          <div className="flex items-center space-x-4">
            {logoSrc && (
              <img 
                src={logoSrc} 
                alt={businessName} 
                className="w-10 h-10 md:w-12 md:h-12 object-contain" 
              />
            )}
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800">{businessName}</h1>
              {tagline && (
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">{tagline}</p>
              )}
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {section.navigation?.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-gray-700 hover:theme-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            {section.ctaButtons?.map((button, index) => (
              <a
                key={index}
                href={button.link}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  button.primary 
                    ? 'text-white hover:opacity-90' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={button.primary ? { backgroundColor: 'var(--primary-color, #3B82F6)' } : {}}
              >
                {button.text}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-4">
              {/* Mobile Navigation */}
              {section.navigation?.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="block text-gray-700 hover:theme-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-2 pt-2">
                {section.ctaButtons?.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`px-4 py-3 rounded-lg transition-colors font-medium text-center ${
                      button.primary 
                        ? 'text-white hover:opacity-90' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={button.primary ? { backgroundColor: 'var(--primary-color, #3B82F6)' } : {}}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
