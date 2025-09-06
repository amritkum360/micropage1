'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsTemplate({ section }) {
  return (
    <section className="py-16 px-4" style={{ background: `linear-gradient(90deg, var(--accent-color, #F59E0B) / 5%, var(--primary-color, #3B82F6) / 5%)` }} role="region" aria-label="Testimonials" id='testimonials'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="w-6 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-2 h-2 rounded-full mx-2" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
              <div className="w-6 h-1" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="flex justify-center items-center mb-4">
              <div className="w-1 h-1 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
              <div className="w-1 h-1 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
              <div className="w-1 h-1 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
              <div className="w-1 h-1 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
              <div className="w-1 h-1 rounded-full mx-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
            </div>
            {section.subtitle && (
              <p className="text-xl text-gray-600 theme-primary">{section.subtitle}</p>
            )}
          </div>
          {section.items && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border-2 border-dotted" style={{ borderColor: 'var(--primary-color, #3B82F6)' }}>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current theme-accent" />
                    ))}
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
                    </div>
                    <p className="text-gray-700 italic">&quot;{testimonial.text}&quot;</p>
                    <div className="flex justify-center mt-2">
                      <div className="w-8 h-1" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 theme-gradient">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 theme-primary">{testimonial.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className="w-1 h-1 rounded-full mr-2" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
                        <p className="text-gray-600 text-sm">{testimonial.role} at {testimonial.company}</p>
                        <div className="w-1 h-1 rounded-full ml-2" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
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
