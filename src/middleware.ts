// ==========================================
// FILE: src/middleware.ts (Definitive Fix)
// ==========================================
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'; // <-- 1. Correct import path

// Define all routes that should be publicly accessible.
// This INCLUDES your API routes, which handle their own auth checks.
const isPublicRoute = createRouteMatcher(
  '/api/onboarding/generate-score(.*)', // Your API route [1])

);
export default clerkMiddleware((auth, req) => {
  // If the request is for a route that is NOT in the public list,
  // then protect it.
  if (!isPublicRoute(req)) {
    auth.protect(); // <-- 2. Correct syntax: auth() is a function
  }

  // If the route IS in the public list, do nothing.
  // The request will be allowed to proceed.
});

export const config = {
  // This matcher runs the middleware on all requests
  // *except* for static files and _next internals.
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};