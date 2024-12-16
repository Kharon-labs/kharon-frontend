import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/login",
  "/signup",
  "/reset-password",
  "/verify-otp",
  "/reset-password/[token]",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (publicPath) =>
      path.startsWith(publicPath) ||
      path.match(new RegExp(publicPath.replace("[token]", ".*")))
  );

  // Allow access to landing page without redirection
  if (path === "/") {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth paths
  if (isPublicPath && token && path !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (!isPublicPath && !token) {
    const redirectUrl = new URL(`/login`, request.url);
    redirectUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
