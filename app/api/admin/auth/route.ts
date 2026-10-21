import { NextResponse } from "next/server";
import { signAdminToken, verifyAdminRequest } from "@/lib/auth";
import {
  verifyAdminCredentials,
  getAdminUserByUsername,
  updateAdminUserLastLogin,
  getAdminUsers,
} from "@/lib/db";

export async function GET(request: Request) {
  const authResult = verifyAdminRequest(request);

  if (!authResult.authenticated || !authResult.username) {
    return NextResponse.json({
      authenticated: false,
    });
  }

  const user = await getAdminUserByUsername(authResult.username);
  if (!user) {
    return NextResponse.json({
      authenticated: false,
    });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: user.username,
      name: user.name,
      role: user.role,
      last_login: user.last_login,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, passcode } = body;

    // Support both username+password and legacy passcode
    const effectiveUsername = username?.trim() || "admin";
    const effectivePassword = password?.trim() || passcode?.trim();

    if (!effectivePassword) {
      return NextResponse.json(
        { success: false, error: "Admin username and password are required" },
        { status: 400 }
      );
    }

    // Verify credentials according to database
    const user = await verifyAdminCredentials(effectiveUsername, effectivePassword);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid admin username or password. Access denied." },
        { status: 401 }
      );
    }

    // Generate signed token
    const token = signAdminToken(user.username);

    // Update last login timestamp in DB
    await updateAdminUserLastLogin(user.id);

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
      message: "Admin authentication successful",
    });

    // Set secure HttpOnly cookie for session persistence across pages
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin Auth Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal authentication error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
  response.cookies.delete("admin_token");
  return response;
}
