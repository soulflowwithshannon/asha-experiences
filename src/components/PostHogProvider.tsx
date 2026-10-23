"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";

// The project key is public by design — it ships in the client bundle either
// way — so it is defaulted here rather than depending on an env var being set
// in Vercel. NEXT_PUBLIC_POSTHOG_KEY still overrides it.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "phc_mdqs6K4epfrCJQuackhxaZ2jjcvrmfDURgG7BhhLT4hK";
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

/**
 * Started from an effect, never at import time. posthog.init injects its own
 * <script> tags into <head>, and doing that before React hydrates made React
 * line up the wrong script nodes — it hydrated our JSON-LD against PostHog's
 * tag and warned that the mismatch "won't be patched up", which puts the
 * retreat pages' structured data at risk.
 */
function ensurePostHog() {
  if (typeof window === "undefined" || !KEY || posthog.__loaded) return;
  posthog.init(KEY, {
    api_host: HOST,
    // the App Router changes routes without a reload, so we send pageviews
    // ourselves in PageViews below
    capture_pageview: false,
    capture_pageleave: true,
  });
}

// useSearchParams forces client-side rendering up to the nearest Suspense
// boundary, so this sits behind one to keep the rest of the page prerendered.
function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!KEY || !pathname) return;
    // child effects run before the provider's, so this is where PostHog
    // actually starts — early enough that the first pageview still lands
    ensurePostHog();
    const query = searchParams.toString();
    posthog.capture("$pageview", {
      $current_url: window.origin + pathname + (query ? `?${query}` : ""),
    });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!KEY) return <>{children}</>;

  return (
    <Provider client={posthog}>
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
      {children}
    </Provider>
  );
}
