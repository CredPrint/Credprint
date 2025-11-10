// ==========================================
// FILE: src/middleware.ts (FIXED)
// ==========================================
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// These routes will be PUBLIC.
// They are NOT protected by the middleware.
const isPublicRoute = createRouteMatcher([
  '/', // The homepage
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  
  // === THIS IS THE FIX ===
  // Your API routes must be "public" in the middleware's eyes.
  // They will protect themselves by calling auth() internally.
  '/api/onboarding/upload-data(.*)',
  '/api/onboarding/generate-score(.*)',
]);

// These routes will be PROTECTED by the middleware.
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/step1(.*)',
  '/step2(.*)',
  '/step3(.*)',
  '/step4(.*)',
  '/step5(.*)',
  '/step6(.*)',
  '/step7(.*)',
  '/step8(.*)',
  '/success(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // If the route is protected, call auth.protect()
  if (isProtectedRoute(req)) {
    auth.protect();
  }
  
  // If the route is public (like your API routes or homepage),
  // do nothing. The request is allowed to continue.
  // Your API routes will then handle their own auth() checks.
});

export const config = {
  // This matcher will run the middleware on ALL requests
  // *except* for static assets and _next internals.
  // FIX: Removed the invalid '/(api|trpc)(.*)' entry.
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};