'use client';

import React from 'react';

export default function AchievementsTemplate({ section }) {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50" role="region" aria-label="Achievements">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="w-8 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-3 h-3 rounded-full mx-3" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-8 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="flex justify-center items-center mb-4">
              <div className="w-2 h-2 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
              <div className="w-2 h-2 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
              <div className="w-2 h-2 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
            </div>
            {section.subtitle && (
              <p className="text-xl text-gray-600 theme-primary">{section.subtitle}</p>
            )}
          </div>
          {section.items && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((achievement, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl text-center border-2 border-dashed" style={{ borderColor: 'var(--primary-color, #3B82F6)' }}>
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-center mt-4">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--primary-color, #3B82F6) / 20%', color: 'var(--primary-color, #3B82F6)' }}>
                      {achievement.year}
                    </span>
                    <div className="w-2 h-2 rounded-full ml-2" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
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
