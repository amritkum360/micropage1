'use client';

import React from 'react';

export default function SkillsForm({ section, onInputChange, sectionKey = 'skills' }) {
  const addSkill = () => {
    const newItems = [...(section.items || []), {
      name: 'New Skill',
      percentage: 80,
      color: 'blue'
    }];
    onInputChange(sectionKey, 'items', newItems);
  };

  const removeSkill = (index) => {
    const newItems = section.items.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'items', newItems);
  };

  const updateSkill = (index, field, value) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onInputChange(sectionKey, 'items', newItems);
  };

  // const colorOptions = [
  //   { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  //   { value: 'green', label: 'Green', color: 'bg-green-500' },
  //   { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  //   { value: 'orange', label: 'Orange', color: 'bg-orange-500' }
  // ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Expertise"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Skills & Capabilities"
        />
      </div>

      {/* Skills Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Skills</label>
          <button
            type="button"
            onClick={addSkill}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Skill
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.items || []).map((skill, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Skill {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Skill Name */}
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Skill Name"
                />

                {/* Skill Percentage */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skill.percentage || 80}
                    onChange={(e) => updateSkill(index, 'percentage', parseInt(e.target.value))}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="80"
                  />
                </div>

                {/* Skill Color */}
               
              </div>
            </div>
          ))}
          
          {(!section.items || section.items.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No skills yet. Click &quot;Add Skill&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
