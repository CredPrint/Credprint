// ==========================================
// FILE: next.config.ts (FIXED)
// ==========================================
// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable Server Actions.
   * This is required for modern Next.js features and libraries
   * like Clerk, even if you are not writing them yourself.
   */
  serverActions: true,

  // Add any Next.js-specific config here (e.g., images, env vars)
  experimental: {
    // THIS IS THE FIX:
    // This tells Next.js/Turbopack to NOT bundle 'pdf-parse'.
    // It will be 'require()'d at runtime on the server, just like
    // a classic Node.js app, bypassing the ESM build error.
    serverComponentsExternalPackages: ['pdf-parse'],
  },

};

export default nextConfig;