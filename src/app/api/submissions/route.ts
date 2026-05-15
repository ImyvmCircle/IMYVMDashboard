import { NextResponse } from "next/server";
import { siteContent } from "@/resources/site-content";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: siteContent.apiMessages.submissionUnavailable,
    },
    { status: 501 },
  );
}
