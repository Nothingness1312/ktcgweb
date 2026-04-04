import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and public routes
  if (pathname === '/admin/login' || pathname === '/') {
    return NextResponse.next();
  }

  // For admin routes, rely on client-side protection via useAuth hook
  // The AdminProtectedWrapper component will handle redirects
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
