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
      {
        source: "/blog/they-didnt-burn-the-wild-out-of-us",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/which-retreat-is-right-for-you-mexico-morocco-kenya",
        destination: "/blog",
        permanent: true,
      },
      /** Guide refreshed for 2027 (Nov 2026): the slug changed with the year. */
      {
        source: "/blog/womens-retreats-2026-ultimate-guide",
        destination: "/blog/womens-retreats-2027-ultimate-guide",
        permanent: true,
      },
      /** Merged into stronger posts (Nov 2026), so they point at the post that absorbed them. */
      {
        source: "/blog/what-to-expect-at-your-first-womens-retreat",
        destination: "/blog/what-actually-happens-at-a-womens-retreat-day-by-day",
        permanent: true,
      },
      {
        source: "/blog/womens-retreat-vs-vacation-whats-the-difference",
        destination: "/blog/how-to-afford-a-womens-retreat",
        permanent: true,
      },
      {
        source: "/blog/the-women-who-come-on-retreat",
        destination: "/blog/10-signs-youre-ready-for-a-womens-retreat",
        permanent: true,
      },
      /**
       * /retreats/mexico used to redirect home (temporary, Nov 2026). It now
       * serves the closed-retreat sign-up page instead, so no rule here.
       */
    ];
  },
};

export default nextConfig;
