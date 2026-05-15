import { PortalActions } from "@/components/portal-actions";
import { dataSource } from "@/lib/data-source";
import type {
  BuildShowcaseItem,
  LeaderboardEntry,
  NewsItem,
  ResourceItem,
  ServerStatus,
  WikiEntry,
} from "@/lib/data-source/types";

const resourceModules = [
  {
    title: "资源下载",
    description: "客户端、整合包、材质包和公开资源入口。",
  },
  {
    title: "地图导航",
    description: "网页地图、交通路线、地标坐标和世界边界信息。",
  },
  {
    title: "游戏资料",
    description: "规则、指令、玩法机制、常见问题和资料索引。",
  },
  {
    title: "社区入口",
    description: "支持、申请、公告、协作和反馈入口。",
  },
];

export default async function Home() {
  const summary = await dataSource.getDashboardSummary();
  const statCards = getStatCards(summary.serverStatus);

  return (
    <main className="pixel-bg min-h-screen overflow-hidden">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="wood-panel block-frame grid gap-6 p-5 md:grid-cols-[1fr_0.85fr] md:p-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-[#211409] px-4 py-2 text-sm font-bold uppercase tracking-[0.28em] text-[#cce8a9]">
              <span className="h-3 w-3 bg-[var(--grass)] shadow-[0_0_18px_var(--grass)]" />
              IMYVM Web Portal
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#fff6ce] drop-shadow-[4px_4px_0_rgba(0,0,0,0.45)] sm:text-6xl">
                面向玩家的服务器门户、资源中心与资料入口。
              </h1>
              <p className="max-w-3xl text-lg font-semibold leading-8 text-[#f2dfb2]">
                当前未接入服务器数据源，所有未提供的内容统一显示为暂无。页面结构已按资源、资料、建筑、玩家与支持模块组织。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="stone-button px-5 py-3 font-black text-[#181818]" href="#resources">
                查看资源模块
              </a>
              <a className="stone-button px-5 py-3 font-black text-[#181818]" href="#builds">
                建筑档案
              </a>
              <a className="stone-button px-5 py-3 font-black text-[#181818]" href="#wiki">
                游戏资料
              </a>
              <a className="stone-button px-5 py-3 font-black text-[#181818]" href="#players">
                玩家与支持
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {statCards.map((card) => (
              <div className="inventory-slot p-4" key={card.label}>
                <p className="text-sm font-bold text-[#b8d89b]">{card.label}</p>
                <p className="mt-2 text-3xl font-black text-[#fff6ce]">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="block-frame bg-[#211409] p-5 md:p-6" id="resources">
          <SectionHeading eyebrow="Resources" title="资源模块" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resourceModules.map((module) => (
              <article className="inventory-slot p-4" key={module.title}>
                <h3 className="text-xl font-black text-[#fff6ce]">{module.title}</h3>
                <p className="mt-2 min-h-20 text-sm font-semibold leading-6 text-[#d7c095]">
                  {module.description}
                </p>
                <p className="mt-4 bg-[#1d130b] px-3 py-2 text-sm font-black text-[#ffd166]">
                  暂无
                </p>
              </article>
            ))}
          </div>
          <ResourceList resources={summary.resources} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" id="builds">
          <article className="block-frame wood-panel p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#21370f]">
              Featured Build
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#fff6ce] drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]">
              重点建筑
            </h2>
            <div className="my-5 grid min-h-72 place-items-center border-4 border-[#1d130b] bg-[linear-gradient(135deg,#5f7f43,#2e4a28_45%,#1e2f1f)] p-6 shadow-[inset_8px_8px_0_rgba(255,255,255,0.12),inset_-8px_-8px_0_rgba(0,0,0,0.32)]">
              <EmptyState title="暂无建筑展示" description="没有可展示的建筑图片或资料。" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoTile label="坐标" value="暂无" />
              <InfoTile label="建造者" value="暂无" />
              <InfoTile label="状态" value="暂无" />
            </div>
          </article>

          <div className="block-frame bg-[#17110d] p-5 md:p-6">
            <SectionHeading eyebrow="Build Gallery" title="建筑档案" />
            <BuildGallery builds={summary.buildShowcase} />
          </div>
        </section>

        <section className="block-frame bg-[#2b1a10] p-5 md:p-6" id="wiki">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Knowledge Base" title="游戏资料" />
            <span className="bg-[#16220f] px-3 py-2 text-sm font-bold text-[#bde59c]">
              暂无
            </span>
          </div>
          <WikiGrid entries={summary.wikiEntries} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" id="players">
          <div className="block-frame bg-[#211409] p-5 md:p-6">
            <SectionHeading eyebrow="Players" title="玩家数据" />
            <Leaderboard entries={summary.leaderboards} />
          </div>

          <PortalActions />
        </section>

        <section className="block-frame bg-[#17110d] p-5 md:p-6">
          <SectionHeading eyebrow="News" title="公告" />
          <NewsGrid items={summary.newsItems} />
        </section>
      </section>
    </main>
  );
}

function getStatCards(serverStatus: ServerStatus) {
  return [
    {
      label: "在线玩家",
      value:
        serverStatus.onlinePlayers === null || serverStatus.maxPlayers === null
          ? "暂无"
          : `${serverStatus.onlinePlayers} / ${serverStatus.maxPlayers}`,
    },
    { label: "服务器版本", value: serverStatus.version ?? "暂无" },
    {
      label: "近期 TPS",
      value: serverStatus.tps === null ? "暂无" : serverStatus.tps.toFixed(1),
    },
    {
      label: "已记录建筑",
      value: serverStatus.recordedBuilds === null ? "暂无" : String(serverStatus.recordedBuilds),
    },
  ];
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--gold)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black text-[#fff6ce]">{title}</h2>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="inventory-slot w-full max-w-md p-5 text-center">
      <p className="text-xl font-black text-[#fff6ce]">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">{description}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="inventory-slot p-3">
      <p className="text-xs font-bold text-[#b8d89b]">{label}</p>
      <p className="font-black text-[#fff6ce]">{value}</p>
    </div>
  );
}

function ResourceList({ resources }: { resources: ResourceItem[] }) {
  if (resources.length === 0) {
    return (
      <div className="mt-5">
        <EmptyState title="暂无资源条目" description="没有可下载或可访问的资源。" />
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {resources.map((resource) => (
        <article className="inventory-slot p-4" key={resource.title}>
          <h3 className="text-xl font-black text-[#fff6ce]">{resource.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">
            {resource.description}
          </p>
          <p className="mt-3 text-sm font-black text-[#ffd166]">{resource.href ?? "暂无"}</p>
        </article>
      ))}
    </div>
  );
}

function BuildGallery({ builds }: { builds: BuildShowcaseItem[] }) {
  if (builds.length === 0) {
    return <EmptyState title="暂无建筑档案" description="没有可公开展示的建筑资料。" />;
  }

  return (
    <div className="space-y-4">
      {builds.map((build) => (
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
  );
}

function WikiGrid({ entries }: { entries: WikiEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState title="暂无游戏资料" description="没有已发布的规则、指令或资料条目。" />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {entries.map((entry) => (
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
              <span className="bg-[#1d130b] px-2 py-1 text-xs font-bold text-[#b8d89b]" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState title="暂无玩家排行" description="没有可展示的玩家数据。" />;
  }

  return (
    <div className="space-y-3">
      {entries.map((player, index) => (
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
          <span className="font-black text-[#ffd166]">{player.score ?? "暂无"}</span>
        </div>
      ))}
    </div>
  );
}

function NewsGrid({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return <EmptyState title="暂无公告" description="没有已发布的公告内容。" />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article className="inventory-slot p-4" key={item.title}>
          <div className="flex flex-wrap items-center gap-3 text-xs font-black text-[#b8d89b]">
            <span>{item.date}</span>
            <span className="bg-[#2d4021] px-2 py-1">{item.category}</span>
          </div>
          <h3 className="mt-3 text-xl font-black text-[#fff6ce]">{item.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#d7c095]">{item.summary}</p>
        </article>
      ))}
    </div>
  );
}
