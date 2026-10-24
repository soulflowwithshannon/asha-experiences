import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { message, email, page } = await request.json();

    if (!message || !email) {
      return NextResponse.json({ error: "A message and an email are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
    }

    const body = String(message).slice(0, 4000);
    const from = String(page || "").slice(0, 200);

    await resend.emails.send({
      from: "ASHA Experiences <connect@ashaexperiences.com>",
      to: ["connect@ashaexperiences.com"],
      replyTo: email,
      subject: `chat — ${email}`,
      text: `${body}\n\n—\nfrom: ${email}\npage: ${from}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #5C4D3F;">
          <h2 style="font-family: Georgia, serif; color: #4A3F35; font-weight: 400;">someone messaged you from the website</h2>
          <p style="white-space: pre-wrap;">${body}</p>
          <hr style="border: 0.5px solid #E2D8C3; margin: 20px 0;" />
          <p><strong>reply to:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="color: #8A7B68; font-size: 13px;">sent from ${from || "the website"}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "That didn't send. Try again, or email us directly." }, { status: 500 });
  }
}
