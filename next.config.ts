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
    // Optional: Enable if using Turbopack features
  },
};

export default nextConfig;