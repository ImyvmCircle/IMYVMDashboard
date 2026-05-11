import { NextResponse } from "next/server";
import {
  buildShowcase,
  leaderboards,
  newsItems,
  serverStatus,
  wikiEntries,
} from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    source: "game-mock",
    serverStatus,
    buildShowcase,
    wikiEntries,
    leaderboards,
    newsItems,
  });
}
