import { NextResponse } from "next/server";
import { dataSource } from "@/lib/data-source";

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
        message: "暂未找到该玩家。当前使用 mock 数据，后续会接入真实玩家资料接口。",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    found: true,
    ...player,
  });
}
