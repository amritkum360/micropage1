'use client';

import React from 'react';
import CustomSectionTemplate1 from './CustomSectionTemplate1';
import CustomSectionTemplate2 from './CustomSectionTemplate2';
import CustomSectionTemplate3 from './CustomSectionTemplate3';
import CustomSectionTemplate4 from './CustomSectionTemplate4';

export default function CustomSectionTemplate({ section }) {
  if (!section || section.visible === false) return null;

  const template = section.template || 1;

  // Render the appropriate template based on the template number
  switch (template) {
    case 1:
      return <CustomSectionTemplate1 section={section} />;
    case 2:
      return <CustomSectionTemplate2 section={section} />;
    case 3:
      return <CustomSectionTemplate3 section={section} />;
    case 4:
      return <CustomSectionTemplate4 section={section} />;
    default:
      return <CustomSectionTemplate1 section={section} />;
  }
}
