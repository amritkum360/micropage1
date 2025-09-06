'use client';

import React from 'react';
import PreviewArea from './PreviewArea';

export default function MainContentArea({ formData, sectionOrder, previewStyles }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PreviewArea formData={formData} sectionOrder={sectionOrder} previewStyles={previewStyles} />
    </div>
  );
}
