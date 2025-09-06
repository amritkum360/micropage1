'use client';

import React from 'react';

export default function StatsForm({ section, onInputChange, sectionKey = 'stats' }) {
  const addStat = () => {
    const newItems = [...(section.items || []), {
      icon: '📊',
      number: '100',
      label: 'New Stat'
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeStat = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateStat = (index, field, value) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onInputChange(sectionKey, 'items', newItems);
  };

  const iconOptions = [
    '📊', '📈', '📉', '🎯', '🏆', '⭐', '💎', '🔥', '🚀', '💪', '🎉', '🌟', '💡', '⚡', '🎖️', '👑'
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Statistics"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Numbers That Matter"
        />
      </div>

      {/* Stats Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Statistics</label>
          <button
            type="button"
            onClick={addStat}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Stat
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((stat, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Stat {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Stat Icon */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Icon</label>
                  <div className="grid grid-cols-8 gap-1">
                    {iconOptions.map((icon, iconIndex) => (
                      <button
                        key={iconIndex}
                        type="button"
                        onClick={() => updateStat(index, 'icon', icon)}
                        className={`w-8 h-8 text-lg rounded border-2 transition-colors ${
                          stat.icon === icon 
                            ? 'border-cyan-500 bg-cyan-100' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stat Number */}
                <input
                  type="text"
                  value={stat.number || ''}
                  onChange={(e) => updateStat(index, 'number', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Number (e.g., 100, 500+, 1M)"
                />

                {/* Stat Label */}
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Label (e.g., Happy Clients, Projects Completed)"
                />
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No statistics yet. Click &quot;Add Stat&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
