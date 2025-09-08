import { NextResponse } from 'next/server';

// Use the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { customDomain } = await request.json();
    
    console.log('🔍 API: Setting custom domain for website:', id, 'to:', customDomain);

    if (!customDomain) {
      return NextResponse.json(
        { error: 'Custom domain is required' },
        { status: 400 }
      );
    }

    // Call backend API to set custom domain
    const backendResponse = await fetch(`${API_BASE_URL}/websites/${id}/custom-domain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || ''
      },
      body: JSON.stringify({ customDomain })
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to set custom domain' },
        { status: backendResponse.status }
      );
    }

    console.log('✅ API: Custom domain set successfully');
    return NextResponse.json(data);

  } catch (error) {
    console.error('❌ API: Error setting custom domain:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    console.log('🔍 API: Removing custom domain for website:', id);

    // Call backend API to remove custom domain
    const backendResponse = await fetch(`${API_BASE_URL}/websites/${id}/custom-domain`, {
      method: 'DELETE',
      headers: {
        'Authorization': request.headers.get('authorization') || ''
      }
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to remove custom domain' },
        { status: backendResponse.status }
      );
    }

    console.log('✅ API: Custom domain removed successfully');
    return NextResponse.json(data);

  } catch (error) {
    console.error('❌ API: Error removing custom domain:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
