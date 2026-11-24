"use client";

import { motion } from "framer-motion";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/* Wrap a page in <SafeReveal> and every FadeIn inside it (including those in
   shared components) renders visible by default: content is in the HTML at
   full opacity, and only blocks that start below the fold are hidden after
   hydration and faded in when they scroll into view. If the animation never
   fires (no JS, a throttled tab, a missed observer callback) nothing stays
   blank. Used on the home page; other pages keep the original behaviour. */
const SafeRevealContext = createContext(false);

export function SafeReveal({ children }: { children: ReactNode }) {
  return <SafeRevealContext.Provider value={true}>{children}</SafeRevealContext.Provider>;
}

function SafeFade({ children, delay = 0, className, style }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // already on screen (or above it): leave it exactly as rendered
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("hidden");
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setState("shown");
      cleanup();
    };
    // the observer is the main trigger; the scroll check is a backstop for
    // when a callback is missed during a fast or programmatic scroll
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) show();
    };
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && show(), { rootMargin: "0px 0px -8% 0px" })
        : null;
    io?.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    }
    return cleanup;
  }, []);

  const motionStyle: React.CSSProperties =
    state === "hidden"
      ? { opacity: 0, transform: "translateY(24px)" }
      : state === "shown"
        ? { opacity: 1, transform: "none", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }
        : {};

  return (
    <div ref={ref} className={className} style={{ ...style, ...motionStyle }}>
      {children}
    </div>
  );
}

export default function FadeIn({ children, delay = 0, className, style }: FadeInProps) {
  const safe = useContext(SafeRevealContext);
  if (safe) {
    return (
      <SafeFade delay={delay} className={className} style={style}>
        {children}
      </SafeFade>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
