import * as ClerkNext from "@clerk/nextjs";

// The Clerk package may export the middleware under different names across
// versions. Resolve at runtime and keep TypeScript happy by using `any`.
const _clerk = ClerkNext as any;
const resolvedMiddleware = _clerk.authMiddleware ?? _clerk.clerkMiddleware ?? _clerk.middleware ?? _clerk.default;

// If the resolved middleware is not a function at runtime, this will surface
// a clear error. We keep the file typed loosely to avoid TS export mismatch
// errors across @clerk/nextjs versions.
export default (resolvedMiddleware as any)({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
  ],
  // Other options can be added here if needed (domain, signInUrl for satellites, etc.)
});

export const config = {
  // Match all app routes and API routes, but ignore Next.js internals and static files
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
