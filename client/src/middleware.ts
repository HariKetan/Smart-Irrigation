import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Add paths that should be protected
const protectedPaths = ["/dashboard", "/analytics", "/map"]
// Add paths that should be accessible only to non-authenticated users
const authPaths = ["/","/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has("auth-token") // Replace with your actual auth token name

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
} 