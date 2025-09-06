'use client';

import React, { useState } from 'react';

export default function ThemeForm({ section, onInputChange, sectionKey = 'theme' }) {
  const [showCustomColors, setShowCustomColors] = useState(false);
  
  const themes = [
    {
      id: 'default',
      name: 'Default',
      description: 'Blue & Purple Theme',
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#a540f7'
      }
    },
    {
      id: 'yellow',
      name: 'Yellow',
      description: 'Warm & Energetic',
      colors: {
        primary: '#F59E0B',
        secondary: '#F97316',
        accent: '#EF4444'
      }
    },
    {
      id: 'pink',
      name: 'Pink',
      description: 'Modern & Elegant',
      colors: {
        primary: '#EC4899',
        secondary: '#8B5CF6',
        accent: '#F59E0B'
      }
    },
    {
      id: 'green',
      name: 'Green',
      description: 'Fresh & Natural',
      colors: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#F59E0B'
      }
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Choose Your Own Colors',
      colors: {
        primary: section.primaryColor || '#3B82F6',
        secondary: section.secondaryColor || '#8B5CF6',
        accent: section.accentColor || '#F59E0B'
      }
    }
  ];

  const handleThemeChange = (themeId) => {
    const selectedTheme = themes.find(theme => theme.id === themeId);
    if (selectedTheme) {
      onInputChange(sectionKey, 'selectedTheme', themeId);
      if (themeId !== 'custom') {
        onInputChange(sectionKey, 'primaryColor', selectedTheme.colors.primary);
        onInputChange(sectionKey, 'secondaryColor', selectedTheme.colors.secondary);
        onInputChange(sectionKey, 'accentColor', selectedTheme.colors.accent);
      }
      setShowCustomColors(themeId === 'custom');
    }
  };

  const handleCustomColorChange = (colorType, value) => {
    onInputChange(sectionKey, colorType, value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Choose Theme</label>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                (section.selectedTheme || 'default') === theme.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Theme Preview */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: theme.colors.secondary }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: theme.colors.accent }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 block truncate">{theme.name}</span>
              </div>
              
              <p className="text-xs text-gray-600 text-left">{theme.description}</p>
              
              {/* Selected Indicator */}
              {(section.selectedTheme || 'default') === theme.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Picker */}
      {showCustomColors && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <span className="mr-2">🎨</span>
            Custom Color Palette
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-600 w-20">Primary:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={section.primaryColor || '#3B82F6'}
                  onChange={(e) => handleCustomColorChange('primaryColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-500 font-mono">
                  {section.primaryColor || '#3B82F6'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-600 w-20">Secondary:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={section.secondaryColor || '#8B5CF6'}
                  onChange={(e) => handleCustomColorChange('secondaryColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-500 font-mono">
                  {section.secondaryColor || '#8B5CF6'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-600 w-20">Accent:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={section.accentColor || '#F59E0B'}
                  onChange={(e) => handleCustomColorChange('accentColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-500 font-mono">
                  {section.accentColor || '#F59E0B'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-white rounded border">
            <p className="text-xs text-gray-600">
              <strong>Preview:</strong> Your custom colors will be applied to buttons, links, and highlights throughout your page.
            </p>
          </div>
        </div>
      )}

      {/* Current Theme Info */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Theme</h4>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
              style={{ backgroundColor: section.primaryColor || '#3B82F6' }}
            ></div>
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
              style={{ backgroundColor: section.secondaryColor || '#8B5CF6' }}
            ></div>
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
              style={{ backgroundColor: section.accentColor || '#F59E0B' }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">
            {(section.selectedTheme || 'default') === 'custom' 
              ? 'Custom Theme' 
              : themes.find(t => t.id === (section.selectedTheme || 'default'))?.name || 'Default'} Theme
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
        <p className="font-medium mb-1">💡 Theme Tips:</p>
        <ul className="space-y-1">
          <li>• <strong>Default:</strong> Professional blue theme for business websites</li>
          <li>• <strong>Yellow:</strong> Energetic and attention-grabbing</li>
          <li>• <strong>Pink:</strong> Modern and trendy for creative businesses</li>
          <li>• <strong>Green:</strong> Natural and trustworthy for eco-friendly brands</li>
          <li>• <strong>Custom:</strong> Create your own unique color scheme</li>
        </ul>
      </div>
    </div>
  );
}
