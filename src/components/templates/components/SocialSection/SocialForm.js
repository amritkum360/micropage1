'use client';

import React from 'react';

export default function SocialForm({ section, onInputChange, sectionKey = 'social' }) {
  const socialPlatforms = [
    { name: 'Facebook', icon: 'facebook', placeholder: 'https://facebook.com/your-page' },
    { name: 'Instagram', icon: 'instagram', placeholder: 'https://instagram.com/your-profile' },
    { name: 'Twitter', icon: 'twitter', placeholder: 'https://twitter.com/your-handle' },
    { name: 'LinkedIn', icon: 'linkedin', placeholder: 'https://linkedin.com/company/your-company' },
    { name: 'YouTube', icon: 'youtube', placeholder: 'https://youtube.com/your-channel' },
    { name: 'WhatsApp', icon: 'whatsapp', placeholder: 'https://wa.me/1234567890' },
    { name: 'TikTok', icon: 'tiktok', placeholder: 'https://tiktok.com/@your-username' },
    { name: 'Telegram', icon: 'telegram', placeholder: 'https://t.me/your-username' },
    { name: 'Discord', icon: 'discord', placeholder: 'https://discord.gg/your-server' },
    { name: 'Snapchat', icon: 'snapchat', placeholder: 'your-snapchat-username' }
  ];

  const updatePlatform = (icon, field, value) => {
    const platforms = section.platforms || [];
    const platformIndex = platforms.findIndex(p => p.icon === icon);
    
    if (platformIndex >= 0) {
      // Update existing platform
      platforms[platformIndex] = { ...platforms[platformIndex], [field]: value };
    } else {
      // Add new platform
      const platform = socialPlatforms.find(p => p.icon === icon);
      platforms.push({ 
        name: platform.name, 
        url: '', 
        icon: icon,
        enabled: false 
      });
    }
    
    onInputChange(sectionKey, 'platforms', platforms);
  };

  const togglePlatform = (icon) => {
    const platforms = section.platforms || [];
    const platformIndex = platforms.findIndex(p => p.icon === icon);
    
    if (platformIndex >= 0) {
      // Platform exists, toggle its enabled state
      platforms[platformIndex].enabled = !platforms[platformIndex].enabled;
    } else {
      // Platform doesn't exist, create it with enabled = true
      const platform = socialPlatforms.find(p => p.icon === icon);
      platforms.push({ 
        name: platform.name, 
        url: '', 
        icon: icon,
        enabled: true 
      });
    }
    
    onInputChange(sectionKey, 'platforms', platforms);
  };

  const getPlatformValue = (icon, field) => {
    const platform = section.platforms?.find(p => p.icon === icon);
    return platform?.[field] || '';
  };

  const isPlatformEnabled = (icon) => {
    const platform = section.platforms?.find(p => p.icon === icon);
    return platform?.enabled || false;
  };

  return (
    <div className="space-y-6">
      {/* Section Visibility Toggle */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Show Social Media Section</label>
          <p className="text-xs text-gray-500">Display the main social media section on the page</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={section.visible !== false}
            onChange={(e) => onInputChange(sectionKey, 'visible', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Sticky Social Media Toggle */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sticky Social Media Bar</label>
          <p className="text-xs text-gray-500">Show floating social media buttons on the right side</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={section.sticky !== false}
            onChange={(e) => onInputChange(sectionKey, 'sticky', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Section Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Section Title</label>
          <input
            type="text"
            value={section.title || ''}
            onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Follow Us"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Section Subtitle</label>
          <input
            type="text"
            value={section.subtitle || ''}
            onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Stay Connected"
          />
        </div>
      </div>

      {/* Social Media Platforms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Social Media Platforms</label>
        <div className="space-y-3">
          {socialPlatforms.map((platform) => (
            <div key={platform.icon} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPlatformEnabled(platform.icon)}
                      onChange={() => togglePlatform(platform.icon)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                </div>
              </div>
              
              {isPlatformEnabled(platform.icon) && (
                <input
                  type="url"
                  value={getPlatformValue(platform.icon, 'url')}
                  onChange={(e) => updatePlatform(platform.icon, 'url', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={platform.placeholder}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Instructions:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Toggle each platform on/off to show/hide it</li>
          <li>• Enter the full URL for each social media profile</li>
          <li>• The main section will appear on the page if enabled</li>
          <li>• Sticky social media bar will show floating buttons on the right side</li>
        </ul>
      </div>
    </div>
  );
}
