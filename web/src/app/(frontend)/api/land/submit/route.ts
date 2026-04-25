import { NextResponse } from "next/server";
import { submitForm } from "@/lib/forms/submit";
import { landFullSchema } from "@/lib/forms/schemas/land";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, string>;
  const result = await submitForm({
    schemaType: "landSubmission",
    zodSchema: landFullSchema,
    payload: body,
    emailSubject: `New land submission: ${b?.acreage ?? "?"}ac in ${b?.county ?? "?"}, ${b?.state ?? "?"} from ${b?.name ?? "unknown"}`,
  });

  if (!result.ok) {
    if (result.errors) {
      return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ error: result.message ?? "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
