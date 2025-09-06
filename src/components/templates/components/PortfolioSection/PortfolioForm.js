'use client';

import React, { useRef } from 'react';

export default function PortfolioForm({ section, onInputChange, sectionKey = 'portfolio' }) {
  const fileInputRefs = useRef({});

  const addProject = () => {
    const newProjects = [...(section.projects || []), { title: 'New Project', description: 'Project description', image: '', link: '' }];
    onInputChange(sectionKey, 'projects', newProjects);
  };

  const removeProject = (index) => {
    const newProjects = section.projects.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'projects', newProjects);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...section.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onInputChange(sectionKey, 'projects', newProjects);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateProject(index, 'image', imageUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Portfolio"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Recent Work & Projects"
        />
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Projects</label>
          <button
            type="button"
            onClick={addProject}
            className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            + Add Project
          </button>
        </div>
        
        <div className="space-y-2">
          {(section.projects || []).map((project, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md">
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Project Title"
                />
                <input
                  type="text"
                  value={project.description || ''}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Project Description"
                />
                                 <div className="flex items-center space-x-2">
                   <input
                     ref={(el) => fileInputRefs.current[`image-${index}`] = el}
                     type="file"
                     accept="image/*"
                     onChange={(e) => handleImageUpload(index, e)}
                     className="hidden"
                   />
                   <button
                     type="button"
                     onClick={() => fileInputRefs.current[`image-${index}`]?.click()}
                     className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                   >
                     Choose Image
                   </button>
                   {project.image && (
                     <span className="text-xs text-gray-600 truncate">
                       {project.image.includes('blob:') ? 'Image selected' : 'Image uploaded'}
                     </span>
                   )}
                 </div>
                <input
                  type="text"
                  value={project.link || ''}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Project Link (optional)"
                />
              </div>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          
          {(!section.projects || section.projects.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-2">
              No projects yet. Click &quot;Add Project&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
