'use client';

import { useState } from 'react';
import { defaultUniversalData } from './defaultData';

export default function useTemplateBuilder({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      // Merge initial data with default data to ensure all sections exist
      const mergedData = { ...defaultUniversalData, ...initialData };
      console.log('Initializing form data with:', mergedData);
      return mergedData;
    }
    return defaultUniversalData;
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Initialize window.currentFormData for global access
  if (typeof window !== 'undefined') {
    window.currentFormData = window.currentFormData || formData;
  }
  
  // Define the default section order
  const [sectionOrder, setSectionOrder] = useState(
    initialData?.sectionOrder || [
      'header',
      'hero',
      'about',
      'portfolio',
      'services',
      'testimonials',
      'skills',
      'achievements',
      'gallery',
      'stats',
      'blog',
      'downloadables',
      'faq',
      'pricing',
      'cta',
      'social',
      'contact',
      'footer'
    ]
  );

  const handleInputChange = (section, field, value) => {
    console.log('useTemplateBuilder - handleInputChange called:', { section, field, value });
    
    // Handle sectionOrder updates
    if (section === 'sectionOrder') {
      setSectionOrder(value);
      return;
    }
    
    setFormData(prev => {
      let newFormData;
      
      // Handle basic info fields (businessName, tagline, logo, favicon, subdomain)
      if (['businessName', 'tagline', 'logo', 'favicon', 'subdomain'].includes(section)) {
        console.log('useTemplateBuilder - updating basic field:', section, 'with value:', value);
        newFormData = {
          ...prev,
          [section]: value
        };
      } else {
        // Handle nested section fields
        console.log('useTemplateBuilder - updating nested field:', section, field, 'with value:', value);
        newFormData = {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      }
      
      // Update window.currentFormData for global access
      if (typeof window !== 'undefined') {
        window.currentFormData = newFormData;
        console.log('useTemplateBuilder - updated window.currentFormData:', window.currentFormData);
      }
      
      return newFormData;
    });
  };

  const handleToggleSection = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        visible: !prev[section].visible
      }
    }));
  };

  const handleSave = () => {
    // Include sectionOrder in the data to be saved
    const dataToSave = {
      ...formData,
      sectionOrder: sectionOrder
    };
    onSave(dataToSave);
  };

  // Reorder functions
  const moveSectionUp = (sectionKey) => {
    setSectionOrder(prev => {
      const currentIndex = prev.indexOf(sectionKey);
      if (currentIndex <= 0) return prev; // Already at top
      
      const newOrder = [...prev];
      [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
      return newOrder;
    });
  };

  const moveSectionDown = (sectionKey) => {
    setSectionOrder(prev => {
      const currentIndex = prev.indexOf(sectionKey);
      if (currentIndex === -1 || currentIndex >= prev.length - 1) return prev; // Already at bottom
      
      const newOrder = [...prev];
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      return newOrder;
    });
  };

  const reorderSections = (draggedSectionKey, targetSectionKey) => {
    setSectionOrder(prev => {
      const draggedIndex = prev.indexOf(draggedSectionKey);
      const targetIndex = prev.indexOf(targetSectionKey);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newOrder = [...prev];
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedSectionKey);
      return newOrder;
    });
  };

  return {
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
  };
}
