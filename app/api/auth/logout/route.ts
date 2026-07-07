import { NextRequest } from 'next/server';
import { successResponse } from '@/lib/api/response';
import { clearAuthCookie } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  // Clear the cookie
  await clearAuthCookie();
  
  return successResponse({ message: 'Logged out successfully' });
}
