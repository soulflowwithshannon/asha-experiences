import type { NextConfig } from "next";

/**
 * www → apex is handled by Vercel at the domain level (Project → Settings →
 * Domains), so there is deliberately no redirect rule here.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
