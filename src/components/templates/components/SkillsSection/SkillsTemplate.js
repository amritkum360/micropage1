'use client';

import React from 'react';

export default function SkillsTemplate({ section }) {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" role="region" aria-label="Skills" id='skills'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* <div className="inline-block p-3 mb-4">
              <span className="text-5xl">⚡</span>
            </div> */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="flex justify-center items-center mb-4">
              <div className="w-4 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-1 h-1 rounded-full mx-2" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-4 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
            </div>
            {section.subtitle && (
              <p className="text-xl text-gray-600 theme-primary">{section.subtitle}</p>
            )}
          </div>
          {section.items && (
            <div className="grid md:grid-cols-2 gap-10">
              {section.items.map((skill, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4" style={{ borderLeftColor: 'var(--primary-color, #3B82F6)' }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 theme-primary">{skill.name}</h3>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 mr-2">{skill.percentage}%</span>
                      <span className="text-lg">🎯</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div 
                      className="h-4 rounded-full transition-all duration-1000 theme-primary-bg relative"
                      style={{ width: `${skill.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
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
