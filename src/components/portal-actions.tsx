"use client";

import { FormEvent, useState } from "react";
import type { SupportLink } from "@/lib/mock-data";

type PlayerResult =
  | {
      found: true;
      name: string;
      rank: string;
      playtimeHours: number;
      lastSeen: string;
      favoriteProject: string;
      achievements: number;
    }
  | { found: false; message: string };

type SubmissionResult = {
  ok: boolean;
  message: string;
  ticketId?: string;
};

export function PortalActions({ supportLinks }: { supportLinks: SupportLink[] }) {
  const [playerName, setPlayerName] = useState("Doohaey");
  const [playerResult, setPlayerResult] = useState<PlayerResult | null>(null);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  async function lookupPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlayerLoading(true);
    setPlayerResult(null);

    const response = await fetch(`/api/players/${encodeURIComponent(playerName)}`);
    const data = (await response.json()) as PlayerResult;
    setPlayerResult(data);
    setPlayerLoading(false);
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionLoading(true);
    setSubmissionResult(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      type: String(formData.get("type") ?? ""),
      playerName: String(formData.get("requestPlayerName") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      content: String(formData.get("content") ?? ""),
    };

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as SubmissionResult;
    setSubmissionResult(data);
    setSubmissionLoading(false);
  }

  return (
    <div className="grid gap-6" id="support">
      <section className="block-frame bg-[#17110d] p-5 md:p-6">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--gold)]">
          Player Lookup
        </p>
        <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">玩家查询</h2>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={lookupPlayer}>
          <input
            className="inventory-slot min-h-12 flex-1 px-4 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="输入 Minecraft ID"
            value={playerName}
          />
          <button
            className="stone-button px-5 py-3 font-black text-[#181818]"
            disabled={playerLoading}
          >
            {playerLoading ? "查询中" : "查询"}
          </button>
        </form>

        {playerResult ? (
          <div className="inventory-slot mt-4 p-4">
            {playerResult.found ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <p>
                  <span className="text-[#b8d89b]">玩家</span>
                  <br />
                  <strong className="text-xl text-[#fff6ce]">{playerResult.name}</strong>
                </p>
                <p>
                  <span className="text-[#b8d89b]">称号</span>
                  <br />
                  <strong className="text-xl text-[#ffd166]">{playerResult.rank}</strong>
                </p>
                <p>
                  <span className="text-[#b8d89b]">游玩时长</span>
                  <br />
                  <strong>{playerResult.playtimeHours} 小时</strong>
                </p>
                <p>
                  <span className="text-[#b8d89b]">参与项目</span>
                  <br />
                  <strong>{playerResult.favoriteProject}</strong>
                </p>
                <p>
                  <span className="text-[#b8d89b]">成就</span>
                  <br />
                  <strong>{playerResult.achievements} 项</strong>
                </p>
                <p>
                  <span className="text-[#b8d89b]">最后在线</span>
                  <br />
                  <strong>{playerResult.lastSeen}</strong>
                </p>
              </div>
            ) : (
              <p className="font-bold text-[#ffd166]">{playerResult.message}</p>
            )}
          </div>
        ) : null}
      </section>

      <section className="block-frame bg-[#211409] p-5 md:p-6">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--emerald)]">
          Support
        </p>
        <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">支持与申请</h2>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          {supportLinks.map((link) => (
            <div className="inventory-slot p-3" key={link.title}>
              <p className="font-black text-[#fff6ce]">{link.title}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#d7c095]">
                {link.description}
              </p>
            </div>
          ))}
        </div>

        <form className="grid gap-3" onSubmit={submitRequest}>
          <select
            className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none"
            defaultValue="support"
            name="type"
          >
            <option value="support">问题支持</option>
            <option value="application">社区申请</option>
          </select>
          <input
            className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            name="requestPlayerName"
            placeholder="Minecraft ID"
          />
          <input
            className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            name="contact"
            placeholder="联系方式，例如 Discord / QQ / 邮箱"
          />
          <textarea
            className="inventory-slot min-h-32 resize-y px-4 py-3 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            name="content"
            placeholder="说明情况。首版为 mock 提交，不会持久化保存。"
          />
          <button
            className="stone-button px-5 py-3 font-black text-[#181818]"
            disabled={submissionLoading}
          >
            {submissionLoading ? "提交中" : "提交请求"}
          </button>
        </form>

        {submissionResult ? (
          <p className="inventory-slot mt-4 p-4 font-bold text-[#ffd166]">
            {submissionResult.message}
            {submissionResult.ticketId ? ` 工单号：${submissionResult.ticketId}` : ""}
          </p>
        ) : null}
      </section>
    </div>
  );
}
