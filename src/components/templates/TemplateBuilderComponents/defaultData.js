// Universal template data structure
export const defaultUniversalData = {
  // Basic Info
  businessName: 'Your Business Name',
  tagline: 'Your Tagline or Slogan',
  logo: '',
  favicon: '',
  subdomain: '',
  
  // Section Order
  sectionOrder: [
    'header',
    'hero',
    'about',
    'portfolio',
    'services',
    'testimonials',
    'skills',
    'achievements',
    'gallery',
    'stats',
    'blog',
    'downloadables',
    'faq',
    'pricing',
    'cta',
    'social',
    'contact',
    'popup',
    'footer'
  ],
  
  // Header
  header: {
    visible: true,
    logo: '',
    navigation: [
      { name: 'Home', link: '#home' },
      { name: 'About', link: '#about' },
      { name: 'Services', link: '#services' },
      { name: 'Contact', link: '#contact' }
    ],
    ctaButtons: [
      { text: 'Get Started', link: '#contact', primary: true }
    ]
  },

  // Hero Section
  hero: {
    visible: true,
    template: 1,
    title: 'Welcome to Our Business',
    subtitle: 'Professional Solutions for Your Needs',
    description: 'We provide exceptional services with years of experience and dedication to customer satisfaction.',
    backgroundImage: '',
    imageBorderRadius: 50,
    ctaButtons: [
      { text: 'Get Started', link: '#contact', primary: true },
      { text: 'Learn More', link: '#about', primary: false }
    ]
  },

  // About Me/Us
  about: {
    visible: false,
    title: 'About Us',
    subtitle: 'Your Trusted Partner',
    description: 'We are dedicated to providing the best services to our customers with years of experience and expertise.',
    image: '',
    features: [
      { title: 'Experience', description: '10+ Years in Industry' },
      { title: 'Quality', description: 'Premium Service Quality' },
      { title: 'Support', description: '24/7 Customer Support' }
    ]
  },

  // Portfolio/Work/Projects
  portfolio: {
    visible: false,
    title: 'Our Portfolio',
    subtitle: 'Recent Work & Projects',
    projects: [
      { title: 'Project 1', description: 'Description of project 1', image: '', link: '' },
      { title: 'Project 2', description: 'Description of project 2', image: '', link: '' },
      { title: 'Project 3', description: 'Description of project 3', image: '', link: '' }
    ]
  },

  // Products/Services
  services: {
    visible: false,
    title: 'Our Services',
    subtitle: 'What We Offer',
    items: [
      { title: 'Service 1', description: 'Description of service 1', icon: '🚀', price: '', image: '', buttonText: 'Get Started', buttonLink: '#contact', features: [] },
      { title: 'Service 2', description: 'Description of service 2', icon: '💡', price: '', image: '', buttonText: 'Get Started', buttonLink: '#contact', features: [] },
      { title: 'Service 3', description: 'Description of service 3', icon: '⚡', price: '', image: '', buttonText: 'Get Started', buttonLink: '#contact', features: [] }
    ]
  },

  // Testimonials/Reviews
  testimonials: {
    visible: true,
    title: 'What Our Clients Say',
    subtitle: 'Customer Reviews',
    items: [
      { name: 'John Doe', role: 'CEO', company: 'Company 1', text: 'Excellent service and great results!', rating: 5, image: '' },
      { name: 'Jane Smith', role: 'Manager', company: 'Company 2', text: 'Highly recommended for quality work.', rating: 5, image: '' },
      { name: 'Mike Johnson', role: 'Director', company: 'Company 3', text: 'Professional team with outstanding results.', rating: 5, image: '' }
    ]
  },

  // Skills/Expertise
  skills: {
    visible: false,
    title: 'Our Expertise',
    subtitle: 'Skills & Capabilities',
    items: [
      { name: 'Skill 1', percentage: 90, color: 'blue' },
      { name: 'Skill 2', percentage: 85, color: 'green' },
      { name: 'Skill 3', percentage: 80, color: 'purple' },
      { name: 'Skill 4', percentage: 95, color: 'orange' }
    ]
  },

  // Achievements/Awards
  achievements: {
    visible: false,
    title: 'Achievements & Awards',
    subtitle: 'Recognition & Milestones',
    items: [
      { title: 'Award 1', description: 'Description of award 1', year: '2023', icon: '🏆' },
      { title: 'Award 2', description: 'Description of award 2', year: '2022', icon: '⭐' },
      { title: 'Award 3', description: 'Description of award 3', year: '2021', icon: '🎖️' }
    ]
  },

  // Gallery/Media
  gallery: {
    visible: false,
    title: 'Gallery',
    subtitle: 'Our Work & Photos',
    images: [
      { src: '', alt: 'Gallery Image 1', title: 'Image 1' },
      { src: '', alt: 'Gallery Image 2', title: 'Image 2' },
      { src: '', alt: 'Gallery Image 3', title: 'Image 3' },
      { src: '', alt: 'Gallery Image 4', title: 'Image 4' }
    ]
  },

  // Stats/Numbers
  stats: {
    visible: true,
    title: 'Our Numbers',
    subtitle: 'Key Statistics',
    items: [
      { number: '500+', label: 'Happy Clients', icon: '😊' },
      { number: '1000+', label: 'Projects Completed', icon: '📊' },
      { number: '50+', label: 'Team Members', icon: '👥' },
      { number: '10+', label: 'Years Experience', icon: '⏰' }
    ]
  },

  // Blog/Articles
  blog: {
    visible: false,
    title: 'Latest Articles',
    subtitle: 'News & Updates',
    posts: [
      { title: 'Article 1', excerpt: 'Brief description of article 1', date: '2024-01-15', image: '', link: '' },
      { title: 'Article 2', excerpt: 'Brief description of article 2', date: '2024-01-10', image: '', link: '' },
      { title: 'Article 3', excerpt: 'Brief description of article 3', date: '2024-01-05', image: '', link: '' }
    ]
  },

  // Downloadables
  downloadables: {
    visible: false,
    title: 'Resources',
    subtitle: 'Free Downloads',
    items: [
      { title: 'Brochure', description: 'Company brochure in PDF', file: '', type: 'pdf' },
      { title: 'Catalog', description: 'Product catalog', file: '', type: 'pdf' },
      { title: 'Guide', description: 'User guide', file: '', type: 'pdf' }
    ]
  },

  // FAQ
  faq: {
    visible: true,
    title: 'Frequently Asked Questions',
    subtitle: 'Common Questions',
    items: [
      { question: 'What services do you offer?', answer: 'We offer a wide range of services including...' },
      { question: 'How can I contact you?', answer: 'You can contact us through phone, email, or our contact form.' },
      { question: 'What are your business hours?', answer: 'We are open Monday to Friday, 9 AM to 6 PM.' }
    ]
  },

  // Pricing/Packages
  pricing: {
    visible: false,
    title: 'Pricing Plans',
    subtitle: 'Choose Your Plan',
    plans: [
      { name: 'Basic', price: '$99', period: 'month', features: ['Feature 1', 'Feature 2', 'Feature 3'], popular: false },
      { name: 'Professional', price: '$199', period: 'month', features: ['All Basic features', 'Feature 4', 'Feature 5'], popular: true },
      { name: 'Enterprise', price: '$299', period: 'month', features: ['All Professional features', 'Feature 6', 'Feature 7'], popular: false }
    ]
  },

  // Call to Action Banner
  cta: {
    visible: false,
    title: 'Ready to Get Started?',
    subtitle: 'Contact us today for a free consultation',
    buttonText: 'Get Started Now',
    buttonLink: '#contact',
    backgroundImage: ''
  },

  // Social Media
  social: {
    visible: false,
    sticky: false,
    title: 'Follow Us',
    subtitle: 'Stay Connected',
    platforms: [
      { name: 'Facebook', url: 'https://facebook.com/your-page', icon: 'facebook', enabled: false },
      { name: 'Instagram', url: 'https://instagram.com/your-profile', icon: 'instagram', enabled: false },
      { name: 'Twitter', url: 'https://twitter.com/your-handle', icon: 'twitter', enabled: false },
      { name: 'LinkedIn', url: 'https://linkedin.com/company/your-company', icon: 'linkedin', enabled: false },
      { name: 'YouTube', url: 'https://youtube.com/your-channel', icon: 'youtube', enabled: false },
      { name: 'WhatsApp', url: 'https://wa.me/1234567890', icon: 'whatsapp', enabled: false },
      { name: 'TikTok', url: 'https://tiktok.com/@your-username', icon: 'tiktok', enabled: false },
      { name: 'Telegram', url: 'https://t.me/your-username', icon: 'telegram', enabled: false },
      { name: 'Discord', url: 'https://discord.gg/your-server', icon: 'discord', enabled: false },
      { name: 'Snapchat', url: 'your-snapchat-username', icon: 'snapchat', enabled: false }
    ]
  },

  // Contact
  contact: {
    visible: true,
    title: 'Contact Us',
    subtitle: 'Get In Touch',
    address: 'Your Business Address',
    phone: '+1 234 567 8900',
    whatsapp: '+1 234 567 8900',
    email: 'info@yourbusiness.com',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
    form: {
      name: true,
      email: true,
      phone: true,
      message: true,
      subject: false
    }
  },

  // Footer
  footer: {
    visible: true,
    copyright: '© 2024 Your Business Name. All rights reserved.',
    description: 'We are dedicated to providing exceptional services and creating meaningful connections with our customers.',
    backgroundColor: 'dark',
    contactTitle: 'Contact Info',
    contactDescription: 'Get in touch with us for any questions or inquiries. We\'re here to help you succeed.',
    links: [
      { name: 'Privacy Policy', url: '#privacy' },
      { name: 'Terms of Service', url: '#terms' },
      { name: 'Cookie Policy', url: '#cookies' }
    ]
  },

  // Theme & Styling
  theme: {
    selectedTheme: 'default',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    accentColor: '#a540f7',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    fontFamily: 'Inter',
    borderRadius: '8px'
  },

  // Custom Section Template Data
  customSection: {
    visible: true,
    template: 1,
    title: 'Custom Section',
    subtitle: 'Your custom content',
    description: 'Add your custom content here. This section allows you to create unique layouts with images and text.',
    image: '',
    imageBorderRadius: 8,
    backgroundColor: 'white',
    buttonText: '',
    buttonLink: '',
    buttonStyle: 'primary',
    bannerHeight: 'medium',
    gradientStyle: 'theme',
    buttons: [],
    contentBlocks: [],
    ctaText: '',
    ctaDescription: '',
    ctaButtonText: '',
    ctaButtonLink: ''
  },

  // Code Section Template Data
  codeSection: {
    visible: true,
    title: 'Custom Code Section',
    code: `<div class="custom-section">
  <h2>Your Custom Content</h2>
  <p>Add your HTML, CSS, and JavaScript code here to create unique sections.</p>
  <button class="custom-button">Click Me</button>
</div>

<style>
  .custom-section {
    padding: 3rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 1rem;
    margin: 2rem 0;
  }
  
  .custom-section h2 {
    font-size: 2.5rem !important;
    font-weight: bold !important;
    margin-bottom: 1rem !important;
    color: white !important;
  }
  
  .custom-section p {
    font-size: 1.2rem !important;
    margin-bottom: 2rem !important;
    opacity: 0.9 !important;
    color: white !important;
  }
  
  .custom-button {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid white;
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .custom-button:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.custom-button');
    if (button) {
      button.addEventListener('click', function() {
        alert('Hello from your custom code section!');
      });
    }
  });
</script>`,
    backgroundColor: 'white'
  },

  // AI Section Template Data
  aiSection: {
    visible: true,
    title: 'AI Generated Section',
    description: 'A hero section with gradient background, large title, subtitle, and call-to-action button using Tailwind CSS',
    code: '',
    backgroundColor: 'white'
  },

  // Popup Section Template Data
  popup: {
    visible: true,
    popupId: '123',
    title: 'Special Offer!',
    subtitle: 'Limited Time Deal',
    description: 'You\'ve found our special offer! This popup was triggered by the URL hash #123. This is a great way to show targeted content to specific visitors.',
    image: '',
    youtubeVideo: '',
    buttons: [
      {
        id: 'button_1',
        text: 'Claim Offer',
        link: '#',
        style: 'primary'
      },
      {
        id: 'button_2',
        text: 'Learn More',
        link: '#about',
        style: 'outline'
      }
    ],
    // Legacy support
    buttonText: 'Claim Offer',
    buttonLink: '#',
    size: 'medium',
    showCloseButton: true,
    closeOnBackdropClick: true
  }
};
