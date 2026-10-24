import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  try {
    const body = await request.json();
    const { name, email, stage } = body;

    if (!email) {
      return NextResponse.json({ error: "An email is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
    }

    /* stage "start" — she has given her name and email but not the detail yet.
       Capture her now so a half-finished enquiry is still a lead. */
    if (stage === "start") {
      if (audienceId) {
        try {
          await resend.contacts.create({ audienceId, email, firstName: name || undefined, unsubscribed: false });
        } catch (e) {
          console.error("custom-retreat: audience add failed", e);
        }
      }

      await resend.emails.send({
        from: "ASHA Experiences <connect@ashaexperiences.com>",
        to: ["connect@ashaexperiences.com"],
        replyTo: email,
        subject: `custom retreat — started — ${name || email}`,
        text: `${name || "someone"} started a custom retreat enquiry.\nemail: ${email}`,
      });

      return NextResponse.json({ success: true });
    }

    const { who, headcount, company, when, where, outcome, budget, leading, anythingElse, phone, based } = body;

    const rows: [string, string][] = [
      ["name", name || "—"],
      ["email", email],
      ["phone", phone || "—"],
      ["based in", based || "—"],
      ["who's coming", who || "—"],
      ["how many", headcount || "—"],
      ["company", company || "—"],
      ["when", when || "—"],
      ["where", where || "—"],
      ["budget per person", budget || "—"],
      ["who leads the week", leading || "—"],
    ];

    const subjectBits = [headcount && `${headcount} women`, where, name].filter(Boolean).join(" — ");

    await resend.emails.send({
      from: "ASHA Experiences <connect@ashaexperiences.com>",
      to: ["connect@ashaexperiences.com"],
      replyTo: email,
      subject: `custom retreat — ${subjectBits || email}`,
      text:
        rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
        `\n\nwhat they want them to leave with:\n${outcome || "—"}` +
        `\n\nanything else:\n${anythingElse || "—"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #5C4D3F;">
          <h2 style="font-family: Georgia, serif; color: #4A3F35; font-weight: 400;">a custom retreat enquiry</h2>
          ${rows.map(([k, v]) => `<p style="margin:4px 0;"><strong>${k}:</strong> ${v}</p>`).join("")}
          <hr style="border: 0.5px solid #E2D8C3; margin: 20px 0;" />
          <p><strong>what they want them to leave with</strong></p>
          <p style="white-space: pre-wrap;">${outcome || "—"}</p>
          <p style="margin-top:16px;"><strong>anything else</strong></p>
          <p style="white-space: pre-wrap;">${anythingElse || "—"}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "That didn't send. Try again, or email us directly." }, { status: 500 });
  }
}
