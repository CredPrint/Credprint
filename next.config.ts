// ==========================================
// FILE: next.config.ts (FIXED)
// ==========================================
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: true,
  experimental: {
    // THIS IS THE FIX:
    // This tells Next.js/Turbopack to NOT bundle 'pdf-parse'.
    // It will be 'require()'d at runtime on the server.
    serverComponentsExternalPackages: ['pdf-parse'],
  },
};

export default nextConfig;