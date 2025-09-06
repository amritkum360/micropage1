# Popup Section Feature

## Overview
The Popup Section allows you to create modal popups that can be triggered by buttons with specific href attributes. This is perfect for contact forms, additional information, or any content that should appear in an overlay.

## How It Works

### 1. Creating a Popup
1. Go to the template builder
2. Click "Add Section" in the sidebar
3. Select "Popup" from the list
4. Configure the popup settings

### 2. Popup Configuration
- **Popup ID**: Unique identifier (e.g., "contact-popup")
- **Title**: Main heading for the popup
- **Subtitle**: Secondary heading
- **Description**: Main content text
- **Image**: Optional image to display
- **Button Text**: Text for the action button
- **Button Link**: Where the button should link to
- **Size**: Small, Medium, Large, or Fullscreen
- **Close Options**: Show close button, close on backdrop click

### 3. Triggering Popups
To trigger a popup, create a button with an href that matches the popup ID:

```html
<a href="#contact-popup" class="button">Contact Us</a>
<button onclick="window.location.hash='#contact-popup'">Get Started</button>
```

### 4. Popup Behavior
- **Hash-based**: Popups are triggered by URL hash changes
- **Automatic closing**: Close button, backdrop click, or hash removal
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation

## Features

### Popup Sizes
- **Small**: Compact popup for simple messages
- **Medium**: Standard size for most content
- **Large**: Spacious popup for detailed content
- **Fullscreen**: Takes up entire screen

### Button Actions
- **External links**: Opens in new tab
- **Email links**: Opens email client
- **Phone links**: Opens phone dialer
- **Internal links**: Navigates within the page
- **Hash links**: Triggers other popups

### Close Options
- **Close button**: X button in top-right corner
- **Backdrop click**: Click outside popup to close
- **Hash removal**: Automatically closes when hash changes

## Use Cases

### Contact Popup
- Popup ID: "contact-popup"
- Button: `<a href="#contact-popup">Contact Us</a>`
- Content: Contact form or contact information

### Pricing Popup
- Popup ID: "pricing-popup"
- Button: `<a href="#pricing-popup">View Pricing</a>`
- Content: Detailed pricing information

### Product Details
- Popup ID: "product-details"
- Button: `<a href="#product-details">Learn More</a>`
- Content: Product specifications and images

### Newsletter Signup
- Popup ID: "newsletter-popup"
- Button: `<a href="#newsletter-popup">Subscribe</a>`
- Content: Newsletter signup form

## Technical Implementation

### Hash-based System
```javascript
// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);

// Check if hash matches popup ID
if (hash === section.popupId) {
  setIsOpen(true);
}
```

### Responsive Design
```css
/* Mobile-first approach */
.popup-content {
  max-width: 100%;
  margin: 1rem;
}

@media (min-width: 768px) {
  .popup-content {
    max-width: 32rem; /* Medium size */
  }
}
```

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Best Practices

### Popup IDs
- Use descriptive, unique IDs
- Use kebab-case (contact-popup, not contactPopup)
- Keep IDs short but meaningful

### Content
- Keep popup content concise
- Use clear, actionable button text
- Include relevant images when helpful

### User Experience
- Don't overuse popups
- Make sure popups add value
- Test on mobile devices
- Ensure fast loading times

## Examples

### Basic Contact Popup
```javascript
{
  popupId: 'contact-popup',
  title: 'Get in Touch',
  subtitle: 'We\'d love to hear from you',
  description: 'Send us a message and we\'ll respond as soon as possible.',
  buttonText: 'Contact Us',
  buttonLink: 'mailto:contact@example.com',
  size: 'medium'
}
```

### Product Showcase Popup
```javascript
{
  popupId: 'product-showcase',
  title: 'Premium Package',
  subtitle: 'Everything you need to succeed',
  description: 'Our premium package includes all features plus priority support.',
  image: 'product-image.jpg',
  buttonText: 'Get Started',
  buttonLink: '#contact-popup',
  size: 'large'
}
```

## Integration with Other Sections

### CTA Buttons
- Use popup IDs in CTA section buttons
- Create seamless user flow
- Reduce page navigation

### Navigation Links
- Add popup triggers to header navigation
- Create quick access to important content
- Improve user engagement

### Service Cards
- Link service cards to detailed popups
- Showcase service features
- Include pricing information
