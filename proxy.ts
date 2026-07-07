import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth/jwt';

// Add paths that require authentication here
const protectedPaths = [
  '/api/users',
  '/api/pets',
  '/api/orders',
  '/api/cart',
  '/api/subscriptions'
];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isProtected = protectedPaths.some(p => path.startsWith(p));
  
  const token = request.cookies.get('session')?.value;
  let payload = null;

  if (token) {
    payload = await verifyToken(token);
  }

  // If path is protected and there's no valid payload, block it
  if (isProtected && !payload) {
    return NextResponse.json(
      { success: false, error: { message: 'Unauthorized access', code: 'UNAUTHORIZED' } },
      { status: 401 }
    );
  }

  // If there's a valid payload, attach it to headers for downstream route handlers
  if (payload) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.id);
    requestHeaders.set('x-user-role', payload.role);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}

// Configure middleware to only run on API routes (or specific paths)
export const config = {
  matcher: ['/api/:path*'],
};
