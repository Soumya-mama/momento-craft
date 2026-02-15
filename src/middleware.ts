import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Protect Admin Routes
    if (pathname.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Security Headers
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Be careful with permissions policy if using camera features
    // response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
}
