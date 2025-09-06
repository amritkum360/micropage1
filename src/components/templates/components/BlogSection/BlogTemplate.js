'use client';

import React from 'react';
import { getImageSrc } from '@/utils/imageUtils';

export default function BlogTemplate({ section }) {
  // Debug logging
  console.log('🖼️ BlogTemplate - Posts data:', section.posts);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50" role="region" aria-label="Blog" id='blog'>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}></div>
            {section.subtitle && (
              <p className="text-xl text-gray-600">{section.subtitle}</p>
            )}
          </div>
          {section.posts && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.posts.map((post, index) => {
                const imageSrc = getImageSrc(post.image);
                console.log(`🖼️ BlogTemplate - Post ${index} image source:`, imageSrc);
                
                return (
                  <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {imageSrc ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={post.title || 'Blog post image'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center theme-gradient" style={{display: 'none'}}>
                          <span className="text-6xl">📝</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center theme-gradient">
                        <span className="text-6xl">📝</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      {post.link && (
                        <a
                          href={post.link}
                          className="inline-block text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                          style={{ backgroundColor: 'var(--primary-color, #3B82F6)' }}
                        >
                          Read More
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
