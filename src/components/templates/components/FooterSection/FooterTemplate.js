'use client';

import React from 'react';

export default function FooterTemplate({ section }) {
  const getBackgroundClass = () => {
    switch (section.backgroundColor) {
      case 'darker':
        return 'bg-black';
      case 'blue':
        return 'bg-blue-900';
      case 'custom':
        return 'bg-gray-900'; // You can customize this further
      default:
        return 'bg-gray-900';
    }
  };

  return (
    <footer className={`${getBackgroundClass()} text-white py-8 sm:py-10 md:py-12 px-4`} role="contentinfo" id='footer'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-10">
            {/* Company Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">About Us</h3>
              {section.description ? (
                <p className="text-gray-300 text-sm leading-relaxed">{section.description}</p>
              ) : (
                <p className="text-gray-300 text-sm leading-relaxed">
                  We are dedicated to providing exceptional services and creating meaningful connections with our customers.
                </p>
              )}
            </div>

            {/* Quick Links */}
            {section.links && section.links.length > 0 && (
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Quick Links</h3>
                <div className="space-y-3">
                  {section.links.slice(0, 4).map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="block text-gray-300 hover:text-white transition-colors text-sm hover:underline"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                {section.contactTitle || 'Contact Info'}
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                {section.contactDescription ? (
                  <p>{section.contactDescription}</p>
                ) : (
                  <>
                    <p>Get in touch with us for any questions or inquiries.</p>
                    <p>We are here to help you succeed.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {/* Copyright */}
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-sm">
                  {section.copyright || '© 2024 Your Business Name. All rights reserved.'}
                </p>
              </div>

              {/* Footer Links */}
              {section.links && section.links.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6">
                  {section.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
