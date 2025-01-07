import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'universal-cookie';

// Define the protected and public routes
const protectedRoutes = ['/user-profile/:path*', '/listing-profile/:path*', '/admin/dashboard',];
const publicRoutes = ['/login', '/signup', '/', '/listing-login', '/listing-signup', '/admin',];

// Helper function to match dynamic routes
function isRouteMatching(path: string, routePatterns: string[]) {
    return routePatterns.some((pattern) => {
        const regex = new RegExp(`^${pattern.replace(':path*', '.*')}$`);
        return regex.test(path);
    });
}

export default async function middleware(req: NextRequest) {
    const cookies = new Cookies(req.headers.get('cookie') || '');
    const userToken = cookies.get('userToken');
    const firmToken = cookies.get('firmToken');
    const adminToken = cookies.get('adminToken');

    // console.log({ userToken, firmToken, adminToken }, 'Cookies');

    const path = req.nextUrl.pathname;

    const isProtectedRoute = isRouteMatching(path, protectedRoutes);
    const isPublicRoute = isRouteMatching(path, publicRoutes);

    // Handle protected routes
    if (isProtectedRoute) {
        if (path.startsWith('/user-profile') && !userToken) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }
        if (path.startsWith('/listing-profile') && !firmToken) {
            return NextResponse.redirect(new URL('/listing-login', req.nextUrl));
        }
        if (path.startsWith('/admin/dashboard') && !adminToken) {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        }
    }

    // Handle public routes
    if (isPublicRoute) {
        // Redirect logged-in users to appropriate protected routes
        if ((path.match('/login') || path.match('/signup')) && userToken)
            return NextResponse.redirect(new URL('/', req.nextUrl));
        if ((path.match('/listing-login') || path.match('/listing-signup')) && firmToken)
            return NextResponse.redirect(new URL('/', req.nextUrl));
        if (path.match('/admin') && adminToken)
            return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // Allow the request to continue if no special handling is required
    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: ['/(.*)'], // Matches all routes
};
