import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  errors?: any[];
}

export class ResponseHelper {
  static success<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
      message
    });
  }

  static error(error: string, status: number = 400, errors?: any[]): NextResponse<ApiResponse> {
    return NextResponse.json({
      success: false,
      error,
      errors
    }, { status });
  }

  static unauthorized(message: string = 'Unauthorized'): NextResponse<ApiResponse> {
    return this.error(message, 401);
  }

  static forbidden(message: string = 'Forbidden'): NextResponse<ApiResponse> {
    return this.error(message, 403);
  }

  static notFound(message: string = 'Not found'): NextResponse<ApiResponse> {
    return this.error(message, 404);
  }

  static validationError(errors: any[], message: string = 'Validation failed'): NextResponse<ApiResponse> {
    return NextResponse.json({
      success: false,
      error: message,
      errors
    }, { status: 422 });
  }

  static serverError(message: string = 'Internal server error'): NextResponse<ApiResponse> {
    return this.error(message, 500);
  }
}
