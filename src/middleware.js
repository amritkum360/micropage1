import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  console.log('🚀 MIDDLEWARE TRIGGERED!');
  console.log('🌐 Host:', host);
  console.log('🌐 Path:', req.nextUrl.pathname);

  // Parse host to extract subdomain
  const parts = host.split(".");
  let subdomain = parts[0];

  // Handle different environments
  const isLocalhost = host.includes('localhost');
  const isProduction = host.includes('jirocash.com');
  
  console.log('🌐 Parts:', parts);
  console.log('🌐 Parts length:', parts.length);
  console.log('🌐 Subdomain:', subdomain);
  console.log('🌐 Is localhost:', isLocalhost);

  // Skip middleware for API routes, static files, and admin routes
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/builder') ||
    url.pathname.startsWith('/profile') ||
    url.pathname.startsWith('/reset-password') ||
    url.pathname.startsWith('/debug') ||
    url.pathname.startsWith('/subdomain/') ||
    url.pathname.startsWith('/published/')
  ) {
    console.log('🌐 Skipping for admin/subdomain route:', url.pathname);
    return NextResponse.next();
  }

  // Check if this is a subdomain request
  const hasSubdomain = isLocalhost ? 
    (parts.length >= 2 && parts[0] !== 'localhost') : 
    (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'jirocash');
  
  console.log('🌐 Has subdomain:', hasSubdomain);

  // If no subdomain detected, show main site
  if (!hasSubdomain) {
    console.log('🌐 No subdomain, showing main site');
    return NextResponse.next();
  }

  // Extract subdomain and rewrite
  subdomain = parts[0];
  console.log('🌐 Processing subdomain:', subdomain);
  
  url.pathname = `/subdomain/${subdomain}`;
  console.log('🌐 Rewriting to:', url.pathname);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}