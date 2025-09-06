'use client';

import React from 'react';

export default function PricingForm({ section, onInputChange, sectionKey = 'pricing' }) {
  const addPlan = () => {
    const newPlans = [...(section.plans || []), {
      name: 'New Plan',
      price: '$99',
      period: 'month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      popular: false
    }];
    onInputChange(sectionKey, 'plans', newPlans);
  };

  const removePlan = (index) => {
    const newPlans = section.plans.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'plans', newPlans);
  };

  const updatePlan = (index, field, value) => {
    const newPlans = [...section.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    onInputChange(sectionKey, 'plans', newPlans);
  };

  const addFeature = (planIndex) => {
    const newPlans = [...section.plans];
    newPlans[planIndex].features = [...(newPlans[planIndex].features || []), 'New Feature'];
    onInputChange(sectionKey, 'plans', newPlans);
  };

  const removeFeature = (planIndex, featureIndex) => {
    const newPlans = [...section.plans];
    newPlans[planIndex].features = newPlans[planIndex].features.filter((_, i) => i !== featureIndex);
    onInputChange(sectionKey, 'plans', newPlans);
  };

  const updateFeature = (planIndex, featureIndex, value) => {
    const newPlans = [...section.plans];
    newPlans[planIndex].features[featureIndex] = value;
    onInputChange(sectionKey, 'plans', newPlans);
  };

  const periodOptions = ['month', 'year', 'week', 'day', 'one-time'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Pricing Plans"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Choose the Perfect Plan"
        />
      </div>

      {/* Pricing Plans Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Pricing Plans</label>
          <button
            type="button"
            onClick={addPlan}
            className="px-2 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            + Add Plan
          </button>
        </div>
        
        <div className="space-y-4">
          {(section.plans || []).map((plan, planIndex) => (
            <div key={planIndex} className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-700">Plan {planIndex + 1}</span>
                <div className="flex items-center space-x-2">
                  {/* Popular Toggle */}
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={plan.popular || false}
                      onChange={(e) => updatePlan(planIndex, 'popular', e.target.checked)}
                      className="w-3 h-3 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                    />
                    <span className="text-xs text-gray-600">Popular</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removePlan(planIndex)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Plan Name */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={plan.name || ''}
                    onChange={(e) => updatePlan(planIndex, 'name', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Basic Plan"
                  />
                </div>

                {/* Plan Price */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Price</label>
                  <input
                    type="text"
                    value={plan.price || ''}
                    onChange={(e) => updatePlan(planIndex, 'price', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="$99"
                  />
                </div>

                {/* Billing Period */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Billing Period</label>
                  <select
                    value={plan.period || 'month'}
                    onChange={(e) => updatePlan(planIndex, 'period', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {periodOptions.map((period) => (
                      <option key={period} value={period}>{period}</option>
                    ))}
                  </select>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs text-gray-600">Features</label>
                    <button
                      type="button"
                      onClick={() => addFeature(planIndex)}
                      className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      + Add Feature
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {(plan.features || []).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature || ''}
                          onChange={(e) => updateFeature(planIndex, featureIndex, e.target.value)}
                          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Feature description"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(planIndex, featureIndex)}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    
                    {(!plan.features || plan.features.length === 0) && (
                      <div className="text-xs text-gray-500 text-center py-2 border border-dashed border-gray-300 rounded">
                        No features yet. Click &quot;Add Feature&quot; to get started.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {(!section.plans || section.plans.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No pricing plans yet. Click &quot;Add Plan&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
