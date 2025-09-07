import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // example: amrit.jirocash.com → ["amrit", "jirocash", "com"]
  const parts = host.split(".");

  // Check if it's a subdomain of jirocash.com
  if (parts.length >= 3 && parts[parts.length - 2] === "jirocash" && parts[parts.length - 1] === "com") {
    let subdomain = parts[0];

    // agar root domain ho (jirocash.com, www.jirocash.com), to normal website dikhao
    if (subdomain === "www" || subdomain === "jirocash") {
      return NextResponse.next();
    }

    // subdomain ko query ke through bhej do
    url.pathname = "/subdomain";
    url.searchParams.set("name", subdomain);

    return NextResponse.rewrite(url);
  }

  // For localhost development
  if (host.includes("localhost")) {
    const parts = host.split(".");
    if (parts.length >= 2 && parts[0] !== "localhost") {
      let subdomain = parts[0];
      
      // subdomain ko query ke through bhej do
      url.pathname = "/subdomain";
      url.searchParams.set("name", subdomain);

      return NextResponse.rewrite(url);
    }
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
