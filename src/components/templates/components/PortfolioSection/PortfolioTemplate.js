'use client';

import Image from 'next/image';
import React from 'react';

export default function PortfolioTemplate({ section }) {
  return (
    <section className="py-12 sm:py-14 md:py-16 px-4" style={{ background: `linear-gradient(90deg, var(--accent-color, #F59E0B) / 5%, var(--primary-color, #3B82F6) / 5%)` }} role="region" aria-label="Portfolio" id='portfolio'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center items-center mb-3 sm:mb-4">
              <div className="w-3 sm:w-4 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-1 h-1 rounded-full mx-1 sm:mx-2" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-3 sm:w-4 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">{section.title}</h2>
            {section.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-gray-600 theme-primary">{section.subtitle}</p>
            )}
          </div>
          {section.projects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {section.projects.map((project, index) => (
                <div key={index} className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 relative group">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ 
                    background: `linear-gradient(45deg, var(--primary-color, #3B82F6), var(--secondary-color, #8B5CF6), var(--accent-color, #F59E0B))`,
                    filter: 'blur(8px)',
                    zIndex: -1
                  }}></div>
                  <div className="relative bg-white rounded-2xl sm:rounded-3xl p-1">
                    <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden">
                      {project.image ? (
                        <div className="h-40 sm:h-48 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title || 'Project image'}
                            width={400}
                            height={192}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center theme-gradient" style={{display: 'none'}}>
                            <span className="text-4xl sm:text-5xl md:text-6xl">📁</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-40 sm:h-48 flex items-center justify-center theme-gradient">
                          <span className="text-4xl sm:text-5xl md:text-6xl">📁</span>
                        </div>
                      )}
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 theme-primary">{project.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{project.description}</p>
                        {project.link && (
                          <a
                            href={project.link}
                            className="inline-block text-white px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-colors text-sm sm:text-base"
                            style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
