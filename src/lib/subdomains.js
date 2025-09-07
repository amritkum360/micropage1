// Subdomain management functions

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Get subdomain data from backend
 */
export async function getSubdomainData(subdomain) {
  try {
    const response = await fetch(`${API_BASE_URL}/subdomain/${subdomain}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subdomain data:', error);
    return null;
  }
}

/**
 * Check if subdomain is available
 */
export async function checkSubdomainAvailability(subdomain) {
  try {
    const response = await fetch(`${API_BASE_URL}/websites/check-subdomain/${subdomain}`);
    
    if (response.ok) {
      const data = await response.json();
      return data.available;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking subdomain availability:', error);
    return false;
  }
}

/**
 * Get all subdomains (for admin)
 */
export async function getAllSubdomains() {
  try {
    const response = await fetch(`${API_BASE_URL}/websites/all-subdomains`);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.subdomains || [];
  } catch (error) {
    console.error('Error fetching all subdomains:', error);
    return [];
  }
}

/**
 * Validate subdomain format
 */
export function isValidSubdomain(subdomain) {
  const subdomainRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]?$/;
  return subdomainRegex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 63;
}
