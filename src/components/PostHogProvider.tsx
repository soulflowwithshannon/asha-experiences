"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (typeof window !== "undefined" && KEY && !posthog.__loaded) {
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
