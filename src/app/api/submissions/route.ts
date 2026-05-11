import { NextResponse } from "next/server";

const allowedTypes = new Set(["support", "application"]);

type SubmissionPayload = {
  type?: unknown;
  playerName?: unknown;
  contact?: unknown;
  content?: unknown;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as SubmissionPayload;
  const type = typeof payload.type === "string" ? payload.type.trim() : "";
  const playerName = typeof payload.playerName === "string" ? payload.playerName.trim() : "";
  const contact = typeof payload.contact === "string" ? payload.contact.trim() : "";
  const content = typeof payload.content === "string" ? payload.content.trim() : "";

  if (!allowedTypes.has(type)) {
    return NextResponse.json({ ok: false, message: "请求类型不正确。" }, { status: 400 });
  }

  if (playerName.length < 3 || playerName.length > 16) {
    return NextResponse.json(
      { ok: false, message: "Minecraft ID 长度需要在 3 到 16 个字符之间。" },
      { status: 400 },
    );
  }

  if (contact.length < 3) {
    return NextResponse.json({ ok: false, message: "请填写可联系到你的方式。" }, { status: 400 });
  }

  if (content.length < 12) {
    return NextResponse.json(
      { ok: false, message: "请补充更完整的说明，至少 12 个字符。" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "已模拟接收请求。当前不会持久化保存，正式接口接入后会进入审核流程。",
    ticketId: `MOCK-${Date.now().toString(36).toUpperCase()}`,
  });
}
