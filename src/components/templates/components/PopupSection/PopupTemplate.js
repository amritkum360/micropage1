'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';

export default function PopupTemplate({ section }) {
  const [isOpen, setIsOpen] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // If it's already just an ID (no URL)
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return url;
    }
    
    // Extract from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Handle popup opening/closing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === section.popupId) {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      } else {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.body.style.overflow = 'unset';
    };
  }, [section.popupId]);

  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    // Remove hash from URL
    window.history.pushState({}, document.title, window.location.pathname);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && section.closeOnBackdropClick !== false) {
      closePopup();
    }
  };

  const handleButtonClick = (buttonLink) => {
    if (buttonLink) {
      if (buttonLink.startsWith('mailto:') || buttonLink.startsWith('tel:')) {
        window.location.href = buttonLink;
      } else if (buttonLink.startsWith('#')) {
        // Internal link - close popup and navigate
        closePopup();
        setTimeout(() => {
          window.location.hash = buttonLink;
        }, 100);
      } else {
        // External link
        window.open(buttonLink, '_blank');
      }
    }
  };

  const getButtonStyleClasses = (style) => {
    switch (style) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700';
      case 'warning':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      default:
        return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800';
    }
  };

  if (!section.popupId) return null;

  const getSizeClasses = () => {
    switch (section.size) {
      case 'small':
        return 'max-w-sm md:max-w-md';
      case 'large':
        return 'max-w-4xl lg:max-w-5xl';
      case 'fullscreen':
        return 'max-w-full h-full m-0 rounded-none';
      default:
        return 'max-w-2xl lg:max-w-3xl';
    }
  };

  return (
    <>
      {/* Popup Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#dbe2c380] bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleBackdropClick}
        >
          {/* Popup Content */}
          <div className={`bg-white rounded-xl shadow-2xl w-full ${getSizeClasses()} max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300`}>
            {/* Close Button */}
            {section.showCloseButton !== false && (
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}

            {/* Popup Content */}
            <div className="p-6">
              {/* YouTube Video or Image */}
              {section.youtubeVideo ? (
                <div className="mb-6">
                  <div className="w-full h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(section.youtubeVideo)}`}
                      title={section.title || 'YouTube video'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              ) : section.image ? (
                <div className="mb-6">
                  <div className="w-full h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={section.image.url || section.image}
                      alt={section.title || 'Popup image'}
                      width={600}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : null}

              {/* Title */}
              {section.title && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                  {section.title}
                </h2>
              )}

              {/* Subtitle */}
              {section.subtitle && (
                <h3 className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 text-center font-medium">
                  {section.subtitle}
                </h3>
              )}

              {/* Description */}
              {section.description && (
                <div className="text-gray-700 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
                  {section.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-3 text-base md:text-lg">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* Buttons */}
              {(section.buttons && section.buttons.length > 0) ? (
                <div className="flex flex-wrap justify-center gap-3">
                  {section.buttons.map((button, index) => (
                    button.text && (
                      <button
                        key={button.id || index}
                        onClick={() => handleButtonClick(button.link)}
                        className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${getButtonStyleClasses(button.style)}`}
                      >
                        {button.text}
                        {button.link && !button.link.startsWith('#') && (
                          <ExternalLink className="w-4 h-4 ml-2" />
                        )}
                      </button>
                    )
                  ))}
                </div>
              ) : section.buttonText ? (
                // Fallback for old single button format
                <div className="flex justify-center">
                  <button
                    onClick={() => handleButtonClick(section.buttonLink)}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {section.buttonText}
                    {section.buttonLink && !section.buttonLink.startsWith('#') && (
                      <ExternalLink className="w-5 h-5 ml-2" />
                    )}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
