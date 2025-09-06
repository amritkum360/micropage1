'use client';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, EyeIcon, EyeSlashIcon, ChevronUpIcon, ChevronDownIcon as ChevronDownIconSolid } from '@heroicons/react/24/outline';

// Import section-specific form components
import HeaderForm from './components/HeaderSection/HeaderForm';
import HeroForm from './components/HeroSection/HeroForm';
import AboutForm from './components/AboutSection/AboutForm';
import PortfolioForm from './components/PortfolioSection/PortfolioForm';
import ServicesForm from './components/ServicesSection/ServicesForm';
import TestimonialsForm from './components/TestimonialsSection/TestimonialsForm';
import SkillsForm from './components/SkillsSection/SkillsForm';
import AchievementsForm from './components/AchievementsSection/AchievementsForm';
import GalleryForm from './components/GallerySection/GalleryForm';
import StatsForm from './components/StatsSection/StatsForm';
import BlogForm from './components/BlogSection/BlogForm';
import DownloadablesForm from './components/DownloadablesSection/DownloadablesForm';
import FAQForm from './components/FAQSection/FAQForm';
import PricingForm from './components/PricingSection/PricingForm';
import CTAForm from './components/CTASection/CTAForm';
import ContactForm from './components/ContactSection/ContactForm';
import SocialForm from './components/SocialSection/SocialForm';
import FooterForm from './components/FooterSection/FooterForm';
import ThemeForm from './components/ThemeSection/ThemeForm';
import CustomSectionForm from './components/CustomSection/CustomSectionForm';
import CodeSectionForm from './components/CodeSection/CodeSectionForm';
import AISectionForm from './components/AISection/AISectionForm';
import PopupForm from './components/PopupSection/PopupForm';
import { defaultUniversalData } from './TemplateBuilderComponents/defaultData';

