import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const RESULTS: Record<string, { title: string; retreat: string; location: string; dates: string; href: string }> = {
  releaser: {
    title: "the releaser",
    retreat: "Becoming HER",
    location: "Riviera Maya, Mexico",
    dates: "October 27 – 31, 2026",
    href: "https://ashaexperiences.com/retreats/mexico",
  },
  wild: {
    title: "the wild one",
    retreat: "Into the Wild",
    location: "Ol Pejeta Conservancy, Kenya",
    dates: "November 28 – December 4, 2027",
    href: "https://ashaexperiences.com/retreats/kenya",
  },
  reconnector: {
    title: "the reconnector",
    retreat: "Sacred Sands",
    location: "Agadir, Morocco",
    dates: "November 29 – December 5, 2026",
    href: "https://ashaexperiences.com/retreats/morocco",
  },
};

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  try {
    const { name, email, archetype, stage } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const r = RESULTS[archetype] ?? RESULTS.reconnector;

    /* stage "start" — she's entered her details but hasn't answered yet.
       Add her to the audience now so an abandoned quiz is still a captured lead. */
    if (stage === "start") {
      if (audienceId) {
        try {
          await resend.contacts.create({ audienceId, email, firstName: name || undefined, unsubscribed: false });
        } catch (e) {
          console.error("quiz-submit: audience add failed", e);
        }
      } else {
        console.warn("quiz-submit: RESEND_AUDIENCE_ID is not set — contact not added to audience");
      }
      return NextResponse.json({ success: true });
    }

    // 1. Add to the Resend audience. Never let a duplicate/list failure lose the lead.
    if (audienceId) {
      try {
        await resend.contacts.create({
          audienceId,
          email,
          firstName: name || undefined,
          unsubscribed: false,
        });
      } catch (e) {
        console.error("quiz-submit: audience add failed", e);
      }
    } else {
      console.warn("quiz-submit: RESEND_AUDIENCE_ID is not set — contact not added to audience");
    }

    // 2. Send her the result
    await resend.emails.send({
      from: "ASHA Experiences <connect@ashaexperiences.com>",
      to: [email],
      replyTo: "connect@ashaexperiences.com",
      subject: `you're ${r.title} — here's your retreat`,
      text: `${name ? name + "," : "hi,"}

you came out as ${r.title}, which means your retreat is ${r.retreat} — ${r.location}, ${r.dates}.

see the full retreat: ${r.href}

if you have questions, just reply to this email. it comes straight to us — Ashley and Shannon.`,
      html: `
        <div style="font-family: -apple-system, Helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #5C4D3F; line-height: 1.7;">
          <p style="font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #A67C52; margin-bottom: 18px;">your result</p>
          <h1 style="font-family: Georgia, serif; font-size: 30px; color: #4A3F35; margin: 0 0 8px; font-weight: normal;">${r.title}</h1>
          <p style="margin: 0 0 28px;">${name ? name + ", based" : "Based"} on your answers, the retreat that matches where you are right now is:</p>
          <div style="border: 1px solid #E2D8C3; border-radius: 6px; padding: 22px 24px; background: #FFFCF5; margin-bottom: 28px;">
            <p style="font-family: Georgia, serif; font-size: 21px; color: #4A3F35; margin: 0 0 6px;">${r.retreat}</p>
            <p style="margin: 0 0 2px; font-size: 14px;">${r.location}</p>
            <p style="margin: 0 0 18px; font-size: 14px;">${r.dates}</p>
            <a href="${r.href}" style="display: inline-block; padding: 11px 22px; background: #A67C52; color: #FFFCF5; text-decoration: none; font-size: 13px; letter-spacing: 0.04em;">see the full retreat</a>
          </div>
          <p style="margin: 0 0 28px;">most women talk to us before they book. if you have questions, just reply to this email — it comes straight to us.</p>
          <p style="margin: 0; font-family: Georgia, serif; font-style: italic; color: #4A3F35;">Ashley &amp; Shannon</p>
          <p style="margin: 6px 0 0; font-size: 12px; color: #A67C52;">ASHA Experiences</p>
        </div>
      `,
    });

    // 3. Tell us a lead came in
    await resend.emails.send({
      from: "ASHA Experiences <connect@ashaexperiences.com>",
      to: ["connect@ashaexperiences.com"],
      replyTo: email,
      subject: `quiz lead — ${r.title} — ${name || email}`,
      text: `name: ${name || "(not given)"}\nemail: ${email}\nresult: ${r.title}\nmatched retreat: ${r.retreat}`,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("quiz-submit failed", e);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
