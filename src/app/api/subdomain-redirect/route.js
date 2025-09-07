import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const hostname = request.headers.get('host') || '';
    console.log('🌐 API Route - Hostname:', hostname);
    
    // Extract subdomain
    const subdomain = getSubdomain(hostname);
    console.log('🔍 API Route - Detected subdomain:', subdomain);
    
    if (!subdomain || isMainDomain(subdomain)) {
      return NextResponse.json({ error: 'No subdomain found' }, { status: 404 });
    }
    
    // Fetch website data from backend
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const response = await fetch(`${API_BASE_URL}/subdomain/${subdomain}`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 });
    }
    
    const data = await response.json();
    console.log('✅ API Route - Found website:', data.websiteId);
    
    // Redirect to published URL
    const publishedUrl = `/published/${data.websiteId}`;
    return NextResponse.redirect(new URL(publishedUrl, request.url));
    
  } catch (error) {
    console.error('❌ API Route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getSubdomain(hostname) {
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

function isMainDomain(subdomain) {
  const mainDomains = ['www', 'api', 'admin', 'app'];
  return mainDomains.includes(subdomain.toLowerCase());
}
