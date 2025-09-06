'use client';

import React, { useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';
import { defaultUniversalData } from '../../TemplateBuilderComponents/defaultData';

export default function CustomSectionForm4({ section, onInputChange, sectionKey, isOpen }) {
  const fileInputRef = useRef(null);
  const { token } = useAuth();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!token) {
          alert('Please login to upload images');
          return;
        }

        console.log('🚀 Starting custom section image upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        });

        // Clear any existing image data first
        onInputChange(sectionKey, 'image', '');

        // Show loading state
        const loadingData = {
          loading: true,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
        onInputChange(sectionKey, 'image', loadingData);

        // Upload image to server
        const imageData = await uploadImageToServer(file, token, 5);
        console.log('✅ Custom section image upload successful:', imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }
        
        onInputChange(sectionKey, 'image', imageData);
        
        // Verify the data was set
        console.log('🔍 Custom section image data after setting:', imageData);
        
      } catch (error) {
        console.error('❌ Custom section image upload failed:', error);
        alert(error.message);
        // Remove loading state on error
        onInputChange(sectionKey, 'image', '');
      }
    }
  };

  const removeImage = () => {
    onInputChange(sectionKey, 'image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Get image metadata for display
  const imageMetadata = getImageMetadata(section.image);

  return (
    <div className="space-y-3">
      {/* Template 4 Specific Settings */}
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-2">Template 4: Content Creation</h3>
        <p className="text-xs text-slate-600">Perfect for articles, blog posts, documentation, and rich content. Create structured content with headings, paragraphs, images, quotes, lists, and code blocks.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder={defaultUniversalData.customSection.title}
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder={defaultUniversalData.customSection.subtitle}
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={section.description || ''}
          onChange={(e) => onInputChange(sectionKey, 'description', e.target.value)}
          rows={3}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder={defaultUniversalData.customSection.description}
        />
      </div>

      {/* Content Blocks Management */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Content Blocks</h3>
          <div className="flex gap-2">
            <select
              onChange={(e) => {
                const blockType = e.target.value;
                if (blockType) {
                  const currentBlocks = section.contentBlocks || [];
                  let newBlock = { id: Date.now() };
                  
                  switch (blockType) {
                    case 'heading':
                      newBlock = { ...newBlock, type: 'heading', level: 2, text: 'New Heading' };
                      break;
                    case 'paragraph':
                      newBlock = { ...newBlock, type: 'paragraph', text: 'New paragraph text...' };
                      break;
                    case 'image':
                      newBlock = { ...newBlock, type: 'image', image: '', caption: '', alt: '' };
                      break;
                    case 'video':
                      newBlock = { ...newBlock, type: 'video', video: '', caption: '', autoplay: false, loop: false, poster: '' };
                      break;
                    case 'quote':
                      newBlock = { ...newBlock, type: 'quote', text: 'Quote text...', author: '' };
                      break;
                    case 'list':
                      newBlock = { ...newBlock, type: 'list', ordered: false, items: ['List item 1', 'List item 2'] };
                      break;
                    case 'code':
                      newBlock = { ...newBlock, type: 'code', code: '// Your code here...' };
                      break;
                  }
                  
                  onInputChange(sectionKey, 'contentBlocks', [...currentBlocks, newBlock]);
                  e.target.value = '';
                }
              }}
              className="text-xs border border-gray-300 rounded px-2 py-1"
            >
              <option value="">+ Add Block</option>
              <option value="heading">Heading</option>
              <option value="paragraph">Paragraph</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="quote">Quote</option>
              <option value="list">List</option>
              <option value="code">Code</option>
            </select>
          </div>
        </div>

        {/* Content Blocks List */}
        <div className="space-y-3">
          {(section.contentBlocks || []).map((block, index) => (
            <div key={block.id || index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700 capitalize">
                  {block.type} Block {index + 1}
                </span>
                <div className="flex gap-1">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentBlocks = section.contentBlocks || [];
                        const newBlocks = [...currentBlocks];
                        [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
                        onInputChange(sectionKey, 'contentBlocks', newBlocks);
                      }}
                      className="text-xs text-blue-500 hover:text-blue-700"
                    >
                      ↑
                    </button>
                  )}
                  {index < (section.contentBlocks || []).length - 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentBlocks = section.contentBlocks || [];
                        const newBlocks = [...currentBlocks];
                        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
                        onInputChange(sectionKey, 'contentBlocks', newBlocks);
                      }}
                      className="text-xs text-blue-500 hover:text-blue-700"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const currentBlocks = section.contentBlocks || [];
                      const updatedBlocks = currentBlocks.filter((_, i) => i !== index);
                      onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                    }}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              {/* Block Content Editor */}
              <div className="space-y-2">
                {block.type === 'heading' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Heading Level</label>
                      <select
                        value={block.level || 2}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, level: parseInt(e.target.value) } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                      >
                        <option value={1}>H1 (Largest)</option>
                        <option value={2}>H2 (Large)</option>
                        <option value={3}>H3 (Medium)</option>
                        <option value={4}>H4 (Small)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Heading Text</label>
                      <input
                        type="text"
                        value={block.text || ''}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, text: e.target.value } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="Enter heading text"
                      />
                    </div>
                  </>
                )}

                {block.type === 'paragraph' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Paragraph Text</label>
                    <textarea
                      value={block.text || ''}
                      onChange={(e) => {
                        const currentBlocks = section.contentBlocks || [];
                        const updatedBlocks = currentBlocks.map((b, i) => 
                          i === index ? { ...b, text: e.target.value } : b
                        );
                        onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                      }}
                      rows={3}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                      placeholder="Enter paragraph text"
                    />
                  </div>
                )}

                {block.type === 'image' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Image Upload</label>
                      <div className="relative">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              try {
                                if (!token) {
                                  alert('Please login to upload images');
                                  return;
                                }
                                const imageData = await uploadImageToServer(file, token, 5);
                                const currentBlocks = section.contentBlocks || [];
                                const updatedBlocks = currentBlocks.map((b, i) => 
                                  i === index ? { ...b, image: imageData } : b
                                );
                                onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                              } catch (error) {
                                console.error('Image upload failed:', error);
                                alert(error.message);
                              }
                            }
                          }}
                          className="hidden"
                        />
                        <button
                          onClick={triggerFileInput}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 text-sm"
                        >
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                          </svg>
                          <span>Upload Image</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Image Caption</label>
                      <input
                        type="text"
                        value={block.caption || ''}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, caption: e.target.value } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="Optional caption"
                      />
                    </div>
                  </>
                )}

                {block.type === 'video' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Video URL</label>
                      <input
                        type="url"
                        value={block.video || ''}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, video: e.target.value } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="https://example.com/video.mp4"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Video Caption</label>
                      <input
                        type="text"
                        value={block.caption || ''}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, caption: e.target.value } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="Optional caption"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Video Options</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`autoplay-yes-${index}`}
                            name={`autoplay-${index}`}
                            checked={block.autoplay === true}
                            onChange={() => {
                              const currentBlocks = section.contentBlocks || [];
                              const updatedBlocks = currentBlocks.map((b, i) => 
                                i === index ? { ...b, autoplay: true } : b
                              );
                              onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                            }}
                            className="text-slate-500 focus:ring-slate-500"
                          />
                          <label htmlFor={`autoplay-yes-${index}`} className="text-xs text-gray-700">
                            Auto Play
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`autoplay-no-${index}`}
                            name={`autoplay-${index}`}
                            checked={block.autoplay === false}
                            onChange={() => {
                              const currentBlocks = section.contentBlocks || [];
                              const updatedBlocks = currentBlocks.map((b, i) => 
                                i === index ? { ...b, autoplay: false } : b
                              );
                              onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                            }}
                            className="text-slate-500 focus:ring-slate-500"
                          />
                          <label htmlFor={`autoplay-no-${index}`} className="text-xs text-gray-700">
                            Manual Play
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`loop-${index}`}
                            checked={block.loop || false}
                            onChange={(e) => {
                              const currentBlocks = section.contentBlocks || [];
                              const updatedBlocks = currentBlocks.map((b, i) => 
                                i === index ? { ...b, loop: e.target.checked } : b
                              );
                              onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                            }}
                            className="text-slate-500 focus:ring-slate-500"
                          />
                          <label htmlFor={`loop-${index}`} className="text-xs text-gray-700">
                            Loop Video
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Poster Image URL (Optional)</label>
                      <input
                        type="url"
                        value={block.poster || ''}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, poster: e.target.value } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="https://example.com/poster.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Thumbnail image shown before video plays</p>
                    </div>
                  </>
                )}

                {block.type === 'quote' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Quote Text</label>
                      <textarea
                        value={block.text || ''}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, text: e.target.value } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        rows={2}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="Enter quote text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Author (Optional)</label>
                      <input
                        type="text"
                        value={block.author || ''}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, author: e.target.value } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="Quote author"
                      />
                    </div>
                  </>
                )}

                {block.type === 'list' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">List Type</label>
                      <select
                        value={block.ordered ? 'ordered' : 'unordered'}
                        onChange={(e) => {
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, ordered: e.target.value === 'ordered' } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                      >
                        <option value="unordered">Bullet List</option>
                        <option value="ordered">Numbered List</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">List Items (one per line)</label>
                      <textarea
                        value={(block.items || []).join('\n')}
                        onChange={(e) => {
                          const items = e.target.value.split('\n').filter(item => item.trim());
                          const currentBlocks = section.contentBlocks || [];
                          const updatedBlocks = currentBlocks.map((b, i) => 
                            i === index ? { ...b, items } : b
                          );
                          onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                        }}
                        rows={4}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="List item 1&#10;List item 2&#10;List item 3"
                      />
                    </div>
                  </>
                )}

                {block.type === 'code' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Code</label>
                    <textarea
                      value={block.code || ''}
                      onChange={(e) => {
                        const currentBlocks = section.contentBlocks || [];
                        const updatedBlocks = currentBlocks.map((b, i) => 
                          i === index ? { ...b, code: e.target.value } : b
                        );
                        onInputChange(sectionKey, 'contentBlocks', updatedBlocks);
                      }}
                      rows={6}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 font-mono"
                      placeholder="// Your code here..."
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!section.contentBlocks || section.contentBlocks.length === 0) && (
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-700">No content blocks added yet. Use the dropdown above to add your first content block.</p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Call to Action</h3>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">CTA Title</label>
          <input
            type="text"
            value={section.ctaText || ''}
            onChange={(e) => onInputChange(sectionKey, 'ctaText', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="e.g., Ready to Get Started?"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">CTA Description</label>
          <textarea
            value={section.ctaDescription || ''}
            onChange={(e) => onInputChange(sectionKey, 'ctaDescription', e.target.value)}
            rows={2}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="Optional description for the CTA section"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">CTA Button Text</label>
          <input
            type="text"
            value={section.ctaButtonText || ''}
            onChange={(e) => onInputChange(sectionKey, 'ctaButtonText', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="e.g., Get Started, Learn More, Contact Us"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">CTA Button Link</label>
          <input
            type="text"
            value={section.ctaButtonLink || ''}
            onChange={(e) => onInputChange(sectionKey, 'ctaButtonLink', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="e.g., https://example.com, /contact, #section"
          />
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
        <select
          value={section.backgroundColor || 'white'}
          onChange={(e) => onInputChange(sectionKey, 'backgroundColor', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <option value="white">White</option>
          <option value="gray-50">Light Gray</option>
          <option value="blue-50">Light Blue</option>
          <option value="green-50">Light Green</option>
          <option value="purple-50">Light Purple</option>
          <option value="yellow-50">Light Yellow</option>
        </select>
      </div>
    </div>
  );
}
