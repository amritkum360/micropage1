/**
 * AI Service for generating website content using OpenAI API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micropage.onrender.com/api';

/**
 * Generate website content using AI
 * @param {string} businessDescription - Description of the business/website
 * @param {string} token - User authentication token
 * @returns {Promise<Object>} Generated content
 */
export const generateWebsiteContent = async (businessDescription, token) => {
  try {
    console.log('🤖 AIService - Starting content generation:', {
      businessDescription: businessDescription?.substring(0, 100) + '...',
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'No token'
    });

    const response = await fetch(`${API_BASE_URL}/ai/generate-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        businessDescription: businessDescription
      }),
    });

    console.log('🤖 AIService - Response status:', response.status);
    console.log('🤖 AIService - Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      console.error('🤖 AIService - Generation failed:', errorData);
      throw new Error(errorData.message || 'Content generation failed');
    }

    const result = await response.json();
    console.log('🤖 AIService - Content generated successfully:', result);
    
    return result;
  } catch (error) {
    console.error('🤖 AIService - Generation error:', error);
    throw error;
  }
};

/**
 * Generate hero section content specifically
 * @param {string} businessDescription - Description of the business/website
 * @param {string} token - User authentication token
 * @returns {Promise<Object>} Generated hero content
 */
export const generateHeroContent = async (businessDescription, token) => {
  try {
    console.log('🤖 AIService - Starting hero content generation');

    const response = await fetch(`${API_BASE_URL}/ai/generate-hero`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        businessDescription: businessDescription
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Hero content generation failed');
    }

    const result = await response.json();
    console.log('🤖 AIService - Hero content generated successfully');
    
    return result;
  } catch (error) {
    console.error('🤖 AIService - Hero generation error:', error);
    throw error;
  }
};
