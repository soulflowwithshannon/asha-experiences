import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

/* Journal email signup (EmailSignup.tsx posts here).

   1. adds her to the same Resend audience as the quiz and the waitlists
      (RESEND_AUDIENCE_ID, set in Vercel for Production and Preview)
   2. emails us at connect@ so we hear about every signup, like every other
      form on the site

   To move the list to another provider later, only addSubscriber() changes. */
async function addSubscriber(resend: Resend, sub: { name: string; email: string }): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) throw new Error("RESEND_AUDIENCE_ID is not set");

  // Resend returns errors rather than throwing, so check, or a failure looks like success
  const { data, error } = await resend.contacts.create({
    audienceId,
    email: sub.email,
    firstName: sub.name || undefined,
    unsubscribed: false,
  });
  if (error) throw new Error(`${error.name}: ${error.message}`);
  console.log("subscribe: contact saved", data?.id);
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, source } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email))) {
      return NextResponse.json({ error: "that email doesn't look quite right." }, { status: 400 });
    }

    const who = name ? String(name).trim().slice(0, 80) : "";
    const addr = String(email).trim().slice(0, 200);
    const where = source ? String(source).slice(0, 60) : "journal";
    const resend = new Resend(process.env.RESEND_API_KEY);

    // The list is what she signed up for, so a failure here fails the request.
    let listNote = "added to the Resend audience";
    try {
      await addSubscriber(resend, { name: who, email: addr });
    } catch (e) {
      console.error("subscribe: audience add failed", e);
      listNote = "NOT added to the Resend audience (add her by hand)";
      // still tell us below, so no signup is ever lost
      await notify(resend, who, addr, where, listNote);
      return NextResponse.json({ error: "something went wrong. try again?" }, { status: 500 });
    }

    await notify(resend, who, addr, where, listNote);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("subscribe: failed", e);
    return NextResponse.json({ error: "something went wrong. try again?" }, { status: 500 });
  }
}

/* Our copy. A failed notification is logged but doesn't fail her signup:
   she's on the list either way. */
async function notify(resend: Resend, who: string, addr: string, where: string, listNote: string) {
  const { error } = await resend.emails.send({
    from: "ASHA Experiences <connect@ashaexperiences.com>",
    to: ["connect@ashaexperiences.com"],
    replyTo: addr,
    subject: `journal signup — ${who || addr}`,
    text: `${who ? `name: ${who}\n` : ""}email: ${addr}\nsigned up on: ${where}\n${listNote}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #5C4D3F;">
        <h2 style="font-family: Georgia, serif; color: #4A3F35; font-weight: 400;">someone signed up for the letters</h2>${who ? `
        <p><strong>name:</strong> ${escape(who)}</p>` : ""}
        <p><strong>email:</strong> <a href="mailto:${escape(addr)}">${escape(addr)}</a></p>
        <p><strong>signed up on:</strong> ${escape(where)}</p>
        <p><em>${escape(listNote)}</em></p>
      </div>
    `,
  });
  if (error) console.error("subscribe: notification email failed", error.name, error.message);
}
