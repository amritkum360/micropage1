import { NextResponse } from "next/server";

export function middleware(req) {
  console.log('🚀 MIDDLEWARE TRIGGERED!');
  console.log('🌐 Host:', req.headers.get("host"));
  console.log('🌐 Path:', req.nextUrl.pathname);
  
  // Simple test - just rewrite everything to subdomain page
  const url = req.nextUrl.clone();
  url.pathname = '/subdomain/dramrit';
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