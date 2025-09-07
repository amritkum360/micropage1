import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, and internal Next.js routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Extract subdomain from hostname
  const subdomain = getSubdomain(hostname);

  // If no subdomain or it's the main domain, continue normally
  if (!subdomain || isMainDomain(subdomain)) {
    return NextResponse.next();
  }

  // For subdomain requests, rewrite to the subdomain page
  const url = request.nextUrl.clone();
  url.pathname = `/subdomain`;
  url.searchParams.set('subdomain', subdomain);
  
  return NextResponse.rewrite(url);
}

function getSubdomain(hostname: string): string | null {
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

function isMainDomain(subdomain: string): boolean {
  const mainDomains = ['www', 'api', 'admin', 'app'];
  return mainDomains.includes(subdomain.toLowerCase());
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
};
