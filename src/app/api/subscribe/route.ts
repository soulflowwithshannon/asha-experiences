import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

/* Journal email signup (EmailSignup.tsx posts here).

   Adds her to the same Resend audience as the quiz and the waitlists
   (RESEND_AUDIENCE_ID, which must be set in Vercel as well as .env.local).
   To move to another provider later, only addSubscriber() changes. */
async function addSubscriber(sub: { name: string; email: string; source: string }): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) throw new Error("RESEND_AUDIENCE_ID is not set");

  const resend = new Resend(process.env.RESEND_API_KEY);
  // Resend returns errors rather than throwing, so check, or a failure looks like success
  const { error } = await resend.contacts.create({
    audienceId,
    email: sub.email,
    firstName: sub.name || undefined,
    unsubscribed: false,
  });
  if (error) throw new Error(`${error.name}: ${error.message}`);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, source } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email))) {
      return NextResponse.json({ error: "that email doesn't look quite right." }, { status: 400 });
    }

    await addSubscriber({
      name: name ? String(name).slice(0, 80) : "",
      email: String(email).trim().slice(0, 200),
      source: source ? String(source).slice(0, 60) : "journal",
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("subscribe: failed", e);
    return NextResponse.json({ error: "something went wrong. try again?" }, { status: 500 });
  }
}
