import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super_secret_fallback_key_for_dev'
);

export type TokenPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// Sign a JWT token
export async function signToken(payload: TokenPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token expires in 7 days
    .sign(SECRET_KEY);
  
  return token;
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
}

// Set HTTP-Only Session Cookie
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
  });
}

// Clear Session Cookie (Logout)
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
