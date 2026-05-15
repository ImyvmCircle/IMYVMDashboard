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
import { siteContent } from "@/resources/site-content";

export default async function Home() {
  const summary = await dataSource.getDashboardSummary();
  const statCards = getStatCards(summary.serverStatus);

  return (
    <main className="portal-shell">
      <div className="portal-container">
        <header className="hero-panel">
          <div className="hero-content">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <div>
              <h1 className="hero-title">{siteContent.hero.title}</h1>
              <p className="hero-copy">{siteContent.hero.copy}</p>
            </div>
            <nav className="hero-actions" aria-label="页面模块导航">
              {siteContent.navigation.map((item, index) => (
                <a
                  className={index === 0 ? "button-primary" : "button-secondary"}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="status-grid">
            {statCards.map((card) => (
              <div className="stat-card" key={card.label}>
                <p className="stat-label">{card.label}</p>
                <p className="stat-value">{card.value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="section-panel" id="resources">
          <SectionHeading {...siteContent.sections.resources} />
          <div className="resource-grid">
            {siteContent.resourceModules.map((module) => (
              <article className="card" key={module.title}>
                <h3 className="card-title">{module.title}</h3>
                <p className="card-copy">{module.description}</p>
                <p className="status-pill">{module.status}</p>
              </article>
            ))}
          </div>
          <ResourceList resources={summary.resources} />
        </section>

        <section className="layout-grid" id="builds">
          <article className="section-panel">
            <SectionHeading {...siteContent.sections.featuredBuild} />
            <div className="media-placeholder">
              <EmptyState {...siteContent.emptyStates.featuredBuild} />
            </div>
            <div className="info-grid">
              <InfoTile label={siteContent.labels.coordinate} value={siteContent.labels.unavailable} />
              <InfoTile label={siteContent.labels.builders} value={siteContent.labels.unavailable} />
              <InfoTile label={siteContent.labels.status} value={siteContent.labels.unavailable} />
            </div>
          </article>

          <section className="section-panel">
            <SectionHeading {...siteContent.sections.buildGallery} />
            <BuildGallery builds={summary.buildShowcase} />
          </section>
        </section>

        <section className="section-panel" id="wiki">
          <SectionHeading {...siteContent.sections.wiki} />
          <WikiGrid entries={summary.wikiEntries} />
        </section>

        <section className="layout-grid" id="players">
          <section className="section-panel">
            <SectionHeading {...siteContent.sections.players} />
            <Leaderboard entries={summary.leaderboards} />
          </section>

          <PortalActions />
        </section>

        <section className="section-panel">
          <SectionHeading {...siteContent.sections.news} />
          <NewsGrid items={summary.newsItems} />
        </section>
      </div>
    </main>
  );
}

function getStatCards(serverStatus: ServerStatus) {
  return [
    {
      label: siteContent.statusLabels.onlinePlayers,
      value:
        serverStatus.onlinePlayers === null || serverStatus.maxPlayers === null
          ? siteContent.labels.unavailable
          : `${serverStatus.onlinePlayers} / ${serverStatus.maxPlayers}`,
    },
    {
      label: siteContent.statusLabels.serverVersion,
      value: serverStatus.version ?? siteContent.labels.unavailable,
    },
    {
      label: siteContent.statusLabels.recentTps,
      value:
        serverStatus.tps === null
          ? siteContent.labels.unavailable
          : serverStatus.tps.toFixed(1),
    },
    {
      label: siteContent.statusLabels.recordedBuilds,
      value:
        serverStatus.recordedBuilds === null
          ? siteContent.labels.unavailable
          : String(serverStatus.recordedBuilds),
    },
  ];
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </header>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="empty-state">
      <p className="empty-title">{title}</p>
      <p className="empty-copy">{description}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="stat-label">{label}</p>
      <p className="card-title">{value}</p>
    </div>
  );
}

function ResourceList({ resources }: { resources: ResourceItem[] }) {
  if (resources.length === 0) {
    return (
      <div className="section-panel">
        <EmptyState {...siteContent.emptyStates.resources} />
      </div>
    );
  }

  return (
    <div className="content-grid">
      {resources.map((resource) => (
        <article className="card" key={resource.title}>
          <h3 className="card-title">{resource.title}</h3>
          <p className="card-copy">{resource.description}</p>
          <p className="status-pill">{resource.href ?? siteContent.labels.unavailable}</p>
        </article>
      ))}
    </div>
  );
}

function BuildGallery({ builds }: { builds: BuildShowcaseItem[] }) {
  if (builds.length === 0) {
    return <EmptyState {...siteContent.emptyStates.buildGallery} />;
  }

  return (
    <div className="stack">
      {builds.map((build) => (
        <article className="card" key={build.name}>
          <h3 className="card-title">{build.name}</h3>
          <p className="card-copy">{build.description}</p>
          <p className="status-pill">
            {build.status} / {build.location} / {build.builders.join(" / ")}
          </p>
        </article>
      ))}
    </div>
  );
}

function WikiGrid({ entries }: { entries: WikiEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState {...siteContent.emptyStates.wiki} />;
  }

  return (
    <div className="content-grid">
      {entries.map((entry) => (
        <article className="card" key={entry.title}>
          <h3 className="card-title">{entry.title}</h3>
          <p className="card-copy">{entry.summary}</p>
          <p className="status-pill">{entry.tags.join(" / ")}</p>
        </article>
      ))}
    </div>
  );
}

function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState {...siteContent.emptyStates.players} />;
  }

  return (
    <div className="stack">
      {entries.map((player, index) => (
        <article className="card" key={player.name}>
          <h3 className="card-title">
            {index + 1}. {player.name}
          </h3>
          <p className="card-copy">{player.title}</p>
          <p className="status-pill">{player.score ?? siteContent.labels.unavailable}</p>
        </article>
      ))}
    </div>
  );
}

function NewsGrid({ items }: { items: NewsItem[] }) {
  if (items.length === 0) {
    return <EmptyState {...siteContent.emptyStates.news} />;
  }

  return (
    <div className="content-grid">
      {items.map((item) => (
        <article className="card" key={item.title}>
          <p className="section-eyebrow">
            {item.date} / {item.category}
          </p>
          <h3 className="card-title">{item.title}</h3>
          <p className="card-copy">{item.summary}</p>
        </article>
      ))}
    </div>
  );
}
