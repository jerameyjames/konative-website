import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../../../payload.config";

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

    const payload = await getPayload({ config });

    await payload.create({
      collection: "form-submissions",
      data: {
        name: body.name,
        email: body.email,
        organization: body.organization,
        role: body.role || undefined,
        projectType: body.projectType || undefined,
        projectStage: body.projectStage || undefined,
        message: body.message || undefined,
        referralSource: body.referralSource || undefined,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 },
    );
  }
}
