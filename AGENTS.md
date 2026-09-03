<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ASHA Experiences — project conventions

Marketing site for a women's retreat company run by two people, Ashley and Shannon.
Three retreats: Mexico (Becoming HER, Oct 27–31 2026), Morocco (Sacred Sands,
Nov 29 – Dec 5 2026), Kenya (Into the Wild, Nov 28 – Dec 4 2027).

## Stack

Next.js App Router + TypeScript. Styling is **inline `style={{}}` objects** reading CSS
custom properties. Tailwind is installed but used only for responsive show/hide in `Nav`
(`hidden md:flex`) — do not reach for utility classes for anything else. Media queries live
in inline `<style>` blocks at the bottom of each component. Animation is framer-motion.
Deployed on Vercel; **every push to `main` deploys**.

## Design tokens — always use the variable, never the hex

Defined in `src/app/globals.css`:

| Token | Light | Use |
|---|---|---|
| `--color-bg-page` | `#FFFCF5` | page background (cream) |
| `--color-bg-surface` | `#F5F1E6` | cards, alternating sections |
| `--color-bg-card` | `#DBD0BA` | borders on filled cards, chips |
| `--color-border` | `#E2D8C3` | hairlines |
| `--color-text-headline` | `#4A3F35` | headings |
| `--color-text-body` | `#5C4D3F` | body copy |
| `--color-accent` | `#A67C52` | clay — buttons, eyebrows, links |

Dark sections use literals `#2D2521` (bg) and `#F1F0E5` / `#C5AA9B` (text).
Buttons on cream: filled `--color-accent` with `#FFFCF5` text.

## Fonts

- `--font-fraunces` weight 700 — headings, anything that needs weight
- `--font-cormorant` weights 300–600, italic available — display, quotes, the ASHA wordmark
- `--font-dm-sans` — all body copy, labels, buttons

Loaded via `next/font` in `src/app/layout.tsx`. Do not add font loading anywhere else.

## Voice

- **UI copy and headings are lowercase.** "book a call with us", "find your archetype".
- **Blog post titles and bodies use sentence case** with normal capitalization.
- Prefer a period or comma over an em dash when a sentence can carry it — em dashes
  are used, but the owner dislikes them stacking up.
- Never underline for emphasis (reads as a link) — use `<em>` or `<strong>`.
- No star-rating emoji; the typographic `★` in `--color-accent` is used on testimonials.

## Blog

`src/lib/blog.ts` holds every post in one array. Type is
`{ slug, title, description, date, readTime, theme, image?, body }`.

- **`theme`, not `category`** — exactly three values: `"the inner work"`,
  `"the experience"`, `"before you go"`. These drive the filter chips on `/blog`.
- Array order = display order. `[hero, second, ...grid]` on the index, so position 1 is
  the big hero card and position 2 the wide card — **both need an `image`**. A post with
  no image must sit at position 3 or later.
- Post bodies are HTML strings rendered with `dangerouslySetInnerHTML`. React components
  cannot be written into them. To place one mid-article, add a token and handle it in the
  splitter in `src/app/blog/[slug]/page.tsx` — existing tokens are
  `__TESTIMONIAL_VIDEO__` and `__QUIZ_CTA__`.
- `description` renders as the italic block under the title *and* as the meta description.
  An empty string hides the block.

## Images

**Dropping a file into `public/images/` is not enough — it must be committed**, or it
404s on Vercel while working locally. This has broken the live site more than once.
Check `git status` after adding artwork.

`public/videos/` is gitignored except the two small files already tracked; the
testimonials video is served from Cloudflare R2.

## Shared components

- `FadeIn` — scroll-triggered fade. Uses `whileInView`, so it will not animate in a
  headless/hidden browser (see Verifying below).
- `Testimonials` — quote cards; the quotes array lives at the top of the file.
- `QuizCTA` — three variants: `band` (journal index), `inline` (via token), `end`
  (closes every post). Copy defaults live in the component.
- `MeetUs` — "before you book" section on retreat pages; takes `headline`, `body`,
  `spaceAbove`.
- `Nav` — link colour depends on `darkHero` (homepage + retreat pages have photo heroes
  and need light text; every other page needs dark).

## Retreat pages

`src/app/retreats/{mexico,morocco,kenya}/page.tsx`. Each has a local `faqs` array,
ordered deliberately: **emotional readiness → group fit → logistics → money →
what's included**. The four readiness questions are identical across all three; the
rest are page-specific. Do not homogenise them.

**All payments are non-refundable** on every retreat. That wording appears under every
booking button and in the cancellation FAQ — keep the two in sync, and keep both in sync
with the Stripe checkout pages.

## Email

Resend, via `src/app/api/contact/route.ts` and `src/app/api/quiz-submit/route.ts`.
Env vars `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` — the latter must be set in Vercel,
not just `.env.local`. Resend v6 has deprecated Audiences in favour of Segments; the
legacy `audienceId` path still works.

The quiz captures name + email **before** the questions (`stage: "start"`) so an
abandoned quiz is still a captured lead, then sends the result on completion.

## SEO

- Every route needs `alternates: { canonical }` in its metadata. Client components
  (`"use client"`) cannot export metadata — add a `layout.tsx` beside the page.
- The root layout sets a `%s | ASHA Experiences` title template; `src/app/blog/layout.tsx`
  re-declares it so posts inherit it. Do not write the suffix into a title string.
- `sitemap.ts` generates from the posts array — new posts are included automatically.

## Workflow

1. `npx next build` before committing — it catches JSX/TS errors the editor may not.
2. Commit and push; Vercel deploys from `main`.
3. Verify against `.next/server/app/**/*.html` when a visual check is not possible.

## Verifying visual changes

The in-app browser pane often runs hidden, which throttles `requestAnimationFrame` and
stops `IntersectionObserver` firing. That freezes framer-motion and makes `FadeIn`
content appear stuck at `opacity: 0`. **This is a testing artifact, not a site bug** —
do not "fix" it. Prefer asserting against the built HTML, or test logic directly in node.
