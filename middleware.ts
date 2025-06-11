import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 🔒 Admin-only routes
  if (pathname.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 🔒 User-only routes
  if (pathname.startsWith('/dashboard') && token.role !== 'user') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // ✅ Allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
