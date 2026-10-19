import { NextRequest } from "next/server";
import crypto from "crypto";

const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || "heightveda_super_secure_admin_jwt_secret_2026";

export function signAdminToken(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      username: username.toLowerCase().trim(),
      iat: Date.now(),
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days session
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export function verifyAdminToken(token?: string | null): { valid: boolean; username?: string } {
  if (!token) return { valid: false };

  // Handle bearer prefix if passed
  const cleanToken = token.startsWith("Bearer ") ? token.replace("Bearer ", "").trim() : token.trim();

  const parts = cleanToken.split(".");
  if (parts.length !== 3) return { valid: false };

  const [header, payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  if (signature !== expectedSignature) {
    return { valid: false };
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (decoded.exp && decoded.exp < Date.now()) {
      return { valid: false }; // Token expired
    }
    return { valid: true, username: decoded.username };
  } catch {
    return { valid: false };
  }
}

export function verifyAdminRequest(req: Request | NextRequest): { authenticated: boolean; username?: string } {
  // 1. Check Authorization Bearer header
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "").trim();
    const result = verifyAdminToken(token);
    if (result.valid) return { authenticated: true, username: result.username };
  }

  // 2. Check Custom Header x-admin-token
  const customHeader = req.headers.get("x-admin-token");
  if (customHeader) {
    const result = verifyAdminToken(customHeader);
    if (result.valid) return { authenticated: true, username: result.username };
  }

  // 3. Check Cookie admin_token
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, v.join("=")];
      })
    );
    if (cookies["admin_token"]) {
      const result = verifyAdminToken(cookies["admin_token"]);
      if (result.valid) return { authenticated: true, username: result.username };
    }
  }

  return { authenticated: false };
}
