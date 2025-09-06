'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './TemplateBuilderComponents/Sidebar';
import MainContentArea from './TemplateBuilderComponents/MainContentArea';
import TopBar from './TemplateBuilderComponents/TopBar';
import useTemplateBuilder from './TemplateBuilderComponents/useTemplateBuilder';

export default function TemplateBuilder({ onClose, onSave, initialData, isEditMode = false }) {
  const [focusSubdomain, setFocusSubdomain] = React.useState(null);
  const { checkSubdomain } = useAuth();
  const {
    formData,
    sidebarCollapsed,
    setSidebarCollapsed,
    sectionOrder,
    handleInputChange,
    handleToggleSection,
    handleSave,
    moveSectionUp,
    moveSectionDown,
    reorderSections
  } = useTemplateBuilder({ onClose, onSave, initialData });

  // Store current form data globally so it can be accessed from parent component
  useEffect(() => {
    window.currentFormData = {
      ...formData,
      sectionOrder: sectionOrder
    };
  }, [formData, sectionOrder]);

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000; // Default to 1000 if window is not available

  // Automatic optimization for all screen sizes
  const getOptimalStyles = () => {
    if (screenWidth < 850) {
      // Calculate optimal scale based on screen size - more aggressive scaling
      const optimalScale = Math.max(0.35, Math.min(0.8, screenWidth / 850));
      
      // Calculate optimal width to prevent empty space on right side
      const optimalWidth = Math.max(100, Math.min(180, (850 / screenWidth) * 100));
      
      // Calculate optimal height to prevent content cutoff - taller to prevent bottom cutoff
      const optimalHeight = Math.max(150, Math.min(250, (850 / screenWidth) * 150));
      
      return {
        width: `${optimalWidth}vw`,
        transform: `scale(${optimalScale})`,
        transformOrigin: 'top left',
        height: `${optimalHeight}vh`
      };
    }
    return {
      width: '100%',
      transform: 'none',
      transformOrigin: 'top left',
      height: '100vh'
    };
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex z-50 ">
      <div 
        className="flex min-w-[250px]"
        style={{
          minHeight: '100vh',
          ...getOptimalStyles()
        }}
      >
        <Sidebar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          formData={formData}
          sectionOrder={sectionOrder}
          onInputChange={handleInputChange}
          onToggleSection={handleToggleSection}
          onSave={handleSave}
          onClose={onClose}
          moveSectionUp={moveSectionUp}
          moveSectionDown={moveSectionDown}
          reorderSections={reorderSections}
          isEditMode={isEditMode}
          setFocusSubdomain={setFocusSubdomain}
        />
        <div className="flex-1 flex flex-col">
          <TopBar 
            onSave={handleSave} 
            isEditMode={!!initialData} 
            formData={formData} 
            onSubdomainFocus={focusSubdomain}
            onSubdomainChange={(value) => handleInputChange('subdomain', null, value)}
            checkSubdomain={checkSubdomain}
          />
          <div className="flex-1 overflow-hidden">
            <MainContentArea formData={formData} sectionOrder={sectionOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}