export default function UniversalForm({ data, sectionOrder, onInputChange, onToggleSection, moveSectionUp, moveSectionDown, reorderSections }) {
  const [openSection, setOpenSection] = React.useState('basic-info');
  const [draggedSection, setDraggedSection] = React.useState(null);
  
  const sections = [
    { key: 'header', name: 'Top Bar (Header)', color: 'blue' },
    { key: 'hero', name: 'Hero Section', color: 'purple' },
    { key: 'about', name: 'About Me / Us', color: 'green' },
    { key: 'portfolio', name: 'Portfolio / Work', color: 'yellow' },
    { key: 'services', name: 'Services / Products', color: 'orange' },
    { key: 'testimonials', name: 'Testimonials / Reviews', color: 'red' },
    { key: 'skills', name: 'Skills / Expertise', color: 'teal' },
    { key: 'achievements', name: 'Achievements / Awards', color: 'cyan' },
    { key: 'gallery', name: 'Photos & Videos', color: 'pink' },
    { key: 'stats', name: 'Stats / Numbers', color: 'cyan' },
    { key: 'blog', name: 'Blog / Articles', color: 'emerald' },
    { key: 'downloadables', name: 'Downloadables', color: 'violet' },
    { key: 'faq', name: 'FAQ (Common Questions)', color: 'amber' },
    { key: 'pricing', name: 'Pricing / Packages', color: 'rose' },
    { key: 'cta', name: 'Call to Action Banner', color: 'lime' },
    { key: 'social', name: 'Social Media', color: 'sky' },
    { key: 'contact', name: 'Contact', color: 'emerald' },
    { key: 'popup', name: 'Popup', color: 'indigo' },
    { key: 'footer', name: 'Bottombar', color: 'indigo' }
  ];

  const handleDragStart = (e, sectionKey) => {
    setDraggedSection(sectionKey);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Add visual feedback for drop target
    const targetElement = e.currentTarget;
    if (targetElement && draggedSection) {
      targetElement.style.borderTop = '2px solid #3B82F6';
    }
  };

  const handleDrop = (e, targetSectionKey) => {
    e.preventDefault();
    
    // Remove visual feedback
    const targetElement = e.currentTarget;
    if (targetElement) {
      targetElement.style.borderTop = '';
    }
    
    if (draggedSection && draggedSection !== targetSectionKey && reorderSections) {
      reorderSections(draggedSection, targetSectionKey);
    }
    setDraggedSection(null);
  };

  const handleDragEnd = () => {
    // Remove any remaining visual feedback
    const elements = document.querySelectorAll('[draggable="true"]');
    elements.forEach(el => {
      el.style.borderTop = '';
    });
    setDraggedSection(null);
  };

  const getColorClasses = (color) => {
    // Neutral color scheme: white, light blue, dark blue for fonts, gray
    const colors = {
      blue: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      purple: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      green: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      yellow: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      indigo: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      pink: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      orange: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      red: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      teal: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      cyan: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      emerald: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      violet: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      amber: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      rose: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      lime: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      sky: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus-visible:ring-blue-500',
      slate: 'bg-gray-50 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500',
      gray: 'bg-gray-50 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500'
    };
    return colors[color] || colors.blue;
  };

  const renderSectionToggle = (section, sectionKey) => {
    const currentIndex = sectionOrder.indexOf(sectionKey);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === sectionOrder.length - 1;
    
    // Check if this is a duplicate section (has numeric suffix)
    const isDuplicate = /_\d+$/.test(sectionKey);
    const baseSectionKey = isDuplicate ? sectionKey.replace(/_\d+$/, '') : sectionKey;
    const sectionNumber = isDuplicate ? sectionKey.split('_').pop() : '';
    
    return (
      <div 
        key={sectionKey}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, sectionKey)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, sectionKey)}
        onDragEnd={handleDragEnd}
        className={`rounded-lg ${draggedSection === sectionKey ? 'opacity-50' : ''}`}
      >
        <div
          onClick={() => setOpenSection(openSection === sectionKey ? null : sectionKey)}
          className={`flex w-full justify-between rounded-lg px-3 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 cursor-pointer ${getColorClasses(section.color)}`}
          suppressHydrationWarning={true}
        >
          {/* Left Side - Drag Handle */}
          <div className="flex items-center space-x-2">
            <div 
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
              title="Drag to reorder"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 6a2 2 0 11-4 0 2 2 0 014 0zM8 12a2 2 0 11-4 0 2 2 0 014 0zM8 18a2 2 0 11-4 0 2 2 0 014 0zM20 6a2 2 0 11-4 0 2 2 0 014 0zM20 12a2 2 0 11-4 0 2 2 0 014 0zM20 18a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span>
              {section.name}
              {isDuplicate && (
                <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                  #{sectionNumber}
                </span>
              )}
            </span>
            <span 
              onClick={(e) => {
                e.stopPropagation();
                onToggleSection(sectionKey);
              }}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {data[sectionKey]?.visible === false ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {/* Delete Button - Only for duplicate sections */}
            {isDuplicate && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Are you sure you want to delete "${section.name} #${sectionNumber}"?`)) {
                    // Remove section from data
                    const newData = { ...data };
                    delete newData[sectionKey];
                    onInputChange(sectionKey, '', null);
                    
                    // Remove from section order
                    const newSectionOrder = sectionOrder.filter(key => key !== sectionKey);
                    onInputChange('sectionOrder', '', newSectionOrder);
                    
                    // Close section if it's currently open
                    if (openSection === sectionKey) {
                      setOpenSection(null);
                    }
                  }
                }}
                className="p-1 rounded hover:bg-red-100 transition-colors text-red-500 hover:text-red-700"
                title="Delete Section"
                suppressHydrationWarning={true}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            {/* Reorder Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveSectionUp(sectionKey);
              }}
              disabled={isFirst}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
              title="Move Up"
              suppressHydrationWarning={true}
            >
              <ChevronUpIcon className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveSectionDown(sectionKey);
              }}
              disabled={isLast}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
              title="Move Down"
              suppressHydrationWarning={true}
            >
              <ChevronDownIconSolid className="w-3 h-3" />
            </button>
            {/* Expand/Collapse Icon */}
            <ChevronDownIcon
              className={`${
                openSection === sectionKey ? 'transform rotate-180' : ''
              } w-4 h-4 transition-transform duration-200`}
            />
          </div>
        </div>
        {openSection === sectionKey && (
          <div className="px-3 pb-3 pt-2 text-sm text-gray-500">
            {renderSectionContent(sectionKey)}
          </div>
        )}
      </div>
    );
  };

  const renderSectionContent = (sectionKey) => {
    const section = data[sectionKey];
    if (!section) return null;

    // Handle duplicate sections by mapping to base section type
    const baseSectionKey = sectionKey.replace(/_\d+$/, '');
    
    switch (baseSectionKey) {
      case 'header':
        return <HeaderForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'hero':
        return <HeroForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'about':
        return <AboutForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'portfolio':
        return <PortfolioForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'services':
        return <ServicesForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'testimonials':
        return <TestimonialsForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'skills':
        return <SkillsForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'achievements':
        return <AchievementsForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'gallery':
        return <GalleryForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'stats':
        return <StatsForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'blog':
        return <BlogForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'downloadables':
        return <DownloadablesForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'faq':
        return <FAQForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'pricing':
        return <PricingForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'cta':
        return <CTAForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'contact':
        return <ContactForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'social':
        return <SocialForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'footer':
        return <FooterForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'popup':
        return <PopupForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      case 'theme':
        return <ThemeForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} />;
      default:
        // Check if it's a custom section
        if (sectionKey.startsWith('customSection_')) {
          return <CustomSectionForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} isOpen={openSection === sectionKey} />;
        }
        // Check if it's a code section
        if (sectionKey.startsWith('codeSection_')) {
          return <CodeSectionForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} isOpen={openSection === sectionKey} />;
        }
        // Check if it's an AI section
        if (sectionKey.startsWith('aiSection_')) {
          return <AISectionForm section={section} onInputChange={onInputChange} sectionKey={sectionKey} isOpen={openSection === sectionKey} />;
        }
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={section.title || ''}
                onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`${sections.find(s => s.key === baseSectionKey)?.name} Title`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={section.subtitle || ''}
                onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`${sections.find(s => s.key === baseSectionKey)?.name} Subtitle`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={section.description || ''}
                onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`${sections.find(s => s.key === baseSectionKey)?.name} description...`}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* Basic Info Section */}
      <div>
        <button
          onClick={() => setOpenSection(openSection === 'basic-info' ? null : 'basic-info')}
          className={`flex w-full justify-between rounded-lg px-3 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 ${getColorClasses('blue')}`}
          suppressHydrationWarning={true}
        >
          <span>Basic Info</span>
          <ChevronDownIcon
            className={`${
              openSection === 'basic-info' ? 'transform rotate-180' : ''
            } w-4 h-4 text-blue-500 transition-transform duration-200`}
          />
        </button>
        {openSection === 'basic-info' && (
          <div className="px-3 pb-3 pt-2 text-sm text-gray-500">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={data.businessName || ''}
                  onChange={(e) => onInputChange('businessName', '', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Business Name"
                  suppressHydrationWarning={true}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={data.tagline || ''}
                  onChange={(e) => onInputChange('tagline', '', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Tagline or Slogan"
                  suppressHydrationWarning={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Theme Section */}
      <div>
        <button
          onClick={() => setOpenSection(openSection === 'theme' ? null : 'theme')}
          className={`flex w-full justify-between rounded-lg px-3 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 ${getColorClasses('slate')}`}
          suppressHydrationWarning={true}
        >
          <span>Theme</span>
          <ChevronDownIcon
            className={`${
              openSection === 'theme' ? 'transform rotate-180' : ''
            } w-4 h-4 text-slate-500 transition-transform duration-200`}
          />
        </button>
        {openSection === 'theme' && (
          <div className="px-3 pb-3 pt-2 text-sm text-gray-500">
            <ThemeForm section={data.theme || {}} onInputChange={onInputChange} />
          </div>
        )}
      </div>

      {/* Add Section Button */}
      <div>
        <button
          onClick={() => setOpenSection(openSection === 'add-section' ? null : 'add-section')}
          className={`flex w-full justify-between rounded-lg px-3 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 ${getColorClasses('green')}`}
          suppressHydrationWarning={true}
        >
          <span>Add Section</span>
          <ChevronDownIcon
            className={`${
              openSection === 'add-section' ? 'transform rotate-180' : ''
            } w-4 h-4 text-green-500 transition-transform duration-200`}
          />
        </button>
        {openSection === 'add-section' && (
          <div className="px-3 pb-3 pt-2 text-sm text-gray-500">
            <div className="space-y-2">
              <p className="text-xs text-gray-600 mb-3">Choose a section to add:</p>

        <button
          onClick={() => {
            const customSectionId = `customSection_${Date.now()}`;
            const newSection = { ...defaultUniversalData.customSection };
            onInputChange(customSectionId, '', newSection);
            const newSectionOrder = [...(sectionOrder || []), customSectionId];
            onInputChange('sectionOrder', '', newSectionOrder);
            setOpenSection(customSectionId);
          }}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 text-blue-700 hover:text-blue-800"
          suppressHydrationWarning={true}
        >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
                <span className="text-sm font-medium">Custom Section</span>
              </button>
              
              {sections.map((section) => {
                // Special handling for popup section - always show as "Used (1)"
                if (section.key === 'popup') {
                  const isUsed = true;
                  const usedCount = 1;
                  
                  return (
                    <button
                      key={section.key}
                      onClick={() => {
                        // Handle popup section - allow duplicates
                        // Find the next available number
                        let nextNumber = 1;
                        const baseKey = section.key;
                        
                        // Check if base section exists
                        if (sectionOrder.includes(baseKey)) {
                          nextNumber = 2;
                        }
                        
                        // Find the highest number for this section type
                        sectionOrder.forEach(key => {
                          if (key.startsWith(`${baseKey}_`)) {
                            const match = key.match(new RegExp(`^${baseKey}_(\\d+)$`));
                            if (match) {
                              const num = parseInt(match[1]);
                              if (num >= nextNumber) {
                                nextNumber = num + 1;
                              }
                            }
                          }
                        });
                        
                        const sectionId = nextNumber === 1 ? baseKey : `${baseKey}_${nextNumber}`;
                        const newSection = { ...defaultUniversalData[section.key] };
                        onInputChange(sectionId, '', newSection);
                        const newSectionOrder = [...(sectionOrder || []), sectionId];
                        onInputChange('sectionOrder', '', newSectionOrder);
                        setOpenSection(sectionId);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200 ${
                        isUsed 
                          ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                      suppressHydrationWarning={true}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getColorClasses(section.color).split(' ')[0]}`}></div>
                        <span className="text-sm font-medium">{section.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isUsed && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            Used ({usedCount})
                          </span>
                        )}
                        {/* <PlusIcon className="w-4 h-4" /> */}
                      </div>
                    </button>
                  );
                }
                
                // Count all sections of this type (including duplicates)
                const existingSections = sectionOrder.filter(key => {
                  if (key === section.key) return true; // Exact match
                  if (key.startsWith(`${section.key}_`)) return true; // Duplicate match
                  return false;
                });
                const isUsed = existingSections.length > 0;
                const usedCount = existingSections.length;
                
                return (
                  <button
                    key={section.key}
                    onClick={() => {
                      if (section.key === 'customSection') {
                        // Handle custom section
                        const customSectionId = `customSection_${Date.now()}`;
                        const newSection = { ...defaultUniversalData.customSection };
                        onInputChange(customSectionId, '', newSection);
                        const newSectionOrder = [...(sectionOrder || []), customSectionId];
                        onInputChange('sectionOrder', '', newSectionOrder);
                        setOpenSection(customSectionId);
                      } else {
                        // Handle regular sections - allow duplicates
                        // Find the next available number
                        let nextNumber = 1;
                        const baseKey = section.key;
                        
                        // Check if base section exists
                        if (sectionOrder.includes(baseKey)) {
                          nextNumber = 2;
                        }
                        
                        // Find the highest number for this section type
                        sectionOrder.forEach(key => {
                          if (key.startsWith(`${baseKey}_`)) {
                            const match = key.match(new RegExp(`^${baseKey}_(\\d+)$`));
                            if (match) {
                              const num = parseInt(match[1]);
                              if (num >= nextNumber) {
                                nextNumber = num + 1;
                              }
                            }
                          }
                        });
                        
                        const sectionId = nextNumber === 1 ? baseKey : `${baseKey}_${nextNumber}`;
                        const newSection = { ...defaultUniversalData[section.key] };
                        onInputChange(sectionId, '', newSection);
                        const newSectionOrder = [...(sectionOrder || []), sectionId];
                        onInputChange('sectionOrder', '', newSectionOrder);
                        setOpenSection(sectionId);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200 ${
                      isUsed 
                        ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100' 
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    suppressHydrationWarning={true}
                  >
                    <span className="text-sm font-medium">{section.name}</span>
                    {isUsed && (
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                        Used ({usedCount})
                      </span>
                    )}
        </button>
                );
              })}
              
            </div>
          </div>
        )}
      </div>

      {/* Add Section by Code Button */}
      {/* <div>
        <button
          onClick={() => {
            const codeSectionId = `codeSection_${Date.now()}`;
            // Use default data from defaultData.js
            const newSection = { ...defaultUniversalData.codeSection };
            onInputChange(codeSectionId, '', newSection);
            // Add to section order
            const newSectionOrder = [...(sectionOrder || []), codeSectionId];
            onInputChange('sectionOrder', '', newSectionOrder);
            setOpenSection(codeSectionId);
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50 hover:bg-purple-100 hover:border-purple-400 transition-all duration-200 text-purple-600 hover:text-purple-700"
          suppressHydrationWarning={true}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="text-sm font-medium">Add Section by Code</span>
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Add custom sections with your own HTML, CSS, and JavaScript code
        </p>
      </div> */}

      {/* Add Section by AI Button */}
      {/* <div>
        <button
          onClick={() => {
            const aiSectionId = `aiSection_${Date.now()}`;
            // Use default data from defaultData.js
            const newSection = { ...defaultUniversalData.aiSection };
            onInputChange(aiSectionId, '', newSection);
            // Add to section order
            const newSectionOrder = [...(sectionOrder || []), aiSectionId];
            onInputChange('sectionOrder', '', newSectionOrder);
            setOpenSection(aiSectionId);
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 text-blue-600 hover:text-blue-700"
          suppressHydrationWarning={true}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-sm font-medium">Add Section by AI</span>
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Describe your section and let AI generate the code for you
        </p>
      </div> */}

      {/* Section Toggles */}
      {sectionOrder.map((sectionKey) => {
        // Handle custom sections
        if (sectionKey.startsWith('customSection_')) {
          const customSection = {
            key: sectionKey,
            name: data[sectionKey]?.title || 'Custom Section',
            color: 'green'
          };
          return renderSectionToggle(customSection, sectionKey);
        }
        // Handle code sections
        if (sectionKey.startsWith('codeSection_')) {
          const codeSection = {
            key: sectionKey,
            name: data[sectionKey]?.title || 'Code Section',
            color: 'purple'
          };
          return renderSectionToggle(codeSection, sectionKey);
        }
        // Handle AI sections
        if (sectionKey.startsWith('aiSection_')) {
          const aiSection = {
            key: sectionKey,
            name: data[sectionKey]?.title || 'AI Section',
            color: 'blue'
          };
          return renderSectionToggle(aiSection, sectionKey);
        }
        
        // Handle regular sections and their duplicates
        const baseSectionKey = sectionKey.replace(/_\d+$/, '');
        const section = sections.find(s => s.key === baseSectionKey);
        
        if (!section) return null;
        
        return renderSectionToggle(section, sectionKey);
      })}
    </div>
  );
}
