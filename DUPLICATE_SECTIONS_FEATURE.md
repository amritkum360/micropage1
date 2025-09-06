# Duplicate Sections Feature

## Overview
This feature allows users to add multiple instances of the same section type (e.g., multiple Hero sections) in the template builder.

## How it Works

### 1. Section Detection
- The system detects when a section type is already used
- Shows a count of how many times each section type is used
- Visual indicators show which sections are already in use

### 2. Adding Duplicate Sections
- Users can click on any section type in the "Add Section" panel
- If a section is already used, a new instance is created with a numeric suffix
- For example: `hero`, `hero_2`, `hero_3`, etc.

### 3. Section Management
- Each duplicate section gets a unique identifier
- Sections are numbered with badges (e.g., "Hero Section #2")
- All sections can be reordered, toggled, and configured independently

### 4. Rendering
- The template rendering system maps duplicate sections to their base section type
- Each section renders with its own data and configuration
- All sections maintain their individual visibility and order settings

## User Interface

### Add Section Panel
- Located in the sidebar under "Add Section"
- Shows all available section types
- Used sections are highlighted in orange with usage count
- Unused sections appear in gray
- Custom sections are available as a separate option

### Section List
- Each section shows its name and number (if duplicate)
- Visual badges indicate duplicate sections (#2, #3, etc.)
- Drag and drop reordering works for all sections
- Individual visibility toggles for each section
- **Delete button** for duplicate sections only (not for original #1 sections)

## Technical Implementation

### Section ID Generation
```javascript
// For first instance: "hero"
// For duplicates: "hero_2", "hero_3", etc.
// Smart numbering that finds the next available number
let nextNumber = 1;
const baseKey = section.key;

// Check if base section exists
if (sectionOrder.includes(baseKey)) {
  nextNumber = 2;
}

// Find the highest number for this section type
sectionOrder.forEach(key => {
  if (key.startsWith(`${baseKey}_`)) {
    const match = key.match(new RegExp(`^${baseKey}_(\\d+)$`));
    if (match) {
      const num = parseInt(match[1]);
      if (num >= nextNumber) {
        nextNumber = num + 1;
      }
    }
  }
});

const sectionId = nextNumber === 1 ? baseKey : `${baseKey}_${nextNumber}`;
```

### Section Mapping
```javascript
// Maps duplicate sections to base section type for rendering
const baseSectionKey = sectionKey.replace(/_\d+$/, '');
```

### Data Structure
- Each section maintains its own data object
- Section order array contains all section IDs (including duplicates)
- Form components handle both original and duplicate sections

## Benefits

1. **Flexibility**: Users can create multiple instances of any section
2. **Organization**: Clear visual indicators for duplicate sections
3. **Independence**: Each section can be configured separately
4. **Scalability**: No limit on the number of duplicate sections
5. **User-Friendly**: Intuitive interface with clear feedback
6. **Easy Cleanup**: Delete button for removing accidental duplicates
7. **Safety**: Original sections (#1) cannot be accidentally deleted

## Example Use Cases

- Multiple Hero sections for different products/services
- Several About sections for different team members
- Multiple Portfolio sections for different categories
- Various Contact sections for different locations
- Multiple CTA sections throughout the page

## Delete Functionality

### How It Works
- **Delete button** appears only for duplicate sections (#2, #3, etc.)
- **Original sections** (#1) do not have delete buttons for safety
- **Confirmation dialog** prevents accidental deletion
- **Complete cleanup** removes section data and updates section order
- **Auto-close** closes the section if it's currently open

### Delete Process
1. Click the red delete button (trash icon) on any duplicate section
2. Confirm deletion in the popup dialog
3. Section is completely removed from the website
4. Section order is automatically updated
5. No gaps are left in the numbering system

## Future Enhancements

- Section templates for quick duplication
- Bulk operations for duplicate sections
- Section grouping and organization
- Advanced section naming and labeling
