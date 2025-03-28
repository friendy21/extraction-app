// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Allow requests to public routes and API routes
  const isPublicPath = path === '/login';
  const isApiPath = path.startsWith('/api/');
  
  // If the user is not authenticated and the path is not public or API, redirect to login
  if (!isAuthenticated && !isPublicPath && !isApiPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated and trying to access login, redirect to dashboard
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: ['/', '/dashboard/:path*', '/risks/:path*', '/retention/:path*', '/performance/:path*', '/login'],
};