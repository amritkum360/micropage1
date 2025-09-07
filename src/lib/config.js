// Configuration constants

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const ROOT_DOMAIN = 'jirocash.com';
export const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';
