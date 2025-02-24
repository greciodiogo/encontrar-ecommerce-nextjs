import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/control-panel', '/users'];
const publicRoutes = ['/', '/products', '/cart', 'preview-product', 'checkout', '/auth'];

const middleware = (req: NextRequest) => {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get user information from cookies
  const cookieStore = cookies();
  const session = cookieStore.get('accessToken');

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.value) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }

  // if (req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/', req.nextUrl));
  // }

  // 5. Redirect to / if the user is authenticated
  if (isPublicRoute && session?.value && !req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
};

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// eslint-disable-next-line import/no-default-export
export default middleware;
