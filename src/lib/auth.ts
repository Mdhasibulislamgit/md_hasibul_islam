import { SignJWT, jwtVerify } from 'jose';

export interface JWTPayload {
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export async function generateToken(username: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');
  
  return await new SignJWT({ username, isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');
    const { payload } = await jwtVerify(token, secret);
    
    if (payload && typeof payload === 'object' && payload !== null) {
      if (payload.username && typeof payload.username === 'string') {
        return {
          username: payload.username,
          isAdmin: payload.isAdmin === true,
          iat: payload.iat || 0,
          exp: payload.exp || 0
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
}
