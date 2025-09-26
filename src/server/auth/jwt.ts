import { SignJWT, jwtVerify } from 'jose';

export interface JWTPayload {
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export class JWTService {
  private static getSecret(): Uint8Array {
    return new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');
  }

  static async generateToken(username: string): Promise<string> {
    const secret = this.getSecret();
    
    return await new SignJWT({ username, isAdmin: true })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
  }

  static async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const secret = this.getSecret();
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

  static async refreshToken(token: string): Promise<string | null> {
    const payload = await this.verifyToken(token);
    if (!payload) return null;
    
    return this.generateToken(payload.username);
  }
}
