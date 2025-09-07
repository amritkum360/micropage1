import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const host = searchParams.get('host');
    
    console.log('🔍 Subdomain redirect API called with host:', host);
    
    if (!host) {
      return NextResponse.json({ error: 'Host is required' }, { status: 400 });
    }

    // Extract subdomain from host
    let subdomain = '';
    if (host.includes('localhost')) {
      const parts = host.split('.');
      if (parts.length >= 2 && parts[0] !== 'localhost') {
        subdomain = parts[0];
      }
    } else if (host.includes('jirocash.com')) {
      const parts = host.split('.');
      if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'jirocash') {
        subdomain = parts[0];
      }
    }

    console.log('🌐 Extracted subdomain:', subdomain);

    if (!subdomain) {
      return NextResponse.json({ error: 'No subdomain found in host' }, { status: 400 });
    }

    // Make request to backend to get website ID from subdomain
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    console.log('🔍 Fetching from backend:', `${backendUrl}/api/domains/subdomain/${subdomain}`);
    
    const response = await fetch(`${backendUrl}/api/domains/subdomain/${subdomain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('❌ Backend response not ok:', response.status);
      return NextResponse.json({ error: 'Subdomain not found' }, { status: 404 });
    }

    const domainData = await response.json();
    console.log('✅ Backend data:', domainData);
    
    if (!domainData.websiteId) {
      return NextResponse.json({ error: 'No website associated with this subdomain' }, { status: 404 });
    }

    // Redirect to the published page
    const publishedUrl = `/published/${domainData.websiteId}`;
    console.log('🔄 Redirecting to:', publishedUrl);
    
    return NextResponse.redirect(new URL(publishedUrl, request.url));

  } catch (error) {
    console.error('❌ Subdomain redirect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
