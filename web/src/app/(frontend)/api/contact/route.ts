import { NextResponse } from "next/server";

function sendEmailNotification(body: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const { name, email, organization, role, projectType, projectStage, message, referralSource } = body;

  const html = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Organization</td><td style="padding:8px;border-bottom:1px solid #eee">${organization}</td></tr>
      ${role ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Role</td><td style="padding:8px;border-bottom:1px solid #eee">${role}</td></tr>` : ""}
      ${projectType ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Project Type</td><td style="padding:8px;border-bottom:1px solid #eee">${projectType}</td></tr>` : ""}
      ${projectStage ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Project Stage</td><td style="padding:8px;border-bottom:1px solid #eee">${projectStage}</td></tr>` : ""}
      ${message ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Message</td><td style="padding:8px;border-bottom:1px solid #eee">${message}</td></tr>` : ""}
      ${referralSource ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Referral Source</td><td style="padding:8px;border-bottom:1px solid #eee">${referralSource}</td></tr>` : ""}
    </table>
  `;

  fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Konative <onboarding@resend.dev>",
      to: "jeramey.james@gmail.com",
      subject: `New Konative Contact: ${name} from ${organization}`,
      html,
    }),
  }).catch((err) => {
    console.error("Resend email error:", err);
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, organization } = body;
    if (!name || !email || !organization) {
      return NextResponse.json(
        { error: "Name, email, and organization are required." },
        { status: 400 },
      );
    }

    sendEmailNotification(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to submit form. Please try again." }, { status: 500 });
  }
}
