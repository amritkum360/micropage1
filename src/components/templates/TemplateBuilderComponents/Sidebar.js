'use client';

import React from 'react';
import UniversalForm from '../UniversalForm';

export default function Sidebar({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  formData, 
  sectionOrder,
  onInputChange, 
  onToggleSection, 
  onSave, 
  onClose,
  moveSectionUp,
  moveSectionDown,
  reorderSections,
  isEditMode = false,
  setFocusSubdomain,
  responsiveWidth
}) {



  return (
    <div className={`bg-white shadow-2xl transition-all duration-300 flex flex-col border-r border-gray-200 ${responsiveWidth || (sidebarCollapsed ? 'w-16' : 'w-80')}`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div>
            <h2 className="text-lg font-bold text-blue-900">
              {isEditMode ? 'Edit Website' : 'Universal Website Builder'}
            </h2>
            <p className="text-xs text-gray-600">
              {isEditMode ? 'Update your existing website' : 'Mother of All Templates'}
            </p>
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
          suppressHydrationWarning={true}
        >
          {sidebarCollapsed ? (
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {!sidebarCollapsed && (
          <div className="p-4">
            <UniversalForm 
              data={formData}
              sectionOrder={sectionOrder}
              onInputChange={onInputChange}
              onToggleSection={onToggleSection}
              moveSectionUp={moveSectionUp}
              moveSectionDown={moveSectionDown}
              reorderSections={reorderSections}
            />
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        {!sidebarCollapsed ? (
          <div className="space-y-2">
            {/* {isEditMode && (
              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded text-center">
                ✨ Auto-save enabled
              </div>
            )} */}
                         {/* <div className="text-center text-xs text-gray-600 py-2 bg-blue-50 rounded-lg border border-blue-100">
               Enter subdomain in the top bar to publish your website
             </div> */}
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="p-2 bg-blue-50 rounded-lg text-center border border-blue-100">
              <div className="text-xs text-gray-600">
                Enter subdomain in top bar
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
