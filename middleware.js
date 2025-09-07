import { NextResponse } from "next/server";

// Simple middleware - let backend handle everything
export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  console.log("🔍 Middleware - Host:", host, "Path:", url.pathname);

  // Check if this looks like a subdomain request
  const isSubdomainRequest = (
    (host.includes("localhost") && host.split(".")[0] !== "localhost") ||
    (host.includes("jirocash.com") && !host.startsWith("www.") && !host.startsWith("jirocash."))
  );

  if (isSubdomainRequest) {
    console.log("🚀 Subdomain detected, redirecting to backend handler");
    // Redirect to backend API that will handle the redirect
    url.pathname = '/api/subdomain-redirect';
    url.searchParams.set('host', host);
    return NextResponse.rewrite(url);
  }

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
