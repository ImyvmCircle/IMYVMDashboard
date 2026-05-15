import type { SupportLink } from "@/lib/data-source/types";

const supportLinks: SupportLink[] = [
  {
    title: "问题支持",
    description: "暂无提交保存接口。",
  },
  {
    title: "社区申请",
    description: "暂无申请提交入口。",
  },
];

export function PortalActions() {

  return (
    <div className="grid gap-6" id="support">
      <section className="block-frame bg-[#17110d] p-5 md:p-6">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--gold)]">
          Player Lookup
        </p>
        <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">玩家查询</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className="inventory-slot min-h-12 flex-1 px-4 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            disabled
            placeholder="输入 Minecraft ID"
          />
          <button className="stone-button px-5 py-3 font-black text-[#181818]" disabled>
            查询
          </button>
        </div>

        <div className="inventory-slot mt-4 p-4">
          <p className="font-black text-[#fff6ce]">暂无玩家资料接口</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">
            目前没有可查询的玩家数据。
          </p>
        </div>
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

        <div className="grid gap-3">
          <select
            className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none"
            defaultValue="support"
            disabled
            name="type"
          >
            <option value="support">问题支持</option>
            <option value="application">社区申请</option>
          </select>
          <input
            className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            disabled
            name="requestPlayerName"
            placeholder="Minecraft ID"
          />
          <input
            className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            disabled
            name="contact"
            placeholder="联系方式，例如 Discord / QQ / 邮箱"
          />
          <textarea
            className="inventory-slot min-h-32 resize-y px-4 py-3 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
            disabled
            name="content"
            placeholder="暂无提交保存接口。"
          />
          <button className="stone-button px-5 py-3 font-black text-[#181818]" disabled>
            提交请求
          </button>
        </div>

        <p className="inventory-slot mt-4 p-4 font-bold text-[#ffd166]">暂无提交保存接口。</p>
      </section>
    </div>
  );
}
