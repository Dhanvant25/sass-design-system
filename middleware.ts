import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type UserRole = "super_admin" | "agency_admin" | "user";

interface UserData {
  role: UserRole;
  isOnboardingCompleted?: boolean;
  [key: string]: any;
}

const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/onboarding",
];

const getDefaultRedirectPath = (userData: UserData): string => {
  switch (userData.role) {
    case "super_admin":
      return "/admin";
    case "agency_admin":
      return userData.isOnboardingCompleted ? "/agency" : "/onboarding";
    case "user":
    default:
      return "/dashboard";
  }
};

const shouldRedirectToDefault = (
  userData: UserData,
  pathname: string
): boolean => {
  if (!userData.role) return false;

  const rolePaths: Record<UserRole, string> = {
    super_admin: "/admin",
    agency_admin: "/agency",
    user: "/dashboard",
  };

  const defaultPath = rolePaths[userData.role];
  return (
    !pathname.startsWith(defaultPath) &&
    !(userData.role === "agency_admin" && pathname.startsWith("/client"))
  );
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const userData: UserData = JSON.parse(
    request.cookies.get("userData")?.value || "{}"
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Handle unauthenticated users
  if (!accessToken) {
    return isPublicRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Handle authenticated users
  if (accessToken) {
    // Prevent access to agency dashboard if onboarding not completed
    if (
      pathname.startsWith("/agency") &&
      userData.role === "agency_admin" &&
      !userData.isOnboardingCompleted
    ) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // Allow access to onboarding for agency admins who haven't completed it
    if (
      pathname === "/onboarding" &&
      userData.role === "agency_admin" &&
      !userData.isOnboardingCompleted
    ) {
      return NextResponse.next();
    }

    // Redirect from auth pages to appropriate dashboard
    if (isPublicRoute) {
      const redirectPath = getDefaultRedirectPath(userData);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // Ensure users are on their designated routes
    if (shouldRedirectToDefault(userData, pathname)) {
      const redirectPath = getDefaultRedirectPath(userData);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
