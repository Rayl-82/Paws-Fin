import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken, setAuthCookie } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return errorResponse('Missing email or password', 400);
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse('Invalid email or password', 401);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return errorResponse('Invalid email or password', 401);
    }

    // Generate JWT
    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    const token = await signToken(tokenPayload);

    // Set cookie
    await setAuthCookie(token);

    return successResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token, // Return token as requested
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return errorResponse('Internal server error', 500);
  }
}
