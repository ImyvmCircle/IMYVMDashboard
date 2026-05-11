import { NextResponse } from "next/server";
import { dataSource } from "@/lib/data-source";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await dataSource.getHealth());
}
