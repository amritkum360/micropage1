import { NextResponse } from 'next/server';

// Use the backend API instead of direct database connection
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function GET(request, { params }) {
  try {
    const { subdomain } = await params;
    console.log('🔍 API: Looking for website with subdomain:', subdomain);

    if (!subdomain) {
      return NextResponse.json(
        { error: 'Subdomain is required' },
        { status: 400 }
      );
    }

    // Call backend API to get website by subdomain
    const backendResponse = await fetch(`${API_BASE_URL}/websites/subdomain/${subdomain}`);
    
    console.log('📊 Backend API response status:', backendResponse.status);

    if (!backendResponse.ok) {
      if (backendResponse.status === 404) {
        console.log('❌ API: No published website found for subdomain:', subdomain);
        return NextResponse.json(
          { error: 'Website not found or not published' },
          { status: 404 }
        );
      }
      throw new Error(`Backend API error: ${backendResponse.status}`);
    }

    const website = await backendResponse.json();
    console.log('✅ API: Returning website data for subdomain:', subdomain);
    return NextResponse.json(website);

  } catch (error) {
    console.error('❌ API: Error fetching website by subdomain:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
