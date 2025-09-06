'use client';

import React from 'react';
import Image from 'next/image';
import { getImageSrc } from '@/utils/imageUtils';

export default function CustomSectionTemplate4({ section }) {
  if (!section || section.visible === false) return null;

  const getBackgroundColorClass = (color) => {
    const colors = {
      'white': 'bg-white',
      'gray-50': 'bg-gradient-to-br from-gray-50 to-gray-100',
      'blue-50': 'bg-gradient-to-br from-blue-50 to-blue-100',
      'green-50': 'bg-gradient-to-br from-green-50 to-green-100',
      'purple-50': 'bg-gradient-to-br from-purple-50 to-purple-100',
      'yellow-50': 'bg-gradient-to-br from-yellow-50 to-yellow-100'
    };
    return colors[color] || 'bg-white';
  };

  const backgroundColorClass = getBackgroundColorClass(section.backgroundColor);

  // Render content blocks
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'heading':
        return (
          <div key={index} className="mb-8">
            <h3 className={`font-bold leading-tight ${
              block.level === 1 ? 'text-4xl md:text-5xl' :
              block.level === 2 ? 'text-3xl md:text-4xl' :
              block.level === 3 ? 'text-2xl md:text-3xl' :
              'text-xl md:text-2xl'
            } text-gray-800 mb-4`}>
              {block.text}
            </h3>
          </div>
        );
      
      case 'paragraph':
        return (
          <div key={index} className="mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {block.text}
            </p>
          </div>
        );
      
      case 'image':
        return (
          <div key={index} className="mb-8">
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              {block.image ? (
                <Image
                  src={getImageSrc(block.image)}
                  alt={block.alt || 'Content image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Add Image</p>
                  </div>
                </div>
              )}
            </div>
            {block.caption && (
              <p className="text-sm text-gray-600 text-center mt-2 italic">
                {block.caption}
              </p>
            )}
          </div>
        );
      
      case 'quote':
        return (
          <div key={index} className="mb-8">
            <blockquote className="border-l-4 border-current theme-primary pl-6 py-4 theme-primary-bg-light rounded-r-lg">
              <p className="text-lg text-gray-700 italic mb-2">
                &ldquo;{block.text}&rdquo;
              </p>
              {block.author && (
                <cite className="text-sm text-gray-600 font-medium">
                  — {block.author}
                </cite>
              )}
            </blockquote>
          </div>
        );
      
      case 'list':
        return (
          <div key={index} className="mb-6">
            {block.ordered ? (
              <ol className="list-decimal list-inside space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-lg text-gray-700">
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc list-inside space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-lg text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      
      case 'code':
        return (
          <div key={index} className="mb-8">
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono">
                <code>{block.code}</code>
              </pre>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div key={index} className="mb-8">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              {block.video ? (
                <video
                  className="w-full h-auto"
                  controls
                  autoPlay={block.autoplay || false}
                  muted={block.autoplay || false}
                  loop={block.loop || false}
                  poster={block.poster || ''}
                >
                  <source src={block.video} type="video/mp4" />
                  <source src={block.video} type="video/webm" />
                  <source src={block.video} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Add Video</p>
                  </div>
                </div>
              )}
            </div>
            {block.caption && (
              <p className="text-sm text-gray-600 text-center mt-2 italic">
                {block.caption}
              </p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className={`py-20 px-4 ${backgroundColorClass} relative overflow-hidden`} role="region" aria-label={section.title}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 theme-gradient opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Template 4: Content Creation Template */}
          <article className="prose prose-lg max-w-none">
            {/* Section Title */}
            {section.title && (
              <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {section.title}
                </h1>
                {section.subtitle && (
                  <p className="text-xl text-gray-600 font-medium">
                    {section.subtitle}
                  </p>
                )}
              </header>
            )}

            {/* Content Blocks */}
            <div className="space-y-8">
              {section.contentBlocks && section.contentBlocks.length > 0 ? (
                section.contentBlocks.map((block, index) => renderContentBlock(block, index))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 theme-primary-bg-light rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Creating Content</h3>
                  <p className="text-gray-500">Add content blocks to build your article, blog post, or documentation.</p>
                </div>
              )}
            </div>

            {/* Call to Action */}
            {section.ctaText && (
              <div className="mt-12 text-center">
                <div className="theme-primary-bg-light rounded-2xl p-8 border border-current border-opacity-20">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {section.ctaText}
                  </h3>
                  {section.ctaDescription && (
                    <p className="text-lg text-gray-600 mb-6">
                      {section.ctaDescription}
                    </p>
                  )}
                  {section.ctaButtonText && (
                    <a
                      href={section.ctaButtonLink || '#'}
                      target={section.ctaButtonLink?.startsWith('http') ? '_blank' : '_self'}
                      rel={section.ctaButtonLink?.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white theme-gradient rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {section.ctaButtonText}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
