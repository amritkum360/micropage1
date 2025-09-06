'use client';

import React from 'react';

export default function StatsTemplate({ section }) {
  return (
    <section className="py-16 px-4" style={{ background: `linear-gradient(90deg, var(--accent-color, #F59E0B) / 5%, var(--primary-color, #3B82F6) / 5%)` }} role="region" aria-label="Stats" id='stats'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 p-8 border-2 border-dashed rounded-3xl" style={{ borderColor: 'var(--primary-color, #3B82F6)' }}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600">{section.subtitle}</p>
            )}
          </div>
          {section.items && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {section.items.map((stat, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4 theme-accent">{stat.icon}</div>
                  <div className="text-3xl font-bold theme-primary mb-2">{stat.number}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
