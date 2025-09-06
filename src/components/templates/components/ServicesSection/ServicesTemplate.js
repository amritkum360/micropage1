'use client';

import Image from 'next/image';
import React from 'react';

export default function ServicesTemplate({ section }) {
  return (
    <section className="py-16 px-4" style={{ background: `linear-gradient(135deg, var(--secondary-color, #8B5CF6) / 5%, var(--primary-color, #3B82F6) / 5%, var(--accent-color, #F59E0B) / 5%)` }} role="region" aria-label="Services" id='services'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
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
              <p className="text-xl text-gray-600 max-w-2xl mx-auto theme-primary">{section.subtitle}</p>
            )}
          </div>
          {section.items && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((service, index) => (
                <div key={index} className="group relative">
                  {/* Background Card */}
                  <div className="absolute inset-0 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 theme-gradient"></div>
                  
                                     {/* Main Card */}
                   <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed" style={{ borderColor: 'var(--primary-color, #3B82F6)' }}>
                     {/* Product Image OR Icon */}
                     {service.image ? (
                       <div className="mb-6">
                         <div className="w-full h-48 rounded-2xl overflow-hidden">
                           <Image
                             src={service.image}
                             alt={service.title || 'Product image'}
                             width={400}
                             height={192}
                             className="w-full h-full object-cover"
                             onError={(e) => {
                               e.target.style.display = 'none';
                               e.target.nextSibling.style.display = 'flex';
                             }}
                           />
                           <div className="w-full h-full flex items-center justify-center" style={{display: 'none', background: `linear-gradient(135deg, var(--primary-color, #3B82F6) / 20%, var(--secondary-color, #8B5CF6) / 20%)` }}>
                             <span className="text-4xl">🖼️</span>
                           </div>
                         </div>
                       </div>
                     ) : service.icon ? (
                       <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 theme-gradient">
                         <span className="text-2xl">{service.icon}</span>
                       </div>
                     ) : (
                       <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mb-6">
                         <span className="text-2xl">📋</span>
                       </div>
                     )}
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:theme-primary transition-colors">
                          {service.title}
                        </h3>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-color, #F59E0B)' }}></div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Features List */}
                      {service.features && service.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-700">Features:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full mr-2 theme-primary-bg"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Price */}
                      {service.price && (
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full mr-2" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
                            <p className="text-2xl font-bold theme-primary">
                              {service.price}
                            </p>
                            <div className="w-1 h-1 rounded-full ml-2" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
                          </div>
                        </div>
                      )}
                      
                                             {/* CTA Button */}
                      {service.buttonLink ? (
                        <a
                          href={service.buttonLink}
                          className="block w-full mt-6 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center theme-gradient"
                        >
                          {service.buttonText || 'Get Started'}
                        </a>
                      ) : (
                        <button className="w-full mt-6 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl theme-gradient">
                          {service.buttonText || 'Get Started'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {(!section.items || section.items.length === 0) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `linear-gradient(135deg, var(--primary-color, #3B82F6) / 20%, var(--secondary-color, #8B5CF6) / 20%)` }}>
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Yet</h3>
              <p className="text-gray-500">Add some services to showcase what you offer</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
