import { PortalActions } from "@/components/portal-actions";
import {
  buildShowcase,
  leaderboards,
  newsItems,
  serverStatus,
  supportLinks,
  wikiEntries,
} from "@/lib/mock-data";

const statCards = [
  {
    label: "在线玩家",
    value: serverStatus.onlinePlayers,
    suffix: ` / ${serverStatus.maxPlayers}`,
  },
  { label: "服务器版本", value: serverStatus.version },
  { label: "近期 TPS", value: serverStatus.tps.toFixed(1) },
  { label: "已记录建筑", value: serverStatus.recordedBuilds },
];

export default function Home() {
  const featuredBuild = buildShowcase[0];

  return (
    <main className="pixel-bg min-h-screen overflow-hidden">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="wood-panel block-frame grid gap-6 p-5 md:grid-cols-[1fr_0.8fr] md:p-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-[#211409] px-4 py-2 text-sm font-bold uppercase tracking-[0.28em] text-[#cce8a9]">
              <span className="h-3 w-3 bg-[var(--grass)] shadow-[0_0_18px_var(--grass)]" />
              IMYVM Minecraft Archive
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#fff6ce] drop-shadow-[4px_4px_0_rgba(0,0,0,0.45)] sm:text-6xl">
                记录服务器建筑、资料与玩家数据的方块档案馆。
              </h1>
              <p className="max-w-3xl text-lg font-semibold leading-8 text-[#f2dfb2]">
                首版使用 mock 数据模拟游戏内读取结果；后续优先从 Minecraft 插件 HTTP、数据库或统计接口同步建筑、Wiki、玩家和服务器状态。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="stone-button px-5 py-3 font-black text-[#181818]" href="#builds">
                看建筑展示
              </a>
              <a className="stone-button px-5 py-3 font-black text-[#181818]" href="#wiki">
                查游戏 Wiki
              </a>
              <a className="stone-button px-5 py-3 font-black text-[#181818]" href="#players">
                查询玩家
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {statCards.map((card) => (
              <div className="inventory-slot p-4" key={card.label}>
                <p className="text-sm font-bold text-[#b8d89b]">{card.label}</p>
                <p className="mt-2 text-3xl font-black text-[#fff6ce]">
                  {card.value}
                  {"suffix" in card ? (
                    <span className="text-base text-[#d7c095]">{card.suffix}</span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" id="builds">
          <article className="block-frame wood-panel p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#21370f]">
              Featured Build
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#fff6ce] drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]">
              {featuredBuild.name}
            </h2>
            <div className="my-5 grid min-h-72 place-items-center border-4 border-[#1d130b] bg-[linear-gradient(135deg,#5f7f43,#2e4a28_45%,#1e2f1f)] p-6 shadow-[inset_8px_8px_0_rgba(255,255,255,0.12),inset_-8px_-8px_0_rgba(0,0,0,0.32)]">
              <div className="grid grid-cols-5 gap-2">
                {featuredBuild.palette.map((block) => (
                  <span
                    className="h-12 w-12 border-2 border-black/50 shadow-[inset_4px_4px_0_rgba(255,255,255,0.18),inset_-4px_-4px_0_rgba(0,0,0,0.3)]"
                    key={block.name}
                    style={{ background: block.color }}
                    title={block.name}
                  />
                ))}
              </div>
            </div>
            <p className="text-base font-semibold leading-7 text-[#fff1c6]">
              {featuredBuild.description}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="inventory-slot p-3">
                <p className="text-xs font-bold text-[#b8d89b]">坐标</p>
                <p className="font-black text-[#fff6ce]">{featuredBuild.location}</p>
              </div>
              <div className="inventory-slot p-3">
                <p className="text-xs font-bold text-[#b8d89b]">建造者</p>
                <p className="font-black text-[#fff6ce]">{featuredBuild.builders.join(" / ")}</p>
              </div>
              <div className="inventory-slot p-3">
                <p className="text-xs font-bold text-[#b8d89b]">状态</p>
                <p className="font-black text-[#fff6ce]">{featuredBuild.status}</p>
              </div>
            </div>
          </article>

          <div className="block-frame bg-[#17110d] p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--gold)]">
              Build Gallery
            </p>
            <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">建筑展示</h2>
            <div className="space-y-4">
              {buildShowcase.slice(1).map((build) => (
                <article className="inventory-slot p-4" key={build.name}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-[#fff6ce]">{build.name}</h3>
                    <span className="bg-[#2d4021] px-2 py-1 text-xs font-black text-[#b8d89b]">
                      {build.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">
                    {build.description}
                  </p>
                  <p className="mt-3 text-xs font-bold text-[#ffd166]">
                    {build.location} / {build.builders.join(" / ")}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="block-frame bg-[#2b1a10] p-5 md:p-6" id="wiki">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--emerald)]">
                Game Wiki
              </p>
              <h2 className="text-3xl font-black text-[#fff6ce]">游戏 Wiki</h2>
            </div>
            <span className="bg-[#16220f] px-3 py-2 text-sm font-bold text-[#bde59c]">
              后续从游戏内资料同步
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {wikiEntries.map((entry) => (
              <article className="wood-panel block-frame p-4" key={entry.title}>
                <span className="inventory-slot mb-4 grid h-12 w-12 place-items-center text-2xl">
                  {entry.icon}
                </span>
                <h3 className="text-xl font-black text-[#fff6ce]">{entry.title}</h3>
                <p className="mt-2 min-h-20 text-sm font-semibold leading-6 text-[#f4ddb0]">
                  {entry.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      className="bg-[#1d130b] px-2 py-1 text-xs font-bold text-[#b8d89b]"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" id="players">
          <div className="block-frame bg-[#211409] p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--emerald)]">
              Leaderboards
            </p>
            <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">玩家排行榜</h2>
            <div className="space-y-3">
              {leaderboards.map((player, index) => (
                <div
                  className="inventory-slot grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4"
                  key={player.name}
                >
                  <span className="grid h-10 w-10 place-items-center bg-[#111] text-lg font-black text-[#ffd166]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-black text-[#fff6ce]">{player.name}</p>
                    <p className="text-sm font-semibold text-[#b8d89b]">{player.title}</p>
                  </div>
                  <span className="font-black text-[#ffd166]">{player.score}</span>
                </div>
              ))}
            </div>
          </div>

          <PortalActions supportLinks={supportLinks} />
        </section>

        <section className="block-frame bg-[#17110d] p-5 md:p-6">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--gold)]">
            News
          </p>
          <h2 className="mb-5 text-3xl font-black text-[#fff6ce]">新闻与同步计划</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {newsItems.map((item) => (
              <article className="inventory-slot p-4" key={item.title}>
                <div className="flex flex-wrap items-center gap-3 text-xs font-black text-[#b8d89b]">
                  <span>{item.date}</span>
                  <span className="bg-[#2d4021] px-2 py-1">{item.category}</span>
                </div>
                <h3 className="mt-3 text-xl font-black text-[#fff6ce]">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
