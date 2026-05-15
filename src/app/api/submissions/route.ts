import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: false,
    message: "暂无提交保存接口。",
  }, { status: 501 });
}
