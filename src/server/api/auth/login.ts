import { NextRequest } from "next/server";
import { AuthService } from "../../services/features/auth.service";
import { ResponseHelper } from "../../utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return ResponseHelper.error("Username and password are required", 400);
    }

    const result = await AuthService.login({ username, password });

    if (!result.success) {
      if (result.errors) {
        return ResponseHelper.validationError(result.errors, result.message);
      }
      return ResponseHelper.unauthorized(result.message);
    }

    // Create response with cookie
    const response = ResponseHelper.success({ success: true });

    // Set cookie with token
    response.cookies.set({
      name: "admin_token",
      value: result.token!,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    console.log("Login successful for username:", username);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return ResponseHelper.serverError("Internal server error");
  }
}
