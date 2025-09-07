import { NextResponse } from "next/server";

// Simplified middleware - let client-side handle subdomain logic
export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Debug logging
  console.log("🔍 Middleware triggered for host:", host);
  console.log("🔍 URL path:", url.pathname);

  // For localhost development - redirect subdomains to catch-all page
  if (host.includes("localhost")) {
    const parts = host.split(".");
    
    if (parts.length >= 2 && parts[0] !== "localhost") {
      let subdomain = parts[0];
      console.log("🚀 Localhost subdomain detected:", subdomain);
      
      // Redirect to catch-all page that will handle the subdomain logic
      url.pathname = `/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  // For production subdomains
  if (host.includes("jirocash.com")) {
    const parts = host.split(".");
    
    if (parts.length >= 3 && parts[0] !== "www" && parts[0] !== "jirocash") {
      let subdomain = parts[0];
      console.log("🌐 Production subdomain detected:", subdomain);
      
      // Redirect to catch-all page that will handle the subdomain logic
      url.pathname = `/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  console.log("➡️ No subdomain detected, continuing normally");
  return NextResponse.next();
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
