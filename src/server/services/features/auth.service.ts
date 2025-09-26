import { JWTService } from '../../auth/jwt';
import { CredentialsService } from '../../auth/credentials';
import { LoginSchema } from '../../validators/auth.validator';
import { z } from 'zod';

export class AuthService {
  static async login(credentials: { username: string; password: string }): Promise<{
    success: boolean;
    token?: string;
    message?: string;
    errors?: z.ZodIssue[];
  }> {
    const validationResult = LoginSchema.safeParse(credentials);

    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid input.',
        errors: validationResult.error.issues
      };
    }

    const { username, password } = validationResult.data;

    if (!CredentialsService.isConfigured()) {
      console.error("Admin credentials not configured");
      return {
        success: false,
        message: "Authentication service is currently unavailable."
      };
    }

    const isValid = CredentialsService.validateAdminCredentials(username, password);
    
    if (!isValid) {
      return {
        success: false,
        message: "Invalid username or password."
      };
    }

    try {
      const token = await JWTService.generateToken(username);
      return {
        success: true,
        token
      };
    } catch (error) {
      console.error('Token generation error:', error);
      return {
        success: false,
        message: "Authentication failed."
      };
    }
  }

  static async verifyToken(token: string): Promise<{
    valid: boolean;
    payload?: any;
    message?: string;
  }> {
    try {
      const payload = await JWTService.verifyToken(token);
      
      if (payload) {
        return {
          valid: true,
          payload
        };
      }

      return {
        valid: false,
        message: "Invalid token"
      };
    } catch (error) {
      console.error('Token verification error:', error);
      return {
        valid: false,
        message: "Token verification failed"
      };
    }
  }

  static async refreshToken(token: string): Promise<{
    success: boolean;
    token?: string;
    message?: string;
  }> {
    try {
      const newToken = await JWTService.refreshToken(token);
      
      if (newToken) {
        return {
          success: true,
          token: newToken
        };
      }

      return {
        success: false,
        message: "Failed to refresh token"
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      return {
        success: false,
        message: "Token refresh failed"
      };
    }
  }
}
