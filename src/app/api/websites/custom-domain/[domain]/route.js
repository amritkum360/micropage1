import { NextResponse } from 'next/server';

// Use the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micropage.onrender.com/api';

export async function GET(request, { params }) {
  try {
    const { domain } = await params;
    console.log('🔍 API: Looking for website with custom domain:', domain);

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    // Call backend API to get website by custom domain
    console.log('🔄 Calling backend API:', `${API_BASE_URL}/websites/custom-domain/${encodeURIComponent(domain)}`);
    const backendResponse = await fetch(`${API_BASE_URL}/websites/custom-domain/${encodeURIComponent(domain)}`);
    
    console.log('📊 Backend API response status:', backendResponse.status);

    if (!backendResponse.ok) {
      if (backendResponse.status === 404) {
        console.log('❌ API: No published website found for custom domain:', domain);
        return NextResponse.json(
          { error: 'Website not found or not published' },
          { status: 404 }
        );
      }
      throw new Error(`Backend API error: ${backendResponse.status}`);
    }

    const website = await backendResponse.json();
    console.log('✅ API: Returning website data for custom domain:', domain);
    return NextResponse.json(website);

  } catch (error) {
    console.error('❌ API: Error fetching website by custom domain:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
