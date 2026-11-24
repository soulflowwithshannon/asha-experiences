import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  try {
    // name is optional: the Spain waitlist sends it, the old home form did not
    const { destination, email, name } = await request.json();

    if (!destination || !email) {
      return NextResponse.json({ error: "Both fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const place = String(destination).slice(0, 120);
    const who = name ? String(name).slice(0, 80) : "";

    /* She asked for somewhere, so she's a lead whether or not we ever run it.
       Add her first — a failure here must not cost us the email below. */
    if (audienceId) {
      try {
        await resend.contacts.create({ audienceId, email, firstName: who || undefined, unsubscribed: false });
      } catch (e) {
        console.error("destination-request: audience add failed", e);
      }
    } else {
      console.warn("destination-request: RESEND_AUDIENCE_ID is not set — contact not added to audience");
    }

    // Resend returns errors rather than throwing, so check, or a failed send looks like success
    const { error: sendError } = await resend.emails.send({
      from: "ASHA Experiences <connect@ashaexperiences.com>",
      to: ["connect@ashaexperiences.com"],
      replyTo: email,
      subject: `destination request — ${place}${who ? ` — ${who}` : ""}`,
      text: `destination: ${place}\n${who ? `name: ${who}\n` : ""}email: ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #5C4D3F;">
          <h2 style="font-family: Georgia, serif; color: #4A3F35; font-weight: 400;">someone wants to go to ${place}</h2>
          <p><strong>destination:</strong> ${place}</p>${who ? `
          <p><strong>name:</strong> ${who}</p>` : ""}
          <p><strong>email:</strong> <a href="mailto:${email}">${email}</a></p>
        </div>
      `,
    });

    if (sendError) {
      console.error("destination-request: email send failed", sendError.name, sendError.message);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
