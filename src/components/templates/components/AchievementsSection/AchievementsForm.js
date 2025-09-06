'use client';

import React from 'react';

export default function AchievementsForm({ section, onInputChange, sectionKey = 'achievements' }) {
  const addAchievement = () => {
    const newItems = [...(section.items || []), {
      title: 'New Achievement',
      description: 'Description of achievement',
      year: '2023',
      icon: '🏆'
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeAchievement = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateAchievement = (index, field, value) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onInputChange(sectionKey, 'items', newItems);
  };

  const iconOptions = [
    '🏆', '⭐', '🎖️', '🥇', '🥈', '🥉', '🏅', '👑', '💎', '🌟', '🔥', '💪', '🚀', '🎯', '💡', '🎉'
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
          placeholder="Achievements & Awards"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Recognition & Milestones"
        />
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Achievements</label>
          <button
            type="button"
            onClick={addAchievement}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Achievement
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((achievement, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Achievement {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Achievement Icon */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Icon</label>
                  <div className="grid grid-cols-8 gap-1">
                    {iconOptions.map((icon, iconIndex) => (
                      <button
                        key={iconIndex}
                        type="button"
                        onClick={() => updateAchievement(index, 'icon', icon)}
                        className={`w-8 h-8 text-lg rounded border-2 transition-colors ${
                          achievement.icon === icon 
                            ? 'border-red-500 bg-red-100' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Achievement Title */}
                <input
                  type="text"
                  value={achievement.title || ''}
                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Achievement Title"
                />

                {/* Achievement Description */}
                <textarea
                  value={achievement.description || ''}
                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Description of the achievement"
                />

                {/* Achievement Year */}
                <input
                  type="text"
                  value={achievement.year || ''}
                  onChange={(e) => updateAchievement(index, 'year', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Year (e.g., 2023)"
                />
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No achievements yet. Click &quot;Add Achievement&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
