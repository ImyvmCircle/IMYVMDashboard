import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function DevLabPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="pixel-bg min-h-screen">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="wood-panel block-frame p-6">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#21370f]">
            Local Dev Lab
          </p>
          <h1 className="mt-3 text-4xl font-black text-[#fff6ce] drop-shadow-[4px_4px_0_rgba(0,0,0,0.45)]">
            本地效果预览台
          </h1>
          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-[#fff1c6]">
            这个页面只用于 `pnpm dev` 时集中查看视觉组件、表单控件、空状态和错误态，不作为正式玩家入口。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <PreviewStat label="在线玩家" value="暂无" />
          <PreviewStat label="TPS" value="暂无" />
          <PreviewStat label="版本" value="暂无" />
          <PreviewStat label="建筑档案" value="暂无" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="block-frame bg-[#2b1a10] p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--emerald)]">
              Build Cards
            </p>
            <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">建筑卡片状态</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <PreviewCard title="暂无建筑档案" description="没有可公开展示的建筑资料。" />
              <PreviewCard title="暂无建筑截图" description="没有可展示的建筑图片。" />
            </div>
          </div>

          <div className="block-frame bg-[#17110d] p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--gold)]">
              Wiki Cards
            </p>
            <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">Wiki 卡片状态</h2>
            <div className="space-y-4">
              <PreviewCard title="暂无游戏资料" description="没有已发布的规则、指令或资料条目。" />
              <PreviewCard title="暂无资源条目" description="没有可下载或可访问的资源。" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="block-frame bg-[#211409] p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--emerald)]">
              Leaderboard
            </p>
            <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">排行榜列表</h2>
            <div className="space-y-3">
              <PreviewCard title="暂无玩家排行" description="没有可展示的玩家数据。" />
            </div>
          </div>

          <div className="block-frame bg-[#17110d] p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--gold)]">
              Form States
            </p>
            <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">表单控件</h2>
            <div className="grid gap-3">
              <input
                className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
                placeholder="Minecraft ID"
              />
              <select
                className="inventory-slot min-h-12 px-4 font-bold text-[#fff6ce] outline-none"
                defaultValue="none"
                disabled
              >
                <option value="none">暂无</option>
              </select>
              <textarea
                className="inventory-slot min-h-28 resize-y px-4 py-3 font-bold text-[#fff6ce] outline-none placeholder:text-[#90765a]"
                placeholder="本地查看文本区域样式"
              />
              <button className="stone-button px-5 py-3 font-black text-[#181818]">
                石质按钮
              </button>
            </div>
          </div>

          <div className="block-frame bg-[#211409] p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--emerald)]">
              Empty/Error
            </p>
            <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">空状态与错误态</h2>
            <div className="grid gap-3">
              <div className="inventory-slot p-4">
                <p className="font-black text-[#fff6ce]">暂无建筑截图</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">
                  等待从地图标记或游戏内档案同步图片资源。
                </p>
              </div>
              <div className="inventory-slot border-[#5f1616] p-4">
                <p className="font-black text-[#ff9b9b]">接口暂不可用</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">
                  用于预览后续真实数据源异常时的提示样式。
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="inventory-slot p-4">
      <p className="text-sm font-bold text-[#b8d89b]">{label}</p>
      <p className="mt-2 text-3xl font-black text-[#fff6ce]">{value}</p>
    </div>
  );
}

function PreviewCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="inventory-slot p-4">
      <h3 className="text-xl font-black text-[#fff6ce]">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">{description}</p>
    </article>
  );
}
