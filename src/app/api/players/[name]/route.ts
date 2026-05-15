import { NextResponse } from "next/server";
import { dataSource } from "@/lib/data-source";
import { siteContent } from "@/resources/site-content";

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;
  const player = await dataSource.getPlayerProfile(decodeURIComponent(name));

  if (!player) {
    return NextResponse.json(
      {
        found: false,
        message: siteContent.apiMessages.playerUnavailable,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    found: true,
    ...player,
  });
}
