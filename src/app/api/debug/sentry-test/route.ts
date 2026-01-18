import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const trigger = searchParams.get("trigger");

  if (!token || token !== process.env.SENTRY_TEST_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (trigger === "1") {
    throw new Error("Sentry production smoke test (intentional)");
  }

  return NextResponse.json({
    ok: true,
    message: "Sentry test endpoint is live. No error triggered.",
    howToTrigger:
      "Call with ?token=YOUR_TOKEN&trigger=1 (e.g., /sentry-test?token=...&trigger=1).",
  });
}
