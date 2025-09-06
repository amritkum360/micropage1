'use client';

import React from 'react';

export default function FooterForm({ section, onInputChange, sectionKey = 'footer' }) {
  const addLink = () => {
    const links = section.links || [];
    links.push({ name: 'New Link', url: '' });
    onInputChange(sectionKey, 'links', links);
  };

  const removeLink = (index) => {
    const links = section.links || [];
    links.splice(index, 1);
    onInputChange(sectionKey, 'links', links);
  };

  const updateLink = (index, field, value) => {
    const links = section.links || [];
    links[index] = { ...links[index], [field]: value };
    onInputChange(sectionKey, 'links', links);
  };

  return (
    <div className="space-y-6">
      {/* Footer Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Copyright Text</label>
          <input
            type="text"
            value={section.copyright || ''}
            onChange={(e) => onInputChange(sectionKey, 'copyright', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="© 2024 Your Business Name. All rights reserved."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Footer Description</label>
          <textarea
            value={section.description || ''}
            onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description about your business or website..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Footer Background Color</label>
          <select
            value={section.backgroundColor || 'dark'}
            onChange={(e) => onInputChange(sectionKey, 'backgroundColor', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="dark">Dark (Gray-900)</option>
            <option value="darker">Darker (Black)</option>
            <option value="blue">Blue</option>
            <option value="custom">Custom Color</option>
          </select>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Contact Information</label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Contact Title</label>
            <input
              type="text"
              value={section.contactTitle || ''}
              onChange={(e) => onInputChange(sectionKey, 'contactTitle', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contact Info"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Contact Description</label>
            <textarea
              value={section.contactDescription || ''}
              onChange={(e) => onInputChange(sectionKey, 'contactDescription', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Get in touch with us for any questions or inquiries..."
            />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">Footer Links</label>
          <button
            type="button"
            onClick={addLink}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            + Add Link
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.links || []).map((link, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={link.name || ''}
                  onChange={(e) => updateLink(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Link Name (e.g., Privacy Policy)"
                />
                <input
                  type="url"
                  value={link.url || ''}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Link URL (e.g., #privacy)"
                />
              </div>
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          
          {(!section.links || section.links.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-3 border border-gray-200 rounded-lg">
              No footer links yet. Click Add Link to get started.
            </div>
          )}
        </div>
      </div>

      {/* Quick Add Common Links */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Add Common Links</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Privacy Policy', url: '#privacy' },
            { name: 'Terms of Service', url: '#terms' },
            { name: 'Cookie Policy', url: '#cookies' },
            { name: 'About Us', url: '#about' },
            { name: 'Contact', url: '#contact' },
            { name: 'FAQ', url: '#faq' }
          ].map((commonLink) => {
            const exists = section.links?.some(link => link.name === commonLink.name);
            return (
              <button
                key={commonLink.name}
                type="button"
                onClick={() => {
                  if (!exists) {
                    const links = section.links || [];
                    links.push(commonLink);
                    onInputChange(sectionKey, 'links', links);
                  }
                }}
                disabled={exists}
                className={`px-3 py-2 text-xs rounded transition-colors ${
                  exists 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {exists ? '✓ ' : '+ '}{commonLink.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Footer Tips:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Add important legal pages like Privacy Policy and Terms of Service</li>
          <li>• Include links to key pages like About, Contact, or FAQ</li>
          <li>• Keep the copyright text updated with the current year</li>
          <li>• Use relative URLs (e.g., /privacy) for internal pages</li>
          <li>• Customize contact information to match your business</li>
        </ul>
      </div>
    </div>
  );
}
