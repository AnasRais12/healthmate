import { NextResponse } from 'next/server';
// Define routes for each role
const adminRoutes = [
  '/manage/dashboard',
  '/manage/settings',
  '/manage/users',
  '/manage/reports',
  '/manage/analytics',
];
const userRoutes = [
  '/report',
  '/profile',
  '/vitals',
  '/timeline',
  '/dashboard',
  '/settings',
];
const publicRoutes = ['/signin', '/signup', '/verify'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public routes without any checks
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Parse cookies from the request
  const role = request.cookies.get('role')?.value;
  
    const token = request.cookies.get('__Host-next-auth.csrf-token')?.value;
    console.log("Token in middleware:", token);
  // If no role is found in cookies, redirect to signin
 if (!role) {
  return NextResponse.redirect(new URL('/signin', request.url));
}
  // Check access for admin routes
  if (adminRoutes.includes(pathname)) {
    if (role !== 'admin') {
      // If non-admin tries to access admin route, redirect to unauthorized
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Check access for user routes
  if (userRoutes.includes(pathname)) {
    if (role !== 'user') {
      // Only allow 'user' role to access user routes
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Allow the request to proceed if all checks pass
  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    '/manage/:path*',
    '/report',
    '/profile',
    '/vitals',
    '/timeline',
    '/dashboard',
    '/settings',
  ],
};
