'use client';

import React from 'react';
import { Facebook, Instagram, MessageCircle, Twitter, Linkedin, Youtube, MessageSquare, Music, Send, Users, Camera } from 'lucide-react';

export default function SocialTemplate({ section }) {
  const handleSocialClick = (url) => {
    if (url && url.trim() !== '') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Only show enabled platforms
  const enabledPlatforms = section.platforms?.filter(platform => platform.enabled) || [];

  if (enabledPlatforms.length === 0) {
    return null;
  }

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'facebook':
        return <Facebook className="w-6 h-6 text-white" />;
      case 'instagram':
        return <Instagram className="w-6 h-6 text-white" />;
      case 'twitter':
        return <Twitter className="w-6 h-6 text-white" />;
      case 'linkedin':
        return <Linkedin className="w-6 h-6 text-white" />;
      case 'youtube':
        return <Youtube className="w-6 h-6 text-white" />;
      case 'whatsapp':
        return <MessageCircle className="w-6 h-6 text-white" />;
      case 'tiktok':
        return <Music className="w-6 h-6 text-white" />;
      case 'telegram':
        return <Send className="w-6 h-6 text-white" />;
      case 'discord':
        return <Users className="w-6 h-6 text-white" />;
      case 'snapchat':
        return <Camera className="w-6 h-6 text-white" />;
      default:
        return <MessageSquare className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-2 border-dotted" style={{ borderColor: 'var(--primary-color, #3B82F6)' }} role="region" aria-label="Social Media" id='social'>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {section.title && (
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
          )}
          {section.subtitle && (
            <p className="text-xl text-gray-600 mb-12">{section.subtitle}</p>
          )}
          <div className="flex flex-wrap justify-center gap-6">
            {enabledPlatforms.map((platform, index) => (
              <button
                key={index}
                onClick={() => handleSocialClick(platform.url)}
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 theme-gradient"
                aria-label={`Follow us on ${platform.name}`}
              >
                {getIcon(platform.icon)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
