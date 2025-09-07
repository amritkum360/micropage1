import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const subdomain = searchParams.get('subdomain');
    
    if (!subdomain) {
      return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 });
    }

    // Make request to backend to get website ID from subdomain
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/domains/subdomain/${subdomain}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Subdomain not found' }, { status: 404 });
    }

    const domainData = await response.json();
    
    if (!domainData.websiteId) {
      return NextResponse.json({ error: 'No website associated with this subdomain' }, { status: 404 });
    }

    // Return the published URL path
    return NextResponse.json({ 
      websiteId: domainData.websiteId,
      publishedUrl: `/published/${domainData.websiteId}`
    });

  } catch (error) {
    console.error('Subdomain redirect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
