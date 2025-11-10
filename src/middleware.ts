// ==========================================
// FILE: src/middleware.ts (FIXED - Renamed from proxy.ts)
// ==========================================
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes are protected.
// These routes are PUBLIC:
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  // Add your API routes here so auth.protect() skips them
  '/api/onboarding/upload-data(.*)',
  '/api/onboarding/generate-score(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route is NOT public, enforce authentication.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};