// Utility functions for subdomain handling

export const rootDomain = 'jirocash.com';
export const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

/**
 * Extract subdomain from hostname
 */
export function getSubdomain(hostname) {
  // Handle localhost development
  if (hostname.includes('localhost')) {
    const parts = hostname.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost') {
      return parts[0];
    }
    return null;
  }

  // Handle production domains
  const parts = hostname.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
}

/**
 * Check if subdomain is a main domain
 */
export function isMainDomain(subdomain) {
  const mainDomains = ['www', 'api', 'admin', 'app'];
  return mainDomains.includes(subdomain.toLowerCase());
}

/**
 * Validate subdomain format
 */
export function isValidSubdomain(subdomain) {
  const subdomainRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]?$/;
  return subdomainRegex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 63;
}

/**
 * Sanitize subdomain input
 */
export function sanitizeSubdomain(subdomain) {
  return subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

/**
 * Get full subdomain URL
 */
export function getSubdomainUrl(subdomain) {
  return `${protocol}://${subdomain}.${rootDomain}`;
}
