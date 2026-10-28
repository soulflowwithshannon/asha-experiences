import type { NextConfig } from "next";

/**
 * www → apex is handled by Vercel at the domain level (Project → Settings →
 * Domains), so there is deliberately no redirect rule here.
 */
const nextConfig: NextConfig = {
  /**
   * Retired journal posts. These URLs are indexed and have inbound links, so
   * they redirect permanently to the journal rather than 404.
   */
  async redirects() {
    return [
      {
        source: "/blog/is-mexico-safe-for-solo-women-travelers",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/what-to-pack-for-a-jungle-retreat",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
