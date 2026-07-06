import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await resend.emails.send({
      from: "ASHA Experiences <connect@send.ashaexperiences.com>",
      to: ["connect@ashaexperiences.com"],
      replyTo: email,
      subject: `new message from ${name}`,
      text: `name: ${name}\nemail: ${email}\n\nmessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #5C4D3F;">
          <h2 style="font-family: Georgia, serif; color: #4A3F35; font-weight: 400;">new message from the asha website</h2>
          <p><strong>name:</strong> ${name}</p>
          <p><strong>email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 0.5px solid #E2D8C3; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
