import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /**
       * www served the whole site at 200 alongside the apex domain, so Google
       * crawled both and filed every www URL under "Alternate page with proper
       * canonical tag". The canonical was doing its job, but the duplicate
       * stayed crawlable. This sends www to the apex permanently, path intact.
       */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ashaexperiences.com" }],
        destination: "https://ashaexperiences.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
