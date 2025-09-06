'use client';

import React, { useState, useEffect } from 'react';
import UniversalTemplate from '../UniversalTemplate';

export default function PreviewArea({ formData, sectionOrder, previewStyles }) {
  const [screenWidth, setScreenWidth] = useState(1000);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  const getHeight = () => {
    return screenWidth < 450 ? '250vh' : 'calc(100vh - 80px)';
  };

  return (
    <div 
      className="h-full bg-gray-50 p-6 overflow-y-auto overflow-x-hidden" 
      style={{ 
        height: getHeight(),
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: screenWidth < 450 ? '4rem' : '1.5rem'
      }}
    >
      <div 
        className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 max-w-6xl"
        style={previewStyles}
      >
        <UniversalTemplate data={formData} sectionOrder={sectionOrder} />
      </div>
      {/* Extra bottom spacing for mobile */}
      {screenWidth < 450 && <div className="h-16"></div>}
    </div>
  );
}
