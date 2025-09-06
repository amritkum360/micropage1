'use client';

import React from 'react';

export default function DownloadablesTemplate({ section }) {
  return (
    <section className="py-16 px-4" style={{ background: `linear-gradient(90deg, var(--secondary-color, #8B5CF6) / 5%, var(--primary-color, #3B82F6) / 5%)` }} role="region" aria-label="Downloadables" id='downloadables'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600">{section.subtitle}</p>
            )}
          </div>
          {section.items && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4 theme-accent">📄</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  {/* File Type Badge */}
                  {item.type && (
                    <div className="mb-4">
                                             <span className="inline-block px-3 py-1 rounded-full text-sm font-medium theme-primary theme-primary-bg-light">
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Download Button */}
                  {item.file && ( 
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors font-semibold"
                      style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}
                    >
                      Download {item.type ? item.type.toUpperCase() : 'File'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
