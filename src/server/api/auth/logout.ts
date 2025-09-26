import { ResponseHelper } from "../../utils/response";

export async function POST() {
  try {
    const response = ResponseHelper.success({ success: true });
    
    // Clear the auth token
    response.cookies.set({
      name: "admin_token",
      value: "",
      expires: new Date(0),
      path: "/"
    });

    console.log("Logout successful");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return ResponseHelper.serverError("Logout failed");
  }
}
