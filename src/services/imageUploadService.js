/**
 * Service for handling image uploads to the server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micropage.onrender.com/api';

/**
 * Upload an image file to the server
 * @param {File} file - The image file to upload
 * @param {string} token - User authentication token
 * @returns {Promise<Object>} Upload response with file details
 */
export const uploadImage = async (file, token) => {
  try {
    console.log('📤 ImageUploadService - Starting upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      hasToken: !!token
    });

    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('image', file);

    console.log('📤 ImageUploadService - Making API call to:', `${API_BASE_URL}/upload`);

    // Make upload request
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData, browser will set it automatically
      },
      body: formData,
    });

    console.log('📤 ImageUploadService - Response status:', response.status);
    console.log('📤 ImageUploadService - Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json();
      console.error('📤 ImageUploadService - Upload failed:', errorData);
      throw new Error(errorData.message || 'Upload failed');
    }

    const result = await response.json();
    console.log('📤 ImageUploadService - Upload successful:', result);
    
    return result;
  } catch (error) {
    console.error('📤 ImageUploadService - Upload error:', error);
    throw error;
  }
};

/**
 * Delete an uploaded image from the server
 * @param {string} imageUrl - The URL of the image to delete
 * @param {string} token - User authentication token
 * @returns {Promise<boolean>} Success status
 */
export const deleteImage = async (imageUrl, token) => {
  try {
    // Extract filename from URL
    const filename = imageUrl.split('/').pop();
    
    const response = await fetch(`${API_BASE_URL}/upload/${filename}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Delete failed');
    }

    return true;
  } catch (error) {
    console.error('Image delete error:', error);
    throw error;
  }
};

/**
 * Get image info from URL
 * @param {string} imageUrl - The image URL
 * @returns {Object} Image information
 */
export const getImageInfo = (imageUrl) => {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    const filename = url.pathname.split('/').pop();
    
    return {
      filename,
      url: imageUrl,
      isUploaded: url.pathname.startsWith('/uploads/')
    };
  } catch (error) {
    console.error('Error parsing image URL:', error);
    return null;
  }
};

/**
 * Check if an image is uploaded to server
 * @param {string} imageUrl - The image URL
 * @returns {boolean} True if image is uploaded to server
 */
export const isServerImage = (imageUrl) => {
  if (!imageUrl) return false;
  
  try {
    const url = new URL(imageUrl);
    return url.pathname.startsWith('/uploads/');
  } catch (error) {
    return false;
  }
};
