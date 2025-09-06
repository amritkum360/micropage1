# Custom Section Feature

## Overview
The Custom Section feature allows users to add unlimited custom sections to their website with flexible image and content layouts.

## Features

### 1. Two Template Options
- **Template 1**: Image left, content right
- **Template 2**: Image right, content left

### 2. Customizable Properties
- **Title**: Main heading for the section
- **Subtitle**: Secondary heading
- **Description**: Detailed content/description
- **Image**: Upload custom images with preview
- **Image Border Radius**: Adjustable from 0px (sharp) to 50px (very round)
- **Background Color**: Choose from 6 color options (white, light gray, light blue, light green, light purple, light yellow)

### 3. Dynamic Management
- **Add Unlimited Sections**: Click "Add Custom Section" button to create new sections
- **Drag & Drop Reordering**: Reorder sections by dragging them
- **Move Up/Down**: Use arrow buttons to move sections
- **Show/Hide**: Toggle section visibility with eye icon
- **Delete**: Remove sections (can be added later if needed)

## How to Use

### Adding a Custom Section
1. In the sidebar, scroll down to find the "Add Custom Section" button
2. Click the button to create a new custom section
3. The section will be added to the bottom of your section list
4. Click on the section to expand and configure it

### Configuring a Custom Section
1. **Choose Template**: Select between Template 1 (image left) or Template 2 (image right)
2. **Add Content**: Fill in title, subtitle, and description
3. **Upload Image**: Click "Choose Section Image" to upload an image
4. **Customize Appearance**: Adjust image border radius and background color
5. **Preview**: See changes in real-time in the preview area

### Managing Sections
- **Reorder**: Drag sections up/down or use arrow buttons
- **Hide/Show**: Click the eye icon to toggle visibility
- **Expand/Collapse**: Click on section name to expand/collapse form

## Technical Implementation

### Files Created/Modified
- `src/components/templates/components/CustomSection/CustomSectionForm.js` - Form component for editing custom sections
- `src/components/templates/components/CustomSection/CustomSectionTemplate.js` - Template component for rendering custom sections
- `src/components/templates/UniversalForm.js` - Updated to include custom section support
- `src/components/templates/UniversalTemplate.js` - Updated to render custom sections
- `src/components/templates/TemplateBuilderComponents/useTemplateBuilder.js` - Updated to handle section order changes

### Data Structure
Custom sections are stored with keys like `customSection_1234567890` and contain:
```javascript
{
  visible: true,
  template: 1, // or 2
  title: 'Custom Section',
  subtitle: 'Your custom content',
  description: 'Add your custom content here...',
  image: '', // Image data object
  imageBorderRadius: 8,
  backgroundColor: 'white'
}
```

### Section Order
Custom sections are automatically added to the `sectionOrder` array and can be reordered like any other section.

## Benefits
- **Flexibility**: Add as many custom sections as needed
- **Customization**: Full control over layout, content, and styling
- **User-Friendly**: Intuitive interface with real-time preview
- **Responsive**: Templates work on all screen sizes
- **Integrated**: Seamlessly integrated with existing template system

## Future Enhancements
- More template options (3-column layouts, carousel, etc.)
- Advanced styling options (custom CSS, animations)
- Section duplication feature
- Import/export custom sections
- Pre-built section templates
