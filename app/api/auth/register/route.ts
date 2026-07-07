import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken, setAuthCookie } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return errorResponse('Missing required fields: name, email, password', 400);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('User with this email already exists', 409);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user in DB
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'CUSTOMER', // Default role
      },
    });

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
    }, 201);

  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse('Internal server error', 500);
  }
}
