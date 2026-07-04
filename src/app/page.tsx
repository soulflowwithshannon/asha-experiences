"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "@/components/FadeIn";
import GuidesCompact from "@/components/GuidesCompact";
import { SplitHeadline, StaggerBlock, StaggerChild } from "@/components/AnimatedText";

function ParallaxHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="section-dark"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-20%",
          y,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(60,40,25,0.45), rgba(50,30,15,0.75))",
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", position: "absolute", inset: 0 }}
        >
          <source src="https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/ASHA%20hero%20video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(36px,6vw,72px)",
            color: "#F1F0E5",
            fontWeight: 700,
            letterSpacing: "0.01em",
            marginBottom: 24,
          }}
        >
          ASHA Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeInOut" }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(18px,2.5vw,26px)",
            color: "#C5AA9B",
            width: "90%",
            maxWidth: 480,
            whiteSpace: "normal",
            wordWrap: "break-word",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          international retreats for women choosing themselves
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        >
          <Link
            href="/retreats/kenya"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "#C39E88",
              color: "#2D2521",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "background 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#b08d78"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#C39E88"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            explore retreats →
          </Link>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            height: 60,
            background: "rgba(195,158,136,0.4)",
          }}
        />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* SECTION 1 — HERO */}
      <ParallaxHero />

      {/* SECTION 2 — BRAND INTRO */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ position: "relative", width: "100%", margin: "0 auto 48px" }}>
              <Image
                src="/images/ASHA sign.png"
                alt="ASHA sign"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </FadeIn>

          <StaggerBlock>
            <StaggerChild>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17, fontWeight: 600, color: "var(--color-accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>ASHA MEANS HOPE IN SANSKRIT</p>
            </StaggerChild>

            <StaggerChild>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--color-text-body)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 48px" }}>
                born from a deep belief that women hold the answers within themselves — ASHA creates the space for that wisdom to rise.
                <br /><br />
                from the spice markets of Morocco to the ancient cenotes of Mexico and the golden savannas of Kenya, every retreat is designed to spark something real inside you.
              </p>
            </StaggerChild>
          </StaggerBlock>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "nowrap" }} className="values-row">
            {[
              { label: "Intentional", caption: "every detail curated with purpose" },
              { label: "Intimate", caption: "small groups, deep connection" },
              { label: "Inclusive", caption: "all women, all stages" },
            ].map((tag, i) => (
              <FadeIn key={tag.label} delay={0.3 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    background: "var(--color-bg-surface)",
                    border: "1px solid var(--color-accent)",
                    borderRadius: 8,
                    padding: "32px 44px",
                    textAlign: "center",
                    minWidth: 280,
                    height: 140,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    cursor: "default",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, color: "var(--color-accent)", fontWeight: 700, marginBottom: 8 }}>
                    {tag.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)" }}>
                    {tag.caption}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){.values-row{flex-direction:column!important;align-items:center!important}.values-row>*{width:100%!important;max-width:320px}}`}</style>
      </section>

      {/* SECTION 3 — PILLARS */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 600, color: "var(--color-accent)", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>what every retreat holds</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "var(--color-text-headline)",
                textAlign: "center",
                fontWeight: 700,
                marginBottom: 48,
              }}
            >
              the pillars of ASHA
            </h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="pillars-grid">
            {[
              { num: "01", name: "land-based ceremony", caption: "rituals rooted in the culture we're visiting — held with respect, led by local wisdom keepers who share their traditions with willing hearts.", img: "/images/ceremony.jpeg" },
              { num: "02", name: "movement & somatic practice", caption: "yoga, dance, sound healing, and body-based rituals designed to move energy and anchor you into presence. no prior experience needed.", img: "/images/somatic practices.jpg" },
              { num: "03", name: "nourishing cuisine", caption: "every meal crafted with local, seasonal ingredients. we eat as a community — long tables, shared plates, and flavors that tell the story of where we are.", img: "/images/cuisine.jpeg" },
              { num: "04", name: "integration & circle work", caption: "women's circles, journaling, and a post-retreat community to help you carry this forward. this doesn't end when you board the plane home.", img: "/images/circle.jpeg" },
            ].map((pillar, i) => (
              <FadeIn key={pillar.num} delay={i * 0.12}>
                <div>
                  <motion.div
                    whileHover={{ scale: 1.04, filter: "brightness(1.05)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ position: "relative", aspectRatio: "3/2", background: "var(--color-bg-card)", overflow: "hidden" }}
                  >
                    <Image src={pillar.img} alt={pillar.name} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 640px) 100vw, 50vw" />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 24px 24px", background: "linear-gradient(to top, rgba(45,37,33,0.85) 0%, transparent 100%)" }}>
                      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, color: "#F1F0E5", fontWeight: 400 }}>
                        {pillar.num} / {pillar.name}
                      </p>
                    </div>
                  </motion.div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.7, marginTop: 16, textAlign: "center" }}>
                    {pillar.caption}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){.pillars-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 4 — FEATURED RETREAT */}
      <section style={{ background: "var(--color-bg-page)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60% 40%", minHeight: 600 }} className="split-grid">
          <div style={{ position: "relative", minHeight: 500, height: "100%" }}>
            <Image
              src="/images/Into the Wild Hero.jpg"
              alt="Into the Wild — Kenya retreat"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="60vw"
            />
          </div>

          <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <StaggerBlock>
              <StaggerChild>
                <p className="eyebrow-accent" style={{ marginBottom: 16 }}>NOW BOOKING — KENYA 2027</p>
              </StaggerChild>
              <StaggerChild>
                <SplitHeadline
                  text="Into the Wild"
                  as="h2"
                  style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 12 }}
                />
              </StaggerChild>
              <StaggerChild>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontStyle: "italic", color: "var(--color-text-muted)", marginBottom: 24 }}>
                  Ol Pejeta Conservancy, Kenya
                </p>
              </StaggerChild>
              <StaggerChild>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8, maxWidth: 380, marginBottom: 36 }}>
                  safari at golden hour. a women&apos;s circle under a sky you&apos;ve never seen this clearly. wildlife that reminds you what it feels like to be small in the best way.
                  <br /><br />
                  this is the one we keep talking about back home.
                </p>
              </StaggerChild>
              <StaggerChild>
                <Link href="/retreats/kenya" className="ghost-btn" style={{ alignSelf: "flex-start" }}>
                  view the Kenya retreat →
                </Link>
              </StaggerChild>
            </StaggerBlock>
          </div>
        </div>
        <style>{`@media(max-width:768px){.split-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 5 — TESTIMONIALS */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 48 }}>
              women who came back different
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(166, 124, 82, 0.12)", mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} />
              <video
                controls
                style={{ width: "100%", display: "block", borderRadius: 8, filter: "sepia(15%) saturate(110%) brightness(100%) contrast(105%)" }}
              >
                <source src="https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/Testimonials.mp4" type="video/mp4" />
              </video>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ background: "#2D2521", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(18px,2.5vw,24px)", color: "#EFE6D3", textAlign: "center" }}>
          ↑ this is what we created ASHA for.
        </p>
      </div>

      {/* SECTION 6 — GALLERY STRIP */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 0", overflow: "hidden" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: "0 32px", scrollbarWidth: "none" }}>
            {[
              { src: "/images/Return to Love Waterfall.jpg", alt: "Return to Love waterfall", w: 300 },
              { src: "/images/ReturnToLove group hug.jpg", alt: "Return to Love group hug", w: 460 },
              { src: "/images/ReturnToLove bracelets.jpg", alt: "Return to Love bracelets", w: 340 },
              { src: "/images/ReturnToLove25-357.jpg", alt: "Return to Love", w: 480 },
              { src: "/images/ReturnToLove yogajpg.jpg", alt: "Return to Love yoga", w: 360 },
              { src: "/images/ReturnToLove25-401.jpg", alt: "Return to Love", w: 440 },
              { src: "/images/ReturnToLove25-396.jpg", alt: "Return to Love", w: 380 },
            ].map((photo, i) => (
              <div key={i} style={{ flexShrink: 0, width: photo.w, height: 360, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <Image src={photo.src} alt={photo.alt} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="500px" />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>


      {/* SECTION 7 — GUIDES */}
      <GuidesCompact />

      {/* SECTION 8 — CLOSING CTA */}
      <section style={{ position: "relative", padding: "180px 32px", background: "#2D2521", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/ReturnToLove girls group 2.jpg"
            alt="Return to Love girls group"
            fill
            style={{ objectFit: "cover", objectPosition: "center 38%" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.45)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 40 }}>
              your next chapter starts here
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/retreats/kenya" style={{ display: "inline-block", padding: "12px 32px", border: "1px solid #C39E88", background: "rgba(195,158,136,0.25)", color: "#F1F0E5", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.45)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.25)")}>
                explore retreats
              </Link>
              <a href="https://instagram.com/asha_experiences" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "12px 32px", border: "1px solid #C39E88", background: "rgba(195,158,136,0.25)", color: "#F1F0E5", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.45)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.25)")}>
                follow along @asha_experiences →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
