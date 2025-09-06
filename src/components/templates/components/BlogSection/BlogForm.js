'use client';

import React, { useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImageToServer, isImageUploaded, getImageSrc, getImageMetadata } from '@/utils/imageUtils';

export default function BlogForm({ section, onInputChange, sectionKey = 'blog' }) {
  const fileInputRefs = useRef({});
  const { token } = useAuth();

  const addPost = () => {
    const newPosts = [...(section.posts || []), {
      title: 'New Blog Post',
      excerpt: 'Brief description of the blog post...',
      date: new Date().toLocaleDateString(),
      link: '',
      image: ''
    }];
    onInputChange(sectionKey, 'posts', newPosts);
  };

  const removePost = (index) => {
    const newPosts = section.posts.filter((_, i) => i !== index);
    onInputChange(sectionKey, 'posts', newPosts);
  };

  const updatePost = (index, field, value) => {
    const newPosts = [...section.posts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    onInputChange(sectionKey, 'posts', newPosts);
  };

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (!token) {
          alert('Please login to upload images');
          return;
        }

        console.log(`🚀 Starting blog post ${index} image upload:`, {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        });

        // Show loading state for this specific post image
        const currentPosts = [...(section.posts || [])];
        currentPosts[index] = {
          ...currentPosts[index],
          image: {
            loading: true,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
          }
        };
        onInputChange(sectionKey, 'posts', currentPosts);

        // Upload image to server
        const imageData = await uploadImageToServer(file, token, 5);
        console.log(`✅ Blog post ${index} image upload successful:`, imageData);
        
        // Verify the data structure
        if (!imageData.url) {
          throw new Error('Server response missing image URL');
        }
        
        // Update the specific post with server image data
        const updatedPosts = [...(section.posts || [])];
        updatedPosts[index] = {
          ...updatedPosts[index],
          image: imageData
        };
        onInputChange(sectionKey, 'posts', updatedPosts);
        
        // Verify the data was set
        console.log(`🔍 Blog post ${index} image data after setting:`, imageData);
        
      } catch (error) {
        console.error(`❌ Blog post ${index} image upload failed:`, error);
        alert(error.message);
        // Remove loading state on error
        const currentPosts = [...(section.posts || [])];
        currentPosts[index] = {
          ...currentPosts[index],
          image: ''
        };
        onInputChange(sectionKey, 'posts', currentPosts);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Blog Title */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Blog Title</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => onInputChange(sectionKey, 'title', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Our Blog"
        />
      </div>
      
      {/* Blog Subtitle */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Blog Subtitle</label>
        <input
          type="text"
          value={section.subtitle || ''}
          onChange={(e) => onInputChange(sectionKey, 'subtitle', e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Latest Articles & Insights"
        />
      </div>

      {/* Blog Posts Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Blog Posts</label>
          <button
            type="button"
            onClick={addPost}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            + Add Post
          </button>
        </div>
        
        <div className="space-y-3">
          {(section.posts || []).map((post, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-xs font-medium text-gray-700">Blog Post {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removePost(index)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {/* Post Title */}
                <input
                  type="text"
                  value={post.title || ''}
                  onChange={(e) => updatePost(index, 'title', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Blog Post Title"
                />

                {/* Post Excerpt */}
                <textarea
                  value={post.excerpt || ''}
                  onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Brief description of the blog post..."
                  rows="2"
                />

                {/* Post Date */}
                <input
                  type="text"
                  value={post.date || ''}
                  onChange={(e) => updatePost(index, 'date', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Publication Date"
                />

                {/* Post Image Upload */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Blog Post Image</label>
                  <div className="flex items-center space-x-2">
                    <input
                      ref={(el) => fileInputRefs.current[`image-${index}`] = el}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[`image-${index}`]?.click()}
                      disabled={post.image?.loading}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        post.image?.loading
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {post.image?.loading ? (
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        'Choose Image'
                      )}
                    </button>
                    {post.image && !post.image.loading && (
                      <span className="text-xs text-gray-600 truncate">
                        {post.image.isServerImage ? 'Image uploaded to server' : 'Image selected'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Image Preview */}
                {isImageUploaded(post.image) && !post.image?.loading && (
                  <div className="mt-2">
                    <label className="block text-xs text-gray-600 mb-1">Image Preview:</label>
                    <div className="w-20 h-16 border border-gray-200 rounded overflow-hidden bg-white">
                      <img
                        src={getImageSrc(post.image)}
                        alt={`Blog post ${index + 1} image`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-50" style={{display: 'none'}}>
                        Invalid Image
                      </div>
                    </div>
                    {/* Image Metadata */}
                    {getImageMetadata(post.image) && (
                      <div className="text-xs text-gray-500 mt-1">
                        {getImageMetadata(post.image).fileName} ({(getImageMetadata(post.image).fileSize / 1024).toFixed(1)}KB)
                      </div>
                    )}
                  </div>
                )}

                {/* Read More Link */}
                <input
                  type="text"
                  value={post.link || ''}
                  onChange={(e) => updatePost(index, 'link', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Read More Link (e.g., https://example.com/article)"
                />
              </div>
            </div>
          ))}
          
          {(!section.posts || section.posts.length === 0) && (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-md">
              No blog posts yet. Click &quot;Add Post&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
