import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWTService } from '../auth/jwt';

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only run middleware on admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  try {
    const token = request.cookies.get('admin_token')?.value;

    // If no token found, redirect to login
    if (!token) {
      console.log('No auth token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify token
    try {
      const decoded = await JWTService.verifyToken(token);
      if (!decoded || !decoded.username || !decoded.isAdmin) {
        console.log('Invalid token found, redirecting to login');
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_token');
        return response;
      }
    } catch (error) {
      console.error('Token verification error:', error);
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const authConfig = {
  matcher: '/admin/:path*'
};
