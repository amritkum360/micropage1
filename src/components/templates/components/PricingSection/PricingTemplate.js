'use client';

import React from 'react';

export default function PricingTemplate({ section }) {
  return (
    <section className="py-12 sm:py-14 md:py-16 px-4" style={{ background: `linear-gradient(90deg, var(--accent-color, #F59E0B) / 5%, var(--primary-color, #3B82F6) / 5%)` }} role="region" aria-label="Pricing" id='pricing'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">{section.title}</h2>
            {section.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-gray-600">{section.subtitle}</p>
            )}
          </div>
          {section.plans && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {section.plans.map((plan, index) => (
                <div key={index} className={`bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`} style={plan.popular ? { borderColor: 'var(--primary-color, #3B82F6)' } : {}}>
                  {plan.popular && (
                    <div className="absolute -top-2 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg whitespace-nowrap" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}>
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{plan.name}</h3>
                    <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                      {plan.price}
                      <span className="text-base sm:text-lg text-gray-600 font-normal">/{plan.period}</span>
                    </div>
                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-left">
                          <span className="mr-3 mt-0.5 text-blue-500 text-lg sm:text-xl flex-shrink-0">✓</span>
                          <span className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-lg hover:opacity-90 transition-colors font-semibold text-sm sm:text-base shadow-lg" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}>
                      Choose Plan
                    </button>
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
