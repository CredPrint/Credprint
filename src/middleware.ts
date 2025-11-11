// ==========================================
// FILE: src/middleware.ts (Definitive Fix)
// ==========================================
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// These routes will be PUBLIC.
// They are NOT protected by the middleware.
const isPublicRoute = createRouteMatcher( [
  '/api/(.*)',
  '/$', // homepage
] );

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
    // Note: It's 'auth.protect()', not 'auth().protect()'
    auth.protect();
  }
  
  // If the route is public (like your API routes or homepage),
  // do nothing. The request is allowed to continue.
});

export const config = {
  // This matcher will run the middleware on ALL requests
  // *except* for static assets and _next internals.
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};