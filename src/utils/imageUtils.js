/**
 * Utility functions for handling images in the application
 */

/**
 * Upload image to server and return image data
 * @param {File} file - The file to upload
 * @param {string} token - User authentication token
 * @param {number} maxSizeMB - Maximum file size in MB (default: 5)
 * @returns {Promise<Object>} Object containing image data and metadata
 */
export const uploadImageToServer = async (file, token, maxSizeMB = 5) => {
  try {
    // Import the upload service dynamically to avoid circular dependencies
    const { uploadImage } = await import('@/services/imageUploadService');
    
    // Upload image to server
    const result = await uploadImage(file, token);
    
    // Return formatted image data
    const imageData = {
      url: result.file.url,
      filename: result.file.filename,
      originalName: result.file.originalName,
      fileSize: result.file.size,
      fileType: result.file.mimetype,
      uploadedAt: new Date().toISOString(),
      isServerImage: true
    };
    
    return imageData;
  } catch (error) {
    console.error('Server upload failed:', error);
    throw error;
  }
};

/**
 * Convert a file to base64 string (fallback method)
 * @param {File} file - The file to convert
 * @param {number} maxSizeMB - Maximum file size in MB (default: 5)
 * @returns {Promise<Object>} Object containing base64 data and metadata
 */
export const convertFileToBase64 = (file, maxSizeMB = 5) => {
  return new Promise((resolve, reject) => {
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      reject(new Error(`File size must be less than ${maxSizeMB}MB`));
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64String = e.target.result;
      const imageData = {
        base64: base64String,
        preview: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString(),
        isServerImage: false
      };
      resolve(imageData);
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file. Please try again.'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Get the display source for an image (URL, base64, or preview)
 * @param {Object|string} imageData - Image data object or string URL
 * @returns {string|null} The image source for display
 */
export const getImageSrc = (imageData) => {
  if (!imageData) return null;
  
  // If image is stored as an object with server URL
  if (typeof imageData === 'object' && imageData.url && imageData.isServerImage) {
    return imageData.url;
  }
  
  // If image is stored as an object with base64 data
  if (typeof imageData === 'object' && imageData.base64) {
    return imageData.base64;
  }
  
  // If image is stored as an object with preview URL
  if (typeof imageData === 'object' && imageData.preview) {
    return imageData.preview;
  }
  
  // If image is stored as a string (for backward compatibility)
  if (typeof imageData === 'string') {
    return imageData;
  }
  
  return null;
};

/**
 * Check if an image is uploaded
 * @param {Object|string} imageData - Image data object or string URL
 * @returns {boolean} True if image is uploaded
 */
export const isImageUploaded = (imageData) => {
  if (!imageData) return false;
  
  // If image is stored as an object with server URL or base64 data
  if (typeof imageData === 'object' && (imageData.url || imageData.base64)) {
    return true;
  }
  
  // If image is stored as a string (for backward compatibility)
  if (typeof imageData === 'string' && imageData) {
    return true;
  }
  
  return false;
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
    // Check if URL contains /uploads/ path
    return url.pathname.includes('/uploads/');
  } catch (error) {
    return false;
  }
};

/**
 * Get image metadata for display
 * @param {Object|string} imageData - Image data object or string URL
 * @returns {Object|null} Image metadata object
 */
export const getImageMetadata = (imageData) => {
  if (!imageData) return null;
  
  // If image is stored as an object with metadata
  if (typeof imageData === 'object' && (imageData.fileName || imageData.originalName)) {
    return {
      fileName: imageData.fileName || imageData.originalName,
      fileSize: imageData.fileSize,
      fileType: imageData.fileType,
      uploadedAt: imageData.uploadedAt,
      isServerImage: imageData.isServerImage || false
    };
  }
  
  return null;
};

/**
 * Clean up image preview URLs to prevent memory leaks
 * @param {Object|string} imageData - Image data object or string URL
 */
export const cleanupImagePreview = (imageData) => {
  if (imageData && typeof imageData === 'object' && imageData.preview) {
    // Revoke the object URL to free memory
    URL.revokeObjectURL(imageData.preview);
  }
};

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in MB (default: 5)
 * @param {Array} allowedTypes - Array of allowed MIME types (default: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'])
 * @returns {Object} Validation result with isValid boolean and error message
 */
export const validateImageFile = (file, maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']) => {
  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type not supported. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  return {
    isValid: true,
    error: null
  };
};
