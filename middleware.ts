import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get auth token from cookies
    const token = request.cookies.get('sb-auth-token')?.value;

    if (!token) {
      // No session, redirect to login
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }

    try {
      // Verify token by getting current session
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        // Invalid token, redirect to login
        const url = new URL('/admin/login', request.url);
        const response = NextResponse.redirect(url);
        // Clear invalid token
        response.cookies.delete('sb-auth-token');
        return response;
      }

      // User is authenticated, allow access
      return NextResponse.next();
    } catch (err) {
      // Error verifying token, redirect to login
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
